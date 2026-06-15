'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { resetPassword } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if OTP was verified and get reset token
    const isOtpVerified = sessionStorage.getItem('otp_verified');
    const token = sessionStorage.getItem('reset_token');
    
    console.log('Reset token from sessionStorage:', token);
    console.log('OTP verified:', isOtpVerified);
    
    if (!isOtpVerified || !token) {
      router.push('/forgot-password');
    }
    
    setResetToken(token);
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetToken) {
      setError('Session expired. Please request a new password reset.');
      return;
    }
    
    console.log('Resetting password with token:', resetToken);
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    const result = await resetPassword({
      resetToken: resetToken,
      newPassword: data.newPassword,
    });
    
    console.log('Reset password result:', result);
    
    if (result.success) {
      setSuccess(result.message);
      // Clear session storage
      sessionStorage.removeItem('reset_email');
      sessionStorage.removeItem('otp_verified');
      sessionStorage.removeItem('reset_token');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login?reset=success');
      }, 2000);
    } else {
      setError(result.error || 'Failed to reset password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    if (strength === 4) return 'Strong';
    if (strength === 3) return 'Good';
    if (strength >= 2) return 'Weak';
    return 'Very Weak';
  };

  const getPasswordStrengthColor = (password: string) => {
    const strength = getPasswordStrength(password);
    if (strength === 'Strong') return 'text-green-600';
    if (strength === 'Good') return 'text-blue-600';
    if (strength === 'Weak') return 'text-yellow-600';
    return 'text-red-600';
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
            <Lock className="w-8 h-8 text-[#E07B3F]" />
          </div>
          <h1 className="text-3xl font-bold text-[#121F37]">Reset Password</h1>
          <p className="text-[#6B6B6B] mt-2">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="newPassword" className="text-[#121F37] font-semibold">
              New Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                className="pr-10"
                {...register('newPassword')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
            {newPassword && (
              <p className={`text-xs mt-1 ${getPasswordStrengthColor(newPassword)}`}>
                Password Strength: {getPasswordStrength(newPassword)}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-[#121F37] font-semibold">
              Confirm Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••"
                className="pr-10"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Password Requirements:</strong>
            </p>
            <ul className="text-xs text-blue-700 mt-2 space-y-1">
              <li>• At least 6 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E07B3F] hover:bg-[#d66b2f] text-white font-semibold py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resetting Password...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Lock size={18} />
                Reset Password
              </div>
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#E07B3F] transition-colors"
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