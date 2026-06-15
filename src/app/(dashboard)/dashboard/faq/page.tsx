import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth.actions';
import { getFAQs } from '@/actions/faq.actions';
import FaqList from '@/components/dashboard/faq/FaqList';

export const metadata: Metadata = {
  title: 'FAQ Management | HVAC Service',
  description: 'Manage frequently asked questions',
};

export default async function FaqManagementPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const result = await getFAQs({ limit: 100 });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <FaqList initialFaqs={result.data.faqs} />
    </div>
  );
}