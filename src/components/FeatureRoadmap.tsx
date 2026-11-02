import React, { useState } from 'react';
import { CheckCircle2, Clock, Sparkles, ArrowRight, Shield, Layers } from 'lucide-react';
import { ROADMAP_FEATURES } from '../data/barcaData';
import { RoadmapFeature } from '../types';

interface FeatureRoadmapProps {
  onSelectNextPrompt?: (feature: RoadmapFeature) => void;
}

export const FeatureRoadmap: React.FC<FeatureRoadmapProps> = ({ onSelectNextPrompt }) => {
  const [selectedFeature, setSelectedFeature] = useState<RoadmapFeature>(ROADMAP_FEATURES[1]); // Default to Fan registration & profiles
  const [copiedFeature, setCopiedFeature] = useState<string | null>(null);

  const handleCopyPrompt = (feature: RoadmapFeature) => {
    setCopiedFeature(feature.id);
    if (onSelectNextPrompt) {
      onSelectNextPrompt(feature);
    }
    setTimeout(() => {
      setCopiedFeature(null);
    }, 2500);
  };

  return (
    <section id="roadmap" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Step-by-Step Architecture Roadmap
          </div>
          <h2 className="mt-1 font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Your 8-Feature Masterplan
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            You requested to start with feature #1 (The Modern Homepage), and move into each subsequent feature after testing. Here is your roadmap and what's lined up next!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Feature List */}
          <div className="lg:col-span-5 space-y-3">
            {ROADMAP_FEATURES.map((feat) => {
              const isSelected = selectedFeature.id === feat.id;
              const isCurrent = feat.id === 'homepage';
              const isNext = feat.id === 'registration';

              return (
                <button
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat)}
                  className={`cursor-pointer w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-athletic text-lg font-bold uppercase text-white tracking-wide">
                      {feat.name}
                    </span>
                    {isCurrent ? (
                      <span className="text-xs font-semibold font-mono text-emerald-400">
                        ACTIVE NOW
                      </span>
                    ) : isNext ? (
                      <span className="text-xs font-semibold font-mono text-amber-400">
                        NEXT UP
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-400">
                        PLANNED
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {feat.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep-Dive on Selected Feature */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-xl border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Module Specification
                </span>
                <h3 className="mt-1 font-athletic text-3xl font-extrabold uppercase text-white">
                  {selectedFeature.name}
                </h3>
              </div>

              {selectedFeature.id === 'homepage' ? (
                <div className="text-xs text-emerald-400 font-medium px-2.5 py-1 bg-emerald-500/10 rounded-xs border border-emerald-500/20">
                  Ready to test below
                </div>
              ) : selectedFeature.id === 'registration' ? (
                <div className="text-xs text-amber-400 font-medium px-2.5 py-1 bg-amber-500/10 rounded-xs border border-amber-500/20">
                  Step 2 Candidate
                </div>
              ) : (
                <div className="text-xs text-slate-400 font-medium px-2.5 py-1 bg-slate-800 rounded-xs">
                  Queued
                </div>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {selectedFeature.description}
            </p>

            {/* Planned Key Capabilities */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Included Core Capabilities
              </h4>
              <div className="space-y-2.5">
                {selectedFeature.plannedHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Callout Box */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              {selectedFeature.id === 'homepage' ? (
                <div className="text-xs text-slate-300">
                  🎉 <strong>Feature 1 is complete and live!</strong> Feel free to explore the Spotify Camp Nou match center, test player ratings, listen to the stadium fanfare, and cast your vote on the referendum. When ready, tell me to build Feature 2 (Fan Registration & Profiles) or any other feature!
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gradient-to-r from-[#004D98]/20 to-[#A50044]/20 border border-amber-500/30">
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Ready to build this feature next?
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Simply reply in chat: <span className="text-amber-300 font-mono">"Let's build {selectedFeature.name.split('. ')[1]}"</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyPrompt(selectedFeature)}
                    className="cursor-pointer px-4 py-2 rounded-sm text-xs font-bold font-athletic uppercase tracking-wider bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shrink-0"
                  >
                    {copiedFeature === selectedFeature.id ? 'Prompt Ready ✓' : 'Select for Next Step'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
