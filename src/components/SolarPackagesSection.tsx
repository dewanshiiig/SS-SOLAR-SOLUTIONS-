import React from 'react';
import { Zap, Shield, Wrench, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Language } from '../data/translations';

interface SolarPackagesSectionProps {
  language: Language;
  onGetSolarDetails: () => void;
}

export const SolarPackagesSection: React.FC<SolarPackagesSectionProps> = ({
  language,
  onGetSolarDetails,
}) => {
  const isHindi = language === 'hi';

  const packages = [
    {
      id: '3kw',
      capacity: '3 kW',
      titleEn: '3 kW Rooftop Solar System',
      titleHi: '3 kW रूफटॉप सोलर सिस्टम',
      startingPrice: '₹1,80,000',
      suitabilityEn:
        'A suitable option for households looking to reduce electricity expenses with residential rooftop solar.',
      suitabilityHi:
        'Gharelu rooftop solar se bijli kharche kam karne wale parivaron ke liye ek upyukt vikalp.',
      inclusionsEn: [
        'Tier-1 Mono PERC / TOPCon Modules',
        'Certified On-Grid Inverter with Monitoring',
        'Pre-Galvanized Mounting Structure & Turnkey Setup',
      ],
      inclusionsHi: [
        'टियर-1 मोनो पर्क / TOPCon पैनल्स',
        'स्मार्ट ऑन-ग्रिड इनवर्टर वाई-फाई मॉनिटरिंग सहित',
        'प्री-गैल्वेनाइज्ड स्ट्रक्चर एवं पूर्ण इंस्टॉलेशन',
      ],
    },
    {
      id: '5kw',
      capacity: '5 kW',
      titleEn: '5 kW Rooftop Solar System',
      titleHi: '5 kW रूफटॉप सोलर सिस्टम',
      startingPrice: '₹2,90,000',
      suitabilityEn:
        'A higher-capacity option for households with greater electricity consumption and suitable rooftop conditions.',
      suitabilityHi:
        'Adhik bijli khapat aur upyukt chhat sthiti wale parivaron ke liye ek uchh-kshamata vikalp.',
      inclusionsEn: [
        'High-Yield Tier-1 Bifacial / TOPCon Modules',
        'Dual MPPT High-Efficiency Inverter with Cloud App',
        'Elevated Heavy-Duty Structural Erection & Net Metering',
      ],
      inclusionsHi: [
        'उच्च दक्षता वाले बाइफेशियल / TOPCon पैनल्स',
        'डुअल MPPT इनवर्टर क्लाउड टेलीमेट्री ऐप सहित',
        'मजबूत एलिवेटेड स्ट्रक्चर व संपूर्ण नेट-मीटरिंग',
      ],
    },
  ];

  return (
    <section
      id="solar-packages"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-[#F8FAFC]/50 scroll-mt-16"
    >
      <div id="finance-emi" className="scroll-mt-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>04</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'प्रमाणित आवासीय पैकेज' : 'Residential Systems'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3">
            {isHindi ? 'सोलर पैकेज' : 'Solar Packages'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isHindi
              ? 'आवासीय एवं उच्च-क्षमता ऊर्जा जरूरतों हेतु विशेष रूप से तैयार किए गए उच्च दक्षता वाले रूफटॉप सोलर सिस्टम।'
              : 'Engineered rooftop photovoltaic systems tailored for dependable long-term clean generation.'}
          </p>
        </div>

        {/* 2 Clean & Premium Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative bg-white border border-slate-200/90 hover:border-[#0A192F]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Strip: Capacity & Starting Price */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF9933] block mb-1">
                      {pkg.capacity} Capacity
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F]">
                      {isHindi ? pkg.titleHi : pkg.titleEn}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block font-medium">
                      {isHindi ? 'प्रारंभिक' : 'Starting'}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-mono tabular-nums tracking-tight">
                      {pkg.startingPrice}
                    </div>
                  </div>
                </div>

                {/* One-Line Suitability */}
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {isHindi ? pkg.suitabilityHi : pkg.suitabilityEn}
                </p>

                {/* 3 Key Inclusions with Clean Affordance Icons */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    {isHindi ? 'मुख्य समावेश' : 'Key Inclusions'}
                  </div>

                  {(isHindi ? pkg.inclusionsHi : pkg.inclusionsEn).map((item, idx) => {
                    const icons = [Zap, Shield, Wrench];
                    const IconComp = icons[idx] || CheckCircle2;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-1.5 rounded-md bg-slate-100 text-[#0A192F] shrink-0 mt-0.5">
                          <IconComp className="w-3.5 h-3.5 text-[#FF9933]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Potential Subsidy Note (Conditional, NOT subtracted from price) */}
                <div className="mb-6 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
                  <Info className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">
                      {isHindi ? 'संभावित सब्सिडी: ' : 'Potential subsidy: '}
                    </strong>
                    <span>
                      {isHindi
                        ? 'Sambhavit subsidy: Patrata aur lagu yojana ke niyamon ke adheen.'
                        : 'Potential subsidy: Subject to eligibility and applicable scheme rules.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Action CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGetSolarDetails}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-[#0A192F] hover:bg-[#102342] active:bg-[#060E1A] shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#1B355E] group"
                >
                  <Zap className="w-4 h-4 text-[#FF9933] group-hover:scale-110 transition-transform" />
                  <span>{isHindi ? 'Solar Details Payiye' : 'Get Solar Details'}</span>
                  <ArrowRight className="w-4 h-4 text-[#FF9933] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Higher-Capacity Systems Notice strictly as required */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#0A192F] leading-relaxed">
            {isHindi
              ? 'आपकी आवश्यकता और स्थान की उपयुक्तता के अनुसार, हम 100 kW तक सोलर सिस्टम भी लगाते हैं।'
              : 'We also install solar systems up to 100 kW, according to your requirements and site suitability.'}
          </p>
        </div>

        {/* Shared Disclaimer */}
        <div className="max-w-3xl mx-auto text-center p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">
              {isHindi ? 'महत्वपूर्ण सूचना: ' : 'Notice: '}
            </span>
            {isHindi
              ? 'Prarambhik mulya. Antim quotation site sthiti, upkaran, installation aavashyaktaon aur lagu karon par nirbhar karti hai.'
              : 'Starting prices. Final quotation depends on site conditions, equipment, installation requirements, and applicable taxes.'}
          </p>
        </div>

      </div>
    </section>
  );
};
