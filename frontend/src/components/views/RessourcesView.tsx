import React, { useState, useMemo } from 'react';
import type { ScriptMode } from '../../types';
import { BookMarked, Search, Code, BookOpen, Layers, HelpCircle, Copy, Check, Terminal } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface RessourcesViewProps {
  currentScript: ScriptMode;
}

type TabType = 'vocabulaire' | 'conventions' | 'glossaire' | 'aide';

interface VocabEntry {
  id: string;
  termBamanankan: string;
  termNko: string;
  termFr: string;
  category: 'hardware' | 'code' | 'algorithm' | 'cyber';
  lessonRef: string;
  explanation: {
    latin: string;
    nko: string;
    fr: string;
  };
  example: string;
}

const VOCAB_LIST: VocabEntry[] = [
  {
    id: 'algo',
    termBamanankan: 'Aligoritimu',
    termNko: 'ߊߟߌߜ߭ߏߙߌߕߌߡߎ',
    termFr: 'Algorithme',
    category: 'algorithm',
    lessonRef: 'Leçon 1 & 2 • Taji kɛcogo',
    explanation: {
      latin: 'Baara kɛcogo dɔ ye min bɛ kɛ sen ni sen kɔ, fo ka se laɲini ma.',
      nko: 'ߓߊ߯ߙߊ߫ ߞߍߢߊ ߘߏ߫ ߟߋ߬ ߡߍ߲ ߦߋ߫ ߞߍ߫ ߛߋ߲ ߣߌ߫ ߛߋ߲ ߞߐ߫ ߝߏ߫ ߞߊ߬ ߛߋ߫ ߟߊ߬ߢߌߣߌ߲ ߡߊ߬.',
      fr: "Une suite ordonnée, logique et finie d'étapes pour accomplir une tâche donnée.",
    },
    example: '1. Ji bila tasuma kan -> 2. Taji kɛ -> 3. Sukaro kɛ',
  },
  {
    id: 'computer',
    termBamanankan: 'Kɔmputɛri / Masin',
    termNko: 'ߞߐ߲ߔߎߕߍߙߌ / ߡߊߛߌ߲',
    termFr: 'Ordinateur',
    category: 'hardware',
    lessonRef: 'Leçon 1 • Kɔmputɛri cogo',
    explanation: {
      latin: 'Masin min bɛ baara kɛ ni hakilidaga (RAM) ani hakili (CPU) ye ka cikanw kɛ.',
      nko: 'ߡߊߛߌ߲ ߡߍ߲ ߦߋ ߓߊ߯ߙߊ ߞߍ ߣߌ ߤߊߞߟߌߘߊ߮ ߣߌ ߤߊߞߟߌ ߟߊ ߞߊ ߗߌߞߊ߲ ߠߎ ߞߍ.',
      fr: 'Une machine électronique capable de recevoir des données, de les traiter selon un programme et de produire des résultats.',
    },
    example: 'Kɔmputɛri bɛ baara kɛ ni doninfenw ani labɔlifenw ye.',
  },
  {
    id: 'cpu',
    termBamanankan: 'Hakili (CPU)',
    termNko: 'ߤߊߞߟߌ (CPU)',
    termFr: 'Processeur / CPU',
    category: 'hardware',
    lessonRef: 'Leçon 1 • Architecture',
    explanation: {
      latin: 'Kɔmputɛri kunkolo de bɛ jate kɛ ani ka cikan bɛɛ labaara.',
      nko: 'ߞߐ߲ߔߎߕߍߙߌ ߤߊߞߟߌ ߘߋ ߦߋ ߖߊ߬ߕߋ ߓߍ ߞߍ ߞߊ ߗߌߞߊ߲ ߠߎ ߟߊߓߊ߯ߙߊ.',
      fr: "Le cerveau de l'ordinateur, responsable de l'exécution des instructions et des calculs mathématiques/logiques.",
    },
    example: 'CPU bɛ jatew kɛ miliyɔn caman sekondi kelen kɔnɔ.',
  },
  {
    id: 'ram',
    termBamanankan: 'Hakilidaga (RAM)',
    termNko: 'ߤߊߞߟߌߘߊ߮ (RAM)',
    termFr: 'Mémoire vive / RAM',
    category: 'hardware',
    lessonRef: 'Leçon 1 & 3 • Doninfenw mara',
    explanation: {
      latin: 'Yɔrɔ de bɛ doninfenw mara kɔmputɛri kɔnɔ baara waati la. Ni kɔmputɛri banna, a kɔnɔ fɛnw bɛ bɔ.',
      nko: 'ߦߙߐ ߘߋ ߦߋ ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ ߡߊߙߊ ߞߐ߲ߔߎߕߍߙߌ ߞߐߣߐ ߓߊ߯ߙߊ ߥߊ߯ߕߌ ߟߊ.',
      fr: "Mémoire volatile et ultra-rapide qui stocke temporairement les données en cours d'utilisation.",
    },
    example: 'Hakilidaga bɛ yɛlɛmabaaw mara baara waati la.',
  },
  {
    id: 'variable',
    termBamanankan: 'Yɛlɛmabaa',
    termNko: 'ߦߍߟߍߡߊ߲ߓߊ߮',
    termFr: 'Variable',
    category: 'code',
    lessonRef: 'Leçon 3 • Les variables (Yɛlɛmabaaw)',
    explanation: {
      latin: 'Kunnafoni maralan dɔ tɔgɔlen hakilidaga kɔnɔ, min kɔnɔfɛn bɛ se ka yɛlɛma.',
      nko: 'ߞߎ߲ߠߊߝߏߣߌ ߡߊߙߊߟߊ߲ ߘߏ߫ ߕߐ߮ߦߊߣߍ߲ ߤߊߞߟߌߘߊ߮ ߞߐߣߐ، ߡߍ߲ ߞߣߐߝߋ߲ ߘߌ߫ ߛߋ߫ ߞߊ߬ ߦߟߍ߬ߡߊ߲߫.',
      fr: 'Un emplacement nommé dans la mémoire RAM permettant de stocker et modifier une valeur.',
    },
    example: 'togo = "Mori"\nkilos = 12',
  },
  {
    id: 'boucle',
    termBamanankan: 'Kurunin',
    termNko: 'ߞߎߙߎߣߌ߲',
    termFr: 'Boucle (for / while)',
    category: 'code',
    lessonRef: 'Leçon 5 • Répétitions',
    explanation: {
      latin: 'Baara kɛcogo dɔ min bɛ cikan dɔw seginsɛgɛn fo ka se sarati dɔ ma.',
      nko: 'ߓߊ߯ߙߊ߫ ߞߍߢߊ ߘߏ߫ ߡߍ߲ ߦߋ ߗߌߞߊ߲ ߘߏ߫ ߟߎ߫ ߛߋ߬ߦߌ߲߬ߛߋ߬ߦߌ߲߬ ߝߏ߫ ߞߊ߬ ߛߋ߫ ߛߙߊߕߌ ߡߊ߬.',
      fr: "Structure de contrôle qui répète l'exécution d'un bloc d'instructions tant qu'une condition est vraie ou sur une séquence.",
    },
    example: 'for i in range(5):\n    klncd.S3b3n(i)',
  },
  {
    id: 'condition',
    termBamanankan: 'Sarati',
    termNko: 'ߛߙߊߕߌ',
    termFr: 'Condition (if / else)',
    category: 'code',
    lessonRef: 'Leçon 4 • Prise de décision',
    explanation: {
      latin: 'Ni fɛn dɔ kɛra tiɲɛ ye, cikan dɔ ka kɛ ; n’a ma kɛ tiɲɛ ye, dɔ wɛrɛ ka kɛ.',
      nko: 'ߣߌ ߝߋ߲ ߘߏ߫ ߞߍ߫ ߘߊ ߕߌߢߍ ߦߋ، ߗߌߞߊ߲ ߘߏ߫ ߞߊ ߞߍ ؛ ߣߴߊ ߡߊ ߞߍ ߕߌߢߍ ߦߋ، ߘߏ߫ ߜߘߍ ߞߊ ߞߍ.',
      fr: "Instruction permettant d'exécuter un bloc de code seulement si une condition logique est vérifiée.",
    },
    example: 'if sanji == True:\n    klncd.S3b3n("Samba ta")',
  },
  {
    id: 'cyber',
    termBamanankan: 'Danbɛ / Kisili',
    termNko: 'ߘߊ߲ߓߍ / ߞߌߛߌߟߌ',
    termFr: 'Cybersécurité / Protection',
    category: 'cyber',
    lessonRef: 'Parcours Cybersécurité',
    explanation: {
      latin: 'I ka kunnafoni gundow ani i ka masin tangacogo ka bɔ juguw fɛ.',
      nko: 'ߌ ߞߊ ߞߎ߲ߠߊߝߏߣߌ ߜߎ߲߬ߘߐ ߣߌ ߌ ߞߊ ߡߊߛߌ߲ ߕߊ߲߬ߞߊ ߞߊ ߓߐ ߖߎ߮ ߟߎ ߝߍ.',
      fr: "Ensemble des mesures techniques et comportements visant à protéger les données, logiciels et équipements contre les attaques.",
    },
    example: 'Kanatɔgɔ gundo (mot de passe fort) mara ka ɲuman.',
  },
];

