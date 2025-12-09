



"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ScrollTrigger from "@/components/scroll-trigger"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCalendlyRedirect = () => {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_EVENT_LINK

    if (!calendlyUrl) {
      toast.error("Calendly link is missing. Please contact admin.")
      return
    }

    // Open calendly
    window.open(calendlyUrl, "_blank", "noopener,noreferrer")

    toast.success(t("booking.redirecting") || "Redirecting to Calendly...")
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 6000)
  }

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FFFBE5]">
      
      {/* Success Banner */}
      {showSuccess && (
        <div className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[999] p-5 rounded-xl border-2 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 shadow-lg">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-bold text-lg text-green-900 dark:text-green-100">
                {t("booking.confirmed") || "You're being redirected!"}
              </p>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                {t("booking.confirmedMsg") ||
                  "A new tab has opened with your Calendly booking."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-7 items-center">

          {/* LEFT TEXT AREA */}
          <div className="space-y-5 sm:space-y-7 lg:space-y-8 col-span-1 lg:col-span-5">

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-[33px] font-bold leading-tight transition-all duration-1000 delay-100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("hero.title")}
            </h1>

            <p
              className={`text-[16px] sm:text-[18px] text-foreground/70 leading-relaxed transition-all duration-1000 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("hero.description")}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >

              {/* === CTA BUTTON WITH SAME EXACT LOGIC === */}
              <Button
                size="lg"
                onClick={handleCalendlyRedirect}
                className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 cursor-pointer text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {t("hero.cta") || "Book a Free Consultation"}
              </Button>

              {/* LEARN MORE BUTTON */}
              {/* <Button
                variant="outline"
                size="lg"
                className="border-[#FCAF1B] hover:bg-transparent text-primary font-semibold transition-all duration-300 hover:scale-105 bg-transparent hover:text-primary"
              >
                {t("hero.learnMore")}
              </Button> */}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <ScrollTrigger 
            className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end"
            animation="fade-in-right"
            delay={300}
          >
            <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[580px] rounded-2xl overflow-hidden group">
              <Image
                src="/newimage.webp"
                alt={t("hero.title")}
                width={1000}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              />
            </div>
          </ScrollTrigger>

        </div>
      </div>
    </section>
  )
}
