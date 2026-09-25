import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Car, 
  Wind, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

export const LocationAndFacilities: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
          <MapPin className="w-4 h-4" />
          <span>Location & World-Class Mall Facilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900">
          Visit Al Quresh Mall, Faisalabad
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Located prominently on Millat Road, Millat Town, Faisalabad. Built for convenience, comfort, and family shopping with installed high-speed lifts and active security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map & Location Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Official Plus Code Coordinates
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {MALL_INFO.plusCode}
                </h3>
              </div>
              <a
                href={MALL_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded interactive Google Map card */}
            <div className="relative aspect-[16/9] bg-slate-100 rounded-xl border border-slate-200 overflow-hidden group">
              <iframe
                title="Al Quresh Mall Location Map"
                src="https://maps.google.com/maps?q=Millat%20Rd,%20Millat%20Town,%20Faisalabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 text-[11px] text-slate-800 flex items-center gap-1.5 pointer-events-none shadow-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Millat Rd, Millat Town, Faisalabad</span>
              </div>
            </div>

            {/* Timings and Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-slate-900">Daily Mall Hours</span>
                </div>
                <p className="text-slate-700">{MALL_INFO.timing}</p>
                <p className="text-emerald-700 text-[11px] font-medium">{MALL_INFO.fridayBreak}</p>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-slate-900">Reception & Desk</span>
                </div>
                <p className="text-slate-700">{MALL_INFO.phone}</p>
                <p className="text-slate-500 text-[11px]">WhatsApp: {MALL_INFO.whatsapp}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Facilities Grid */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MALL_INFO.facilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 hover:border-emerald-300 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2 text-emerald-700">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-slate-900">{fac.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Special Lift & Family Safety Box */}
          <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Special Assistance & Accessibility
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Wheelchair & Senior Citizen Friendly
              </h4>
              <p className="text-xs text-slate-600 max-w-md">
                Lift attendants are on duty at all times. Wheelchairs are available free of charge at the ground floor security counter.
              </p>
            </div>

            <a
              href="tel:+92418762200"
              className="px-4 py-2 bg-white hover:bg-slate-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 shrink-0 transition-colors shadow-xs"
            >
              Call Ground Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
