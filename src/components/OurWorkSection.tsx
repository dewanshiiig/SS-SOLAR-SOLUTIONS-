import React, { useState } from 'react';
import { MapPin, Zap, Info, Maximize2, X, ArrowRight } from 'lucide-react';
import { Language } from '../data/translations';

// Import the 6 project photos
import imgIndoreRooftop5kw from '../assets/images/indian_home_rooftop_solar_1792220692956.jpg';
import imgTinShed3kw from '../assets/images/solar_tin_shed_3kw_1792223011140.jpg';
import imgElevatedRooftop5kw from '../assets/images/solar_elevated_watertank_1792223011579.jpg';
import imgTerracePedestals3kw from '../assets/images/solar_terrace_pedestals_1792223012559.jpg';
import imgFraming5kw from '../assets/images/solar_framing_sunset_1792223013083.jpg';
import imgInverterSetup3kw from '../assets/images/solar_havells_inverter_1792223013259.jpg';

interface OurWorkSectionProps {
  language: Language;
  onOpenCalculatorAtCapacity?: (kw: number) => void;
}

interface ProjectPhoto {
  id: number;
  image: string;
  location: string;
  size: string;
  isVerified: boolean;
  altText: {
    en: string;
    hi: string;
  };
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({
  language,
  onOpenCalculatorAtCapacity,
}) => {
  const isHindi = language === 'hi';
  const [selectedImage, setSelectedImage] = useState<ProjectPhoto | null>(null);

  // 6 verified rooftop solar installation project photos
  const projectPhotos: ProjectPhoto[] = [
    {
      id: 1,
      image: imgIndoreRooftop5kw,
      location: 'Indore',
      size: '5 kW System',
      isVerified: true,
      altText: {
        en: 'Rooftop solar panel installation on residential terrace in Indore - 5 kW System',
        hi: 'इंदौर में आवासीय छत पर रूफटॉप सोलर पैनल स्थापना - 5 kW सिस्टम',
      },
    },
    {
      id: 2,
      image: imgTinShed3kw,
      location: 'Indore',
      size: '3 kW System',
      isVerified: true,
      altText: {
        en: 'Rooftop solar installation on shed structure in Indore - 3 kW System',
        hi: 'इंदौर में शेड संरचना पर रूफटॉप सोलर स्थापना - 3 kW सिस्टम',
      },
    },
    {
      id: 3,
      image: imgElevatedRooftop5kw,
      location: 'Indore',
      size: '5 kW System',
      isVerified: true,
      altText: {
        en: 'Elevated terrace rooftop solar structure in Indore - 5 kW System',
        hi: 'इंदौर में एलीवेटेड टेरेस रूफटॉप सोलर संरचना - 5 kW सिस्टम',
      },
    },
    {
      id: 4,
      image: imgTerracePedestals3kw,
      location: 'Indore',
      size: '3 kW System',
      isVerified: true,
      altText: {
        en: 'Rooftop solar module mounting on terrace pedestals in Indore - 3 kW System',
        hi: 'इंदौर में कंक्रीट पेडस्टल पर रूफटॉप सोलर मॉड्यूल माउंटिंग - 3 kW सिस्टम',
      },
    },
    {
      id: 5,
      image: imgFraming5kw,
      location: 'Indore',
      size: '5 kW System',
      isVerified: true,
      altText: {
        en: 'High-efficiency monocrystalline solar array in Indore - 5 kW System',
        hi: 'इंदौर में उच्च दक्षता मोनोक्रिस्टलाइन सोलर ऐरे - 5 kW सिस्टम',
      },
    },
    {
      id: 6,
      image: imgInverterSetup3kw,
      location: 'Indore',
      size: '3 kW System',
      isVerified: true,
      altText: {
        en: 'Rooftop solar on-grid inverter and electrical distribution in Indore - 3 kW System',
        hi: 'इंदौर में रूफटॉप सोलर ऑन-ग्रिड इन्वर्टर और इलेक्ट्रिकल सेटअप - 3 kW सिस्टम',
      },
    },
  ];

  return (
    <section
      id="our-work"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase mb-2">
            <span>07</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-500 font-sans font-semibold">
              {isHindi ? 'कार्य प्रदर्शन' : 'Portfolio Showcase'}
            </span>
          </div>

          {/* Heading strictly as specified */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] mb-2">
            200+ Rooftop Solar Installations
          </h2>

          {/* Supporting line strictly as specified */}
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {isHindi ? 'Indore ke projects include hain.' : 'Including projects in Indore.'}
          </p>

          <p className="text-[11px] font-mono text-slate-400 mt-2">
            {isHindi
              ? '*स्थापना संख्या ग्राहक की आधिकारिक पुष्टि तक अस्थायी प्लेसहोल्डर के रूप में दर्शित है।'
              : '*Installation metric shown as placeholder pending final client verification.'}
          </p>
        </div>

        {/* 6 Large Project Photos in Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {projectPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer bg-[#F8FAFC] border border-slate-200/90 hover:border-[#FF9933]/60 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
              tabIndex={0}
              role="button"
              aria-label={`View photo of ${item.size} in ${item.location}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(item);
                }
              }}
            >
              {/* Photo Area (Aspect Ratio 16:9) */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={isHindi ? item.altText.hi : item.altText.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* System Size Tag */}
                <div className="absolute top-3 left-3 bg-[#0A192F]/85 backdrop-blur-xs text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
                  <Zap className="w-3 h-3 text-[#FF9933]" />
                  <span>{item.size}</span>
                </div>

                {/* Enlarge icon on hover */}
                <div className="absolute bottom-3 right-3 bg-white/90 text-[#0A192F] p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption: Location and System Size Only, if verified */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#0A192F]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <span className="text-slate-600 font-mono text-xs font-semibold">
                    {item.size}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {isHindi ? 'सत्यापित रूफटॉप प्रोजेक्ट' : 'Verified Rooftop Project'}
                  </span>
                  <span className="font-mono text-slate-400 group-hover:text-[#FF9933] transition-colors">
                    {isHindi ? 'बड़ा देखें →' : 'Expand →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Illustrative Calculation Cards strictly adhering to instructions */}
        <div className="border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-slate-50/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200/80">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF9933]">
                {isHindi ? 'अनुमानित विश्लेषण' : 'ILLUSTRATIVE CALCULATIONS'}
              </div>
              <h3 className="text-lg font-bold text-[#0A192F]">
                {isHindi ? 'मॉडल क्षमता गणना' : 'Standard Capacity Scenarios'}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Info className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
              <span>{isHindi ? 'कैलकुलेटर इंजन आधारित' : 'Based on calibrated yield model'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Card 1: 3 kW */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Representative Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={imgTinShed3kw}
                    alt="Representative solar installation - 3 kW"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-[#0A192F]/80 backdrop-blur-xs text-[10px] text-white font-medium">
                    Representative image / प्रतीकात्मक चित्र
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#FF9933] uppercase">
                        3 kW Capacity
                      </span>
                      <h4 className="text-lg font-bold text-[#0A192F]">
                        {isHindi ? '3 kW — अनुमानित गणना' : '3 kW — Illustrative Calculation'}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {isHindi ? 'प्रारंभिक' : 'Starting'}
                      </span>
                      <span className="text-lg font-extrabold text-[#0A192F] font-mono">
                        ₹1,80,000
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">
                        {isHindi ? 'औसत मासिक उत्पादन:' : 'Avg. Monthly Gen:'}
                      </span>
                      <span className="font-bold font-mono text-[#0A192F]">~387 kWh / mo</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">
                        {isHindi ? 'दैनिक औसत:' : 'Daily Average:'}
                      </span>
                      <span className="font-bold font-mono text-[#0A192F]">~12.9 units / day</span>
                    </div>
                  </div>

                  {/* Potential Benefit */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {isHindi
                      ? 'जानिए सोलर आपके घर की बिजली जरूरत का एक हिस्सा कैसे पूरा कर सकता है।'
                      : 'Explore how solar can meet part of your household electricity needs.'}
                  </p>
                </div>
              </div>

              {/* Card Action CTA */}
              <div className="px-5 sm:px-6 pb-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCalculatorAtCapacity) {
                      onOpenCalculatorAtCapacity(3);
                    } else {
                      const el = document.getElementById('savings-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0A192F] hover:bg-[#102342] transition-colors cursor-pointer group"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FF9933] group-hover:scale-110 transition-transform" />
                  <span>{isHindi ? '3 kW बचत की गणना करें' : 'Calculate 3 kW Savings'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF9933] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2: 5 kW */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Representative Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={imgIndoreRooftop5kw}
                    alt="Representative solar installation - 5 kW"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-[#0A192F]/80 backdrop-blur-xs text-[10px] text-white font-medium">
                    Representative image / प्रतीकात्मक चित्र
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#FF9933] uppercase">
                        5 kW Capacity
                      </span>
                      <h4 className="text-lg font-bold text-[#0A192F]">
                        {isHindi ? '5 kW — अनुमानित गणना' : '5 kW — Illustrative Calculation'}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {isHindi ? 'प्रारंभिक' : 'Starting'}
                      </span>
                      <span className="text-lg font-extrabold text-[#0A192F] font-mono">
                        ₹2,90,000
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">
                        {isHindi ? 'औसत मासिक उत्पादन:' : 'Avg. Monthly Gen:'}
                      </span>
                      <span className="font-bold font-mono text-[#0A192F]">~645 kWh / mo</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">
                        {isHindi ? 'दैनिक औसत:' : 'Daily Average:'}
                      </span>
                      <span className="font-bold font-mono text-[#0A192F]">~21.5 units / day</span>
                    </div>
                  </div>

                  {/* Potential Benefit */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {isHindi
                      ? 'अधिक बिजली खपत के लिए अधिक क्षमता वाला विकल्प जानिए।'
                      : 'Explore a higher-capacity option for greater electricity consumption.'}
                  </p>
                </div>
              </div>

              {/* Card Action CTA */}
              <div className="px-5 sm:px-6 pb-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCalculatorAtCapacity) {
                      onOpenCalculatorAtCapacity(5);
                    } else {
                      const el = document.getElementById('savings-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0A192F] hover:bg-[#102342] transition-colors cursor-pointer group"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FF9933] group-hover:scale-110 transition-transform" />
                  <span>{isHindi ? '5 kW बचत की गणना करें' : 'Calculate 5 kW Savings'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF9933] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Visible shared note strictly as required */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600 text-center leading-relaxed">
            <span className="font-semibold text-slate-800">
              {isHindi ? 'स्पष्टीकरण: ' : 'Note: '}
            </span>
            {isHindi
              ? 'ये अनुमानित उदाहरण हैं, वास्तविक ग्राहक प्रोजेक्ट नहीं। वास्तविक उत्पादन, बचत और कीमत अलग हो सकती है।'
              : 'Illustrative examples—not completed customer projects. Actual generation, savings and pricing vary.'}
          </div>
        </div>
      </div>

      {/* Full Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#0A192F] rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#06101E]">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-[#FF9933]" />
                <span className="font-bold text-sm">{selectedImage.location}</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-xs text-[#FF9933] font-semibold">{selectedImage.size}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview */}
            <div className="relative aspect-video max-h-[75vh] w-full bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={isHindi ? selectedImage.altText.hi : selectedImage.altText.en}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption Footer */}
            <div className="px-5 py-3 bg-[#06101E] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">
                {isHindi ? selectedImage.altText.hi : selectedImage.altText.en}
              </span>
              <span className="text-emerald-400 font-medium text-[11px]">
                {isHindi ? 'सत्यापित स्थापना' : 'Verified Installation'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
