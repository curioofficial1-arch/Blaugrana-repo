import React, { useState } from 'react';
import { Shield, Sparkles, QrCode, RotateCw, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface DigitalMembershipCardProps {
  profile: UserProfile;
}

export const DigitalMembershipCard: React.FC<DigitalMembershipCardProps> = ({ profile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isSoci = profile.membershipTier === 'Soci';
  const isPremium = profile.membershipTier === 'Culers Premium';

  return (
    <div className="relative select-none max-w-md w-full mx-auto [perspective:1000px]">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`cursor-pointer transition-all duration-700 [transform-style:preserve-3d] relative h-64 sm:h-72 w-full rounded-2xl shadow-2xl border border-white/20 ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT OF THE MEMBERSHIP CARD */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl p-6 flex flex-col justify-between overflow-hidden ${
            isSoci
              ? 'bg-gradient-to-br from-[#0B1528] via-[#004D98] to-[#600228]'
              : isPremium
              ? 'bg-gradient-to-br from-[#121929] via-[#003870] to-[#800336]'
              : 'bg-gradient-to-br from-slate-900 via-slate-800 to-[#004D98]/60'
          }`}
        >
          {/* Catalan Senyera Gold/Red Accent Top Stripe */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

          {/* Card Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-950/80 border border-amber-400/80 p-1 flex items-center justify-center shadow-md">
                <span className="font-athletic font-extrabold text-sm text-amber-300">FCB</span>
              </div>
              <div>
                <div className="font-athletic text-lg font-black tracking-wider text-white uppercase leading-none">
                  FC BARCELONA
                </div>
                <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase mt-0.5">
                  {profile.membershipTier === 'Soci' ? 'CARNET DE SOCI OFICIAL' : 'CARNET CULERS PASS'}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-300 block">Season</span>
              <span className="font-athletic text-sm font-bold text-amber-300">2024 / 2026</span>
            </div>
          </div>

          {/* Card Middle: Supporter Info & Avatar */}
          <div className="flex items-center gap-4 my-auto">
            <div className="w-16 h-16 rounded-xl bg-slate-950 border-2 border-amber-400/80 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#004D98] to-[#A50044] flex items-center justify-center font-athletic font-extrabold text-2xl text-white">
                  {profile.displayName.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <div className="font-athletic text-2xl font-bold uppercase text-white truncate leading-tight">
                {profile.displayName}
              </div>
              <div className="text-xs text-amber-300 font-medium truncate mt-0.5">
                {profile.penya}
              </div>
              <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-2">
                <span>Idol: <strong className="text-white">{profile.favoritePlayer}</strong></span>
                <span className="text-slate-500">·</span>
                <span>{profile.country}</span>
              </div>
            </div>
          </div>

          {/* Card Bottom: Barcode & Pass ID */}
          <div className="pt-2 border-t border-white/10 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-300 uppercase">Membership Pass ID</div>
              <div className="font-mono text-sm font-bold text-white tracking-widest">
                {profile.membershipNumber}
              </div>
            </div>

            {/* Simulated Micro Barcode */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 h-6 bg-white/90 px-2 py-0.5 rounded-xs">
                {[4, 2, 6, 2, 8, 4, 2, 7, 3, 5, 2, 8, 3].map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 h-full"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <RotateCw className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* BACK OF THE MEMBERSHIP CARD */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B1528] p-6 flex flex-col justify-between border border-slate-700">
          {/* Magnetic Stripe */}
          <div className="absolute top-6 inset-x-0 h-10 bg-slate-950 border-y border-slate-800" />

          <div className="mt-14 flex items-center justify-between text-xs text-slate-400">
            <div>
              <div className="font-mono text-[10px] text-slate-500 uppercase">Authorized Signature</div>
              <div className="font-serif italic text-base text-slate-200 mt-0.5">
                {profile.displayName}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-slate-500 uppercase">Security Code</div>
              <div className="font-mono text-xs text-amber-400 font-bold">1899-CAT</div>
            </div>
          </div>

          {/* Club Headquarters Information */}
          <div className="text-[10px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300 uppercase tracking-wider font-athletic text-xs">
              Futbol Club Barcelona · Official Supporter Credential
            </p>
            <p>
              Carrer d'Arístides Maillol, s/n, 08028 Barcelona, Catalonia.
            </p>
            <p className="text-amber-400 font-medium">
              "Tots units fem força. Més que un club."
            </p>
          </div>

          {/* Hologram & Footer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Loyalty Points: <strong className="text-white font-mono">{profile.loyaltyPoints}</strong></span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Tap card to flip</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-2 text-xs text-slate-400">
        Click or tap card to flip & inspect membership security details
      </div>
    </div>
  );
};
