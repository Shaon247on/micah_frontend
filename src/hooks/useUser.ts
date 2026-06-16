'use client';

import { useState, useEffect, useCallback } from 'react';

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

export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const getUserFromCookie = useCallback(() => {
    try {
      const cookies = document.cookie.split(';');
      let userInfoCookie = null;
      
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user_info') {
          userInfoCookie = decodeURIComponent(value);
          break;
        }
      }
      
      if (userInfoCookie) {
        const userData = JSON.parse(userInfoCookie);
        console.log('User data from cookie:', userData); // Debug log
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserFromCookie();
  }, [getUserFromCookie, refreshKey]);

  const refreshUser = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return { user, isLoading, refreshUser };
}