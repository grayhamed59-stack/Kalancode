import type {
  LearningPath,
  CurriculumModule,
  CurriculumLesson,
  UserLearningProgress
} from '../types/curriculum';

// Imports statiques des contenus JSON
import csPath from '../content/paths/computer-science.json';
import cyberPath from '../content/paths/cybersecurity.json';

import modCs01 from '../content/modules/cs-01-intro-algo.json';
import modCs02 from '../content/modules/cs-02-variables.json';
import modCs03 from '../content/modules/cs-03-operators.json';
import modCs04 from '../content/modules/cs-04-conditions.json';
import modCs05 from '../content/modules/cs-05-loops.json';
import modCs06 from '../content/modules/cs-06-functions.json';
import modCs07 from '../content/modules/cs-07-data-structures.json';
import modCs08 from '../content/modules/cs-08-problem-solving.json';
import modCs09 from '../content/modules/cs-09-defensive-programming.json';

import modCyber01 from '../content/modules/cyber-01-hygiene.json';
import modCyber02 from '../content/modules/cyber-02-phishing.json';
import modCyber03 from '../content/modules/cyber-03-auth-passwords.json';
import modCyber04 from '../content/modules/cyber-04-safe-browsing.json';

import lesCs0101 from '../content/lessons/cs-01-01-tea-algorithm.json';
import lesCs0102 from '../content/lessons/cs-01-02-klncd-output-s3b3n.json';
import lesCs0103 from '../content/lessons/cs-01-03-klncd-input-doon.json';

const PATHS: LearningPath[] = [
  csPath as unknown as LearningPath,
  cyberPath as unknown as LearningPath
];

const MODULES_MAP: Record<string, CurriculumModule> = {
  [modCs01.id]: modCs01 as unknown as CurriculumModule,
  [modCs02.id]: modCs02 as unknown as CurriculumModule,
  [modCs03.id]: modCs03 as unknown as CurriculumModule,
  [modCs04.id]: modCs04 as unknown as CurriculumModule,
  [modCs05.id]: modCs05 as unknown as CurriculumModule,
  [modCs06.id]: modCs06 as unknown as CurriculumModule,
  [modCs07.id]: modCs07 as unknown as CurriculumModule,
  [modCs08.id]: modCs08 as unknown as CurriculumModule,
  [modCs09.id]: modCs09 as unknown as CurriculumModule,

  [modCyber01.id]: modCyber01 as unknown as CurriculumModule,
  [modCyber02.id]: modCyber02 as unknown as CurriculumModule,
  [modCyber03.id]: modCyber03 as unknown as CurriculumModule,
  [modCyber04.id]: modCyber04 as unknown as CurriculumModule
};

const LESSONS_MAP: Record<string, CurriculumLesson> = {
  [lesCs0101.id]: lesCs0101 as unknown as CurriculumLesson,
  [lesCs0102.id]: lesCs0102 as unknown as CurriculumLesson,
  [lesCs0103.id]: lesCs0103 as unknown as CurriculumLesson
};

const STORAGE_KEY = 'kalancode_learning_progress_v2';

export class CurriculumService {
  /**
   * Retourne tous les parcours d'apprentissage officiels
   */
  public static getPaths(): LearningPath[] {
    return PATHS;
  }

  /**
   * Récupère un parcours par son identifiant
   */
  public static getPathById(pathId: string): LearningPath | undefined {
    return PATHS.find((p) => p.id === pathId);
  }

  /**
   * Récupère un module par son identifiant
   */
  public static getModuleById(moduleId: string): CurriculumModule | undefined {
    return MODULES_MAP[moduleId];
  }

  /**
   * Récupère une leçon par son identifiant
   */
  public static getLessonById(lessonId: string): CurriculumLesson | undefined {
    return LESSONS_MAP[lessonId];
  }

