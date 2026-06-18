'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { getCompanySettings } from '@/actions/companySettings.actions';

export interface CompanyInfo {
  companyName: string;
  companyLogo: string | null;
  companyFavicon: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  businessHours: any | null;
}

interface CompanyContextType {
  company: CompanyInfo | null;
  isLoading: boolean;
  refreshCompany: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = React.useRef(true);

  const loadCompanyData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getCompanySettings();
      
      if (isMounted.current && result.status === 'success') {
        setCompany(result.data);
      } else if (isMounted.current) {
        // Set default company info if API fails
        setCompany({
          companyName: 'HVAC Service',
          companyLogo: null,
          companyFavicon: null,
          contactEmail: 'contact@hvacservices.com',
          contactPhone: '(555) 123-4567',
          contactAddress: '123 Main Street, Joliet, IL 60401',
          facebookUrl: null,
          twitterUrl: null,
          instagramUrl: null,
          linkedinUrl: null,
          businessHours: null,
        });
      }
    } catch (error) {
      console.error('Error loading company data:', error);
      if (isMounted.current) {
        // Set default company info on error
        setCompany({
          companyName: 'HVAC Service',
          companyLogo: null,
          companyFavicon: null,
          contactEmail: 'contact@hvacservices.com',
          contactPhone: '(555) 123-4567',
          contactAddress: '123 Main Street, Joliet, IL 60401',
          facebookUrl: null,
          twitterUrl: null,
          instagramUrl: null,
          linkedinUrl: null,
          businessHours: null,
        });
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadCompanyData();
    
    return () => {
      isMounted.current = false;
    };
  }, [loadCompanyData]);

  const refreshCompany = useCallback(async () => {
    await loadCompanyData();
  }, [loadCompanyData]);

  return (
    <CompanyContext.Provider value={{ company, isLoading, refreshCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}