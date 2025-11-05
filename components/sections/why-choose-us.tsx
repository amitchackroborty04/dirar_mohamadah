"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import { Card } from "@/components/ui/card"
import { Award, Users, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "24k+",
    label: "Tally Users Trusted",
  },
  {
    icon: Globe,
    number: "50+",
    label: "Countries Served",
  },
  {
    icon: Award,
    number: "100%",
    label: "Certified Partners",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#006EA6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Stats */}
          <div>
            <ScrollTrigger className="mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-white">
                Backed by Tally Expertise and Real Results
              </h2>
              <p className="text-lg  text-white">
                We partner with Tally Solutions' official partner ecosystem to deliver top-tier consultation and
                support. Trusted by businesses across the globe.
              </p>
            </ScrollTrigger>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <ScrollTrigger key={index} animation="slide-in-up" delay={index * 150}>
                  <Card className="p-6 text-center border border-border bg-card  transition-all duration-300 hover:border-primary/50 group">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                    <p className="text-sm text-foreground/60">{stat.label}</p>
                  </Card>
                </ScrollTrigger>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
