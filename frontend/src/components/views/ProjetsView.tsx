import React from 'react';
import type { ScriptMode } from '../../types';
import { FolderOpen, Lock, ChevronRight, Code2, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface ProjetsViewProps {
  currentScript: ScriptMode;
  onOpenProject?: (projectId: string) => void;
}

interface ProjectItem {
  id: string;
  emoji: string;
  titleLatin: string;
  titleNko: string;
  titleFr: string;
  descLatin: string;
  descNko: string;
  descFr: string;
  xp: number;
  unlocked: boolean;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  steps: number;
  tags: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    emoji: '🧮',
    titleLatin: 'Kuntigi Jatebɔ (Calculateur Simple)',
    titleNko: 'ߞߎ߲ߕߌ߮ ߖߊߕߋߓߐ (Calculateur)',
    titleFr: 'Calculateur de Marché Bamanan',
    descLatin: 'Jɔnjɔnw baara kɛ S3b3n ni Doon fɛ ka malo sɔngɔ jate.',
    descNko: 'ߖߊ߬ߕߋߓߐ ߞߍ S3b3n ߣߌ Doon ߝߍ߬ ߞߊ߬ ߡߊߟߏ ߛߐ߲߬ߞߐ ߟߐ߲.',
    descFr: 'Construire un calculateur arithmétique de vente de riz avec klncd.S3b3n et klncd.Doon.',
    xp: 100,
    unlocked: true,
    difficulty: 'Débutant',
    steps: 4,
    tags: ['klncd', 'Variables', 'Arithmétique'],
  },
  {
    id: 'proj-2',
    emoji: '📖',
    titleLatin: 'Kɔnɔbolɔ (Dictionnaire interactif)',
    titleNko: 'ߞߐ߲ߘߐ߲ ߘߊ߲ߕߍ߯ߓߐ (Dictionnaire)',
    titleFr: 'Mini-Dictionnaire Bamanankan–Français',
    descLatin: 'Dɔnniyaw mara ka ɲɛsin kɔmputɛri kumaw ma.',
    descNko: 'ߞߎߡߊߘߋ߲ ߠߎ߬ ߡߊߙߊ ߞߊ߬ ߓߡߊߣߊ߲ߞߊ߲ ߣߌ ߝߊ߬ߙߊ߲߬ߛߌ ߟߊߓߊ߲߫.',
    descFr: 'Créer un dictionnaire de termes techniques interrogeable avec conditions et variables.',
    xp: 150,
    unlocked: false,
    difficulty: 'Intermédiaire',
    steps: 6,
    tags: ['Python', 'Dictionnaire', 'Conditions'],
  },
  {
    id: 'proj-3',
    emoji: '🎮',
    titleLatin: 'Sɛnɛkɛli Jate (Jeu de devinette)',
    titleNko: 'ߖߊ߬ߕߋ߬ߟߊ߲ ߘߏ߲߬ߠߌ߲ (Jeu de devinette)',
    titleFr: 'Jeu de Devinette Numérique',
    descLatin: 'Ka jolo jɛtɛ kɛ ni baarakɛla Python ye.',
    descNko: 'ߖߊ߬ߕߋ߬ߘߋ߲ ߢߌߣߌ߲߫ ߓߎߞߟߌ ߣߌ߫ ߛߙߊߕߌ ߟߎ߬ ߟߊ߫.',
    descFr: 'Concevoir un jeu où l’ordinateur choisit un nombre et l’utilisateur doit le deviner avec indices.',
    xp: 200,
    unlocked: false,
    difficulty: 'Avancé',
    steps: 8,
    tags: ['Boucles', 'Conditions', 'Algorithmes'],
  },
];

const difficultyColor: Record<string, string> = {
  'Débutant':     '#10b981',
  'Intermédiaire':'#0755E8',
  'Avancé':       '#FF9B00',
};

