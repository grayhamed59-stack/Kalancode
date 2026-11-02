import React, { useState, useEffect } from 'react';
import type { LessonStep } from '../../types/mimo';
import type { ScriptMode } from '../../types';
import { sounds } from '../../utils/audio';
import { Terminal, Bug, Sparkles, Play, Code, RotateCcw } from 'lucide-react';
import { KalanCodeRunner } from '../../klncd';

interface MimoStepPlayerProps {
  step: LessonStep;
  currentScript: ScriptMode;
  onAnswerSelected: (isCorrect: boolean, feedbackText?: string) => void;
  status: 'idle' | 'success' | 'error';
}

export const MimoStepPlayer: React.FC<MimoStepPlayerProps> = ({
  step,
  currentScript,
  onAnswerSelected,
  status
}) => {
  // State for Fill-in-blank
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // State for Reorder tokens
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [remainingTokens, setRemainingTokens] = useState<string[]>([]);

  // State for Predict output
  const [selectedOutput, setSelectedOutput] = useState<string | null>(null);

  // State for Spot the bug
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);

  // State for Interactive Code Execution
  const [interactiveCode, setInteractiveCode] = useState<string>('');
  const [interactiveOutputs, setInteractiveOutputs] = useState<string[]>([]);
  const [interactiveRunning, setInteractiveRunning] = useState<boolean>(false);
  const [interactiveError, setInteractiveError] = useState<string | null>(null);
  const [interactivePromptMessage, setInteractivePromptMessage] = useState<string | null>(null);
  const [interactivePromptInput, setInteractivePromptInput] = useState<string>('');
  const [promptResolver, setPromptResolver] = useState<((val: string) => void) | null>(null);

  // Reset internal states on step change
  useEffect(() => {
    setSelectedToken(null);
    setSelectedOutput(null);
    setSelectedLineIndex(null);
    setInteractiveOutputs([]);
    setInteractiveError(null);
    setInteractivePromptMessage(null);
    setPromptResolver(null);

    if (step.type === 'reorder_tokens') {
      setAssembledTokens([]);
      setRemainingTokens([...step.availableTokens]);
    } else if (step.type === 'interactive_code') {
      setInteractiveCode(step.initialCode);
    }
  }, [step]);

  // Concept Step continues immediately on action
  const handleConceptAcknowledge = () => {
    sounds.playClick();
    onAnswerSelected(true);
  };

  // Fill in blank selection
  const handleTokenClick = (token: string) => {
    sounds.playClick();
    setSelectedToken(token);
    if (step.type === 'fill_in_blank') {
      const isCorrect = token === step.correctAnswer;
      onAnswerSelected(isCorrect);
    }
  };

  // Reorder tokens step
  const handlePickTokenToAssemble = (token: string, index: number) => {
    sounds.playClick();
    const newRemaining = [...remainingTokens];
    newRemaining.splice(index, 1);
    const newAssembled = [...assembledTokens, token];

    setRemainingTokens(newRemaining);
    setAssembledTokens(newAssembled);

    if (step.type === 'reorder_tokens' && newRemaining.length === 0) {
      const isCorrect = newAssembled.every((t, i) => t === step.correctOrder[i]);
      onAnswerSelected(isCorrect);
    }
  };

  const handleRemoveAssembledToken = (token: string, index: number) => {
    sounds.playClick();
    const newAssembled = [...assembledTokens];
    newAssembled.splice(index, 1);
    const newRemaining = [...remainingTokens, token];

    setAssembledTokens(newAssembled);
    setRemainingTokens(newRemaining);
  };

  // Predict output selection
  const handleSelectOutput = (opt: string) => {
    sounds.playClick();
    setSelectedOutput(opt);
    if (step.type === 'predict_output') {
      const isCorrect = opt === step.correctAnswer;
      onAnswerSelected(isCorrect);
    }
  };

  // Handle prompt submission in interactive code
  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (promptResolver) {
      sounds.playClick();
      const val = interactivePromptInput;
      setInteractivePromptInput('');
      const resolver = promptResolver;
      setPromptResolver(null);
      resolver(val);
    }
  };

  // Run interactive code
  const handleRunInteractiveCode = async () => {
    if (step.type !== 'interactive_code') return;
    setInteractiveRunning(true);
    setInteractiveOutputs([]);
    setInteractiveError(null);
    sounds.playClick();

    const collectedOutputs: string[] = [];
    const runner = new KalanCodeRunner();

    try {
      if (step.language === 'python') {
        // Python execution simulation for introductory transition
        const lines = interactiveCode.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          const printMatch = trimmed.match(/^print\((.*)\)$/);
          if (printMatch) {
            let inner = printMatch[1].trim();
            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
              inner = inner.slice(1, -1);
            }
            collectedOutputs.push(inner);
          }
        }
      } else {
        // Real KalanCode Execution via AST interpreter
        await runner.run(interactiveCode, {
          onOutput: (val) => {
            const strVal = String(val);
            collectedOutputs.push(strVal);
            setInteractiveOutputs((prev) => [...prev, strVal]);
          },
          onPrompt: async (question) => {
            setInteractivePromptMessage(question);
            return new Promise<string>((resolve) => {
              setPromptResolver(() => (answer: string) => {
                setInteractiveOutputs((prev) => [...prev, `${question} > ${answer}`]);
                setInteractivePromptMessage(null);
                resolve(answer);
              });
            });
          },
          onError: (err) => {
            setInteractiveError(err.message);
          }
        });
      }

      setInteractiveOutputs([...collectedOutputs]);

      // Validation
      let isValid = true;
      let failureReason = '';

      if (step.requiredKeywords && step.requiredKeywords.length > 0) {
        for (const kw of step.requiredKeywords) {
          if (!interactiveCode.includes(kw)) {
            isValid = false;
            failureReason = currentScript === 'latin'
              ? `I kɔdi ka kan ka '${kw}' kɛ`
              : currentScript === 'nko'
              ? `ߌ ߞߐߘߌ ߞߊ ߞߊ߲ ߞߊ '${kw}' ߟߊߓߊ߯ߙߊ`
              : `Le code doit impérativement utiliser '${kw}'`;
            break;
          }
        }
      }

      if (isValid && step.expectedOutputSnippet) {
        const fullOutput = collectedOutputs.join(' ');
        if (!fullOutput.toLowerCase().includes(step.expectedOutputSnippet.toLowerCase())) {
          isValid = false;
          failureReason = currentScript === 'latin'
            ? `Labɔli kɔnɔ ma '${step.expectedOutputSnippet}' sɔrɔ`
            : currentScript === 'nko'
            ? `ߟߊ߬ߓߐ߬ߟߌ ߞߐߣߐ ߡߊ '${step.expectedOutputSnippet}' ߛߐߙߐ`
            : `La sortie attendue doit contenir : "${step.expectedOutputSnippet}"`;
        }
      }

      if (isValid) {
        onAnswerSelected(true);
      } else {
        setInteractiveError(failureReason || (currentScript === 'latin' ? 'Kɔdi ma bɛn' : currentScript === 'nko' ? 'ߞߐߘߌ ߡߊ ߓߍ߲' : 'Résultat incomplet'));
        onAnswerSelected(false);
      }
    } catch (e: any) {
      setInteractiveError(e.message || String(e));
      onAnswerSelected(false);
    } finally {
      setInteractiveRunning(false);
    }
  };

  // Spot the bug line click
  const handleLineClick = (idx: number) => {
    sounds.playClick();
    setSelectedLineIndex(idx);
    if (step.type === 'spot_the_bug') {
      const isCorrect = idx === step.buggyLineIndex;
      onAnswerSelected(isCorrect);
    }
  };

  return (
    <div className="mimo-step-body">
      {/* Title & Instruction */}
      <div className="mimo-instruction-header">
        <h3 className={`mimo-step-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {step.title[currentScript]}
        </h3>
        <p className={`mimo-step-instruction ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {step.instruction[currentScript]}
        </p>
      </div>

      {/* STEP 1: CONCEPT STEP */}
      {step.type === 'concept' && (
        <div className="mimo-concept-card">
          <div className={`mimo-markdown-text ${currentScript === 'nko' ? 'nko-text' : ''}`}>
            {step.contentMarkdown[currentScript]}
          </div>

          {step.codeSnippet && (
            <div className="mimo-terminal-window">
              <div className="terminal-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="terminal-filename">script.py</span>
              </div>
              <pre className="terminal-body code-font">
                <code>{step.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="mimo-takeaway-box">
            <Sparkles size={18} color="var(--accent-gold)" className="flex-shrink-0" />
            <div className={currentScript === 'nko' ? 'nko-text' : ''}>
              <strong>{currentScript === 'latin' ? 'Hakilitiko :' : currentScript === 'nko' ? 'ߤߊߞߟߌߕߌߞߏ :' : 'À retenir :'}</strong>{' '}
              {step.keyTakeaway[currentScript]}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              className="primary-btn"
              style={{ minWidth: '220px', justifyContent: 'center' }}
              onClick={handleConceptAcknowledge}
            >
              <span>{currentScript === 'latin' ? 'N ye a faamu !' : currentScript === 'nko' ? 'ߒ ߦ\'ߊ ߝߊ߯ߡߎ !' : 'J’ai compris !'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: FILL IN THE BLANK */}
      {step.type === 'fill_in_blank' && (
        <div className="mimo-fill-blank-card">
          <div className="mimo-terminal-window">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-filename">exercise.py</span>
            </div>
            <div className="terminal-body code-font">
              {step.codeTemplate.split('\n').map((line, lIdx) => {
                if (line.includes('___')) {
                  const parts = line.split('___');
                  return (
                    <div key={lIdx} className="code-line-with-blank">
                      <span>{parts[0]}</span>
                      <span className={`mimo-code-blank ${selectedToken ? 'filled' : ''} ${status === 'success' ? 'correct' : ''} ${status === 'error' ? 'wrong' : ''}`}>
                        {selectedToken || '___'}
                      </span>
                      <span>{parts[1]}</span>
                    </div>
                  );
                }
                return <div key={lIdx}>{line}</div>;
              })}
            </div>
          </div>

          <div className="mimo-tokens-tray">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {currentScript === 'latin' ? 'Sugandi kɛ :' : currentScript === 'nko' ? 'ߛߎߜ߭ߊ߲ߘߌ ߞߍ :' : 'Choisis le symbole :'}
            </span>
            <div className="mimo-tokens-grid">
              {step.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`mimo-token-chip ${selectedToken === option ? 'selected' : ''}`}
                  onClick={() => handleTokenClick(option)}
                >
                  <code>{option}</code>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: REORDER TOKENS */}
      {step.type === 'reorder_tokens' && (
        <div className="mimo-reorder-card">
          <div className="mimo-token-dropzone">
            {assembledTokens.length === 0 ? (
              <span className="placeholder-text">
                {currentScript === 'latin' ? 'Kod daɲɛw bila yan...' : currentScript === 'nko' ? 'ߞߐߘ ߘߊߢߍ ߟߎ ߓߌߟߊ ߦߊ߲...' : 'Assemble les jetons ici dans le bon ordre...'}
              </span>
            ) : (
              assembledTokens.map((tok, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="mimo-assembled-chip"
                  onClick={() => handleRemoveAssembledToken(tok, idx)}
                  title="Cliquer pour retirer"
                >
                  <code>{tok}</code>
                </button>
              ))
            )}
          </div>

          <div className="mimo-available-tokens-list">
            {remainingTokens.map((tok, idx) => (
              <button
                key={idx}
                type="button"
                className="mimo-token-chip"
                onClick={() => handlePickTokenToAssemble(tok, idx)}
              >
                <code>{tok}</code>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: PREDICT OUTPUT */}
      {step.type === 'predict_output' && (
        <div className="mimo-predict-card">
          <div className="mimo-terminal-window">
            <div className="terminal-header">
              <Terminal size={14} color="#38bdf8" />
              <span className="terminal-filename">main.py</span>
            </div>
            <pre className="terminal-body code-font">
              <code>{step.codeSnippet}</code>
            </pre>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
              {currentScript === 'latin' ? 'Console bɛ mun jira ?' : currentScript === 'nko' ? 'Console ߓߍ ߡߎ߲ ߖߌߙߊ ؟' : 'Résultat affiché dans la console :'}
            </div>
            <div className="mimo-options-grid">
              {step.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`mimo-option-card ${selectedOutput === opt ? 'selected' : ''}`}
                  onClick={() => handleSelectOutput(opt)}
                >
                  <code className="code-font">{opt}</code>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: SPOT THE BUG */}
      {step.type === 'spot_the_bug' && (
        <div className="mimo-bug-card">
          <div className="mimo-terminal-window">
            <div className="terminal-header">
              <Bug size={14} color="var(--accent-red)" />
              <span className="terminal-filename">find_error.py</span>
            </div>
            <div className="terminal-body code-font bug-selectable-lines">
              {step.codeLines.map((line, idx) => {
                const isSelected = selectedLineIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`bug-code-line ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleLineClick(idx)}
                  >
                    <span className="line-no">{idx + 1}</span>
                    <span className="line-code">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '0.5rem', textAlign: 'center' }}>
            {currentScript === 'latin' ? 'Line digi min kɔnɔ fili bɛ' : currentScript === 'nko' ? 'Line ߘߌ߯ ߡߍ߲ ߞߐߣߐ ߝߌߟߌ ߓߍ' : 'Touche la ligne contenant l’erreur'}
          </div>
        </div>
      )}

      {/* STEP 6: INTERACTIVE CODE EXECUTION (MIMO-STYLE LIVE RUNNER) */}
      {step.type === 'interactive_code' && (
        <div className="mimo-interactive-code-card">
          <div className="mimo-terminal-window">
            <div className="terminal-header" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code size={14} color="var(--accent-gold)" />
                <span className="terminal-filename">
                  {step.language === 'python' ? 'app.py' : 'prog.klncd'}
                </span>
              </div>
              <button
                type="button"
                className="reset-code-btn"
                onClick={() => {
                  sounds.playClick();
                  setInteractiveCode(step.initialCode);
                  setInteractiveOutputs([]);
                  setInteractiveError(null);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-subtle)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                title="Réinitialiser"
              >
                <RotateCcw size={12} />
                <span>{currentScript === 'latin' ? 'Kɔrɔlen' : currentScript === 'nko' ? 'ߞߐߙߐߟߋ߲' : 'Réinitialiser'}</span>
              </button>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#0a0d14' }}>
              <textarea
                value={interactiveCode}
                onChange={(e) => setInteractiveCode(e.target.value)}
                className="code-font"
                rows={Math.max(4, interactiveCode.split('\n').length + 1)}
                spellCheck={false}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#f8fafc',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  resize: 'none',
                  outline: 'none'
                }}
              />
            </div>

            {/* Run Action Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '0.6rem 1rem',
                background: '#111827',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <button
                type="button"
                className="mimo-run-code-btn"
                onClick={handleRunInteractiveCode}
                disabled={interactiveRunning}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  background: 'var(--accent-green)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: interactiveRunning ? 'not-allowed' : 'pointer',
                  opacity: interactiveRunning ? 0.7 : 1,
                  boxShadow: '0 2px 10px rgba(16,185,129,0.3)'
                }}
              >
                <Play size={14} fill="currentColor" />
                <span>
                  {interactiveRunning
                    ? (currentScript === 'latin' ? 'Baara bɛ kɛ...' : currentScript === 'nko' ? 'ߓߊ߯ߙߊ ߓߍ ߞߍ...' : 'Exécution en cours...')
                    : (currentScript === 'latin' ? 'Labaara (Exécuter)' : currentScript === 'nko' ? 'ߟߊߓߊ߯ߙߊ' : 'Exécuter le code')}
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Input Prompt if waiting */}
          {interactivePromptMessage && (
            <form
              onSubmit={handlePromptSubmit}
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                gap: '0.5rem',
                background: 'rgba(56,189,248,0.1)',
                border: '1px solid #38bdf8',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                {interactivePromptMessage}
              </span>
              <input
                type="text"
                value={interactivePromptInput}
                onChange={(e) => setInteractivePromptInput(e.target.value)}
                placeholder={currentScript === 'latin' ? 'I ka jaabi don...' : currentScript === 'nko' ? 'ߌ ߞߊ ߖߊ߯ߓߌ ߘߏ߲...' : 'Votre réponse...'}
                autoFocus
                style={{
                  flex: 1,
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#38bdf8',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {currentScript === 'latin' ? 'Don' : currentScript === 'nko' ? 'ߘߏ߲' : 'Envoyer'}
              </button>
            </form>
          )}

          {/* Console Output Window */}
          <div
            style={{
              marginTop: '0.75rem',
              background: '#040711',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.75rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              minHeight: '60px'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '0.35rem' }}>
              {currentScript === 'latin' ? 'Console labɔlen :' : currentScript === 'nko' ? 'Console ߟߊ߬ߓߐ߬ߟߋ߲ :' : 'Sortie de la console :'}
            </div>
            {interactiveOutputs.length === 0 && !interactiveError && (
              <div style={{ color: 'var(--text-subtle)', fontStyle: 'italic' }}>
                {currentScript === 'latin' ? 'Kɔdi labaara walasa ka labɔli lajɛ...' : currentScript === 'nko' ? 'ߞߐߘߌ ߟߊߓߊ߯ߙߊ ߥߊߟߊߛߊ ߞߊ ߟߊ߬ߓߐ߬ߟߌ ߟߊߖߍ...' : 'Clique sur Exécuter pour voir le résultat...'}
              </div>
            )}
            {interactiveOutputs.map((out, idx) => (
              <div key={idx} style={{ color: '#4ade80' }}>
                &gt; {out}
              </div>
            ))}
            {interactiveError && (
              <div style={{ color: 'var(--accent-red)', marginTop: '0.25rem' }}>
                ⚠ {interactiveError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
