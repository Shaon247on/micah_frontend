"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  companySettingsSchema,
  CompanySettingsInput,
} from "@/schemas/settings.schema";
import { CompanySettings } from "@/types/companySettings";
import {
  updateCompanySettings,
  uploadLogo,
  deleteLogo,
} from "@/actions/companySettings.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from '@/context/UserContext';

interface CompanyInfoFormProps {
  initialData: CompanySettings;
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

export function CompanyInfoForm({
  initialData,
  onSuccess,
}: CompanyInfoFormProps) {
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState(initialData.companyLogo || "");
  const [isDeletingLogo, setIsDeletingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refreshUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CompanySettingsInput>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      companyName: initialData.companyName || "",
      contactEmail: initialData.contactEmail || "",
      contactPhone: initialData.contactPhone || "",
      contactAddress: initialData.contactAddress || "",
      companyLogo: initialData.companyLogo || null,
      companyFavicon: initialData.companyFavicon || null,
      facebookUrl: initialData.facebookUrl || null,
      twitterUrl: initialData.twitterUrl || null,
      instagramUrl: initialData.instagramUrl || null,
      linkedinUrl: initialData.linkedinUrl || null,
    },
  });

  useEffect(() => {
    reset({
      companyName: initialData.companyName || "",
      contactEmail: initialData.contactEmail || "",
      contactPhone: initialData.contactPhone || "",
      contactAddress: initialData.contactAddress || "",
      companyLogo: initialData.companyLogo || null,
      companyFavicon: initialData.companyFavicon || null,
      facebookUrl: initialData.facebookUrl || null,
      twitterUrl: initialData.twitterUrl || null,
      instagramUrl: initialData.instagramUrl || null,
      linkedinUrl: initialData.linkedinUrl || null,
    });
    setLogoPreview(initialData.companyLogo || "");
  }, [initialData, reset]);

  const handleLogoUpload = async (file: File) => {
    // ✅ Check file size (1MB limit)
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
    
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 1MB. Please compress your image and try again.');
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setIsUploadingLogo(true);

    try {
      // Convert file to base64
      const base64Data = await fileToBase64(file);
      
      // Use the server action
      const result = await uploadLogo(base64Data, file.name);

      if (result.status === 'success' && result.logoUrl) {
        setLogoPreview(result.logoUrl);
        setValue('companyLogo', result.logoUrl);
        toast.success('Logo uploaded successfully');
        await refreshUser();
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to upload logo');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload logo');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleDeleteLogo = async () => {
    setIsDeletingLogo(true);
    try {
      const result = await deleteLogo();

      if (result.status === "success") {
        setLogoPreview("");
        setValue("companyLogo", null);
        toast.success("Logo deleted successfully");
        await refreshUser();
        onSuccess();
      } else {
        toast.error(result.message || "Failed to delete logo");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete logo");
    } finally {
      setIsDeletingLogo(false);
    }
  };

  const onSubmit = async (data: CompanySettingsInput) => {
    const cleanedData = {
      companyName: data.companyName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      contactAddress: data.contactAddress,
      companyLogo: logoPreview || null,
      companyFavicon: data.companyFavicon || null,
      facebookUrl: data.facebookUrl || null,
      twitterUrl: data.twitterUrl || null,
      instagramUrl: data.instagramUrl || null,
      linkedinUrl: data.linkedinUrl || null,
    };

    const result = await updateCompanySettings(cleanedData);

    if (result.status === 'success') {
      toast.success('Company settings updated successfully');

      // Refresh user data from API
      await refreshUser();

      onSuccess();
    } else {
      toast.error(result.message || 'Failed to update company settings');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-base font-semibold text-[#121F37]">
          Company Information
        </h2>
      </div>

      <div className="space-y-6 p-6">
        {/* Logo Upload */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
            {logoPreview ? (
              <>
                <Image
                  src={logoPreview}
                  alt="Company Logo"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={handleDeleteLogo}
                  disabled={isDeletingLogo}
                  className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition disabled:opacity-50"
                >
                  {isDeletingLogo ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <X size={12} />
                  )}
                </button>
              </>
            ) : (
              <span className="text-3xl font-bold text-[#E07B3F]">
                {initialData.companyName?.charAt(0) || "CA"}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) await handleLogoUpload(file);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="w-fit gap-2"
              disabled={isUploadingLogo}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploadingLogo ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Upload size={14} />
              )}
              {isUploadingLogo ? "Uploading..." : "Upload Logo"}
            </Button>
            <p className="text-xs text-gray-400">
              Recommended size: 256x256px. Max 1MB. Supported: JPG, PNG, WEBP, SVG
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-[#121F37]">
              Company Name
            </Label>
            <Input
              id="companyName"
              {...register("companyName")}
              placeholder="e.g. CoolAir HVAC Services"
              className={errors.companyName ? "border-red-500" : ""}
            />
            {errors.companyName && (
              <p className="text-xs text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-[#121F37]">
              Contact Email
            </Label>
            <Input
              id="contactEmail"
              type="email"
              {...register("contactEmail")}
              placeholder="contact@example.com"
              className={errors.contactEmail ? "border-red-500" : ""}
            />
            {errors.contactEmail && (
              <p className="text-xs text-red-500">
                {errors.contactEmail.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-[#121F37]">
              Phone Number
            </Label>
            <Input
              id="contactPhone"
              {...register("contactPhone")}
              placeholder="(555) 123-4567"
              className={errors.contactPhone ? "border-red-500" : ""}
            />
            {errors.contactPhone && (
              <p className="text-xs text-red-500">
                {errors.contactPhone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="contactAddress" className="text-[#121F37]">
              Business Address
            </Label>
            <Textarea
              id="contactAddress"
              {...register("contactAddress")}
              placeholder="123 Main Street, City, State, ZIP"
              className={errors.contactAddress ? "border-red-500" : ""}
            />
            {errors.contactAddress && (
              <p className="text-xs text-red-500">
                {errors.contactAddress.message}
              </p>
            )}
          </div>
        </div>

        {/* Hidden inputs for optional URL fields */}
        <input type="hidden" {...register("companyFavicon")} />
        <input type="hidden" {...register("facebookUrl")} />
        <input type="hidden" {...register("twitterUrl")} />
        <input type="hidden" {...register("instagramUrl")} />
        <input type="hidden" {...register("linkedinUrl")} />
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#E07B3F] hover:bg-[#d66b2f]"
        >
          <Save size={18} className="mr-2" />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}