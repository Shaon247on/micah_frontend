'use client';

import Image from 'next/image';
import { useUser } from '@/context/UserContext';

export function CompanyInfo() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {user.companyLogo && (
        <div className="relative w-8 h-8">
          <Image
            src={user.companyLogo}
            alt={user.companyName || 'Company Logo'}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[#121F37]">
          {user.companyName || 'HVAC Service'}
        </span>
        {user.companyPhone && (
          <span className="text-xs text-gray-500">{user.companyPhone}</span>
        )}
      </div>
    </div>
  );
}