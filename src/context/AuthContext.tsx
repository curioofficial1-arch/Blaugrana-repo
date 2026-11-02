import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../types';

interface RegisterData {
  displayName: string;
  penya: string;
  favoritePlayer: string;
  membershipTier: 'Soci' | 'Culers Premium' | 'Fan Culer';
  country: string;
  bio?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  registerSupporter: (data: RegisterData) => Promise<void>;
  updateSupporterProfile: (data: Partial<RegisterData>) => Promise<void>;
  logout: () => Promise<void>;
  demoSignIn: (data: RegisterData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'barca_fan_profile_backup';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load existing profile from Firestore
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const docRef = doc(db, 'users', uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
      }
      return null;
    } catch (err) {
      console.warn('Could not fetch user profile from Firestore:', err);
      // Fallback to local storage if network or permissions fail temporarily
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore parse error
        }
      }
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfile = await fetchUserProfile(currentUser.uid);
        if (userProfile) {
          setProfile(userProfile);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProfile));
        } else {
          // Check if local storage has a profile we can link
          const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              setProfile({ ...parsed, id: currentUser.uid });
            } catch {
              setProfile(null);
            }
          } else {
            setProfile(null);
          }
        }
      } else {
        // If no firebase auth, check local backup for guest
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          try {
            setProfile(JSON.parse(saved));
          } catch {
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const generateMembershipNumber = (tier: string): string => {
    const prefix = tier === 'Soci' ? 'SOC' : tier === 'Culers Premium' ? 'PREM' : 'CUL';
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-1899-${randomDigits}`;
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const existingProfile = await fetchUserProfile(res.user.uid);
      if (!existingProfile) {
        // Create initial default profile for new Google user
        const newProfile: UserProfile = {
          id: res.user.uid,
          displayName: res.user.displayName || 'Culer Supporter',
          penya: 'Independent Global Culer',
          favoritePlayer: 'Lamine Yamal',
          membershipTier: 'Culers Premium',
          membershipNumber: generateMembershipNumber('Culers Premium'),
          country: 'Global',
          avatarUrl: res.user.photoURL || '',
          loyaltyPoints: 250,
          badges: ['Soci d’Honor', 'Tot el Camp és un Clam'],
        };

        try {
          await setDoc(doc(db, 'users', res.user.uid), {
            ...newProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (dbErr) {
          console.warn('Firestore write warning:', dbErr);
        }

        setProfile(newProfile);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const code = (err as { code: string }).code;
        if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
          // User intentionally closed or cancelled the popup dialog.
          // Silently return without logging console errors.
          return;
        }
        if (code === 'auth/popup-blocked') {
          setError('Sign-in popup was blocked by your browser. Please allow popups or register directly below.');
          return;
        }
      }
      console.warn('Google sign-in attempt notice:', err);
      setError(err instanceof Error ? err.message : 'Sign-in failed. Please try again or register directly below.');
    }
  };

  const registerSupporter = async (data: RegisterData) => {
    setError(null);
    try {
      let uid = user?.uid;

      // If user isn't authenticated with Firebase yet, create anonymous session
      if (!uid) {
        try {
          const anon = await signInAnonymously(auth);
          uid = anon.user.uid;
        } catch {
          uid = 'culer-' + Math.random().toString(36).substring(2, 9);
        }
      }

      const initialBadges = ['Tot el Camp és un Clam'];
      if (data.membershipTier === 'Soci') {
        initialBadges.push('Soci d’Honor');
      } else {
        initialBadges.push('La Masia Believer');
      }
      if (data.penya && !data.penya.includes('Independent')) {
        initialBadges.push('Penya Ambassador');
      }

      const newProfile: UserProfile = {
        id: uid,
        displayName: data.displayName,
        penya: data.penya,
        favoritePlayer: data.favoritePlayer,
        membershipTier: data.membershipTier,
        membershipNumber: generateMembershipNumber(data.membershipTier),
        country: data.country,
        bio: data.bio || 'Proud Culer supporting FC Barcelona through every battle.',
        avatarUrl: data.avatarUrl || '',
        loyaltyPoints: data.membershipTier === 'Soci' ? 500 : data.membershipTier === 'Culers Premium' ? 300 : 100,
        badges: initialBadges,
      };

      try {
        await setDoc(doc(db, 'users', uid), {
          ...newProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (dbErr) {
        console.warn('Firestore write error, saving locally:', dbErr);
      }

      setProfile(newProfile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
    } catch (err: unknown) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed.');
      throw err;
    }
  };

  const updateSupporterProfile = async (data: Partial<RegisterData>) => {
    if (!profile) return;
    setError(null);
    try {
      const updated: UserProfile = {
        ...profile,
        ...(data.displayName ? { displayName: data.displayName } : {}),
        ...(data.penya ? { penya: data.penya } : {}),
        ...(data.favoritePlayer ? { favoritePlayer: data.favoritePlayer } : {}),
        ...(data.country ? { country: data.country } : {}),
        ...(data.bio !== undefined ? { bio: data.bio } : {}),
        ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
        ...(data.membershipTier ? { membershipTier: data.membershipTier } : {}),
      };

      if (user?.uid) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            ...updated,
            updatedAt: serverTimestamp(),
          });
        } catch (dbErr) {
          console.warn('Firestore update warning, updated local state:', dbErr);
        }
      }

      setProfile(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err: unknown) {
      console.error('Update profile error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile.');
      throw err;
    }
  };

  const demoSignIn = (data: RegisterData) => {
    const dummyUid = 'culer-' + Math.random().toString(36).substring(2, 9);
    const dummyProfile: UserProfile = {
      id: dummyUid,
      displayName: data.displayName,
      penya: data.penya,
      favoritePlayer: data.favoritePlayer,
      membershipTier: data.membershipTier,
      membershipNumber: generateMembershipNumber(data.membershipTier),
      country: data.country,
      bio: data.bio || 'Proud Culer member.',
      avatarUrl: data.avatarUrl || '',
      loyaltyPoints: 350,
      badges: ['Soci d’Honor', 'El Clásico Conqueror', 'La Masia Believer'],
    };
    setProfile(dummyProfile);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dummyProfile));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfile(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signInWithGoogle,
        registerSupporter,
        updateSupporterProfile,
        logout,
        demoSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
