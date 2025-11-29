
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {  Check, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";


export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  date: string | undefined;
  notes: string;
  preferredTime: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function BookingModal({ isOpen, onClose, onSubmit, isLoading = false }: BookingModalProps) {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    date: undefined,
    notes: "",
    preferredTime: "10:00",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, date: date ? date.toISOString().split("T")[0] : undefined }));
    if (errors.date) setErrors(prev => { const { date: _, ...rest } = prev; return rest; });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = t("modal.required");
    if (!formData.email.trim()) newErrors.email = t("modal.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.date) newErrors.date = t("modal.required");
    if (!formData.preferredTime) newErrors.preferredTime = t("modal.required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  const formatTime = (time: string) => {
    const [h] = time.split(":");
    const hour = parseInt(h);
    if (hour === 0) return "12:00 AM";
    if (hour === 12) return "12:00 PM";
    if (hour > 12) return `${hour - 12}:00 PM`;
    return `${hour}:00 AM`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-background  border-b pb-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{t("modal.title")}</DialogTitle>
              <DialogDescription>{t("modal.subtitle")}</DialogDescription>
            </div>
       
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Step 1 */}
          <section className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">1</span>
              {t("modal.step1")}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("modal.fullName")} <span className="text-red-500">*</span></Label>
                <Input name="fullName" value={formData.fullName} onChange={handleChange} disabled={isLoading} />
                {errors.fullName && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <Label>{t("modal.email")} <span className="text-red-500">*</span></Label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} disabled={isLoading} />
                {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label>{t("modal.phone")}</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label>{t("modal.company")}</Label>
                <Input name="company" value={formData.company} onChange={handleChange} disabled={isLoading} />
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">2</span>
              {t("modal.step2")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>{t("modal.date")} <span className="text-red-500">*</span></Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date(); today.setHours(0,0,0,0);
                    const max = new Date(); max.setDate(max.getDate() + 90);
                    return date < today || date > max;
                  }}
                  className="rounded-md border"
                />
                {errors.date && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
              </div>
              <div className="space-y-4">
                <Label>{t("modal.time")} <span className="text-red-500">*</span></Label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => (
                    <option key={t} value={t}>{formatTime(t)}</option>
                  ))}
                </select>
                {selectedDate && (
                  <div className="p-4 bg-primary/5 border rounded-lg">
                    <p className="text-sm font-medium">{selectedDate.toLocaleDateString()} at {formatTime(formData.preferredTime)}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">3</span>
              {t("modal.step3")}
            </h3>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder={t("modal.notesPlaceholder")}
              rows={4}
              maxLength={500}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">{formData.notes.length}/500 characters</p>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              {t("modal.cancel")}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Booking..." : <><Check className="w-4 h-4 mr-2" /> {t("modal.confirm")}</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}