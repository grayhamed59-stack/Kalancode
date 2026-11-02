import React from 'react';
import type { ScriptMode } from '../../types';
import { Dumbbell, ChevronRight, Lock } from 'lucide-react';

interface ExercicesViewProps {
  currentScript: ScriptMode;
  completedLessonIds: string[];
}

const EXERCISES = [
  { id: 'ex-1', category: 'quiz',    titleLatin: 'Quiz : Kɔmputɛri cogo',     titleFr: 'Quiz : Fonctionnement ordinateur', titleNko: 'ߞ߭ߌߛ : ߞߐ߲ߔߎߕߍߙߌ ߢߊ', xp: 20, unlocked: true },
  { id: 'ex-2', category: 'logic',   titleLatin: 'Aligoritimu baaraw',         titleFr: 'Exercices algorithmiques',         titleNko: 'ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߓߊ߮ ߟߎ',   xp: 35, unlocked: true },
  { id: 'ex-3', category: 'code',    titleLatin: 'klncd S3b3n ni Doon',        titleFr: 'Pratique klncd S3b3n & Doon',      titleNko: 'klncd ߔߙߊ߬ߕߌߞ',            xp: 50, unlocked: true },
  { id: 'ex-4', category: 'code',    titleLatin: 'Baarakɛla fɔlɔ (Python)',    titleFr: 'Premier programme Python',         titleNko: 'ߔߊߦߑߕߐ߲ ߔߙߊ߬ߕߌߞ',        xp: 60, unlocked: false },
  { id: 'ex-5', category: 'project', titleLatin: 'Kuntigi kɛlan (Mini-Projet)', titleFr: 'Mini-projet guidé',               titleNko: 'ߡߌߣߌ ߔߙߐ߭ßߍ',             xp: 80, unlocked: false },
];

const categoryColors: Record<string, string> = {
  quiz:    '#0755E8',
  logic:   '#18A5FF',
  code:    '#10b981',
  project: '#FF9B00',
};

const categoryLabels: Record<string, Record<ScriptMode, string>> = {
  quiz:    { latin: 'Quiz',    nko: 'ߞ߭ߌߛ',     fr: 'Quiz' },
  logic:   { latin: 'Logique', nko: 'ߟߏ߬ßߌߞ', fr: 'Logique' },
  code:    { latin: 'Code',    nko: 'ߞߏ',         fr: 'Code' },
  project: { latin: 'Projet',  nko: 'ߔߙߐ߭',      fr: 'Projet' },
};

export const ExercicesView: React.FC<ExercicesViewProps> = ({ currentScript, completedLessonIds: _completedLessonIds }) => {
  const t: Record<ScriptMode, { title: string; sub: string; lockedMsg: string; startBtn: string; xpLabel: string }> = {
    latin: { title: 'Exercices & Quiz',        sub: 'Kalan sira kunnafoni baarakɛla.',          lockedMsg: 'Kɔrɔkelen',   startBtn: 'Daminɛ',    xpLabel: 'XP' },
    nko:   { title: 'ߓߊ߯ߙߊ ߊ߬ ߣߌ ߞ߭ߌߛ', sub: 'ߞߊߟߊ߲ ߛߌߙߊ ߞߎ߲ ߓߊ߯ߙߊ ߟߊ.',          lockedMsg: 'ߞߐ߲ ߟߊ',     startBtn: 'ߘߊߡߌ',    xpLabel: 'XP' },
    fr:    { title: 'Exercices & Quiz',        sub: 'Pratiquez les notions du parcours.',        lockedMsg: 'Verrouillé',  startBtn: 'Commencer', xpLabel: 'XP' },
  };
  const tx = t[currentScript];

  return (
    <div className="view-root">
      <div className="view-header">
        <div className="view-header-icon" style={{ background: 'rgba(7, 85, 232, 0.1)', color: 'var(--kc-primary)' }}>
          <Dumbbell size={22} />
        </div>
        <div>
          <h1 className={`view-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>{tx.title}</h1>
          <p className={`view-sub ${currentScript === 'nko' ? 'nko-text' : ''}`}>{tx.sub}</p>
        </div>
      </div>

      <div className="exercises-grid">
        {EXERCISES.map((ex) => {
          const titleMap: Record<ScriptMode, string> = {
            latin: ex.titleLatin,
            nko: ex.titleNko,
            fr: ex.titleFr,
          };
          const color = categoryColors[ex.category];
          return (
            <div
              key={ex.id}
              className={`exercise-card ${!ex.unlocked ? 'locked' : ''}`}
              style={{ borderLeft: `4px solid ${ex.unlocked ? color : '#d1d5db'}` }}
            >
              <div className="exercise-card-top">
                <span
                  className="exercise-category-badge"
                  style={{ background: `${color}18`, color }}
                >
                  {categoryLabels[ex.category][currentScript]}
                </span>
                {!ex.unlocked && <Lock size={14} color="#9ca3af" />}
              </div>
              <h3 className={`exercise-card-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {titleMap[currentScript]}
              </h3>
              <div className="exercise-card-footer">
                <span className="exercise-xp">+{ex.xp} {tx.xpLabel}</span>
                {ex.unlocked ? (
                  <button type="button" className="exercise-start-btn">
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
