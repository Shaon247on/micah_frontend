"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase,
  Wrench,
  Droplets,
  Wind,
  Thermometer,
  Home,
  DollarSign,
  AlertTriangle,
  Package,
  Users,
  Shield,
  Heart,
  CalendarIcon,
  ClockIcon,
  Star,
  Filter,
  Calculator,
  Building,
  Bed,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateAppointmentStatus } from "@/actions/appointment.actions";
import { Appointment } from "@/types/appointment";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface AppointmentDetailsProps {
  appointment: Appointment;
}

type StatusType =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "RESCHEDULED";

const statusColors: Record<
  StatusType,
  { bg: string; text: string; icon: JSX.Element }
> = {
  PENDING: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  CONFIRMED: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  IN_PROGRESS: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    icon: <Wrench className="h-4 w-4" />,
  },
  COMPLETED: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  CANCELLED: {
    bg: "bg-red-100",
    text: "text-red-800",
    icon: <XCircle className="h-4 w-4" />,
  },
  RESCHEDULED: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    icon: <Calendar className="h-4 w-4" />,
  },
};

const statusLabels: Record<StatusType, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  RESCHEDULED: "Rescheduled",
};

const serviceTypeLabels: Record<
  string,
  { label: string; icon: JSX.Element; description: string }
