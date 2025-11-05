"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import FeatureCard from "@/components/feature-card"
import { CheckCircle2, TrendingUp, Shield } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Identify Inefficiencies",
    description: "Expert assessment of your current setup to discover where time or money is being lost.",
  },
  {
    icon: Shield,
    title: "Enhance Compliance & Reporting",
    description: "Ensure accounting, inventory, and tax reports meet the latest local and international standards.",
  },
  {
    icon: TrendingUp,
    title: "Boost Team Productivity",
    description: "Learn advanced shortcuts and best practices for faster, smoother operations.",
  },
]

export default function WhyReview() {
  return (
    <section id="why" className="py-20 sm:py-28 lg:py-32 relative bg-[#DCF2FB]">
      <div className="absolute inset-0  from-transparent via-primary/2 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollTrigger className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Why a Tally Review Can Transform Your Business
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Discover how our certified experts can help optimize your Tally setup
          </p>
        </ScrollTrigger>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollTrigger key={index} animation="fade-in-up" delay={index * 150}>
              <FeatureCard {...feature} />
            </ScrollTrigger>
          ))}
        </div>
      </div>
    </section>
  )
}
