import React, { useState } from 'react';
import type { LessonExercise, ScriptMode, SequencingItem } from '../types';
import { Play, RotateCcw, Lightbulb, CheckCircle, AlertTriangle, ArrowUp, ArrowDown, ShieldAlert, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ExerciseRunnerProps {
  exercise: LessonExercise;
  currentScript: ScriptMode;
  onSuccess: () => void;
}

export const ExerciseRunner: React.FC<ExerciseRunnerProps> = ({
  exercise,
  currentScript,
  onSuccess
}) => {
  // Sequencing state
  const [seqItems, setSeqItems] = useState<SequencingItem[]>(() => {
    return exercise.sequencing ? [...exercise.sequencing.items] : [];
  });
  const [executingStepIndex, setExecutingStepIndex] = useState<number | null>(null);

  // Condition state
  const [selectedConditionOption, setSelectedConditionOption] = useState<number | null>(null);

  // General feedback state
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Reset when exercise changes
  React.useEffect(() => {
    if (exercise.sequencing) {
      setSeqItems([...exercise.sequencing.items]);
    }
    setSelectedConditionOption(null);
    setStatus('idle');
    setShowHint(false);
    setFeedbackMessage('');
    setExecutingStepIndex(null);
  }, [exercise]);

  // Handle Sequencing Move Up / Down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    sounds.playClick();
    const newItems = [...seqItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setSeqItems(newItems);
    setStatus('idle');
  };

  // Run the sequencing algorithm simulator with animated step-by-step playback!
  const handleRunAlgorithm = async () => {
    if (!exercise.sequencing) return;
    setStatus('running');
    sounds.playClick();

    // Step by step visual highlighting
    for (let i = 0; i < seqItems.length; i++) {
      setExecutingStepIndex(i);
      sounds.playStep();
      await new Promise((r) => setTimeout(r, 650));
    }

    setExecutingStepIndex(null);

    // Verify order
    const currentOrder = seqItems.map((item) => item.id);
    const isCorrect = currentOrder.every((id, idx) => id === exercise.sequencing!.correctOrder[idx]);

    if (isCorrect) {
      sounds.playSuccess();
      setStatus('success');
      setFeedbackMessage(exercise.explanationSuccess[currentScript]);
      onSuccess();
    } else {
      sounds.playError();
      setStatus('error');
      setFeedbackMessage(exercise.explanationFailure[currentScript]);
    }
  };

  // Handle Condition Choice
  const handleSelectConditionOption = (optIndex: number) => {
    sounds.playClick();
    setSelectedConditionOption(optIndex);

    if (!exercise.condition) return;
    const testCase = exercise.condition.testCases[0];
    const isCorrect = optIndex === testCase.correctIndex;

    if (isCorrect) {
      sounds.playSuccess();
      setStatus('success');
      setFeedbackMessage(exercise.explanationSuccess[currentScript]);
      onSuccess();
    } else {
      sounds.playError();
      setStatus('error');
      setFeedbackMessage(exercise.explanationFailure[currentScript]);
    }
  };

  // Handle Phishing Decision
  const handlePhishingDecision = (userGuessedLegitimate: boolean) => {
    if (!exercise.phishing) return;
    sounds.playClick();

    const isCorrect = userGuessedLegitimate === exercise.phishing.isLegitimate;
    if (isCorrect) {
      sounds.playSuccess();
      setStatus('success');
      setFeedbackMessage(exercise.explanationSuccess[currentScript]);
      onSuccess();
    } else {
      sounds.playError();
      setStatus('error');
      setFeedbackMessage(exercise.explanationFailure[currentScript]);
    }
  };

  // Reset exercise state
  const handleReset = () => {
    sounds.playClick();
    if (exercise.sequencing) {
      setSeqItems([...exercise.sequencing.items]);
    }
    setSelectedConditionOption(null);
    setStatus('idle');
    setExecutingStepIndex(null);
  };

  const labels: Record<ScriptMode, {
    run: string;
    running: string;
    reset: string;
    hint: string;
    interactiveTag: string;
    scamBtn: string;
    legitBtn: string;
    cluesTitle: string;
  }> = {
    latin: {
      run: "Aligoritimu bila baara la",
      running: "Kɔmputɛri bɛ baara la...",
      reset: "Segi a daminɛ na",
      hint: "Dɛmɛ kɔlɔsi",
      interactiveTag: "Dɛgeli kɛcogo",
      scamBtn: "⚠️ Kalansira juguman don (Arnaque)",
      legitBtn: "✅ Tiɲɛ don (Légitime)",
      cluesTitle: "Kɔlɔsiliko fɔlɔw :"
    },
    nko: {
      run: "ߊߟߑߜ߭ߏߙߕߌߡ ߓߌ߬ߟߊ߬ ߓߊ߯ߙߊ ߟߊ߫",
      running: "ߕߟߋ߬ߓߊ߮ ߦߋ߫ ߓߊ߯ߙߊ ߟߊ߫...",
      reset: "ߛߋ߬ߦߌ߲߬ ߘߊߡߌߣߊ ߡߊ߬",
      hint: "ߘߍ߬ߡߍ߲߬ߠߌ߲",
      interactiveTag: "ߘߐ߬ߞߊ߬ߙߊ߲߬ߠߌ߲",
      scamBtn: "⚠️ ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲ ߠߋ߬ (Arnaque)",
      legitBtn: "✅ ߕߐ߬ߢߊ߫ ߟߋ߬ (Légitime)",
      cluesTitle: "ߖߊ߲߬ߕߏ߬ߒ߬ߘߐ߬ ߞߏ ߟߎ߬ :"
    },
    fr: {
      run: "Exécuter l'algorithme",
      running: "Simulation en cours...",
      reset: "Réinitialiser",
      hint: "Indice pédagogique",
      interactiveTag: "Exercice interactif",
      scamBtn: "⚠️ C'est une arnaque (Phishing)",
      legitBtn: "✅ C'est un vrai message",
      cluesTitle: "Indices à repérer :"
    }
  };

  const currentLabel = labels[currentScript];

  return (
    <div className="exercise-box">
      <div className="exercise-header">
        <div className="exercise-title">
          <Sparkles size={20} color="var(--accent-gold)" />
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>
            {exercise.title[currentScript]}
          </span>
        </div>
        <span className="brand-badge">{currentLabel.interactiveTag}</span>
      </div>

      <p className={`exercise-prompt ${currentScript === 'nko' ? 'nko-text' : ''}`}>
        {exercise.prompt[currentScript]}
      </p>

      {/* EXERCISE 1: SEQUENCING (Tea Preparation / Taji) */}
      {exercise.type === 'sequencing' && exercise.sequencing && (
        <div className="sequencer-container">
          <div className="sequencer-items">
            {seqItems.map((item, index) => {
              const isCurrentStepRunning = executingStepIndex === index;
              const isSuccess = status === 'success';
              const isError = status === 'error';

              return (
                <div
                  key={item.id}
                  className={`seq-item ${isCurrentStepRunning ? 'active-step' : ''} ${isSuccess ? 'correct' : ''} ${isError ? 'wrong' : ''}`}
                >
                  <div className="seq-icon">{item.icon}</div>
                  <div className={`seq-text ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                    {item.text[currentScript]}
                  </div>

                  <div className="seq-actions">
                    <button
                      type="button"
                      className="seq-btn"
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0 || status === 'running'}
                      title="Monter d'un cran"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      type="button"
                      className="seq-btn"
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === seqItems.length - 1 || status === 'running'}
                      title="Descendre d'un cran"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sim-controls">
            <button
              type="button"
              className="primary-btn"
              onClick={handleRunAlgorithm}
              disabled={status === 'running'}
            >
              <Play size={18} />
              <span className={currentScript === 'nko' ? 'nko-text' : ''}>
                {status === 'running' ? currentLabel.running : currentLabel.run}
              </span>
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {exercise.hint && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    sounds.playClick();
                    setShowHint(!showHint);
                  }}
                >
                  <Lightbulb size={16} color="var(--accent-gold)" />
                  <span>{currentLabel.hint}</span>
                </button>
              )}

              <button
                type="button"
                className="secondary-btn"
                onClick={handleReset}
                title={currentLabel.reset}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXERCISE 2: CONDITION BRANCH (Senekɛla / Weather decision) */}
      {exercise.type === 'condition_branch' && exercise.condition && (
        <div>
          <div style={{
            background: 'rgba(10, 13, 20, 0.7)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              {exercise.condition.scenario[currentScript]}
            </div>
            <div className="code-pre">
              {`if sanji_bena == True:\n    # Quel résultat s'affiche ?`}
            </div>
          </div>

          <div className="option-grid">
            {exercise.condition.testCases[0].options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                className={`option-btn ${selectedConditionOption === idx ? 'selected' : ''}`}
                onClick={() => handleSelectConditionOption(idx)}
              >
                <span className={currentScript === 'nko' ? 'nko-text' : ''}>
                  {option[currentScript]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* EXERCISE 3: PHISHING DETECTOR (Orange Money SMS Simulation) */}
      {exercise.type === 'phishing_detection' && exercise.phishing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Simulated Mobile Screen */}
          <div className="sms-phone-mockup">
            <div className="phone-speaker" />
            <div className="sms-bubble">
              <div className="sms-sender">
                <ShieldAlert size={14} color="#f43f5e" />
                <span>{exercise.phishing.sender}</span>
              </div>
              <div className={`sms-content ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {exercise.phishing.messageContent[currentScript]}
              </div>
            </div>
          </div>

          {/* Action Decision */}
          <div className="decision-buttons">
            <button
              type="button"
              className="btn-scam"
              onClick={() => handlePhishingDecision(false)}
            >
              <span>{currentLabel.scamBtn}</span>
            </button>
            <button
              type="button"
              className="btn-legit"
              onClick={() => handlePhishingDecision(true)}
            >
              <span>{currentLabel.legitBtn}</span>
            </button>
          </div>

          {/* Clues accordion if hint is opened or error happened */}
          {(showHint || status === 'error' || status === 'success') && (
            <div style={{
              background: 'rgba(10, 13, 20, 0.75)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                {currentLabel.cluesTitle}
              </div>
              <ul style={{ paddingLeft: currentScript === 'nko' ? 0 : '1.25rem', paddingRight: currentScript === 'nko' ? '1.25rem' : 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {exercise.phishing.clues[currentScript].map((clue, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{clue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Hint Alert */}
      {showHint && exercise.hint && (
        <div style={{
          marginTop: '1rem',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          color: '#fef08a',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Lightbulb size={18} color="var(--accent-gold)" />
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>
            {exercise.hint[currentScript]}
          </span>
        </div>
      )}

      {/* Result Feedback Alert */}
      {status === 'success' && (
        <div className="feedback-box success">
          <CheckCircle size={22} className="feedback-icon" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.15rem' }}>
              {currentScript === 'latin' ? 'I ni ce !' : currentScript === 'nko' ? 'ߌ ߣߌ߫ ߓߊ߯ߙߊ߫ !' : 'Bravo !'}
            </div>
            <div className={currentScript === 'nko' ? 'nko-text' : ''}>
              {feedbackMessage}
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="feedback-box error">
          <AlertTriangle size={22} className="feedback-icon" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.15rem' }}>
              {currentScript === 'latin' ? 'Hakili to a la :' : currentScript === 'nko' ? 'ߖߊ߲߬ߕߏ߬ߒ߬ߘߐ :' : 'À revoir :'}
            </div>
            <div className={currentScript === 'nko' ? 'nko-text' : ''}>
              {feedbackMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
