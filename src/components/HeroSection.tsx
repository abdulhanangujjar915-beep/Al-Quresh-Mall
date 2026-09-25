import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Navigation, CheckCircle2, Star, Compass } from 'lucide-react';
import { MALL_INFO, MALL_IMAGES } from '../data/mallData';

interface HeroSectionProps {
  onExploreDirectory: () => void;
  onExploreShop: () => void;
  onOpenMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDirectory,
  onExploreShop,
  onOpenMap
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-emerald-100/80">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Millat Road's Premier Commercial Landmark · Faisalabad</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-slate-900 tracking-tight leading-[1.15]">
                Al Quresh Mall
                <span className="block text-emerald-700 mt-1 font-serif-display">
                  Suits, Cosmetics, Perfumes & Modern Retail
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl pt-2">
                Discover a family shopping experience in Faisalabad with high-speed passenger elevators, 24/7 security, central air conditioning, and genuine wholesale pricing on men’s suits, ladies’ unstitched collections, French perfumes, and bridal cosmetics.
              </p>
            </div>

            {/* Key Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Passenger Lifts</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">24/7 Security</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Munasib Prices</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreShop}
                className="px-6 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-md shadow-emerald-900/10 flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Outlets & Cosmetics</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenMap}
                className="px-5 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Floor & Lift Guide</span>
              </button>
            </div>

            {/* Coordinates and Location Strip */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Plus Code: <strong className="text-slate-800">{MALL_INFO.plusCode}</strong></span>
              <span>·</span>
              <a
                href={MALL_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-semibold hover:underline"
              >
                Open Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual of Al Quresh Mall */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={MALL_IMAGES.hero}
                  alt="Al Quresh Mall Millat Road Faisalabad Building"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                {/* On-image badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-100 text-xs text-slate-800 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="font-bold text-emerald-800">Al Quresh Mall</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600">Millat Road, FSD</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-end">
                  <div>
                    <div className="font-bold text-sm text-white">Faisalabad's Fashion & Retail Destination</div>
                    <div className="text-emerald-200 text-[11px]">Ground, 1st & 2nd Floor Outlets · 3rd Floor Masjid</div>
                  </div>
                  <div className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-1 rounded shadow">
                    Multi-Story Lifts
                  </div>
                </div>
              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="p-3 bg-white grid grid-cols-3 gap-2 text-center text-xs divide-x divide-slate-100">
                <div>
                  <div className="text-emerald-700 font-bold text-sm">30+</div>
                  <div className="text-slate-500 text-[10px]">Retail Outlets</div>
                </div>
                <div>
                  <div className="text-emerald-700 font-bold text-sm">2 Lifts</div>
                  <div className="text-slate-500 text-[10px]">Passenger Elevators</div>
                </div>
                <div>
                  <div className="text-emerald-700 font-bold text-sm">100%</div>
                  <div className="text-slate-500 text-[10px]">Original Brands</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
