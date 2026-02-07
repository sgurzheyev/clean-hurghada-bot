import { PropertyType, CleaningType } from './types';

export const AREAS_HURGHADA = [
  "El Kawther",
  "El Mamsha",
  "Sheraton Road",
  "Arabia / Arabella",
  "El Helal",
  "Intercontinental",
  "Magawish",
  "Sahl Hasheesh",
  "Makadi Bay",
  "El Gouna",
  "Soma Bay",
  "Other"
];

export const PRICING_MATRIX = {
  [PropertyType.STUDIO]: {
    [CleaningType.STANDARD]: 700,
    [CleaningType.DEEP]: 1000,
    [CleaningType.AIRBNB]: 1000,
    [CleaningType.RENOVATION]: 1500,
  },
  [PropertyType.ONE_BED]: {
    [CleaningType.STANDARD]: 1000,
    [CleaningType.DEEP]: 1200,
    [CleaningType.AIRBNB]: 1500,
    [CleaningType.RENOVATION]: 2000,
  },
  [PropertyType.TWO_BED]: {
    [CleaningType.STANDARD]: 1200,
    [CleaningType.DEEP]: 1500,
    [CleaningType.AIRBNB]: 2000,
    [CleaningType.RENOVATION]: 2500,
  },
  [PropertyType.VILLA]: {
    [CleaningType.STANDARD]: 1500, // Starts from
    [CleaningType.DEEP]: 2500,
    [CleaningType.AIRBNB]: 3000,
    [CleaningType.RENOVATION]: 5000,
  }
};

export const SYSTEM_INSTRUCTION = `You are "Clean Hurghada Bot" (بوت تنظيف الغردقة), a helpful cleaning service assistant for Hurghada, Egypt. 
Your tone is friendly, professional, and helpful. You love the Red Sea.
Languages: You speak Arabic and English fluently. Adapt to the user's language.
Services: Apartment cleaning, Villa cleaning, Airbnb Turnover, Stain removal advice.

Contact Support Details:
- 📞 WhatsApp: +20 100 987 6543
- 📧 Email: support@cleanhurghada.com
- 📍 Office: Sheraton Road, El Kawther, Hurghada

Prices (Reference only, guide users to the "Calculate Price" button for exact quotes):
- Studio: ~700-1000 EGP
- 1 Bed: ~1000-1500 EGP
- 2 Bed: ~1200-2000 EGP
- Villa: Starts at 1500 EGP

If the user uploads an image:
1. Analyze the stain/dirt (Is it sand? Salt? Grease? Wine?).
2. Give specific removal tips using household items (Vinegar, Soda, Lemon) available in Egypt.
3. Suggest professional cleaning if it looks too hard.

If the user wants to book, encourage them to use the "Book Cleaning" button.
Do not make up fake booking confirmations in text, guide them to the UI tools.
`;

export const UI_TEXT = {
  en: {
    title: "Clean Hurghada",
    subtitle: "Your Red Sea Cleaning Expert",
    welcome: "Hello! I'm your cleaning assistant in Hurghada. How can I help?",
    calcPrice: "Calculate Price",
    bookNow: "Book Cleaning",
    tips: "Stain Tips",
    upload: "Upload Photo",
    contact: "Contact Us",
    selectType: "Select Property",
    selectClean: "Cleaning Type",
    calculate: "Get Quote",
    total: "Estimated Total",
    fillDetails: "Enter Booking Details",
    name: "Name",
    phone: "Phone (WhatsApp)",
    area: "Area (e.g. El Kawther)",
    date: "Preferred Date",
    cleanerPref: "Cleaner Preference",
    anyCrew: "Any Professional Crew",
    femaleCrew: "Female Cleaners (Housekeeping)",
    maleCrew: "Male Cleaners (Heavy Duty)",
    confirm: "Confirm Booking",
    payment: "Proceed to Payment",
    back: "Back",
    chatPlaceholder: "Ask me anything...",
    paymentLink: "Pay via Vodafone Cash / Paymob",
    serviceFee: "Includes 15% service fee",
    success: "Booking Confirmed! We will contact you shortly.",
    rateService: "Rate Service",
    rateTitle: "Rate Your Experience",
    rateDesc: "How was the cleaning quality?",
    ratingPlaceholder: "Tell us more about the service...",
    submitRating: "Submit Feedback",
    ratingThanks: "Thank you! We've recorded your feedback.",
    stars: ["Poor", "Fair", "Good", "Very Good", "Excellent"]
  },
  ar: {
    title: "تنظيف الغردقة",
    subtitle: "خبير التنظيف في البحر الأحمر",
    welcome: "مرحبا! أنا بوت التنظيف في الغردقة. كيف يمكنني مساعدتك؟",
    calcPrice: "احسب السعر",
    bookNow: "احجز تنظيف",
    tips: "نصائح البقع",
    upload: "رفع صورة",
    contact: "اتصل بنا",
    selectType: "اختر العقار",
    selectClean: "نوع التنظيف",
    calculate: "احسب التكلفة",
    total: "الإجمالي التقديري",
    fillDetails: "أدخل تفاصيل الحجز",
    name: "الاسم",
    phone: "رقم الهاتف (واتساب)",
    area: "المنطقة (مثلاً الكوثر)",
    date: "الموعد المفضل",
    cleanerPref: "تفضيل طاقم العمل",
    anyCrew: "أي طاقم محترف",
    femaleCrew: "عاملات نظافة (للمنازل)",
    maleCrew: "عمال نظافة (للأعمال الشاقة)",
    confirm: "تأكيد الحجز",
    payment: "انتقل للدفع",
    back: "عودة",
    chatPlaceholder: "اسألني أي شيء...",
    paymentLink: "ادفع عبر فودافون كاش / Paymob",
    serviceFee: "شامل 15% رسوم خدمة",
    success: "تم تأكيد الحجز! سنتواصل معك قريباً.",
    rateService: "قيم الخدمة",
    rateTitle: "قيم تجربتك",
    rateDesc: "كيف كانت جودة التنظيف؟",
    ratingPlaceholder: "أخبرنا المزيد عن الخدمة...",
    submitRating: "إرسال التقييم",
    ratingThanks: "شكراً لك! تم تسجيل ملاحظاتك.",
    stars: ["سيء", "مقبول", "جيد", "جيد جداً", "ممتاز"]
  }
};