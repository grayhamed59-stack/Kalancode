import React, { useEffect } from 'react';
import type { Badge, ScriptMode } from '../types';
import confetti from 'canvas-confetti';
import { X, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

interface BadgeModalProps {
  badge: Badge | null;
  currentScript: ScriptMode;
  onClose: () => void;
  celebrate?: boolean;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  badge,
  currentScript,
  onClose,
  celebrate = false
}) => {
  useEffect(() => {
    if (badge && celebrate) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24']
      });
    }
  }, [badge, celebrate]);

  if (!badge) return null;

  const btnLabels: Record<ScriptMode, string> = {
    latin: "K'a kɛ tan !",
    nko: "ߞ'ߊ ߞߍ ߕߊ߲ !",
    fr: "Continuer l'aventure"
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: currentScript === 'nko' ? 'auto' : '1rem',
            left: currentScript === 'nko' ? '1rem' : 'auto',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div className="modal-badge-icon">{badge.icon}</div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: badge.unlocked ? 'var(--accent-green)' : 'var(--text-subtle)',
          marginBottom: '0.5rem'
        }}>
          {badge.unlocked ? <Check size={14} /> : null}
          <span>{badge.unlocked ? 'Débloqué !' : 'À débloquer'}</span>
        </div>

        <h3 className={`modal-title ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {badge.name[currentScript]}
        </h3>

        <p className={`modal-desc ${currentScript === 'nko' ? 'nko-text' : ''}`}>
          {badge.description[currentScript]}
        </p>

        <button
          type="button"
          className="primary-btn"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
        >
          <span className={currentScript === 'nko' ? 'nko-text' : ''}>
            {btnLabels[currentScript]}
          </span>
        </button>
      </div>
    </div>
  );
};
