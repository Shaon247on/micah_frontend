'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { fetchUserInfo } from '@/actions/auth.actions';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
  companyName?: string;
  companyLogo?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
}

interface UserContextType {
  user: UserInfo | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadUserData = useCallback(async () => {
    try {
      // Only show loading on initial load
      if (isInitialLoad) {
        setIsLoading(true);
      }
      
      const userData = await fetchUserInfo();
      setUser(userData);
      
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const refreshUser = useCallback(async () => {
    // Don't show loading indicator on refresh
    const userData = await fetchUserInfo();
    setUser(userData);
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}