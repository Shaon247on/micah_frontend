"use server";

import { cookies } from "next/headers";
import api from "@/lib/axios";
import { HvacSystem } from "@/types/hvacQuote.types";

// ============================================================
// CALCULATE PRICES
// ============================================================

export async function calculatePrices(homeInfo: {
  squareFootage: number;
  stories: number;
  bedrooms: number;
  heatingSource: string;
}): Promise<{ success: boolean; data?: HvacSystem[]; error?: string }> {
  try {
    const response = await api.post("/api/hvac-estimate/calculate", homeInfo);

    if (response.data.status === "success") {
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      error: response.data.message || "Failed to calculate prices",
    };
  } catch (error: any) {
    console.error("Error calculating prices:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to calculate prices",
    };
  }
}

// ============================================================
// SUBMIT QUOTE
// ============================================================

export async function submitQuote(data: any) {
  try {
    console.log(
      "📤 Submitting quote to backend:",
      JSON.stringify(data, null, 2),
    );

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.post("/api/hvac-estimate/submit", data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    console.log("📥 Backend response:", response.data);

    if (response.data.status === "success") {
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      error: response.data.message || "Failed to submit quote",
    };
  } catch (error: any) {
    console.error("❌ Error submitting quote:", error);
    console.error("❌ Response data:", error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to submit quote",
    };
  }
}

// ============================================================
// GET SETTINGS (Admin)
// ============================================================

export async function getHvacEstimateSettings(): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.get("/api/hvac-estimate/settings", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === "success") {
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      error: response.data.message || "Failed to fetch settings",
    };
  } catch (error: any) {
    console.error("Error fetching HVAC estimate settings:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch settings",
    };
  }
}

// ============================================================
// UPDATE SETTINGS (Admin)
// ============================================================

export async function updateHvacEstimateSettings(data: any): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await api.put("/api/hvac-estimate/settings", data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === "success") {
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      error: response.data.message || "Failed to update settings",
    };
  } catch (error: any) {
    console.error("Error updating HVAC estimate settings:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update settings",
    };
  }
}
