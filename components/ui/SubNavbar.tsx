"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

import BookingModal from "@/components/booking-modal";
import LanguageSwitcher from "@/components/language-switcher";

export default function SubNavbar() {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <nav className=" sticky top-[60px] z-50 bg-[#006EA6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* MAIN WRAPPER WITH JUSTIFY-BETWEEN */}
          <div className="flex items-center justify-between w-full py-3">

            {/* LEFT NAVIGATION LINKS */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#why"
                className="text-white transition-colors text-base hover:text-gray-200"
              >
                {t("nav.why")}
              </Link>

              <Link
                href="#included"
                className="text-white transition-colors text-base hover:text-gray-200"
              >
                {t("nav.included")}
              </Link>

              <Link
                href="#booking"
                className="text-white transition-colors text-base hover:text-gray-200"
              >
                {t("nav.who")}
              </Link>
            </div>

            {/* <div>
              <Link href="/">
                <img
                  src="/newlogo.svg"
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-[140px] h-10"
                />
              </Link>
            </div> */}

            {/* RIGHT SECTION: LANGUAGE + BOOK NOW */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <Button
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#FCAF1B] hover:bg-[#E59A0E] text-gray-900 font-semibold px-6 py-2 rounded-md transition-all duration-300 hover:shadow-lg"
              >
                {t("nav.bookNow")}
              </Button>
            </div>
          </div>

        </div>
      </nav>

      {/* Booking Modal */}
      {/* {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />} */}
    </>
  );
}
