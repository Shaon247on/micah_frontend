import { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | HVAC Service',
  description: 'Create new password',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#121F37]/5 to-[#E07B3F]/5 p-4">
      <ResetPasswordForm />
    </div>
  );
}