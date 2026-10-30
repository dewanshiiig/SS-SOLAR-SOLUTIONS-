import React, { useState, useMemo, useEffect } from 'react';
import {
  RotateCcw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  TrendingDown,
  Calendar,
  Sun,
  ShieldCheck,
  ArrowRight,
  IndianRupee,
  Info,
  CheckCircle2,
  Home,
  Building2,
  Building,
  Sparkles,
  Calculator,
  Sliders,
  X,
  CreditCard,
  Table as TableIcon,
  PhoneCall,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { Language } from '../data/translations';

export type ConnectionCategory =
  | 'individual_residential'
  | 'commercial'
  | 'industrial'
  | 'society'
  | 'unknown';

interface SolarSavingsCalculatorProps {
  language: Language;
  onGetSolarDetails: () => void;
  capacity?: number;
  onCapacityChange?: (kw: number) => void;
}

type ExplanationKey =
  | 'capacity'
  | 'generation'
  | 'savings'
  | 'subsidy'
  | 'effectiveCost'
  | 'payback'
  | 'twentyFiveYearBenefit';

export const SolarSavingsCalculator: React.FC<SolarSavingsCalculatorProps> = ({
  language,
  onGetSolarDetails,
  capacity: controlledCapacity,
  onCapacityChange,
}) => {
  const isHindi = language === 'hi';

  // --- QUESTION A: Where do you need solar? ---
  // 'home' | 'business' | 'other'
  const [placeType, setPlaceType] = useState<'home' | 'business' | 'other'>('home');

  // --- QUESTION B: Monthly electricity bill ---
  const [isBillUnknown, setIsBillUnknown] = useState<boolean>(false);
  const [monthlyBillInput, setMonthlyBillInput] = useState<number>(3000);

  // --- QUESTION C: What capacity do you need? ---
  // 'suggest' | '3' | '5' | 'higher'
  const [capacityChoice, setCapacityChoice] = useState<'suggest' | '3' | '5' | 'higher'>('3');
  const [customHigherKw, setCustomHigherKw] = useState<number>(10);

  // Synchronize internal capacity with controlled prop or choices
  const [internalCapacity, setInternalCapacity] = useState<number>(controlledCapacity || 3);

  // Handle external prop updates (e.g. user clicked 5 kW card elsewhere on page)
  useEffect(() => {
    if (controlledCapacity !== undefined) {
      setInternalCapacity(controlledCapacity);
      if (controlledCapacity === 3) setCapacityChoice('3');
      else if (controlledCapacity === 5) setCapacityChoice('5');
      else if (controlledCapacity > 5) {
        setCapacityChoice('higher');
        setCustomHigherKw(controlledCapacity);
      }
    }
  }, [controlledCapacity]);

  // Derived suggested capacity based on bill
  const suggestedKwFromBill = useMemo(() => {
    if (isBillUnknown || monthlyBillInput <= 0) return 3;
    // Indore / MP Discom approximate average domestic rate ~ ₹8.00/unit
    // Approx units = bill / 8.00
    // Solar generation in central India ~ 129 units / month / kW (4.3 units/kW/day * 30)
    const units = monthlyBillInput / 8.0;
    const kw = Math.round(units / 129);
    return Math.max(3, Math.min(100, kw));
  }, [isBillUnknown, monthlyBillInput]);

  // Active resolved capacity
  const activeCapacity = useMemo(() => {
    if (capacityChoice === 'suggest') {
      return suggestedKwFromBill;
    } else if (capacityChoice === '3') {
      return 3;
    } else if (capacityChoice === '5') {
      return 5;
    } else {
      return Math.max(6, Math.min(100, customHigherKw || 6));
    }
  }, [capacityChoice, suggestedKwFromBill, customHigherKw]);

  // Keep parent notified
  useEffect(() => {
    if (onCapacityChange && activeCapacity !== controlledCapacity) {
      onCapacityChange(activeCapacity);
    }
  }, [activeCapacity, onCapacityChange, controlledCapacity]);

  // --- QUESTION D: Do you want to pay through EMI? ---
  const [wantsEmi, setWantsEmi] = useState<boolean>(false);
  const [downPaymentInput, setDownPaymentInput] = useState<number>(36000);
  const [customLoanAmount, setCustomLoanAmount] = useState<string>('');
  const [loanInterestRate, setLoanInterestRate] = useState<number>(8.5);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(60);

  // Result display state
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Active explanation drawer / modal
  const [activeExplanation, setActiveExplanation] = useState<ExplanationKey | null>(null);

  // Collapsible 25-Year table
  const [show25YearTable, setShow25YearTable] = useState<boolean>(false);

  // Expandable Assumptions / Advanced Settings
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [importRate, setImportRate] = useState<number>(8.0); // Retail tariff ₹/kWh
  const [exportRate, setExportRate] = useState<number>(2.75); // MP Net metering banking credit rate ₹/kWh
  const [directUseSharePercent, setDirectUseSharePercent] = useState<number>(70); // % of solar used directly in daytime
  const [nonOffsettableCharges, setNonOffsettableCharges] = useState<number>(200); // Fixed discom charges ₹
  const [customQuotation, setCustomQuotation] = useState<string>(''); // For >5 kW systems
  const [annualOperatingCosts, setAnnualOperatingCosts] = useState<number>(0);

  // Reset to initial clean state
  const handleReset = () => {
    setPlaceType('home');
    setIsBillUnknown(false);
    setMonthlyBillInput(3000);
    setCapacityChoice('3');
    setCustomHigherKw(10);
    setWantsEmi(false);
    setDownPaymentInput(36000);
    setCustomLoanAmount('');
    setLoanInterestRate(8.5);
    setLoanTenureMonths(60);
    setHasCalculated(false);
    setActiveExplanation(null);
    setShow25YearTable(false);
    setShowAdvancedSettings(false);
    setImportRate(8.0);
    setExportRate(2.75);
    setDirectUseSharePercent(70);
    setNonOffsettableCharges(200);
    setCustomQuotation('');
    setAnnualOperatingCosts(0);
    if (onCapacityChange) onCapacityChange(3);
  };

  // --- CALCULATION ENGINE ---
  const calcs = useMemo(() => {
    const safeCapacity = Math.max(3, Math.min(100, activeCapacity));
    const safeImportRate = Math.max(1, importRate);

    // 1. Generation
    // Indore / Central India solar model: 4.3 kWh / kW / day (net annual yield ~1,570 kWh/kW/yr)
    const dailyGeneration = safeCapacity * 4.3;
    const monthlyGen = Math.round(dailyGeneration * 30);
    const annualGen = Math.round(dailyGeneration * 365);

    // 2. Consumption
    let monthlyConsumption = 0;
    if (!isBillUnknown && monthlyBillInput > 0) {
      monthlyConsumption = Math.round(
        Math.max(0, monthlyBillInput - nonOffsettableCharges) / safeImportRate
      );
    } else {
      // If bill is unknown, we assume a standard proportionate household load (approx 120 kWh per kW)
      // for illustrative purposes, but clearly flag it
      monthlyConsumption = Math.round(safeCapacity * 115);
    }

    // 3. Savings (Self-consumption + Export credit)
    const directUseShare = Math.max(0, Math.min(1, directUseSharePercent / 100));
    const directUseUnits = Math.min(monthlyConsumption, Math.round(monthlyGen * directUseShare));
    const exportUnits = Math.max(0, monthlyGen - directUseUnits);
    const gridImportUnits = Math.max(0, monthlyConsumption - directUseUnits);

    const directUseValueMonthly = Math.round(directUseUnits * safeImportRate);
    const exportIncomeMonthly = Math.round(exportUnits * Math.max(0, exportRate));

    const monthlyGrossSavings = directUseValueMonthly + exportIncomeMonthly;
    const yearlyBillSavings = Math.round(monthlyGrossSavings * 12);
    const annualNetBenefit = Math.max(0, yearlyBillSavings - Math.max(0, annualOperatingCosts));

    // 4. Subsidy (PM Surya Ghar CFA)
    // Individual residential: min(kW,2)*30,000 + max(0,min(kW-2,1))*18,000 => Capped at ₹78,000 for 3–100 kW
    let potentialSubsidy = 0;
    let subsidyStatus: 'eligible_residential' | 'separate_assessment' = 'separate_assessment';

    if (placeType === 'home') {
      potentialSubsidy =
        Math.min(safeCapacity, 2) * 30000 + Math.max(0, Math.min(safeCapacity - 2, 1)) * 18000;
      subsidyStatus = 'eligible_residential';
    } else {
      potentialSubsidy = 0;
      subsidyStatus = 'separate_assessment';
    }

    // 5. Cost & Pricing
    let approvedStartingPrice: number | null = null;
    if (safeCapacity === 3) approvedStartingPrice = 180000;
    else if (safeCapacity === 5) approvedStartingPrice = 290000;

    let projectCost: number | null = null;
    const customPriceNum = parseFloat(customQuotation);
    if (!isNaN(customPriceNum) && customPriceNum > 0) {
      projectCost = customPriceNum;
    } else if (approvedStartingPrice !== null) {
      projectCost = approvedStartingPrice;
    }

    // Potential Effective Cost = projectCost - conditionalSubsidy (conditional label)
    let potentialEffectiveCost: number | null = null;
    if (projectCost !== null) {
      potentialEffectiveCost = Math.max(0, projectCost - potentialSubsidy);
    }

    // 6. Payback period
    let paybackYearsText: string | null = null;
    let paybackNum: number | null = null;
    if (potentialEffectiveCost !== null && annualNetBenefit > 0) {
      const pb = potentialEffectiveCost / annualNetBenefit;
      if (isFinite(pb) && pb > 0 && pb <= 30) {
        paybackNum = pb;
        paybackYearsText = pb.toFixed(1);
      } else if (pb > 30) {
        paybackYearsText = '> 30';
      }
    }

    // 7. EMI calculations
    let loanAmount: number = 0;
    let monthlyEmi: number | null = null;
    let totalLoanRepayment: number | null = null;
    let totalInterestPaid: number | null = null;

    if (wantsEmi && projectCost !== null) {
      const customLoanNum = parseFloat(customLoanAmount);
      if (!isNaN(customLoanNum) && customLoanNum > 0) {
        loanAmount = customLoanNum;
      } else {
        loanAmount = Math.max(0, projectCost - downPaymentInput);
      }

      const tenure = Math.max(1, loanTenureMonths);
      if (loanInterestRate <= 0) {
        monthlyEmi = Math.round(loanAmount / tenure);
      } else {
        const monthlyRate = loanInterestRate / 100 / 12;
        const emi =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
          (Math.pow(1 + monthlyRate, tenure) - 1);
        if (isFinite(emi) && emi > 0) {
          monthlyEmi = Math.round(emi);
        }
      }

      if (monthlyEmi !== null) {
        totalLoanRepayment = monthlyEmi * tenure;
        totalInterestPaid = Math.max(0, totalLoanRepayment - loanAmount);
      }
    }

    // 8. 25-Year Cumulative Model
    // 0.7% standard crystalline silicon solar panel annual degradation
    const yearlyBreakdown: Array<{
      year: number;
      generation: number;
      savings: number;
      cumulativeSavings: number;
      remainingInvestment: number;
    }> = [];

    let runningCumulativeSavings = 0;
    const initialInvestmentBase = potentialEffectiveCost ?? (projectCost || 0);

    for (let yr = 1; yr <= 25; yr++) {
      const degradationFactor = Math.pow(1 - 0.007, yr - 1);
      const yrGen = Math.round(annualGen * degradationFactor);
      const yrSavings = Math.round(annualNetBenefit * degradationFactor);
      runningCumulativeSavings += yrSavings;
      const remainingInv = Math.max(0, initialInvestmentBase - runningCumulativeSavings);

      yearlyBreakdown.push({
        year: yr,
        generation: yrGen,
        savings: yrSavings,
        cumulativeSavings: runningCumulativeSavings,
        remainingInvestment: remainingInv,
      });
    }

    const estimated25YearTotalBenefit = runningCumulativeSavings;

    return {
      safeCapacity,
      dailyGeneration,
      monthlyGen,
      annualGen,
      monthlyConsumption,
      directUseUnits,
      exportUnits,
      gridImportUnits,
      directUseValueMonthly,
      exportIncomeMonthly,
      yearlyBillSavings,
      annualNetBenefit,
      potentialSubsidy,
      subsidyStatus,
      approvedStartingPrice,
      projectCost,
      potentialEffectiveCost,
      paybackYearsText,
      paybackNum,
      loanAmount,
      monthlyEmi,
      totalLoanRepayment,
      totalInterestPaid,
      estimated25YearTotalBenefit,
      yearlyBreakdown,
    };
  }, [
    activeCapacity,
    placeType,
    isBillUnknown,
    monthlyBillInput,
    wantsEmi,
    downPaymentInput,
    customLoanAmount,
    loanInterestRate,
    loanTenureMonths,
    importRate,
    exportRate,
    directUseSharePercent,
    nonOffsettableCharges,
    customQuotation,
    annualOperatingCosts,
  ]);

  const scrollToResults = () => {
    setHasCalculated(true);
    setTimeout(() => {
      const resEl = document.getElementById('calculator-results');
      if (resEl) {
        resEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section
      id="savings-calculator"
      className="py-14 bg-gradient-to-b from-[#0A192F] via-[#0E223D] to-[#0A192F] text-white scroll-mt-20 relative"
    >
      {/* Anchor alias for #calculator */}
      <div id="calculator" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isHindi ? 'पारदर्शी सोलर निवेश कैलकुलेटर' : 'Transparent Solar Investment Calculator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            {isHindi ? 'अपने सोलर निवेश और बचत का पारदर्शी हिसाब' : 'Calculate Your Solar Investment & Savings'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {isHindi
              ? 'बिना किसी उलझन के 4 आसान सवालों में जानिए कितनी क्षमता, कितनी लागत और हर साल कितना फायदा मिलेगा।'
              : 'Clear, honest estimates in 4 simple steps. See exactly what you invest, what you save, and how every rupee is calculated.'}
          </p>
        </div>

        {/* 1. SIMPLE MAIN SCREEN - 4 QUESTIONS */}
        <div className="bg-[#0F223D]/90 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-sm mb-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-700/60">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
              {isHindi ? 'चरण 1: 4 सरल सवाल' : 'Step 1: 4 Simple Questions'}
            </span>
            <button
              onClick={handleReset}
              className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800"
              title={isHindi ? 'डिफ़ॉल्ट सेटिंग्स रीसेट करें' : 'Reset to defaults'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isHindi ? 'रीसेट करें' : 'Reset'}</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* QUESTION A: Where do you need solar? */}
            <div className="space-y-2.5">
              <label className="block text-sm sm:text-base font-semibold text-white">
                <span className="inline-block w-6 h-6 rounded-full bg-[#FF9933] text-black font-bold text-center text-xs leading-6 mr-2">
                  A
                </span>
                {isHindi ? 'सोलर कहाँ लगवाना चाहते हैं?' : 'Where do you need solar?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPlaceType('home')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-3 transition-all text-left font-medium ${
                    placeType === 'home'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Home className={`w-5 h-5 ${placeType === 'home' ? 'text-[#FF9933]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-sm font-semibold">{isHindi ? 'घर पर' : 'Home'}</div>
                    <div className="text-[11px] text-slate-400">{isHindi ? 'आवासीय (सब्सिडी पात्र)' : 'Residential (CFA eligible)'}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlaceType('business')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-3 transition-all text-left font-medium ${
                    placeType === 'business'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Building2 className={`w-5 h-5 ${placeType === 'business' ? 'text-[#FF9933]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-sm font-semibold">{isHindi ? 'दुकान या व्यवसाय पर' : 'Shop or business'}</div>
                    <div className="text-[11px] text-slate-400">{isHindi ? 'कमर्शियल कनेक्शन' : 'Commercial connection'}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlaceType('other')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-3 transition-all text-left font-medium ${
                    placeType === 'other'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Building className={`w-5 h-5 ${placeType === 'other' ? 'text-[#FF9933]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-sm font-semibold">{isHindi ? 'अन्य / संस्था' : 'Other / Society'}</div>
                    <div className="text-[11px] text-slate-400">{isHindi ? 'सोसाइटी या इंडस्ट्रियल' : 'Society or Industrial'}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* QUESTION B: What is your average monthly electricity bill? */}
            <div className="space-y-2.5 pt-2 border-t border-slate-700/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-sm sm:text-base font-semibold text-white">
                  <span className="inline-block w-6 h-6 rounded-full bg-[#FF9933] text-black font-bold text-center text-xs leading-6 mr-2">
                    B
                  </span>
                  {isHindi ? 'आपका महीने का औसत बिजली बिल कितना है?' : 'What is your average monthly electricity bill?'}
                </label>
                <button
                  type="button"
                  onClick={() => setIsBillUnknown(!isBillUnknown)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto ${
                    isBillUnknown
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'मुझे नहीं पता' : 'I do not know'}</span>
                </button>
              </div>

              {!isBillUnknown ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FF9933]">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <input
                    type="number"
                    min="500"
                    max="1000000"
                    step="100"
                    value={monthlyBillInput}
                    onChange={(e) => setMonthlyBillInput(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full pl-11 pr-24 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent transition-all"
                    placeholder="3000"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">
                    {isHindi ? 'रुपये / महीना' : '₹ / month'}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-800/70 border border-dashed border-slate-700 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {isHindi
                      ? 'कोई बात नहीं! हम 3 kW (लगभग 350-400 यूनिट/माह) के मानक आधार पर अनुमान दिखाएंगे।'
                      : "No problem! We will calculate based on standard 3 kW domestic baseline (~350–400 kWh/mo)."}
                  </span>
                </div>
              )}
            </div>

            {/* QUESTION C: What capacity do you need? */}
            <div className="space-y-2.5 pt-2 border-t border-slate-700/40">
              <label className="block text-sm sm:text-base font-semibold text-white">
                <span className="inline-block w-6 h-6 rounded-full bg-[#FF9933] text-black font-bold text-center text-xs leading-6 mr-2">
                  C
                </span>
                {isHindi ? 'आपको कितनी क्षमता चाहिए?' : 'What capacity do you need?'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCapacityChoice('suggest')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    capacityChoice === 'suggest'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-medium text-amber-400 flex items-center justify-center gap-1 mb-0.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{isHindi ? 'सुझाव चाहिए' : 'Help me choose'}</span>
                  </div>
                  <div className="text-sm font-bold">
                    {capacityChoice === 'suggest' ? `${suggestedKwFromBill} kW` : (isHindi ? 'बिल अनुसार' : 'By bill')}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCapacityChoice('3')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    capacityChoice === '3'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-0.5">{isHindi ? 'लोकप्रिय घर' : 'Popular home'}</div>
                  <div className="text-base font-bold text-white">3 kW</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCapacityChoice('5')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    capacityChoice === '5'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-0.5">{isHindi ? 'बड़ा घर / AC' : 'Large home / AC'}</div>
                  <div className="text-base font-bold text-white">5 kW</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCapacityChoice('higher')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    capacityChoice === 'higher'
                      ? 'bg-[#FF9933]/15 border-[#FF9933] text-white ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-0.5">{isHindi ? 'कमर्शियल / बड़ा' : 'Commercial'}</div>
                  <div className="text-sm font-bold text-white">{isHindi ? 'अधिक क्षमता' : 'Higher capacity'}</div>
                </button>
              </div>

              {/* If "Higher capacity": Show a clean numeric input, 6–100 kW. Do NOT show a large slider to everyone. */}
              {capacityChoice === 'higher' && (
                <div className="mt-3 p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-200">
                      {isHindi ? 'आवश्यक क्षमता दर्ज करें (6 से 100 kW):' : 'Enter desired capacity (6 to 100 kW):'}
                    </label>
                    <span className="text-sm font-bold text-[#FF9933]">{customHigherKw} kW</span>
                  </div>
                  <input
                    type="number"
                    min="6"
                    max="100"
                    step="1"
                    value={customHigherKw}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) || 6;
                      setCustomHigherKw(Math.max(6, Math.min(100, v)));
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  />
                  <p className="text-[11px] text-slate-400">
                    {isHindi
                      ? 'नोट: 5 kW से अधिक क्षमता के लिए हम आपकी साइट की उपयुक्तता के अनुसार कस्टम कोटेशन प्रदान करते हैं।'
                      : 'Note: Capacities above 5 kW require a customized site quotation based on structural feasibility.'}
                  </p>
                </div>
              )}

              {capacityChoice === 'suggest' && (
                <div className="mt-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-lg p-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {isHindi
                      ? `आपके बिजली बिल के आधार पर सुझाई गई उपयुक्त क्षमता: ${suggestedKwFromBill} kW`
                      : `Recommended system size based on your monthly bill: ${suggestedKwFromBill} kW`}
                  </span>
                </div>
              )}
            </div>

            {/* QUESTION D: Do you want to pay through EMI? */}
            <div className="space-y-2.5 pt-2 border-t border-slate-700/40">
              <label className="block text-sm sm:text-base font-semibold text-white">
                <span className="inline-block w-6 h-6 rounded-full bg-[#FF9933] text-black font-bold text-center text-xs leading-6 mr-2">
                  D
                </span>
                {isHindi ? 'क्या आप EMI के माध्यम से भुगतान करना चाहते हैं?' : 'Do you want to pay through EMI?'}
              </label>

              <div className="grid grid-cols-2 gap-3 max-w-xs">
                <button
                  type="button"
                  onClick={() => setWantsEmi(false)}
                  className={`py-2.5 px-4 rounded-xl border text-center font-semibold text-sm transition-all ${
                    !wantsEmi
                      ? 'bg-slate-700 border-slate-500 text-white shadow'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {isHindi ? 'नहीं (एकमुश्त)' : 'No (Upfront)'}
                </button>
                <button
                  type="button"
                  onClick={() => setWantsEmi(true)}
                  className={`py-2.5 px-4 rounded-xl border text-center font-semibold text-sm transition-all ${
                    wantsEmi
                      ? 'bg-[#FF9933]/20 border-[#FF9933] text-[#FF9933] ring-1 ring-[#FF9933]'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {isHindi ? 'हाँ (आसान किश्त)' : 'Yes (Easy EMI)'}
                </button>
              </div>

              {/* If Yes: Show only Down payment, Loan amount, Interest rate, Tenure in months */}
              {wantsEmi && (
                <div className="mt-3 p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-3">
                  <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'EMI विवरण' : 'EMI Details'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">
                        {isHindi ? 'पहले कितना देना है? (डाउन पेमेंट)' : 'Down payment amount'}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={downPaymentInput}
                          onChange={(e) => setDownPaymentInput(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF9933]"
                          placeholder="36000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">
                        {isHindi ? 'कितना लोन लेना है? (यदि अलग हो)' : 'Loan amount (if custom)'}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="5000"
                          value={customLoanAmount}
                          onChange={(e) => setCustomLoanAmount(e.target.value)}
                          className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF9933]"
                          placeholder={
                            calcs.projectCost
                              ? `${Math.max(0, calcs.projectCost - downPaymentInput)}`
                              : 'e.g. 150000'
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">
                        {isHindi ? 'ब्याज दर? (% प्रति वर्ष)' : 'Interest rate (% per annum)'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.1"
                        value={loanInterestRate}
                        onChange={(e) => setLoanInterestRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF9933]"
                        placeholder="8.5"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">
                        {isHindi ? 'कितने महीनों में चुकाना है?' : 'Tenure in months'}
                      </label>
                      <select
                        value={loanTenureMonths}
                        onChange={(e) => setLoanTenureMonths(parseInt(e.target.value) || 60)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF9933]"
                      >
                        <option value={36}>36 {isHindi ? 'महीने (3 साल)' : 'Months (3 yrs)'}</option>
                        <option value={48}>48 {isHindi ? 'महीने (4 साल)' : 'Months (4 yrs)'}</option>
                        <option value={60}>60 {isHindi ? 'महीने (5 साल)' : 'Months (5 yrs)'}</option>
                        <option value={84}>84 {isHindi ? 'महीने (7 साल)' : 'Months (7 yrs)'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SEE ESTIMATE ACTION BUTTON */}
          <div className="mt-8 pt-5 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 order-2 sm:order-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>
                {showAdvancedSettings
                  ? (isHindi ? 'उन्नत सेटिंग्स छिपाएं' : 'Hide advanced tariff settings')
                  : (isHindi ? 'उन्नत दर व सेटिंग्स (वैकल्पिक)' : 'Advanced tariff assumptions (optional)')}
              </span>
              {showAdvancedSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={scrollToResults}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-[#FF9933] text-black font-extrabold text-base sm:text-lg shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 order-1 sm:order-2"
            >
              <span>{isHindi ? 'मेरा अनुमान देखें' : 'See My Estimate'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* ADVANCED SETTINGS COLLAPSIBLE AREA */}
          {showAdvancedSettings && (
            <div className="mt-4 p-4 bg-slate-900/90 border border-slate-700 rounded-xl space-y-3 text-xs text-slate-300">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>{isHindi ? 'गणना में प्रयुक्त पारदर्शी मान्यताएं' : 'Configured Calculation Assumptions'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{isHindi ? 'बिजली दर (₹/यूनिट)' : 'Grid tariff (₹/unit)'}</label>
                  <input
                    type="number"
                    step="0.1"
                    value={importRate}
                    onChange={(e) => setImportRate(parseFloat(e.target.value) || 8.0)}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{isHindi ? 'एक्सपोर्ट/बैंकिंग दर (₹/यूनिट)' : 'Export banking credit (₹/unit)'}</label>
                  <input
                    type="number"
                    step="0.05"
                    value={exportRate}
                    onChange={(e) => setExportRate(parseFloat(e.target.value) || 2.75)}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{isHindi ? 'दिन में सीधे उपयोग (%)' : 'Direct daytime consumption (%)'}</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={directUseSharePercent}
                    onChange={(e) => setDirectUseSharePercent(parseInt(e.target.value) || 70)}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{isHindi ? 'फिक्स चार्ज (₹/माह - जो कम नहीं होते)' : 'Fixed monthly charges (₹)'}</label>
                  <input
                    type="number"
                    value={nonOffsettableCharges}
                    onChange={(e) => setNonOffsettableCharges(parseInt(e.target.value) || 200)}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
                {activeCapacity > 5 && (
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">
                      {isHindi
                        ? 'वैकल्पिक: यदि आपके पास इस बड़े सिस्टम का कोटेशन है (₹):'
                        : 'Optional: Enter known quote for this higher capacity system (₹):'}
                    </label>
                    <input
                      type="number"
                      value={customQuotation}
                      onChange={(e) => setCustomQuotation(e.target.value)}
                      placeholder="e.g. 550000"
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. ONE CLEAR RESULT SCREEN */}
        <div id="calculator-results" className="scroll-mt-6">
          <div className="bg-gradient-to-b from-[#0F223D] to-[#0A192F] border-2 border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            {/* Top Header Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-700/80">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {isHindi ? 'आपका पारदर्शी अनुमान' : 'Your Transparent Estimate'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isHindi ? 'आपका अनुमानित निवेश' : 'Your Estimated Investment'}
                </h3>
              </div>

              {/* Quick Summary Pill & Edit Jump */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300">
                  {calcs.safeCapacity} kW {placeType === 'home' ? (isHindi ? 'घरेलू' : 'Home') : (isHindi ? 'कमर्शियल' : 'Commercial')}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const topEl = document.getElementById('calculator');
                    if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1 rounded-full bg-[#FF9933]/20 hover:bg-[#FF9933]/30 border border-[#FF9933]/50 text-xs font-bold text-[#FF9933] transition-colors"
                >
                  {isHindi ? 'इनपुट बदलें' : 'Edit inputs'}
                </button>
              </div>
            </div>

            {/* TOP INVESTMENT HIGHLIGHT CARD */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-500/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                <div className="md:col-span-2">
                  <div className="text-xs uppercase font-semibold text-slate-400 mb-1">
                    {isHindi ? 'सब्सिडी के बाद संभावित प्रभावी निवेश' : 'Potential Effective Investment (Post-Subsidy)'}
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white flex items-center gap-1">
                    {calcs.potentialEffectiveCost !== null ? (
                      <>
                        <span className="text-[#FF9933]">₹</span>
                        <span>{calcs.potentialEffectiveCost.toLocaleString('en-IN')}</span>
                      </>
                    ) : (
                      <span className="text-xl text-amber-300 font-bold">
                        {isHindi ? 'कस्टम कोटेशन आवश्यक' : 'Custom quotation required'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    {calcs.potentialEffectiveCost !== null
                      ? isHindi
                        ? `शुरुआती अनुमानित लागत ₹${(calcs.projectCost || 0).toLocaleString('en-IN')} में से संभावित सब्सिडी ₹${calcs.potentialSubsidy.toLocaleString('en-IN')} घटाकर।`
                        : `Starting price ₹${(calcs.projectCost || 0).toLocaleString('en-IN')} minus conditional CFA subsidy ₹${calcs.potentialSubsidy.toLocaleString('en-IN')}.`
                      : isHindi
                      ? '5 kW से ऊपर की क्षमता के लिए उपकरण और छत की तकनीकी जांच के बाद वास्तविक मूल्य तय होता है।'
                      : 'Systems above 5 kW are custom engineered to site specifications.'}
                  </p>
                  <p className="text-[11px] text-amber-400/90 font-medium mt-1">
                    {isHindi
                      ? '*यह शर्त-युक्त अनुमान है, शुरुआती नकद भुगतान नहीं। सब्सिडी मंज़ूरी के बाद खाते में आती है।'
                      : '*Conditional estimate, not an upfront cash discount. Subsidy is disbursed to bank account post-approval.'}
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 space-y-2 text-center md:text-left">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">
                    {isHindi ? 'अनुमानित पेबैक अवधि' : 'Estimated Payback Period'}
                  </div>
                  <div className="text-2xl font-black text-emerald-400">
                    {calcs.paybackYearsText
                      ? `${calcs.paybackYearsText} ${isHindi ? 'साल' : 'Years'}`
                      : isHindi
                      ? 'कोटेशन आवश्यक'
                      : 'Quote required'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isHindi ? 'वार्षिक बिजली बचत द्वारा निवेश वसूली' : 'Investment recovered through electricity savings'}
                  </div>
                </div>
              </div>
            </div>

            {/* THE 7 PRIMARY RESULTS */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                {isHindi ? 'मुख्य परिणाम और पारदर्शी गणना' : 'Primary Results & Plain-Language Calculations'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {/* 1. Selected or suggested capacity */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{isHindi ? '1. चुनी गई / सुझाई गई क्षमता' : '1. Selected/Suggested Capacity'}</span>
                      <Sun className="w-4 h-4 text-[#FF9933]" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {calcs.safeCapacity} kW
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {placeType === 'home'
                        ? (isHindi ? 'घरेलू ग्रिड-टाईड सोलर' : 'Residential On-Grid Solar')
                        : (isHindi ? 'कमर्शियल / संस्थागत कनेक्शन' : 'Commercial / Institutional Connection')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveExplanation('capacity')}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start pt-2 border-t border-slate-700/60 w-full"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                  </button>
                </div>

                {/* 2. Estimated average monthly generation */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{isHindi ? '2. हर महीने अनुमानित बिजली उत्पादन' : '2. Estimated Monthly Generation'}</span>
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      ~{calcs.monthlyGen.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-300">kWh / {isHindi ? 'यूनिट' : 'units'}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isHindi ? `लगभग ${(calcs.dailyGeneration).toFixed(1)} यूनिट प्रति दिन (4.3 यूनिट/kW)` : `~${calcs.dailyGeneration.toFixed(1)} units/day at 4.3 kWh/kW avg`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveExplanation('generation')}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start pt-2 border-t border-slate-700/60 w-full"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                  </button>
                </div>

                {/* 3. Estimated yearly bill savings */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{isHindi ? '3. हर साल बिजली बिल में संभावित बचत' : '3. Estimated Yearly Bill Savings'}</span>
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      ₹{calcs.yearlyBillSavings.toLocaleString('en-IN')}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isHindi ? `लगभग ₹${Math.round(calcs.yearlyBillSavings / 12).toLocaleString('en-IN')} हर महीने की बचत` : `~₹${Math.round(calcs.yearlyBillSavings / 12).toLocaleString('en-IN')} estimated monthly savings`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveExplanation('savings')}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start pt-2 border-t border-slate-700/60 w-full"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                  </button>
                </div>

                {/* 4. Conditional subsidy */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{isHindi ? '4. संभावित सब्सिडी (अगर पात्र हों)' : '4. Conditional Subsidy (If Eligible)'}</span>
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {calcs.potentialSubsidy > 0 ? (
                        <>₹{calcs.potentialSubsidy.toLocaleString('en-IN')}</>
                      ) : (
                        <span className="text-base text-amber-400 font-semibold">
                          {isHindi ? 'अलग मूल्यांकन' : 'Separate assessment'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {calcs.potentialSubsidy > 0
                        ? (isHindi ? 'पीएम सूर्य घर अधिकतम सीमा (3–100 kW हेतु ₹78,000)' : 'PM Surya Ghar CFA maximum household cap')
                        : (isHindi ? 'व्यावसायिक कनेक्शन हेतु घरेलू CFA लागू नहीं' : 'Commercial connections assessed separately')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveExplanation('subsidy')}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start pt-2 border-t border-slate-700/60 w-full"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                  </button>
                </div>

                {/* 5. Conditional effective investment */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{isHindi ? '5. सब्सिडी के बाद संभावित निवेश' : '5. Conditional Effective Investment'}</span>
                      <IndianRupee className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {calcs.potentialEffectiveCost !== null ? (
                        <>₹{calcs.potentialEffectiveCost.toLocaleString('en-IN')}</>
                      ) : (
                        <span className="text-base text-amber-400 font-semibold">
                          {isHindi ? 'कोटेशन आवश्यक' : 'Quotation needed'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {calcs.projectCost !== null
                        ? (isHindi ? `शुरुआती लागत ₹${calcs.projectCost.toLocaleString('en-IN')} - सब्सिडी` : `System price ₹${calcs.projectCost.toLocaleString('en-IN')} - CFA`)
                        : (isHindi ? 'कस्टम क्षमता के लिए व्यक्तिगत कोटेशन' : 'Custom pricing for >5 kW')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveExplanation('effectiveCost')}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start pt-2 border-t border-slate-700/60 w-full"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                  </button>
                </div>

                {/* 6. Estimated payback period */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{isHindi ? '6. कितने साल में निवेश वापस' : '6. Estimated Payback Period'}</span>
                      <Calendar className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {calcs.paybackYearsText
                        ? `${calcs.paybackYearsText} ${isHindi ? 'साल' : 'Years'}`
                        : isHindi
                        ? 'कोटेशन आवश्यक'
                        : 'Quote required'}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isHindi ? 'प्रभावी निवेश ÷ वार्षिक शुद्ध बिजली बचत' : 'Effective cost ÷ annual net electricity benefit'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveExplanation('payback')}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start pt-2 border-t border-slate-700/60 w-full"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                  </button>
                </div>

                {/* 7. Estimated 25-year total benefit */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between sm:col-span-2 lg:col-span-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>{isHindi ? '7. 25 साल में अनुमानित कुल फायदा (बिजली बचत)' : '7. Estimated 25-Year Cumulative Benefit'}</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                        ₹{calcs.estimated25YearTotalBenefit.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        {isHindi
                          ? '0.7% प्रति वर्ष सोलर पैनल गिरावट दर को ध्यान में रखते हुए 25 साल की कुल संचयी बिजली बिल बचत।'
                          : 'Cumulative 25-year savings modeled with standard 0.7%/yr crystalline degradation.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveExplanation('twentyFiveYearBenefit')}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-xs font-semibold text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'यह कैसे निकला?' : 'How was this calculated?'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPLANATION PANEL MODAL / CARD (Triggered by "यह कैसे निकला?") */}
            {activeExplanation && (
              <div className="mt-6 p-5 rounded-2xl bg-slate-900 border-2 border-amber-500/70 shadow-2xl relative animate-fadeIn">
                <button
                  type="button"
                  onClick={() => setActiveExplanation(null)}
                  className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  title={isHindi ? 'बंद करें' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-[#FF9933]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h5 className="text-base font-bold text-white">
                    {isHindi ? 'यह कैसे निकला? (पारदर्शी हिसाब)' : 'How was this calculated? (Transparent Breakdown)'}
                  </h5>
                </div>

                {/* Explanation Content per Key */}
                {activeExplanation === 'capacity' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi
                        ? `चुनी गई क्षमता: ${calcs.safeCapacity} kW`
                        : `Selected Capacity: ${calcs.safeCapacity} kW`}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? 'फॉर्मूला / नियम:' : 'Rule / Formula:'}</strong> {isHindi ? 'मासिक बिजली यूनिट = (बिल - फिक्स चार्ज) ÷ टैरिफ दर' : 'Monthly units = (Bill - Fixed charges) ÷ Tariff'}
                      </div>
                      <div>
                        <strong>{isHindi ? 'इनपुट:' : 'Inputs:'}</strong> {isBillUnknown ? 'मानक घरेलू आधार' : `बिल = ₹${monthlyBillInput}, फिक्स चार्ज = ₹${nonOffsettableCharges}, दर = ₹${importRate}/यूनिट`}
                      </div>
                      <div>
                        <strong>{isHindi ? 'अनुमानित उपभोग:' : 'Estimated Consumption:'}</strong> ~{calcs.monthlyConsumption} kWh / महीना
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {isHindi
                        ? 'सेंट्रल इंडिया में 1 kW सोलर प्रति माह औसतन ~129 यूनिट बनाता है। इसलिए आपके उपभोग को संतुलित करने हेतु यह क्षमता सुझाई/चुनी गई है।'
                        : 'In Central India, 1 kW solar generates ~129 units/month. The capacity is sized to offset your monthly consumption.'}
                    </p>
                  </div>
                )}

                {activeExplanation === 'generation' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi
                        ? `अनुमानित मासिक उत्पादन: ${calcs.monthlyGen} यूनिट (${calcs.safeCapacity} kW × 4.3 यूनिट/दिन × 30 दिन)`
                        : `Estimated Monthly Generation: ${calcs.monthlyGen} units (${calcs.safeCapacity} kW × 4.3 units/day × 30 days)`}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? 'फॉर्मूला:' : 'Formula:'}</strong> monthlyGeneration = capacity × dailyYield × 30 days
                      </div>
                      <div>
                        <strong>{isHindi ? 'इनपुट व मान्यता:' : 'Inputs & Assumptions:'}</strong> {calcs.safeCapacity} kW × 4.3 kWh/kW/day = ~{calcs.dailyGeneration.toFixed(1)} kWh/दिन
                      </div>
                      <div>
                        <strong>{isHindi ? 'वार्षिक उत्पादन:' : 'Annual Generation:'}</strong> ~{calcs.annualGen.toLocaleString('en-IN')} kWh / वर्ष
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {isHindi
                        ? 'शामिल नहीं: अत्यधिक धूल, बारिश के दिनों में घने बादल या आस-पास के पेड़ों की छाया से वास्तविक उत्पादन में मौसम अनुसार अंतर आ सकता है।'
                        : 'Not included: Heavy monsoon cloud cover, severe dust accumulation, or local building/tree shading.'}
                    </p>
                  </div>
                )}

                {activeExplanation === 'savings' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi
                        ? 'बिजली बिल की बचत का पारदर्शी गणित:'
                        : 'Transparent Bill Savings Calculation:'}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? '1. सीधे उपयोग हुई बिजली:' : '1. Direct self-consumption:'}</strong> {calcs.directUseUnits} यूनिट × ₹{importRate} = ₹{calcs.directUseValueMonthly} / माह
                      </div>
                      <div>
                        <strong>{isHindi ? '2. ग्रिड को भेजी गई बिजली (बैंकिंग):' : '2. Net export credit:'}</strong> {calcs.exportUnits} यूनिट × ₹{exportRate} = ₹{calcs.exportIncomeMonthly} / माह
                      </div>
                      <div>
                        <strong>{isHindi ? '3. कुल मासिक बचत:' : '3. Total Monthly Savings:'}</strong> ₹{calcs.directUseValueMonthly} + ₹{calcs.exportIncomeMonthly} = ₹{Math.round(calcs.yearlyBillSavings / 12)} / माह
                      </div>
                      <div>
                        <strong>{isHindi ? '4. वार्षिक बचत:' : '4. Annual Savings:'}</strong> ₹{Math.round(calcs.yearlyBillSavings / 12)} × 12 = ₹{calcs.yearlyBillSavings.toLocaleString('en-IN')} / वर्ष
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {isHindi
                        ? 'नोट: फिक्स चार्ज (लगभग ₹200) हमेशा देय रहते हैं। बची हुई बिजली की गणना मध्य प्रदेश नेट-मीटरिंग के निर्धारित ₹2.75/यूनिट बैंकिंग क्रेडिट दर पर की गई है।'
                        : 'Note: Fixed Discom meter charges remain payable. Excess solar exports are credited at the configured MP Discom banking rate (₹2.75/kWh).'}
                    </p>
                  </div>
                )}

                {activeExplanation === 'subsidy' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi
                        ? 'पीएम सूर्य घर मुफ़्त बिजली योजना सब्सिडी नियम:'
                        : 'PM Surya Ghar Central Financial Assistance (CFA) Rules:'}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? 'नियम:' : 'Rules:'}</strong> पहले 2 kW पर ₹30,000/kW + तीसरे kW पर ₹18,000
                      </div>
                      <div>
                        <strong>{isHindi ? 'अधिकतम सीमा:' : 'Maximum Cap:'}</strong> 3 kW से 100 kW तक ₹78,000 अधिकतम
                      </div>
                      <div>
                        <strong>{isHindi ? 'इस सिस्टम हेतु:' : 'For this system:'}</strong> {calcs.subsidyStatus === 'eligible_residential' ? `₹${calcs.potentialSubsidy.toLocaleString('en-IN')} (पात्र घरेलू कनेक्शन हेतु)` : '₹0 (कमर्शियल कनेक्शन हेतु अलग मूल्यांकन)'}
                      </div>
                    </div>
                    <p className="text-amber-400 text-xs font-medium">
                      {isHindi
                        ? 'महत्वपूर्ण: सब्सिडी सीधे आपके बैंक खाते में राष्ट्रीय पोर्टल (National Portal) द्वारा मीटर और इंस्पेक्शन मंज़ूरी के बाद जमा की जाती है। यह वेंडर द्वारा सीधे काटी जाने वाली नकद छूट नहीं है।'
                        : 'Important: CFA subsidy is credited directly to the beneficiary bank account by the National Portal upon meter installation and inspection approval. It is not an upfront vendor discount.'}
                    </p>
                  </div>
                )}

                {activeExplanation === 'effectiveCost' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi
                        ? 'सब्सिडी के बाद संभावित निवेश का हिसाब:'
                        : 'Effective Investment Breakdown:'}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? 'सिस्टम की शुरुआती कीमत:' : 'Starting System Price:'}</strong> {calcs.projectCost !== null ? `₹${calcs.projectCost.toLocaleString('en-IN')}` : 'अलग कोटेशन आवश्यक'}
                      </div>
                      <div>
                        <strong>{isHindi ? 'संभावित सब्सिडी (घरेलू):' : 'Conditional CFA Subsidy:'}</strong> -₹{calcs.potentialSubsidy.toLocaleString('en-IN')}
                      </div>
                      <div>
                        <strong>{isHindi ? 'सब्सिडी के बाद प्रभावी लागत:' : 'Effective Post-Subsidy Investment:'}</strong> {calcs.potentialEffectiveCost !== null ? `₹${calcs.potentialEffectiveCost.toLocaleString('en-IN')}` : 'कोटेशन आवश्यक'}
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {isHindi
                        ? 'शुरुआती स्वीकृत मूल्य: 3 kW = ₹1,80,000, 5 kW = ₹2,90,000। 5 kW से अधिक क्षमता के लिए साइट सर्वे के बाद व्यक्तिगत कोटेशन प्रदान किया जाता है।'
                        : 'Approved starting prices: 3 kW = ₹1,80,000; 5 kW = ₹2,90,000. Larger capacities require a custom quotation.'}
                    </p>
                  </div>
                )}

                {activeExplanation === 'payback' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi ? 'पेबैक अवधि का गणित:' : 'Payback Period Calculation:'}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? 'फॉर्मूला:' : 'Formula:'}</strong> Payback (Years) = Effective Cost ÷ Annual Net Savings
                      </div>
                      <div>
                        <strong>{isHindi ? 'गणना:' : 'Calculation:'}</strong> ₹{(calcs.potentialEffectiveCost || 0).toLocaleString('en-IN')} ÷ ₹{calcs.annualNetBenefit.toLocaleString('en-IN')} = {calcs.paybackYearsText || 'N/A'} {isHindi ? 'साल' : 'years'}
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {isHindi
                        ? 'पेबैक समय वह अवधि है जिसमें आपकी बिजली बिल की कुल बचत आपके द्वारा सोलर में लगाए गए पैसों की पूरी भरपाई कर देती है। इसके बाद अगले 20+ साल तक बिजली लगभग मुफ़्त रहती है।'
                        : 'The payback period is the time required for electricity bill savings to fully recover your investment. Beyond this point, the solar system delivers essentially free power for the remaining 20+ years.'}
                    </p>
                  </div>
                )}

                {activeExplanation === 'twentyFiveYearBenefit' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="text-white font-medium">
                      {isHindi ? '25 साल का संचयी फायदा कैसे गिना गया?' : 'How 25-Year Cumulative Benefit Was Calculated:'}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 font-mono text-xs text-amber-300">
                      <div>
                        <strong>{isHindi ? 'प्रथम वर्ष बचत:' : 'Year 1 Net Savings:'}</strong> ₹{calcs.yearlyBillSavings.toLocaleString('en-IN')}
                      </div>
                      <div>
                        <strong>{isHindi ? 'पैनल डिग्रेडेशन दर:' : 'Degradation Rate:'}</strong> 0.7% {isHindi ? 'प्रति वर्ष' : 'per year (industry standard)'}
                      </div>
                      <div>
                        <strong>{isHindi ? '25 साल की कुल संचयी बचत:' : '25-Year Cumulative Total:'}</strong> ₹{calcs.estimated25YearTotalBenefit.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {isHindi
                        ? 'पारदर्शी नोट: इसमें भविष्य में बिजली दरों में होने वाली संभावित बढ़ोतरी या इनवर्टर के 10-12 साल बाद संभावित रखरखाव का अनुमान नहीं जोड़ा गया है, ताकि आंकड़े पूरी तरह पारदर्शी और ईमानदार रहें।'
                        : 'Transparent note: This does not extrapolate speculative grid tariff inflation or 10-year inverter replacements, ensuring an honest, grounded estimate.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 4. INVESTMENT LEDGER ("आपके पैसे का हिसाब / Your money breakdown") */}
            <div className="mt-8 pt-6 border-t border-slate-700/80">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#FF9933]" />
                <span>{isHindi ? 'आपके पैसे का हिसाब' : 'Your Money Breakdown (Investment Ledger)'}</span>
              </h4>

              <div className="bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden text-xs sm:text-sm">
                <div className="divide-y divide-slate-800">
                  <div className="p-3 sm:px-4 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">
                      {isHindi ? `सोलर सिस्टम शुरुआती कीमत (${calcs.safeCapacity} kW)` : `Solar System Starting Price (${calcs.safeCapacity} kW)`}
                    </span>
                    <span className="font-bold text-white">
                      {calcs.projectCost !== null ? `₹${calcs.projectCost.toLocaleString('en-IN')}` : (isHindi ? 'अलग कोटेशन आवश्यक' : 'Custom quotation required')}
                    </span>
                  </div>

                  <div className="p-3 sm:px-4 flex items-center justify-between bg-emerald-950/20">
                    <span className="text-emerald-300 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      {isHindi ? 'संभावित पीएम सूर्य घर सब्सिडी' : 'Conditional PM Surya Ghar Subsidy'}
                    </span>
                    <span className="font-bold text-emerald-400">
                      {calcs.potentialSubsidy > 0 ? `- ₹${calcs.potentialSubsidy.toLocaleString('en-IN')}` : (isHindi ? 'लागू नहीं / अलग मूल्यांकन' : 'Not applicable / Separate')}
                    </span>
                  </div>

                  <div className="p-3 sm:px-4 flex items-center justify-between bg-slate-800/60">
                    <span className="text-white font-bold">
                      {isHindi ? 'सब्सिडी के बाद संभावित प्रभावी निवेश' : 'Conditional Effective Investment'}
                    </span>
                    <span className="font-black text-amber-400 text-base">
                      {calcs.potentialEffectiveCost !== null ? `₹${calcs.potentialEffectiveCost.toLocaleString('en-IN')}` : (isHindi ? 'कोटेशन आवश्यक' : 'Quote required')}
                    </span>
                  </div>

                  {/* If EMI is selected */}
                  {wantsEmi && (
                    <>
                      <div className="p-3 sm:px-4 flex items-center justify-between bg-blue-950/20">
                        <span className="text-slate-300">
                          {isHindi ? 'डाउन पेमेंट (प्रारंभिक नकद)' : 'Down payment'}
                        </span>
                        <span className="font-semibold text-white">₹{downPaymentInput.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 sm:px-4 flex items-center justify-between bg-blue-950/20">
                        <span className="text-slate-300">
                          {isHindi ? 'लोन मूलधन (प्रिंसिपल)' : 'Loan Principal'}
                        </span>
                        <span className="font-semibold text-white">₹{calcs.loanAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 sm:px-4 flex items-center justify-between bg-blue-950/30">
                        <span className="text-amber-300 font-semibold">
                          {isHindi ? `मासिक EMI (${loanTenureMonths} माह, ${loanInterestRate}% ब्याज)` : `Monthly EMI (${loanTenureMonths} mos, ${loanInterestRate}%)`}
                        </span>
                        <span className="font-black text-amber-400">
                          {calcs.monthlyEmi !== null ? `₹${calcs.monthlyEmi.toLocaleString('en-IN')} / माह` : 'N/A'}
                        </span>
                      </div>
                      <div className="p-3 sm:px-4 flex items-center justify-between bg-slate-900">
                        <span className="text-slate-400 text-xs">
                          {isHindi ? 'कुल लोन भुगतान (मूल + ब्याज)' : 'Total Loan Repayment'}
                        </span>
                        <span className="font-medium text-slate-300 text-xs">
                          {calcs.totalLoanRepayment !== null ? `₹${calcs.totalLoanRepayment.toLocaleString('en-IN')}` : 'N/A'}
                        </span>
                      </div>
                      <div className="p-3 sm:px-4 flex items-center justify-between bg-slate-900">
                        <span className="text-slate-400 text-xs">
                          {isHindi ? 'कुल दिया जाने वाला ब्याज' : 'Total Interest Paid'}
                        </span>
                        <span className="font-medium text-amber-400 text-xs">
                          {calcs.totalInterestPaid !== null ? `₹${calcs.totalInterestPaid.toLocaleString('en-IN')}` : 'N/A'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 5. YEARLY BENEFIT LEDGER ("हर साल का फायदा / Yearly benefit breakdown") */}
            <div className="mt-8 pt-6 border-t border-slate-700/80">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>{isHindi ? 'हर साल का फायदा' : 'Yearly Benefit Breakdown'}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl">
                  <div className="text-[11px] text-slate-400">{isHindi ? 'वार्षिक बिजली उत्पादन' : 'Annual Generation'}</div>
                  <div className="text-base font-bold text-white mt-0.5">~{calcs.annualGen.toLocaleString('en-IN')} kWh</div>
                </div>
                <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl">
                  <div className="text-[11px] text-slate-400">{isHindi ? 'सीधे उपयोग (70%)' : 'Direct Daytime Use'}</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">~{(calcs.directUseUnits * 12).toLocaleString('en-IN')} kWh</div>
                </div>
                <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl">
                  <div className="text-[11px] text-slate-400">{isHindi ? 'ग्रिड को भेजा (एक्सपोर्ट)' : 'Export to Grid'}</div>
                  <div className="text-base font-bold text-blue-400 mt-0.5">~{(calcs.exportUnits * 12).toLocaleString('en-IN')} kWh</div>
                </div>
                <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl">
                  <div className="text-[11px] text-slate-400">{isHindi ? 'शुद्ध वार्षिक लाभ' : 'Net Annual Benefit'}</div>
                  <div className="text-base font-bold text-[#FF9933] mt-0.5">₹{calcs.annualNetBenefit.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* 6. COLLAPSIBLE 25-YEAR VIEW ("समय के साथ फायदा / Benefit over time") */}
            <div className="mt-6 pt-5 border-t border-slate-700/80">
              <button
                type="button"
                onClick={() => setShow25YearTable(!show25YearTable)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <TableIcon className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {isHindi ? 'समय के साथ फायदा (25 साल का विस्तृत टेबल)' : 'Benefit Over Time (25-Year Detailed Table)'}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {isHindi ? 'पैनल डिग्रेडेशन और संचयी बचत का वर्ष-दर-वर्ष हिसाब' : 'Year-by-year view with standard 0.7% degradation'}
                    </span>
                  </div>
                </div>
                {show25YearTable ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {show25YearTable && (
                <div className="mt-3 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/90">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="text-[11px] uppercase bg-slate-800 text-slate-400 border-b border-slate-700">
                      <tr>
                        <th className="py-2.5 px-3">{isHindi ? 'वर्ष' : 'Year'}</th>
                        <th className="py-2.5 px-3">{isHindi ? 'अनुमानित उत्पादन (kWh)' : 'Generation (kWh)'}</th>
                        <th className="py-2.5 px-3">{isHindi ? 'वार्षिक बचत (₹)' : 'Yearly Savings (₹)'}</th>
                        <th className="py-2.5 px-3">{isHindi ? 'कुल संचयी बचत (₹)' : 'Cumulative Benefit (₹)'}</th>
                        <th className="py-2.5 px-3">{isHindi ? 'बकाया निवेश (₹)' : 'Remaining Investment'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {calcs.yearlyBreakdown.map((row) => (
                        <tr
                          key={row.year}
                          className={row.remainingInvestment === 0 ? 'bg-emerald-950/10 hover:bg-emerald-950/20' : 'hover:bg-slate-800/50'}
                        >
                          <td className="py-2 px-3 font-semibold text-white">{row.year}</td>
                          <td className="py-2 px-3">{row.generation.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-3 text-emerald-400 font-medium">₹{row.savings.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-3 text-amber-300 font-bold">₹{row.cumulativeSavings.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-3">
                            {row.remainingInvestment > 0 ? (
                              <span className="text-slate-400">₹{row.remainingInvestment.toLocaleString('en-IN')}</span>
                            ) : (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {isHindi ? 'पूर्ण वसूल' : 'Fully Recovered'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 7. MISSING OR UNCERTAIN DATA ADVISORY */}
            {(isBillUnknown || calcs.safeCapacity > 5) && (
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-[#FF9933] shrink-0 mt-0.5">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      {isHindi
                        ? 'सही सोलर सिस्टम और बचत जानने के लिए हम आपकी मदद करेंगे'
                        : 'We can help you choose the right solar system and understand your potential savings'}
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {isHindi
                        ? 'छत का आकार, छाया और बिजली लोड का सटीक आकलन करने के लिए हमारी इंजीनियरिंग टीम से निःशुल्क सलाह प्राप्त करें।'
                        : 'Connect directly with our engineering desk for site feasibility and custom quotations up to 100 kW.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onGetSolarDetails}
                  className="px-5 py-2.5 rounded-xl bg-[#FF9933] hover:bg-amber-400 text-black font-bold text-xs sm:text-sm whitespace-nowrap shadow transition-all shrink-0"
                >
                  {isHindi ? 'मुफ़्त साइट सर्वे बुक करें' : 'Book Free Site Survey'}
                </button>
              </div>
            )}

            {/* 8. PROMINENT DISCLAIMER (MANDATORY REQUIREMENT) */}
            <div className="mt-8 pt-5 border-t border-slate-700/80 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700/80 text-left sm:text-center">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isHindi
                    ? 'यह पारदर्शी अनुमान है, गारंटीशुदा भुगतान नहीं। वास्तविक बचत और सब्सिडी स्थान, उपभोग, उपकरण, मंज़ूरी और लागू नियमों पर निर्भर करेंगे।'
                    : 'This is a transparent estimate, not a guaranteed payment. Actual savings and subsidy depend on site conditions, consumption, equipment, approvals and applicable rules.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
