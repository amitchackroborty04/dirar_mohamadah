"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Check } from "lucide-react"

export default function WhatIncluded() {
  const { t } = useLanguage()

  const points = [
    t("consult.point1"),
    t("consult.point2"),
    t("consult.point3"),
    t("consult.point4"),
    t("consult.point5"),
  ]

  return (
    <section id="included" className="py-20 sm:py-28 lg:py-32 relative bg-[#006EA6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <ScrollTrigger animation="fade-in-left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                {t("consult.title")}
              </h2>
              <p className="text-lg text-white mb-6">{t("consult.subtitle")}</p>
              {/* <p className="text-white/90 mb-4">{t("consult.description")}</p>
              <p className="text-white/80">{t("consult.note")}</p> */}
            </div>
          </ScrollTrigger>

          {/* Right Checklist */}
          <div className="space-y-4">
            {points.map((item, index) => (
              <ScrollTrigger
                key={index}
                animation="fade-in-up"
                delay={index * 100}
                className="flex gap-3 items-start group"
              >
                <Check className="w-5 h-5 text-white mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-white group-hover:text-foreground transition-colors">{item}</p>
              </ScrollTrigger>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <ScrollTrigger className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 h-12 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            {t("consult.cta")}
          </Button>
        </ScrollTrigger>
      </div>
    </section>
  )
}
