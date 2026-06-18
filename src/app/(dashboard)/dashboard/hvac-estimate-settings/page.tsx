import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth.actions';
import HvacEstimateSettingsForm from '@/components/dashboard/hvac-estimate/HvacEstimateSettingsForm';

export const metadata: Metadata = {
  title: 'HVAC Estimate Settings | HVAC Service',
  description: 'Configure HVAC estimate pricing',
};

export default async function HvacEstimateSettingsPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Only super admin can access this page
  if (user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <HvacEstimateSettingsForm />
    </div>
  );
}