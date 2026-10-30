import React, { useState } from 'react';
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  HelpCircle,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { SolarQrCode } from './SolarQrCode';
import { Language, getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '../data/translations';

interface FaqsContactSectionProps {
  language: Language;
}

interface FaqItem {
  id: number;
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

// Exactly 6 FAQs with answers strictly under 35 words
const FAQS_DATA: FaqItem[] = [
  {
    id: 1,
    qEn: 'Is a government subsidy available?',
    qHi: 'क्या सरकारी सब्सिडी उपलब्ध है?',
    aEn: 'Yes. Under PM Surya Ghar Muft Bijli Yojana, eligible residential homeowners can receive direct DBT financial subsidies up to ₹78,000, depending on installed capacity and DISCOM approvals.',
    aHi: 'हाँ, पीएम सूर्य घर योजना के तहत पात्र आवासीय उपभोक्ताओं को ₹78,000 तक की प्रत्यक्ष डीबीटी सब्सिडी मिलती है, जो स्थापित क्षमता और डिस्कॉम स्वीकृति पर निर्भर है।',
  },
  {
    id: 2,
    qEn: 'Will my electricity bill become zero?',
    qHi: 'क्या मेरा बिजली बिल शून्य हो जाएगा?',
    aEn: 'Solar significantly slashes energy consumption costs, but mandatory DISCOM minimum fixed charges (such as meter rent and electricity duties) typically remain payable on your monthly power bill.',
    aHi: 'सोलर से बिजली खपत खर्च भारी मात्रा में घट जाता है, लेकिन डिस्कॉम के अनिवार्य न्यूनतम फिक्स चार्ज (मीटर किराया आदि) मासिक बिल में देय रहते हैं।',
  },
  {
    id: 3,
    qEn: 'Which solar packages are available?',
    qHi: 'कौन-से सोलर पैकेज उपलब्ध हैं?',
    aEn: 'We offer standardized 3 kW and 5 kW residential rooftop systems featuring Tier-1 high-efficiency modules, certified on-grid inverters, pre-galvanized structures, and turnkey net-metering commissioning.',
    aHi: 'हम टियर-1 पैनल्स, प्रमाणित ऑन-ग्रिड इनवर्टर, गैल्वेनाइज्ड माउंटिंग स्ट्रक्चर और संपूर्ण नेट-मीटरिंग के साथ 3 kW एवं 5 kW आवासीय रूफटॉप सिस्टम प्रदान करते हैं।',
  },
  {
    id: 4,
    qEn: 'Are financing or EMI options available?',
    qHi: 'क्या फाइनेंस या ईएमआई विकल्प उपलब्ध हैं?',
    aEn: 'Yes. Low-interest collateral-free solar loans and flexible monthly EMI tenures up to 84 months are available through partner public and private sector banks under government solar schemes.',
    aHi: 'हाँ, सरकारी सौर योजनाओं के तहत प्रमुख बैंकों के माध्यम से रियायती ब्याज दर पर बिना किसी गिरवी के 84 महीने तक आसान ईएमआई ऋण उपलब्ध हैं।',
  },
  {
    id: 5,
    qEn: 'What warranty is provided?',
    qHi: 'क्या वारंटी प्रदान की जाती है?',
    aEn: 'Solar panels include up to a 25-year linear performance warranty. Inverters carry up to 10 years, accompanied by up to 5 years of complimentary maintenance and service support.',
    aHi: 'सोलर पैनल्स पर 25 साल तक की परफॉर्मेंस वारंटी, इनवर्टर पर 10 साल तक और साथ ही 5 साल तक निःशुल्क सर्विस व मेंटेनेंस सहायता प्रदान की जाती है।',
  },
  {
    id: 6,
    qEn: 'Is the package price final?',
    qHi: 'क्या पैकेज मूल्य अंतिम है?',
    aEn: 'Displayed prices are starting estimates. Final quotation depends on site structural inspection, cabling length, roof elevation, customized engineering requirements, and applicable tax rates.',
    aHi: 'प्रदर्शित कीमतें प्रारंभिक अनुमान हैं। अंतिम कोटेशन छत की स्थिति, केबल लंबाई, एलिवेशन, व्यक्तिगत इंजीनियरिंग आवश्यकताओं और लागू करों पर निर्भर करता है।',
  },
];

export const FaqsContactSection: React.FC<FaqsContactSectionProps> = ({ language }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isHindi = language === 'hi';

  const phoneNumbers = [
    '+91 99260 62236',
    '+91 91112 11350',
    '+91 91110 15838',
    '+91 99811 22236',
  ];

  return (
    <section
      id="faqs"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>08</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3">
            {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isHindi
              ? 'रूफटॉप सोलर, सब्सिडी, लागत और वारंटी से जुड़े 6 मुख्य प्रश्नों के स्पष्ट उत्तर।'
              : 'Clear, concise answers to essential questions regarding residential rooftop solar.'}
          </p>
        </div>

        {/* 6 FAQs Accordion (Strictly 6 FAQs with answers < 35 words) */}
        <div className="max-w-4xl mx-auto space-y-3.5 mb-16 sm:mb-20">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.id}
                className="border border-slate-200/90 rounded-2xl overflow-hidden bg-[#F8FAFC] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#0A192F] hover:text-[#0B1B3D] transition-colors gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#FF9933]">
                      0{faq.id}
                    </span>
                    <span>{isHindi ? faq.qHi : faq.qEn}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0A192F]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-200/60 leading-relaxed bg-white">
                    {isHindi ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= FINAL CONTACT BLOCK ================= */}
        <div
          id="contact"
          className="rounded-3xl bg-[#0A192F] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-[#1B355E] scroll-mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Contact Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Heading strictly as specified */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block mb-2">
                  SS SOLAR SOLUTIONS · INDORE
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {isHindi
                    ? 'Rooftop Solar Explore Karne ke Liye Taiyaar Hain?'
                    : 'Ready to Explore Rooftop Solar?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                  {isHindi
                    ? 'सीधे हमारी तकनीकी टीम से संपर्क करें। किसी फॉर्म भरने की आवश्यकता नहीं है।'
                    : 'Connect directly with our engineering team in Indore. No consultation forms required.'}
                </p>
              </div>

              {/* Phone Numbers List */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF9933]">
                  {isHindi ? 'सीधे फोन संपर्क (Direct Calling)' : 'DIRECT PHONE DESK'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-[#FF9933] text-[#0A192F] group-hover:scale-105 transition-transform shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-wide">
                        {phone}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="pt-1">
                <a
                  href={getWhatsAppUrl(language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#10B981] hover:bg-[#059669] transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {isHindi
                      ? `व्हाट्सएप पर चैट करें (${WHATSAPP_PHONE_DISPLAY})`
                      : `Chat on WhatsApp (${WHATSAPP_PHONE_DISPLAY})`}
                  </span>
                </a>
              </div>

              {/* Email, Physical Address & Social Profiles */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                {/* Official Email */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#FF9933] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Email:</span>
                    <a
                      href="mailto:sssolarsolutionsindore@gmail.com"
                      className="text-white hover:text-[#FF9933] font-semibold transition-colors"
                    >
                      sssolarsolutionsindore@gmail.com
                    </a>
                  </div>
                </div>

                {/* Physical Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#FF9933] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Address:</span>
                    <p className="text-white font-medium leading-relaxed">
                      Shop No. 3, Ganesh Dwar, Khajarana Square, Ring Road, Indore
                    </p>
                  </div>
                </div>

                {/* Small Social Profiles */}
                <div className="pt-2 flex items-center gap-3">
                  <span className="text-slate-400 text-xs font-medium">
                    {isHindi ? 'सोशल मीडिया:' : 'Follow Us:'}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/sssolarsolutions_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#FF9933] border border-white/10 transition-colors"
                      aria-label="SS Solar Solutions on Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/share/19sFz8cnVA/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#FF9933] border border-white/10 transition-colors"
                      aria-label="SS Solar Solutions on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ss-solar-solutions-102449446"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#FF9933] border border-white/10 transition-colors"
                      aria-label="SS Solar Solutions on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Large QR Code with exact required labels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm">
                <SolarQrCode
                  language={language}
                  isLarge={true}
                  className="shadow-2xl border-2 border-white/20"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
