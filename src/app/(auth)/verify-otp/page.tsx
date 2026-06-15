import { Metadata } from 'next';
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm';

export const metadata: Metadata = {
  title: 'Verify OTP | HVAC Service',
  description: 'Enter verification code',
};

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#121F37]/5 to-[#E07B3F]/5 p-4">
      <VerifyOtpForm />
    </div>
  );
}