  /**
   * Récupère les modules d'un parcours donné
   */
  public static getModulesForPath(pathId: string): CurriculumModule[] {
    return Object.values(MODULES_MAP)
      .filter((m) => m.pathId === pathId)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Détermine si un module est déverrouillé selon l'état d'avancement de l'apprenant.
   * Règle obligatoire :
   * - Le premier module d'un parcours (sans prérequis) est TOUJOURS déverrouillé.
   * - Les modules suivants sont VERROUILLÉS par défaut.
   * - Un module est automatiquement DÉVERROUILLÉ dès lors que les leçons de son prérequis sont terminées.
   */
  public static isModuleUnlocked(
    moduleId: string,
    progress: UserLearningProgress
  ): boolean {
    // Si explicitement présent dans les déverrouillés
    if (progress.unlockedModuleIds.includes(moduleId)) {
      return true;
    }

    const mod = this.getModuleById(moduleId);
    if (!mod) return false;

    // Premier module d'un parcours : déverrouillé d'office
    if (!mod.prerequisites || mod.prerequisites.length === 0) {
      return true;
    }

    // Déverrouillé si tous les modules prérequis sont complétés
    return mod.prerequisites.every((prereqId) =>
      progress.completedModuleIds.includes(prereqId)
    );
  }

  /**
   * Calcule le pourcentage d'avancement d'un module
   */
  public static getModuleProgress(
    moduleId: string,
    progress: UserLearningProgress
  ): number {
    const mod = this.getModuleById(moduleId);
    if (!mod || !mod.lessonIds || mod.lessonIds.length === 0) return 0;

    const completedInModule = mod.lessonIds.filter((lid) =>
      progress.completedLessonIds.includes(lid)
    ).length;

    return Math.round((completedInModule / mod.lessonIds.length) * 100);
  }

  /**
   * Initialise ou charge la progression utilisateur
   */
  public static loadProgress(): UserLearningProgress {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch {
      // Ignorer l'erreur et renvoyer la progression initiale
    }

    // État par défaut : Module 1 de Computer Science déverrouillé
    return {
      completedLessonIds: [],
      completedModuleIds: [],
      unlockedModuleIds: ['mod-cs-01-intro-algo', 'mod-cyber-01-hygiene'],
      score: 0,
      xp: 0,
      streakDays: 1,
      currentScript: 'latin',
      activePathId: 'path-computer-science',
      activeModuleId: 'mod-cs-01-intro-algo',
      activeLessonId: 'les-cs-01-01-tea-algorithm',
      assessmentsScores: {}
    };
  }

  /**
   * Sauvegarde la progression dans le stockage local
   */
  public static saveProgress(progress: UserLearningProgress): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }
    } catch {
      // Ignorer l'erreur en environnement headless/test
    }
  }

  /**
   * Marque une leçon comme terminée, met à jour l'XP,
   * et DÉVERROUILLE AUTOMATIQUEMENT le module suivant si toutes les leçons du module courant sont terminées !
   */
  public static completeLesson(
    lessonId: string,
    currentProgress: UserLearningProgress
  ): { updatedProgress: UserLearningProgress; newlyUnlockedModules: string[] } {
    const lesson = this.getLessonById(lessonId);
    const xpEarned = lesson?.xpReward ?? 25;

    const newCompletedLessons = Array.from(
      new Set([...currentProgress.completedLessonIds, lessonId])
    );

    const newCompletedModules = [...currentProgress.completedModuleIds];
    const newUnlockedModules = [...currentProgress.unlockedModuleIds];
    const newlyUnlocked: string[] = [];

    // Vérifier si le module parent est complété
    if (lesson) {
      const parentModule = this.getModuleById(lesson.moduleId);
      if (parentModule) {
        const allLessonsDone = parentModule.lessonIds.every((id) =>
          newCompletedLessons.includes(id)
        );

        if (allLessonsDone) {
          if (!newCompletedModules.includes(parentModule.id)) {
            newCompletedModules.push(parentModule.id);
          }

          // Déverrouiller automatiquement les modules dépendants dont tous les prérequis sont désormais satisfaits
          for (const [modId, candidateMod] of Object.entries(MODULES_MAP)) {
            const allPrereqsMet = candidateMod.prerequisites.every((prereqId) =>
              newCompletedModules.includes(prereqId)
            );

            if (allPrereqsMet && !newUnlockedModules.includes(modId)) {
              newUnlockedModules.push(modId);
              newlyUnlocked.push(modId);
            }
          }
        }
      }
    }

    const updatedProgress: UserLearningProgress = {
      ...currentProgress,
      completedLessonIds: newCompletedLessons,
      completedModuleIds: newCompletedModules,
      unlockedModuleIds: newUnlockedModules,
      xp: currentProgress.xp + xpEarned,
      score: currentProgress.score + 10
    };

    this.saveProgress(updatedProgress);
    return { updatedProgress, newlyUnlockedModules: newlyUnlocked };
  }
}
