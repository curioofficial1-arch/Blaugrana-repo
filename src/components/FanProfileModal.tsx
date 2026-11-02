import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DigitalMembershipCard } from './DigitalMembershipCard';
import { OFFICIAL_PENYES, SQUAD_PLAYERS, AVAILABLE_BADGES } from '../data/barcaData';
import { UserCheck, Shield, Award, Edit3, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

interface FanProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FanProfileModal: React.FC<FanProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, signInWithGoogle, registerSupporter, updateSupporterProfile, logout, error } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [penya, setPenya] = useState(profile?.penya || OFFICIAL_PENYES[0]);
  const [favoritePlayer, setFavoritePlayer] = useState(profile?.favoritePlayer || SQUAD_PLAYERS[0].name);
  const [membershipTier, setMembershipTier] = useState<'Soci' | 'Culers Premium' | 'Fan Culer'>(profile?.membershipTier || 'Culers Premium');
  const [country, setCountry] = useState(profile?.country || 'Spain');
  const [bio, setBio] = useState(profile?.bio || 'Passionate Culer supporting FC Barcelona across every matchday.');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setFormError(null);
    setGoogleSigningIn(true);
    try {
      await signInWithGoogle();
    } finally {
      setGoogleSigningIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setFormError('Please enter your supporter name or alias.');
      return;
    }
    setFormError(null);
    setSubmitting(true);
    try {
      await registerSupporter({
        displayName: displayName.trim(),
        penya,
        favoritePlayer,
        membershipTier,
        country: country.trim() || 'Global',
        bio: bio.trim(),
      });
      setIsEditing(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await updateSupporterProfile({
        displayName: displayName.trim(),
        penya,
        favoritePlayer,
        membershipTier,
        country: country.trim(),
        bio: bio.trim(),
      });
      setIsEditing(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Update failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1 text-lg"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* PROFILE EXISTS: Display Digital Card & Details */}
        {profile && !isEditing ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Official Culers Profile
                </span>
                <h2 className="mt-0.5 font-athletic text-3xl font-extrabold uppercase text-white">
                  {profile.displayName}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDisplayName(profile.displayName);
                    setPenya(profile.penya);
                    setFavoritePlayer(profile.favoritePlayer);
                    setMembershipTier(profile.membershipTier);
                    setCountry(profile.country);
                    setBio(profile.bio || '');
                    setIsEditing(true);
                  }}
                  className="cursor-pointer px-3 py-1.5 text-xs font-semibold uppercase font-athletic text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-sm flex items-center gap-1.5 border border-slate-700"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={logout}
                  className="cursor-pointer px-3 py-1.5 text-xs font-semibold uppercase font-athletic text-red-400 bg-red-950/30 hover:bg-red-950/50 rounded-sm flex items-center gap-1.5 border border-red-900/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* 3D Digital Membership Pass */}
            <div className="my-6">
              <DigitalMembershipCard profile={profile} />
            </div>

            {/* Supporter Badges */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Unlocked Supporter Badges ({profile.badges.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {profile.badges.map((badgeName, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <strong className="text-white font-medium">{badgeName}</strong>
                      <div className="text-[10px] text-slate-400">Verified Culer credential</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Bio */}
            {profile.bio && (
              <div className="mt-5 p-4 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 block uppercase font-mono text-[10px] mb-1">Supporter Bio</span>
                {profile.bio}
              </div>
            )}
          </div>
        ) : (
          /* REGISTRATION OR EDIT FORM */
          <div>
            <div className="pb-4 border-b border-slate-800">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {profile ? 'Edit Supporter Profile' : 'Step 2: Supporter Registration'}
              </span>
              <h2 className="mt-0.5 font-athletic text-3xl font-extrabold uppercase text-white">
                {profile ? 'Update Your Culer Credentials' : 'Join the Global Barça Community'}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {profile
                  ? 'Update your official club affiliation, favorite star, or personal bio.'
                  : 'Register your official Carnet de Culer digital pass with persistent cloud database backup.'}
              </p>
            </div>

            {/* Quick 1-Click Google Sign-In */}
            {!profile && (
              <div className="my-5 p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-white">Instant Sign-In with Google</div>
                    <div className="text-[11px] text-slate-400">Sync with your real Google account via Firebase</div>
                  </div>
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={googleSigningIn}
                    className="cursor-pointer px-4 py-2 rounded-sm text-xs font-semibold uppercase font-athletic tracking-wider text-slate-950 bg-white hover:bg-slate-200 transition-colors shrink-0 flex items-center gap-2 justify-center shadow-xs disabled:opacity-60"
                  >
                    <span>{googleSigningIn ? 'Opening Google Sign-In...' : 'Continue with Google'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Or Register / Update Details Form */}
            <form onSubmit={profile ? handleUpdate : handleRegister} className="space-y-4 mt-5">
              {(formError || error) && (
                <div className="p-3 rounded-md bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError || error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Supporter Name or Alias *
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Marc Vila or CulersUSA"
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-md bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Membership Tier Radio / Cards */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Membership Tier *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['Soci', 'Culers Premium', 'Fan Culer'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setMembershipTier(tier)}
                      className={`cursor-pointer p-3 rounded-md border text-left transition-all ${
                        membershipTier === tier
                          ? 'border-amber-400 bg-amber-500/10'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-athletic text-base font-bold uppercase text-white">
                        {tier}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {tier === 'Soci'
                          ? 'Official club voting owner'
                          : tier === 'Culers Premium'
                          ? 'Official international pass'
                          : 'Global digital supporter'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Official Penyes Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Official Supporters Club (Penya)
                  </label>
                  <select
                    value={penya}
                    onChange={(e) => setPenya(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    {OFFICIAL_PENYES.map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Favorite Player Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Favorite Barça Star
                  </label>
                  <select
                    value={favoritePlayer}
                    onChange={(e) => setFavoritePlayer(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    {SQUAD_PLAYERS.map((player) => (
                      <option key={player.id} value={player.name}>
                        #{player.number} {player.name} ({player.position})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Country / Region
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Catalonia, United States, Japan, Brazil..."
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-md bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Supporter Bio (Optional)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  maxLength={280}
                  placeholder="Share your passion for FC Barcelona..."
                  className="w-full px-3.5 py-2.5 rounded-md bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                {profile && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="cursor-pointer px-4 py-2 text-xs font-semibold uppercase font-athletic text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer px-6 py-2.5 text-xs font-bold uppercase font-athletic tracking-wider text-white bg-gradient-to-r from-[#004D98] via-[#850338] to-[#A50044] hover:brightness-110 active:scale-98 rounded-md transition-all shadow-md disabled:opacity-50"
                >
                  {submitting
                    ? 'Saving to Database...'
                    : profile
                    ? 'Save Changes'
                    : 'Issue Digital Carnet & Register'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