interface ConventionDoc {
  name: string;
  signature: string;
  nkoName: string;
  summary: { latin: string; nko: string; fr: string };
  params: { name: string; type: string; desc: string }[];
  returns: string;
  example: string;
  outputPreview: string;
}

const CONVENTIONS: ConventionDoc[] = [
  {
    name: 'klncd.S3b3n',
    nkoName: 'ߛߍߓߍ߲ (Afficher)',
    signature: 'klncd.S3b3n(message: Any) -> None',
    summary: {
      latin: 'Kunnafoni dɔ labɔ konsɔli kan (affiche sur la console).',
      nko: 'ߞߎ߲ߠߊߝߏߣߌ ߟߊ߬ߓߐ ߞߐ߲ߛߐߟ ߞߊ߲.',
      fr: 'Affiche un message ou une variable sur la console KalanCode. Équivalent pédagogique de print() avec support natif Bamanankan et N’Ko.',
    },
    params: [
      { name: 'message', type: 'str | int | float | Any', desc: 'Texte, nombre ou variable à afficher.' },
    ],
    returns: 'None',
    example: `# Affichage d'un texte d'accueil\nimport klncd\n\nklncd.S3b3n("I ni ce, an bɛ kɔmputɛri kalan kɛ !")\n\nprix = 500\nklncd.S3b3n("Prix : " + str(prix) + " FCFA")`,
    outputPreview: 'I ni ce, an bɛ kɔmputɛri kalan kɛ !\nPrix : 500 FCFA',
  },
  {
    name: 'klncd.Doon',
    nkoName: 'ߘߏ߲ (Saisir)',
    signature: 'klncd.Doon(prompt: str) -> str',
    summary: {
      latin: 'Mɔgɔ ka kuma dɔ don konsɔli kɔnɔ (demande une saisie utilisateur).',
      nko: 'ߡߐ߱ ߦߋ ߞߎߡߊ ߘߏ߲߬ ߞߐ߲ߛߐߟ ߞߐߣߐ.',
      fr: 'Met en pause le programme et attend une saisie clavier de l’apprenant avec un message d’invite interactif.',
    },
    params: [
      { name: 'prompt', type: 'str', desc: 'Question posée à l’utilisateur.' },
    ],
    returns: 'str (la chaîne saisie par l’utilisateur)',
    example: `# Saisie du prénom de l'apprenant\nimport klncd\n\ntogo = klncd.Doon("I tɔgɔ ye mun ye ?")\nklncd.S3b3n("I ni ce, " + togo + " !")`,
    outputPreview: 'I tɔgɔ ye mun ye ? [Attente saisie...]\n> Mori\nI ni ce, Mori !',
  },
];

