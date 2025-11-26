"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Award, Users, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "7.5M+",
    label: {
      en: "Tally Users Trusted",
      ar: "مستخدمو تالي يثقون بنا",
    },
  },
  {
    icon: Globe,
    number: "120+",
    label: {
      en: "Countries Served",
      ar: "دول نخدمها",
    },
  },
  {
    icon: Award,
    number: "27K",
    label: {
      en: "Certified Partners",
      ar: "شركاء معتمدون",
    },
  },
]

export default function WhyChooseUs() {
  const { t, language } = useLanguage()

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#006EA6] relative" id="whychoose">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Text */}
          <ScrollTrigger>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              {t("whychoose.title")}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              {t("whychoose.description")}
            </p>
          </ScrollTrigger>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <ScrollTrigger key={index} animation="slide-in-up" delay={index * 150}>
                  <Card className="p-6 h-full flex flex-col justify-center text-center border border-border bg-card transition-all duration-300 hover:border-primary/50 group">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                      {stat.number}
                    </div>
                    <p className="text-sm text-foreground/70">
                      {stat.label[language]}
                    </p>
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
