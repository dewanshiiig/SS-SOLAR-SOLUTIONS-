import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, X, ExternalLink, Clock } from 'lucide-react';
import { Language, getWhatsAppUrl } from '../data/translations';

interface PmSuryaGharSectionProps {
  language: Language;
}

// Editable scheme target timestamp
// Treat end-of-day time as a display convention, not a verified exact application cutoff
const SCHEME_END_TIMESTAMP = '2027-03-31T23:59:59+05:30';

export const PmSuryaGharSection: React.FC<PmSuryaGharSectionProps> = ({ language }) => {
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const isHindi = language === 'hi';

  // Real-time scheme implementation period countdown
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>(() => {
    const target = new Date(SCHEME_END_TIMESTAMP).getTime();
    const diff = target - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  });

  useEffect(() => {
    const target = new Date(SCHEME_END_TIMESTAMP).getTime();

    const updateTimer = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isExpired: false,
        });
      }
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const cards = [
    {
      capacityEn: '1 kW System',
      capacityHi: '1 kW सिस्टम',
      subsidyEn: '₹30,000',
      subsidyHi: '₹30,000',
      descEn: 'Central Financial Assistance for compact residential setups',
      descHi: 'छोटे आवासीय रूफटॉप हेतु केंद्रीय वित्तीय सहायता',
      idealForEn: 'Monthly bill: ₹1,000–₹1,800',
      idealForHi: 'मासिक बिल: ₹1,000–₹1,800',
    },
    {
      capacityEn: '2 kW System',
      capacityHi: '2 kW सिस्टम',
      subsidyEn: '₹60,000',
      subsidyHi: '₹60,000',
      descEn: 'Direct DBT subsidy for mid-size family residences',
      descHi: 'मध्यम आकार के आवासीय परिवारों हेतु प्रत्यक्ष डीबीटी सब्सिडी',
      idealForEn: 'Monthly bill: ₹1,800–₹3,200',
      idealForHi: 'मासिक बिल: ₹1,800–₹3,200',
    },
    {
      capacityEn: '3 kW & above',
      capacityHi: '3 kW ya usse adhik',
      subsidyEn: 'Up to ₹78,000',
      subsidyHi: '₹78,000 tak',
      descEn: 'Maximum capped central financial assistance slab',
      descHi: 'अधिकतम निर्धारित केंद्रीय वित्तीय सहायता स्लैब',
      idealForEn: 'Monthly bill: ₹3,200+',
      idealForHi: 'मासिक बिल: ₹3,200+',
    },
  ];

  return (
    <section
      id="pm-surya-ghar"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>03</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'केंद्रीय सरकारी योजना' : 'Government Subsidy Program'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3 text-balance">
            {isHindi
              ? 'PM Surya Ghar ke saath Rooftop Solar ka Poora Faayda Uthayein'
              : 'Make the Most of Rooftop Solar with PM Surya Ghar'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-pretty">
            {isHindi
              ? 'Eligible residential customers ko rooftop solar ke liye scheme rules aur approval ke subject mein central financial assistance mil sakta hai.'
              : 'Eligible residential customers may receive central financial assistance for rooftop solar, subject to scheme rules and approval.'}
          </p>
        </div>

        {/* Compact Yojana Countdown Widget strictly inside this section */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#0A192F]">
                <Clock className="w-4 h-4 text-[#FF9933]" />
                <span>
                  {isHindi
                    ? 'वर्तमान योजना की कार्यान्वयन अवधि: 31 मार्च 2027 तक'
                    : 'Current scheme implementation period: until 31 March 2027'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isHindi
                  ? 'सब्सिडी पात्रता, मंज़ूरी और आधिकारिक नियमों के अधीन है।'
                  : 'Subsidy depends on eligibility, approvals and official rules.'}
              </p>
            </div>

            {/* Countdown Boxes or Expiry Message */}
            {timeLeft.isExpired ? (
              <div className="px-4 py-2.5 rounded-xl bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold border border-amber-200">
                {isHindi
                  ? 'कृपया योजना की नवीनतम स्थिति जांचें।'
                  : 'Please check the latest scheme status.'}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center shrink-0">
                <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 min-w-[58px] sm:min-w-[68px] shadow-2xs">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-[#0A192F] tabular-nums">
                    {timeLeft.days}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    {isHindi ? 'दिन' : 'Days'}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 min-w-[58px] sm:min-w-[68px] shadow-2xs">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-[#0A192F] tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    {isHindi ? 'घंटे' : 'Hours'}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 min-w-[58px] sm:min-w-[68px] shadow-2xs">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-[#0A192F] tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    {isHindi ? 'मिनट' : 'Minutes'}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 min-w-[58px] sm:min-w-[68px] shadow-2xs">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-[#FF9933] tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    {isHindi ? 'सेकंड' : 'Seconds'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Clean Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#FF9933]/60 rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0A192F] transition-colors">
                    SLAB 0{idx + 1}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
                </div>

                <div className="text-sm sm:text-base font-bold text-slate-700 mb-1">
                  {isHindi ? card.capacityHi : card.capacityEn}
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-mono tabular-nums tracking-tight mb-3">
                  {isHindi ? card.subsidyHi : card.subsidyEn}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {isHindi ? card.descHi : card.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 text-[11px] font-mono text-slate-500">
                {isHindi ? card.idealForHi : card.idealForEn}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Disclaimer + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 max-w-xl text-xs text-slate-600 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] shrink-0 mt-1.5" />
            <p>
              <strong className="text-slate-800">
                {isHindi ? 'सूचना: ' : 'Note: '}
              </strong>
              {isHindi
                ? 'Subsidy conditional hai aur package price ka automatic upfront discount nahi hai.'
                : 'Subsidy is conditional and not an automatic upfront discount.'}
            </p>
          </div>

          {/* CTA: "Check Eligibility" */}
          <button
            type="button"
            onClick={() => setIsEligibilityModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#0A192F] hover:bg-[#102342] active:bg-[#060E1A] rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 border border-[#1B355E] group"
          >
            <span>{isHindi ? 'Eligibility Check Karein' : 'Check Eligibility'}</span>
            <ArrowRight className="w-4 h-4 text-[#FF9933] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Clean Eligibility Criteria Information Modal (NO CONSULTATION FORM) */}
      {isEligibilityModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsEligibilityModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsEligibilityModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF9933] font-bold block mb-1">
                PM SURYA GHAR GUIDELINES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F]">
                {isHindi ? 'पात्रता मापदंड एवं आवश्यक शर्तें' : 'Scheme Eligibility Criteria'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isHindi
                  ? 'प्रत्यक्ष DBT सब्सिडी के लिए आधिकारिक आवश्यकताएं'
                  : 'Official requirements for direct DBT subsidy disbursement'}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-snug">
                  <strong className="text-[#0A192F]">
                    {isHindi ? 'आवासीय कनेक्शन: ' : 'Residential Electricity Connection: '}
                  </strong>
                  {isHindi
                    ? 'बिजली कनेक्शन घरेलू/आवासीय श्रेणी (Domestic Consumer) का होना चाहिए।'
                    : 'The power connection must be registered under the domestic/residential tariff category.'}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-snug">
                  <strong className="text-[#0A192F]">
                    {isHindi ? 'छत का स्वामित्व: ' : 'Rooftop Ownership: '}
                  </strong>
                  {isHindi
                    ? 'घर की छत पर सोलर सिस्टम लगाने के लिए पर्याप्त छायामुक्त कानूनी अधिकार होना चाहिए।'
                    : 'Applicant must have legal ownership/possession of shadow-free rooftop space.'}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-snug">
                  <strong className="text-[#0A192F]">
                    {isHindi ? 'बैंक खाता (आधार लिंक): ' : 'Aadhaar-Linked Bank Account: '}
                  </strong>
                  {isHindi
                    ? 'सब्सिडी सीधे उपभोक्ता के आधार से लिंक बैंक खाते में डीबीटी द्वारा भेजी जाती है।'
                    : 'Direct Benefit Transfer (DBT) is credited directly to the consumer’s Aadhaar-linked account.'}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-snug">
                  <strong className="text-[#0A192F]">
                    {isHindi ? 'डिस्कॉम तकनीकी स्वीकृति: ' : 'DISCOM Technical Approval: '}
                  </strong>
                  {isHindi
                    ? 'नेट-मीटरिंग और लोड स्वीकृति स्थानीय विद्युत वितरण कंपनी के नियमों अनुसार होती है।'
                    : 'Technical feasibility approval and net-meter commissioning by DISCOM.'}
                </div>
              </div>
            </div>

            {/* Direct Official Link & WhatsApp Help (NO FORM) */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0A192F] hover:bg-[#102342] transition-colors"
              >
                <span>National Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF9933]" />
              </a>

              <a
                href={getWhatsAppUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] transition-colors"
              >
                <span>{isHindi ? 'व्हाट्सएप पर सहायता' : 'WhatsApp Assistance'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
