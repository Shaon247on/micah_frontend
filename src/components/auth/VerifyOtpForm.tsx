'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { verifyOtpSchema, VerifyOtpFormData } from '@/schemas/auth.schema';
import { verifyOtp, forgotPassword } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, KeyRound, RefreshCw } from 'lucide-react';

export function VerifyOtpForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem('reset_email');
    console.log('Stored email from session:', storedEmail);
    
    if (storedEmail) {
      setEmail(storedEmail);
      setValue('email', storedEmail);
    } else {
      router.push('/forgot-password');
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, setValue]);

  const onSubmit = async (data: VerifyOtpFormData) => {
    console.log("Submitting OTP verification:", data);
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await verifyOtp(data);
      console.log("Verify OTP result:", result);
      
      if (result.success) {
        // Store the reset token in sessionStorage
        if (result.resetToken) {
          sessionStorage.setItem('reset_token', result.resetToken);
          console.log('Reset token stored:', result.resetToken);
        }
        sessionStorage.setItem('otp_verified', 'true');
        router.push('/reset-password');
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Email not found. Please go back and try again.');
      return;
    }
    
    setIsResending(true);
    setError(null);
    
    try {
      const result = await forgotPassword({ email });
      console.log('Resend OTP result:', result);
      
      if (result.success) {
        setTimeLeft(300);
        // Reset timer
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        successDiv.textContent = 'New OTP sent successfully!';
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
      } else {
        setError(result.error || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      console.error('Resend error:', err);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <KeyRound className="w-8 h-8 text-[#E07B3F]" />
          </div>
          <h1 className="text-3xl font-bold text-[#121F37]">Verify OTP</h1>
          <p className="text-[#6B6B6B] mt-2">
            Enter the verification code sent to <strong className="text-[#121F37]">{email}</strong>
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register('email')} />
          
          <div>
            <Label htmlFor="otp" className="text-[#121F37] font-semibold">
              Verification Code
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              className="mt-1 text-center text-2xl tracking-widest"
              maxLength={6}
              autoComplete="off"
              {...register('otp')}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-[#6B6B6B]">
              Time remaining: <span className="font-semibold text-[#E07B3F]">{formatTime(timeLeft)}</span>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || timeLeft === 0}
            className="w-full bg-[#E07B3F] hover:bg-[#d66b2f] text-white font-semibold py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <KeyRound size={18} />
                Verify OTP
              </div>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending || timeLeft > 0}
              className="inline-flex items-center gap-2 text-sm text-[#E07B3F] hover:text-[#d66b2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={14} className={isResending ? 'animate-spin' : ''} />
              {isResending ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#E07B3F] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}