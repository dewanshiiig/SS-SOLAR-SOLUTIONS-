import React, { useState } from 'react';
import { BrandWordmark } from './BrandWordmark';
import { NAV_ITEMS, Language, TRANSLATIONS } from '../data/translations';
import { Phone, Mail, MapPin, Shield, FileText, X, AlertCircle, Instagram, Facebook, Linkedin, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const isHindi = language === 'hi';

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneNumbers = [
    '+91 99260 62236',
    '+91 91112 11350',
    '+91 91110 15838',
    '+91 99811 22236',
  ];

  return (
    <footer className="bg-[#060E1A] text-slate-300 border-t border-slate-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start mb-12">
          
          {/* Column 1: Brand & Company Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <BrandWordmark variant="light" size="lg" />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isHindi
                ? 'SS Solar Solutions इंदौर एवं मध्य प्रदेश में आवासीय एवं वाणिज्यिक रूफटॉप सोलर सिस्टम, पीएम सूर्य घर योजना सब्सिडी मार्गदर्शन और टर्नकी स्वच्छ ऊर्जा समाधान प्रदान करता है।'
                : 'SS Solar Solutions provides residential and commercial rooftop solar engineering, PM Surya Ghar subsidy advisory, and turnkey clean energy installations across Indore and Madhya Pradesh.'}
            </p>

            {/* Direct Address */}
            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Shop No. 3, Ganesh Dwar, Khajarana Square, Ring Road, Indore
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                <a
                  href="mailto:sssolarsolutionsindore@gmail.com"
                  className="text-white hover:text-[#FF9933] transition-colors font-medium"
                >
                  sssolarsolutionsindore@gmail.com
                </a>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="flex items-center gap-2.5 pt-1">
                <MessageSquare className="w-4 h-4 text-[#10B981] shrink-0" />
                <a
                  href={getWhatsAppUrl(language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#10B981] transition-colors font-medium"
                >
                  WhatsApp: {WHATSAPP_PHONE_DISPLAY}
                </a>
              </div>

              {/* Social Profiles */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[11px] text-slate-400 font-mono uppercase mr-1">Social:</span>
                <a
                  href="https://www.instagram.com/sssolarsolutions_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#FF9933] border border-white/10 transition-colors"
                  aria-label="SS Solar Solutions on Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.facebook.com/share/19sFz8cnVA/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#FF9933] border border-white/10 transition-colors"
                  aria-label="SS Solar Solutions on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ss-solar-solutions-102449446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#FF9933] border border-white/10 transition-colors"
                  aria-label="SS Solar Solutions on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-4">
              {isHindi ? 'त्वरित लिंक' : 'QUICK LINKS'}
            </div>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors block py-0.5"
                  >
                    {isHindi ? item.labelHi : item.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Phone Numbers (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
              {isHindi ? 'सीधा संपर्क फोन नंबर' : 'VERIFIED CONTACT DESK'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {phoneNumbers.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                  <span className="truncate">{phone}</span>
                </a>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
              {isHindi
                ? 'कार्यालय समय: सोमवार से शनिवार, सुबह 9:00 बजे से शाम 7:00 बजे तक।'
                : 'Working Hours: Monday to Saturday, 9:00 AM – 7:00 PM.'}
            </div>
          </div>

        </div>

        {/* Pricing and Subsidy Disclaimers Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-slate-200">
                {isHindi ? 'मूल्य एवं सब्सिडी अस्वीकरण (Disclaimers): ' : 'Pricing & Subsidy Disclaimers: '}
              </span>
              <p>
                {isHindi
                  ? 'वेबसाइट पर प्रदर्शित पैकेज मूल्य प्रारंभिक अनुमान हैं। अंतिम लागत साइट सर्वेक्षण, छत की स्थिति, केबल लंबाई और लागू करों पर निर्भर करती है। सरकारी सब्सिडी (PM Surya Ghar) योजना के नियमों, पात्रता और डिस्कॉम स्वीकृति के अधीन है एवं यह अग्रिम स्वचालित छूट नहीं है।'
                  : 'All system prices displayed on this website represent starting estimates. Final quotation depends on technical roof audit, structural elevation, cabling distance, and applicable taxes. Government subsidies under PM Surya Ghar Muft Bijli Yojana are subject to applicant eligibility, central guidelines, and DISCOM grid commissioning; subsidies are not an automatic upfront price discount.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 SS Solar Solutions. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isHindi ? 'प्राइवेसी पॉलिसी' : 'Privacy Policy'}
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isHindi ? 'नियम एवं शर्तें' : 'Terms and Conditions'}
            </button>
            <span className="text-slate-700">·</span>
            <span className="font-mono text-[11px] text-slate-500">Indore, India</span>
          </div>
        </div>

      </div>

      {/* Legal Information Modal (Privacy Policy & Terms) */}
      {activeLegalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveLegalModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLegalModal === 'privacy' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF9933] uppercase">
                  <Shield className="w-4 h-4" />
                  <span>LEGAL COMPLIANCE</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  {isHindi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
                </h3>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>
                    <strong>1. Information Collection:</strong> SS Solar Solutions respects customer privacy. We do not gather or monetize unsolicited consumer data. Contact information shared voluntarily via phone, WhatsApp, or official links is used solely for rooftop solar engineering consultations, quotation preparation, and DISCOM application support.
                  </p>
                  <p>
                    <strong>2. Data Sharing:</strong> Your personal information is never sold, leased, or distributed to third-party marketing brokers. Necessary application details are shared exclusively with authorized electricity distribution companies (DISCOMs) and official national solar portal registries as mandated for net-metering.
                  </p>
                  <p>
                    <strong>3. Security:</strong> We employ administrative and digital safeguards to protect customer records against unauthorized access.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF9933] uppercase">
                  <FileText className="w-4 h-4" />
                  <span>TERMS OF ENGAGEMENT</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  {isHindi ? 'नियम एवं शर्तें (Terms and Conditions)' : 'Terms and Conditions'}
                </h3>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>
                    <strong>1. Quotations & Site Survey:</strong> All online estimates and package pricing are indicative starting figures. Official commercial quotations are formalized only following technical rooftop shadow analysis and feasibility confirmation.
                  </p>
                  <p>
                    <strong>2. Subsidy Disbursement:</strong> Subsidies provided under central or state schemes (including PM Surya Ghar Muft Bijli Yojana) are governed by statutory guidelines. Direct Benefit Transfer (DBT) is disbursed by the governing authorities directly to the consumer’s bank account following DISCOM commissioning.
                  </p>
                  <p>
                    <strong>3. Equipment Warranties:</strong> Warranties for solar modules, inverters, and mounting structures are underwritten in accordance with respective manufacturer policy and written agreement terms.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0A192F] hover:bg-[#102342] transition-colors"
              >
                {isHindi ? 'समझ गया' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
