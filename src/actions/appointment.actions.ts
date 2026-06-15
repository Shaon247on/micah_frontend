"use server";

import { cookies } from "next/headers";
import {
  AppointmentResponse,
  AppointmentDetailsResponse,
  DashboardStats,
  UpdateStatusResponse,
  DeleteResponse,
} from "@/types/appointment";
import api from "@/lib/axios";

interface GetAppointmentsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  serviceType?: string;
}

export async function getAppointments(params: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  serviceType?: string;
}): Promise<AppointmentResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);
    if (params.serviceType) queryParams.append('serviceType', params.serviceType);
    
    console.log('Fetching with query:', queryParams.toString());
  

    const response = await api.get(`/api/appointments/?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      status: 'error',
      message: 'Failed to fetch appointments',
      data: {
        appointments: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      },
    };
  }
}

export async function getAppointmentById(
  id: string,
): Promise<AppointmentDetailsResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.get(`/api/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data as AppointmentDetailsResponse;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return {
      status: "error",
      data: {} as AppointmentDetailsResponse["data"],
    };
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: string,
): Promise<UpdateStatusResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.patch(
      `/api/appointments/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );

    return response.data as UpdateStatusResponse;
  } catch (error: any) {
    console.error("Error updating appointment:", error);
    return {
      status: "error",
      message:
        error.response?.data?.message || "Failed to update appointment status",
    };
  }
}

export async function deleteAppointment(id: string): Promise<DeleteResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.delete(`/api/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data as DeleteResponse;
  } catch (error: any) {
    console.error("Error deleting appointment:", error);
    return {
      status: "error",
      message: error.response?.data?.message || "Failed to delete appointment",
    };
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.get("/api/appointments/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data as DashboardStats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      status: "error",
      data: {
        total: 0,
        pending: 0,
        confirmed: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
        todayAppointments: 0,
      },
    };
  }
}
