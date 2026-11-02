import React, { useState } from 'react';
import type { MimoLesson } from '../../types/mimo';
import type { ScriptMode } from '../../types';
import { MimoStepPlayer } from './MimoStepPlayer';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { X, CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface MimoLessonModalProps {
  lesson: MimoLesson | null;
  currentScript: ScriptMode;
  onClose: () => void;
  onLessonFinished: (lessonId: string, xp: number) => void;
}

export const MimoLessonModal: React.FC<MimoLessonModalProps> = ({
  lesson,
  currentScript,
  onClose,
  onLessonFinished
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatus, setStepStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackText, setFeedbackText] = useState<string>('');

  if (!lesson) return null;

  const currentStep = lesson.steps[currentStepIndex];
  const totalSteps = lesson.steps.length;

  const handleAnswerSelected = (isCorrect: boolean) => {
    if (isCorrect) {
      sounds.playSuccess();
      setStepStatus('success');
      setFeedbackText(currentStep.explanationSuccess[currentScript]);
    } else {
      sounds.playError();
      setStepStatus('error');
      setFeedbackText(currentStep.explanationFailure[currentScript]);
    }
  };

  const handleNextStep = () => {
    sounds.playClick();
    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex((prev) => prev + 1);
      setStepStatus('idle');
      setFeedbackText('');
    } else {
      // Completed all steps in this lesson!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#38bdf8']
      });
      onLessonFinished(lesson.id, lesson.xpReward);
      onClose();
    }
  };

  const handleRetryStep = () => {
    sounds.playClick();
    setStepStatus('idle');
    setFeedbackText('');
  };

  return (
    <div className="mimo-modal-overlay" role="dialog" aria-modal="true">
      <div className="mimo-modal-container">
        {/* Top Header with Segmented Progress & Close */}
        <div className="mimo-modal-header">
          <button
            type="button"
            className="mimo-close-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            title="Quitter la leçon"
          >
            <X size={20} />
          </button>

          {/* Segmented Stepper Bar like Mimo */}
          <div className="mimo-segmented-progress">
            {lesson.steps.map((_, idx) => {
              const isFilled = idx < currentStepIndex || (idx === currentStepIndex && stepStatus === 'success');
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`mimo-progress-segment ${isFilled ? 'filled' : ''} ${isCurrent ? 'current' : ''}`}
                />
              );
            })}
          </div>

          <div className="mimo-xp-badge">
            <span>+{lesson.xpReward} XP</span>
          </div>
        </div>

        {/* Step Playground */}
        <div className="mimo-modal-body">
          <MimoStepPlayer
            step={currentStep}
            currentScript={currentScript}
            onAnswerSelected={handleAnswerSelected}
            status={stepStatus}
          />
        </div>

        {/* Bottom Feedback Sheet (Mimo-Style) */}
        {stepStatus !== 'idle' && (
          <div className={`mimo-bottom-sheet ${stepStatus}`}>
            <div className="sheet-content">
              <div className="sheet-message">
                {stepStatus === 'success' ? (
                  <CheckCircle size={28} className="sheet-icon success" />
                ) : (
                  <AlertCircle size={28} className="sheet-icon error" />
                )}
                <div>
                  <div className="sheet-status-heading">
                    {stepStatus === 'success'
                      ? currentScript === 'latin'
                        ? 'I ni ce kosɛbɛ !'
                        : currentScript === 'nko'
                        ? 'ߌ ߣߌ ߗߋ ߞߏߛߍߓߍ !'
                        : 'Excellent !'
                      : currentScript === 'latin'
                      ? 'A ma tiɲɛ'
                      : currentScript === 'nko'
                      ? 'ߊ ߡߊ ߕߌߢߍ'
                      : 'Pas tout à fait...'}
                  </div>
                  <div className={`sheet-explanation ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                    {feedbackText}
                  </div>
                </div>
              </div>

              <div className="sheet-action">
                {stepStatus === 'success' ? (
                  <button
                    type="button"
                    className="mimo-sheet-btn success"
                    onClick={handleNextStep}
                  >
                    <span>{currentStepIndex + 1 < totalSteps ? (currentScript === 'latin' ? 'Taa ɲɛ' : currentScript === 'nko' ? 'ߕߊ߯ ߢߍ' : 'Continuer') : (currentScript === 'latin' ? 'Kalan laban !' : currentScript === 'nko' ? 'ߞߊߟߊ߲ ߓߊ߲ߣߊ !' : 'Terminer !')}</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mimo-sheet-btn error"
                    onClick={handleRetryStep}
                  >
                    <RotateCcw size={16} />
                    <span>{currentScript === 'latin' ? 'Segi a kan' : currentScript === 'nko' ? 'ߛߋߞߌ߲ ߊ ߞߊ߲' : 'Réessayer'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
