"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload, X, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  profileSettingsSchema,
  passwordChangeSchema,
  ProfileSettingsInput,
  PasswordChangeInput,
} from "@/schemas/settings.schema";
import {
  updateProfile,
  updatePassword,
  uploadAvatar,
  deleteAvatar,
} from "@/actions/profile.actions";
import { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from '@/context/UserContext';

interface ProfileSettingsFormProps {
  initialData: Profile;
  onSuccess: () => void;
}

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function ProfileSettingsForm({
  initialData,
  onSuccess,
}: ProfileSettingsFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatar || "");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
const { refreshUser } = useUser();
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    setValue: setProfileValue,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileSettingsInput>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      avatar: initialData.avatar || null,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    resetProfile({
      name: initialData.name || "",
      email: initialData.email || "",
      avatar: initialData.avatar || null,
    });
    setAvatarPreview(initialData.avatar || "");
  }, [initialData, resetProfile]);

const onProfileSubmit = async (data: ProfileSettingsInput) => {
    
    
    try {
      const result = await updateProfile({
        name: data.name,
        email: data.email,
        avatar: avatarPreview || null,
      });
      
      if (result.status === 'success') {
        toast.success('Profile updated successfully');
        
        // Refresh user data from API
        await refreshUser();
        
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setIsUploadingAvatar(true);

    try {
      const base64Data = await fileToBase64(file);
      const result = await uploadAvatar(base64Data, file.name);
      
      if (result.status === 'success' && result.avatarUrl) {
        setAvatarPreview(result.avatarUrl);
        setProfileValue('avatar', result.avatarUrl);
        toast.success('Avatar uploaded successfully');
        
        // Refresh user data from API
        await refreshUser();
        
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to upload avatar');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload avatar');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setIsDeletingAvatar(true);
    try {
      const result = await deleteAvatar();
      
      if (result.status === 'success') {
        setAvatarPreview('');
        setProfileValue('avatar', null);
        toast.success('Avatar deleted successfully');
        
        // Refresh user data from API
        await refreshUser();
        
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to delete avatar');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete avatar');
    } finally {
      setIsDeletingAvatar(false);
    }
  };



  const onPasswordSubmit = async (data: PasswordChangeInput) => {
    const result = await updatePassword(data);
    if (result.status === "success") {
      toast.success("Password updated successfully");
      resetPassword();
    } else {
      toast.error(result.message || "Failed to update password");
    }
  };

  // Get initials for avatar placeholder
  const getInitials = () => {
    return initialData.name?.charAt(0).toUpperCase() || "U";
  };

  return (
    <div className="w-full flex items-center justify-between ">
      <div className="w-full">
        <h3 className="p-5 text-lg font-medium">Profile Settings</h3>
        <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
          <div className="space-y-6 p-6">
            {/* Avatar Upload */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-lg overflow-hidden">
                {avatarPreview ? (
                  <>
                    <Image
                      src={avatarPreview}
                      alt="Profile Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={handleDeleteAvatar}
                      disabled={isDeletingAvatar}
                      className="absolute top-1 right-1 bg-red-500 rounded-lg p-1 text-white hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {isDeletingAvatar ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <X size={12} />
                      )}
                    </button>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#E07B3F]/20 to-[#E07B3F]/5">
                    <span className="text-3xl font-bold text-[#E07B3F]">
                      {getInitials()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) await handleAvatarUpload(file);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit gap-2"
                  disabled={isUploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploadingAvatar ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  {isUploadingAvatar ? "Uploading..." : "Upload Avatar"}
                </Button>
                <p className="text-xs text-gray-400">
                  Recommended: Square image, max 2MB. JPG, PNG, or WEBP
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#121F37]">
                Full Name
              </Label>
              <Input
                id="name"
                {...registerProfile("name")}
                placeholder="John Doe"
                className={profileErrors.name ? "border-red-500" : ""}
              />
              {profileErrors.name && (
                <p className="text-xs text-red-500">
                  {profileErrors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#121F37]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                disabled
                {...registerProfile("email")}
                placeholder="admin@example.com"
                className={profileErrors.email ? "border-red-500" : ""}
              />
              {profileErrors.email && (
                <p className="text-xs text-red-500">
                  {profileErrors.email.message}
                </p>
              )}
            </div>

            {/* Role (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-[#121F37]">
                Role
              </Label>
              <Input
                id="role"
                value={initialData.role || ""}
                disabled
                className=" text-gray-500"
              />
              <p className="text-xs text-gray-400">Role cannot be changed</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-gray-200 px-6 py-4  rounded-b-xl">
            <Button
              type="button"
              variant="outline"
              onClick={() => resetProfile()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProfileSubmitting}
              className="bg-[#E07B3F] hover:bg-[#d66b2f]"
            >
              <Save size={18} className="mr-2" />
              {isProfileSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full">
        <h3 className="p-5 text-lg font-medium">Profile Security</h3>

        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          <div className="space-y-6 p-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-[#121F37]">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword")}
                  placeholder="Enter current password"
                  className={
                    passwordErrors.currentPassword
                      ? "border-red-500 pr-10"
                      : "pr-10"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-xs text-red-500">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-[#121F37]">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...registerPassword("newPassword")}
                  placeholder="Enter new password"
                  className={
                    passwordErrors.newPassword
                      ? "border-red-500 pr-10"
                      : "pr-10"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-500">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#121F37]">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...registerPassword("confirmPassword")}
                  placeholder="Confirm new password"
                  className={
                    passwordErrors.confirmPassword
                      ? "border-red-500 pr-10"
                      : "pr-10"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-800">
                Password Requirements:
              </p>
              <ul className="text-xs text-blue-700 mt-2 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-gray-200 px-6 py-4  rounded-b-xl">
            <Button
              type="button"
              variant="outline"
              onClick={() => resetPassword()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPasswordSubmitting}
              className="bg-[#E07B3F] hover:bg-[#d66b2f]"
            >
              <Save size={18} className="mr-2" />
              {isPasswordSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
