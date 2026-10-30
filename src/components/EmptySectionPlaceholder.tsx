import React from 'react';
import { Layers } from 'lucide-react';
import { Language } from '../data/translations';

interface EmptySectionPlaceholderProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  hint: string;
  language: Language;
  slots: {
    title: string;
    description: string;
    colSpan?: string;
  }[];
  children?: React.ReactNode;
}

export const EmptySectionPlaceholder: React.FC<EmptySectionPlaceholderProps> = ({
  id,
  number,
  title,
  subtitle,
  hint,
  language,
  slots,
  children,
}) => {
  return (
    <section
      id={id}
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          {/* Editorial Number & Category Kicker */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>{number}</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {language === 'hi' ? 'संरचनात्मक अनुभाग' : 'Structural Section'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-3 text-balance">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Custom Content or Architectural Wireframe Slots */}
        {children ? (
          children
        ) : (
          <div className="space-y-6">
            {/* Architectural Grid Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl border border-dashed border-slate-300/90 bg-[#F8FAFC] p-6 transition-all duration-200 hover:border-[#0A192F]/40 hover:bg-slate-50 ${
                    slot.colSpan || ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-[#0A192F] transition-colors">
                      {number}.{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                      <Layers className="w-3 h-3 text-[#FF9933]" />
                      <span>{language === 'hi' ? 'रिक्त स्लॉट' : 'Slot'}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0A192F] mb-1.5 group-hover:text-[#0B1B3D]">
                    {slot.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {slot.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quiet Specification Footnote */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-500">
              <span className="font-mono font-bold text-[#FF9933] shrink-0">
                [SPEC]
              </span>
              <span>{hint}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
