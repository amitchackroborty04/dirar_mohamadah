


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/booking-modal";
import LanguageSwitcher from "@/components/language-switcher";
import Image from "next/image";

import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 py-3 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-[#FFFBE5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link href="/">
              <Image
                src="/tally-logo-black.svg"
                alt="logo"
                width={140}
                height={40}
                className="w-[140px] h-10"
              />
            </Link>

            {/* ==== MOBILE MENU BUTTON ==== */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md bg-[#FCAF1B] hover:bg-[#eaa517] transition">
                    <Menu size={24} className="text-black" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-[85%] sm:w-[380px] px-6 py-6 bg-[#FFFBE5] shadow-xl"
                >
                  {/* Sheet Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Menu</h2>
                 
                  </div>

                  {/* LINKS */}
                  <div className="space-y-4">

                    <SheetClose asChild>
                      <Link
                        href="#why"
                        className="block text-lg font-medium text-gray-900 hover:text-[#006EA6] transition"
                      >
                        Why Review
                      </Link>
                    </SheetClose>

                    <div className="border-b" />

                    <SheetClose asChild>
                      <Link
                        href="#included"
                        className="block text-lg font-medium text-gray-900 hover:text-[#006EA6] transition"
                      >
                        Free Consultation
                      </Link>
                    </SheetClose>

                    <div className="border-b" />

                    <SheetClose asChild>
                      <Link
                        href="#booking"
                        className="block text-lg font-medium text-gray-900 hover:text-[#006EA6] transition"
                      >
                        Book Your Free Consultation
                      </Link>
                    </SheetClose>

                    <div className="border-b" />
                  </div>

                

                  {/* BOOK NOW BUTTON */}
                  <SheetClose asChild>
                    <Button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full mt-6 bg-[#FCAF1B] hover:bg-[#E59A0E] text-gray-900 font-semibold py-3 rounded-md shadow-md"
                    >
                      Book Now
                    </Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </nav>

      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
    </>
  );
}
