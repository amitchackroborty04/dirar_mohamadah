// components/booking-modal.tsx
"use client"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Check, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"

export interface BookingFormData {
  fullName: string
  email: string
  phone: string
  company: string
  date: string | undefined        
  notes: string
  preferredTime: string
}

interface BookingModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit?: (data: BookingFormData) => Promise<void>
  isLoading?: boolean
}

export default function BookingModal({
  isOpen = false,
  onClose,
  onSubmit,
  isLoading = false,
}: BookingModalProps) {
  const { data: session, status } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    date: undefined,
    notes: "",
    preferredTime: "09:00",
  })
  const { t } = useLanguage()

  // ---------- helpers ----------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    const iso = date ? date.toISOString().split("T")[0] : undefined
    setFormData((prev) => ({ ...prev, date: iso }))
    if (errors.date) {
      const newErrors = { ...errors }
      delete newErrors.date
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = `${t("modal.fullName")} ${t("modal.required")}`
    if (!formData.email.trim()) newErrors.email = `${t("modal.email")} ${t("modal.required")}`
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format"
    if (!formData.date) newErrors.date = `${t("modal.date")} ${t("modal.required")}`
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    // call the parent handler (Booking component)
    if (onSubmit) await onSubmit(formData)
  }

  const formatTimeLabel = (time: string) => {
    const hour = parseInt(time)
    if (hour < 12) return `${hour}:00 AM`
    if (hour === 12) return "12:00 PM"
    return `${hour - 12}:00 PM`
  }

  // ---------- render ----------
  if (status === "loading") return null

  if (!session) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("modal.loginRequired")}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4 py-4">
            <Button onClick={() => signIn("azure-ad")}>{t("modal.signIn")}</Button>
            <Button variant="outline" onClick={onClose}>
              {t("modal.cancel")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-2 border-primary/20">
        <DialogHeader className="sticky top-0 z-50 bg-primary border-b border-primary/30 px-6 py-5 flex flex-row items-center justify-between text-primary-foreground">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-2xl font-bold">{t("modal.title")}</DialogTitle>
            <DialogDescription>{t("modal.subtitle")}</DialogDescription>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Step 1 */}
          <section className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                1
              </span>
              {t("modal.step1")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {t("modal.fullName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {t("modal.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("modal.phone")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t("modal.company")}</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                2
              </span>
              {t("modal.step2")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  {t("modal.date")} <span className="text-red-500">*</span>
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const max = new Date(today)
                    max.setDate(max.getDate() + 60)
                    return date < today || date > max
                  }}
                />
                {errors.date && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">
                  {t("modal.time")} <span className="text-red-500">*</span>
                </Label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  {[
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {formatTimeLabel(t)}
                    </option>
                  ))}
                </select>

                {selectedDate && (
                  <div className="p-4 bg-primary/5 border-2 border-primary/30 rounded-lg">
                    <p className="text-sm font-semibold">{t("modal.slotSelected")}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedDate.toLocaleDateString()} at{" "}
                      <span className="font-semibold text-primary">
                        {formatTimeLabel(formData.preferredTime)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                3
              </span>
              {t("modal.step3")}
            </h3>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder={t("modal.notesPlaceholder")}
              disabled={isLoading}
              rows={4}
              maxLength={500}
              className="resize-none border-2 border-primary/20 focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">
              {formData.notes.length}/500 {t("modal.characters")}
            </p>
          </section>

          <div className="flex gap-3 justify-end pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              {t("modal.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:opacity-90 transition-all cursor-pointer"
            >
              {isLoading ? `⏳ ${t("modal.booking")}` : <span className="flex items-center gap-2"><Check className="w-5 h-5" />{t("modal.confirm")}</span>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}