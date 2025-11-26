"use client"

/**
 * Booking Integration Helper
 *
 * This component manages integrations with calendar booking services.
 * Supports: Calendly, Zoho Bookings, & custom webhook integration
 *
 * Setup Instructions:
 * 1. CALENDLY: Add environment variables NEXT_PUBLIC_CALENDLY_URL (your calendly link)
 * 2. ZOHO: Add NEXT_PUBLIC_ZOHO_BOOKING_URL environment variable
 * 3. WEBHOOK: Add NEXT_PUBLIC_WEBHOOK_URL for custom API endpoint
 */

import type { BookingFormData } from "./booking-modal"

type BookingProvider = "calendly" | "zoho" | "webhook"

export const BOOKING_CONFIG = {
  // Use Calendly for straightforward calendar scheduling
  // Example: https://calendly.com/yourname/30min
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",

  // Use Zoho Bookings for advanced scheduling with custom workflows
  // Example: https://yourcompany.zoho.com/bookings
  zohoUrl: process.env.NEXT_PUBLIC_ZOHO_BOOKING_URL || "",

  // Use Webhook for custom integration with your own backend
  webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL || "",

  // Default provider
  provider: (process.env.NEXT_PUBLIC_BOOKING_PROVIDER || "calendly") as BookingProvider,
}

/**
 * Submit booking to configured service
 */
export async function submitBooking(data: BookingFormData, provider?: BookingProvider) {
  const activeProvider = provider || BOOKING_CONFIG.provider

  console.log("[v0] Submitting booking to provider:", activeProvider, data)

  try {
    switch (activeProvider) {
      case "calendly":
        return handleCalendlyBooking(data)
      case "zoho":
        return handleZohoBooking(data)
      case "webhook":
        return handleWebhookBooking(data)
      default:
        throw new Error(`Unknown booking provider: ${activeProvider}`)
    }
  } catch (error) {
    console.error("[v0] Booking submission failed:", error)
    throw error
  }
}

/**
 * Open Calendly in a modal window
 */
function handleCalendlyBooking(data: BookingFormData) {
  if (!BOOKING_CONFIG.calendlyUrl) {
    throw new Error("Calendly URL not configured. Please set NEXT_PUBLIC_CALENDLY_URL environment variable.")
  }

  // Pre-fill user information if Calendly supports it via URL params
  const calendlyUrl = new URL(BOOKING_CONFIG.calendlyUrl)
  calendlyUrl.searchParams.append("name", data.fullName)
  calendlyUrl.searchParams.append("email", data.email)

  // Open in new window/tab
  if (typeof window !== "undefined") {
    window.open(calendlyUrl.toString(), "Calendly", "width=720,height=650")
    return { success: true, message: "Redirected to Calendly scheduling" }
  }

  return { success: false, message: "Window not available" }
}

/**
 * Submit to Zoho Bookings API
 */
async function handleZohoBooking(data: BookingFormData) {
  if (!BOOKING_CONFIG.zohoUrl) {
    throw new Error("Zoho Bookings URL not configured. Please set NEXT_PUBLIC_ZOHO_BOOKING_URL environment variable.")
  }

  // Prepare booking payload for Zoho
  const payload = {
    first_name: data.fullName.split(" ")[0],
    last_name: data.fullName.split(" ").slice(1).join(" ") || "",
    email: data.email,
    phone: data.phone,
    company: data.company,
    notes: data.notes,
    preferred_date: data.date?.toISOString().split("T")[0],
    preferred_time: data.preferredTime,
  }

  try {
    // Call Zoho API (you'll need to configure this in your backend)
    const response = await fetch(BOOKING_CONFIG.zohoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Zoho API error: ${response.statusText}`)
    }

    return { success: true, message: "Booking submitted to Zoho Bookings" }
  } catch (error) {
    throw new Error(`Failed to submit to Zoho: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Submit to custom webhook endpoint
 */
async function handleWebhookBooking(data: BookingFormData) {
  if (!BOOKING_CONFIG.webhookUrl) {
    throw new Error("Webhook URL not configured. Please set NEXT_PUBLIC_WEBHOOK_URL environment variable.")
  }

  const payload = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    company: data.company,
    date: data.date?.toISOString(),
    preferredTime: data.preferredTime,
    notes: data.notes,
    submittedAt: new Date().toISOString(),
  }

  try {
    const response = await fetch(BOOKING_CONFIG.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`)
    }

    return { success: true, message: "Booking submitted successfully" }
  } catch (error) {
    throw new Error(`Failed to submit booking: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Open Zoho Bookings in a modal (alternative to API submission)
 */
export function openZohoBookings() {
  if (!BOOKING_CONFIG.zohoUrl) {
    throw new Error("Zoho Bookings URL not configured")
  }

  if (typeof window !== "undefined") {
    window.open(BOOKING_CONFIG.zohoUrl, "ZohoBookings", "width=720,height=650")
  }
}

/**
 * Open Calendly in a modal (direct link)
 */
export function openCalendly() {
  if (!BOOKING_CONFIG.calendlyUrl) {
    throw new Error("Calendly URL not configured")
  }

  if (typeof window !== "undefined") {
    window.open(BOOKING_CONFIG.calendlyUrl, "Calendly", "width=720,height=650")
  }
}