> = {
  AC_REJUVENATION: {
    label: "AC Rejuvenation",
    icon: <Thermometer className="h-5 w-5" />,
    description: "Comprehensive AC maintenance and performance restoration",
  },
  REPAIR_OR_REPLACE: {
    label: "Repair or Replace",
    icon: <Wrench className="h-5 w-5" />,
    description: "Expert diagnosis and repair or replacement recommendations",
  },
  REPAIR_AND_TUNE_UP: {
    label: "Repair & Tune Up",
    icon: <Package className="h-5 w-5" />,
    description: "Complete system check, cleaning, and adjustment",
  },
  WATER_QUALITY_SOLUTIONS: {
    label: "Water Quality Solutions",
    icon: <Droplets className="h-5 w-5" />,
    description: "Professional water testing and treatment solutions",
  },
  INDOOR_AIR_QUALITY: {
    label: "Indoor Air Quality",
    icon: <Wind className="h-5 w-5" />,
    description: "Air quality assessment and improvement solutions",
  },
  HVAC_ESTIMATE: {
    label: "HVAC Estimate Quote",
    icon: <Calculator className="h-5 w-5" />,
    description: "Custom HVAC system estimate and quote",
  },
};

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<StatusType>(
    appointment.status as StatusType,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    const result = await updateAppointmentStatus(appointment.id, newStatus);
    if (result.status === "success") {
      setCurrentStatus(newStatus as StatusType);
      toast.success("Status Updated", {
        description: `Appointment status changed to ${statusLabels[newStatus as StatusType]}`,
      });
      router.refresh();
    } else {
      toast.error("Error", {
        description: result.message || "Failed to update status",
      });
    }
    setIsUpdating(false);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string): string => {
    return timeString;
  };

  const getServiceIcon = (type: string): JSX.Element => {
    return serviceTypeLabels[type]?.icon || <Briefcase className="h-5 w-5" />;
  };

  const getServiceDescription = (type: string): string => {
    return serviceTypeLabels[type]?.description || "Professional HVAC service";
  };

  // ✅ Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ✅ Render HVAC Quote Details
  // ✅ Render HVAC Quote Details with all user-provided information
  const renderHvacQuoteDetails = () => {
    const note = appointment.additionalNote || "";

    // Extract order number from the note
    const orderMatch = note.match(/HVAC Estimate Quote #([^\n]+)/);
    const orderNumber = orderMatch ? orderMatch[1] : "N/A";

    // Extract system info from note
    const systemMatch = note.match(/System: ([^\n]+)/);
    const systemInfo = systemMatch ? systemMatch[1] : "N/A";

    // Extract tier from note
    const tierMatch = note.match(/Tier: (\d+)/);
    const tier = tierMatch ? tierMatch[1] : "N/A";

    // Extract notes from note (the user's notes section)
    const notesMatch = note.match(/Notes: ([^\n]*)/);
    const userNotes =
      notesMatch && notesMatch[1] !== "N/A" ? notesMatch[1] : null;

    // For now, we'll show the note content as quote details
    // In a production environment, you'd want to fetch the quote from the database
    return (
      <div className="space-y-6">
        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-[#E07B3F] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">Order Number</p>
              <p className="text-[#121F37] font-medium">{orderNumber}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calculator className="h-5 w-5 text-[#E07B3F] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">System</p>
              <p className="text-[#121F37] font-medium">{systemInfo}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-[#E07B3F] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">Tier</p>
              <p className="text-[#121F37] font-medium">
                {tier === "1"
                  ? "Economy"
                  : tier === "2"
                    ? "Standard"
                    : tier === "3"
                      ? "Premium"
                      : tier}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Home Information - All 4 fields the user provided */}
        <div>
          <h4 className="text-sm font-semibold text-[#121F37] mb-3">
            Home Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <Square className="h-5 w-5 text-[#E07B3F] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#6B6B6B]">
                  Square Footage
                </p>
                <p className="text-[#121F37] font-medium">
                  {appointment.squareFootage
                    ? `${appointment.squareFootage} sq ft`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-[#E07B3F] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#6B6B6B]">Stories</p>
                <p className="text-[#121F37] font-medium">
                  {appointment.stories
                    ? `${appointment.stories} story${appointment.stories > 1 ? "s" : ""}`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bed className="h-5 w-5 text-[#E07B3F] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#6B6B6B]">Bedrooms</p>
                <p className="text-[#121F37] font-medium">
                  {appointment.bedrooms
                    ? `${appointment.bedrooms} bedroom${appointment.bedrooms > 1 ? "s" : ""}`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Thermometer className="h-5 w-5 text-[#E07B3F] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#6B6B6B]">
                  Heating Source
                </p>
                <p className="text-[#121F37] font-medium">
                  {appointment.heatingSource
                    ? appointment.heatingSource.charAt(0).toUpperCase() +
                      appointment.heatingSource.slice(1)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Show the full note as quote details */}
        {appointment.additionalNote && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-semibold text-[#121F37] mb-2">
                Full Quote Details
              </h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm text-[#121F37] whitespace-pre-wrap font-sans">
                  {appointment.additionalNote}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderServiceDetails = () => {
    const type = appointment.appointmentType;

    // ✅ Check if it's a HVAC Estimate
    if (type === "HVAC_ESTIMATE") {
      return renderHvacQuoteDetails();
    }

    switch (type) {
      case "AC_REJUVENATION":
        const acDetails = appointment.acRejuvenationDetails;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Thermometer className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">AC Type</p>
                  <p className="text-[#121F37] font-medium">
                    {acDetails?.acType || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    System Age
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {acDetails?.acAge ? `${acDetails.acAge} years` : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Refrigerant Type
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {acDetails?.refrigerantType || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Performance
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {acDetails?.currentPerformance || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {acDetails?.issues && acDetails.issues.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-[#6B6B6B] mb-2">
                  Issues Reported
                </p>
                <div className="flex flex-wrap gap-2">
                  {acDetails.issues.map((issue: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-red-50 text-red-700"
                    >
                      {issue}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "REPAIR_OR_REPLACE":
        const repairDetails = appointment.repairReplaceDetails;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Wrench className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    System Type
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {repairDetails?.systemType || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    System Age
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {repairDetails?.systemAge
                      ? `${repairDetails.systemAge} years`
                      : "N/A"}
                  </p>
                </div>
              </div>
              {repairDetails?.emergency && (
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-600">
                      Emergency Service
                    </p>
                    <p className="text-[#121F37] font-medium">Urgent request</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Budget Range
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {repairDetails?.budgetRange || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#6B6B6B] mb-1">
                Current Issue
              </p>
              <p className="text-[#121F37] p-3 bg-gray-50 rounded-lg">
                {repairDetails?.currentIssue || "N/A"}
              </p>
            </div>
          </div>
        );

      case "REPAIR_AND_TUNE_UP":
        const tuneUpDetails = appointment.repairTuneUpDetails;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Thermometer className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    System Type
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {tuneUpDetails?.systemType || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Last Tune Up
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {tuneUpDetails?.lastTuneUpDate
                      ? formatDate(tuneUpDetails.lastTuneUpDate)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {tuneUpDetails?.specificConcerns &&
              tuneUpDetails.specificConcerns.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B] mb-2">
                    Specific Concerns
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tuneUpDetails.specificConcerns.map(
                      (concern: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {concern}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              )}
          </div>
        );

      case "WATER_QUALITY_SOLUTIONS":
        const waterDetails = appointment.waterQualityDetails;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Property Type
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {waterDetails?.propertyType || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Water Source
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {waterDetails?.waterSource || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Water Softener
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {waterDetails?.hasWaterSoftener ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Filter className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Filter System
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {waterDetails?.hasFilterSystem ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
            {waterDetails?.waterIssues &&
              waterDetails.waterIssues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B] mb-2">
                    Water Issues
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {waterDetails.waterIssues.map(
                      (issue: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700"
                        >
                          {issue}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              )}
          </div>
        );

      case "INDOOR_AIR_QUALITY":
        const airDetails = appointment.indoorAirQualityDetails;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Property Size
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {airDetails?.propertySizeSqFt
                      ? `${airDetails.propertySizeSqFt} sq ft`
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Allergy Sufferers
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {airDetails?.occupantsWithAllergy || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Humidity Issue
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {airDetails?.hasHumidityIssue ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wind className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Dust Issue
                  </p>
                  <p className="text-[#121F37] font-medium">
                    {airDetails?.hasDustIssue ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
            {airDetails?.symptoms && airDetails.symptoms.length > 0 && (
              <div>
                <p className="text-sm font-medium text-[#6B6B6B] mb-2">
                  Symptoms Reported
                </p>
                <div className="flex flex-wrap gap-2">
                  {airDetails.symptoms.map((symptom: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-50 text-purple-700"
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <p className="text-[#6B6B6B]">No additional details available</p>
        );
    }
  };

  const statusStyle = statusColors[currentStatus];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/dashboard/appointments">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Appointments
        </Button>
      </Link>

      {/* Title Section */}
      <div>
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 mb-2">
              {getServiceIcon(appointment.appointmentType)}
              <h1 className="text-2xl font-bold text-[#121F37]">
                {serviceTypeLabels[appointment.appointmentType]?.label ||
                  appointment.appointmentType}
              </h1>
              <Badge
                className={`${statusStyle.bg} ${statusStyle.text} border-none gap-1`}
              >
                {statusStyle.icon}
                {statusLabels[currentStatus]}
              </Badge>
            </div>
            <Select
              value={currentStatus}
              onValueChange={(value) => handleStatusUpdate(value)}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-[#6B6B6B]">
          {getServiceDescription(appointment.appointmentType)}
        </p>
      </div>

      {/* Customer Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#121F37]">Customer Information</CardTitle>
          <CardDescription>
            Contact details and service location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E07B3F]/10 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-[#E07B3F]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6B6B]">Full Name</p>
                  <p className="font-medium text-[#121F37]">
                    {appointment.fullName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E07B3F]/10 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#E07B3F]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6B6B]">Phone Number</p>
                  <a
                    href={`tel:${appointment.phoneNumber}`}
                    className="font-medium text-[#E07B3F] hover:underline"
                  >
                    {appointment.phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E07B3F]/10 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#E07B3F]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6B6B]">Email Address</p>
                  <a
                    href={`mailto:${appointment.email}`}
                    className="font-medium text-[#E07B3F] hover:underline"
                  >
                    {appointment.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E07B3F]/10 rounded-full flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4 text-[#E07B3F]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6B6B]">Service Address</p>
                  <p className="font-medium text-[#121F37]">
                    {appointment.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E07B3F]/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-[#E07B3F]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6B6B]">Property Type</p>
                  <p className="font-medium text-[#121F37]">
                    {appointment.serviceType || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Schedule Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#121F37]">Appointment Schedule</CardTitle>
          <CardDescription>Preferred date and time for service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E07B3F]/10 rounded-full flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-[#E07B3F]" />
              </div>
              <div>
                <p className="text-sm text-[#6B6B6B]">Preferred Date</p>
                <p className="font-medium text-[#121F37]">
                  {formatDate(appointment.preferredDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E07B3F]/10 rounded-full flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-[#E07B3F]" />
              </div>
              <div>
                <p className="text-sm text-[#6B6B6B]">Preferred Time</p>
                <p className="font-medium text-[#121F37]">
                  {formatTime(appointment.preferredTime)}
                </p>
              </div>
            </div>
          </div>
          {appointment.additionalNote && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-[#E07B3F] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    Additional Notes
                  </p>
                  <p className="text-[#121F37] mt-1">
                    {appointment.additionalNote}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#121F37]">Service Details</CardTitle>
          <CardDescription>
            Specific information about the requested service
          </CardDescription>
        </CardHeader>
        <CardContent>{renderServiceDetails()}</CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#121F37]">Timeline</CardTitle>
          <CardDescription>Request and update history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-[#121F37]">Request Created</p>
                  <p className="text-sm text-[#6B6B6B]">
                    Initial appointment request
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#6B6B6B]">
                {formatDate(appointment.createdAt)}
              </p>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStyle.bg}`}
                >
                  {statusStyle.icon}
                </div>
                <div>
                  <p className="font-medium text-[#121F37]">Current Status</p>
                  <p className="text-sm text-[#6B6B6B]">
                    {statusLabels[currentStatus]}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#6B6B6B]">
                {formatDate(appointment.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
