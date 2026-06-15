import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | HVAC Service',
  description: 'Sign in to your HVAC service dashboard',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#121F37]/5 to-[#E07B3F]/5 p-4">
      <LoginForm />
    </div>
  );
}