export const ProjetsView: React.FC<ProjetsViewProps> = ({ currentScript, onOpenProject }) => {
  const t: Record<ScriptMode, {
    title: string;
    sub: string;
    stepsLabel: string;
    startBtn: string;
    lockedMsg: string;
    xpLabel: string;
    badgeLabel: string;
  }> = {
    latin: {
      title: 'Projets Guidés (Baarakɛda)',
      sub: 'Ka kalan fɔlɔw bɛɛ jɔnjɔn fara dɔ kan ka porogaramu lakika da.',
      stepsLabel: 'senw',
      startBtn: 'Daminɛ',
      lockedMsg: 'Kɔrɔkelen',
      xpLabel: 'XP',
      badgeLabel: 'Projet KalanCode',
    },
    nko: {
      title: 'ߔߙߏߖߍ ߟߊߞߊ߬ߟߌ߲߬ߣߍ߲ (Projets)',
      sub: 'ߞߊ߬ ߞߊ߬ߙߊ߲ ߝߐߟߐ ߟߎ߬ ߓߍ߯ ߘߟߏ߲߬ ka ߔߙߏߜ߭ߙߊߡ ߓߘߍ ߟߊߘߊ߲.',
      stepsLabel: 'ߛߋ߲߬ߠߎ',
      startBtn: 'ߊ߬ ߘߊߡߌ߬ߣߊ߬',
      lockedMsg: 'ߟߊ߬ߘߊ߲߬ߣߍ߲',
      xpLabel: 'XP',
      badgeLabel: 'ߔߙߏߖߍ KalanCode',
    },
    fr: {
      title: 'Projets Guidés',
      sub: 'Consolidez vos apprentissages en construisant de véritables programmes pas à pas.',
      stepsLabel: 'étapes',
      startBtn: 'Démarrer le projet',
      lockedMsg: 'À débloquer',
      xpLabel: 'XP',
      badgeLabel: 'Projet KalanCode',
    },
  };
  const tx = t[currentScript];

  return (
    <div className="view-root">
      {/* Header */}
      <div className="view-header">
        <div className="view-header-icon" style={{ background: 'rgba(255, 155, 0, 0.12)', color: 'var(--kc-orange)' }}>
          <FolderOpen size={24} />
        </div>
        <div>
          <h1 className={`view-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>{tx.title}</h1>
          <p className={`view-sub ${currentScript === 'nko' ? 'nko-text' : ''}`}>{tx.sub}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="projects-grid">
        {PROJECTS.map((proj) => {
          const titleMap: Record<ScriptMode, string> = { latin: proj.titleLatin, nko: proj.titleNko, fr: proj.titleFr };
          const descMap: Record<ScriptMode, string> = { latin: proj.descLatin, nko: proj.descNko, fr: proj.descFr };
          const color = difficultyColor[proj.difficulty];

          return (
            <div
              key={proj.id}
              className={`project-card ${!proj.unlocked ? 'locked' : ''}`}
            >
              <div className="project-card-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="project-emoji">{proj.emoji}</span>
                  <span
                    className="exercise-category-badge"
                    style={{ background: `${color}18`, color }}
                  >
                    {proj.difficulty}
                  </span>
                </div>
                {!proj.unlocked ? (
                  <span className="project-locked-icon" title={tx.lockedMsg}>
                    <Lock size={15} />
                  </span>
                ) : (
                  <span className="stat-pill" style={{ background: 'rgba(255, 196, 0, 0.15)', color: '#b45309', fontSize: '0.75rem' }}>
                    <Sparkles size={13} color="var(--kc-orange)" />
                    <span>+{proj.xp} {tx.xpLabel}</span>
                  </span>
                )}
              </div>

              <h3 className={`project-card-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {titleMap[currentScript]}
              </h3>

              <p className={`project-card-desc ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {descMap[currentScript]}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    background: 'var(--bg-surface-tint)',
                    color: 'var(--kc-primary)',
                    fontWeight: 600,
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="project-card-footer">
                <span className="project-steps-count">
                  <Code2 size={14} />
                  {proj.steps} {tx.stepsLabel}
                </span>

                {proj.unlocked ? (
                  <button
                    type="button"
                    className="exercise-start-btn"
                    onClick={() => {
                      sounds.playClick();
                      if (onOpenProject) onOpenProject(proj.id);
                    }}
                  >
                    {tx.startBtn} <ChevronRight size={14} />
                  </button>
                ) : (
                  <span className="exercise-locked-msg">{tx.lockedMsg}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
