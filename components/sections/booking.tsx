

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Info, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { toast } from "sonner";

export default function BookingSection() {
  const { t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCalendlyRedirect = () => {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_EVENT_LINK;

    if (!calendlyUrl) {
      toast.error("Calendly link is missing. Please contact admin.");
      return;
    }

    // open calendly directly
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");

    toast.success(t("booking.redirecting") || "Redirecting to Calendly...");
    setShowSuccess(true);

    // hide after 6s
    setTimeout(() => setShowSuccess(false), 6000);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden" id="booking">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-10 p-6 rounded-xl border-2 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 shadow-lg">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400 flex-shrink-0" />
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

        <div className="text-center space-y-10">

          {/* Title + Subtitle */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {t("booking.title")}
            </h2>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto">
              {t("booking.subtitle")}
            </p>
          </div>

          {/* Notice */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
            <p className="text-sm sm:text-base text-foreground/60 max-w-2xl leading-relaxed">
              {t("booking.notice")}
            </p>
            <span className="text-7xl">⚠️</span>
          </div>

          {/* Trust Text */}
          <div className="mt-10 text-center max-w-3xl mx-auto space-y-4 text-foreground/70 text-base sm:text-lg">
            <p>{t("booking.trusted")}</p>
            <p>{t("booking.support")}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">

            {/* Main Booking Button (Direct Redirect) */}
            <Button
              size="lg"
              onClick={handleCalendlyRedirect}
              className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 text-black font-medium cursor-pointer text-lg px-10 py-7 gap-3 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Calendar className="w-7 h-7" />
              {t("booking.cta") || "Book a Free Consultation"}
            </Button>
          
          </div>
        </div>
      </div>
    </section>
  );
}
