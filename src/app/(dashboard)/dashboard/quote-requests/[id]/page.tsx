import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAppointmentById } from '@/actions/appointment.actions';
import { getCurrentUser } from '@/actions/auth.actions';
import { AppointmentDetails } from '@/components/dashboard/appointments/AppointmentDetails';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Appointment ${id.slice(0, 8)} | HVAC Service`,
    description: 'View appointment details',
  };
}

export default async function AppointmentDetailsPage({ params }: PageProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const { id } = await params;
  const result = await getAppointmentById(id);
  
  if (result.status !== 'success' || !result.data) {
    notFound();
  }
  
  return (
    <div className="max-w-420 mx-auto px-4 py-8">
      <AppointmentDetails appointment={result.data} />
    </div>
  );
}