import React, { useState } from 'react';
import type { ScriptMode } from '../../types';
import { 
  Play, RotateCcw, CheckCircle2, AlertCircle, ArrowLeft, 
  Terminal, Sparkles, Lightbulb, Code2, Award, Check
} from 'lucide-react';
import { sounds } from '../../utils/audio';
import { KalanCodeRunner } from '../../klncd';
import type { ConsoleEntry } from '../../klncd/types';

interface LessonStudioViewProps {
  currentScript: ScriptMode;
  lessonId?: string;
  onBackToParcours: () => void;
  onLessonCompleted: (lessonId: string, xp: number) => void;
}

interface PedagogicalSection {
  title: { latin: string; nko: string; fr: string };
  type: 'intro' | 'definition' | 'analogy' | 'example' | 'reminder';
  body: { latin: string; nko: string; fr: string };
  codeSnippet?: string;
}

interface LessonData {
  id: string;
  number: number;
  unitTitle: { latin: string; nko: string; fr: string };
  title: { latin: string; nko: string; fr: string };
  subtitle: { latin: string; nko: string; fr: string };
  xpReward: number;
  sections: PedagogicalSection[];
  initialCode: string;
  exercisePrompt: { latin: string; nko: string; fr: string };
  expectedKeywords: string[];
}

