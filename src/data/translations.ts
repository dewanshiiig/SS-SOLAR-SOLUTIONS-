export type Language = 'en' | 'hi';

export interface NavItem {
  id: string;
  labelEn: string;
  labelHi: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', labelEn: 'Home', labelHi: 'होम', href: '#hero' },
  { id: 'pm-surya-ghar', labelEn: 'PM Surya Ghar Yojana', labelHi: 'पीएम सूर्य घर योजना', href: '#pm-surya-ghar' },
  { id: 'solar-packages', labelEn: 'Solar Packages', labelHi: 'सोलर पैकेज', href: '#solar-packages' },
  { id: 'savings-calculator', labelEn: 'Savings Calculator', labelHi: 'बचत कैलकुलेटर', href: '#savings-calculator' },
  { id: 'finance-emi', labelEn: 'Finance & EMI', labelHi: 'फाइनेंस एवं ईएमआई', href: '#finance-emi' },
  { id: 'installation-process', labelEn: 'Installation Process', labelHi: 'इंस्टॉलेशन प्रक्रिया', href: '#installation-process' },
  { id: 'faqs', labelEn: 'FAQs', labelHi: 'अक्सर पूछे जाने वाले प्रश्न', href: '#faqs' },
  { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क', href: '#contact' },
];

export const GOOGLE_FORM_QR_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe48aMBTPsBX_D81GrMnkz1MG7MvyQlulpvUxlc4zB-Ndwbcw/viewform';

export const WHATSAPP_PHONE_DISPLAY = '+91 91112 18598';
export const WHATSAPP_BASE_URL = 'https://wa.me/919111218598';

export const getWhatsAppUrl = (lang: Language) => {
  const message =
    lang === 'hi'
      ? 'नमस्ते SS Solar Solutions, मैं रूफटॉप सोलर सिस्टम (100 kW तक) और पीएम सूर्य घर सब्सिडी की जानकारी चाहता हूँ।'
      : 'Hello SS Solar Solutions, I would like to enquire about rooftop solar installations up to 100 kW and PM Surya Ghar subsidy.';
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
};

export const TRANSLATIONS = {
  en: {
    brand: {
      name: 'SS Solar Solutions',
      tagline: 'Engineering Tomorrow’s Clean Energy',
    },
    nav: {
      cta: 'Get Solar Details',
      languageToggle: 'हिंदी',
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      headline: 'Power Your Home with the Sun.',
      supportingLine:
        'Rooftop solar solutions for homes and businesses. Explore packages, subsidy benefits, and systems up to 100 kW.',
      ctaPrimary: 'Get Solar Details',
      ctaSecondary: 'WhatsApp Us',
      trustBadges: [
        '3 kW to 100 kW Systems',
        'Subsidy Guidance',
        'Rooftop Solar Solutions',
      ],
      qr: {
        label: 'Free Consultation — Scan Here',
        supportingLine: 'Get solar package, subsidy & savings details',
      },
    },
    sections: {
      savingsCalculator: {
        number: '02',
        title: 'Savings Calculator',
        subtitle: 'Estimate your monthly electricity bill reduction, optimal plant capacity (kW), and payback period.',
        placeholderTag: 'Empty Section Structure',
        hint: 'Interactive calculator slots for: Monthly Bill Range (₹), Average Units (kWh), Roof Area (Sq. Ft.), Estimated System Size (kW), Expected Lifetime Savings (₹).',
      },
      pmSuryaGhar: {
        number: '03',
        title: 'PM Surya Ghar: Muft Bijli Yojana',
        subtitle: 'Government rooftop solar subsidy program overview, eligibility criteria, and financial assistance slabs.',
        placeholderTag: 'Empty Section Structure',
        hint: 'Subsidy tier matrix: Up to 1 kW (₹30,000 subsidy), 2 kW (₹60,000 subsidy), 3 kW+ (Up to ₹78,000 direct DBT subsidy), Portal application roadmap.',
      },
      solarPackages: {
        number: '04',
        title: 'Solar Packages',
        subtitle: 'Engineered rooftop photovoltaic systems tailored for residential, commercial, and agricultural roofs.',
        placeholderTag: 'Empty Section Structure',
        hint: 'Package tiers: 3 kW Residential Standard, 5 kW Residential Premium (Bifacial TOPCon), 10 kW Commercial & Industrial, Zero-Cost EMI options.',
      },
      brandsWarranty: {
        number: '05',
        title: 'Brands & Warranty',
        subtitle: 'Certified components, Tier-1 inverters, heavy-gauge galvanized mounting structures, and 25-year generation assurance.',
        placeholderTag: 'Empty Section Structure',
        hint: 'Authorized component gallery slots: MNRE-approved Tier-1 solar modules, string/hybrid inverters, IP65 protection, 25-year linear degradation warranty.',
      },
      installationProcess: {
        number: '06',
        title: 'Installation Process',
        subtitle: 'End-to-end turnkey deployment from structural roof feasibility assessment to net-metering and grid commissioning.',
        placeholderTag: 'Empty Section Structure',
        hint: 'Step-by-step roadmap: 1. Roof Audit & Shadow Analysis · 2. Engineering Design · 3. DISCOM Approvals & Subsidy Registration · 4. Precision Installation · 5. Net Meter Commissioning.',
      },
      ourWork: {
        number: '07',
        title: 'Our Work',
        subtitle: 'Selected commissioned rooftop installations across individual residences, housing societies, and industrial premises.',
        placeholderTag: 'Empty Section Structure',
        hint: 'Showcase grid slots: High-resolution photographic showcase of completed rooftop solar projects, generation telemetry, and client locations.',
      },
      faqsContact: {
        number: '08',
        title: 'FAQs & Direct Contact',
        subtitle: 'Common rooftop solar queries answered transparently, plus direct communication channels with our engineering team.',
        placeholderTag: 'Empty Section Structure',
        faqHeading: 'Frequently Asked Questions',
        contactHeading: 'Direct Engineering Desk',
        phoneLabel: 'Phone Support',
        whatsappLabel: 'WhatsApp Direct',
        emailLabel: 'Official Email',
        officeLabel: 'Headquarters & Engineering Office',
        hoursLabel: 'Working Hours',
        hoursValue: 'Monday – Saturday: 9:00 AM – 7:00 PM',
        noticeNoForm: 'For immediate assistance, please call or WhatsApp directly. No consultation forms required.',
      },
    },
    modal: {
      title: 'Solar Consultation QR Code',
      close: 'Close',
      callNow: 'Call Engineering Desk',
      whatsappNow: 'Chat on WhatsApp',
      openForm: 'Open Google Form',
    },
    footer: {
      copyright: '© 2026 SS Solar Solutions. All rights reserved.',
      tagline: 'Clean Rooftop Solar Solutions & Sustainable Energy Infrastructure.',
      notice: 'Certified Solar Engineering & Turnkey EPC Solutions.',
    },
  },
  hi: {
    brand: {
      name: 'SS Solar Solutions',
      tagline: 'कल की स्वच्छ ऊर्जा का निर्माण',
    },
    nav: {
      cta: 'सोलर विवरण प्राप्त करें',
      languageToggle: 'English',
      menu: 'मेनू',
      close: 'बंद करें',
    },
    hero: {
      headline: 'Apne Ghar Ko Suraj Se Power Karein.',
      supportingLine:
        'घरों और व्यवसायों के लिए रूफटॉप सोलर समाधान। सोलर पैकेज, सब्सिडी लाभ और 100 kW तक के सिस्टम जानिए।',
      ctaPrimary: 'Solar Details Payiye',
      ctaSecondary: 'WhatsApp Karein',
      trustBadges: [
        '3 kW से 100 kW सिस्टम',
        'सब्सिडी मार्गदर्शन',
        'रूफटॉप सोलर समाधान',
      ],
      qr: {
        label: 'निःशुल्क सलाह — यहाँ स्कैन करें',
        supportingLine: 'Solar package, subsidy & savings details payiye',
      },
    },
    sections: {
      savingsCalculator: {
        number: '02',
        title: 'बचत कैलकुलेटर',
        subtitle: 'अपने मासिक बिजली बिल में संभावित कटौती, आवश्यक सिस्टम क्षमता (किलोवाट), और निवेश वापसी समय का आकलन करें।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        hint: 'कैलकुलेटर संरचना स्लॉट: मासिक बिल सीमा (₹), औसत यूनिट (kWh), छत का क्षेत्रफल (वर्ग फीट), अनुमानित सिस्टम आकार (kW), अपेक्षित आजीवन बचत (₹)।',
      },
      pmSuryaGhar: {
        number: '03',
        title: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
        subtitle: 'सरकारी रूफटॉप सोलर सब्सिडी कार्यक्रम का विवरण, पात्रता मापदंड और मिलने वाली वित्तीय सहायता की जानकारी।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        hint: 'सब्सिडी स्लैब मैट्रिक्स: 1 kW तक (₹30,000 सब्सिडी), 2 kW तक (₹60,000 सब्सिडी), 3 kW या अधिक (₹78,000 तक प्रत्यक्ष DBT सब्सिडी), राष्ट्रीय पोर्टल आवेदन प्रक्रिया।',
      },
      solarPackages: {
        number: '04',
        title: 'सोलर पैकेज',
        subtitle: 'आवासीय छतों, वाणिज्यिक प्रतिष्ठानों और कृषि उपयोग के लिए तैयार किए गए उच्च दक्षता वाले सौर पैकेज।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        hint: 'पैकेज श्रेणियां: 3 kW घरेलू मानक पैकेज, 5 kW प्रीमियम आवासीय पैकेज (बाइफेशियल TOPCon), 10 kW वाणिज्यिक पैकेज, जीरो-कॉस्ट ईएमआई विकल्प।',
      },
      brandsWarranty: {
        number: '05',
        title: 'ब्रांड्स एवं वारंटी',
        subtitle: 'प्रमाणित कंपोनेंट्स, टियर-1 इनवर्टर, गैल्वेनाइज्ड माउंटिंग स्ट्रक्चर और 25 वर्षों की विद्युत उत्पादन सुरक्षा।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        hint: 'अधिकृत कंपोनेंट गैलरी स्लॉट: MNRE स्वीकृत टियर-1 सोलर पैनल्स, स्ट्रिंग/हाइब्रिड इनवर्टर, IP65 वेदरप्रूफ सुरक्षा, 25-वर्षीय लीनियर डिग्रेडेशन वारंटी।',
      },
      installationProcess: {
        number: '06',
        title: 'इंस्टॉलेशन प्रक्रिया',
        subtitle: 'छत के तकनीकी सर्वेक्षण से लेकर नेट-मीटरिंग और ग्रिड चालू होने तक संपूर्ण टर्नकी निष्पादन।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        hint: 'चरणबद्ध प्रक्रिया: 1. छत का छाया विश्लेषण एवं ऑडिट · 2. तकनीकी डिजाइन · 3. डिस्कॉम स्वीकृति एवं सब्सिडी पंजीकरण · 4. सटीक इंस्टॉलेशन · 5. नेट मीटर कमीशनिंग।',
      },
      ourWork: {
        number: '07',
        title: 'हमारा कार्य',
        subtitle: 'आवासीय घरों, हाउसिंग सोसायटियों और औद्योगिक परिसरों में सफलतापूर्वक चालू किए गए चुनिंदा रूफटॉप प्रोजेक्ट्स।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        hint: 'शोकेस ग्रिड स्लॉट: पूर्ण हो चुके रूफटॉप सोलर प्रोजेक्ट्स की हाई-रिज़ॉल्यूशन फोटोग्राफिक गैलरी, उत्पादन क्षमता एवं ग्राहक स्थान।',
      },
      faqsContact: {
        number: '08',
        title: 'अक्सर पूछे जाने वाले प्रश्न एवं सीधा संपर्क',
        subtitle: 'रूफटॉप सोलर से संबंधित महत्वपूर्ण प्रश्नों के स्पष्ट उत्तर तथा हमारी इंजीनियरिंग टीम से सीधे संपर्क के माध्यम।',
        placeholderTag: 'रिक्त अनुभाग संरचना',
        faqHeading: 'सामान्य प्रश्नोत्तरी',
        contactHeading: 'सीधा इंजीनियरिंग डेस्क',
        phoneLabel: 'फोन सहायता',
        whatsappLabel: 'सीधा व्हाट्सएप',
        emailLabel: 'आधिकारिक ईमेल',
        officeLabel: 'मुख्यालय एवं इंजीनियरिंग कार्यालय',
        hoursLabel: 'कार्य समय',
        hoursValue: 'सोमवार – शनिवार: सुबह 9:00 बजे से शाम 7:00 बजे तक',
        noticeNoForm: 'त्वरित जानकारी के लिए कृपया सीधे फोन या व्हाट्सएप करें। किसी परामर्श फॉर्म की आवश्यकता नहीं है।',
      },
    },
    modal: {
      title: 'सोलर परामर्श क्यूआर कोड',
      close: 'बंद करें',
      callNow: 'इंजीनियरिंग डेस्क पर कॉल करें',
      whatsappNow: 'व्हाट्सएप पर बात करें',
      openForm: 'गूगल फॉर्म खोलें',
    },
    footer: {
      copyright: '© 2026 SS Solar Solutions. सर्वाधिकार सुरक्षित।',
      tagline: 'स्वच्छ रूफटॉप सोलर समाधान एवं सस्टेनेबल ऊर्जा संरचना।',
      notice: 'प्रमाणित सोलर इंजीनियरिंग एवं टर्नकी ईपीसी समाधान।',
    },
  },
};
