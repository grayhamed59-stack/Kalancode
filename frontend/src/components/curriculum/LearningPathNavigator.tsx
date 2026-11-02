import React, { useState } from 'react';
import type { ScriptMode } from '../../types';
import type {
  LearningPath,
  CurriculumModule,
  UserLearningProgress
} from '../../types/curriculum';
import { CurriculumService } from '../../services/curriculumService';
import { LocalizationService } from '../../services/localizationService';

interface Props {
  currentScript: ScriptMode;
  progress: UserLearningProgress;
  onSelectLesson: (lessonId: string, moduleId: string) => void;
  onProgressChange: (newProgress: UserLearningProgress) => void;
}

export const LearningPathNavigator: React.FC<Props> = ({
  currentScript,
  progress,
  onSelectLesson,
  onProgressChange
}) => {
  const paths = CurriculumService.getPaths();
  const [selectedPathId, setSelectedPathId] = useState<string>(
    progress.activePathId || 'path-computer-science'
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(
    progress.activeModuleId || 'mod-cs-01-intro-algo'
  );

  const activePath =
    CurriculumService.getPathById(selectedPathId) || paths[0];
  const modules = CurriculumService.getModulesForPath(activePath.id);

  const isRtl = LocalizationService.getDirection(currentScript) === 'rtl';
  const fontClass = LocalizationService.getFontClass(currentScript);

  const handleModuleClick = (mod: CurriculumModule) => {
    const isUnlocked = CurriculumService.isModuleUnlocked(mod.id, progress);
    if (!isUnlocked) {
      return; // Module verrouillé
    }
    setSelectedModuleId(mod.id === selectedModuleId ? null : mod.id);
  };

  const handleUnlockDemo = (moduleId: string) => {
    // Raccourci d'apprentissage pour débloquer directement à des fins de démonstration/test
    if (!progress.unlockedModuleIds.includes(moduleId)) {
      const updated = {
        ...progress,
        unlockedModuleIds: [...progress.unlockedModuleIds, moduleId]
      };
      CurriculumService.saveProgress(updated);
      onProgressChange(updated);
    }
  };

  return (
    <div
      className={`klncd-path-navigator ${fontClass}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px'
      }}
    >
      {/* 1. Sélecteur de Parcours Officiels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {paths.map((p: LearningPath) => {
          const isCurrent = p.id === activePath.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPathId(p.id);
                const firstMod = CurriculumService.getModulesForPath(p.id)[0];
                if (firstMod) setSelectedModuleId(firstMod.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                borderRadius: '16px',
                border: isCurrent
                  ? `2px solid ${p.accentColor}`
                  : '1px solid #334155',
                background: isCurrent ? 'rgba(16, 185, 129, 0.08)' : '#1e293b',
                cursor: 'pointer',
                textAlign: isRtl ? 'right' : 'left',
                color: '#f8fafc',
                transition: 'all 0.2s ease',
                boxShadow: isCurrent ? '0 8px 24px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              <span
                style={{
                  fontSize: '2.5rem',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)'
                }}
              >
                {p.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    color: p.accentColor,
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}
                >
                  {p.id === 'path-computer-science'
                    ? LocalizationService.t('ui.path.main', currentScript)
                    : LocalizationService.t('ui.path.dedicated', currentScript)}
                </div>
                <h2 style={{ fontSize: '1.25rem', margin: '4px 0', fontWeight: 700 }}>
                  {LocalizationService.t(p.titleKey, currentScript)}
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
                  {LocalizationService.t(p.descriptionKey, currentScript)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Barre d'état de progression */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          background: '#0f172a',
          borderRadius: '12px',
          border: '1px solid #334155',
          fontSize: '0.9rem',
          color: '#cbd5e1'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⭐</span>
          <span>
            {LocalizationService.t('ui.xp', currentScript)} :{' '}
            <strong style={{ color: '#38bdf8' }}>{progress.xp} XP</strong>
          </span>
          <span style={{ margin: '0 8px', color: '#475569' }}>•</span>
          <span>🔥</span>
          <span>
            {LocalizationService.t('ui.streak', currentScript)} :{' '}
            <strong style={{ color: '#fb923c' }}>
              {progress.streakDays} {LocalizationService.t('ui.streak.unit', currentScript)}
            </strong>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📚</span>
          <span>
            {LocalizationService.t('ui.lessons.completed', currentScript)} :{' '}
            <strong style={{ color: '#10b981' }}>
              {progress.completedLessonIds.length}
            </strong>
          </span>
        </div>
      </div>

      {/* 3. Liste des Niveaux et Modules */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {activePath.levels.map((lvl) => {
          const levelModules = modules.filter((m) => m.levelId === lvl.id);
          if (levelModules.length === 0) return null;

          return (
            <div key={lvl.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 4px',
                  borderBottom: '1px solid #334155'
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: lvl.id === 'beginner' ? '#10b981' : '#f59e0b',
                    background:
                      lvl.id === 'beginner'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(245, 158, 11, 0.15)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  {LocalizationService.t(lvl.titleKey, currentScript)}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {levelModules.length} {LocalizationService.t('ui.module.lessons.count', currentScript).toLowerCase()}{levelModules.length > 1 ? 's' : ''}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {levelModules.map((mod: CurriculumModule) => {
                  const isUnlocked = CurriculumService.isModuleUnlocked(mod.id, progress);
                  const isExpanded = selectedModuleId === mod.id;
                  const moduleProgress = CurriculumService.getModuleProgress(mod.id, progress);
                  const isCompleted = progress.completedModuleIds.includes(mod.id);

                  return (
                    <div
                      key={mod.id}
                      style={{
                        borderRadius: '14px',
                        border: isUnlocked
                          ? isExpanded
                            ? `2px solid ${mod.accentColor}`
                            : '1px solid #334155'
                          : '1px dashed #475569',
                        background: isUnlocked ? '#1e293b' : '#0f172a',
                        opacity: isUnlocked ? 1 : 0.65,
                        overflow: 'hidden',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* En-tête du Module */}
                      <div
                        onClick={() => handleModuleClick(mod)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '16px 20px',
                          cursor: isUnlocked ? 'pointer' : 'not-allowed',
                          userSelect: 'none'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '1.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: isUnlocked
                              ? 'rgba(255,255,255,0.08)'
                              : 'rgba(255,255,255,0.02)'
                          }}
                        >
                          {mod.icon}
                        </span>

                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              marginBottom: '4px',
                              flexWrap: 'wrap'
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background:
                                  mod.language === 'klncd'
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'rgba(56, 189, 248, 0.2)',
                                color: mod.language === 'klncd' ? '#34d399' : '#38bdf8'
                              }}
                            >
                              {mod.language === 'klncd' ? 'klncd (Pseudocode)' : 'Python'}
                            </span>

                            {isCompleted && (
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  background: 'rgba(16, 185, 129, 0.25)',
                                  color: '#34d399',
                                  fontWeight: 600
                                }}
                              >
                                {LocalizationService.t('ui.module.completed', currentScript)}
                              </span>
                            )}
                          </div>

                          <h3
                            style={{
                              margin: '0 0 4px 0',
                              fontSize: '1.05rem',
                              fontWeight: 600,
                              color: isUnlocked ? '#f8fafc' : '#94a3b8'
                            }}
                          >
                            {LocalizationService.t(mod.titleKey, currentScript)}
                          </h3>

                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.85rem',
                              color: '#94a3b8',
                              lineHeight: 1.4
                            }}
                          >
                            {LocalizationService.t(mod.descriptionKey, currentScript)}
                          </p>

                          {/* Barre de progression du module */}
                          {isUnlocked && mod.lessonIds.length > 0 && (
                            <div
                              style={{
                                marginTop: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <div
                                style={{
                                  flex: 1,
                                  height: '6px',
                                  borderRadius: '3px',
                                  background: '#334155',
                                  overflow: 'hidden'
                                }}
                              >
                                <div
                                  style={{
                                    width: `${moduleProgress}%`,
                                    height: '100%',
                                    background: mod.accentColor,
                                    transition: 'width 0.3s ease'
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: '#94a3b8',
                                  minWidth: '35px'
                                }}
                              >
                                {moduleProgress}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Indicateur de Verrouillage / Déverrouillage */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {!isUnlocked ? (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#f87171',
                                fontSize: '0.8rem',
                                fontWeight: 600
                              }}
                            >
                              <span>🔒</span>
                              <span>{LocalizationService.t('ui.module.locked', currentScript)}</span>
                            </div>
                          ) : (
                            <span
                              style={{
                                fontSize: '1.2rem',
                                color: '#94a3b8',
                                transform: isExpanded ? 'rotate(90deg)' : 'none',
                                transition: 'transform 0.2s'
                              }}
                            >
                              ▶
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Contenu Déplié : Leçons du module */}
                      {isUnlocked && isExpanded && (
                        <div
                          style={{
                            padding: '16px 20px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            borderTop: '1px solid #334155',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: '#94a3b8',
                              textTransform: 'uppercase'
                            }}
                          >
                            {LocalizationService.t('ui.module.lessons.count', currentScript)} ({mod.lessonIds.length}) :
                          </div>

                          {mod.lessonIds.map((lessonId, index) => {
                            const lesson = CurriculumService.getLessonById(lessonId);
                            const isLessonCompleted =
                              progress.completedLessonIds.includes(lessonId);

                            return (
                              <div
                                key={lessonId}
                                onClick={() => onSelectLesson(lessonId, mod.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '12px 16px',
                                  borderRadius: '10px',
                                  background: isLessonCompleted
                                    ? 'rgba(16, 185, 129, 0.1)'
                                    : '#1e293b',
                                  border: isLessonCompleted
                                    ? '1px solid rgba(16, 185, 129, 0.3)'
                                    : '1px solid #334155',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s ease'
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      background: isLessonCompleted
                                        ? '#10b981'
                                        : '#334155',
                                      color: '#fff',
                                      fontSize: '0.8rem',
                                      fontWeight: 700
                                    }}
                                  >
                                    {isLessonCompleted ? '✓' : index + 1}
                                  </span>

                                  <div>
                                    <h4
                                      style={{
                                        margin: 0,
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: '#f8fafc'
                                      }}
                                    >
                                      {lesson
                                        ? LocalizationService.t(
                                            lesson.titleKey,
                                            currentScript
                                          )
                                        : `${LocalizationService.t('ui.lesson.start', currentScript)} ${index + 1}`}
                                    </h4>
                                    {lesson && (
                                      <p
                                        style={{
                                          margin: '2px 0 0 0',
                                          fontSize: '0.8rem',
                                          color: '#94a3b8'
                                        }}
                                      >
                                        {LocalizationService.t(
                                          lesson.summaryKey,
                                          currentScript
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '0.8rem',
                                      color: '#38bdf8',
                                      fontWeight: 600
                                    }}
                                  >
                                    +{lesson?.xpReward ?? 25} XP
                                  </span>
                                  <button
                                    style={{
                                      padding: '6px 14px',
                                      borderRadius: '8px',
                                      background: isLessonCompleted
                                        ? '#334155'
                                        : '#10b981',
                                      color: '#fff',
                                      border: 'none',
                                      fontWeight: 600,
                                      fontSize: '0.8rem',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {isLessonCompleted
                                      ? LocalizationService.t('ui.lesson.review', currentScript)
                                      : LocalizationService.t('ui.lesson.start', currentScript)}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Info de verrouillage si verrouillé */}
                      {!isUnlocked && (
                        <div
                          style={{
                            padding: '12px 20px',
                            background: 'rgba(0,0,0,0.2)',
                            fontSize: '0.8rem',
                            color: '#94a3b8',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>
                            {LocalizationService.t('ui.module.locked.hint', currentScript)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnlockDemo(mod.id);
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid #475569',
                              color: '#94a3b8',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            {LocalizationService.t('ui.module.unlock.test', currentScript)}
                          </button>
                        </div>
                      )}
                    </div>
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
