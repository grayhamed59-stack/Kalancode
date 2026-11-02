import type { ScriptMode } from './index';

export type StepType = 
  | 'concept' 
  | 'fill_in_blank' 
  | 'reorder_tokens' 
  | 'predict_output' 
  | 'spot_the_bug'
  | 'interactive_code';

export interface BaseStep {
  id: string;
  type: StepType;
  title: Record<ScriptMode, string>;
  instruction: Record<ScriptMode, string>;
  hint?: Record<ScriptMode, string>;
  explanationSuccess: Record<ScriptMode, string>;
  explanationFailure: Record<ScriptMode, string>;
}

export interface ConceptStep extends BaseStep {
  type: 'concept';
  contentMarkdown: Record<ScriptMode, string>;
  codeSnippet?: string;
  keyTakeaway: Record<ScriptMode, string>;
}

export interface FillInBlankStep extends BaseStep {
  type: 'fill_in_blank';
  codeTemplate: string; // Contains `___` placeholder
  blankPlaceholder: string;
  options: string[];
  correctAnswer: string;
  outputPreview?: string;
}

export interface ReorderTokensStep extends BaseStep {
  type: 'reorder_tokens';
  availableTokens: string[];
  correctOrder: string[];
  targetLineExplanation: Record<ScriptMode, string>;
}

export interface PredictOutputStep extends BaseStep {
  type: 'predict_output';
  codeSnippet: string;
  options: string[];
  correctAnswer: string;
  terminalOutputComment?: Record<ScriptMode, string>;
}

export interface SpotTheBugStep extends BaseStep {
  type: 'spot_the_bug';
  codeLines: string[];
  buggyLineIndex: number;
  bugExplanation: Record<ScriptMode, string>;
  fixRecommendation: Record<ScriptMode, string>;
}

export interface InteractiveCodeStep extends BaseStep {
  type: 'interactive_code';
  initialCode: string;
  expectedOutputSnippet?: string;
  requiredKeywords?: string[];
  language?: 'klncd' | 'python';
  mockInputs?: string[];
}

export type LessonStep = 
  | ConceptStep 
  | FillInBlankStep 
  | ReorderTokensStep 
  | PredictOutputStep 
  | SpotTheBugStep
  | InteractiveCodeStep;

export interface MimoLesson {
  id: string;
  unitId: string;
  number: number;
  slug: string;
  title: Record<ScriptMode, string>;
  summary: Record<ScriptMode, string>;
  xpReward: number;
  steps: LessonStep[];
}

export interface MimoUnit {
  id: string;
  number: number;
  slug: string;
  title: Record<ScriptMode, string>;
  description: Record<ScriptMode, string>;
  icon: string;
  accentColor: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  lessons: MimoLesson[];
}
