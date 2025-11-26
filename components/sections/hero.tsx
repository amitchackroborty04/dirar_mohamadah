"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ScrollTrigger from "@/components/scroll-trigger"
import BookingModal from "@/components/booking-modal"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FFFBE5]">
      {/* Background gradient */}
      <div className="absolute inset-0  from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid  grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 col-span-5">
            {/* <div
              className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-4">
                {t("hero.badge")}
              </span>
            </div> */}

            <h1
              className={`text-4xl sm:text-5xl lg:text-[40px] font-bold leading-tight text-balance transition-all duration-1000 delay-100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("hero.title")}
            </h1>

            <p
              className={`text-lg sm:text-xl text-foreground/70 leading-relaxed text-balance transition-all duration-1000 delay-200 ${
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
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 cursor-pointer  text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {t("hero.cta")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#FCAF1B] text-primary cursor-pointer  font-semibold transition-all duration-300 hover:scale-105 !bg-transparent hover:text-primary"
              >
                {t("hero.learnMore")}
              </Button>
            </div>
          </div>

          {/* Visual */}
          <ScrollTrigger className="col-span-7" animation="fade-in-right" delay={300}>
            <div className="relative h-80 sm:h-96 lg:h-full min-h-[580px]    from-primary/10 to-accent/10 rounded-2xl overflow-hidden group">
              <Image
                src="/newimage.webp"
                alt={t("hero.title")}
                width={1000}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500"
              />
              <div className="absolute inset-0  from-foreground/20 via-transparent to-transparent" />
            </div>
          </ScrollTrigger>
        </div>
      </div>
      {/* Booking Modal */}
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
    </section>
  )
}
