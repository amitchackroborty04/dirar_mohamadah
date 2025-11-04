"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BookingModal from "@/components/booking-modal"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 bg-[#006EA6]! py-3 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-semibold text-xl text-primary hover:text-primary/80 transition-colors">
              {/* {t("nav.brand")} */}
              <Image src="/tally-logo-black.svg" alt="logo" width={1000} height={1000}  className="w-[140px] h-[120px]4"/>
            </Link>

            <div className="hidden md:flex items-center gap-8 ">
              <Link href="#why" className="text-white  transition-colors text-base">
                {t("nav.why")}
              </Link>
              <Link href="#included" className="text-white  transition-colors text-base">
                {t("nav.included")}
              </Link>
              <Link href="#who" className="text-white  transition-colors text-base">
                {t("nav.who")}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer h-[42px] px-6"
              >
                {t("nav.bookNow")}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
    </>
  )
}
