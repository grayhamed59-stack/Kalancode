import { useState, useEffect } from 'react';
import type { ScriptMode, Badge } from './types';
import type { MimoLesson } from './types/mimo';
import { INITIAL_BADGES } from './data/lessons';
import { CURRICULUM_UNITS } from './data/curriculum';
import { AppShell, type AppView } from './components/AppShell';
import { HomeDashboard } from './components/views/HomeDashboard';
import { CoursView } from './components/views/CoursView';
import { ExercicesView } from './components/views/ExercicesView';
import { ProjetsView } from './components/views/ProjetsView';
import { RessourcesView } from './components/views/RessourcesView';
import { LessonStudioView } from './components/views/LessonStudioView';
import { CurriculumRoadmap } from './components/mimo/CurriculumRoadmap';
import { MimoLessonModal } from './components/mimo/MimoLessonModal';
import { BadgeModal } from './components/BadgeModal';
import { sounds } from './utils/audio';
import { Code2, BookOpen } from 'lucide-react';

export function App() {
  // Navigation View in AppShell
  const [activeView, setActiveView] = useState<AppView>('home');

  // Script Mode: persisted in localStorage ('latin' | 'nko' | 'fr')
  const [currentScript, setCurrentScript] = useState<ScriptMode>(() => {
    const saved = localStorage.getItem('kalancode_script');
    return (saved as ScriptMode) || 'latin';
  });

  // Completed lessons: persisted
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kalancode_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Score (XP)
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('kalancode_score');
    return saved ? parseInt(saved, 10) : 50;
  });

  // Badges
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('kalancode_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  // Active Mimo Lesson for Interactive Modal
  const [activeMimoLesson, setActiveMimoLesson] = useState<MimoLesson | null>(null);

  // Active Lesson for 2-column Studio View
  const [studioLessonId, setStudioLessonId] = useState<string>('lesson-3-variables');

  // Modal celebration
  const [activeModalBadge, setActiveModalBadge] = useState<Badge | null>(null);
  const [isCelebration, setIsCelebration] = useState(false);

  // Sync script direction (RTL for N'Ko, LTR for Latin/French)
  useEffect(() => {
    localStorage.setItem('kalancode_script', currentScript);
    const html = document.documentElement;
    if (currentScript === 'nko') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'nqo');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', currentScript === 'fr' ? 'fr' : 'bm');
    }
  }, [currentScript]);

  // Sync persistence
  useEffect(() => {
    localStorage.setItem('kalancode_completed_lessons', JSON.stringify(completedLessonIds));
    localStorage.setItem('kalancode_score', score.toString());
    localStorage.setItem('kalancode_badges', JSON.stringify(badges));
  }, [completedLessonIds, score, badges]);

  // Total lessons count across units
  const totalLessonsCount = CURRICULUM_UNITS.reduce(
    (acc, u) => acc + u.lessons.length,
    0
  );

  // Handle Mimo lesson finish & badge unlocks
  const handleLessonFinished = (lessonId: string, xp: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);

      // Check badge unlocks
      const newBadges = [...badges];
      let unlockedBadgeToCelebrate: Badge | null = null;

      if (!newBadges[0].unlocked) {
        newBadges[0].unlocked = true;
        unlockedBadgeToCelebrate = newBadges[0];
      }
      if (lessonId === 'lesson-2-1-tea-algorithm' && !newBadges[1].unlocked) {
        newBadges[1].unlocked = true;
        unlockedBadgeToCelebrate = newBadges[1];
      }
      if (lessonId === 'lesson-7-1-pseudocode-to-python' && !newBadges[2].unlocked) {
        newBadges[2].unlocked = true;
        unlockedBadgeToCelebrate = newBadges[2];
      }

      setBadges(newBadges);

      if (unlockedBadgeToCelebrate) {
        setActiveModalBadge(unlockedBadgeToCelebrate);
        setIsCelebration(true);
      }
    }
    setScore((prev) => prev + xp);
  };

  return (
    <AppShell
      currentScript={currentScript}
      onSelectScript={setCurrentScript}
      score={score}
      streakDays={3}
      activeView={activeView}
      onSelectView={setActiveView}
    >
      {/* ── VUE 1 : ACCUEIL (HOME DASHBOARD) ── */}
      {activeView === 'home' && (
        <HomeDashboard
          currentScript={currentScript}
          score={score}
          streakDays={3}
          badges={badges}
          completedLessonIds={completedLessonIds}
          totalLessons={totalLessonsCount}
          onGoToParcours={() => {
            sounds.playClick();
            setActiveView('parcours');
          }}
          onGoToCours={() => {
            sounds.playClick();
            setActiveView('cours');
          }}
        />
      )}

      {/* ── VUE 2 : PARCOURS KALAN (7 UNITÉS) ── */}
      {activeView === 'parcours' && (
        <div>
          {/* Quick banner to switch to 2-column Studio Lesson */}
          <div className="parcours-studio-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="studio-banner-icon">
                <BookOpen size={20} color="var(--kc-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--kc-navy)' }}>
                  {currentScript === 'nko'
                    ? 'ߞߊ߬ߙߊ߲ ߃ : ߦߟߍ߬ߡߊ߲߬ߓߊ߮ ߟߎ߬ (ߛߑߕߎߘߌߦߏ ߂-ߞߙߏ߲)'
                    : currentScript === 'fr'
                    ? 'Leçon 3 : Les variables • Mode Studio (2 Colonnes)'
                    : 'Leçon 3 : Yɛlɛmabaaw • Studio Sɛbɛnlan'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {currentScript === 'nko'
                    ? 'ߞߊ߬ߙߊ߲ ߘߐߝߊߟߋ߲ ߣߌ߫ ߔߙߏߜ߭ߙߊߡ ߟߊߓߊ߯ߙߊߟߊ߲ ߞߙߏ߲ ߝߌ߬ߟߊ'
                    : currentScript === 'fr'
                    ? 'Explications pédagogiques à gauche et atelier de programmation klncd/Python à droite'
                    : 'Kalan kɔrɔw numanfɛ ani kɔmputɛri sɛbɛnlan kininfɛ'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="primary-btn"
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
              onClick={() => {
                sounds.playClick();
                setStudioLessonId('lesson-3-variables');
                setActiveView('lesson-studio');
              }}
            >
              <Code2 size={15} />
              <span>
                {currentScript === 'nko'
                  ? 'ߛߑߕߎߘߌߦߏ ߟߊߞߊ߬'
                  : currentScript === 'fr'
                  ? 'Ouvrir Studio Leçon'
                  : 'Studio Lajɛ'}
              </span>
            </button>
          </div>

          <CurriculumRoadmap
            units={CURRICULUM_UNITS}
            currentScript={currentScript}
            completedLessonIds={completedLessonIds}
            onStartLesson={(lesson) => {
              sounds.playClick();
              setActiveMimoLesson(lesson);
            }}
          />
        </div>
      )}

      {/* ── VUE 3 : COURS À LA CARTE (CATALOGUE DES COURS SANS VERROU) ── */}
      {activeView === 'cours' && (
        <CoursView
          currentScript={currentScript}
          units={CURRICULUM_UNITS}
          completedLessonIds={completedLessonIds}
          onStartLesson={(lesson) => {
            sounds.playClick();
            setActiveMimoLesson(lesson);
          }}
          onOpenStudio={(lessonId) => {
            sounds.playClick();
            setStudioLessonId(lessonId);
            setActiveView('lesson-studio');
          }}
        />
      )}

      {/* ── VUE 4 : LEÇON STUDIO (ARCHITECTURE 2 COLONNES « LEÇON 3 : LES VARIABLES ») ── */}
      {activeView === 'lesson-studio' && (
        <LessonStudioView
          currentScript={currentScript}
          lessonId={studioLessonId}
          onBackToParcours={() => {
            sounds.playClick();
            setActiveView('parcours');
          }}
          onLessonCompleted={(lId, xp) => {
            handleLessonFinished(lId, xp);
          }}
        />
      )}

      {/* ── VUE 4 : EXERCICES & QUIZ ── */}
      {activeView === 'exercices' && (
        <ExercicesView
          currentScript={currentScript}
          completedLessonIds={completedLessonIds}
        />
      )}

      {/* ── VUE 5 : PROJETS GUIDÉS ── */}
      {activeView === 'projets' && (
        <ProjetsView
          currentScript={currentScript}
          onOpenProject={(projId) => {
            sounds.playClick();
            setStudioLessonId(projId);
            setActiveView('lesson-studio');
          }}
        />
      )}

      {/* ── VUE 6 : RESSOURCES & BASE DOCUMENTAIRE ── */}
      {activeView === 'ressources' && (
        <RessourcesView currentScript={currentScript} />
      )}

      {/* Mimo Lesson Player Modal */}
      {activeMimoLesson && (
        <MimoLessonModal
          lesson={activeMimoLesson}
          currentScript={currentScript}
          onClose={() => setActiveMimoLesson(null)}
          onLessonFinished={handleLessonFinished}
        />
      )}

      {/* Badge or Milestone Celebration Modal */}
      <BadgeModal
        badge={activeModalBadge}
        currentScript={currentScript}
        celebrate={isCelebration}
        onClose={() => setActiveModalBadge(null)}
      />
    </AppShell>
  );
}

export default App;
