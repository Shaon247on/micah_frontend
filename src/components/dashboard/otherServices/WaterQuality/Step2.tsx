"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { PROPERTY_TYPES, Step2Data } from "@/schemas/waterQuality.schema";

export default function Step2({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2Data>;
}) {
  const [fullName, setFullName] = useState(defaultValues?.fullName || "");
  const [phone, setPhone] = useState(defaultValues?.phone || "");
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [address, setAddress] = useState(defaultValues?.address || "");
  const [zipCode, setZipCode] = useState(defaultValues?.zipCode || "");
  const [propertyType, setPropertyType] = useState(
    defaultValues?.propertyType || "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (fullName.trim().length < 2)
      newErrors.fullName = "Name must be at least 2 characters";
    if (phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Please enter a valid phone number";
    if (!email.includes("@") || !email.includes("."))
      newErrors.email = "Please enter a valid email";
    if (address.trim().length < 5)
      newErrors.address = "Please enter your full address";
    if (zipCode.trim().length < 4)
      newErrors.zipCode = "Please enter a valid ZIP code";
    if (!propertyType) newErrors.propertyType = "Please select property type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ fullName, phone, email, address, zipCode, propertyType });
    }
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Full Name <span className="text-[#E07B3F]">*</span>
        </Label>
        <Input
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName)
              setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          className={cn(
            "h-12 rounded-xl border-[#D7DCE5] mt-1",
            errors.fullName && "border-red-500",
          )}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            Phone <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            placeholder="Phone Number"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            className={cn(
              "h-12 rounded-xl border-[#D7DCE5] mt-1",
              errors.phone && "border-red-500",
            )}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            Email <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={cn(
              "h-12 rounded-xl border-[#D7DCE5] mt-1",
              errors.email && "border-red-500",
            )}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Address + ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            Service Address <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            placeholder="Enter your service address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address)
                setErrors((prev) => ({ ...prev, address: "" }));
            }}
            className={cn(
              "h-12 rounded-xl border-[#D7DCE5] mt-1",
              errors.address && "border-red-500",
            )}
          />
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            ZIP Code <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            placeholder="ZIP Code"
            inputMode="numeric"
            maxLength={10}
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
              if (errors.zipCode)
                setErrors((prev) => ({ ...prev, zipCode: "" }));
            }}
            className={cn(
              "h-12 rounded-xl border-[#D7DCE5] mt-1",
              errors.zipCode && "border-red-500",
            )}
          />
          {errors.zipCode && (
            <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
          )}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Property Type <span className="text-[#E07B3F]">*</span>
        </Label>
        <Select
          value={propertyType}
          onValueChange={(v) => {
            setPropertyType(v);
            if (errors.propertyType)
              setErrors((prev) => ({ ...prev, propertyType: "" }));
          }}
        >
          <SelectTrigger
            className={cn(
              "h-12 rounded-xl border-[#D7DCE5] bg-white mt-1",
              errors.propertyType && "border-red-500",
            )}
          >
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.propertyType && (
          <p className="text-xs text-red-500 mt-1">{errors.propertyType}</p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#121F37] transition-colors mt-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      </div>
    </div>
  );
}
