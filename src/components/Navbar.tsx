import React, { useState } from 'react';
import { ShoppingBag, Bell, User, Search, MapPin, Menu, X, Navigation, Compass, Sparkles } from 'lucide-react';
import { MallNotification } from '../types/mall';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onOpenTracking: () => void;
  notifications: MallNotification[];
  activeTab: 'home' | 'directory' | 'shop' | 'map' | 'reviews';
  setActiveTab: (tab: 'home' | 'directory' | 'shop' | 'map' | 'reviews') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  userName?: string;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenNotifications,
  onOpenTracking,
  notifications,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  userName,
  isLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleNavClick = (tab: 'home' | 'directory' | 'shop' | 'map' | 'reviews') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top emerald banner */}
      <div className="bg-emerald-800 text-white px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Open Today: 11:00 AM – 11:30 PM · High-Speed Lifts & Central AC Operational · Millat Rd, Faisalabad</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <button 
              onClick={onOpenTracking} 
              className="hover:underline flex items-center gap-1 cursor-pointer font-semibold text-emerald-100 hover:text-white"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Track Parcel</span>
            </button>
            <span>·</span>
            <span>Plus Code: F4R4+RP6</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand Title — 4-5 Nav Links — Primary Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('home')} 
            className="text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif-display font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                AL QURESH MALL
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                Millat Road
              </span>
            </div>
            <div className="text-[10px] tracking-widest uppercase text-emerald-700 font-mono -mt-0.5 hidden sm:block">
              Faisalabad · Suits, Cosmetics & Lifestyle
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean text with subtle underline) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              activeTab === 'home' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('directory')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              activeTab === 'directory' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            Store Directory
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'map' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Floor & Lift Map</span>
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shop' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Shop Cosmetics & Outlets</span>
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              activeTab === 'reviews' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            Reviews & Trust
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search on larger screens */}
          <div className="relative hidden md:block w-48 lg:w-56">
            <input
              type="text"
              placeholder="Search cosmetics, suits, oud..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Discounts and notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Order Tracking Quick Button */}
          <button
            onClick={onOpenTracking}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Track Order</span>
          </button>

          {/* User Account Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">
              {isLoggedIn ? (userName ? userName.split(' ')[0] : 'Account') : 'Login'}
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-all shadow-sm shadow-emerald-900/10 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums font-bold">{cartCount}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 py-4 space-y-3 shadow-md">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search cosmetics, suits, perfumes, creams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-700 bg-slate-50'}`}
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('directory')}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'directory' ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-700 bg-slate-50'}`}
            >
              Store Directory
            </button>
            <button
              onClick={() => handleNavClick('map')}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'map' ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-700 bg-slate-50'}`}
            >
              Floor & Lift Map
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'shop' ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-700 bg-slate-50'}`}
            >
              Shop Cosmetics & Outlets
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'reviews' ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-700 bg-slate-50'}`}
            >
              Reviews & Trust
            </button>
            <button
              onClick={() => { onOpenTracking(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left text-emerald-800 bg-emerald-50 flex items-center gap-1.5 font-medium border border-emerald-200"
            >
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Track Orders</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Millat Rd, Faisalabad
            </span>
            <span className="text-emerald-700 font-medium">Lifts Active</span>
          </div>
        </div>
      )}
    </header>
  );
};
