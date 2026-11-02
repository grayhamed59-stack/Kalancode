import React, { useState } from 'react';
import type { MimoUnit, MimoLesson } from '../../types/mimo';
import type { ScriptMode } from '../../types';
import { Play, Check, Sparkles, Lock, Laptop, Shield, Layers } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface CurriculumRoadmapProps {
  units: MimoUnit[];
  currentScript: ScriptMode;
  completedLessonIds: string[];
  onStartLesson: (lesson: MimoLesson) => void;
}

export const CurriculumRoadmap: React.FC<CurriculumRoadmapProps> = ({
  units,
  currentScript,
  completedLessonIds,
  onStartLesson
}) => {
  const [selectedPath, setSelectedPath] = useState<'all' | 'cs' | 'cyber'>('cs');

  const displayedUnits = units.filter((u) => {
    if (selectedPath === 'cs') return u.number <= 7;
    if (selectedPath === 'cyber') return u.number >= 8;
    return true;
  });

  return (
    <div className="curriculum-roadmap">
      <div className="roadmap-header">
        <div className="roadmap-title-row">
          <div className="brand-badge">
            <Sparkles size={14} />
            <span>KalanCode • Sira Kalan ({units.length} Modules)</span>
          </div>
        </div>

        {/* Parcours Switcher Tabs */}
        <div className="parcours-selector-tabs" style={{ display: 'flex', gap: '0.75rem', margin: '1rem 0 1.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`parcours-tab-btn ${selectedPath === 'cs' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setSelectedPath('cs');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '999px',
              border: selectedPath === 'cs' ? '2px solid #087BFA' : '1px solid rgba(255,255,255,0.15)',
              background: selectedPath === 'cs' ? 'linear-gradient(135deg, #0755E8, #087BFA)' : 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedPath === 'cs' ? '0 4px 14px rgba(7, 85, 232, 0.35)' : 'none'
            }}
          >
            <Laptop size={16} />
            <span>
              {currentScript === 'nko'
                ? 'ߕߟߋ߬ߓߊ߮ ߣߌ߫ ߞߏߘߌ (ߡߐߘߎߟ ߇)'
                : currentScript === 'fr'
                ? '💻 Informatique Fondamentale & Algorithmes (7 Modules)'
                : '💻 Kɔmputɛri & Aligoritimu (7 Modules)'}
            </span>
          </button>

          <button
            type="button"
            className={`parcours-tab-btn ${selectedPath === 'cyber' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setSelectedPath('cyber');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '999px',
              border: selectedPath === 'cyber' ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.15)',
              background: selectedPath === 'cyber' ? 'linear-gradient(135deg, #059669, #10b981)' : 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedPath === 'cyber' ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none'
            }}
          >
            <Shield size={16} />
            <span>
              {currentScript === 'nko'
                ? 'ߟߊ߬ߞߊ߲߬ߘߊ߬ߟߌ ߣߌ߫ ߓߟߐߟߐ (ߡߐߘߎߟ ߄)'
                : currentScript === 'fr'
                ? '🛡️ Cybersécurité & Hygiène Numérique (4 Modules)'
                : '🛡️ Lakana & Geleŋgeleŋ (4 Modules)'}
            </span>
          </button>

          <button
            type="button"
            className={`parcours-tab-btn ${selectedPath === 'all' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setSelectedPath('all');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderRadius: '999px',
              border: selectedPath === 'all' ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.15)',
              background: selectedPath === 'all' ? 'linear-gradient(135deg, #7c3aed, #8b5cf6)' : 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={16} />
            <span>
              {currentScript === 'nko'
                ? 'ߓߍ߯ ߟߊߘߍ߬ߣߍ߲ (߁߁)'
                : currentScript === 'fr'
                ? 'Tous les parcours (11)'
                : 'Bɛɛ lajɛlen (11)'}
            </span>
          </button>
        </div>

        <h2 className={`roadmap-headline ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {selectedPath === 'cyber'
            ? (currentScript === 'latin'
                ? 'Cybersécurité & Lakana (SIM Swap, Phishing, 2FA)'
                : currentScript === 'nko'
                ? 'ߟߊ߬ߞߊ߲߬ߘߊ߬ߟߌ ߣߌ߫ ߓߟߐߟߐ (SIM Swap, Phishing, 2FA)'
                : 'Cybersécurité & Protection Numérique')
            : (currentScript === 'latin'
                ? 'Kalan Sira Bɛrɛbɛrɛ (Kɔmputɛri fo ka se Python ma)'
                : currentScript === 'nko'
                ? 'ߞߊߟߊ߲ ߛߌߙߊ ߓߍߙߍߓߍߙߍ (ߞߐ߲ߔߎߕߍߙߌ ߝߏ ߞߊ ߛߋ ߔߊߦߑߕߐ߲ ߡߊ)'
                : 'Informatique Fondamentale & Algorithmes (Progression)')}
        </h2>
        <p className={`roadmap-subheadline ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {selectedPath === 'cyber'
            ? (currentScript === 'latin'
                ? 'SIM swap, SMS janfa kɔlɔsi, passphrase kɔdi gɛlɛnw ani HTTPS lakana.'
                : currentScript === 'nko'
                ? 'SIM swap ߣߌ ߗߋߛߓߍ ߖߊ߲ߝߊ ߞߟߏߛߌ ߣߌ ߕߊ߬ߡߌ߲߬ߞߊ߲ ߠߊߞߊ߲ߘߊ.'
                : 'Protéger son compte Mobile Money, déjouer le phishing SMS et naviguer en toute sécurité.')
            : (currentScript === 'latin'
                ? 'Kɔmputɛri, porogaramu, baro tɛ aligoritimu, klncd pseudocode dɛgeliw ani Python.'
                : currentScript === 'nko'
                ? 'ߞߐ߲ߔߎߕߍߙߌ، ߔߏߙߏߜ߭ߊߙߊߡߎ، ߓߊߙߏ ߕߍ ߊߟߌߜ߭ߏߙߌߕߌߡߎ، ߞߊߟߊ߲ߞߏߘ ߘߍ߰ߟߌ ߟߎ ߊ߬ߣߌ ߔߊߦߑߕߐ߲.'
                : 'De l’ordinateur au premier programme, de l’algorithme du thé malien au pseudocode KalanCode jusqu’à Python.')}
        </p>
      </div>

      <div className="units-stream">
        {displayedUnits.map((unit, unitIdx) => {
          const totalLessons = unit.lessons.length;
          const completedInUnit = unit.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const unitProgressPct = Math.round((completedInUnit / totalLessons) * 100);

          // Unit locking logic: Unit 0 in the selected path is unlocked. Subsequent units unlock when previous unit is finished.
          const isUnitUnlocked =
            unitIdx === 0 ||
            displayedUnits[unitIdx - 1].lessons.every((prevLes) =>
              completedLessonIds.includes(prevLes.id)
            );

          return (
            <div
              key={unit.id}
              className={`unit-card ${isUnitUnlocked ? 'unlocked' : 'locked'}`}
              style={{
                borderLeftColor: isUnitUnlocked ? unit.accentColor : 'rgba(255,255,255,0.15)',
                opacity: isUnitUnlocked ? 1 : 0.65
              }}
            >
              {/* Unit Header Banner */}
              <div className="unit-card-header">
                <div className="unit-badge-and-title">
                  <div
                    className="unit-icon-box"
                    style={{
                      background: isUnitUnlocked ? `${unit.accentColor}20` : 'rgba(255,255,255,0.05)',
                      borderColor: isUnitUnlocked ? unit.accentColor : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <span>{unit.icon}</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span className="unit-step-num">UNITÉ {unit.number}</span>
                      <span className={`unit-difficulty ${unit.difficulty.toLowerCase()}`}>
                        {unit.difficulty}
                      </span>
                      {!isUnitUnlocked && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            color: 'var(--text-subtle)',
                            background: 'rgba(255,255,255,0.06)',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px'
                          }}
                        >
                          <Lock size={12} />
                          <span>
                            {currentScript === 'latin'
                              ? 'Datugulen'
                              : currentScript === 'nko'
                              ? 'ߘߊߕߎߜߎߟߋ߲'
                              : 'Verrouillé'}
                          </span>
                        </span>
                      )}
                    </div>

                    <h3 className={`unit-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                      {unit.title[currentScript]}
                    </h3>
                  </div>
                </div>

                <div className="unit-progress-pill">
                  <span>{completedInUnit}/{totalLessons}</span>
                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill"
                      style={{
                        width: `${unitProgressPct}%`,
                        background: isUnitUnlocked ? unit.accentColor : '#64748b'
                      }}
                    />
                  </div>
                </div>
              </div>

              <p className={`unit-desc ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {unit.description[currentScript]}
              </p>

              {/* Lessons Nodes Grid */}
              <div className="lessons-nodes-list">
                {unit.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  // Lesson locking: inside an unlocked unit, lesson is unlocked if it's the first or previous lesson in this unit is done
                  const isLessonUnlocked =
                    isUnitUnlocked &&
                    (lessonIdx === 0 ||
                      completedLessonIds.includes(unit.lessons[lessonIdx - 1].id));

                  return (
                    <button
                      key={lesson.id}
                      id={`lesson-btn-${lesson.id}`}
                      type="button"
                      disabled={!isLessonUnlocked}
                      className={`lesson-node-card ${
                        isCompleted
                          ? 'completed'
                          : isLessonUnlocked
                          ? 'ready'
                          : 'locked'
                      }`}
                      style={{
                        cursor: isLessonUnlocked ? 'pointer' : 'not-allowed',
                        opacity: isLessonUnlocked ? 1 : 0.5
                      }}
                      onClick={() => {
                        if (isLessonUnlocked) {
                          sounds.playClick();
                          onStartLesson(lesson);
                        } else {
                          sounds.playError();
                        }
                      }}
                      title={
                        !isLessonUnlocked
                          ? (currentScript === 'latin'
                              ? 'Kalan tɛmɛnen dafan walasa ka in dayɛlɛ'
                              : currentScript === 'nko'
                              ? 'ߞߊߟߊ߲ ߕߍߡߍߣߍ߲ ߘߊߝߊ ߥߊߟߊߛߊ ߞߊ ߣߌ߲ ߘߊߦߍߟߍ'
                              : 'Termine la leçon précédente pour déverrouiller celle-ci')
                          : undefined
                      }
                    >
                      <div className="node-icon-status">
                        {isCompleted ? (
                          <div className="node-circle done">
                            <Check size={18} />
                          </div>
                        ) : isLessonUnlocked ? (
                          <div className="node-circle active">
                            <Play size={16} fill="currentColor" />
                          </div>
                        ) : (
                          <div className="node-circle locked" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-subtle)' }}>
                            <Lock size={15} />
                          </div>
                        )}
                      </div>

                      <div className="node-info">
                        <div className={`node-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                          {lesson.title[currentScript]}
                        </div>
                        <div className="node-sub">
                          <span>{lesson.steps.length} {currentScript === 'latin' ? 'senw' : currentScript === 'nko' ? 'ߛߋ߲ ߠߎ' : 'étapes'}</span>
                          <span>•</span>
                          <span style={{ color: 'var(--accent-gold)' }}>+{lesson.xpReward} XP</span>
                          {isCompleted ? (
                            <span style={{ color: 'var(--accent-green)', marginLeft: '0.4rem' }}>
                              ✓ {currentScript === 'latin' ? 'Banna' : currentScript === 'nko' ? 'ߓߊ߲ߣߊ' : 'Validé'}
                            </span>
                          ) : !isLessonUnlocked ? (
                            <span style={{ color: 'var(--text-subtle)', marginLeft: '0.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                              <Lock size={10} />
                              {currentScript === 'latin' ? 'Datugulen' : currentScript === 'nko' ? 'ߘߊߕߎߜߎߟߋ߲' : 'Verrouillé'}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
