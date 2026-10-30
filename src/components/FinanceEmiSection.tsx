import React from 'react';
import { CreditCard, CheckCircle2, ShieldAlert, Sparkles, Calendar, Percent } from 'lucide-react';
import { Language } from '../data/translations';

interface FinanceEmiSectionProps {
  language: Language;
}

export const FinanceEmiSection: React.FC<FinanceEmiSectionProps> = ({ language }) => {
  const isHindi = language === 'hi';

  return (
    <section
      id="finance-emi"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>FINANCE & EMI</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'सौर वित्तीय विकल्प' : 'Flexible Payment Solutions'}
            </span>
          </div>

          {/* Heading strictly as specified */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3 text-balance">
            {isHindi
              ? 'Solar Financing Options Explore Karein'
              : 'Explore Solar Financing Options'}
          </h2>

          {/* Primary Copy strictly as specified */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-pretty">
            {isHindi
              ? 'Patrata aur lender ki approval ke aadhar par, grahak rooftop solar installation ke liye financing vikalp explore kar sakte hain. Uplabdh loan amount, interest rate, tenure, down payment aur repayment ki shartein sambandhit lender dwara nirdharit ki jaati hain.'
              : 'Depending on eligibility and lender approval, customers may be able to explore financing options for rooftop solar installation. Available loan amounts, interest rates, tenure, down payment, and repayment terms are determined by the relevant lender.'}
          </p>
        </div>

        {/* Minimal Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8">
          
          {/* Zero-Down-Payment Feature Card (7 cols) */}
          <div className="md:col-span-7 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF9933] uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4 text-[#FF9933]" />
                <span>{isHindi ? 'डाउन पेमेंट विकल्प' : 'Down Payment Option'}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0A192F] mb-3">
                {isHindi ? 'जीरो-डाउन-पेमेंट फाइनेंसिंग' : 'Zero-Down-Payment Financing'}
              </h3>

              {/* Zero-down-payment wording strictly as specified */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80">
                {isHindi
                  ? 'Zero-down-payment financing eligible grahakon ke liye uplabdh ho sakti hai, jo lender ki approval, financing terms aur lagu sharton ke adheen hai.'
                  : 'Zero-down-payment financing may be available to eligible customers, subject to lender approval, financing terms, and applicable conditions.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>{isHindi ? 'पात्रता आधारित' : 'Subject to Lender Evaluation'}</span>
            </div>
          </div>

          {/* 3 Parameter Overview Cards (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-3">
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <CreditCard className="w-3.5 h-3.5 text-[#FF9933]" />
                <span className="font-semibold">{isHindi ? 'ऋण राशि' : 'Loan Amounts'}</span>
              </div>
              <div className="text-sm font-bold text-[#0A192F]">
                {isHindi ? 'सिस्टम क्षमता अनुसार' : 'Tailored to System Capacity'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isHindi ? '3 kW एवं 5 kW पैकेजों हेतु' : 'Available for 3 kW & 5 kW systems'}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-semibold">{isHindi ? 'पुनर्भुगतान अवधि' : 'Tenure Options'}</span>
              </div>
              <div className="text-sm font-bold text-[#0A192F]">
                {isHindi ? 'लचीली ईएमआई अवधि' : 'Flexible Monthly Tenures'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isHindi ? 'ऋणदाता नियमों के अनुसार' : 'As determined by financing institution'}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Percent className="w-3.5 h-3.5 text-[#0A192F]" />
                <span className="font-semibold">{isHindi ? 'ब्याज दरें' : 'Interest Rates'}</span>
              </div>
              <div className="text-sm font-bold text-[#0A192F]">
                {isHindi ? 'ऋणदाता द्वारा निर्धारित' : 'Lender Determined Rates'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isHindi ? 'क्रेडिट स्कोर व पात्रता के अधीन' : 'Subject to credit profile & approval'}
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Underwriting Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            {isHindi
              ? 'ऋण स्वीकृति गारंटीकृत नहीं है। अंतिम पात्रता, ऋण राशि, ब्याज दर एवं शर्तें स्वतंत्र वित्तीय संस्थान/ऋणदाता के क्रेडिट मूल्यांकन पर निर्भर करती हैं।'
              : 'Loan approval is not guaranteed. Final eligibility, loan sanction, interest rates, and terms are governed solely by the independent lending institution’s credit appraisal.'}
          </p>
        </div>

      </div>
    </section>
  );
};