const LESSON_3_VARIABLES: LessonData = {
  id: 'lesson-3-variables',
  number: 3,
  unitTitle: {
    latin: 'Informatique de base • Unité 1 : Kɔmputɛri ani Porogaramu',
    nko: 'ߕߟߋ߬ߓߊ߮ ߓߊߖߎ • ߞߎߘߎ߲ ߁ : ߞߐ߲ߔߎߕߍߙߌ ߣߌ ߔߏߙߏߜ߭ߊߙߊߡߎ',
    fr: 'Informatique de base • Unité 1 : Ordinateur et Programmes',
  },
  title: {
    latin: 'Leçon 3 : Les variables (Yɛlɛmabaaw)',
    nko: 'ߞߊ߬ߙߊ߲ ߃ : ߦߟߍ߬ߡߊ߲߬ߓߊ߮ ߟߎ߬ (Variables)',
    fr: 'Leçon 3 : Les variables en programmation',
  },
  subtitle: {
    latin: 'Faamuya cogo la yɛlɛmabaa bɛ baara kɛ hakilidaga (RAM) kɔnɔ ka fɛnw mara.',
    nko: 'ߝߊ߰ߡߎ߲߬ߠߌ߲ ߛߐ߬ߘߐ߲߬ ߦߟߍ߬ߡߊ߲߬ߓߊ߮ ߓߊ߯ߙߊߢߊ ߟߊ߫ ߤߊߞߟߌߘߊ߮ (RAM) ߞߣߐ߫.',
    fr: 'Comprendre le rôle fondamental des variables pour stocker et manipuler des données en mémoire vive (RAM).',
  },
  xpReward: 50,
  sections: [
    {
      title: {
        latin: '1. Yɛlɛmabaa ye mun ye ? (Qu’est-ce qu’une variable ?)',
        nko: '߁. ߦߟߍ߬ߡߊ߲߬ߓߊ߮ ߦߋ߫ ߡߎ߲߬ ߘߌ߫ ؟',
        fr: "1. Qu'est-ce qu'une variable ?",
      },
      type: 'intro',
      body: {
        latin: 'Porogaramu bɛɛ kɔnɔ, an bɛ se ka kunnafoniw mara (mɔgɔ tɔgɔ, sɔngɔ, jate). Yɛlɛmabaa (variable) ye tɔgɔ dɔ ye min bɛ di yɔrɔ dɔ ma hakilidaga kɔnɔ walasa k’a mara.',
        nko: 'ߔߙߏߜ߭ߙߊߡ ߓߍ߯ ߘߐ߫، ߊ߲ ߡߊ߬ߞߏ ߦߋ߫ ߞߎ߲߬ߠߊ߬ߝߎߟߋ߲ ߠߎ߬ ߡߊߙߊ ߟߊ߫ (ߕߐ߮، ߛߐ߲߬ߞߐ، ߖߊ߬ߕߋ). ߦߟߍ߬ߡߊ߲߬ߓߊ߮ ߟߋ߬ ߦߋ߫ ߦߙߐ ߏ߬ ߕߐ߮ ߘߌ߫ ߤߊߞߟߌߘߊ߮ ߞߣߐ߫.',
        fr: 'Dans tout programme informatique, nous manipulons des données (un prénom, un prix, un compteur). Une variable est un espace étiqueté dans la mémoire vive (RAM) qui stocke une valeur réutilisable.',
      },
    },
    {
      title: {
        latin: '2. Misali : Kɛsulin tɔgɔlen (L’analogie de la boîte)',
        nko: '߂. ߛߊ߲߬ߘߊ : ߞߎ߬ߘߎ߲ ߕߐ߯ߟߊߣߍ߲',
        fr: '2. L’analogie de la boîte étiquetée',
      },
      type: 'analogy',
      body: {
        latin: 'I hakili bila kɛsu dɔ la min kan sɛbɛnnen don ko "togo". I bɛ se ka "Mori" don kɛsu kɔnɔ. Sisan kɛsu tɔgɔ ye "togo", a kɔnɔfɛn ye "Mori".',
        nko: 'ߌ ߤߊߞߟߌ ߟߊߓߌ߬ߟߊ߬ ߞߎ߬ߘߎ߲߬ߣߍ߲߫ ߠߊ߫ ߡߍ߲ ߞߊ߲߬ߠߊ ߦߋ߫ "togo". ߌ ߘߌ߫ ߛߋ߫ ߞߊ߬ "ߡߏߙߌ" ߘߏ߲߬ ߊ߬ ߞߣߐ߫.',
        fr: 'Imaginez une boîte sur laquelle vous collez une étiquette "prenom". Vous déposez à l’intérieur le mot "Mori". Partout où vous utilisez le mot "prenom", l’ordinateur sait qu’il s’agit de "Mori".',
      },
      codeSnippet: `togo = "Mori"\nkilos = 12\nprix_kilo = 500`,
    },
    {
      title: {
        latin: '3. Yɛlɛma kɛcogo (Pourquoi dit-on "variable" ?)',
        nko: '߃. ߦߟߍ߬ߡߊ߲ ߞߍߢߊ',
        fr: '3. Pourquoi appelle-t-on cela une variable ?',
      },
      type: 'definition',
      body: {
        latin: 'Bawo a kɔnɔfɛn bɛ se ka yɛlɛma waati bɛɛ ! Ni kilos tun ye 12 ye, o kɔfɛ kilos bɛ se ka kɛ 15 ye.',
        nko: 'ߓߊߏ߬ ߊ߬ ߞߣߐߝߋ߲ ߘߌ߫ ߛߋ߫ ߞߊ߬ ߦߟߍ߬ߡߊ߲߫ ߕߎ߬ߡߊ ߓߍ߯ ! ߣߌ߫ ߖߊ߬ߕߋ ߕߘߍ߬ ߦߋ߫ ߁߂ ߘߌ߫، ߊ߬ ߘߌ߫ ߛߋ߫ ߞߊ߬ ߞߍ߫ ߁߅ ߘߌ߫ ߞߐߝߍ߬.',
        fr: 'Parce que son contenu peut varier au fil du programme ! Vous pouvez remplacer la valeur initiale par une nouvelle sans recréer la boîte.',
      },
      codeSnippet: `kilos = 12\nkilos = 15  # Sisan kilos ye 15 ye !`,
    },
    {
      title: {
        latin: '4. Kalan Kunnafoni (À retenir absolument)',
        nko: '߄. ߞߊ߬ߙߊ߲ ߞߎ߲߬ߠߊ߬ߝߎߟߋ߲',
        fr: '4. Ce qu’il faut retenir',
      },
      type: 'reminder',
      body: {
        latin: '1. = ma kɔrɔ kɛ jate jɔnjɔn ye, a kɔrɔ ye ka fɛn don (affectation).\n2. Yɛlɛmabaa tɔgɔ kana daminɛ ni jatebɔlan ye (pas de chiffre au début).\n3. KalanCode kɔnɔ, an bɛ se ka Bamanankan tɔgɔw baara.',
        nko: '߁. = ߕߍ߫ ߖߊ߬ߕߋ߬ ߝߙߊ ߘߌ߫، ߊ߬ ߞߘߐ ߟߋ߬ ߞߏ߫ ߞߊ߬ ߝߋ߲ ߘߏ߲߬ ߊ߬ ߞߣߐ߫.\n߂. ߦߟߍ߬ߡߊ߲߬ߓߊ߮ ߕߐ߮ ߞߊߣߊ߬ ߘߊߡߌ߬ߣߊ߬ ߖߊ߬ߕߋ߬ߘߋ߲ ߠߊ߫.\n߃. KalanCode ߞߣߐ߫، ߊ߲ ߘߌ߫ ߛߋ߫ ߞߊ߬ ߓߡߊߣߊ߲ߞߊ߲ ߕߐ߮ ߠߎ߬ ߟߊߓߊ߯ߙߊ.',
        fr: '1. Le symbole = représente l’affectation (ranger dans la boîte), pas l’égalité mathématique.\n2. Le nom de variable ne doit jamais commencer par un chiffre.\n3. En KalanCode, vous pouvez utiliser des noms en Bamanankan clairs et explicites.',
      },
    },
  ],
  initialCode: `# Leçon 3 : Pratique des variables
import klncd

# 1. Déclarer une variable pour ton prénom
togo = "Mori"

# 2. Déclarer une variable pour le nombre de kilos
kilos = 5

# 3. Afficher avec la bibliothèque klncd
klncd.S3b3n("I ni ce, " + togo)
klncd.S3b3n("Quantité choisie : " + str(kilos) + " kg")
`,
  exercisePrompt: {
    latin: 'Dɛgeli : Yɛlɛma kɛ "togo" kan ni i yɛrɛ tɔgɔ ye, ani "kilos" kɛ 10 ye, o kɔfɛ klikɛ "Labaara" kan !',
    nko: 'ߘߍ߰ߟߌ : ߦߟߍ߬ߡߊ߲ ߞߍ߫ "togo" ߞߊ߲߬ ߣߌ߫ ߌ ߖߍ߬ߘߍ ߕߐ߮ ߘߌ߫، ߊ߬ ߣߌ߫ "kilos" ߞߍ߫ 10 ߘߌ߫ ߞߊ߬ ߞߟߌߞ "ߟߊߓߊ߯ߙߊ" ߞߊ߲߬ !',
    fr: 'Défi pratique : Modifie la variable `togo` avec ton prénom et mets `kilos = 10`, puis clique sur « Exécuter » pour valider !',
  },
  expectedKeywords: ['togo', 'klncd.S3b3n'],
};

