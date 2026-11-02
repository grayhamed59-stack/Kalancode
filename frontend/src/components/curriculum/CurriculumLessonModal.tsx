import React, { useState } from 'react';
import type { ScriptMode } from '../../types';
import type {
  CurriculumLesson,
  UserLearningProgress
} from '../../types/curriculum';
import { CurriculumService } from '../../services/curriculumService';
import { LocalizationService } from '../../services/localizationService';
import { KalanCodeConsole } from '../klncd/KalanCodeConsole';
import { KalanCodeRunner } from '../../klncd';
import type { ConsoleEntry, ExecutionState } from '../../klncd/types';

interface Props {
  lessonId: string;
  currentScript: ScriptMode;
  progress: UserLearningProgress;
  onClose: () => void;
  onProgressUpdate: (updated: UserLearningProgress, newlyUnlocked: string[]) => void;
}

export const CurriculumLessonModal: React.FC<Props> = ({
  lessonId,
  currentScript,
  progress,
  onClose,
  onProgressUpdate
}) => {
  const lesson: CurriculumLesson | undefined =
    CurriculumService.getLessonById(lessonId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const [consoleState, setConsoleState] = useState<ExecutionState>('idle');
  const [promptMessage, setPromptMessage] = useState<string | null>(null);
  const [unlockedCelebration, setUnlockedCelebration] = useState<string[] | null>(null);

  const addEntry = (type: ConsoleEntry['type'], text: string) => {
    setConsoleEntries((prev) => [
      ...prev,
      {
        id: `entry-${Date.now()}-${Math.random()}`,
        type,
        content: text,
        timestamp: Date.now()
      }
    ]);
  };

  // Pour l'exercice de séquençage (ex: thé)
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; message: string } | null>(null);

  const runnerRef = React.useRef<KalanCodeRunner | null>(null);
  const promptResolverRef = React.useRef<((val: string) => void) | null>(null);

  if (!lesson) {
    return null;
  }

  const isRtl = LocalizationService.getDirection(currentScript) === 'rtl';
  const fontClass = LocalizationService.getFontClass(currentScript);

  const activities = lesson.activities;
  const exercises = lesson.exercises;
  const totalSteps = activities.length + exercises.length;

  const isActivityStep = currentStepIndex < activities.length;
  const currentActivity = isActivityStep ? activities[currentStepIndex] : null;
  const currentExercise = !isActivityStep
    ? exercises[currentStepIndex - activities.length]
    : null;

  const handleNextStep = () => {
    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex(currentStepIndex + 1);
      setFeedback(null);
    } else {
      // Leçon terminée ! Débloquer automatiquement les modules suivants
      const { updatedProgress, newlyUnlockedModules } = CurriculumService.completeLesson(
        lesson.id,
        progress
      );
      onProgressUpdate(updatedProgress, newlyUnlockedModules);

      if (newlyUnlockedModules.length > 0) {
        setUnlockedCelebration(newlyUnlockedModules);
      } else {
        onClose();
      }
    }
  };

  const handleRunKlncdCode = async (codeToRun: string) => {
    setConsoleEntries([]);
    setConsoleState('running');
    setPromptMessage(null);
    setFeedback(null);

    const runner = new KalanCodeRunner();
    runnerRef.current = runner;

    try {
      await runner.run(codeToRun, {
        onOutput: (text) => addEntry('output', text),
        onPrompt: (question) => {
          setConsoleState('waiting_input');
          setPromptMessage(question);
          addEntry('prompt', question);
          return new Promise<string>((resolve) => {
            promptResolverRef.current = resolve;
          });
        },
        onStateChange: (state) => setConsoleState(state),
        onError: (err) => {
      addEntry('error', `${LocalizationService.t('ui.exercise.error', currentScript)} ${err.message}`);
        }
      });

      setFeedback({
        isSuccess: true,
        message: LocalizationService.t(
          currentExercise?.explanationSuccessKey || 'les.cs0102.ex1.success',
          currentScript
        )
      });
    } catch {
      setFeedback({
        isSuccess: false,
        message: LocalizationService.t(
          currentExercise?.explanationFailureKey || 'les.cs0102.ex1.failure',
          currentScript
        )
      });
    }
  };

  const handlePromptSubmit = (answer: string) => {
    if (promptResolverRef.current) {
      addEntry('input', answer);
      setPromptMessage(null);
      setConsoleState('running');
      promptResolverRef.current(answer);
      promptResolverRef.current = null;
    }
  };

  const handleSequencingSubmit = (correctOrder: string[]) => {
    const isCorrect =
      orderedItems.length === correctOrder.length &&
      orderedItems.every((item, i) => item === correctOrder[i]);

    if (isCorrect) {
      setFeedback({
        isSuccess: true,
        message: LocalizationService.t(
          currentExercise?.explanationSuccessKey || 'les.cs0101.ex1.success',
          currentScript
        )
      });
    } else {
      setFeedback({
        isSuccess: false,
        message: LocalizationService.t(
          currentExercise?.explanationFailureKey || 'les.cs0101.ex1.failure',
          currentScript
        )
      });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
    >
      <div
        className={fontClass}
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          backgroundColor: '#0f172a',
          borderRadius: '20px',
          border: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* En-tête */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#1e293b'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
              {LocalizationService.t('ui.modal.step', currentScript)} {currentStepIndex + 1} {LocalizationService.t('ui.modal.of', currentScript)} {totalSteps}
            </div>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', color: '#f8fafc' }}>
              {LocalizationService.t(lesson.titleKey, currentScript)}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal de célébration de déverrouillage de module */}
        {unlockedCelebration ? (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <span style={{ fontSize: '4rem' }}>🎉</span>
            <h2 style={{ fontSize: '1.8rem', color: '#10b981', margin: 0 }}>
              {LocalizationService.t('ui.modal.celebrate.title', currentScript)}
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '500px' }}>
              {LocalizationService.t('ui.modal.celebrate.body', currentScript)}
            </p>
            <div
              style={{
                padding: '12px 24px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                color: '#34d399',
                fontWeight: 700
              }}
            >
              +{lesson.xpReward} {LocalizationService.t('ui.modal.xp.earned', currentScript)}
            </div>
            <button
              onClick={onClose}
              style={{
                marginTop: '16px',
                padding: '14px 32px',
                borderRadius: '12px',
                background: '#10b981',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {LocalizationService.t('ui.modal.continue', currentScript)}
            </button>
          </div>
        ) : (
          /* Corps de la leçon */
          <div
            style={{
              padding: '24px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {/* 1. Étape Théorique / Concept */}
            {isActivityStep && currentActivity && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '1.3rem', color: '#38bdf8' }}>
                  {LocalizationService.t(currentActivity.titleKey, currentScript)}
                </h4>
                <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {LocalizationService.t(currentActivity.contentKey, currentScript)}
                </p>

                {currentActivity.codeSnippet && (
                  <div
                    style={{
                      background: '#020617',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #1e293b'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginBottom: '8px',
                        textTransform: 'uppercase'
                      }}
                    >
                      Code {currentActivity.codeSnippet.language} :
                    </div>
                    <pre
                      dir="ltr"
                      style={{
                        margin: 0,
                        color: '#34d399',
                        fontFamily: 'monospace',
                        fontSize: '0.95rem'
                      }}
                    >
                      {currentActivity.codeSnippet.code}
                    </pre>
                  </div>
                )}

                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#bae6fd',
                    fontSize: '0.95rem'
                  }}
                >
                  💡{' '}
                  <strong>
                    {LocalizationService.t(
                      currentActivity.keyTakeawayKey,
                      currentScript
                    )}
                  </strong>
                </div>
              </div>
            )}

            {/* 2. Étape Exercice Interactif */}
            {!isActivityStep && currentExercise && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#10b981',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    {LocalizationService.t('ui.exercise.label', currentScript)} ({currentExercise.language || 'Général'}) :
                  </div>
                  <h4 style={{ margin: '6px 0 0 0', fontSize: '1.1rem', color: '#f8fafc' }}>
                    {LocalizationService.t(
                      currentExercise.instructionKey,
                      currentScript
                    )}
                  </h4>
                </div>

                {/* Cas 2.A : Exercice de Séquençage */}
                {currentExercise.type === 'sequencing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      {LocalizationService.t('ui.exercise.click.order', currentScript)}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {currentExercise.payload.items.map((item: any) => {
                        const isSelected = orderedItems.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            disabled={isSelected}
                            onClick={() =>
                              setOrderedItems((prev) => [...prev, item.id])
                            }
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 16px',
                              borderRadius: '10px',
                              background: isSelected ? '#1e293b' : '#334155',
                              color: isSelected ? '#64748b' : '#f8fafc',
                              border: 'none',
                              cursor: isSelected ? 'not-allowed' : 'pointer',
                              fontWeight: 600
                            }}
                          >
                            <span>{item.icon}</span>
                            <span>
                              {LocalizationService.t(item.labelKey, currentScript)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {orderedItems.length > 0 && (
                      <div
                        style={{
                          padding: '14px',
                          background: '#020617',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          {LocalizationService.t('ui.exercise.your.order', currentScript)}
                        </span>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {orderedItems.map((id, idx) => (
                            <span
                              key={id}
                              style={{
                                padding: '4px 10px',
                                background: '#10b981',
                                color: '#fff',
                                borderRadius: '6px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {idx + 1}. {id.replace('step-', '')}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setOrderedItems([])}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#f87171',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          {LocalizationService.t('ui.exercise.reset', currentScript)}
                        </button>
                      </div>
                    )}

                    <button
                      disabled={
                        orderedItems.length !==
                        currentExercise.payload.correctOrder.length
                      }
                      onClick={() =>
                        handleSequencingSubmit(
                          currentExercise.payload.correctOrder
                        )
                      }
                      style={{
                        padding: '12px',
                        background: '#10b981',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        opacity:
                          orderedItems.length ===
                          currentExercise.payload.correctOrder.length
                            ? 1
                            : 0.5
                      }}
                    >
                      {LocalizationService.t('ui.exercise.validate.seq', currentScript)}
                    </button>
                  </div>
                )}

                {/* Cas 2.B : Exercice de Code Interactif (klncd) */}
                {currentExercise.type === 'code_interactive' &&
                  currentExercise.language === 'klncd' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          {LocalizationService.t('ui.exercise.engine', currentScript)}{' '}
                          <strong style={{ color: '#10b981' }}>
                            KalanCode Sandbox (klncd V1.0)
                          </strong>
                        </span>
                        <button
                          onClick={() =>
                            handleRunKlncdCode(
                              currentExercise.payload.starterCode
                            )
                          }
                          style={{
                            padding: '8px 18px',
                            borderRadius: '8px',
                            background: '#10b981',
                            color: '#fff',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>▶</span>
                          <span>{LocalizationService.t('ui.exercise.run', currentScript)}</span>
                        </button>
                      </div>

                      {/* Éditeur de code */}
                      <pre
                        dir="ltr"
                        style={{
                          background: '#020617',
                          padding: '16px',
                          borderRadius: '10px',
                          border: '1px solid #1e293b',
                          color: '#38bdf8',
                          margin: 0,
                          fontSize: '0.9rem',
                          fontFamily: 'monospace'
                        }}
                      >
                        {currentExercise.payload.starterCode}
                      </pre>

                      {/* Console Interactive Connectée */}
                      <div style={{ height: '220px' }}>
                        <KalanCodeConsole
                          entries={consoleEntries}
                          executionState={consoleState}
                          currentScript={currentScript}
                          waitingPromptQuestion={promptMessage}
                          onSubmitInput={handlePromptSubmit}
                          onClearConsole={() => setConsoleEntries([])}
                          onAbortExecution={() => {
                            if (runnerRef.current) runnerRef.current.abort();
                            setConsoleState('idle');
                          }}
                        />
                      </div>
                    </div>
                  )}

                {/* Retour pédagogique (Feedback) */}
                {feedback && (
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: feedback.isSuccess
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(239, 68, 68, 0.15)',
                      border: feedback.isSuccess
                        ? '1px solid #10b981'
                        : '1px solid #ef4444',
                      color: feedback.isSuccess ? '#34d399' : '#f87171',
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}
                  >
                    {feedback.isSuccess ? '✓ ' : '✕ '}
                    {feedback.message}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Pied de page avec bouton suivant */}
        {!unlockedCelebration && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #334155',
              display: 'flex',
              justifyContent: 'flex-end',
              background: '#1e293b'
            }}
          >
            <button
              onClick={handleNextStep}
              style={{
                padding: '12px 28px',
                borderRadius: '10px',
                background: '#10b981',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {currentStepIndex + 1 < totalSteps
                ? LocalizationService.t('ui.modal.next', currentScript)
                : LocalizationService.t('ui.modal.finish', currentScript)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
