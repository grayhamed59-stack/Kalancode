import React from 'react';
import type { Lesson, ScriptMode } from '../types';
import { ExerciseRunner } from './ExerciseRunner';
import { BookOpen, HelpCircle, Code, AlertCircle, Sparkles } from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  currentScript: ScriptMode;
  onLessonCompleted: (lessonId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  currentScript,
  onLessonCompleted
}) => {
  const contentBlocks = lesson.content[currentScript];

  const vocabLabels: Record<ScriptMode, { title: string; subtitle: string }> = {
    latin: {
      title: 'Kuma tɔgɔw (Daɲɛsɛbɛn)',
      subtitle: 'Daɲɛw minnu faamuyacogo ka gɛlɛn kɔmputɛri la'
    },
    nko: {
      title: 'ߞߎߡߊ ߟߎ߬ ߞߘߐ',
      subtitle: 'ߕߟߋ߬ߓߊ߮ ߞߎߡߊߘߋ߲ ߠߎ߬ ߢߊߝߐߣߍ߲'
    },
    fr: {
      title: 'Glossaire & Vocabulaire Bilingue',
      subtitle: 'Les concepts informatiques expliqués clairement'
    }
  };

  return (
    <article className="lesson-content-area">
      {/* Lesson Header Card */}
      <section className="lesson-hero">
        <div className="lesson-category-tag">
          <Sparkles size={14} />
          <span>Kalan {lesson.number} • {lesson.category}</span>
        </div>

        <h1 className={`lesson-heading ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {lesson.title[currentScript]}
        </h1>

        <p className={`lesson-lead ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {lesson.summary[currentScript]}
        </p>
      </section>

      {/* Lesson Content Blocks */}
      <section className="content-blocks">
        {contentBlocks.map((block, index) => {
          let icon = <BookOpen size={18} color="#38bdf8" />;
          if (block.type === 'analogy') icon = <Sparkles size={18} color="var(--accent-gold)" />;
          if (block.type === 'concept') icon = <HelpCircle size={18} color="var(--accent-green)" />;
          if (block.type === 'code') icon = <Code size={18} color="#38bdf8" />;
          if (block.type === 'warning') icon = <AlertCircle size={18} color="var(--accent-red)" />;

          return (
            <div key={index} className={`content-block ${block.type}`}>
              {block.title && (
                <div className="block-header">
                  {icon}
                  <span className={currentScript === 'nko' ? 'nko-text' : ''}>
                    {block.title}
                  </span>
                </div>
              )}

              <p className={`block-body ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                {block.body}
              </p>

              {block.codeSnippet && (
                <pre className="code-pre">
                  <code>{block.codeSnippet}</code>
                </pre>
              )}
            </div>
          );
        })}
      </section>

      {/* Vocabulary Glossary Cards */}
      {lesson.vocabulary.length > 0 && (
        <section className="vocab-section">
          <div style={{ marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {vocabLabels[currentScript].title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {vocabLabels[currentScript].subtitle}
            </p>
          </div>

          <div className="vocab-grid">
            {lesson.vocabulary.map((v, idx) => (
              <div key={idx} className="vocab-card">
                <div className="vocab-terms">
                  <span className="vocab-latin">{v.termLatin}</span>
                  <span className="vocab-nko nko-text">{v.termNko}</span>
                </div>
                <div className="vocab-fr">« {v.frenchMeaning} »</div>
                <div className={`vocab-desc ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                  {v.explanation[currentScript]}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Pedagogical Exercise */}
      <section>
        <ExerciseRunner
          exercise={lesson.exercise}
          currentScript={currentScript}
          onSuccess={() => onLessonCompleted(lesson.id)}
        />
      </section>
    </article>
  );
};
