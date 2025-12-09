// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useLanguage } from "@/contexts/language-context";

// import BookingModal from "@/components/booking-modal";
// import LanguageSwitcher from "@/components/language-switcher";

// export default function SubNavbar() {
//   const { t } = useLanguage();
//   const [isBookingOpen, setIsBookingOpen] = useState(false);

//   return (
//     <>
//       <nav className=" sticky top-[60px] z-50 bg-[#006EA6]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           {/* MAIN WRAPPER WITH JUSTIFY-BETWEEN */}
//           <div className="flex items-center justify-between w-full py-3">

//             {/* LEFT NAVIGATION LINKS */}
//             <div className="hidden md:flex items-center gap-6">
//               <Link
//                 href="#why"
//                 className="text-white transition-colors text-base hover:text-gray-200"
//               >
//                 {t("nav.why")}
//               </Link>

//               <Link
//                 href="#included"
//                 className="text-white transition-colors text-base hover:text-gray-200"
//               >
//                 {t("nav.included")}
//               </Link>

//               <Link
//                 href="#booking"
//                 className="text-white transition-colors text-base hover:text-gray-200"
//               >
//                 {t("nav.who")}
//               </Link>
//             </div>

//             {/* <div>
//               <Link href="/">
//                 <img
//                   src="/newlogo.svg"
//                   alt="logo"
//                   width={1000}
//                   height={1000}
//                   className="w-[140px] h-10"
//                 />
//               </Link>
//             </div> */}

//             {/* RIGHT SECTION: LANGUAGE + BOOK NOW */}
//             <div className="flex items-center gap-4">
//               <LanguageSwitcher />

//               <Button
//                 onClick={() => setIsBookingOpen(true)}
//                 className="bg-[#FCAF1B] hover:bg-[#E59A0E] text-gray-900 font-semibold px-6 py-2 rounded-md transition-all duration-300 hover:shadow-lg"
//               >
//                 {t("nav.bookNow")}
//               </Button>
//             </div>
//           </div>

//         </div>
//       </nav>

//       {/* Booking Modal */}
//       {/* {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />} */}
//     </>
//   );
// }


"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

import LanguageSwitcher from "@/components/language-switcher";

export default function SubNavbar() {
  const { t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCalendlyRedirect = () => {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_EVENT_LINK;

    if (!calendlyUrl) {
      toast.error("Calendly link is missing. Please contact admin.");
      return;
    }

    // open calendly in new tab
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");

    toast.success(t("booking.redirecting") || "Redirecting to Calendly...");
    setShowSuccess(true);

    // auto-hide success after 6s
    setTimeout(() => setShowSuccess(false), 6000);
  };

  return (
    <>
      {/* Success message same as BookingSection */}
      {showSuccess && (
        <div className="fixed top-[75px] left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[999] p-5 rounded-xl border-2 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 shadow-lg">
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

      <nav className="sticky top-[60px] z-50 bg-[#006EA6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full py-3">

            {/* LEFT LINKS */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#why" className="text-white text-base hover:text-gray-200">
                {t("nav.why")}
              </Link>
              <Link href="#included" className="text-white text-base hover:text-gray-200">
                {t("nav.included")}
              </Link>
              <Link href="#booking" className="text-white text-base hover:text-gray-200">
                {t("nav.who")}
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              {/* Same booking logic as main booking button */}
              <Button
                onClick={handleCalendlyRedirect}
                className="bg-[#FCAF1B] hover:bg-[#E59A0E] cursor-pointer text-gray-900 font-semibold px-6 py-2 rounded-md transition-all duration-300 hover:shadow-lg"
              >
                {t("nav.bookNow")}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
