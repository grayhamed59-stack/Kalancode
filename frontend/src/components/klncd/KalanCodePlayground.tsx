import React, { useState, useRef } from 'react';
import type { ScriptMode } from '../../types';
import type { ConsoleEntry, ExecutionState } from '../../klncd/types';
import { KalanCodeRunner } from '../../klncd';
import { KalanCodeError } from '../../klncd/errors';
import { KalanCodeConsole } from './KalanCodeConsole';
import { Play, Square, RotateCcw, BookOpen, Code2, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface KalanCodePlaygroundProps {
  currentScript: ScriptMode;
}

const SAMPLE_PROGRAMS = [
  {
    id: 'welcome_dialog',
    title: {
      latin: "1. Kalan Damina (Dialogue officiel)",
      nko: "߁. ߞߊߟߊ߲ ߘߊߡߌߣߊ (ߖߊ߯ߓߌ)",
      fr: "1. Dialogue d'accueil officiel (S3b3n + Doon)"
    },
    code: `# Programme officiel KalanCode V1.0
import klncd

klncd.S3b3n("I ni ce !")

jamu = klncd.Doon("I tɔgɔ ye mun ye ?")

klncd.S3b3n("I ni ce, " + jamu)
`
  },
  {
    id: 'market_calculator',
    title: {
      latin: "2. Suugu Jatebɔ (Calculateur de marché)",
      nko: "߂. ߛߎ߮ ߖߊߕߋߓߐ",
      fr: "2. Calculateur de marché (Arithmétique)"
    },
    code: `# Calculateur de vente au marché
import klncd

article = "Malo (Riz de Sélingué)"
prix_kilo = 500
kilos = 12

total = prix_kilo * kilos

klncd.S3b3n("Article : " + article)
klncd.S3b3n("Quantité (kg) : " + kilos)
klncd.S3b3n("Total à payer (FCFA) : " + total)
`
  },
  {
    id: 'bilingual_nko',
    title: {
      latin: "3. N'Ko & Bamanankan (Unicode)",
      nko: "߃. ߒߞߏ ߣߌ ߓߡߊߣߊ߲ߞߊ߲",
      fr: "3. Programme bilingue N'Ko & Bamanankan"
    },
    code: `# Programme préservant Bamanankan et N'Ko
import klncd

ߕߐ߮ = "ߡߏߙߌ"
klncd.S3b3n("ߌ ߣߌ ߛߐ߰ߡߊ߬، " + ߕߐ߮)

jamana = "Mali"
klncd.S3b3n("Jamana tɔgɔ ye " + jamana + " ye.")
`
  }
];

export const KalanCodePlayground: React.FC<KalanCodePlaygroundProps> = ({ currentScript }) => {
  const [sourceCode, setSourceCode] = useState<string>(SAMPLE_PROGRAMS[0].code);
  const [entries, setEntries] = useState<ConsoleEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'KalanCode Library (klncd v1.0) initialisée. Prêt pour l’exécution.',
      timestamp: Date.now()
    }
  ]);
  const [executionState, setExecutionState] = useState<ExecutionState>('idle');
  const [waitingPromptQuestion, setWaitingPromptQuestion] = useState<string | null>(null);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  const runnerRef = useRef<KalanCodeRunner | null>(null);
  const promptResolverRef = useRef<((value: string) => void) | null>(null);

  // Load a pre-configured sample program
  const handleSelectSample = (sampleId: string) => {
    sounds.playClick();
    const sample = SAMPLE_PROGRAMS.find((p) => p.id === sampleId);
    if (sample) {
      setSourceCode(sample.code);
      setHighlightedLine(null);
    }
  };

  // Run the user's code
  const handleRun = async () => {
    sounds.playClick();

    // Reset console output
    setEntries([
      {
        id: `sys-${Date.now()}`,
        type: 'system',
        content: '--- Démarrage du programme klncd ---',
        timestamp: Date.now()
      }
    ]);
    setWaitingPromptQuestion(null);
    setHighlightedLine(null);

    const runner = new KalanCodeRunner();
    runnerRef.current = runner;

    try {
      await runner.run(
        sourceCode,
        {
          onOutput: (text, lineRef) => {
            setEntries((prev) => [
              ...prev,
              {
                id: `out-${Date.now()}-${Math.random()}`,
                type: 'output',
                content: text,
                timestamp: Date.now(),
                lineRef
              }
            ]);
          },

          onPrompt: (question, lineRef) => {
            setWaitingPromptQuestion(question);
            setEntries((prev) => [
              ...prev,
              {
                id: `prompt-${Date.now()}-${Math.random()}`,
                type: 'prompt',
                content: question,
                timestamp: Date.now(),
                lineRef
              }
            ]);

            // Returns a promise that will be resolved when the user types in the console
            return new Promise<string>((resolve) => {
              promptResolverRef.current = resolve;
            });
          },

          onStateChange: (state) => {
            setExecutionState(state);
            if (state === 'completed') {
              sounds.playSuccess();
              setEntries((prev) => [
                ...prev,
                {
                  id: `done-${Date.now()}`,
                  type: 'system',
                  content: '✓ Programme terminé avec succès.',
                  timestamp: Date.now()
                }
              ]);
            }
          },

          onError: (error) => {
            sounds.playError();
            let errorMessage = error.message;
            if (error instanceof KalanCodeError) {
              errorMessage = error.getLocalized(currentScript);
            }
            setEntries((prev) => [
              ...prev,
              {
                id: `err-${Date.now()}`,
                type: 'error',
                content: `Erreur : ${errorMessage}`,
                timestamp: Date.now()
              }
            ]);
          },

          onHighlightLine: (line) => {
            setHighlightedLine(line);
          }
        },
        { maxInstructionSteps: 5000 }
      );
    } catch {
      // Errors handled via onError callback
    } finally {
      runnerRef.current = null;
    }
  };

  // Stop running execution
  const handleAbort = () => {
    sounds.playClick();
    if (runnerRef.current) {
      runnerRef.current.abort();
    }
    if (promptResolverRef.current) {
      promptResolverRef.current('');
      promptResolverRef.current = null;
    }
    setWaitingPromptQuestion(null);
    setHighlightedLine(null);
  };

  // Submit response for Doon() prompt
  const handleSubmitInput = (response: string) => {
    setEntries((prev) => [
      ...prev,
      {
        id: `in-${Date.now()}-${Math.random()}`,
        type: 'input',
        content: response,
        timestamp: Date.now()
      }
    ]);

    if (promptResolverRef.current) {
      promptResolverRef.current(response);
      promptResolverRef.current = null;
    }
    setWaitingPromptQuestion(null);
  };

  const lineCount = sourceCode.split('\n').length;

  return (
    <div className="klncd-playground-container">
      {/* Playground Header */}
      <div className="klncd-playground-header">
        <div className="klncd-hero-text">
          <div className="brand-badge">
            <Sparkles size={14} />
            <span>KalanCode Library • klncd v1.0</span>
          </div>
          <h2 className={`klncd-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
            {currentScript === 'latin'
              ? 'KalanCode Dɛgeli Yɔrɔ (Atelier klncd)'
              : currentScript === 'nko'
              ? 'ߞߊߟߊ߲ߞߏߘ ߓߊ߯ߙߊߘߊ (klncd)'
              : 'Atelier de Programmation KalanCode (klncd)'}
          </h2>
          <p className={`klncd-subtitle ${currentScript === 'nko' ? 'nko-text' : ''}`}>
            {currentScript === 'latin'
              ? 'Sɛbɛnni kɛ ni S3b3n() ani Doon() ye kɔmputɛri kɔnɔ.'
              : currentScript === 'nko'
              ? 'ߞߐߘ ߛߍߓߍ߲ S3b3n() ߣߌ Doon() ߟߊ.'
              : 'Écrivez et exécutez vos premiers algorithmes avec les fonctions natives S3b3n() et Doon().'}
          </p>
        </div>

        {/* Sample selector */}
        <div className="klncd-samples-selector">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <BookOpen size={14} />
            {currentScript === 'latin' ? 'Misaliw :' : currentScript === 'nko' ? 'ߡߌߛߊߟߌ ߟߎ :' : 'Exemples :'}
          </span>
          <div className="klncd-samples-pills">
            {SAMPLE_PROGRAMS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="klncd-sample-btn"
                onClick={() => handleSelectSample(p.id)}
              >
                <span>{p.title[currentScript]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split: Code Editor vs Console */}
      <div className="klncd-split-workspace">
        {/* LEFT: CODE EDITOR */}
        <div className="klncd-editor-card">
          <div className="klncd-editor-topbar">
            <div className="editor-tab-label">
              <Code2 size={15} color="var(--accent-gold)" />
              <span>programme.kln</span>
              {highlightedLine !== null && (
                <span className="line-highlight-badge">Ligne {highlightedLine}</span>
              )}
            </div>

            <div className="klncd-editor-actions">
              <button
                type="button"
                className="primary-btn editor-run-btn"
                onClick={handleRun}
                disabled={executionState === 'running' || executionState === 'waiting_input'}
                title="Lancer l'exécution du code"
              >
                <Play size={16} fill="currentColor" />
                <span>{currentScript === 'latin' ? 'Laka' : currentScript === 'nko' ? 'ߟߊߓߊ߯ߙߊ' : 'Exécuter'}</span>
              </button>

              {(executionState === 'running' || executionState === 'waiting_input') && (
                <button
                  type="button"
                  className="secondary-btn btn-abort"
                  onClick={handleAbort}
                  title="Interrompre le programme"
                >
                  <Square size={14} fill="currentColor" />
                  <span>{currentScript === 'latin' ? 'Dabila' : currentScript === 'nko' ? 'ߘߊߓߌߟߊ' : 'Arrêter'}</span>
                </button>
              )}

              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  sounds.playClick();
                  setSourceCode(SAMPLE_PROGRAMS[0].code);
                  setHighlightedLine(null);
                }}
                title="Réinitialiser le code"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          <div className="klncd-editor-wrapper code-font">
            {/* Line numbers gutter */}
            <div className="klncd-line-numbers">
              {Array.from({ length: Math.max(lineCount, 12) }).map((_, idx) => {
                const lineNum = idx + 1;
                const isExecuting = highlightedLine === lineNum;
                return (
                  <div key={lineNum} className={`gutter-num ${isExecuting ? 'active-line' : ''}`}>
                    {lineNum}
                  </div>
                );
              })}
            </div>

            {/* Code Textarea */}
            <textarea
              className="klncd-code-textarea code-font"
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              rows={Math.max(lineCount + 2, 12)}
            />
          </div>
        </div>

        {/* RIGHT: INTERACTIVE CONSOLE */}
        <div className="klncd-console-pane">
          <KalanCodeConsole
            entries={entries}
            executionState={executionState}
            currentScript={currentScript}
            waitingPromptQuestion={waitingPromptQuestion}
            onSubmitInput={handleSubmitInput}
            onClearConsole={() => {
              sounds.playClick();
              setEntries([]);
            }}
          />
        </div>
      </div>
    </div>
  );
};
