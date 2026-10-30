import React from 'react';
import { ArrowRight, MessageSquare, Sun, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { SolarQrCode } from './SolarQrCode';
import { Language, TRANSLATIONS, getWhatsAppUrl } from '../data/translations';
import indianRooftopSolarImg from '../assets/images/indian_home_rooftop_solar_1792220692956.jpg';

interface HeroSectionProps {
  language: Language;
  onOpenQrModal: () => void;
  onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenQrModal,
  onCtaClick,
}) => {
  const t = TRANSLATIONS[language].hero;

  const handleScrollToPackages = () => {
    const el = document.getElementById('solar-packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else onCtaClick();
  };

  return (
    <section
      id="hero"
      className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-slate-50 border-b border-slate-200/80"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-70 pointer-events-none" />

      {/* Radiant Solar Ambient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#FF9933]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#0A192F]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* ================= LEFT SIDE (7 Cols on LG / Desktop / TV) ================= */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Architectural Kicker (Zero-Pill compliant) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A192F]">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#FF9933]" aria-hidden="true" />
              <span>SS Solar Solutions</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-[#10B981] font-semibold">
                {language === 'hi' ? 'स्वच्छ रूफटॉप सौर ऊर्जा' : 'Clean Rooftop Solar'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold tracking-tight text-[#0A192F] leading-[1.12] text-balance">
              {t.headline}
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl text-pretty">
              {t.supportingLine}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary CTA: "Get Solar Details" / "Solar Details Payiye" */}
              <button
                type="button"
                onClick={handleScrollToPackages}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#0A192F] hover:bg-[#102342] active:bg-[#060E1A] rounded-xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-[#1B355E] group whitespace-nowrap"
              >
                <Zap className="w-4 h-4 text-[#FF9933] group-hover:scale-110 transition-transform" />
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-[#FF9933] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: "WhatsApp Us" / "WhatsApp Karein" */}
              <a
                href={getWhatsAppUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:border-[#10B981] group whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
                <span>{t.ctaSecondary}</span>
              </a>
            </div>

            {/* 3 Trust Badges */}
            <div className="pt-5 border-t border-slate-200">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                {language === 'hi' ? 'भरोसेमंद विशेषताएं' : 'Verified Capabilities'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Badge 1: 3 kW & 5 kW Packages */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 rounded-lg bg-[#0A192F]/5 text-[#0A192F] shrink-0">
                    <Sun className="w-4 h-4 text-[#FF9933]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0A192F] leading-tight">
                    {t.trustBadges[0]}
                  </div>
                </div>

                {/* Badge 2: Subsidy Guidance */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 rounded-lg bg-[#0A192F]/5 text-[#0A192F] shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0A192F] leading-tight">
                    {t.trustBadges[1]}
                  </div>
                </div>

                {/* Badge 3: Rooftop Solar Solutions */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 rounded-lg bg-[#0A192F]/5 text-[#0A192F] shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#0A192F]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0A192F] leading-tight">
                    {t.trustBadges[2]}
                  </div>
                </div>
              </div>
            </div>

            {/* Realistic Indian Home Rooftop Solar Image Placeholder Card */}
            <div className="pt-2">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group">
                <img
                  src={indianRooftopSolarImg}
                  alt="Realistic Indian home rooftop solar panel installation"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                {/* Information Overlay Strip */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/50 to-transparent p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF9933] font-bold block">
                      {language === 'hi' ? 'वास्तविक भारतीय छत पर स्थापना' : 'Realistic Indian Rooftop Installation'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">
                      {language === 'hi'
                        ? 'भारतीय आवासीय छत हेतु 3 kW एवं 5 kW सौर पावर प्लांट'
                        : 'Engineered 3 kW & 5 kW Rooftop Solar Power Plant'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 font-medium whitespace-nowrap">
                    MNRE Tier-1 Approved
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT-MOST CORNER (5 Cols on LG / Desktop / TV) ================= */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none flex flex-col items-center lg:items-end">
              {/* Large QR Code in White Rounded Card */}
              <SolarQrCode
                language={language}
                onOpenModal={onOpenQrModal}
                isLarge={true}
                className="w-full max-w-sm sm:max-w-md"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
