'use client';

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, type HvacSystem } from '@/types/hvacQuote.types';

interface ConfirmationStepProps {
  system: HvacSystem;
  schedule: {
    fullName: string;
    email: string;
    phoneNumber: string;
    installDate: string;
    notes?: string;
    orderNumber?: string;
  };
  homeInfo: {
    squareFootage: number;
    stories: number;
    bedrooms: number;
    heatingSource: string;
  };
  address: string;
  onClose: () => void;
}

export function ConfirmationStep({
  system,
  schedule,
  homeInfo,
  address,
  onClose,
}: ConfirmationStepProps) {
  const discount = system.retailPrice - system.cashPrice;

  const getInstallDateLabel = () => {
    if (schedule.installDate === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return schedule.installDate || 'TBD';
  };

  return (
    <div className="space-y-6">
      {/* Success header */}
      <div className="text-center space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdf4] border border-[#bbf7d0]">
          <CheckCircle2 className="h-7 w-7 text-[#22c55e]" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37] leading-tight">
            Quote Submitted Successfully!
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed max-w-sm mx-auto">
            Your request has been received. Our team will contact you to confirm.
          </p>
          {schedule.orderNumber && (
            <p className="mt-1 text-sm font-semibold text-[#E07B3F]">
              Order #{schedule.orderNumber}
            </p>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-[#121F37]">Order Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-[#6B6B6B]">Customer</p>
            <p className="text-sm font-semibold text-[#121F37]">{schedule.fullName}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Install Date</p>
            <p className="text-sm font-semibold text-[#121F37]">{getInstallDateLabel()}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">System</p>
            <p className="text-sm font-semibold text-[#121F37]">
              {system.brand} {system.name}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Tier</p>
            <p className="text-sm font-semibold text-[#121F37]">{system.tier}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Address</p>
            <p className="text-sm font-semibold text-[#121F37]">{address}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Email</p>
            <p className="text-sm font-semibold text-[#121F37]">{schedule.email}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Phone</p>
            <p className="text-sm font-semibold text-[#121F37]">{schedule.phoneNumber}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Home Size</p>
            <p className="text-sm font-semibold text-[#121F37]">
              {homeInfo.squareFootage} sq ft, {homeInfo.stories} story, {homeInfo.bedrooms} BR
            </p>
          </div>
        </div>

        <hr className="border-[#E8EEF7]" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Retail Price:</span>
            <span className="font-semibold text-[#121F37] line-through">
              {formatCurrency(system.retailPrice)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Online Discount:</span>
            <span className="font-semibold text-[#22c55e]">
              -{formatCurrency(discount)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-extrabold">
            <span className="text-[#121F37]">Cash Price:</span>
            <span className="text-[#121F37]">{formatCurrency(system.cashPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Monthly Payment:</span>
            <span className="font-semibold text-[#121F37]">
              ${system.monthlyPrice}/mo
            </span>
          </div>
        </div>

        {schedule.notes && (
          <>
            <hr className="border-[#E8EEF7]" />
            <div>
              <p className="text-xs text-[#6B6B6B]">Notes:</p>
              <p className="text-sm text-[#121F37]">{schedule.notes}</p>
            </div>
          </>
        )}
      </div>

      {/* Contact & Done */}
      <div className="space-y-4">
        <p className="text-center text-sm text-[#6B6B6B]">
          Need to make changes or have questions? Contact us at{' '}
          <strong className="text-[#121F37]">(630) 854 0372</strong>
        </p>

        <Button
          type="button"
          onClick={onClose}
          className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm"
        >
          Done
        </Button>
      </div>
    </div>
  );
}