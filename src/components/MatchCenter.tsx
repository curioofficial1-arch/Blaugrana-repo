import React, { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, CheckCircle2, TrendingUp } from 'lucide-react';
import { UPCOMING_FIXTURES, RECENT_RESULTS, LA_LIGA_STANDINGS } from '../data/barcaData';

export const MatchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'RECENT' | 'TABLE'>('UPCOMING');
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [predictionVotes, setPredictionVotes] = useState<Record<string, number>>({
    'Lamine Yamal': 2840,
    'Robert Lewandowski': 3650,
    'Raphinha': 3120,
    'Dani Olmo': 1890,
    'Pedri / Casadó': 740,
  });

  const nextMatch = UPCOMING_FIXTURES[0];

  const handleVote = (player: string) => {
    if (hasVoted) return;
    setSelectedPrediction(player);
    setPredictionVotes((prev) => ({
      ...prev,
      [player]: prev[player] + 1,
    }));
    setHasVoted(true);
  };

  const totalPredictionVotes = Object.values(predictionVotes).reduce((a, b) => a + b, 0);

  return (
    <section id="matchday" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Real Competition Hub · Season 2024–2026
            </div>
            <h2 className="mt-1 font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Fixtures, Results & Standings
            </h2>
          </div>

          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-md overflow-x-auto">
            <button
              onClick={() => setActiveTab('UPCOMING')}
              className={`cursor-pointer px-4 py-1.5 text-xs font-medium uppercase font-athletic tracking-wide rounded-sm transition-all whitespace-nowrap ${
                activeTab === 'UPCOMING'
                  ? 'bg-gradient-to-r from-[#004D98] to-[#A50044] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming Clashes
            </button>
            <button
              onClick={() => setActiveTab('RECENT')}
              className={`cursor-pointer px-4 py-1.5 text-xs font-medium uppercase font-athletic tracking-wide rounded-sm transition-all whitespace-nowrap ${
                activeTab === 'RECENT'
                  ? 'bg-gradient-to-r from-[#004D98] to-[#A50044] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Recent Classic Victories
            </button>
            <button
              onClick={() => setActiveTab('TABLE')}
              className={`cursor-pointer px-4 py-1.5 text-xs font-medium uppercase font-athletic tracking-wide rounded-sm transition-all whitespace-nowrap ${
                activeTab === 'TABLE'
                  ? 'bg-gradient-to-r from-[#004D98] to-[#A50044] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Official La Liga Table
            </button>
          </div>
        </div>

        {/* TAB 1: UPCOMING FIXTURES */}
        {activeTab === 'UPCOMING' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured Next Clash */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-lg border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800">
                  <span className="font-medium text-amber-400">{nextMatch.competition}</span>
                  <span className="font-mono text-slate-300">{nextMatch.round}</span>
                </div>

                <div className="py-8 grid grid-cols-3 items-center text-center">
                  {/* Home Team (Real Sociedad) */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-athletic font-bold text-xl text-slate-200 shadow-lg">
                      {nextMatch.opponentLogoText}
                    </div>
                    <span className="mt-3 font-athletic text-xl font-bold uppercase tracking-wider text-white">
                      {nextMatch.opponent}
                    </span>
                    <span className="text-xs text-slate-400">Home · Reale Arena</span>
                  </div>

                  {/* Kickoff */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-athletic text-3xl font-black text-amber-400 tracking-wider">
                      VS
                    </span>
                    <span className="mt-2 text-xs font-mono font-medium text-slate-300 px-2.5 py-1 bg-slate-800/80 rounded-xs border border-slate-700">
                      {nextMatch.time}
                    </span>
                  </div>

                  {/* Barcelona Team */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#004D98] to-[#A50044] border-2 border-amber-400/80 flex items-center justify-center font-athletic font-bold text-xl text-white shadow-lg">
                      FCB
                    </div>
                    <span className="mt-3 font-athletic text-xl font-bold uppercase tracking-wider text-white">
                      FC Barcelona
                    </span>
                    <span className="text-xs text-amber-400 font-medium">Away · 1st in La Liga</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{nextMatch.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{nextMatch.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{nextMatch.attendance}</span>
                  </div>
                </div>
              </div>

              {/* Later scheduled matches */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Following Official Fixtures
                </span>
                {UPCOMING_FIXTURES.slice(1).map((m) => (
                  <div key={m.id} className="flex items-center justify-between text-xs p-2.5 bg-slate-950/60 rounded-md border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-athletic uppercase text-sm font-bold text-white">
                        FC Barcelona vs {m.opponent}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-amber-400">{m.competition}</span>
                    </div>
                    <span className="font-mono text-slate-400">{m.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Fan Prediction Widget */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-lg border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Real Match Prediction
                </div>
                <h3 className="mt-1 font-athletic text-2xl font-bold uppercase text-white">
                  Who opens the scoring in San Sebastián?
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Total Culers ballots cast:{' '}
                  <span className="font-mono text-slate-200">{totalPredictionVotes.toLocaleString()}</span>
                </p>

                <div className="mt-5 space-y-2.5">
                  {Object.entries(predictionVotes).map(([player, votes]) => {
                    const pct = Math.round((votes / totalPredictionVotes) * 100);
                    const isSelected = selectedPrediction === player;

                    return (
                      <button
                        key={player}
                        onClick={() => handleVote(player)}
                        disabled={hasVoted}
                        className={`cursor-pointer w-full text-left p-3 rounded-md border transition-all relative overflow-hidden ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#004D98]/25 to-[#A50044]/25 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                        <div className="relative flex items-center justify-between text-xs font-medium">
                          <span className={`font-athletic text-sm uppercase ${isSelected ? 'text-amber-300 font-bold' : 'text-slate-200'}`}>
                            {player}
                          </span>
                          <div className="flex items-center gap-2">
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                            <span className="font-mono text-slate-400 tabular-nums">{pct}%</span>
                            <span className="font-mono text-slate-500 tabular-nums">({votes.toLocaleString()})</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasVoted && (
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Vote registered! Prediction points awarded to your Culer profile after kickoff.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: RECENT REAL RESULTS */}
        {activeTab === 'RECENT' && (
          <div className="space-y-4">
            {RECENT_RESULTS.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900/90 rounded-lg border border-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span className="font-medium text-amber-400">{res.competition}</span>
                  <span className="font-mono text-slate-300">{res.date}</span>
                </div>

                <div className="py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center">
                  <div>
                    <h3 className="font-athletic text-2xl font-bold uppercase text-white">
                      {res.isHome ? 'FC Barcelona' : res.opponent}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {res.isHome ? 'Home' : 'Home'}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="font-athletic text-5xl font-black text-amber-400 tracking-tight tabular-nums">
                      {res.isHome ? res.score?.barca : res.score?.opponent} - {res.isHome ? res.score?.opponent : res.score?.barca}
                    </div>
                    <span className="mt-1 text-xs text-emerald-400 font-semibold uppercase tracking-wider font-athletic">
                      Barça Victory
                    </span>
                  </div>

                  <div>
                    <h3 className="font-athletic text-2xl font-bold uppercase text-white">
                      {res.isHome ? res.opponent : 'FC Barcelona'}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {res.isHome ? 'Away' : 'Away'}
                    </span>
                  </div>
                </div>

                {/* Scorer Events */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {res.highlights?.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200"
                      >
                        ⚽ {h}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-slate-500 text-right">
                    {res.attendance} · {res.venue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: OFFICIAL LA LIGA STANDINGS */}
        {activeTab === 'TABLE' && (
          <div className="bg-slate-900/90 rounded-lg border border-slate-800 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  La Liga EA Sports 2024–25
                </span>
                <h3 className="font-athletic text-2xl font-bold uppercase text-white">
                  Current Official League Standings
                </h3>
              </div>
              <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-sm border border-emerald-500/20">
                Barça: 1st (+9 Pts Over RM)
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Pos</th>
                    <th className="py-3 px-4">Club</th>
                    <th className="py-3 px-4 text-center">PL</th>
                    <th className="py-3 px-4 text-center">W</th>
                    <th className="py-3 px-4 text-center">D</th>
                    <th className="py-3 px-4 text-center">L</th>
                    <th className="py-3 px-4 text-center">GF</th>
                    <th className="py-3 px-4 text-center">GA</th>
                    <th className="py-3 px-4 text-center">GD</th>
                    <th className="py-3 px-4 text-center font-bold text-white">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {LA_LIGA_STANDINGS.map((row) => {
                    const isBarca = row.team === 'FC Barcelona';
                    return (
                      <tr
                        key={row.rank}
                        className={`transition-colors ${
                          isBarca
                            ? 'bg-gradient-to-r from-[#004D98]/20 to-[#A50044]/20 font-bold text-white'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <td className="py-3 px-4 font-bold text-amber-400">{row.rank}</td>
                        <td className="py-3 px-4 font-sans font-semibold flex items-center gap-2">
                          {isBarca && (
                            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#004D98] to-[#A50044]" />
                          )}
                          <span>{row.team}</span>
                        </td>
                        <td className="py-3 px-4 text-center tabular-nums">{row.played}</td>
                        <td className="py-3 px-4 text-center tabular-nums">{row.won}</td>
                        <td className="py-3 px-4 text-center tabular-nums">{row.drawn}</td>
                        <td className="py-3 px-4 text-center tabular-nums">{row.lost}</td>
                        <td className="py-3 px-4 text-center tabular-nums">{row.goalsFor}</td>
                        <td className="py-3 px-4 text-center tabular-nums">{row.goalsAgainst}</td>
                        <td className="py-3 px-4 text-center tabular-nums text-emerald-400 font-semibold">
                          +{row.goalDiff}
                        </td>
                        <td className="py-3 px-4 text-center tabular-nums text-base font-extrabold text-amber-300">
                          {row.points}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-3 text-[11px] text-slate-500 bg-slate-950/40 text-right">
              Official data updated live following Matchday 12. Top 4 qualify for UEFA Champions League.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
