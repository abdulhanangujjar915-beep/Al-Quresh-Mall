import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'directory' | 'shop' | 'map' | 'reviews') => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenTracking }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Address */}
          <div className="space-y-3">
            <h3 className="text-base font-serif-display font-bold text-slate-900 tracking-tight">
              AL QURESH MALL
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Faisalabad’s premier multi-story shopping landmark on Millat Road. Featuring passenger lifts, 24/7 security, men's & ladies' bespoke designer suits, authentic perfumes, and luxury cosmetics & creams.
            </p>
            <div className="text-slate-700 flex items-start gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>F4R4+RP6, Millat Rd, Millat Town, Faisalabad, Pakistan</span>
            </div>
          </div>

          {/* Col 2: Retail Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Retail Outlets
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('shop')} className="hover:text-emerald-700 cursor-pointer">
                  Whitening Creams & Face Compact Powders
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('shop')} className="hover:text-emerald-700 cursor-pointer">
                  Men's 3-Piece Suits & Prince Coats
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('shop')} className="hover:text-emerald-700 cursor-pointer">
                  Ladies' Luxury Pret & Unstitched Suits
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('shop')} className="hover:text-emerald-700 cursor-pointer">
                  Pure Kashmiri & Velvet Shawls
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('shop')} className="hover:text-emerald-700 cursor-pointer">
                  Dehn Al Oud & French Perfumes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Mall Services
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('directory')} className="hover:text-emerald-700 cursor-pointer">
                  Store Directory & Unit Guide
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('map')} className="hover:text-emerald-700 cursor-pointer">
                  Floor Plans & Elevator Navigation
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-emerald-700 cursor-pointer">
                  Live Order Tracking System
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('reviews')} className="hover:text-emerald-700 cursor-pointer">
                  Customer Ratings & Verified Reviews
                </button>
              </li>
              <li>
                <a 
                  href={MALL_INFO.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-700"
                >
                  Get Route on Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Hours & Security
            </h4>
            <p className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>11:00 AM – 11:30 PM (Daily)</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Friday Break: 1:00 PM – 2:30 PM
            </p>
            <p className="flex items-center gap-1.5 text-slate-700 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Reception: +92 41 876 2200</span>
            </p>
            <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>24/7 CCTV & Physical Security On-Duty</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <div>
            © {new Date().getFullYear()} Al Quresh Mall. Millat Rd, Faisalabad, Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Passenger Lifts Certified</span>
            <span>·</span>
            <span>100% Genuine Retailers</span>
            <span>·</span>
            <span>Wheelchair Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
