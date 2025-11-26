"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const translations = {
  en: {
    // Navigation
    "nav.brand": "TallyPrime",
    "nav.why": "Why Review",
    "nav.included": "Free Consultation",
    "nav.who": "Book your free consultation",
    "nav.bookNow": "Book Now",

    // Hero Section
    "hero.badge": "Free Product Review",
    "hero.title":
      "VAT-Ready Business Accounting & Management Software for Companies in Saudi Arabia & the GCC",
    "hero.description":
      "Trusted by 7,500,000+ active users across 120+ countries — TallyPrime helps you automate accounting, manage inventory, get real-time financial insights, & ensure full VAT compliance.",
    "hero.cta": "Book a Free Consultation",
    "hero.learnMore": "Schedule a Personalized Demo",

    // Add to EN
    "key.title": "Key Value Proposition",
    "key.subtitle": "TallyPrime empowers your business to grow faster with:",
    "key.point1": "Automated accounting & financial workflows",
    "key.point2": "Fast, accurate VAT-compliant billing & invoicing",
    "key.point3": "Inventory & stock control across multiple locations",
    "key.point4": "Real-time financial & MIS reporting",
    "key.point5": "Multi-user & multi-branch support",
    "key.point6": "Simple & intuitive interface",
    "key.point7": "Local implementation, training & support",

    // What's Included Section
    "consult.title": "Free Consultation Includes:",
    // "consult.subtitle": "During your complimentary session, you will receive:",
    "consult.subtitle": "If you're currently using Excel, manual bookkeeping, or need a system upgrade, this session will show how TallyPrime can streamline operations and accelerate business.",
    "consult.point1":
      "A personalized system walkthrough based on your industry",
    "consult.point2": "Recommended accounting & inventory workflows",
    "consult.point3": "VAT best-practice guidance tailored to Saudi compliance",
    "consult.point4": "Pricing, licensing, & implementation guidance",
    "consult.point5": "A live, customized TallyPrime demo",
    "consult.description":
      "This consultation is designed specifically for business decision-makers evaluating digital transformation & automation.",
    "consult.note":
      "If you're currently using Excel, manual bookkeeping, or outdated systems, this session will show how TallyPrime can streamline operations & accelerate business growth.",
    "consult.cta": "Reserve Your Slot Now",

    // Who It's For Section
    // EN
    "trust.title": "Trusted Worldwide",
    "trust.subtitle":
      "Trusted by businesses in retail, trading, contracting, manufacturing, & many more industries across 120+ countries.",
    "trust.point1": "Seamless setup & configuration",
    "trust.point2": "Live training for your team",
    "trust.point3": "Ongoing technical support",
    "trust.point4": "Smooth onboarding for immediate productivity",
    "trust.note":
      "Get value from day one — with a system your team will actually enjoy using.",

    // Why Choose Us Section
    // EN
    "whychoose.title": "Why Businesses Choose TallyPrime",
    "whychoose.description":
      "Smart billing, real-time business insights, seamless inventory management, & complete VAT compliance — all in one powerful system that’s easy to use & scalable as your business grows.",


    // Booking Section
    "booking.title": "Book your free consultation now!",
    "booking.subtitle":
      "Book your free 30-minute product review session today. Our experts will analyze your current setup & provide personalized recommendations.",
    "booking.cta": "Book a Review Call",
    "booking.contact": "Contact Support",
    "booking.tip":
      "Open your browser's developer console (F12 or Cmd+Shift+J) to see all booking data logged in real-time.",
    "booking.confirmed": "Booking Confirmed!",
    "booking.confirmedMsg":
      "Check the browser console to see your booking details. We'll send you a confirmation email shortly.",
    "booking.notice":
      "Please note: Consultation slots are reserved for businesses actively planning to implement TallyPrime. If you are not currently evaluating a business software upgrade, we kindly ask that you do not submit this form.",
    "booking.trusted":
      "Trusted by businesses in retail, trading, manufacturing, contracting, & more across more than 120 countries.",
    "booking.support":
      "Our certified team ensures seamless implementation, live training, ongoing support, & smooth onboarding — helping your business get immediate value from day one.",


    // Booking Modal
    "modal.title": "Book Your Free Review",
    "modal.subtitle":
      "Schedule your 30-minute personalized Tally product review session",
    "modal.step1": "Your Information",
    "modal.step2": "Select Your Preferred Time",
    "modal.step3": "Additional Information",
    "modal.fullName": "Full Name",
    "modal.email": "Email",
    "modal.phone": "Phone Number",
    "modal.company": "Company Name",
    "modal.date": "Date",
    "modal.time": "Preferred Time",
    "modal.notes": "Questions or Specific Challenges (Optional)",
    "modal.notesPlaceholder":
      "Tell us about your Tally setup, specific challenges, or questions you'd like to discuss...",
    "modal.cancel": "Cancel",
    "modal.confirm": "Confirm Booking",
    "modal.slotSelected": "Slot Selected",
    "modal.required": "required",
    "modal.booking": "Booking...",
    "modal.characters": "characters",

    // ✅ Footer (Full content added)
   // ✅ Footer (Updated content)
"footer.description": "Maximize your Tally potential with expert guidance.",
"footer.productTitle": "Product",
"footer.features": "Why Review",
"footer.pricing": "Key Value Proposition",
"footer.security": "Free Consultation",
"footer.companyTitle": "Company",
"footer.about": "Includes",
"footer.blog": "Trusted Worldwide",
"footer.contact": "Why Choose",
"footer.legalTitle": "Legal",
"footer.privacy": "Book your free consultation",
// "footer.terms": "",
// "footer.cookies": "",
"footer.copyright": "TallyPrime. All rights reserved.",

  },

  ar: {
    // Navigation
    "nav.brand": "تالي برايم",
    "nav.why": "لماذا المراجعة",
    "nav.included": "استشارة مجانية",
    "nav.who": "احجز استشارتك المجانية",
    "nav.bookNow": "احجز الآن",

    // Hero Section
    // Hero Section
    "hero.badge": "مراجعة منتج مجانية",
    "hero.title": "برنامج محاسبة وإدارة أعمال متوافق مع ضريبة القيمة المضافة للشركات في السعودية ودول الخليج",
    "hero.description":
      "موثوق به من قبل أكثر من 7,500,000 مستخدم نشط في أكثر من 130 دولة — يساعدك TallyPrime على أتمتة المحاسبة، وإدارة المخزون، والحصول على تقارير مالية فورية، وضمان الامتثال الكامل لضريبة القيمة المضافة.",
    "hero.cta": "احجز استشارة مجانية",
    "hero.learnMore": "حدد موعد لعرض مخصص",


    // Add to AR
    "key.title": "القيمة الأساسية",
    "key.subtitle":
      "يمكن لبرنامج تالي برايم تمكين عملك من النمو بشكل أسرع من خلال:",
    "key.point1": "أتمتة المحاسبة والعمليات المالية",
    "key.point2":
      "فواتير ومحاسبة ضريبية دقيقة ومتوافقة مع ضريبة القيمة المضافة",
    "key.point3": "إدارة المخزون عبر مواقع متعددة",
    "key.point4": "تقارير مالية وتشغيلية في الوقت الحقيقي",
    "key.point5": "دعم تعدد المستخدمين والفروع",
    "key.point6": "واجهة بسيطة وسهلة الاستخدام",
    "key.point7": "تنفيذ وتدريب ودعم محلي",

    // What's Included Section
    // AR
    "consult.title": "تشمل الاستشارة المجانية:",
    // "consult.subtitle": "أثناء جلستك المجانية، ستحصل على:",
    "consult.subtitle": "إذا كنت تستخدم Excel، أو تقوم بمسك الدفاتر يدويًا، أو تحتاج إلى ترقية للنظام، فسوف توضح لك هذه الجلسة كيف يمكن لبرنامج TallyPrime تحسين العمليات وتسريع نمو الأعمال.",
    "consult.point1": "عرض مخصص للنظام بناءً على مجال عملك",
    "consult.point2": "توصيات لسير العمل المحاسبي وإدارة المخزون",
    "consult.point3":
      "إرشادات أفضل الممارسات لضريبة القيمة المضافة متوافقة مع أنظمة السعودية",
    "consult.point4": "إرشادات التسعير والتراخيص والتنفيذ",
    "consult.point5": "عرض حي مخصص لبرنامج TallyPrime",
    "consult.description":
      "تم تصميم هذه الاستشارة خصيصاً لصناع القرار الذين يقيمون التحول الرقمي والأتمتة.",
    "consult.note":
      "إذا كنت تستخدم Excel أو الدفاتر اليدوية أو أنظمة قديمة، فستوضح لك هذه الجلسة كيف يمكن لـ TallyPrime تبسيط العمليات وتسريع نمو عملك.",
    "consult.cta": "احجز موعدك الآن",

    // Who It's For Section
    // AR
    "trust.title": "ثقة عالمية",
    "trust.subtitle":
      "موثوق من قبل الشركات في مجالات التجزئة والتجارة والمقاولات والتصنيع والعديد من الصناعات الأخرى في أكثر من 120 دولة.",
    "trust.point1": "إعداد وتكوين سلس",
    "trust.point2": "تدريب مباشر لفريقك",
    "trust.point3": "دعم فني مستمر",
    "trust.point4": "تأهيل سلس لإنتاجية فورية",
    "trust.note":
      "احصل على قيمة من اليوم الأول — مع نظام سيحب فريقك استخدامه فعلاً.",

    // Why Choose Us Section
    // AR
    "whychoose.title": "لماذا تختار الشركات برنامج تالي برايم؟",
    "whychoose.description":
      "فواتير ذكية، رؤى فورية للأعمال، إدارة سلسة للمخزون، والامتثال الكامل لضريبة القيمة المضافة — كل ذلك في نظام واحد قوي سهل الاستخدام وقابل للتوسع مع نمو عملك.",


    // Booking Section
    "booking.title": "احجز استشارتك المجانية الآن",
    "booking.subtitle":
      "احجز جلسة مراجعة منتج مجانية مدتها 30 دقيقة اليوم. سيقوم خبراؤنا بتحليل الإعداد الحالي الخاص بك وتقديم توصيات مخصصة.",
    "booking.cta": "احجز مكالمة مراجعة",
    "booking.contact": "التواصل مع الدعم",
    "booking.tip":
      "افتح وحدة تحكم المتصفح الخاصة بك (F12 أو Cmd+Shift+J) لرؤية جميع بيانات الحجز المسجلة في الوقت الفعلي.",
    "booking.confirmed": "تم تأكيد الحجز!",
    "booking.confirmedMsg":
      "تحقق من وحدة تحكم المتصفح الخاصة بك لرؤية تفاصيل الحجز الخاص بك. سنرسل لك رسالة بريد إلكتروني للتأكيد قريباً.",
    "booking.notice":
      "يرجى الملاحظة: يتم تخصيص مواعيد الاستشارة للشركات التي تخطط فعلياً لتطبيق برنامج TallyPrime. إذا لم تكن تقوم حالياً بتقييم ترقية نظام عملك، فنرجو عدم إرسال هذا النموذج.",
    "booking.trusted":
      "موثوق لدى الشركات في مجالات التجارة والتجزئة والتصنيع والمقاولات وغيرها في أكثر من 120 دولة.",
    "booking.support":
      "يضمن فريقنا المعتمد تنفيذًا سلسًا، تدريبًا مباشراً، دعمًا مستمرًا، وتفعيلًا سريعًا — لمساعدة عملك على تحقيق القيمة من اليوم الأول.",


    // Booking Modal
    "modal.title": "احجز مراجعتك المجانية",
    "modal.subtitle": "حدد جلسة مراجعة منتج تالي الشخصية مدتها 30 دقيقة",
    "modal.step1": "معلوماتك",
    "modal.step2": "اختر الوقت المفضل لديك",
    "modal.step3": "معلومات إضافية",
    "modal.fullName": "الاسم الكامل",
    "modal.email": "البريد الإلكتروني",
    "modal.phone": "رقم الهاتف",
    "modal.company": "اسم الشركة",
    "modal.date": "التاريخ",
    "modal.time": "الوقت المفضل",
    "modal.notes": "أسئلة أو تحديات محددة (اختياري)",
    "modal.notesPlaceholder":
      "أخبرنا عن إعداد تالي الخاص بك والتحديات المحددة والأسئلة التي تود مناقشتها...",
    "modal.cancel": "إلغاء",
    "modal.confirm": "تأكيد الحجز",
    "modal.slotSelected": "تم اختيار الفتحة",
    "modal.required": "مطلوب",
    "modal.booking": "جاري الحجز...",
    "modal.characters": "أحرف",

    // ✅ Footer (Full content added)
   // ✅ Footer (Arabic content)
"footer.description": "استفد إلى أقصى حد من إمكانيات Tally مع الإرشادات الخبيرة.",
"footer.productTitle": "المنتج",
"footer.features": "لماذا المراجعة",
"footer.pricing": "القيمة المقترحة الرئيسية",
"footer.security": "استشارة مجانية",
"footer.companyTitle": "الشركة",
"footer.about": "يشمل",
"footer.blog": "موثوق عالميًا",
"footer.contact": "لماذا تختار",
"footer.legalTitle": "القانوني",
"footer.privacy": "احجز استشارتك المجانية",
"footer.terms": "",
"footer.cookies": "",
"footer.copyright": "TallyPrime. جميع الحقوق محفوظة.",

  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language | null;
      if (saved === "ar" || saved === "en") {
        setLanguage(saved);
      }
      setMounted(true);
    }
  }, []);

  // ✅ Update <html> attributes & localStorage
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language, mounted]);

  const t = (key: string): string => {
    const translation = (translations[language] as Record<string, string>)[key];
    return translation || key; // fallback
  };

  if (!mounted) {
    // prevent hydration mismatch
    return null;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir: language === "ar" ? "rtl" : "ltr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
