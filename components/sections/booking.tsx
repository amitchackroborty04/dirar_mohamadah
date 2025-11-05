"use client"

import { useState } from "react"
import ScrollTrigger from "@/components/scroll-trigger"
import { Button } from "@/components/ui/button"
import BookingModal from "@/components/booking-modal"
import { Calendar, CheckCircle, Info } from "lucide-react"
import type { BookingFormData } from "@/components/booking-modal"

export default function Booking() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleBookingSubmit = (data: BookingFormData) => {
    setIsLoading(true)
    console.log(data)

    // Simulate processing
    setTimeout(() => {
      setShowSuccess(true)
      setIsBookingOpen(false)
      setIsLoading(false)

      // Reset form and success message
      setTimeout(() => setShowSuccess(false), 5000)
    }, 1000)
  }

  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showSuccess && (
          <div className="mb-8 p-4 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-800 rounded-lg animate-fadeInUp">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">Booking Confirmed!</p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  Check the browser console to see your booking details. We'll send you a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <ScrollTrigger animation="fade-in" className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-foreground">
                Ready to Transform Your Tally Setup?
              </h2>
              <p className="text-lg sm:text-xl text-foreground/60 text-balance">
                Book your free 30-minute product review session today. Our experts will analyze your current setup and
                provide personalized recommendations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => {
                  console.log("[v0] Opening booking modal...")
                  setIsBookingOpen(true)
                }}
                className=" bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 hover:from-primary/90 cursor-pointer  hover:to-primary/70 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 gap-2 px-8"
              >
                <Calendar className="w-5 h-5" />
                Book a Review Call
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#FCAF1B] hover:bg-transparent hover:text-primary cursor-pointer  font-semibold transition-all duration-300 hover:scale-105 bg-transparent gap-2"
                onClick={() => console.log("[v0] Contact support clicked")}
              >
                <Info className="w-5 h-5" />
                Learn More
              </Button>
            </div>

            {/* <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <span className="font-semibold">Tip:</span> Open your browser's developer console (F12 or Cmd+Shift+J)
                to see all booking data logged in real-time.
              </p>
            </div> */}
          </ScrollTrigger>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          console.log("[v0] Closing booking modal...")
          setIsBookingOpen(false)
        }}
        onSubmit={handleBookingSubmit}
        isLoading={isLoading}
      />
    </section>
  )
}
