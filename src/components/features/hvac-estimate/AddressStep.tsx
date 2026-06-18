'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const addressSchema = z.object({
  address: z.string().min(5, 'Please enter a valid address'),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressStepProps {
  defaultAddress: string;
  onNext: (address: string) => void;
}

export function AddressStep({ defaultAddress, onNext }: AddressStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: defaultAddress,
    },
  });

  function onSubmit(values: AddressFormValues) {
    onNext(values.address);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-[#DE7B42] font-bold tracking-widest">
          HVAC Quote
        </p>
        <h2 className="text-2xl font-extrabold text-[#121F37] mt-1">
          Real HVAC Prices, No Noise
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-2">
          Enter your address to get started with a personalized estimate
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-[#121F37]">
            Service Address
          </label>
          <Input
            placeholder="Enter your service address"
            className="h-14 rounded-xl border-[#D7DCE5] mt-1"
            {...register('address')}
          />
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-bold flex items-center justify-center gap-2 transition-all duration-200"
        >
          Look Up My Home Info
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}