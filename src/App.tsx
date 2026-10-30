/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SolarSavingsCalculator } from './components/SolarSavingsCalculator';
import { PmSuryaGharSection } from './components/PmSuryaGharSection';
import { SolarPackagesSection } from './components/SolarPackagesSection';
import { FinanceEmiSection } from './components/FinanceEmiSection';
import { BrandsWarrantySection } from './components/BrandsWarrantySection';
import { InstallationProcessSection } from './components/InstallationProcessSection';
import { OurWorkSection } from './components/OurWorkSection';
import { FaqsContactSection } from './components/FaqsContactSection';
import { Footer } from './components/Footer';
import { QrModal } from './components/QrModal';
import { Language, TRANSLATIONS, GOOGLE_FORM_QR_URL } from './data/translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [calculatorCapacity, setCalculatorCapacity] = useState<number>(3);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Consultation CTA opens the confirmed QR form destination directly
  const handleConsultationCta = () => {
    window.open(GOOGLE_FORM_QR_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenCalculatorAtCapacity = (kw: number) => {
    setCalculatorCapacity(kw);
    const calcEl = document.getElementById('savings-calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#FF9933]/30 selection:text-[#0A192F]">
      {/* Sticky Header with Navigation, Typographic Wordmark & Language Switcher */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        onCtaClick={handleConsultationCta}
      />

      <main className="flex-1">
        {/* 1. Hero Section (with large right-most QR code placeholder) */}
        <HeroSection
          language={language}
          onOpenQrModal={() => setIsQrModalOpen(true)}
          onCtaClick={handleConsultationCta}
        />

        {/* 2. Solar Savings Calculator Section (3–100 kW) */}
        <SolarSavingsCalculator
          language={language}
          capacity={calculatorCapacity}
          onCapacityChange={setCalculatorCapacity}
          onGetSolarDetails={handleConsultationCta}
        />

        {/* 3. PM Surya Ghar Yojana Section with Countdown until 31 March 2027 */}
        <PmSuryaGharSection language={language} />

        {/* 4. Solar Packages Section */}
        <SolarPackagesSection
          language={language}
          onGetSolarDetails={handleConsultationCta}
        />

        {/* Finance & EMI Section */}
        <FinanceEmiSection language={language} />

        {/* 5. Brands & Warranty Section */}
        <BrandsWarrantySection language={language} />

        {/* 6. Installation Process Section */}
        <InstallationProcessSection language={language} />

        {/* 7. Our Work Section with 3 kW & 5 kW Illustrative Calculation Cards */}
        <OurWorkSection
          language={language}
          onOpenCalculatorAtCapacity={handleOpenCalculatorAtCapacity}
        />

        {/* 8. FAQs + Contact Section (Direct Engineering Desk - NO FORM) */}
        <FaqsContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Interactive Enlarged QR Code Modal */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        language={language}
      />
    </div>
  );
}
