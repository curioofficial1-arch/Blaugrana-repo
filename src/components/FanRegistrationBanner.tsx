import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Sparkles, Award, ArrowRight, UserCheck } from 'lucide-react';

interface FanRegistrationBannerProps {
  onOpenProfile: () => void;
}

export const FanRegistrationBanner: React.FC<FanRegistrationBannerProps> = ({ onOpenProfile }) => {
  const { profile } = useAuth();

  return (
    <section className="bg-slate-900/60 border-b border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#004D98]/40 via-slate-900 to-[#A50044]/40 border border-slate-800 p-6 sm:p-8 overflow-hidden">
          {/* Subtle Catalan accent stripe */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-xs bg-amber-400" />
                <span>Feature #2 Active · Real Firebase Data & Auth</span>
              </div>

              <h2 className="font-athletic text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                {profile
                  ? `Welcome, ${profile.displayName} · ${profile.membershipTier} Member`
                  : 'Claim Your Official Carnet de Culer Digital Pass'}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profile
                  ? `Your official pass #${profile.membershipNumber} is active with ${profile.loyaltyPoints} points. Affiliated with ${profile.penya}.`
                  : 'Create your authenticated supporter profile, link with an official worldwide Penya club, choose your idol, and generate your 3D digital pass stored in real cloud database.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenProfile}
                className="cursor-pointer px-6 py-3 text-xs font-bold font-athletic uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all rounded-md shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                <UserCheck className="w-4 h-4" />
                <span>{profile ? 'Inspect My Digital Carnet' : 'Register Digital Carnet Pass'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
