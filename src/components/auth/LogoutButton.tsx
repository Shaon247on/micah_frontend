'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      // Force hard navigation to clear all state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    }
  };
  
  return (
    <Button onClick={handleLogout} variant="outline" size={"icon"} className="gap-2 border-none">
      <LogOut size={16} />
    </Button>
  );
}