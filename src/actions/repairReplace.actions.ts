"use server";

import { cookies } from "next/headers";
import api from "@/lib/axios";
import { systemAgeToNumber } from "@/types/services.type";
import { RepairReplaceFull } from "@/schemas/repairReplace.schema";

export async function submitRepairReplace(data: RepairReplaceFull) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Safely get issues array
    const issues = data.issue || [];
    const combinedIssues = Array.isArray(issues) ? issues.join(", ") : "";

    // Map form data to backend expected format
    const payload = {
      appointmentType: "REPAIR_OR_REPLACE",
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      address:
        data.address && data.zipCode
          ? `${data.address}, ${data.zipCode}`
          : data.address || "",
      preferredDate:
        data.preferredDate === "asap"
          ? new Date().toISOString()
          : data.preferredDate
            ? new Date(data.preferredDate).toISOString()
            : new Date().toISOString(),
      preferredTime: data.preferredTime || "09:00",
      additionalNote: data.notes || "",
      serviceType: data.serviceType || "RESIDENTIAL",
      repairReplaceDetails: {
        systemType:
          data.systemType === "Central A/C"
            ? "AC_ONLY"
            : data.systemType === "Furnace / Heating"
              ? "FURNACE"
              : data.systemType === "Heat Pump"
                ? "HEAT_PUMP"
                : data.systemType === "Mini-Split"
                  ? "DUCTLESS"
                  : "AC_ONLY",
        systemAge: data.systemAge ? systemAgeToNumber(data.systemAge) : 0,
        currentIssue: combinedIssues || "No issues specified",
        emergency: data.urgency === "Emergency",
        budgetRange: "NOT_SURE",
        preferredSolution: "REPAIR",
      },
    };

    const response = await api.post("/api/appointments", payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === "success") {
      return { success: true, message: "Appointment scheduled successfully!" };
    }

    return {
      success: false,
      error: response.data.message || "Failed to schedule appointment",
    };
  } catch (error: any) {
    console.error("Submit Repair Replace error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "An unexpected error occurred",
    };
  }
}
