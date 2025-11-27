
"use client"

import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import BookingModal, { BookingFormData } from "@/components/booking-modal"
import { Button } from "@/components/ui/button"
import { Calendar, Info, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "sonner"

export default function BookingSection() {
  const { t } = useLanguage()
  const { status } = useSession()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const openModal = () => {
    if (status === "authenticated") {
      setModalOpen(true)
    } else {
      signIn("azure-ad")
    }
  }

  const handleSubmit = async (data: BookingFormData) => {
    setLoading(true)
    try {
      const res = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        toast.error("Booking failed: " + (err?.error?.message || res.statusText))
        return
      }

      toast.success("Booking successful!")
      setShowSuccess(true)
      setModalOpen(false)
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (e) {
      console.error(e)
      toast.error("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden" id="booking">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {showSuccess && (
          <div className="mb-8 p-4 rounded-lg border-2 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">
                  {t("booking.confirmed")}
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  {t("booking.confirmedMsg")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t("booking.title")}
          </h2>
          <p className="text-lg sm:text-xl text-foreground/60">{t("booking.subtitle")}</p>

          {/* ✅ NEW CONTENT */}
          <div className="flex flex-col md:flex-row items-center">
          <p className="text-sm text-foreground/50 max-w-2xl mx-auto mt-4">
            {t("booking.notice")}
          </p>
          <span className="text-7xl">⚠️</span>
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto space-y-3 text-foreground/70">
            <p>{t("booking.trusted")}</p>
            <p>{t("booking.support")}</p>
          </div>
          {/* ✅ END NEW CONTENT */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={openModal}
              className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 font-semibold transition-all duration-300 hover:scale-105 gap-2 px-8 cursor-pointer "
            >
              <Calendar className="w-5 h-5" />
              {t("booking.cta")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#FCAF1B] hover:bg-transparent hover:text-[#FCAF1B] text-[#FCAF1B] font-medium transition-all duration-300 hover:scale-105 gap-2"
            >
              <Info className="w-5 h-5" />
              {t("booking.contact")}
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </section>
  )
}
