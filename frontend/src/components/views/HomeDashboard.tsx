import React from 'react';
import type { ScriptMode } from '../../types';
import type { Badge } from '../../types';
import { Sparkles, TrendingUp, Clock, Target, BookOpen, ChevronRight } from 'lucide-react';
import { KalanCodeMascot } from '../brand/KalanCodeMascot';

interface HomeDashboardProps {
  currentScript: ScriptMode;
  score: number;
  streakDays: number;
  badges: Badge[];
  completedLessonIds: string[];
  totalLessons: number;
  onGoToParcours: () => void;
  onGoToCours?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  currentScript,
  score,
  streakDays,
  badges,
  completedLessonIds,
  totalLessons,
  onGoToParcours,
  onGoToCours,
}) => {
  const pct = totalLessons > 0 ? Math.round((completedLessonIds.length / totalLessons) * 100) : 0;

  const t: Record<ScriptMode, {
    greeting: string;
    subtitle: string;
    continueBtn: string;
    statsTitle: string;
    progressLabel: string;
    xpLabel: string;
    streakLabel: string;
    lessonsLabel: string;
    progressTitle: string;
    progressSub: string;
    badgesTitle: string;
    tipsTitle: string;
    tip1: string;
    tip2: string;
    tip3: string;
  }> = {
    latin: {
      greeting: 'I ni sogoma, kalanba! 👋',
      subtitle: 'Aw ye sɛbɛ ɲuman da. Bɛɛ ka se kɔmputɛri dɔnni ma.',
      continueBtn: 'Kalan Lajɛ → Parcours Kalan',
      statsTitle: 'I ka Statistics',
      progressLabel: 'Sira yɛlɛma',
      xpLabel: 'XP Points',
      streakLabel: 'Kɔnɔ lɔn',
      lessonsLabel: 'Kalansiraw',
      progressTitle: 'I ka yɛlɛma kalan na',
      progressSub: `${completedLessonIds.length} / ${totalLessons} ka ban`,
      badgesTitle: 'I ka Badges',
      tipsTitle: 'I ka jɔnjɔnw',
      tip1: '💡 Jate kɛ wulɔ wulɔ — kalan bɛ sen ni sen kɔ.',
      tip2: '🎯 Leçon kelen kɛ tile o tile — atigɛ ye sebaaga ye.',
      tip3: '🔥 I bɛ kɔnɔ lɔn dɔn — kɛ a jɛku jɛku.',
    },
    nko: {
      greeting: 'ߌ ߣߌ ߛߏ߲ߜ߭ߏߡߊ، ߞߊߟߊ߲ߓߊ! 👋',
      subtitle: 'ߊ߯ ߦߋ ߛߍߓߍ ߢߎߡߊ߲ ߘߊ ߓߌߟߊ. ߓߍ ߞߊ ߛߋ ߞߐ߲ߔߎߕߍߙߌ ߘߐ߲ ߡߊ.',
      continueBtn: 'ߞߊߟߊ߲ ߟߊߖߍ ← ߞߊߟߊ߲ ߛߌߙߊ',
      statsTitle: 'ߌ ߞߊ ߛߕߊߕߌߛߕߌߞ',
      progressLabel: 'ߛߌߙߊ ߦߍߟߍ߲ ',
      xpLabel: 'XP ߔߐ߮',
      streakLabel: 'ߟߊ߬ ߟߐ߲',
      lessonsLabel: 'ߞߊߙߊ߲ ߠߎ',
      progressTitle: 'ߌ ߞߊ ߦߍߟߍ߲ ߞߊߟߊ߲ ߠߊ',
      progressSub: `${completedLessonIds.length} / ${totalLessons} ߞߊ ߓߊ߲`,
      badgesTitle: 'ߌ ߞߊ ߓߊ߬ߘ߭ ߟߎ',
      tipsTitle: 'ߌ ߞߊ ߖߐ߲ ߟߎ',
      tip1: '💡 ߖߊ߬ߕߋ ߞߍ ߕߏ ߕߏ — ߞߊߟߊ߲ ߓߍ ߛߋ߲ ߣߌ ߛߋ߲ ߞߐ.',
      tip2: '🎯 ߞߊߙߊ߲ ߞߋߟߋ߲ ߞߍ ߕߌߟߋ ߏ ߕߌߟߋ.',
      tip3: '🔥 ߌ ߓߍ ߟߊ߬ ߟߐ߲ ߘߐ߲ — ߞߍ ߊ ߖߍߞߎ.',
    },
    fr: {
      greeting: 'Bonjour, apprenant ! 👋',
      subtitle: 'Continuez votre apprentissage. Chaque leçon vous rapproche du code.',
      continueBtn: 'Continuer → Parcours Kalan',
      statsTitle: 'Mes statistiques',
      progressLabel: 'Progression',
      xpLabel: 'Points XP',
      streakLabel: 'Jours consécutifs',
      lessonsLabel: 'Leçons',
      progressTitle: 'Ma progression',
      progressSub: `${completedLessonIds.length} / ${totalLessons} terminées`,
      badgesTitle: 'Mes badges',
      tipsTitle: 'Conseils',
      tip1: "💡 Résoudre un problème à la fois — l'apprentissage est progressif.",
      tip2: '🎯 Une leçon par jour — la constance est une force.',
      tip3: "🔥 Maintenez votre série — c'est la régularité qui compte.",
    }
  };

  const tx = t[currentScript];

  return (
    <div className="dashboard-root">
      {/* Welcome Hero */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-text">
          <h1 className={`dashboard-greeting ${currentScript === 'nko' ? 'nko-text' : ''}`}>
            {tx.greeting}
          </h1>
          <p className={`dashboard-subtitle ${currentScript === 'nko' ? 'nko-text' : ''}`}>
            {tx.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              className="primary-btn dashboard-continue-btn"
              onClick={onGoToParcours}
            >
              <span className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.continueBtn}</span>
              <ChevronRight size={18} />
            </button>
            {onGoToCours && (
              <button
                type="button"
                onClick={onGoToCours}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                <span>
                  {currentScript === 'nko'
                    ? 'ߞߊ߬ߙߊ߲ ߠߎ߬ ߟߊ߬ߘߍ'
                    : currentScript === 'fr'
                    ? 'Cours à la carte ⚡'
                    : 'Kalansenw Bɛɛ ⚡'}
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="dashboard-hero-mascot">
          <KalanCodeMascot size={150} className="dashboard-mascot-img" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats-row">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ background: 'rgba(7, 85, 232, 0.1)', color: 'var(--kc-primary)' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="dashboard-stat-value">{pct}%</div>
            <div className="dashboard-stat-label">{tx.progressLabel}</div>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ background: 'rgba(255, 196, 0, 0.12)', color: '#b45309' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div className="dashboard-stat-value">{score}</div>
            <div className="dashboard-stat-label">{tx.xpLabel}</div>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ background: 'rgba(255, 155, 0, 0.12)', color: '#c2410c' }}>
            <Target size={22} />
          </div>
          <div>
            <div className="dashboard-stat-value">{streakDays}</div>
            <div className="dashboard-stat-label">{tx.streakLabel}</div>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div className="dashboard-stat-value">{completedLessonIds.length}</div>
            <div className="dashboard-stat-label">{tx.lessonsLabel}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h2 className={`dashboard-card-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
            {tx.progressTitle}
          </h2>
          <span className="dashboard-card-sub">{tx.progressSub}</span>
        </div>
        <div className="dashboard-progress-track">
          <div
            className="dashboard-progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Clock size={14} color="var(--text-subtle)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{pct}% complété</span>
        </div>
      </div>

      <div className="dashboard-bottom-row">
        {/* Badges */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className={`dashboard-card-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {tx.badgesTitle}
            </h2>
          </div>
          <div className="dashboard-badges-grid">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`dashboard-badge-item ${b.unlocked ? 'unlocked' : 'locked'}`}
                title={b.name[currentScript]}
              >
                <span className="dashboard-badge-icon">{b.icon}</span>
                <span className={`dashboard-badge-name ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                  {b.name[currentScript]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className={`dashboard-card-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {tx.tipsTitle}
            </h2>
          </div>
          <ul className="dashboard-tips-list">
            <li className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tip1}</li>
            <li className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tip2}</li>
            <li className={currentScript === 'nko' ? 'nko-text' : ''}>{tx.tip3}</li>
          </ul>
          {/* Bambara Proverb */}
          <div className="dashboard-proverb">
            <p className={`dashboard-proverb-text ${currentScript === 'nko' ? 'nko-text' : ''}`}>
              {currentScript === 'nko'
                ? '« ߟߐ߲ߠߌ߲ ߕߍ ߓߊ߲، ߊ ߓߍ ߘߏ ߝߙߊ ߘߏ ߞߊ߲ »'
                : currentScript === 'fr'
                ? '« Le savoir ne s\'épuise jamais, chaque étape en ajoute une autre. »'
                : '« Kalan tɛ ban, dɔnniya bɛ dɔ fara dɔ kan. »'}
            </p>
            <span className="dashboard-proverb-author">
              {currentScript === 'nko' ? 'ߡߊ߲ߘߋ߲ ߞߘߐ' : 'Proverbe bambara'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
