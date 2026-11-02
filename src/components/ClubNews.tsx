import React, { useState } from 'react';
import { Newspaper, ArrowUpRight, ShieldCheck, Flame, Compass } from 'lucide-react';
import { CLUB_NEWS, TRANSFER_RUMORS } from '../data/barcaData';

export const ClubNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [transferFilter, setTransferFilter] = useState<'All' | 'Tier 1' | 'Extensions'>('All');

  const filteredNews = CLUB_NEWS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const filteredRumors = TRANSFER_RUMORS.filter((r) => {
    if (transferFilter === 'Tier 1') return r.tier === 1;
    if (transferFilter === 'Extensions') return r.type === 'Contract Extension';
    return true;
  });

  return (
    <section id="news" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Breaking Editorial & Club News */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Official Editorial Desk
                </div>
                <h2 className="mt-1 font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Club News & Briefings
                </h2>
              </div>
            </div>

            {/* News Articles List */}
            <div className="space-y-4">
              {filteredNews.map((news) => (
                <article
                  key={news.id}
                  className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-amber-400 font-semibold">{news.category}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{news.date}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{news.readTime}</span>
                  </div>

                  <h3 className="mt-2.5 font-athletic text-xl sm:text-2xl font-bold uppercase text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {news.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {news.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span>By {news.author}</span>
                    <span className="flex items-center gap-1 text-amber-400 group-hover:translate-x-0.5 transition-transform font-medium">
                      Read full briefing <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Transfer Rumor Radar & Reliability Tracker */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Market Reliability Index
                </div>
                <h2 className="mt-1 font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Transfer Radar
                </h2>
              </div>

              {/* Quick filter tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-md">
                {(['All', 'Tier 1', 'Extensions'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTransferFilter(filter)}
                    className={`cursor-pointer px-2.5 py-1 text-xs font-medium uppercase font-athletic tracking-wide rounded-sm transition-all whitespace-nowrap ${
                      transferFilter === filter
                        ? 'bg-gradient-to-r from-[#004D98] to-[#A50044] text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Rumor Radar Cards */}
            <div className="space-y-4">
              {filteredRumors.map((rumor) => (
                <div
                  key={rumor.id}
                  className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-semibold uppercase">{rumor.type}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Tier {rumor.tier} Source</span>
                    </div>

                    <span className="font-mono text-xs text-emerald-400 tabular-nums">
                      {rumor.probability}% probability
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-baseline justify-between">
                    <h3 className="font-athletic text-2xl font-bold uppercase text-white tracking-tight">
                      {rumor.player}
                    </h3>
                    <span className="text-xs text-slate-400 uppercase font-mono">{rumor.position}</span>
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    Current Club: <span className="text-slate-200">{rumor.currentClub}</span>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                    {rumor.description}
                  </p>

                  {/* Probability Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span>Source: {rumor.source}</span>
                      <span className="font-mono text-slate-300">{rumor.probability}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#004D98] via-[#A50044] to-amber-400 rounded-xs transition-all duration-700"
                        style={{ width: `${rumor.probability}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
