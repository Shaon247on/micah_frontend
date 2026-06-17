"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  contactInfoSchema,
  dateTimeSchema,
  TIME_SLOTS,
  formatPhone,
  type RepairReplaceStep2,
  type RepairReplaceStep3,
} from "@/types/services.type";
import { FieldLabel, NextBtn, BackLink } from "./ServiceFormShell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SERVICE_TYPES = ["RESIDENTIAL", "COMMERCIAL", "BOTH"];

// ─── Shared Contact Form ──────────────────────────────────────────────────────

interface ContactStepProps {
  defaultValues?: Partial<RepairReplaceStep2>;
  onNext: (v: RepairReplaceStep2) => void;
  onBack: () => void;
}

export function SharedContactStep({
  defaultValues,
  onNext,
  onBack,
}: ContactStepProps) {
  const form = useForm<RepairReplaceStep2>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      zipCode: "",
      serviceType: "RESIDENTIAL",
      ...defaultValues,
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FieldLabel required>Full Name</FieldLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  className="h-12 rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FieldLabel required>Phone</FieldLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    inputMode="numeric"
                    className="h-12 rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F]"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(formatPhone(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FieldLabel required>Email</FieldLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    className="h-12 rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address + ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel required>Service Address</FieldLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your service address"
                      className="h-12 rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FieldLabel required>Property Type</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-12 rounded-xl border-[#D7DCE5] bg-white">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FieldLabel required>ZIP Code</FieldLabel>
                <FormControl>
                  <Input
                    placeholder="ZIP Code"
                    inputMode="numeric"
                    maxLength={10}
                    className="h-12 rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2 space-y-2">
          <NextBtn label="Continue" />
          <BackLink onClick={onBack} />
        </div>
      </form>
    </Form>
  );
}

// ─── Shared DateTime Step ─────────────────────────────────────────────────────

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDay(y: number, m: number) {
  return new Date(y, m, 1).getDay();
}

interface DateTimeStepProps {
  defaultValues?: Partial<RepairReplaceStep3>;
  onNext: (v: RepairReplaceStep3) => void;
  onBack: () => void;
  submitLabel?: string;
  isSubmitting: boolean;
}

export function SharedDateTimeStep({
  defaultValues,
  onNext,
  onBack,
  submitLabel = "Submit Request",
  isSubmitting = false,
}: DateTimeStepProps) {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [useToday, setUseToday] = useState(false);

  const form = useForm<RepairReplaceStep3>({
    resolver: zodResolver(dateTimeSchema),
    defaultValues: {
      preferredDate: "",
      preferredTime: "",
      notes: "",
      ...defaultValues,
    },
    mode: "onChange",
  });

  const selectedTime = form.watch("preferredTime");
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);

  function selectDate(day: number) {
    const d = new Date(calYear, calMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      return;
    setSelectedDate(d);
    setUseToday(false);
    form.setValue("preferredDate", d.toISOString().split("T")[0], {
      shouldValidate: true,
    });
  }

  function selectToday() {
    setUseToday(true);
    setSelectedDate(today);
    form.setValue("preferredDate", today.toISOString().split("T")[0], {
      shouldValidate: true,
    });
  }

  function prevMonth() {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
  }

  const formatSelected = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        {/* Date picker */}
        <div>
          <p className="text-xs text-[#9AA3B2] mb-2">
            Select your preferred date and our team will contact you to confirm
            availability.
          </p>
          <FieldLabel required>Pick a Date</FieldLabel>

          {/* ASAP button */}
          <button
            type="button"
            onClick={selectToday}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold mb-3 transition-all",
              useToday
                ? "border-[#E07B3F] bg-[#FFF4EC] text-[#E07B3F]"
                : "border-[#D7DCE5] bg-white text-[#374151] hover:border-[#E07B3F]/60",
            )}
          >
            <span className="text-base">⚡</span>
            As soon as possible – today
          </button>

          <div className="text-center text-xs text-[#9AA3B2] mb-3">
            or pick a date
          </div>

          {/* Calendar */}
          <div className="rounded-xl border border-[#E8EEF7] bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8EEF7]">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-lg hover:bg-[#F5F7FA] text-[#6B6B6B] transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm font-bold text-[#121F37]">
                {MONTHS[calMonth]} {calYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-lg hover:bg-[#F5F7FA] text-[#6B6B6B] transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 text-center py-2 px-1">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-[10px] font-bold text-[#9AA3B2] py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 text-center px-1 pb-3">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const thisDate = new Date(calYear, calMonth, day);
                const isPast =
                  thisDate <
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                  );
                const isSelected =
                  selectedDate &&
                  selectedDate.getFullYear() === calYear &&
                  selectedDate.getMonth() === calMonth &&
                  selectedDate.getDate() === day &&
                  !useToday;
                const isToday =
                  today.getFullYear() === calYear &&
                  today.getMonth() === calMonth &&
                  today.getDate() === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => !isPast && selectDate(day)}
                    disabled={isPast}
                    className={cn(
                      "mx-auto my-0.5 h-8 w-8 rounded-full text-sm flex items-center justify-center transition-all duration-150",
                      isPast && "text-[#D1D5DB] cursor-not-allowed",
                      isSelected &&
                        "bg-[#E07B3F] text-white font-bold shadow-sm",
                      isToday &&
                        !isSelected &&
                        "border-2 border-[#E07B3F] text-[#E07B3F] font-bold",
                      !isPast &&
                        !isSelected &&
                        "text-[#374151] hover:bg-[#FFF4EC] hover:text-[#E07B3F]",
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected date chip */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-2 bg-[#F0F4FF] rounded-xl px-4 py-2.5"
            >
              <CalendarDays className="h-4 w-4 text-[#2563EB]" />
              <span className="text-sm font-semibold text-[#121F37]">
                {formatSelected(selectedDate)}
              </span>
            </motion.div>
          )}
          <FormField
            control={form.control}
            name="preferredDate"
            render={() => (
              <FormItem>
                <FormMessage className="mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Time slots */}
        <div>
          <FieldLabel required>Preferred Time Window</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() =>
                  form.setValue("preferredTime", slot, { shouldValidate: true })
                }
                className={cn(
                  "py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                  selectedTime === slot
                    ? "border-[#E07B3F] bg-[#FFF4EC] text-[#E07B3F]"
                    : "border-[#E8EEF7] bg-white text-[#374151] hover:border-[#E07B3F]/50",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          <FormField
            control={form.control}
            name="preferredTime"
            render={() => (
              <FormItem>
                <FormMessage className="mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Selected time chip */}
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-[#F0F4FF] rounded-xl px-4 py-2.5"
          >
            <CalendarDays className="h-4 w-4 text-[#2563EB]" />
            <span className="text-sm font-semibold text-[#121F37]">
              {formatSelected(selectedDate)} • {selectedTime}
            </span>
          </motion.div>
        )}

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FieldLabel>Additional Notes</FieldLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions or details..."
                  className="min-h-[80px] rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F] resize-none text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-[#9AA3B2] text-right">
          Your info is never shared.
        </p>

        <div className="space-y-2">
          <NextBtn label={submitLabel} loading={isSubmitting} />
          <BackLink onClick={onBack} />
        </div>
      </form>
    </Form>
  );
}
