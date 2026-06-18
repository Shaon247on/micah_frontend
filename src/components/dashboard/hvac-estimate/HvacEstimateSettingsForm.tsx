'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Loader2, DollarSign, TrendingUp, Building, FileText, Calendar, Percent } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { hvacEstimateSettingsSchema, HvacEstimateSettingsInput } from '@/schemas/hvacEstimate.schema';
import { getHvacEstimateSettings, updateHvacEstimateSettings } from '@/actions/hvacEstimateSettings.actions';
import { HvacEstimateSettings } from '@/types/hvacEstimate';

export default function HvacEstimateSettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<HvacEstimateSettings | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<HvacEstimateSettingsInput>({
    resolver: zodResolver(hvacEstimateSettingsSchema),
    defaultValues: {
      baseRatePerSqFt: 5.00,
      laborRatePerHour: 75.00,
      markupPercentage: 25.00,
      tier1Multiplier: 1.0,
      tier2Multiplier: 1.3,
      tier3Multiplier: 1.7,
      installationBaseFee: 1500.00,
      permitFee: 200.00,
      disposalFee: 150.00,
      monthlyPaymentRate: 0.02,
    },
  });

  // ✅ Watch all form values for live preview
  const watchedValues = useWatch({
    control,
  });

  // ✅ Calculate preview prices based on watched values
  const previewPrices = useMemo(() => {
    const baseRate = watchedValues.baseRatePerSqFt || 5;
    const markup = watchedValues.markupPercentage || 25;
    const tier1 = watchedValues.tier1Multiplier || 1;
    const tier2 = watchedValues.tier2Multiplier || 1.3;
    const tier3 = watchedValues.tier3Multiplier || 1.7;
    const storyAdjustment = 1 + (2 - 1) * 0.05; // 2 story default
    const bedroomAdjustment = 1 + (3 - 2) * 0.03; // 3 bedroom default
    const heatingAdjustment = 1.0; // natural gas default
    const markupMultiplier = 1 + (markup / 100);

    const calculatePrice = (tierMultiplier: number) => {
      const rawPrice = 2000 * baseRate * tierMultiplier * storyAdjustment * bedroomAdjustment * heatingAdjustment * markupMultiplier;
      return Math.round(rawPrice / 100) * 100;
    };

    return {
      economy: calculatePrice(tier1),
      standard: calculatePrice(tier2),
      premium: calculatePrice(tier3),
    };
  }, [watchedValues]);

  // Load settings on mount
  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      const result = await getHvacEstimateSettings();
      
      if (result.success && result.data) {
        setSettings(result.data);
        reset({
          baseRatePerSqFt: result.data.baseRatePerSqFt,
          laborRatePerHour: result.data.laborRatePerHour,
          markupPercentage: result.data.markupPercentage,
          tier1Multiplier: result.data.tier1Multiplier,
          tier2Multiplier: result.data.tier2Multiplier,
          tier3Multiplier: result.data.tier3Multiplier,
          installationBaseFee: result.data.installationBaseFee,
          permitFee: result.data.permitFee,
          disposalFee: result.data.disposalFee,
          monthlyPaymentRate: result.data.monthlyPaymentRate,
        });
      } else {
        toast.error(result.error || 'Failed to load settings');
      }
      
      setIsLoading(false);
    }
    
    loadSettings();
  }, [reset]);

  const onSubmit = async (data: HvacEstimateSettingsInput) => {
    setIsSubmitting(true);
    
    try {
      const result = await updateHvacEstimateSettings(data);
      
      if (result.success && result.data) {
        setSettings(result.data);
        toast.success('Settings updated successfully');
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#E07B3F]" />
          <p className="text-sm text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#121F37]">HVAC Estimate Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure pricing and calculation parameters for HVAC estimates
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {settings?.updatedAt ? new Date(settings.updatedAt).toLocaleString() : 'Never'}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Base Rates Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#E07B3F]" />
              <CardTitle className="text-[#121F37]">Base Rates</CardTitle>
            </div>
            <CardDescription>
              Configure the base rates used for price calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baseRatePerSqFt" className="text-[#121F37] font-semibold">
                  Base Rate per Sq Ft
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="baseRatePerSqFt"
                    type="number"
                    step="0.01"
                    className="pl-7"
                    {...register('baseRatePerSqFt', { valueAsNumber: true })}
                  />
                </div>
                {errors.baseRatePerSqFt && (
                  <p className="text-xs text-red-500">{errors.baseRatePerSqFt.message}</p>
                )}
                <p className="text-xs text-gray-400">Base price per square foot for calculations</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="laborRatePerHour" className="text-[#121F37] font-semibold">
                  Labor Rate per Hour
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="laborRatePerHour"
                    type="number"
                    step="0.01"
                    className="pl-7"
                    {...register('laborRatePerHour', { valueAsNumber: true })}
                  />
                </div>
                {errors.laborRatePerHour && (
                  <p className="text-xs text-red-500">{errors.laborRatePerHour.message}</p>
                )}
                <p className="text-xs text-gray-400">Hourly labor rate for installations</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="markupPercentage" className="text-[#121F37] font-semibold">
                  Markup Percentage
                </Label>
                <div className="relative">
                  <Input
                    id="markupPercentage"
                    type="number"
                    step="0.01"
                    className="pr-7"
                    {...register('markupPercentage', { valueAsNumber: true })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                {errors.markupPercentage && (
                  <p className="text-xs text-red-500">{errors.markupPercentage.message}</p>
                )}
                <p className="text-xs text-gray-400">Percentage markup applied to base price</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPaymentRate" className="text-[#121F37] font-semibold">
                  Monthly Payment Rate
                </Label>
                <div className="relative">
                  <Input
                    id="monthlyPaymentRate"
                    type="number"
                    step="0.001"
                    className="pr-7"
                    {...register('monthlyPaymentRate', { valueAsNumber: true })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                {errors.monthlyPaymentRate && (
                  <p className="text-xs text-red-500">{errors.monthlyPaymentRate.message}</p>
                )}
                <p className="text-xs text-gray-400">Monthly payment rate for financing options</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tier Multipliers Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#E07B3F]" />
              <CardTitle className="text-[#121F37]">Tier Multipliers</CardTitle>
            </div>
            <CardDescription>
              Configure multipliers for each system tier (Economy, Standard, Premium)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tier1Multiplier" className="text-[#121F37] font-semibold">
                  Economy Tier (Tier 1)
                </Label>
                <Input
                  id="tier1Multiplier"
                  type="number"
                  step="0.01"
                  {...register('tier1Multiplier', { valueAsNumber: true })}
                />
                {errors.tier1Multiplier && (
                  <p className="text-xs text-red-500">{errors.tier1Multiplier.message}</p>
                )}
                <p className="text-xs text-gray-400">Multiplier for Economy tier systems</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier2Multiplier" className="text-[#121F37] font-semibold">
                  Standard Tier (Tier 2)
                </Label>
                <Input
                  id="tier2Multiplier"
                  type="number"
                  step="0.01"
                  {...register('tier2Multiplier', { valueAsNumber: true })}
                />
                {errors.tier2Multiplier && (
                  <p className="text-xs text-red-500">{errors.tier2Multiplier.message}</p>
                )}
                <p className="text-xs text-gray-400">Multiplier for Standard tier systems</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier3Multiplier" className="text-[#121F37] font-semibold">
                  Premium Tier (Tier 3)
                </Label>
                <Input
                  id="tier3Multiplier"
                  type="number"
                  step="0.01"
                  {...register('tier3Multiplier', { valueAsNumber: true })}
                />
                {errors.tier3Multiplier && (
                  <p className="text-xs text-red-500">{errors.tier3Multiplier.message}</p>
                )}
                <p className="text-xs text-gray-400">Multiplier for Premium tier systems</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fees Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-[#E07B3F]" />
              <CardTitle className="text-[#121F37]">Installation Fees</CardTitle>
            </div>
            <CardDescription>
              Configure additional fees for installations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="installationBaseFee" className="text-[#121F37] font-semibold">
                  Installation Base Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="installationBaseFee"
                    type="number"
                    step="0.01"
                    className="pl-7"
                    {...register('installationBaseFee', { valueAsNumber: true })}
                  />
                </div>
                {errors.installationBaseFee && (
                  <p className="text-xs text-red-500">{errors.installationBaseFee.message}</p>
                )}
                <p className="text-xs text-gray-400">Base fee for installation services</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="permitFee" className="text-[#121F37] font-semibold">
                  Permit Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="permitFee"
                    type="number"
                    step="0.01"
                    className="pl-7"
                    {...register('permitFee', { valueAsNumber: true })}
                  />
                </div>
                {errors.permitFee && (
                  <p className="text-xs text-red-500">{errors.permitFee.message}</p>
                )}
                <p className="text-xs text-gray-400">Fee for required permits</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disposalFee" className="text-[#121F37] font-semibold">
                  Disposal Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="disposalFee"
                    type="number"
                    step="0.01"
                    className="pl-7"
                    {...register('disposalFee', { valueAsNumber: true })}
                  />
                </div>
                {errors.disposalFee && (
                  <p className="text-xs text-red-500">{errors.disposalFee.message}</p>
                )}
                <p className="text-xs text-gray-400">Fee for old equipment disposal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Fixed Preview Section - Now shows live calculated prices */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#E07B3F]" />
              <CardTitle className="text-[#121F37]">Price Preview</CardTitle>
            </div>
            <CardDescription>
              Estimated prices based on current settings (2000 sq ft, 2 story, 3 bedroom home)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-[#E8EEF7] rounded-xl bg-[#F8F9FB]">
                <p className="text-sm font-semibold text-[#121F37]">Economy</p>
                <p className="text-2xl font-bold text-[#E07B3F]">
                  ${previewPrices.economy.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Estimated price</p>
              </div>
              <div className="p-4 border border-[#E8EEF7] rounded-xl bg-[#F8F9FB]">
                <p className="text-sm font-semibold text-[#121F37]">Standard</p>
                <p className="text-2xl font-bold text-[#E07B3F]">
                  ${previewPrices.standard.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Estimated price</p>
              </div>
              <div className="p-4 border border-[#E8EEF7] rounded-xl bg-[#F8F9FB]">
                <p className="text-sm font-semibold text-[#121F37]">Premium</p>
                <p className="text-2xl font-bold text-[#E07B3F]">
                  ${previewPrices.premium.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Estimated price</p>
              </div>
            </div>
            <div className="mt-3 flex gap-4 text-xs text-gray-400">
              <span>Base Rate: ${watchedValues.baseRatePerSqFt || 5}/sq ft</span>
              <span>Markup: {watchedValues.markupPercentage || 25}%</span>
              <span>Tier 1: {watchedValues.tier1Multiplier || 1}x</span>
              <span>Tier 2: {watchedValues.tier2Multiplier || 1.3}x</span>
              <span>Tier 3: {watchedValues.tier3Multiplier || 1.7}x</span>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              * Actual prices vary based on home specifications and local rates
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (settings) {
                reset({
                  baseRatePerSqFt: settings.baseRatePerSqFt,
                  laborRatePerHour: settings.laborRatePerHour,
                  markupPercentage: settings.markupPercentage,
                  tier1Multiplier: settings.tier1Multiplier,
                  tier2Multiplier: settings.tier2Multiplier,
                  tier3Multiplier: settings.tier3Multiplier,
                  installationBaseFee: settings.installationBaseFee,
                  permitFee: settings.permitFee,
                  disposalFee: settings.disposalFee,
                  monthlyPaymentRate: settings.monthlyPaymentRate,
                });
              }
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#E07B3F] hover:bg-[#d66b2f]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}