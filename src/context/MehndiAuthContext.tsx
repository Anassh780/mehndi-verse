import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, UserRole } from '@/types/mehndi';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isArtist: boolean;
  isCustomer: boolean;
  loginAsCustomer: () => void;
  loginAsArtist: () => void;
  loginWithEmail: (email: string, role: UserRole) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<AuthUser>) => void;
}

const DEMO_CUSTOMER: AuthUser = {
  id: 'cust-demo-1',
  name: 'Suhana Patel',
  email: 'suhana.patel@luxuryweddings.com',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  phone: '+1 (555) 234-5678',
  location: 'Dubai / London',
  savedArtistIds: ['artist-ayesha-khan', 'artist-priya-sharma'],
  createdAt: '2026-01-15',
};

const DEMO_ARTIST: AuthUser = {
  id: 'artist-user-1',
  name: 'Ayesha Noor Khan',
  email: 'ayesha@ayeshanoorhenna.com',
  role: 'artist',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  phone: '+971 50 123 4567',
  location: 'Downtown Dubai, UAE',
  artistProfileId: 'artist-ayesha-khan',
  createdAt: '2025-05-10',
};

const MehndiAuthContext = createContext<AuthContextType | undefined>(undefined);

export const MehndiAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('hennaluxe_auth_user');
      return saved ? JSON.parse(saved) : DEMO_CUSTOMER;
    } catch {
      return DEMO_CUSTOMER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('hennaluxe_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hennaluxe_auth_user');
    }
  }, [user]);

  const loginAsCustomer = () => {
    setUser(DEMO_CUSTOMER);
  };

  const loginAsArtist = () => {
    setUser(DEMO_ARTIST);
  };

  const loginWithEmail = (email: string, role: UserRole) => {
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role,
      avatar: role === 'artist' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString(),
      artistProfileId: role === 'artist' ? 'artist-ayesha-khan' : undefined,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<AuthUser>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <MehndiAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isArtist: user?.role === 'artist',
        isCustomer: user?.role === 'customer',
        loginAsCustomer,
        loginAsArtist,
        loginWithEmail,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </MehndiAuthContext.Provider>
  );
};

export const useMehndiAuth = (): AuthContextType => {
  const context = useContext(MehndiAuthContext);
  if (!context) {
    throw new Error('useMehndiAuth must be used within a MehndiAuthProvider');
  }
  return context;
};
