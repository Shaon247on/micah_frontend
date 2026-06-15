'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/schemas/auth.schema';
import { forgotPassword } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, Send } from 'lucide-react';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    const result = await forgotPassword(data);
    
    if (result.success) {
      setSuccess(result.message);
      // Store email for OTP verification
      sessionStorage.setItem('reset_email', data.email);
      // Redirect to OTP page after 2 seconds
      setTimeout(() => {
        router.push('/verify-otp');
      }, 2000);
    } else {
      setError(result.error || 'Failed to send OTP. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E07B3F]/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-[#E07B3F]" />
          </div>
          <h1 className="text-3xl font-bold text-[#121F37]">Forgot Password?</h1>
          <p className="text-[#6B6B6B] mt-2">
            Enter your email address and we&apos;ll send you a verification code
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-[#121F37] font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@hvacservices.com"
              className="mt-1"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E07B3F] hover:bg-[#d66b2f] text-white font-semibold py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending OTP...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send size={18} />
                Send Verification Code
              </div>
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#E07B3F] hover:text-[#d66b2f] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}