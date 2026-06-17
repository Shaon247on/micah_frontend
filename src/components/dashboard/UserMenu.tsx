'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, User, Settings, Building2 } from 'lucide-react';
import { logout } from '@/actions/auth.actions';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserMenu() {
  const router = useRouter();
  const { user, isLoading, refreshUser } = useUser();

  // Refresh user data when component mounts
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    router.refresh();
  };

  const getInitials = () => {
    return user?.name?.charAt(0).toUpperCase() || 'U';
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="hidden md:block">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-1" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || ''} alt={user.name} />
            <AvatarFallback className="bg-[#E07B3F]/10 text-[#E07B3F]">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-gray-500">{user.email}</p>
            <p className="text-xs leading-none text-[#E07B3F] mt-1 capitalize">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        {user.role === 'SUPER_ADMIN' && (
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Company Settings</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}