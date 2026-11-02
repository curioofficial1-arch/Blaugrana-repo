import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenRoadmap: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onOpenRoadmap,
  onOpenProfile,
}) => {
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <span className="w-4 h-4 rounded-xs bg-gradient-to-br from-[#004D98] via-[#A50044] to-[#EDBB00] shadow-xs" />
          <span className="font-athletic text-2xl tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors">
            BARÇA FAN CENTRAL
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('matchday')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeSection === 'matchday' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Match Center
          </button>
          <button
            onClick={() => onNavigate('squad')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeSection === 'squad' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Squad & Form
          </button>
          <button
            onClick={() => onNavigate('news')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeSection === 'news' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Club Radar
          </button>
          <button
            onClick={() => onNavigate('polls')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeSection === 'polls' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Fan Poll
          </button>
          <button
            onClick={onOpenRoadmap}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${
              activeSection === 'roadmap' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            8-Feature Roadmap
          </button>
        </nav>

        {/* Zone 3: 1 primary action button: Profile/Carnet or Join Culers */}
        <div className="flex items-center gap-3 shrink-0">
          {profile ? (
            <button
              onClick={onOpenProfile}
              className="cursor-pointer px-3.5 py-1.5 text-xs font-semibold font-athletic uppercase tracking-wider text-amber-300 bg-slate-900 hover:bg-slate-800 border border-amber-400/50 rounded-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{profile.displayName} · Carnet Pass</span>
            </button>
          ) : (
            <button
              onClick={onOpenProfile}
              className="cursor-pointer px-4 py-2 text-xs font-semibold tracking-wide uppercase font-athletic text-white bg-gradient-to-r from-[#004D98] via-[#850338] to-[#A50044] hover:brightness-110 active:scale-98 transition-all rounded-md shadow-sm border border-white/10 whitespace-nowrap shrink-0"
            >
              Join Culers / Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
