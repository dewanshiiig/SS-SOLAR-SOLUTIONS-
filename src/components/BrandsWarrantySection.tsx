import React from 'react';
import { ShieldCheck, Cpu, SunMedium, Wrench, Info } from 'lucide-react';
import { Language } from '../data/translations';

interface BrandsWarrantySectionProps {
  language: Language;
}

export const BrandsWarrantySection: React.FC<BrandsWarrantySectionProps> = ({ language }) => {
  const isHindi = language === 'hi';

  const panelBrands = ['Adani', 'Waaree', 'Premier', 'Vikram'];
  const inverterBrands = ['Havells', 'Polycab', 'Eastman'];

  const warrantyHighlights = [
    {
      labelEn: 'Panels',
      labelHi: 'सोलर पैनल्स',
      periodEn: 'Up to 25 years',
      periodHi: '25 वर्ष तक',
      descEn: 'Linear degradation & performance assurance',
      descHi: 'लीनियर परफॉर्मेंस एवं जनरेशन वारंटी',
      icon: SunMedium,
    },
    {
      labelEn: 'Inverter',
      labelHi: 'इनवर्टर',
      periodEn: 'Up to 10 years',
      periodHi: '10 वर्ष तक',
      descEn: 'Manufacturer product & workmanship warranty',
      descHi: 'निर्माता उत्पाद एवं तकनीकी वारंटी',
      icon: Cpu,
    },
    {
      labelEn: 'Free Services',
      labelHi: 'निःशुल्क सर्विस',
      periodEn: 'Up to 5 years',
      periodHi: '5 वर्ष तक',
      descEn: 'Routine plant inspection & maintenance support',
      descHi: 'नियमित प्लांट रखरखाव एवं सहायता',
      icon: Wrench,
    },
  ];

  return (
    <section
      id="brands-warranty"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>05</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'उपकरण एवं वारंटी' : 'Equipment & Warranties'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3">
            {isHindi ? 'ब्रांड्स एवं वारंटी' : 'Brands & Warranty'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isHindi
              ? 'उद्योग के प्रमुख टियर-1 पैनल्स, इनवर्टर्स और दीर्घकालिक वारंटी बैकअप के साथ निर्मित विश्वसनीय सौर प्रणालियां।'
              : 'Engineered with proven Tier-1 photovoltaic modules and certified inverters backed by comprehensive warranties.'}
          </p>
        </div>

        {/* 3 Warranty Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12">
          {warrantyHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      {isHindi ? item.labelHi : item.labelEn}
                    </span>
                    <div className="p-2 rounded-lg bg-white border border-slate-200/80 text-[#0A192F]">
                      <Icon className="w-4 h-4 text-[#FF9933]" />
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-mono tracking-tight mb-2">
                    {isHindi ? item.periodHi : item.periodEn}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isHindi ? item.descHi : item.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'लिखित वारंटी सुरक्षा' : 'Written Warranty Protection'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Typographic Brand Lists (No unauthorized logos, no exclusive partnership claims) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          
          {/* Solar Panel Brands */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <SunMedium className="w-4 h-4 text-[#FF9933]" />
              <h3 className="text-sm sm:text-base font-bold text-[#0A192F]">
                {isHindi ? 'सोलर पैनल ब्रांड्स (उपकरण विकल्प)' : 'Solar Panel Brands (Equipment Options)'}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {panelBrands.map((brand) => (
                <div
                  key={brand}
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center font-bold text-sm text-[#0A192F] hover:bg-slate-100 transition-colors"
                >
                  {brand}
                </div>
              ))}
            </div>
            
            <p className="text-[11px] text-slate-400 mt-3">
              {isHindi
                ? 'MNRE ALMM स्वीकृत टियर-1 सौर मॉड्यूल निर्माता।'
                : 'MNRE ALMM approved Tier-1 solar module manufacturers.'}
            </p>
          </div>

          {/* Inverter Brands */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-[#FF9933]" />
              <h3 className="text-sm sm:text-base font-bold text-[#0A192F]">
                {isHindi ? 'इनवर्टर ब्रांड्स (उपकरण विकल्प)' : 'Inverter Brands (Equipment Options)'}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {inverterBrands.map((brand) => (
                <div
                  key={brand}
                  className="px-3 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center font-bold text-xs sm:text-sm text-[#0A192F] hover:bg-slate-100 transition-colors"
                >
                  {brand}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 mt-3">
              {isHindi
                ? 'ग्रिड-टाइड एवं हाइब्रिड स्मार्ट इनवर्टर विकल्प।'
                : 'Certified grid-tied and hybrid smart inverter options.'}
            </p>
          </div>

        </div>

        {/* Mandatory One-Line Disclaimer */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600 leading-relaxed max-w-4xl mx-auto">
          <Info className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
          <p>
            {isHindi
              ? 'Exact warranty coverage chune gaye equipment aur likhit warranty sharton par nirbhar karta hai. (सटीक वारंटी कवरेज चुने गए उपकरण एवं लिखित वारंटी शर्तों पर निर्भर करता है।)'
              : 'Exact warranty coverage depends on selected equipment and written warranty terms.'}
          </p>
        </div>

      </div>
    </section>
  );
};
