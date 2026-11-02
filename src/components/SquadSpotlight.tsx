import React, { useState } from 'react';
import { Star, TrendingUp, Award, Sliders } from 'lucide-react';
import { SQUAD_PLAYERS } from '../data/barcaData';
import { Player } from '../types';

export const SquadSpotlight: React.FC = () => {
  const [positionFilter, setPositionFilter] = useState<'All' | 'Forward' | 'Midfielder' | 'Defender'>('All');
  const [players, setPlayers] = useState<Player[]>(SQUAD_PLAYERS);
  const [ratingTarget, setRatingTarget] = useState<Player | null>(null);
  const [sliderScore, setSliderScore] = useState<number>(9.5);
  const [ratedPlayerIds, setRatedPlayerIds] = useState<Set<string>>(new Set());

  const filteredPlayers = players.filter((p) => {
    if (positionFilter === 'All') return true;
    return p.position === positionFilter;
  });

  const handleRatePlayer = (player: Player) => {
    setRatingTarget(player);
    setSliderScore(player.fanRating);
  };

  const handleConfirmRating = () => {
    if (!ratingTarget) return;

    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === ratingTarget.id) {
          const newTotalVotes = p.totalVotes + 1;
          const newRating = Number(((p.fanRating * p.totalVotes + sliderScore) / newTotalVotes).toFixed(1));
          return {
            ...p,
            fanRating: newRating,
            totalVotes: newTotalVotes,
          };
        }
        return p;
      })
    );

    setRatedPlayerIds((prev) => new Set([...prev, ratingTarget.id]));
    setRatingTarget(null);
  };

  return (
    <section id="squad" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              First Team Roster & Form
            </div>
            <h2 className="mt-1 font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Culers Squad Ratings
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Community ratings evaluated match by match. Click <span className="text-amber-400 font-medium">Rate Player</span> to calibrate the squad consensus.
            </p>
          </div>

          {/* Position Filter Segmented Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-md">
            {(['All', 'Forward', 'Midfielder', 'Defender'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-medium uppercase font-athletic tracking-wide rounded-sm transition-all whitespace-nowrap ${
                  positionFilter === pos
                    ? 'bg-gradient-to-r from-[#004D98] to-[#A50044] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {pos === 'All' ? 'Full Squad' : pos}
              </button>
            ))}
          </div>
        </div>

        {/* Squad Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => {
            const hasUserRated = ratedPlayerIds.has(player.id);

            return (
              <div
                key={player.id}
                className="group relative bg-slate-900/80 rounded-lg border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Kit / Number Decorative Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs text-slate-400 tracking-wider">#{player.number}</span>
                      <span className="mx-1.5 text-slate-600">·</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">{player.position}</span>
                    </div>

                    {/* Overall Fan Rating */}
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-xs border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-athletic text-lg font-bold text-amber-300 tabular-nums">
                        {player.fanRating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Player Name & Trait */}
                  <h3 className="mt-3 font-athletic text-2xl font-bold uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    {player.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {player.highlightTrait}
                  </p>
                </div>

                {/* Key Statistics Strip (Tabular Numerals) */}
                <div className="px-5 py-3 border-y border-slate-800/80 bg-slate-950/40 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-slate-400">Apps</div>
                    <div className="font-mono text-sm font-semibold text-slate-200 tabular-nums">
                      {player.stats.appearances}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      {player.position === 'Defender' ? 'Passing' : 'Goals'}
                    </div>
                    <div className="font-mono text-sm font-semibold text-slate-200 tabular-nums">
                      {player.position === 'Defender' ? player.stats.passAccuracy : player.stats.goals}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      {player.position === 'Defender' ? 'Assists' : 'Assists'}
                    </div>
                    <div className="font-mono text-sm font-semibold text-slate-200 tabular-nums">
                      {player.stats.assists}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400 tabular-nums">
                    {player.totalVotes.toLocaleString()} votes
                  </span>

                  <button
                    onClick={() => handleRatePlayer(player)}
                    className={`cursor-pointer px-3 py-1.5 rounded-sm font-athletic uppercase tracking-wider text-xs font-semibold transition-all ${
                      hasUserRated
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-gradient-to-r hover:from-[#004D98] hover:to-[#A50044] text-slate-200 hover:text-white border border-slate-700'
                    }`}
                  >
                    {hasUserRated ? 'Rated ✓' : 'Rate Player'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Rating Modal / Dialog */}
        {ratingTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Rate Squad Performance
                  </span>
                  <h3 className="font-athletic text-2xl font-bold uppercase text-white">
                    {ratingTarget.name} (#{ratingTarget.number})
                  </h3>
                </div>
                <button
                  onClick={() => setRatingTarget(null)}
                  className="cursor-pointer text-slate-400 hover:text-white text-lg p-1"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 text-center">
                <div className="font-athletic text-5xl font-black text-amber-400 tabular-nums tracking-tight">
                  {sliderScore.toFixed(1)}
                  <span className="text-base text-slate-400 font-sans font-normal ml-1">/ 10.0</span>
                </div>
                <div className="mt-2 text-xs text-slate-300">
                  {sliderScore >= 9.0 ? 'World-Class / Masterclass' : sliderScore >= 7.5 ? 'Very Good / High Impact' : sliderScore >= 6.0 ? 'Solid Contribution' : 'Below Standards'}
                </div>

                <div className="mt-6 px-2">
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.1"
                    value={sliderScore}
                    onChange={(e) => setSliderScore(parseFloat(e.target.value))}
                    className="w-full accent-[#A50044] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1.0</span>
                    <span>5.0</span>
                    <span>10.0</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setRatingTarget(null)}
                  className="cursor-pointer px-4 py-2 text-xs font-semibold uppercase font-athletic text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRating}
                  className="cursor-pointer px-5 py-2 text-xs font-semibold uppercase font-athletic tracking-wider text-white bg-gradient-to-r from-[#004D98] to-[#A50044] hover:brightness-110 rounded-sm"
                >
                  Submit Culers Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
