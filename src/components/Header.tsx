import React, { useState } from 'react';
import { Menu, X, Globe, ArrowRight, Zap } from 'lucide-react';
import { BrandWordmark } from './BrandWordmark';
import { NAV_ITEMS, Language, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onCtaClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onCtaClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Zone 1: Typographic Wordmark for SS Solar Solutions */}
          <a
            href="#hero"
            className="flex items-center gap-2 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] rounded-lg"
            aria-label="SS Solar Solutions Home"
          >
            <BrandWordmark size="md" />
          </a>

          {/* Zone 2: Navigation Links (Desktop / Large Viewports) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1.5 lg:gap-2.5 2xl:gap-4 overflow-x-auto py-1"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-xs font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-100/70 px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                {language === 'hi' ? item.labelHi : item.labelEn}
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Toggle & Main CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher Toggle */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-bold text-[#0A192F] bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-[#FF9933] cursor-pointer shrink-0"
              title={language === 'en' ? 'Switch to Hindi (हिंदी में देखें)' : 'Switch to English'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF9933]" />
              <span className="font-semibold">
                {language === 'en' ? 'हिंदी' : 'English'}
              </span>
            </button>

            {/* Main Primary CTA Button */}
            <button
              type="button"
              onClick={onCtaClick}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs md:text-sm font-bold text-white bg-[#0A192F] hover:bg-[#102342] active:bg-[#060E1A] rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 group border border-[#1B355E]"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF9933] group-hover:scale-110 transition-transform" />
              <span>{t.nav.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF9933] group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center p-2.5 min-w-[44px] min-h-[44px] rounded-lg text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#0A192F]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0A192F]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 px-2">
              <BrandWordmark size="sm" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'hi' ? 'नेविगेशन' : 'Menu'}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-[#0A192F] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.href.replace('#', '')}
                  </span>
                </a>
              ))}
            </div>

            {/* Mobile Main CTA */}
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCtaClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#0A192F] hover:bg-[#102342] rounded-xl shadow-md transition-colors"
              >
                <Zap className="w-4 h-4 text-[#FF9933]" />
                <span>{t.nav.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#FF9933]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
