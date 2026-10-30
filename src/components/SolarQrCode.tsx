import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language, GOOGLE_FORM_QR_URL } from '../data/translations';

interface SolarQrCodeProps {
  language: Language;
  onOpenModal?: () => void;
  className?: string;
  isLarge?: boolean;
}

export const SolarQrCode: React.FC<SolarQrCodeProps> = ({
  language,
  className = '',
  isLarge = false,
}) => {
  const qrImageSrc = '/assets/aistudio/ss_solar_static_google_form_qr_e0411319.png';

  return (
    <div
      className={`group relative bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#FF9933]/60 ${className}`}
    >
      {/* Precision Scanner Corner Guides */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#0A192F] rounded-tl-sm pointer-events-none group-hover:border-[#FF9933] transition-colors" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#0A192F] rounded-tr-sm pointer-events-none group-hover:border-[#FF9933] transition-colors" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#0A192F] rounded-bl-sm pointer-events-none group-hover:border-[#FF9933] transition-colors" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#0A192F] rounded-br-sm pointer-events-none group-hover:border-[#FF9933] transition-colors" />

      {/* Main Interactive Container */}
      <div className="flex flex-col items-center text-center">
        {/* Large High-Contrast Scannable QR Graphic using the exact uploaded asset with white quiet zone */}
        <a
          href={GOOGLE_FORM_QR_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Free Consultation Form"
          className="relative block p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-inner group/qr overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
        >
          <img
            src={qrImageSrc}
            alt="Free Consultation — Scan Here / निःशुल्क सलाह — यहाँ स्कैन करें"
            className={`object-contain transition-transform duration-300 group-hover/qr:scale-[1.01] ${
              isLarge
                ? 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64'
                : 'w-44 h-44 sm:w-52 sm:h-52'
            }`}
            loading="eager"
          />

          {/* Hover Overlay Hint for Direct Form Opening */}
          <div className="absolute inset-0 bg-[#0A192F]/85 backdrop-blur-[2px] opacity-0 group-hover/qr:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-white">
            <ExternalLink className="w-6 h-6 text-[#FF9933] mb-1.5" />
            <span className="text-xs font-bold">
              {language === 'hi' ? 'फॉर्म खोलने के लिए क्लिक करें' : 'Click to Open Form Directly'}
            </span>
            <span className="text-[10px] text-slate-300 mt-1 max-w-[180px]">
              {language === 'hi' ? 'या टीवी/फोन कैमरे से स्कैन करें' : 'Or scan directly with TV / Phone camera'}
            </span>
          </div>
        </a>

        {/* Labels strictly adhering to user specifications */}
        <div className="mt-4 sm:mt-5 space-y-1.5 w-full">
          {/* Primary Label */}
          <div className="text-base sm:text-lg font-extrabold text-[#0A192F] tracking-tight">
            Free Consultation — Scan Here
          </div>
          {/* Hindi Label */}
          <div className="text-sm sm:text-base font-bold text-[#E8800C]">
            निःशुल्क सलाह — यहाँ स्कैन करें
          </div>

          {/* Supporting line */}
          <p className="pt-1.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {language === 'hi'
              ? 'Solar package, subsidy & savings details payiye'
              : 'Get solar package, subsidy & savings details'}
          </p>

          {/* TV Scannable Trust Micro-badge */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#10B981] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>High-Contrast Camera & TV Scannable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
