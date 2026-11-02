import type { ScriptMode } from './index';

export type SupportedLanguage = 'klncd' | 'python';
export type CourseLevelId = 'beginner' | 'intermediate' | 'advanced';
export type TranslationStatus = 'draft' | 'reviewed' | 'verified';

export interface LocalizedMeta {
  locale: ScriptMode;
  validationStatus: TranslationStatus;
  reviewer?: string;
  lastUpdated: string;
}

export interface LearningPath {
  id: string;               // Ex: 'path-computer-science', 'path-cybersecurity'
  slug: string;
  icon: string;
  accentColor: string;
  titleKey: string;
  descriptionKey: string;
  levels: CourseLevel[];
}

export interface CourseLevel {
  id: CourseLevelId;        // 'beginner' | 'intermediate'
  number: number;
  titleKey: string;
  descriptionKey?: string;
  moduleIds: string[];      // Références ordonnées vers les modules
}

export interface CurriculumModule {
  id: string;               // Ex: 'mod-cs-01-intro-algo'
  pathId: string;
  levelId: CourseLevelId;
  order: number;
  slug: string;
  icon: string;
  accentColor: string;
  language: SupportedLanguage; // 'klncd' pour Module 1, 'python' pour suivants
  titleKey: string;
  descriptionKey: string;
  prerequisites: string[];  // IDs des modules prérequis pour déverrouiller
  learningObjectives: string[];
  lessonIds: string[];      // IDs ordonnés des leçons
  finalAssessmentId?: string;
}

export interface CurriculumLesson {
  id: string;               // Ex: 'les-cs-01-01-tea-algorithm'
  moduleId: string;
  order: number;
  slug: string;
  estimatedMinutes: number;
  xpReward: number;
  titleKey: string;
  summaryKey: string;
  vocabularyKeys: string[];
  activities: LearningActivity[];
  exercises: LearningExercise[];
}

export type LearningActivityType = 'concept' | 'analogy' | 'code_walkthrough' | 'warning';

export interface LearningActivity {
  id: string;
  type: LearningActivityType;
  titleKey: string;
  contentKey: string;
  codeSnippet?: {
    language: SupportedLanguage;
    code: string;
    captionKey?: string;
  };
  keyTakeawayKey: string;
}

export type ExerciseType = 
  | 'fill_in_blank' 
  | 'reorder_tokens' 
  | 'predict_output' 
  | 'spot_the_bug'
  | 'code_interactive'       // Utilise KalanCodeRunner ('klncd') ou Python Runner
  | 'sequencing'
  | 'phishing_detection';

export interface LearningExercise {
  id: string;
  type: ExerciseType;
  language?: SupportedLanguage; // Déclare explicitement 'klncd' ou 'python'
  instructionKey: string;
  hintKey?: string;
  explanationSuccessKey: string;
  explanationFailureKey: string;
  payload: Record<string, any>; // Données structurées pour l'exercice
}

export interface AssessmentQuestion {
  id: string;
  questionKey: string;
  optionsKeys: string[];
  correctOptionIndex: number;
  explanationKey: string;
}

export interface Assessment {
  id: string;
  moduleId: string;
  passingScorePercent: number; // Ex: 80%
  questions: AssessmentQuestion[];
}

/**
 * État de verrouillage et de progression de l'apprenant
 */
export interface UserLearningProgress {
  userId?: string;
  completedLessonIds: string[];
  completedModuleIds: string[];
  score: number;
  xp: number;
  streakDays: number;
  currentScript: ScriptMode;
  activePathId: string;
  activeModuleId: string;
  activeLessonId?: string;
  unlockedModuleIds: string[];
  assessmentsScores: Record<string, number>; // moduleId -> score %
}
