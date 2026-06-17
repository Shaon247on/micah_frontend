import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth.actions';
import { getDashboardData } from '@/actions/dashboard.actions';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

export const metadata: Metadata = {
  title: 'Dashboard | HVAC Service',
  description: 'Dashboard overview',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const dashboardData = await getDashboardData();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardOverview 
        user={user} 
        data={dashboardData} 
      />
    </div>
  );
}