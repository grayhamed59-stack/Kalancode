import React, { useState } from 'react';
import type { ScriptMode } from '../types';
import { sounds } from '../utils/audio';
import { Volume2, VolumeX, Wifi } from 'lucide-react';

interface HeaderProps {
  currentScript: ScriptMode;
  onSelectScript: (script: ScriptMode) => void;
  score: number;
  streakDays: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScript,
  onSelectScript,
  score,
  streakDays
}) => {
  const [muted, setMuted] = useState(sounds.isMuted());

  const handleScriptChange = (s: ScriptMode) => {
    sounds.playClick();
    onSelectScript(s);
  };

  const handleToggleMute = () => {
    const isMuted = sounds.toggleMute();
    setMuted(isMuted);
    if (!isMuted) sounds.playClick();
  };

  const titles: Record<ScriptMode, { subtitle: string; offlineText: string }> = {
    latin: {
      subtitle: 'Kalan kɛ Bamanankan na',
      offlineText: 'Kalan bɛ sira kan (Offline ready)'
    },
    nko: {
      subtitle: 'ߞߊߟߊ߲ ߞߍ ߓߡߊߣߊ߲ߞߊ߲ ߠߊ',
      offlineText: 'ߞߊߟߊ߲ ߓߍ ߛߌߙߊ ߞߊ߲'
    },
    fr: {
      subtitle: 'Apprendre à code en Bamanankan et en NKo ',
      offlineText: 'Disponible hors-ligne'
    }
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <img
            src="/assets/brand/kalancode-icon.png"
            alt="KalanCode"
            className="brand-logo-img"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.brand-letter-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <span className="brand-letter-fallback" style={{ display: 'none' }}>
            {currentScript === 'nko' ? 'ߞ' : 'K'}
          </span>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="brand-title">KalanCode</span>
            <span className="brand-badge">MVP v0.1</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {titles[currentScript].subtitle}
          </div>
        </div>
      </div>

      <div className="nav-controls">
        {/* Offline indicator */}
        <div 
          className="stat-pill" 
          style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)', color: '#34d399', fontSize: '0.78rem' }}
          title={titles[currentScript].offlineText}
        >
          <Wifi size={14} />
          <span style={{ display: 'none', minWidth: 0, paddingLeft: '0.2rem' }} className="offline-label">
            {titles[currentScript].offlineText}
          </span>
        </div>

        {/* Script / Language Switcher */}
        <div className="script-selector" role="group" aria-label="Choisir l'écriture">
          <button
            id="btn-script-latin"
            type="button"
            className={`script-btn ${currentScript === 'latin' ? 'active' : ''}`}
            onClick={() => handleScriptChange('latin')}
            title="Bamanankan en alphabet latin"
          >
            Bamanankan
          </button>
          <button
            id="btn-script-nko"
            type="button"
            className={`script-btn ${currentScript === 'nko' ? 'active' : ''}`}
            onClick={() => handleScriptChange('nko')}
            title="ߒߞߏ (N'Ko)"
          >
            ߒߞߏ (N'Ko)
          </button>
          <button
            id="btn-script-fr"
            type="button"
            className={`script-btn ${currentScript === 'fr' ? 'active' : ''}`}
            onClick={() => handleScriptChange('fr')}
            title="Français"
          >
            Français
          </button>
        </div>

        {/* Gamification Stats */}
        <div className="stat-pill" title="Points d'apprentissage">
          <span className="stat-icon">⭐</span>
          <span>{score}</span>
        </div>

        <div className="stat-pill" title="Jours consécutifs">
          <span className="stat-icon">🔥</span>
          <span>{streakDays} j</span>
        </div>

        {/* Mute button */}
        <button
          type="button"
          className="seq-btn"
          onClick={handleToggleMute}
          title={muted ? 'Activer le son' : 'Couper le son'}
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </header>
  );
};
