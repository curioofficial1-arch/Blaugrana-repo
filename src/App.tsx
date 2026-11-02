/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FanRegistrationBanner } from './components/FanRegistrationBanner';
import { MatchCenter } from './components/MatchCenter';
import { SquadSpotlight } from './components/SquadSpotlight';
import { ClubNews } from './components/ClubNews';
import { FanPollWidget } from './components/FanPollWidget';
import { FeatureRoadmap } from './components/FeatureRoadmap';
import { Footer } from './components/Footer';
import { FanProfileModal } from './components/FanProfileModal';
import { RoadmapFeature } from './types';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectNextPrompt = (feature: RoadmapFeature) => {
    setCopiedNotification(`Selected for Step 3: "${feature.name}"`);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#A50044] selection:text-white flex flex-col">
      {/* Step Indicator Header Banner */}
      <div className="bg-gradient-to-r from-[#004D98] via-[#850338] to-[#A50044] text-white px-4 py-2 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-athletic font-bold uppercase tracking-wider text-amber-300">
              STEP 2 OF 8 LIVE
            </span>
            <span aria-hidden="true" className="text-white/60">·</span>
            <span>Fan Registration & Profiles (Real Firebase Database & Auth) is active with authentic Barça data!</span>
          </div>
          <button
            onClick={() => scrollToSection('roadmap')}
            className="cursor-pointer flex items-center gap-1 font-athletic uppercase tracking-wider text-amber-300 hover:text-white transition-colors underline underline-offset-2 font-semibold"
          >
            <span>Track 8-Feature Masterplan</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Navigation Bar adhering strictly to Top Bar Contract */}
      <Navbar
        onNavigate={scrollToSection}
        activeSection={activeSection}
        onOpenRoadmap={() => scrollToSection('roadmap')}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Immersive Hero with Spotify Camp Nou visuals, live countdown, & stadium fanfare synthesis */}
        <Hero
          onExploreMatches={() => scrollToSection('matchday')}
          onExploreSquad={() => scrollToSection('squad')}
        />

        {/* 2. Step 2 Spotlight: Fan Registration & 3D Carnet de Culer Pass */}
        <FanRegistrationBanner onOpenProfile={() => setIsProfileOpen(true)} />

        {/* 3. Real Match Center: Upcoming fixtures, real Bernabéu 0-4 triumph, & official La Liga table */}
        <MatchCenter />

        {/* 4. Squad Spotlight: Real-time fan rating slider & player statistics */}
        <SquadSpotlight />

        {/* 5. Breaking Club Briefings & Transfer Rumor Radar */}
        <ClubNews />

        {/* 6. Supporter Referendum Poll */}
        <FanPollWidget />

        {/* 7. Step-by-Step 8-Feature Masterplan Roadmap */}
        <FeatureRoadmap onSelectNextPrompt={handleSelectNextPrompt} />
      </main>

      {/* Heritage Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Fan Registration & Profile Modal with 3D Carnet de Soci */}
      <FanProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Floating Notification Toast */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-400 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{copiedNotification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
