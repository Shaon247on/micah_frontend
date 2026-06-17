"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { fetchUserInfo, getCurrentUser } from "@/actions/auth.actions";

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
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
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
  const isMounted = useRef(true);
  const loadAttempted = useRef(false);

  const loadUserData = useCallback(async (showLoading: boolean = true) => {
    // Prevent multiple simultaneous loads
    if (loadAttempted.current && !showLoading) {
      return;
    }
    
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      
      loadAttempted.current = true;
      
      // Try to get user from cookie first (faster)
      let userData = await getCurrentUser();
      
      // If not in cookie or incomplete, fetch from API
      if (!userData || !userData.id) {
        userData = await fetchUserInfo();
      }
      
      if (isMounted.current) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      if (isMounted.current) {
        setUser(null);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    // Load user data on mount
    loadUserData(true);
    
    // Cleanup
    return () => {
      isMounted.current = false;
    };
  }, [loadUserData]);

  // Refresh user data (without showing loading)
  const refreshUser = useCallback(async () => {
    loadAttempted.current = false;
    await loadUserData(false);
  }, [loadUserData]);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}