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
    // ✅ Allow refresh even if load was attempted
    if (!showLoading) {
      // Force refresh - reset loadAttempted
      loadAttempted.current = false;
    }
    
    // Prevent multiple simultaneous loads
    if (loadAttempted.current && !showLoading) {
      return;
    }
    
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      
      loadAttempted.current = true;
      
      // ✅ Always try to get user from API first for fresh data
      let userData = await fetchUserInfo();
      
      // If API fails, try to get from cookie
      if (!userData || !userData.id) {
        userData = await getCurrentUser();
      }
      
      if (isMounted.current) {
        console.log("✅ User data loaded:", userData?.name);
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

  // ✅ Refresh user data - always fetches fresh from API
  const refreshUser = useCallback(async () => {
    console.log("🔄 Refreshing user data...");
    // Force fetch from API and update state
    setIsLoading(true);
    try {
      const userData = await fetchUserInfo();
      if (isMounted.current) {
        console.log("✅ User data refreshed:", userData?.name);
        setUser(userData);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      if (isMounted.current) {
        setUser(null);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}