import React from 'react';
import {
  Compass,
  FileText,
  Wrench,
  Gauge,
  CheckCircle,
  IndianRupee,
  Info,
} from 'lucide-react';
import { Language } from '../data/translations';

interface InstallationProcessSectionProps {
  language: Language;
}

export const InstallationProcessSection: React.FC<InstallationProcessSectionProps> = ({
  language,
}) => {
  const isHindi = language === 'hi';

  const steps = [
    {
      num: '01',
      icon: Compass,
      titleEn: 'Rooftop Site Survey',
      titleHi: 'छत का साइट सर्वेक्षण',
      descEn: 'Assess roof, shading, and requirements.',
      descHi: 'छत, छाया और आवश्यकताओं का आकलन।',
    },
    {
      num: '02',
      icon: FileText,
      titleEn: 'Documentation & Support',
      titleHi: 'दस्तावेज़ीकरण एवं आवेदन सहायता',
      descEn: 'Scheme and application support.',
      descHi: 'योजना और आवेदन में सहायता।',
    },
    {
      num: '03',
      icon: Wrench,
      titleEn: 'Engineering Solar Installation',
      titleHi: 'सोलर संयंत्र इंस्टॉलेशन',
      descEn: 'Panels, inverter, structure, and wiring.',
      descHi: 'पैनल, इनवर्टर, संरचना और वायरिंग।',
    },
    {
      num: '04',
      icon: Gauge,
      titleEn: 'DISCOM Net-Metering',
      titleHi: 'डिस्कॉम नेट-मीटरिंग',
      descEn: 'Coordination with electricity distribution company.',
      descHi: 'विद्युत वितरण कंपनी से समन्वय।',
    },
    {
      num: '05',
      icon: CheckCircle,
      titleEn: 'Inspection & Commissioning',
      titleHi: 'निरीक्षण एवं कमीशनिंग',
      descEn: 'Testing and commissioning support.',
      descHi: 'परीक्षण और कमीशनिंग सहायता।',
    },
    {
      num: '06',
      icon: IndianRupee,
      titleEn: 'Subsidy Disbursement Follow-Up',
      titleHi: 'सब्सिडी भुगतान फॉलो-अप',
      descEn: 'Guidance on remaining subsidy steps.',
      descHi: 'शेष सब्सिडी चरणों पर मार्गदर्शन।',
    },
  ];

  return (
    <section
      id="installation-process"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-[#F8FAFC]/50 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>06</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'कार्यप्रणाली' : 'Turnkey Deployment'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3">
            {isHindi ? 'इंस्टॉलेशन प्रक्रिया' : 'Installation Process'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isHindi
              ? 'प्रारंभिक छत सर्वेक्षण से लेकर ग्रिड कमीशनिंग और सब्सिडी दावा तक 6 संक्षिप्त चरण।'
              : 'A transparent six-step turnkey workflow from initial survey to grid commissioning.'}
          </p>
        </div>

        {/* 6 Compact Numbered Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative bg-white border border-slate-200/90 hover:border-[#0A192F]/40 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-extrabold text-[#FF9933] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      STEP {step.num}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 text-[#0A192F] border border-slate-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-[#0A192F]" />
                    </div>
                  </div>

                  {/* 3–6 Word Title */}
                  <h3 className="text-base font-bold text-[#0A192F] mb-2 leading-snug">
                    {isHindi ? step.titleHi : step.titleEn}
                  </h3>

                  {/* Max 8-Word Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isHindi ? step.descHi : step.descEn}
                  </p>
                </div>

                {/* Subtle Progress Trace Line */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Phase {step.num}/06</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#10B981] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Note */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs max-w-4xl mx-auto flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
          <Info className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800">
              {isHindi ? 'ध्यान दें: ' : 'Note: '}
            </strong>
            {isHindi
              ? 'Sequence and duration may vary depending on approvals, site conditions, equipment availability, and DISCOM process. (स्वीकृति, साइट स्थिति, उपकरण उपलब्धता और डिस्कॉम प्रक्रिया के अनुसार क्रम व समय बदल सकता है।)'
              : 'Sequence and duration may vary depending on approvals, site conditions, equipment availability, and DISCOM process.'}
          </p>
        </div>

      </div>
    </section>
  );
};
