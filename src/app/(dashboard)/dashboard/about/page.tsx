import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth.actions';
import { getAboutUsStory } from '@/actions/aboutUs.actions';
import AboutManagement from '@/components/dashboard/aboutUs/AboutManagement';

export const metadata: Metadata = {
  title: 'About Us Management | HVAC Service',
  description: 'Manage about us page content',
};

export default async function AboutManagementPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const result = await getAboutUsStory();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AboutManagement initialData={result.data} />
    </div>
  );
}