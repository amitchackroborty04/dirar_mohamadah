

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { SessionProviders } from "@/components/sections/Provider"
// import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tally Product Review | Schedule Your Free Session",
  description:
    "Transform your Tally setup with a free personalized product review. Identify inefficiencies, enhance compliance, and boost team productivity.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${_geist.className} antialiased`}
      >
        <SessionProviders>
          <Providers>{children}</Providers>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              className: "bg-white text-black border border-gray-200",
            }}
          />
        </SessionProviders>
        <Analytics />
      </body>
    </html>
  )
}
