import React, { useEffect } from 'react';
import { X, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { Language, TRANSLATIONS, GOOGLE_FORM_QR_URL, getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '../data/translations';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, language }) => {
  const t = TRANSLATIONS[language].modal;
  const qrImageSrc = '/assets/aistudio/ss_solar_static_google_form_qr_e0411319.png';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="text-[10px] font-mono tracking-widest text-[#FF9933] uppercase font-bold block mb-1">
            SS SOLAR SOLUTIONS
          </span>
          <h3 className="text-xl font-bold text-[#0A192F]">
            {t.title}
          </h3>
        </div>

        {/* Exact Uploaded Scannable QR Graphic */}
        <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64 p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-inner flex items-center justify-center">
          <img
            src={qrImageSrc}
            alt="Free Consultation — Scan Here / निःशुल्क सलाह — यहाँ स्कैन करें"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bilingual Labels */}
        <div className="mt-4 space-y-1">
          <div className="text-base font-bold text-[#0A192F]">
            Free Consultation — Scan Here
          </div>
          <div className="text-sm font-semibold text-[#E8800C]">
            निःशुल्क सलाह — यहाँ स्कैन करें
          </div>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'hi'
              ? 'Solar package, subsidy & savings details payiye'
              : 'Get solar package, subsidy & savings details'}
          </p>
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={GOOGLE_FORM_QR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#0A192F] hover:bg-[#102342] shadow-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#FF9933]" />
            <span>{t.openForm}</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+919926062236"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A192F]" />
              <span>{t.callNow}</span>
            </a>

            <a
              href={getWhatsAppUrl(language)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs text-white bg-[#10B981] hover:bg-[#059669] transition-colors"
              title={`WhatsApp: ${WHATSAPP_PHONE_DISPLAY}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.whatsappNow}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
