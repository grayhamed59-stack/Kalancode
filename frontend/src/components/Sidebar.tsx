import React from 'react';
import type { Lesson, Badge, ScriptMode } from '../types';
import { CheckCircle2, BookOpen, Award, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SidebarProps {
  lessons: Lesson[];
  activeLessonId: string;
  completedLessonIds: string[];
  badges: Badge[];
  currentScript: ScriptMode;
  onSelectLesson: (lessonId: string) => void;
  onSelectBadge: (badge: Badge) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lessons,
  activeLessonId,
  completedLessonIds,
  badges,
  currentScript,
  onSelectLesson,
  onSelectBadge
}) => {
  const completionPercentage = Math.round((completedLessonIds.length / lessons.length) * 100);

  const texts: Record<ScriptMode, {
    lessonsTitle: string;
    badgesTitle: string;
    progress: string;
    proverb: string;
    proverbAuthor: string;
  }> = {
    latin: {
      lessonsTitle: 'Kalansiraw (Leçons)',
      badgesTitle: 'Nafa nɔw (Badges)',
      progress: 'Yɛlɛma sira',
      proverb: '« Kalan tɛ ban, dɔnniya bɛ dɔ fara dɔ kan. »',
      proverbAuthor: 'Bamanan nsiirin'
    },
    nko: {
      lessonsTitle: 'ߞߊ߬ߙߊ߲ ߠߎ߬',
      badgesTitle: 'ߞߐ߲ߘߐ߲ ߠߎ߬',
      progress: 'ߢߍߕߊ߮',
      proverb: '« ߟߐ߲ߠߌ߲ ߕߍ߫ ߓߊ߲߫ ߠߊ߫، ߊ߬ ߦߋ߫ ߘߏ߫ ߝߙߊ߬ ߟߊ߫ ߘߏ߫ ߞߊ߲߬. »',
      proverbAuthor: 'ߡߊ߲߬ߘߋ߲߬ ߞߘߐ'
    },
    fr: {
      lessonsTitle: 'Parcours des Leçons',
      badgesTitle: 'Badges & Succès',
      progress: 'Progression globale',
      proverb: "« Le savoir ne s'épuise jamais, chaque étape en ajoute une autre. »",
      proverbAuthor: 'Proverbe bambara'
    }
  };

  const currentText = texts[currentScript];

  return (
    <aside className="sidebar">
      {/* Progress Card */}
      <div className="panel-card">
        <div className="panel-header">
          <span className="panel-title">
            <Sparkles size={16} color="var(--accent-gold)" />
            {currentText.progress}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
            {completionPercentage}%
          </span>
        </div>

        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '0.85rem'
        }}>
          <div style={{
            width: `${completionPercentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 100%)',
            transition: 'width 0.4s ease'
          }} />
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {completedLessonIds.length} / {lessons.length} {currentText.lessonsTitle}
        </div>
      </div>

      {/* Lessons List */}
      <div className="panel-card">
        <div className="panel-header">
          <span className="panel-title">
            <BookOpen size={16} color="#38bdf8" />
            {currentText.lessonsTitle}
          </span>
        </div>

        <div className="lesson-list">
          {lessons.map((lesson) => {
            const isActive = lesson.id === activeLessonId;
            const isCompleted = completedLessonIds.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                type="button"
                className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  onSelectLesson(lesson.id);
                }}
              >
                <div className="lesson-number">
                  {isCompleted ? <CheckCircle2 size={18} color="white" /> : lesson.number}
                </div>

                <div className="lesson-meta">
                  <div className={`lesson-item-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                    {lesson.title[currentScript]}
                  </div>
                  <div className="lesson-item-sub">
                    <span>⏱ {lesson.durationMinutes} min</span>
                    {isCompleted && <span style={{ color: 'var(--accent-green)' }}>✓ Validé</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="panel-card">
        <div className="panel-header">
          <span className="panel-title">
            <Award size={16} color="var(--accent-gold)" />
            {currentText.badgesTitle}
          </span>
        </div>

        <div className="badges-container">
          {badges.map((badge) => (
            <button
              key={badge.id}
              type="button"
              className={`badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => {
                sounds.playClick();
                onSelectBadge(badge);
              }}
              title={`${badge.name[currentScript]} : ${badge.description[currentScript]}`}
            >
              <span>{badge.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Malian Cultural Proverb */}
      <div className="panel-card" style={{ background: 'rgba(245, 158, 11, 0.04)', borderColor: 'rgba(245, 158, 11, 0.15)' }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#fcd34d', marginBottom: '0.25rem' }}>
          {currentText.proverb}
        </p>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
          — {currentText.proverbAuthor}
        </span>
      </div>
    </aside>
  );
};