export const LessonStudioView: React.FC<LessonStudioViewProps> = ({
  currentScript,
  lessonId: _lessonId,
  onBackToParcours,
  onLessonCompleted,
}) => {
  const lesson = LESSON_3_VARIABLES;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sourceCode, setSourceCode] = useState(lesson.initialCode);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'Atelier KalanCode Studio prêt. Entrez votre code ou modifiez les variables.',
      timestamp: Date.now(),
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionSuccess, setExecutionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runnerRef = React.useRef<KalanCodeRunner>(new KalanCodeRunner());

  const handleRunCode = async () => {
    sounds.playClick();
    setIsRunning(true);
    setErrorMessage(null);
    setConsoleEntries([
      {
        id: `run-${Date.now()}`,
        type: 'system',
        content: `Exécution du script Python (klncd v1.0)...`,
        timestamp: Date.now(),
      },
    ]);

    try {
      await runnerRef.current.run(sourceCode, {
        onOutput: (text: string) => {
          setConsoleEntries((prev) => [
            ...prev,
            { id: `out-${Date.now()}-${Math.random()}`, type: 'output', content: text, timestamp: Date.now() },
          ]);
        },
        onPrompt: async (promptText: string) => {
          setConsoleEntries((prev) => [
            ...prev,
            { id: `prompt-${Date.now()}`, type: 'prompt', content: promptText, timestamp: Date.now() },
          ]);
          return 'Apprenant';
        },
        onError: (err: Error) => {
          setErrorMessage(err.message);
          setConsoleEntries((prev) => [
            ...prev,
            { id: `err-${Date.now()}`, type: 'error', content: `[KalanCode Erreur] ${err.message}`, timestamp: Date.now() },
          ]);
        },
      });

      sounds.playSuccess();
      setExecutionSuccess(true);
      onLessonCompleted(lesson.id, lesson.xpReward);
    } catch (err: any) {
      sounds.playError();
      setErrorMessage(err.message || 'Erreur d’exécution');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setSourceCode(lesson.initialCode);
    setErrorMessage(null);
    setExecutionSuccess(false);
    setConsoleEntries([
      {
        id: `reset-${Date.now()}`,
        type: 'system',
        content: 'Code réinitialisé au modèle d’origine.',
        timestamp: Date.now(),
      },
    ]);
  };

  const handlePrevSection = () => {
    sounds.playClick();
    if (currentSectionIndex > 0) setCurrentSectionIndex(currentSectionIndex - 1);
  };

  const handleNextSection = () => {
    sounds.playClick();
    if (currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const t: Record<ScriptMode, {
    backBtn: string;
    editorTitle: string;
    runBtn: string;
    runningBtn: string;
    resetBtn: string;
    terminalTitle: string;
    stepProgress: string;
    prevBtn: string;
    nextBtn: string;
    finishBtn: string;
    challengeTitle: string;
    successBanner: string;
  }> = {
    latin: {
      backBtn: '← Kalan Sira',
      editorTitle: 'KalanCode Sɛbɛnlan (Éditeur)',
      runBtn: 'Labaara (Exécuter)',
      runningBtn: 'Bɛ labaara...',
      resetBtn: 'Kokura',
      terminalTitle: 'Konsɔli & Kɔfɔli (Console)',
      stepProgress: `Yɛlɛma ${currentSectionIndex + 1} / ${lesson.sections.length}`,
      prevBtn: 'Kɔfɛ',
      nextBtn: 'Ɲɛfɛ →',
      finishBtn: 'Kalan Dafa ✓',
      challengeTitle: 'Dɛgeli Lakika (Défi Pratique)',
      successBanner: 'I ye dɛgeli kɛ ka ɲuman ! +50 XP sɔrɔla 🎉',
    },
    nko: {
      backBtn: 'ߞߊ߬ߙߊ߲ ߛߌߙߊ →',
      editorTitle: 'ߞߊߟߊ߲ߞߏߘ ߛߓߍߟߊ߲ (Éditeur)',
      runBtn: 'ߟߊߓߊ߯ߙߊ (Exécuter)',
      runningBtn: 'ߊ߬ ߦߋ߫ ߟߊߓߊ߯ߙߊ߫ ߟߊ...',
      resetBtn: 'ߊ߬ ߞߎߘߊߞߍ',
      terminalTitle: 'ߞߐ߲ߛߐߟ ߣߌ ߟߊ߬ߓߐ߬ߟߌ',
      stepProgress: `ߛߋ߲ ${currentSectionIndex + 1} / ${lesson.sections.length}`,
      prevBtn: 'ߞߐߝߍ',
      nextBtn: 'ߢߍߝߍ ←',
      finishBtn: 'ߞߊ߬ߙߊ߲ ߘߝߊ߫ ✓',
      challengeTitle: 'ߘߍ߰ߟߌ ߟߊߞߌߞߊ (Défi)',
      successBanner: 'ߌ ߓߊ߯ߙߊ ߢߊ߬ ߘߊ߫ ! +50 XP ߛߐ߬ߘߐ߲߬ ߘߊ߫ 🎉',
    },
    fr: {
      backBtn: '← Retour au parcours',
      editorTitle: 'Éditeur KalanCode (Python / klncd v1.0)',
      runBtn: 'Exécuter le code',
      runningBtn: 'Exécution...',
      resetBtn: 'Réinitialiser',
      terminalTitle: 'Console & Résultats',
      stepProgress: `Étape ${currentSectionIndex + 1} / ${lesson.sections.length}`,
      prevBtn: 'Précédent',
      nextBtn: 'Suivant →',
      finishBtn: 'Terminer la leçon ✓',
      challengeTitle: 'Exercice Pratique Intégré',
      successBanner: 'Exercice validé avec succès ! +50 XP remportés 🎉',
    },
  };
  const tx = t[currentScript];

  const currentSection = lesson.sections[currentSectionIndex];

  return (
    <div className="lesson-studio-root">
      {/* Top Studio Bar */}
      <div className="studio-topbar">
        <button
          type="button"
          className="studio-back-btn"
          onClick={() => { sounds.playClick(); onBackToParcours(); }}
        >
          <ArrowLeft size={16} />
          <span>{tx.backBtn}</span>
        </button>

        <div className="studio-topbar-center">
          <span className="studio-unit-pill">
            {lesson.unitTitle[currentScript]}
          </span>
          <span className="studio-progress-badge">
            {tx.stepProgress}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span className="stat-pill" style={{ background: 'rgba(255, 196, 0, 0.15)', color: '#b45309' }}>
            <Award size={14} color="var(--kc-orange)" />
            <span>+{lesson.xpReward} XP</span>
          </span>
        </div>
      </div>

      {/* Main 2-Column Split Workspace */}
      <div className="studio-split-workspace">
        
        {/* ── COLONNE GAUCHE : CONTENU PÉDAGOGIQUE ── */}
        <section className="studio-col-left" aria-label="Contenu pédagogique">
          <div className="pedagogy-header">
            <div className="pedagogy-tag">
              <Sparkles size={14} />
              <span>Kalan {lesson.number}</span>
            </div>
            <h1 className={`pedagogy-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {lesson.title[currentScript]}
            </h1>
            <p className={`pedagogy-lead ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {lesson.subtitle[currentScript]}
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="pedagogy-stepper-dots">
            {lesson.sections.map((sec, idx) => (
              <button
                key={idx}
                type="button"
                className={`pedagogy-dot ${idx === currentSectionIndex ? 'active' : ''} ${idx < currentSectionIndex ? 'completed' : ''}`}
                onClick={() => { sounds.playClick(); setCurrentSectionIndex(idx); }}
                title={sec.title[currentScript]}
              >
                {idx < currentSectionIndex ? <Check size={10} /> : idx + 1}
              </button>
            ))}
          </div>

          {/* Current Section Card */}
          <div className={`pedagogy-card ${currentSection.type}`}>
            <div className="pedagogy-card-header">
              <h2 className={`pedagogy-card-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {currentSection.title[currentScript]}
              </h2>
            </div>

            <div className={`pedagogy-card-body ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {currentSection.body[currentScript].split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '0.85rem' }}>{para}</p>
              ))}
            </div>

            {currentSection.codeSnippet && (
              <div className="pedagogy-code-snippet">
                <div className="code-snippet-header">
                  <span>Exemple de syntaxe</span>
                </div>
                <pre className="code-pre">
                  <code>{currentSection.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Integrated Challenge Banner */}
          <div className="pedagogy-challenge-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Lightbulb size={18} color="var(--kc-orange)" />
              <strong style={{ color: 'var(--kc-navy)' }}>{tx.challengeTitle}</strong>
            </div>
            <p className={`challenge-instruction ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {lesson.exercisePrompt[currentScript]}
            </p>
          </div>

          {/* Pagination Navigation */}
          <div className="pedagogy-nav-footer">
            <button
              type="button"
              className="pedagogy-nav-btn secondary"
              onClick={handlePrevSection}
              disabled={currentSectionIndex === 0}
            >
              <ArrowLeft size={16} />
              <span>{tx.prevBtn}</span>
            </button>

            {currentSectionIndex < lesson.sections.length - 1 ? (
              <button
                type="button"
                className="pedagogy-nav-btn primary"
                onClick={handleNextSection}
              >
                <span>{tx.nextBtn}</span>
              </button>
            ) : (
              <button
                type="button"
                className="pedagogy-nav-btn success"
                onClick={handleRunCode}
              >
                <span>{tx.finishBtn}</span>
              </button>
            )}
          </div>
        </section>

        {/* ── COLONNE DROITE : ATELIER DE PROGRAMMATION ── */}
        <section className="studio-col-right" aria-label="Atelier de programmation">
          
          {/* Editor Header Bar */}
          <div className="editor-top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={16} color="var(--kc-primary-bright)" />
              <span className="editor-bar-title">{tx.editorTitle}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="editor-icon-btn"
                onClick={handleReset}
                title={tx.resetBtn}
              >
                <RotateCcw size={14} />
                <span className="btn-label">{tx.resetBtn}</span>
              </button>

              <button
                type="button"
                className="editor-run-btn"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                <Play size={14} />
                <span>{isRunning ? tx.runningBtn : tx.runBtn}</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with Line Numbers */}
          <div className="editor-textarea-wrapper">
            <div className="editor-line-numbers" aria-hidden="true">
              {sourceCode.split('\n').map((_, idx) => (
                <div key={idx} className="line-no">{idx + 1}</div>
              ))}
            </div>
            <textarea
              className="editor-code-input code-font"
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          {/* Output / Console Zone */}
          <div className="studio-console-pane">
            <div className="console-pane-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} color="#38bdf8" />
                <span>{tx.terminalTitle}</span>
              </div>
              {executionSuccess && (
                <span className="console-success-badge">
                  <CheckCircle2 size={13} />
                  <span>Validé</span>
                </span>
              )}
            </div>

            <div className="console-output-box">
              {consoleEntries.map((entry) => (
                <div key={entry.id} className={`console-row ${entry.type}`}>
                  {entry.type === 'output' && <span className="console-prefix">&gt;</span>}
                  {entry.type === 'prompt' && <span className="console-prefix">?</span>}
                  {entry.type === 'error' && <span className="console-prefix">!</span>}
                  <span className="console-text">{entry.content}</span>
                </div>
              ))}
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="studio-error-banner">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Celebration Banner */}
            {executionSuccess && (
              <div className="studio-success-banner">
                <Sparkles size={16} />
                <span>{tx.successBanner}</span>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
