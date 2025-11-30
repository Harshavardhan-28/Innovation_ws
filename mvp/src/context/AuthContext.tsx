/**
 * =============================================================================
 * InternScout AI MVP - Authentication Context
 * =============================================================================
 * 
 * This provides a simple auth context for the MVP using React Context.
 * 
 * 🎓 WORKSHOP NOTE:
 * This is MOCK authentication stored in localStorage. In production:
 * - Use Firebase Auth, NextAuth.js, or Auth0
 * - Store tokens securely (httpOnly cookies)
 * - Implement proper session management
 * - Add OAuth providers (Google, GitHub, LinkedIn)
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentProfile } from '@/types';

interface AuthContextType {
  user: StudentProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<StudentProfile>) => Promise<void>;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  college: string;
  degree: string;
  graduationYear: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedEmail = localStorage.getItem('internscout_user_email');
        if (storedEmail) {
          const response = await fetch(`/api/auth/session?email=${encodeURIComponent(storedEmail)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              setUser(data.user);
            }
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('internscout_user_email', email);
        return { success: true };
      }

      return { success: false, error: data.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('internscout_user_email', data.email);
        return { success: true };
      }

      return { success: false, error: result.error || 'Signup failed' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('internscout_user_email');
  };

  const updateUser = async (updates: Partial<StudentProfile>) => {
    if (!user) return;

    try {
      const response = await fetch('/api/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, updates }),
      });

      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
