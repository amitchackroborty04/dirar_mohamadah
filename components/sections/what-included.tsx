"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const items = [
  "One-on-one consultation with a certified Tally advisor",
  "Complete assessment of your Tally configuration",
  "Actionable report highlighting gaps and recommendations",
  "Guidance on new features (Cloud Access, TallyPrime Go, Remote Access)",
  "Follow-up implementation guidance, if required",
]

export default function WhatIncluded() {
  return (
    <section id="included" className="py-20 sm:py-28 lg:py-32  relative bg-[#006EA6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <ScrollTrigger animation="fade-in-left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance text-white">Here's What You'll Get</h2>
              <p className="text-lg  mb-8 text-white">
                Our comprehensive free review includes everything you need to optimize your Tally setup.
              </p>
            </div>
          </ScrollTrigger>

          {/* Right Checklist */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <ScrollTrigger
                key={index}
                animation="fade-in-up"
                delay={index * 100}
                className="flex gap-3 items-start group"
              >
                <Check className="w-5 h-5 text-white  mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-white group-hover:text-foreground transition-colors">{item}</p>
              </ScrollTrigger>
            ))}
          </div>
        </div>

        <ScrollTrigger className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-[#FCAF1B] hover:bg-[#FCAF1B]/90 h-12 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            Reserve Your Slot Now
          </Button>
        </ScrollTrigger>
      </div>
    </section>
  )
}
