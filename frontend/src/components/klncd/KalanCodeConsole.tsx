import React, { useState, useRef, useEffect } from 'react';
import type { ConsoleEntry, ExecutionState } from '../../klncd/types';
import type { ScriptMode } from '../../types';
import { Terminal, Send, Trash2, CheckCircle2, AlertTriangle, Clock, CornerDownLeft } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface KalanCodeConsoleProps {
  entries: ConsoleEntry[];
  executionState: ExecutionState;
  currentScript: ScriptMode;
  waitingPromptQuestion: string | null;
  onSubmitInput: (value: string) => void;
  onClearConsole: () => void;
  onAbortExecution?: () => void;
}

export const KalanCodeConsole: React.FC<KalanCodeConsoleProps> = ({
  entries,
  executionState,
  currentScript,
  waitingPromptQuestion,
  onSubmitInput,
  onClearConsole
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfConsoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new console output
  useEffect(() => {
    endOfConsoleRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries, executionState]);

  // Focus input when waiting for user response
  useEffect(() => {
    if (executionState === 'waiting_input') {
      inputRef.current?.focus();
    }
  }, [executionState]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() && executionState !== 'waiting_input') return;

    sounds.playClick();
    const val = inputValue;
    setInputValue('');
    onSubmitInput(val);
  };

  const stateLabels: Record<ScriptMode, Record<ExecutionState, { text: string; color: string }>> = {
    latin: {
      idle: { text: 'Labɛnnen bɛ', color: 'var(--text-subtle)' },
      running: { text: 'Baara bɛ kɛ...', color: 'var(--accent-gold)' },
      waiting_input: { text: 'Jaabi makɔnɔna...', color: '#38bdf8' },
      completed: { text: 'Banna cogo ɲuman na', color: 'var(--accent-green)' },
      error: { text: 'Kasara / Fili', color: 'var(--accent-red)' },
      cancelled: { text: 'Dabila', color: 'var(--text-subtle)' }
    },
    nko: {
      idle: { text: 'ߟߊߓߍ߲ߣߍ߲ ߓߍ', color: 'var(--text-subtle)' },
      running: { text: 'ߓߊ߯ߙߊ ߓߍ ߞߍ...', color: 'var(--accent-gold)' },
      waiting_input: { text: 'ߖߊ߯ߓߌ ߡߊߞߐߣߐ߲ߠߋ߲ ߓߍ...', color: '#38bdf8' },
      completed: { text: 'ߓߊ߲ߣߊ ߢߊ ߢߎߡߊ߲ ߠߊ', color: 'var(--accent-green)' },
      error: { text: 'ߝߌߟߌ', color: 'var(--accent-red)' },
      cancelled: { text: 'ߘߊߓߌߟߊ', color: 'var(--text-subtle)' }
    },
    fr: {
      idle: { text: 'Prêt', color: 'var(--text-subtle)' },
      running: { text: 'Exécution en cours...', color: 'var(--accent-gold)' },
      waiting_input: { text: 'En attente de saisie...', color: '#38bdf8' },
      completed: { text: 'Exécution terminée', color: 'var(--accent-green)' },
      error: { text: 'Erreur détectée', color: 'var(--accent-red)' },
      cancelled: { text: 'Annulé', color: 'var(--text-subtle)' }
    }
  };

  const currentStateInfo = stateLabels[currentScript][executionState];

  return (
    <div className="klncd-console-card">
      {/* Console Header Bar */}
      <div className="klncd-console-header">
        <div className="klncd-console-title">
          <Terminal size={16} color="#38bdf8" />
          <span>Console KalanCode (klncd v1.0)</span>
        </div>

        <div className="klncd-console-status-row">
          <div
            className="klncd-status-indicator"
            style={{ color: currentStateInfo.color, borderColor: currentStateInfo.color }}
          >
            {executionState === 'running' && <Clock size={12} className="spin-icon" />}
            {executionState === 'waiting_input' && <CornerDownLeft size={12} />}
            {executionState === 'completed' && <CheckCircle2 size={12} />}
            {executionState === 'error' && <AlertTriangle size={12} />}
            <span className={currentScript === 'nko' ? 'nko-text' : ''}>
              {currentStateInfo.text}
            </span>
          </div>

          <button
            type="button"
            className="klncd-icon-btn"
            onClick={onClearConsole}
            title={currentScript === 'latin' ? 'Console josira' : currentScript === 'nko' ? 'ߖߏߛߌ' : 'Effacer la console'}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Console Output Screen */}
      <div className="klncd-console-screen code-font">
        {entries.length === 0 ? (
          <div className="klncd-empty-console">
            <span>&gt;&gt; Prêt. Cliquez sur « Exécuter (Laka) » pour lancer le programme.</span>
          </div>
        ) : (
          entries.map((entry) => {
            if (entry.type === 'system') {
              return (
                <div key={entry.id} className="klncd-line system">
                  <span className="klncd-line-bullet">ℹ</span>
                  <span>{entry.content}</span>
                </div>
              );
            }

            if (entry.type === 'output') {
              return (
                <div key={entry.id} className="klncd-line output">
                  <span className="klncd-line-bullet">&gt;</span>
                  <span>{entry.content}</span>
                </div>
              );
            }

            if (entry.type === 'prompt') {
              return (
                <div key={entry.id} className="klncd-line prompt">
                  <span className="klncd-line-bullet">?</span>
                  <span className="prompt-text">{entry.content}</span>
                </div>
              );
            }

            if (entry.type === 'input') {
              return (
                <div key={entry.id} className="klncd-line user-input">
                  <span className="klncd-line-bullet">↳</span>
                  <span className="input-echo">{entry.content}</span>
                </div>
              );
            }

            if (entry.type === 'error') {
              return (
                <div key={entry.id} className="klncd-line error">
                  <span className="klncd-line-bullet">✕</span>
                  <span>{entry.content}</span>
                </div>
              );
            }

            return null;
          })
        )}

        {/* Active Input Prompt for Doon() */}
        {executionState === 'waiting_input' && (
          <form className="klncd-interactive-prompt-form" onSubmit={handleSubmit}>
            <div className="prompt-label-row">
              <span className="prompt-icon">?</span>
              <span className="prompt-label-text">{waitingPromptQuestion}</span>
            </div>
            <div className="prompt-input-row">
              <span className="prompt-caret">&gt;&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className="prompt-input-field code-font"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentScript === 'latin' ? 'I ka jaabi sɛbɛn yan...' : currentScript === 'nko' ? 'ߌ ߞߊ ߖߊ߯ߓߌ ߛߍߓߍ߲ ߦߊ߲...' : 'Tapez votre réponse ici puis validez...'}
              />
              <button
                type="submit"
                className="prompt-submit-btn"
                title="Valider la réponse (Entrée)"
              >
                <Send size={14} />
                <span>{currentScript === 'latin' ? 'Lase' : currentScript === 'nko' ? 'ߟߊߛߋ' : 'Valider'}</span>
              </button>
            </div>
          </form>
        )}

        <div ref={endOfConsoleRef} />
      </div>
    </div>
  );
};
