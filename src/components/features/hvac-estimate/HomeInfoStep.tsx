'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const homeInfoSchema = z.object({
  squareFootage: z.number()
    .int()
    .min(100, 'Square footage must be at least 100')
    .max(50000, 'Square footage too large'),
  stories: z.number()
    .int()
    .min(1, 'Stories must be at least 1')
    .max(10, 'Stories too many'),
  heatingSource: z.string().min(1, 'Please select a heating source'),
  bedrooms: z.number()
    .int()
    .min(1, 'Bedrooms must be at least 1')
    .max(20, 'Bedrooms too many'),
});

type HomeInfoFormValues = z.infer<typeof homeInfoSchema>;

interface HomeInfoStepProps {
  address: string;
  onNext: (homeInfo: HomeInfoFormValues) => void;
  onBack: () => void;
}

const STORY_OPTIONS = [
  { value: 1, label: '1 Story' },
  { value: 2, label: '2 Stories' },
  { value: 3, label: '3 Stories' },
  { value: 4, label: '4 Stories' },
  { value: 5, label: '5 Stories' },
];

const HEATING_OPTIONS = [
  { value: 'natural gas', label: 'Natural Gas' },
  { value: 'electric', label: 'Electric' },
  { value: 'propane', label: 'Propane' },
  { value: 'oil', label: 'Oil' },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function HomeInfoStep({ address, onNext, onBack }: HomeInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HomeInfoFormValues>({
    resolver: zodResolver(homeInfoSchema),
    defaultValues: {
      squareFootage: 2000,
      stories: 2,
      heatingSource: 'natural gas',
      bedrooms: 3,
    },
  });

  const stories = watch('stories');
  const heatingSource = watch('heatingSource');
  const bedrooms = watch('bedrooms');

  function onSubmit(values: HomeInfoFormValues) {
    onNext(values);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37] leading-tight">
          Tell Us About Your Home
        </h2>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          We'll use this information to find the perfect system for your home.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Square Footage */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#121F37]">
            Total Square Footage
          </label>
          <Input
            type="number"
            placeholder="2000"
            className="h-14 rounded-xl border-[#D7DCE5] w-full"
            {...register('squareFootage', { valueAsNumber: true })}
          />
          {errors.squareFootage && (
            <p className="text-xs text-red-500">{errors.squareFootage.message}</p>
          )}
        </div>

        {/* Stories */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#121F37]">
            Number of Stories/Levels
          </label>
          <Select
            value={stories ? String(stories) : ''}
            onValueChange={(v) =>
              setValue('stories', Number(v), { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full h-14 rounded-xl border-[#D7DCE5]">
              <SelectValue placeholder="Select stories" />
            </SelectTrigger>
            <SelectContent>
              {STORY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={String(o.value)}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.stories && (
            <p className="text-xs text-red-500">{errors.stories.message}</p>
          )}
        </div>

        {/* Heating Source */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#121F37]">
            Heating Source
          </label>
          <Select
            value={heatingSource}
            onValueChange={(v) =>
              setValue('heatingSource', v, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full h-14 rounded-xl border-[#D7DCE5]">
              <SelectValue placeholder="Select heating source" />
            </SelectTrigger>
            <SelectContent>
              {HEATING_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.heatingSource && (
            <p className="text-xs text-red-500">{errors.heatingSource.message}</p>
          )}
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#121F37]">
            Bedrooms
          </label>
          <Select
            value={bedrooms ? String(bedrooms) : ''}
            onValueChange={(v) =>
              setValue('bedrooms', Number(v), { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full h-14 rounded-xl border-[#D7DCE5]">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {BEDROOM_OPTIONS.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bedrooms && (
            <p className="text-xs text-red-500">{errors.bedrooms.message}</p>
          )}
        </div>

        {/* Address Display */}
        <div className="rounded-xl bg-[#F8F9FB] p-4 border border-[#E8EEF7]">
          <p className="text-xs text-[#6B6B6B]">Service Address</p>
          <p className="text-sm font-medium text-[#121F37]">{address}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-bold flex items-center justify-center gap-2 transition-all duration-200"
          >
            See My Options
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full h-12 rounded-xl border-[#D7DCE5] text-[#121F37] font-semibold hover:bg-[#F5F7FA]"
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}