export const RessourcesView: React.FC<RessourcesViewProps> = ({ currentScript }) => {
  const [activeTab, setActiveTab] = useState<TabType>('vocabulaire');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playClick();
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredVocab = useMemo(() => {
    if (!searchTerm.trim()) return VOCAB_LIST;
    const q = searchTerm.toLowerCase();
    return VOCAB_LIST.filter(
      (v) =>
        v.termBamanankan.toLowerCase().includes(q) ||
        v.termFr.toLowerCase().includes(q) ||
        v.termNko.includes(q) ||
        v.explanation[currentScript].toLowerCase().includes(q)
    );
  }, [searchTerm, currentScript]);

  const t: Record<ScriptMode, {
    title: string;
    sub: string;
    tabVocab: string;
    tabConventions: string;
    tabGlossaire: string;
    tabAide: string;
    searchPlaceholder: string;
    copyCode: string;
    copied: string;
    lessonTag: string;
    conventionSub: string;
    paramsTitle: string;
    returnsTitle: string;
    exampleTitle: string;
    outputTitle: string;
  }> = {
    latin: {
      title: 'Kalan Kunnafoni & Daɲɛsɛbɛn (Ressources)',
      sub: 'Daɲɛw kɔrɔ, klncd bɛrɛbɛrɛw ani dɔnniya ladiɲɛw.',
      tabVocab: 'Daɲɛsɛbɛn (Vocabulaire)',
      tabConventions: 'KalanCode Bɛrɛbɛrɛw (klncd)',
      tabGlossaire: 'Kɔmputɛri Kɔrɔ (Glossaire)',
      tabAide: 'Dɛmɛ & Kunnafonili (Aide)',
      searchPlaceholder: 'Daɲɛ dɔ ɲini (ex: Aligoritimu, RAM, S3b3n)...',
      copyCode: 'Sɛbɛn ta',
      copied: 'A tara !',
      lessonTag: 'Kalan',
      conventionSub: 'KalanCode library klncd ka baarakɛlaw ladiyalenw.',
      paramsTitle: 'Doninfenw (Paramètres)',
      returnsTitle: 'Kɔfɔli (Retour)',
      exampleTitle: 'Misali (Exemple)',
      outputTitle: 'Labɔli (Sortie)',
    },
    nko: {
      title: 'ߞߎ߲ߠߊߝߏߣߌ ߣߌ ߞߎߡߊߘߋ߲ߘߊ (Ressources)',
      sub: 'ߞߎߡߊߘߋ߲ ߠߎ߬ ߞߘߐ، klncd ߛߙߊߕߌ ߟߎ߬ ߣߌ߫ ߢߊߝߐߟߌ.',
      tabVocab: 'ߞߎߡߊߘߋ߲ߘߊ (ߝߐߘߊ)',
      tabConventions: 'ߞߊߟߊ߲ߞߏߘ ߛߙߊߕߌ (klncd)',
      tabGlossaire: 'ߕߟߋ߬ߓߊ߮ ߞߘߐߝߐ',
      tabAide: 'ߘߍ߬ߡߍ߲߬ߠߌ (ߘߐ߲ߠߌ߲)',
      searchPlaceholder: 'ߞߎߡߊߘߋ߲ ߢߌߣߌ߲ (ex: ߊߟߌߜ߭ߏߙߌߕߌߡߎ، ߤߊߞߟߌ)...',
      copyCode: 'ߞߏߔߌ',
      copied: 'ߊ߬ ߕߊ߬ ߘߊ߫ !',
      lessonTag: 'ߞߊߟߊ߲',
      conventionSub: 'klncd ߞߊߟߊ߲ߞߏߘ ߟߊ߬ߓߊ߰ߙߊ߬ߟߌ ߟߎ߬.',
      paramsTitle: 'ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ',
      returnsTitle: 'ߟߊ߬ߓߐ߬ߟߌ',
      exampleTitle: 'ߡߌߛߊߟߌ',
      outputTitle: 'ߖߌߙߊߟߌ',
    },
    fr: {
      title: 'Ressources & Base Documentaire',
      sub: 'Vocabulaire informatique multilingue, conventions klncd et guides techniques.',
      tabVocab: 'Vocabulaire',
      tabConventions: 'Conventions KalanCode (klncd)',
      tabGlossaire: 'Glossaire Informatique',
      tabAide: 'Aide & Plateforme',
      searchPlaceholder: 'Rechercher un terme (ex: Variable, CPU, S3b3n, N’Ko)...',
      copyCode: 'Copier le code',
      copied: 'Copié !',
      lessonTag: 'Leçon associée',
      conventionSub: 'Documentation officielle des fonctions et conventions de la bibliothèque klncd v1.0.',
      paramsTitle: 'Paramètres',
      returnsTitle: 'Valeur retournée',
      exampleTitle: 'Exemple interactif',
      outputTitle: 'Résultat attendu en console',
    },
  };
  const tx = t[currentScript];

  return (
    <div className="view-root">
      {/* Header */}
      <div className="view-header">
        <div className="view-header-icon" style={{ background: 'rgba(7, 85, 232, 0.12)', color: 'var(--kc-primary)' }}>
          <BookMarked size={24} />
        </div>
        <div>
          <h1 className={`view-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>{tx.title}</h1>
          <p className={`view-sub ${currentScript === 'nko' ? 'nko-text' : ''}`}>{tx.sub}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="ressources-tabs-row" role="tablist">
        <button
          type="button"
          className={`ressources-tab-btn ${activeTab === 'vocabulaire' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('vocabulaire'); }}
          role="tab"
          aria-selected={activeTab === 'vocabulaire'}
        >
          <BookOpen size={16} />
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tabVocab}</span>
        </button>

        <button
          type="button"
          className={`ressources-tab-btn ${activeTab === 'conventions' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('conventions'); }}
          role="tab"
          aria-selected={activeTab === 'conventions'}
        >
          <Code size={16} />
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tabConventions}</span>
        </button>

        <button
          type="button"
          className={`ressources-tab-btn ${activeTab === 'glossaire' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('glossaire'); }}
          role="tab"
          aria-selected={activeTab === 'glossaire'}
        >
          <Layers size={16} />
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tabGlossaire}</span>
        </button>

        <button
          type="button"
          className={`ressources-tab-btn ${activeTab === 'aide' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('aide'); }}
          role="tab"
          aria-selected={activeTab === 'aide'}
        >
          <HelpCircle size={16} />
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tabAide}</span>
        </button>
      </div>

      {/* ── TAB 1: VOCABULAIRE ── */}
      {activeTab === 'vocabulaire' && (
        <div className="ressources-content-pane">
          {/* Search bar */}
          <div className="ressources-search-box">
            <Search size={18} color="var(--kc-primary)" />
            <input
              type="text"
              className="ressources-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={tx.searchPlaceholder}
            />
          </div>

          <div className="vocab-full-grid">
            {filteredVocab.map((item) => (
              <div key={item.id} className="vocab-detailed-card">
                <div className="vocab-card-header">
                  <div>
                    <h3 className="vocab-card-term-latin">{item.termBamanankan}</h3>
                    <div className="vocab-card-term-nko nko-text">{item.termNko}</div>
                  </div>
                  <span className="vocab-card-fr-badge">{item.termFr}</span>
                </div>

                <div className="vocab-card-lesson-tag">
                  <span>📍 {tx.lessonTag} : {item.lessonRef}</span>
                </div>

                <p className={`vocab-card-explanation ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                  {item.explanation[currentScript]}
                </p>

                <div className="vocab-card-example-box">
                  <span className="vocab-example-label">Misali (Exemple) :</span>
                  <pre className="code-pre">
                    <code>{item.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: CONVENTIONS KALANCODE (KLNCD) ── */}
      {activeTab === 'conventions' && (
        <div className="ressources-content-pane">
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--kc-navy)' }}>
              Bibliothèque Pédagogique KalanCode (<code style={{ color: 'var(--kc-primary)' }}>klncd v1.0</code>)
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {tx.conventionSub}
            </p>
          </div>

          <div className="conventions-list">
            {CONVENTIONS.map((conv) => (
              <div key={conv.name} className="convention-item-card">
                <div className="convention-card-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span className="convention-badge">Fonction</span>
                      <h3 className="convention-func-name">{conv.name}</h3>
                    </div>
                    <div className="convention-nko-subtitle nko-text">{conv.nkoName}</div>
                  </div>
                  <button
                    type="button"
                    className="seq-btn"
                    onClick={() => handleCopy(conv.example, conv.name)}
                    title={tx.copyCode}
                  >
                    {copiedId === conv.name ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span style={{ fontSize: '0.75rem' }}>{copiedId === conv.name ? tx.copied : tx.copyCode}</span>
                  </button>
                </div>

                {/* Signature */}
                <div className="convention-signature-box">
                  <code>{conv.signature}</code>
                </div>

                {/* Description */}
                <p className={`convention-desc ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                  {conv.summary[currentScript]}
                </p>

                {/* Parameters */}
                <div style={{ marginTop: '0.85rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--kc-navy)', marginBottom: '0.4rem' }}>
                    {tx.paramsTitle}
                  </h4>
                  <ul className="convention-params-list">
                    {conv.params.map((p) => (
                      <li key={p.name}>
                        <code>{p.name}</code> <span style={{ color: 'var(--kc-primary-bright)', fontWeight: 600 }}>({p.type})</span> : {p.desc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div style={{ marginTop: '0.85rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--kc-navy)', marginBottom: '0.4rem' }}>
                    {tx.exampleTitle}
                  </h4>
                  <pre className="code-pre">
                    <code>{conv.example}</code>
                  </pre>
                </div>

                {/* Console Output */}
                <div style={{ marginTop: '0.65rem' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>
                    {tx.outputTitle}
                  </h4>
                  <div className="convention-console-box">
                    <Terminal size={14} color="#38bdf8" />
                    <span>{conv.outputPreview}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: GLOSSAIRE INFORMATIQUE ── */}
      {activeTab === 'glossaire' && (
        <div className="ressources-content-pane">
          <div className="glossary-category-group">
            <h2 className="glossary-cat-title">Architecture des Ordinateurs</h2>
            <div className="glossary-items-grid">
              <div className="glossary-item-card">
                <h4>Architecture Von Neumann</h4>
                <p>Modèle structurel composé d'une unité de traitement (CPU), d'une unité de mémoire (RAM) et de dispositifs d'entrées/sorties connectés par un bus de données.</p>
              </div>
              <div className="glossary-item-card">
                <h4>Binaire (0 et 1)</h4>
                <p>Système de numération en base 2 utilisé par les circuits électroniques des ordinateurs où chaque état correspond à la présence ou l'absence de tension.</p>
              </div>
            </div>

            <h2 className="glossary-cat-title" style={{ marginTop: '1.5rem' }}>Bases du Code & Algorithmes</h2>
            <div className="glossary-items-grid">
              <div className="glossary-item-card">
                <h4>Types de Données (Types)</h4>
                <p>Catégorisation des valeurs en mémoire : Entier (<code>int</code>), Nombre flottant (<code>float</code>), Chaîne de texte (<code>str</code>) et Booléen (<code>bool</code>).</p>
              </div>
              <div className="glossary-item-card">
                <h4>Pseudocode & KalanCode</h4>
                <p>Représentation intermédiaire entre le langage humain (Bamanankan/N'Ko/Français) et le code Python strict, permettant de se concentrer sur la logique avant la syntaxe.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: AIDE & DOCUMENTATION ── */}
      {activeTab === 'aide' && (
        <div className="ressources-content-pane">
          <div className="help-cards-grid">
            <div className="help-card">
              <div className="help-card-icon" style={{ background: 'rgba(7, 85, 232, 0.1)', color: 'var(--kc-primary)' }}>
                🌐
              </div>
              <h3>Mode Bilingue Bamanankan & N'Ko RTL</h3>
              <p>
                Vous pouvez basculer l'interface à tout moment via les boutons en haut à droite :
                <strong>Bam.</strong> pour le Bamanankan en graphie latine officielle,
                <strong>ߒߞߏ</strong> pour la transcription authentique en alphabet N'Ko orientée de droite à gauche, et
                <strong>FR</strong> pour le français.
              </p>
            </div>

            <div className="help-card">
              <div className="help-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
                ⚡
              </div>
              <h3>Fonctionnement 100% Hors-Ligne (Offline)</h3>
              <p>
                KalanCode enregistre instantanément votre progression, vos points XP et vos badges dans le stockage local de votre navigateur. Vous n'avez pas besoin d'une connexion internet permanente pour pratiquer.
              </p>
            </div>

            <div className="help-card">
              <div className="help-card-icon" style={{ background: 'rgba(255, 196, 0, 0.15)', color: '#b45309' }}>
                ⌨️
              </div>
              <h3>Exécution Interactive du Code</h3>
              <p>
                Dans les défis interactifs et l’atelier KalanCode, vous pouvez modifier le code et cliquer sur <strong>« Labaara (Exécuter) »</strong>. La console gère les saisies interactives grâce à la commande <code>klncd.Doon()</code>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
