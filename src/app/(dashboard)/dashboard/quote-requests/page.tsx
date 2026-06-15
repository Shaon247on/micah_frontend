import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAppointments } from '@/actions/appointment.actions';
import { getCurrentUser } from '@/actions/auth.actions';
import { AppointmentTable } from '@/components/dashboard/appointments/AppointmentTable';

export const metadata: Metadata = {
  title: 'Appointments | HVAC Service',
  description: 'Manage appointments',
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
    service?: string;
  }>;
}

export default async function AppointmentsPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const status = params.status === 'all' ? undefined : params.status;
  const search = params.search;
  const service = params.service === 'all' ? undefined : params.service;
  
  console.log('Fetching appointments with params:', { page, status, search, service });
  
  const result = await getAppointments({
    page,
    limit: 10,
    status,
    search,
    serviceType: service,
  });
  
  const serviceTypes = [
    'AC_REJUVENATION',
    'REPAIR_OR_REPLACE',
    'REPAIR_AND_TUNE_UP',
    'WATER_QUALITY_SOLUTIONS',
    'INDOOR_AIR_QUALITY',
  ];

  console.log("the services:", result)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AppointmentTable
        initialAppointments={result.data.appointments}
        initialPagination={result.data.pagination}
        serviceTypes={serviceTypes}
      />
    </div>
  );
}