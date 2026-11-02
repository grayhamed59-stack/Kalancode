import { describe, it, expect, beforeEach } from 'vitest';
import { CurriculumService } from '../curriculumService';
import { LocalizationService } from '../localizationService';
import type { UserLearningProgress } from '../../types/curriculum';

describe('CurriculumService & Automatic Module Unlocking', () => {
  let progress: UserLearningProgress;

  beforeEach(() => {
    progress = {
      completedLessonIds: [],
      completedModuleIds: [],
      unlockedModuleIds: ['mod-cs-01-intro-algo', 'mod-cyber-01-hygiene'],
      score: 0,
      xp: 0,
      streakDays: 1,
      currentScript: 'latin',
      activePathId: 'path-computer-science',
      activeModuleId: 'mod-cs-01-intro-algo',
      assessmentsScores: {}
    };
  });

  it('devrait charger les 2 parcours officiels (Computer Science et Cybersecurity)', () => {
    const paths = CurriculumService.getPaths();
    expect(paths).toHaveLength(2);
    expect(paths.map((p) => p.id)).toEqual(['path-computer-science', 'path-cybersecurity']);
  });

  it('devrait charger les 9 modules du parcours Computer Science dans l\'ordre officiel', () => {
    const csModules = CurriculumService.getModulesForPath('path-computer-science');
    expect(csModules).toHaveLength(9);
    expect(csModules[0].id).toBe('mod-cs-01-intro-algo');
    expect(csModules[0].language).toBe('klncd'); // Module 1 utilise klncd
    expect(csModules[1].id).toBe('mod-cs-02-variables');
    expect(csModules[1].language).toBe('python'); // Module 2 transition vers Python
    expect(csModules[8].id).toBe('mod-cs-09-defensive-programming');
  });

  it('devrait charger les 4 modules du parcours indépendant Cybersecurity', () => {
    const cyberModules = CurriculumService.getModulesForPath('path-cybersecurity');
    expect(cyberModules).toHaveLength(4);
    expect(cyberModules[0].id).toBe('mod-cyber-01-hygiene');
    expect(cyberModules[1].id).toBe('mod-cyber-02-phishing');
  });

  it('le module 1 doit être déverrouillé et le module 2 doit être verrouillé initialement', () => {
    expect(CurriculumService.isModuleUnlocked('mod-cs-01-intro-algo', progress)).toBe(true);
    expect(CurriculumService.isModuleUnlocked('mod-cs-02-variables', progress)).toBe(false);
    expect(CurriculumService.isModuleUnlocked('mod-cs-03-operators', progress)).toBe(false);
  });

  it('le module 2 doit se déverrouiller AUTOMATIQUEMENT dès que les leçons du module 1 sont terminées', () => {
    // Compléter leçon 1
    const res1 = CurriculumService.completeLesson('les-cs-01-01-tea-algorithm', progress);
    progress = res1.updatedProgress;
    expect(CurriculumService.isModuleUnlocked('mod-cs-02-variables', progress)).toBe(false);

    // Compléter leçon 2
    const res2 = CurriculumService.completeLesson('les-cs-01-02-klncd-output-s3b3n', progress);
    progress = res2.updatedProgress;
    expect(CurriculumService.isModuleUnlocked('mod-cs-02-variables', progress)).toBe(false);

    // Compléter la dernière leçon du module 1
    const res3 = CurriculumService.completeLesson('les-cs-01-03-klncd-input-doon', progress);
    progress = res3.updatedProgress;

    // VÉRIFICATION : Le module 2 est maintenant DÉVERROUILLÉ automatiquement !
    expect(res3.newlyUnlockedModules).toContain('mod-cs-02-variables');
    expect(CurriculumService.isModuleUnlocked('mod-cs-02-variables', progress)).toBe(true);
    expect(progress.completedModuleIds).toContain('mod-cs-01-intro-algo');
    expect(progress.xp).toBeGreaterThan(0);
  });

  it('LocalizationService doit traduire correctement avec fallback en Latin, N\'Ko et Français', () => {
    const latinTitle = LocalizationService.t('mod.cs01.title', 'latin');
    const nkoTitle = LocalizationService.t('mod.cs01.title', 'nko');
    const frTitle = LocalizationService.t('mod.cs01.title', 'fr');

    expect(latinTitle).toContain('Aligoritimu');
    expect(nkoTitle).toContain('ߊߟߑߜ߭ߏߙߕߌߡ');
    expect(frTitle).toContain('Algorithmique');

    expect(LocalizationService.getDirection('nko')).toBe('rtl');
    expect(LocalizationService.getDirection('latin')).toBe('ltr');
    expect(LocalizationService.getDirection('fr')).toBe('ltr');
  });
});
