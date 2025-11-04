"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import { Card } from "@/components/ui/card"
import { Target } from "lucide-react"

const audiences = [
  "Use TallyPrime or Tally.ERP 9 and aim to maximize efficiency",
  "Need local or cloud support for remote teams",
  "Seek to streamline inventory, payroll, or compliance workflows",
  "Plan to migrate to cloud-based Tally hosting",
]

export default function WhoItFor() {
  return (
    <section id="who" className="py-20 sm:py-28 lg:py-32 relative bg-[#DCF2FB]">
      <div className="absolute inset-0  from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollTrigger className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Perfect for Small and Medium Businesses
          </h2>
          <p className="text-lg text-foreground/60">This review is ideal if you...</p>
        </ScrollTrigger>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <ScrollTrigger key={index} animation="fade-in-up" delay={index * 150}>
              <Card className="p-6 sm:p-8 border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] group cursor-pointer">
                <div className="flex gap-4">
                  <Target className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                    {audience}
                  </p>
                </div>
              </Card>
            </ScrollTrigger>
          ))}
        </div>
      </div>
    </section>
  )
}
