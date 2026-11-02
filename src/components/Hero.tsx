import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowDown, Sparkles } from 'lucide-react';
import { playBarcaAnthemFanfare } from '../utils/audioSynth';

interface HeroProps {
  onExploreMatches: () => void;
  onExploreSquad: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMatches, onExploreSquad }) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [stopFn, setStopFn] = useState<(() => void) | null>(null);
  const [imgError, setImgError] = useState(false);

  // Match countdown logic
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    if (isPlayingSound && stopFn) {
      stopFn();
      setIsPlayingSound(false);
      setStopFn(null);
    } else {
      setIsPlayingSound(true);
      const cancel = playBarcaAnthemFanfare(() => {
        setIsPlayingSound(false);
        setStopFn(null);
      });
      setStopFn(() => cancel);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Stadium Visual Backdrop with measured Blaugrana scrim */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {!imgError ? (
          <img
            src="/src/assets/images/barca_hero_stadium_1793595446406.jpg"
            alt="Spotify Camp Nou packed Blaugrana stadium at night"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center opacity-30 transform scale-102 filter contrast-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#004D98]/30 via-slate-950 to-[#A50044]/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#004D98]/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12 sm:pb-16">
        {/* Catalan Identity Lead */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-4">
          <span className="text-amber-400">Més que un club</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Spotify Camp Nou Sanctum</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Official Culers Community</span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl">
          <h1 className="font-athletic text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            The Spirit of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-rose-400 to-amber-300">Blaugrana</span> Unites Here
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Welcome to the modern digital home of FC Barcelona supporters. Experience real-time match centers, tactical squad ratings, breaking transfer radar, and direct fan voting.
          </p>
        </div>

        {/* Action Controls & Interactive Chime */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreMatches}
            className="cursor-pointer px-6 py-3 text-sm font-bold font-athletic tracking-wider uppercase text-white bg-gradient-to-r from-[#004D98] via-[#850338] to-[#A50044] hover:brightness-110 active:scale-98 transition-all rounded-md shadow-md border border-white/15 whitespace-nowrap"
          >
            Enter Matchday Center
          </button>

          <button
            onClick={onExploreSquad}
            className="cursor-pointer px-5 py-3 text-sm font-bold font-athletic tracking-wider uppercase text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all rounded-md whitespace-nowrap"
          >
            View Squad Ratings
          </button>

          {/* Stadium Chime Synthesizer */}
          <button
            onClick={handleToggleSound}
            aria-label={isPlayingSound ? 'Stop Blaugrana chime' : 'Play Blaugrana chime'}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap ${
              isPlayingSound
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-amber-300 hover:border-slate-700'
            }`}
          >
            {isPlayingSound ? (
              <>
                <VolumeX className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Playing Stadium Fanfare...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Play Camp Nou Fanfare</span>
              </>
            )}
          </button>
        </div>

        {/* Live Match Countdown Strip (Tabular figures, clean metadata) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Next Clash In</div>
            <div className="mt-1 font-athletic text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums flex items-baseline gap-1">
              <span>{String(timeLeft.days).padStart(2, '0')}</span><span className="text-xs text-slate-400 font-sans">d</span>
              <span className="text-slate-600">:</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-xs text-slate-400 font-sans">h</span>
              <span className="text-slate-600">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-xs text-slate-400 font-sans">m</span>
              <span className="text-slate-600">:</span>
              <span className="text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-xs text-slate-400 font-sans">s</span>
            </div>
            <div className="mt-1 text-xs text-slate-400 truncate">El Clásico · Spotify Camp Nou</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Season League Position</div>
            <div className="mt-1 font-athletic text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              1st <span className="text-xs text-amber-400 font-sans font-medium uppercase">· +6 Pts Clear</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">33 Points · 40 Goals Scored</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Top Form Goalscorer</div>
            <div className="mt-1 font-athletic text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              17 Goals
            </div>
            <div className="mt-1 text-xs text-slate-400 truncate">Robert Lewandowski (#9)</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Culers Community</div>
            <div className="mt-1 font-athletic text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              142,800+
            </div>
            <div className="mt-1 text-xs text-slate-400">Active Global Fan Voices</div>
          </div>
        </div>
      </div>
    </section>
  );
};
