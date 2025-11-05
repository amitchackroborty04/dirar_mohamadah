

"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="inline-flex items-center rounded-md border text-white p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`px-3 font-semibold transition-all ${
          language === "en"
            ? "bg-[#FCAF1B] text-primary-foreground shadow"
            : "text-white hover:text-foreground "
        }`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("ar")}
        className={`px-3 font-semibold transition-all ${
          language === "ar"
            ? "bg-[#FCAF1B] text-primary-foreground shadow"
            : "text-white hover:text-foreground"
        }`}
      >
        AR
      </Button>
    </div>
  )
}
