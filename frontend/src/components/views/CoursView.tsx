import React, { useState, useMemo } from 'react';
import type { ScriptMode } from '../../types';
import type { MimoLesson, MimoUnit } from '../../types/mimo';
import { 
  Search, BookOpen, Sparkles, Play, Code2, Check,
  Laptop, Shield, Zap, Filter
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface CoursViewProps {
  currentScript: ScriptMode;
  units: MimoUnit[];
  completedLessonIds: string[];
  onStartLesson: (lesson: MimoLesson) => void;
  onOpenStudio: (lessonId: string) => void;
}

export const CoursView: React.FC<CoursViewProps> = ({
  currentScript,
  units,
  completedLessonIds,
  onStartLesson,
  onOpenStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [selectedPathFilter, setSelectedPathFilter] = useState<'all' | 'cs' | 'cyber'>('all');

  // Flatten all lessons with their parent unit info
  const allCoursesWithUnit = useMemo(() => {
    return units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        ...lesson,
        unit,
      }))
    );
  }, [units]);

  // Filter lessons based on search, unit, and path
  const filteredCourses = useMemo(() => {
    return allCoursesWithUnit.filter((item) => {
      // Path filter
      if (selectedPathFilter === 'cs' && item.unit.number > 7) return false;
      if (selectedPathFilter === 'cyber' && item.unit.number < 8) return false;

      // Unit filter
      if (selectedUnitId !== 'all' && item.unit.id !== selectedUnitId) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (
          item.title.latin.toLowerCase().includes(q) ||
          item.title.fr.toLowerCase().includes(q) ||
          item.title.nko.toLowerCase().includes(q)
        );
        const summaryMatch = (
          item.summary.latin.toLowerCase().includes(q) ||
          item.summary.fr.toLowerCase().includes(q) ||
          item.summary.nko.toLowerCase().includes(q)
        );
        const unitMatch = (
          item.unit.title.latin.toLowerCase().includes(q) ||
          item.unit.title.fr.toLowerCase().includes(q) ||
          item.unit.title.nko.toLowerCase().includes(q)
        );
        return titleMatch || summaryMatch || unitMatch;
      }

      return true;
    });
  }, [allCoursesWithUnit, selectedPathFilter, selectedUnitId, searchQuery]);

  // Labels trilingues
  const t = {
    latin: {
      badge: 'Kalansenw Bɛɛ • Kalan Kɛɲɛcogo',
      headline: 'Kalansenw Lajɛlen (Catalogue à la Carte)',
      subheadline: 'I bɛ se ka kalansen o kalansen sugandi k\'a kalan sisan, k\'a bila sira kelen kɔ. I ka waati, i ka fanga !',
      searchPlaceholder: 'Nyini kalansen dɔ la (kɔmputɛri, variables, sim swap, python...)',
      allCourses: 'Kalansenw bɛɛ',
      csPath: '💻 Kɔmputɛri & Aligoritimu',
      cyberPath: '🛡️ Lakana & Cybersécurité',
      filterAllUnits: 'Module bɛɛ',
      startInteractive: 'Kalan Daminɛ',
      openStudio: 'Studio Kɔnɔ (Code)',
      completed: 'Banna',
      stepsCount: 'senw',
      resultsCount: (n: number) => `${n} kalansen sɔrɔla`,
      emptyTitle: 'Kalansen si ma sɔrɔ',
      emptySub: 'Nyinini labɔ walima module falan.',
    },
    nko: {
      badge: 'ߞߊ߬ߙߊ߲ ߠߎ߬ ߟߊ߬ߘߍ • ߘߊߦߟߍ߬ߣߍ߲',
      headline: 'ߞߊ߬ߙߊ߲ ߠߎ߬ ߓߍ߯ ߟߊߘߍ߬ߣߍ߲ (À la carte)',
      subheadline: 'ߌ ߓߍ ߛߋ ߞߊ ߞߊ߬ߙߊ߲ ߓߍ߯ ߘߏ߲߬ ߛߌߛߊ߲߬، ߣߌ߫ ߛߌߙߊ ߕߐ߭ ߟߎ ߡߊ ߕߏ߫. ߌ ߦߟߌ ߣߌ ߌ ߟߊ ߕߎ߬ߡߊ !',
      searchPlaceholder: 'ߞߊ߬ߙߊ߲ ߘߐ ߢߌߣߌ߲ (ߕߟߋ߬ߓߊ߮، ߦߟߍ߬ߡߊ߲߬ߓߊ߮، SIM، Python...)',
      allCourses: 'ߞߊ߬ߙߊ߲ ߠߎ߬ ߓߍ߯',
      csPath: '💻 ߕߟߋ߬ߓߊ߮ ߣߌ߫ ߞߏߘߌ',
      cyberPath: '🛡️ ߟߊ߬ߞߊ߲߬ߘߊ߬ߟߌ ߣߌ߫ ߓߟߐߟߐ',
      filterAllUnits: 'ߡߐߘߎߟ ߓߍ߯',
      startInteractive: 'ߞߊ߬ߙߊ߲ ߘߊߡߌ߬ߣߊ߬',
      openStudio: 'ߛߑߕߎߘߌߦߏ ߟߊߞߊ߬',
      completed: 'ߓߊ߲ߣߊ',
      stepsCount: 'ߛߋ߲ ߠߎ',
      resultsCount: (n: number) => `ߞߊ߬ߙߊ߲ ${n} ߛߐ߬ߘߐ߲߬ߣߊ`,
      emptyTitle: 'ߞߊ߬ߙߊ߲ ߛߌ ߡߊ ߛߐ߬ߘߐ߲',
      emptySub: 'ߢߌߣߌ߲ߠߌ ߝߊߟߋ߲.',
    },
    fr: {
      badge: 'Bibliothèque des Cours • Accès Libre',
      headline: 'Catalogue des Cours (À la Carte)',
      subheadline: 'Explorez et apprenez n’importe quel cours directement, sans prérequis ni obligation de suivre un parcours séquentiel complet.',
      searchPlaceholder: 'Rechercher un cours (ordinateur, variables, SIM swap, boucles, Python...)',
      allCourses: 'Tous les cours',
      csPath: '💻 Informatique & Algorithmes',
      cyberPath: '🛡️ Cybersécurité & Hygiène',
      filterAllUnits: 'Tous les modules',
      startInteractive: 'Suivre ce cours',
      openStudio: 'Atelier Studio (Code)',
      completed: 'Validé',
      stepsCount: 'étapes',
      resultsCount: (n: number) => `${n} cours disponible${n > 1 ? 's' : ''}`,
      emptyTitle: 'Aucun cours trouvé',
      emptySub: 'Essayez un autre mot-clé ou réinitialisez les filtres.',
    },
  }[currentScript];

  return (
    <div className="cours-library-container" style={{ padding: '1.5rem 1rem 4rem', maxWidth: '1180px', margin: '0 auto' }}>
      {/* ── HEADER BANNER ── */}
      <div 
        className="cours-hero-card"
        style={{
          background: 'linear-gradient(135deg, #0755E8 0%, #087BFA 60%, #18A5FF 100%)',
          borderRadius: '20px',
          padding: '2.2rem 2rem',
          color: '#ffffff',
          boxShadow: '0 8px 32px rgba(7, 85, 232, 0.28)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Sparkles size={14} color="#ffd54f" />
            <span>{t.badge}</span>
          </div>

          <h1 
            style={{ 
              fontSize: '2rem', 
              fontWeight: 900, 
              margin: '0 0 0.6rem 0', 
              color: '#ffffff',
              letterSpacing: '-0.02em' 
            }}
            className={currentScript === 'nko' ? 'nko-text' : ''}
          >
            {t.headline}
          </h1>

          <p 
            style={{ 
              fontSize: '1rem', 
              maxWidth: '720px', 
              lineHeight: 1.55, 
              margin: '0 0 1.5rem 0',
              color: 'rgba(255, 255, 255, 0.92)' 
            }}
            className={currentScript === 'nko' ? 'nko-text' : ''}
          >
            {t.subheadline}
          </p>

          {/* Search Bar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              borderRadius: '14px',
              padding: '0.4rem 0.6rem 0.4rem 1.1rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              maxWidth: '640px'
            }}
          >
            <Search size={20} color="#0755E8" style={{ flexShrink: 0, marginRight: '0.65rem' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.95rem',
                color: '#0f172a',
                fontFamily: 'inherit',
                background: 'transparent'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  border: 'none',
                  background: 'rgba(15, 23, 42, 0.08)',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── FILTERS BAR ── */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}
      >
        {/* Main Category Filter (Path level) */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setSelectedPathFilter('all');
              setSelectedUnitId('all');
            }}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '999px',
              border: selectedPathFilter === 'all' ? '2px solid #087BFA' : '1px solid rgba(255, 255, 255, 0.12)',
              background: selectedPathFilter === 'all' ? 'rgba(8, 123, 250, 0.18)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedPathFilter === 'all' ? '#38bdf8' : 'var(--text-subtle)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.18s ease'
            }}
          >
            {t.allCourses} ({allCoursesWithUnit.length})
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setSelectedPathFilter('cs');
              setSelectedUnitId('all');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '999px',
              border: selectedPathFilter === 'cs' ? '2px solid #087BFA' : '1px solid rgba(255, 255, 255, 0.12)',
              background: selectedPathFilter === 'cs' ? 'rgba(8, 123, 250, 0.18)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedPathFilter === 'cs' ? '#38bdf8' : 'var(--text-subtle)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.18s ease'
            }}
          >
            <Laptop size={15} />
            <span>{t.csPath}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setSelectedPathFilter('cyber');
              setSelectedUnitId('all');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '999px',
              border: selectedPathFilter === 'cyber' ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)',
              background: selectedPathFilter === 'cyber' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedPathFilter === 'cyber' ? '#34d399' : 'var(--text-subtle)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.18s ease'
            }}
          >
            <Shield size={15} />
            <span>{t.cyberPath}</span>
          </button>
        </div>

        {/* Sub-Filter: Module / Unit Pills */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            overflowX: 'auto', 
            paddingBottom: '0.4rem',
            alignItems: 'center' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-subtle)', fontSize: '0.82rem', marginRight: '0.4rem', flexShrink: 0 }}>
            <Filter size={14} />
            <span>Module :</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setSelectedUnitId('all');
            }}
            style={{
              flexShrink: 0,
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              border: selectedUnitId === 'all' ? '1px solid var(--kc-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
              background: selectedUnitId === 'all' ? 'var(--kc-primary)' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {t.filterAllUnits}
          </button>

          {units
            .filter((u) => {
              if (selectedPathFilter === 'cs') return u.number <= 7;
              if (selectedPathFilter === 'cyber') return u.number >= 8;
              return true;
            })
            .map((unit) => {
              const isSelected = selectedUnitId === unit.id;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setSelectedUnitId(isSelected ? 'all' : unit.id);
                  }}
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: isSelected ? `1px solid ${unit.accentColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? `${unit.accentColor}25` : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? unit.accentColor : 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{unit.icon}</span>
                  <span>M{unit.number}: {unit.title[currentScript].split('(')[0].trim()}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Results Count Banner */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.25rem',
          fontSize: '0.88rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>{t.resultsCount(filteredCourses.length)}</span>
        <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Zap size={14} />
          Accès libre sans verrou
        </span>
      </div>

      {/* ── COURSES GRID ── */}
      {filteredCourses.length === 0 ? (
        <div 
          style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px dashed rgba(255, 255, 255, 0.15)'
          }}
        >
          <BookOpen size={48} color="var(--kc-primary)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.4rem' }}>{t.emptyTitle}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.emptySub}</p>
        </div>
      ) : (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredCourses.map((item) => {
            const isCompleted = completedLessonIds.includes(item.id);
            const isInteractiveCodingEligible = item.steps.some(
              (s) => s.type === 'interactive_code' || s.type === 'fill_in_blank'
            );

            return (
              <div
                key={item.id}
                className="course-card-interactive"
                style={{
                  background: 'var(--kc-surface, #0f1c3f)',
                  border: isCompleted ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.18)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Row: Module Badge + XP Pill */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <div 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: item.unit.accentColor,
                        background: `${item.unit.accentColor}18`,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        border: `1px solid ${item.unit.accentColor}40`
                      }}
                    >
                      <span>{item.unit.icon}</span>
                      <span>Module {item.unit.number} • Leçon {item.number}</span>
                    </div>

                    <div 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--accent-gold, #f59e0b)',
                        background: 'rgba(245, 158, 11, 0.12)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px'
                      }}
                    >
                      <Sparkles size={12} />
                      <span>+{item.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.4,
                      margin: '0 0 0.5rem 0'
                    }}
                    className={currentScript === 'nko' ? 'nko-text' : ''}
                  >
                    {item.title[currentScript]}
                  </h3>

                  {/* Course Summary */}
                  <p 
                    style={{
                      fontSize: '0.86rem',
                      color: 'var(--text-muted, #94a3b8)',
                      lineHeight: 1.5,
                      margin: '0 0 1.2rem 0'
                    }}
                    className={currentScript === 'nko' ? 'nko-text' : ''}
                  >
                    {item.summary[currentScript]}
                  </p>
                </div>

                <div>
                  {/* Meta Bar: Steps count + Status */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      color: 'var(--text-subtle)',
                      paddingTop: '0.8rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      marginBottom: '1rem'
                    }}
                  >
                    <span>{item.steps.length} {t.stepsCount}</span>
                    {isCompleted ? (
                      <span style={{ color: '#10b981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Check size={14} />
                        {t.completed}
                      </span>
                    ) : (
                      <span style={{ color: '#38bdf8', fontWeight: 600 }}>À découvrir</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: isInteractiveCodingEligible ? '1fr 1fr' : '1fr', gap: '0.6rem' }}>
                    {/* Primary Button: Play interactive Mimo modal */}
                    <button
                      type="button"
                      id={`course-learn-btn-${item.id}`}
                      onClick={() => {
                        sounds.playClick();
                        onStartLesson(item);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem',
                        padding: '0.6rem 0.8rem',
                        background: 'linear-gradient(135deg, #0755E8 0%, #087BFA 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        boxShadow: '0 3px 12px rgba(7, 85, 232, 0.35)'
                      }}
                    >
                      <Play size={14} fill="currentColor" />
                      <span>{t.startInteractive}</span>
                    </button>

                    {/* Secondary Button: Open in Studio (2 columns) if relevant */}
                    {isInteractiveCodingEligible && (
                      <button
                        type="button"
                        id={`course-studio-btn-${item.id}`}
                        onClick={() => {
                          sounds.playClick();
                          onOpenStudio(item.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.6rem 0.8rem',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          borderRadius: '10px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                        title="Ouvrir dans l'atelier de programmation 2 colonnes"
                      >
                        <Code2 size={14} color="#38bdf8" />
                        <span>Studio</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
