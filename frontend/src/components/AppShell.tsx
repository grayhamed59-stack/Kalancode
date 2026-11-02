import React, { useState, useEffect, useRef } from 'react';
import type { ScriptMode } from '../types';
import { sounds } from '../utils/audio';
import {
  Volume2, VolumeX, Home, Compass, Dumbbell, FolderOpen, BookMarked,
  Sparkles, Flame, User, Menu, X, ChevronDown, GraduationCap
} from 'lucide-react';
import { KalanCodeMascot } from './brand/KalanCodeMascot';

export type AppView = 'home' | 'parcours' | 'cours' | 'exercices' | 'projets' | 'ressources' | 'lesson-studio';

interface NavItem {
  id: AppView;
  icon: React.ReactNode;
  labelLatin: string;
  labelNko: string;
  labelFr: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    icon: <Home size={18} />,
    labelLatin: 'Accueil',
    labelNko: 'ߟߊ߬ߛߣߍ',
    labelFr: 'Accueil',
  },
  {
    id: 'parcours',
    icon: <Compass size={18} />,
    labelLatin: 'Parcours',
    labelNko: 'ߞߊ߬ߙߊ߲ ߛߌߙߊ',
    labelFr: 'Parcours',
  },
  {
    id: 'cours',
    icon: <GraduationCap size={18} />,
    labelLatin: 'Cours',
    labelNko: 'ߞߊ߬ߙߊ߲ ߠߎ߬',
    labelFr: 'Cours',
  },
  {
    id: 'exercices',
    icon: <Dumbbell size={18} />,
    labelLatin: 'Exercices',
    labelNko: 'ߘߍ߰ߟߌ ߟߎ߬',
    labelFr: 'Exercices',
  },
  {
    id: 'projets',
    icon: <FolderOpen size={18} />,
    labelLatin: 'Projets',
    labelNko: 'ߔߙߏߖߍ ߟߎ߬',
    labelFr: 'Projets',
  },
  {
    id: 'ressources',
    icon: <BookMarked size={18} />,
    labelLatin: 'Ressources',
    labelNko: 'ߞߎ߲߬ߠߊ߬ߝߎߟߋ߲',
    labelFr: 'Ressources',
  },
];

interface AppShellProps {
  currentScript: ScriptMode;
  onSelectScript: (s: ScriptMode) => void;
  score: number;
  streakDays: number;
  activeView: AppView;
  onSelectView: (v: AppView) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentScript,
  onSelectScript,
  score,
  streakDays,
  activeView,
  onSelectView,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(sounds.isMuted());
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleToggleMute = () => {
    const isMuted = sounds.toggleMute();
    setMuted(isMuted);
    if (!isMuted) sounds.playClick();
  };

  const handleScriptChange = (s: ScriptMode) => {
    sounds.playClick();
    onSelectScript(s);
    setProfileMenuOpen(false);
  };

  const handleNavClick = (v: AppView) => {
    sounds.playClick();
    onSelectView(v);
    setMobileMenuOpen(false);
  };

  const getLabel = (item: NavItem) => {
    if (currentScript === 'nko') return item.labelNko;
    if (currentScript === 'fr') return item.labelFr;
    return item.labelLatin;
  };

  const learnerLabels: Record<ScriptMode, { name: string; level: string }> = {
    latin: { name: 'Kalanba', level: 'Niv. 1' },
    nko:   { name: 'ߞߊ߬ߙߊ߲߬ߠߊ', level: '١' },
    fr:    { name: 'Apprenant', level: 'Niv. 1' },
  };

  const learner = learnerLabels[currentScript];

  return (
    <div className={`kc-shell ${currentScript === 'nko' ? 'nko-mode' : ''}`}>

      {/* ── HORIZONTAL TOP NAVBAR ── */}
      <header className="kc-topnav" role="banner">
        <div className="kc-topnav-inner">

          {/* LEFT: Brand */}
          <div className="kc-topnav-brand">
            <div className="kc-topnav-logo-wrap">
              <KalanCodeMascot size={38} className="kc-topnav-logo" />
            </div>
            <span className="kc-topnav-brand-name">KalanCode</span>
          </div>

          {/* CENTER: Nav Items (desktop) */}
          <nav className="kc-topnav-center" role="navigation" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id || (activeView === 'lesson-studio' && item.id === 'parcours');
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`kc-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  title={getLabel(item)}
                >
                  <span className="kc-nav-btn-icon">{item.icon}</span>
                  <span className={`kc-nav-btn-label ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                    {getLabel(item)}
                  </span>
                  {isActive && <span className="kc-nav-active-bar" />}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Stats + Script + Profile */}
          <div className="kc-topnav-right">

            {/* XP Score */}
            <div className="kc-stat-chip" title="Points XP">
              <Sparkles size={14} color="#FFC400" />
              <span>{score} XP</span>
            </div>

            {/* Streak */}
            <div className="kc-stat-chip" title="Série de jours consécutifs">
              <Flame size={14} color="#FF9B00" />
              <span>{streakDays}j</span>
            </div>

            {/* Sound toggle */}
            <button
              type="button"
              className="kc-icon-btn"
              onClick={handleToggleMute}
              title={muted ? 'Activer le son' : 'Couper le son'}
              aria-label={muted ? 'Activer le son' : 'Couper le son'}
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            {/* User profile dropdown */}
            <div className="kc-profile-wrap" ref={profileRef}>
              <button
                type="button"
                className="kc-profile-btn"
                onClick={() => setProfileMenuOpen((p) => !p)}
                title="Profil utilisateur"
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                <div className="kc-avatar">
                  <User size={16} />
                </div>
                <div className="kc-profile-text">
                  <span className={`kc-profile-name ${currentScript === 'nko' ? 'nko-text' : ''}`}>
                    {learner.name}
                  </span>
                  <span className="kc-profile-level">{learner.level}</span>
                </div>
                <ChevronDown size={14} className={`kc-chevron ${profileMenuOpen ? 'open' : ''}`} />
              </button>

              {/* Dropdown */}
              {profileMenuOpen && (
                <div className="kc-profile-dropdown" role="menu">
                  <div className="kc-dropdown-section-title">Langue / Script</div>
                  {(['latin', 'nko', 'fr'] as ScriptMode[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`kc-dropdown-item ${currentScript === s ? 'active' : ''}`}
                      onClick={() => handleScriptChange(s)}
                      role="menuitem"
                    >
                      {s === 'latin' ? '🇲🇱 Bamanankan' : s === 'nko' ? '✍️ ߒߞߏ N\'Ko' : '🇫🇷 Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="kc-hamburger"
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="kc-mobile-menu" role="navigation" aria-label="Menu mobile">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id || (activeView === 'lesson-studio' && item.id === 'parcours');
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`kc-mobile-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.icon}
                  <span className={currentScript === 'nko' ? 'nko-text' : ''}>{getLabel(item)}</span>
                </button>
              );
            })}
            <div className="kc-mobile-divider" />
            <div className="kc-mobile-scripts">
              {(['latin', 'nko', 'fr'] as ScriptMode[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`kc-mobile-script-btn ${currentScript === s ? 'active' : ''}`}
                  onClick={() => handleScriptChange(s)}
                >
                  {s === 'latin' ? 'Bam.' : s === 'nko' ? 'ߒߞߏ' : 'FR'}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT (Full width under navbar) ── */}
      <main className="kc-page-content">
        {children}
      </main>

    </div>
  );
};
