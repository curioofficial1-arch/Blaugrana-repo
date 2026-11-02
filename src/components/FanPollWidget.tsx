import React, { useState } from 'react';
import { BarChart2, CheckCircle2, Award } from 'lucide-react';
import { ACTIVE_POLL } from '../data/barcaData';
import { FanPoll } from '../types';

export const FanPollWidget: React.FC = () => {
  const [poll, setPoll] = useState<FanPoll>(ACTIVE_POLL);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setSelectedOption(optionId);
    setPoll((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    }));
    setHasVoted(true);
  };

  return (
    <section id="polls" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-semibold uppercase tracking-wider">
                Official Culers Referendum
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-300 tabular-nums">
                {poll.totalVotes.toLocaleString()} votes cast
              </span>
            </div>
            <span className="text-slate-400">{poll.expiresIn}</span>
          </div>

          <div className="mt-5">
            <h2 className="font-athletic text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight leading-tight">
              {poll.question}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              {poll.description}
            </p>
          </div>

          {/* Voting Options */}
          <div className="mt-6 space-y-3">
            {poll.options.map((option) => {
              const percentage = Math.round((option.votes / poll.totalVotes) * 100);
              const isSelected = selectedOption === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                  disabled={hasVoted}
                  className={`cursor-pointer w-full text-left p-4 rounded-lg border transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  {/* Dynamic Progress Bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#004D98]/20 to-[#A50044]/20 transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400'
                            : 'border-slate-600 group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {option.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-amber-300 tabular-nums">
                        {percentage}%
                      </span>
                      <span className="font-mono text-xs text-slate-400 tabular-nums hidden sm:inline">
                        ({option.votes.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Post-vote confirmation state */}
          {hasVoted ? (
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your ballot has been verified and recorded to the Culers consensus.</span>
              </div>
              <span className="text-slate-400">Next poll publishes Monday</span>
            </div>
          ) : (
            <div className="mt-5 text-xs text-slate-400 text-center">
              Click an option above to cast your official supporter ballot.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
