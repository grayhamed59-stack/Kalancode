export type ScriptMode = 'latin' | 'nko' | 'fr';

export interface ContentBlock {
  type: 'text' | 'concept' | 'analogy' | 'code' | 'warning';
  title?: string;
  body: string;
  codeSnippet?: string;
}

export interface VocabularyTerm {
  termLatin: string;
  termNko: string;
  frenchMeaning: string;
  explanation: Record<ScriptMode, string>;
}

export interface SequencingItem {
  id: string;
  text: Record<ScriptMode, string>;
  icon: string;
}

export interface TestCase {
  label: Record<ScriptMode, string>;
  inputState: boolean;
  expectedResult: Record<ScriptMode, string>;
  options: Record<ScriptMode, string>[];
  correctIndex: number;
}

export interface PhishingExercise {
  sender: string;
  messageContent: Record<ScriptMode, string>;
  isLegitimate: boolean;
  explanation: Record<ScriptMode, string>;
  clues: Record<ScriptMode, string[]>;
}

export interface LessonExercise {
  type: 'sequencing' | 'condition_branch' | 'phishing_detection';
  title: Record<ScriptMode, string>;
  prompt: Record<ScriptMode, string>;
  hint?: Record<ScriptMode, string>;
  explanationSuccess: Record<ScriptMode, string>;
  explanationFailure: Record<ScriptMode, string>;
  sequencing?: {
    items: SequencingItem[];
    correctOrder: string[];
  };
  condition?: {
    scenario: Record<ScriptMode, string>;
    testCases: TestCase[];
  };
  phishing?: PhishingExercise;
}

export interface Lesson {
  id: string;
  number: number;
  category: 'intro' | 'algorithm' | 'variables' | 'conditions' | 'security';
  title: Record<ScriptMode, string>;
  durationMinutes: number;
  summary: Record<ScriptMode, string>;
  content: Record<ScriptMode, ContentBlock[]>;
  vocabulary: VocabularyTerm[];
  exercise: LessonExercise;
}

export interface Badge {
  id: string;
  icon: string;
  name: Record<ScriptMode, string>;
  description: Record<ScriptMode, string>;
  unlocked: boolean;
}

export interface UserProgress {
  completedLessons: string[];
  score: number;
  streakDays: number;
  currentScript: ScriptMode;
  badges: Badge[];
}
