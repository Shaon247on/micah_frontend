"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  updateAppointmentStatus,
  deleteAppointment,
} from "@/actions/appointment.actions";
import { Appointment } from "@/types/appointment";
import { useDebounce } from "@/hooks/useDebounce";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AppointmentTableProps {
  initialAppointments: Appointment[];
  initialPagination: PaginationData;
  serviceTypes: string[];
}

type StatusType =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "RESCHEDULED";

const statusColors: Record<StatusType, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
  RESCHEDULED: "bg-purple-100 text-purple-800",
};

const statusLabels: Record<StatusType, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  RESCHEDULED: "Rescheduled",
};

const serviceTypeLabels: Record<string, string> = {
  AC_REJUVENATION: "AC Rejuvenation",
  REPAIR_OR_REPLACE: "Repair or Replace",
  REPAIR_AND_TUNE_UP: "Repair & Tune Up",
  WATER_QUALITY_SOLUTIONS: "Water Quality Solutions",
  INDOOR_AIR_QUALITY: "Indoor Air Quality",
};

export function AppointmentTable({
  initialAppointments,
  initialPagination,
  serviceTypes,
}: AppointmentTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use props directly, no local state for appointments/pagination
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all",
  );
  const [serviceFilter, setServiceFilter] = useState(
    searchParams.get("service") || "all",
  );
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [selectedAppointment, setSelectedAppointment] =
  //   useState<Appointment | null>(null);

  // Debounce search term (500ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Update URL when debounced search term changes
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", "1");
    if (statusFilter && statusFilter !== "all")
      params.set("status", statusFilter);
    if (serviceFilter && serviceFilter !== "all")
      params.set("service", serviceFilter);
    if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, statusFilter, serviceFilter, router, pathname]);

  const updateUrlParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== "all") {
          newParams.set(key, value);
        }
      });

      if (!newParams.has("page")) {
        newParams.set("page", "1");
      }

      router.push(`${pathname}?${newParams.toString()}`);
    },
    [router, pathname],
  );

  const handleStatusFilter = useCallback(
    (value: string) => {
      setStatusFilter(value);
      updateUrlParams({
        page: "1",
        status: value,
        service: serviceFilter,
        search: searchTerm,
      });
    },
    [updateUrlParams, serviceFilter, searchTerm],
  );

  const handleServiceFilter = useCallback(
    (value: string) => {
      setServiceFilter(value);
      updateUrlParams({
        page: "1",
        status: statusFilter,
        service: value,
        search: searchTerm,
      });
    },
    [updateUrlParams, statusFilter, searchTerm],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlParams({
        page: page.toString(),
        status: statusFilter,
        service: serviceFilter,
        search: searchTerm,
      });
    },
    [updateUrlParams, statusFilter, serviceFilter, searchTerm],
  );

  const handleStatusUpdate = useCallback(
    async (id: string, newStatus: string) => {
      const result = await updateAppointmentStatus(id, newStatus);
      if (result.status === "success") {
        toast.success(
          `Appointment status changed to ${statusLabels[newStatus as StatusType]}`,
        );
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    },
    [router],
  );

  // const handleDelete = useCallback(async () => {
  //   if (!selectedAppointment) return;

  //   const result = await deleteAppointment(selectedAppointment.id);
  //   if (result.status === "success") {
  //     toast.success("Appointment deleted successfully");
  //     router.refresh();
  //   } else {
  //     toast.error(result.message || "Failed to delete appointment");
  //   }
  //   setDeleteDialogOpen(false);
  //   setSelectedAppointment(null);
  // }, [selectedAppointment, router]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusKey = status as StatusType;
    const color = statusColors[statusKey] || "bg-gray-100 text-gray-800";
    const label = statusLabels[statusKey] || status;
    return <Badge className={`${color} border-none`}>{label}</Badge>;
  };

  const getServiceLabel = (serviceType: string): string => {
    return serviceTypeLabels[serviceType] || serviceType;
  };

  // Use props directly for display
  const appointments = initialAppointments;
  const pagination = initialPagination;
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 0;
  const totalItems = pagination?.total || 0;
  const itemsPerPage = pagination?.limit || 10;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Sync filter states with URL params when they change externally
  useEffect(() => {
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const service = searchParams.get("service");

    if (status) setStatusFilter(status);
    if (search !== null) setSearchTerm(search);
    if (service) setServiceFilter(service);
  }, [searchParams]);

  // Show loading indicator while searching
  const isSearching = searchTerm !== debouncedSearchTerm && searchTerm !== "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#121F37]">Appointments</h1>
        <p className="mt-1 text-sm text-[#6B6B6B]">
          Manage and track all incoming service appointments
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Controls */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-10"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={handleServiceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {getServiceLabel(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  REF / Date
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  Customer Details
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  Service Type
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  Schedule
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-[13px] font-medium text-[#6B6B6B] border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!appointments || appointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-[#6B6B6B]"
                  >
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-[#fafafa]"
                  >
                    <td className="border-b border-gray-200 px-6 py-4">
                      <div className="mb-1 text-sm font-medium text-[#E07B3F]">
                        {appointment.id?.slice(0, 8).toUpperCase() || "N/A"}
                      </div>
                      <div className="text-[13px] text-[#6B6B6B]">
                        {formatDate(appointment.createdAt)}
                      </div>
                    </td>

                    <td className="border-b border-gray-200 px-6 py-4">
                      <div className="mb-1 text-sm font-medium text-[#121F37]">
                        {appointment.fullName || "N/A"}
                      </div>
                      <div className="text-[13px] text-[#6B6B6B]">
                        {appointment.address && appointment.address.length > 40
                          ? `${appointment.address.slice(0, 40)}...`
                          : appointment.address || "N/A"}
                      </div>
                    </td>

                    <td className="border-b border-gray-200 px-6 py-4">
                      <div className="mb-1 text-sm font-medium text-[#121F37]">
                        {appointment.phoneNumber || "N/A"}
                      </div>
                      <div className="text-[13px] text-[#6B6B6B]">
                        {appointment.email || "N/A"}
                      </div>
                    </td>

                    <td className="border-b border-gray-200 px-6 py-4">
                      <div className="mb-1 text-sm font-medium text-[#121F37]">
                        {getServiceLabel(appointment.appointmentType)}
                      </div>
                      <div className="text-[13px] text-[#6B6B6B]">
                        {appointment.serviceType || "N/A"}
                      </div>
                    </td>

                    <td className="border-b border-gray-200 px-6 py-4 text-sm font-medium text-[#121F37]">
                      {appointment.preferredDate
                        ? `${formatDate(appointment.preferredDate)} at ${appointment.preferredTime}`
                        : "N/A"}
                    </td>

                    <td className="border-b border-gray-200 px-6 py-4">
                      {getStatusBadge(appointment.status)}
                    </td>

                    <td className="border-b border-gray-200 px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/dashboard/quote-requests/${appointment.id}`,
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "CONFIRMED")
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            Accept
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "CANCELLED")
                            }
                          >
                            <XCircle className="mr-2 h-4 w-4 text-red-600" />
                            Cancel
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setDeleteDialogOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 0 && (
          <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <span className="text-sm text-[#6B6B6B]">
              Showing {startItem} to {endItem} of {totalItems} entries
            </span>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={
                      currentPage === pageNum
                        ? "bg-[#E07B3F] hover:bg-[#d66b2f]"
                        : ""
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {/* <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              appointment for {selectedAppointment?.fullName}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
}
