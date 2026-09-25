import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Tag, 
  ArrowUpRight, 
  Navigation, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Search,
  ShoppingBag
} from 'lucide-react';
import { StoreOutlet } from '../types/mall';
import { STORE_OUTLETS } from '../data/mallData';

interface DirectoryAndNavigationProps {
  onSelectStoreForShopping: (storeId: string) => void;
  searchFilter: string;
}

export const DirectoryAndNavigation: React.FC<DirectoryAndNavigationProps> = ({
  onSelectStoreForShopping,
  searchFilter
}) => {
  const [selectedFloor, setSelectedFloor] = useState<string>('Ground Floor');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<StoreOutlet | null>(STORE_OUTLETS[0]);

  const floors = [
    { name: 'Ground Floor', label: 'Ground Floor', description: 'Cosmetics, Bespoke Men Suits, Pure Oud & Kashmiri Shawls' },
    { name: '1st Floor', label: '1st Floor', description: 'Ladies Boutiques, Bridal Cosmetics, Boski Kurtas' },
    { name: '2nd Floor', label: '2nd Floor', description: 'Derma Skincare, Face Powders, Alterations & Footwear' },
    { name: '3rd Floor / Rooftop', label: '3rd Floor', description: 'Executive Masjid, Prayer Halls & Management Offices' }
  ];

  const categories = [
    { id: 'all', label: 'All Stores' },
    { id: 'cosmetics', label: 'Cosmetics & Creams' },
    { id: 'mens_fashion', label: "Men's Fashion" },
    { id: 'ladies_fashion', label: "Ladies' Fashion" },
    { id: 'shawls', label: 'Shawls & Wraps' },
    { id: 'perfumes', label: 'Perfumes & Oud' },
    { id: 'services', label: 'Masjid & Facilities' }
  ];

  // Filter stores
  const filteredStores = STORE_OUTLETS.filter(store => {
    const matchesFloor = store.floor === selectedFloor;
    const matchesCategory = activeCategory === 'all' || store.category === activeCategory;
    const matchesSearch = !searchFilter || 
      store.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      store.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      store.unitNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      store.featuredTags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));

    return matchesFloor && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Floor Guide & Navigation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900">
            Al Quresh Mall Store Directory
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Locate retail shops, passenger elevators, and emergency exits across all 4 levels on Millat Road, Faisalabad.
          </p>
        </div>

        {/* Floor Selection Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
          {floors.map(floor => (
            <button
              key={floor.name}
              onClick={() => {
                setSelectedFloor(floor.name);
                const firstOnFloor = STORE_OUTLETS.find(s => s.floor === floor.name);
                if (firstOnFloor) setSelectedStore(firstOnFloor);
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedFloor === floor.name
                  ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {floor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Floor Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Floor Plan Visual Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Level Schematic Plan
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedFloor}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                  Lifts Active
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  Main Entry
                </span>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative aspect-[16/10] bg-emerald-50/40 rounded-xl border border-emerald-200/80 p-4 overflow-hidden select-none">
              
              {/* Millat Road Roadway Indicator */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-slate-200 text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest shadow-xs">
                ↓ Millat Road Main Facade & Entrance ↓
              </div>

              {/* Central Atrium & Walking Walkways */}
              <div className="absolute inset-x-12 inset-y-12 border-2 border-dashed border-emerald-200 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="text-center p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-emerald-100 shadow-xs">
                  <div className="text-xs font-bold text-slate-800">Central Mall Promenade</div>
                  <div className="text-[10px] text-emerald-700 font-medium">Air-Conditioned Corridor</div>
                </div>
              </div>

              {/* Elevator A Marker */}
              <div className="absolute top-10 left-6 bg-emerald-700 text-white p-2 rounded-lg text-center shadow-md border border-white">
                <div className="text-[9px] font-bold uppercase tracking-wider">Lift A</div>
                <div className="text-[8px] text-emerald-100">Elevator</div>
              </div>

              {/* Elevator B Marker */}
              <div className="absolute bottom-6 right-6 bg-emerald-700 text-white p-2 rounded-lg text-center shadow-md border border-white">
                <div className="text-[9px] font-bold uppercase tracking-wider">Lift B</div>
                <div className="text-[8px] text-emerald-100">Elevator</div>
              </div>

              {/* Emergency Stairs Marker */}
              <div className="absolute bottom-6 left-6 bg-slate-200 text-slate-700 p-1.5 rounded-md text-[9px] font-medium border border-slate-300">
                Fire Exit / Stairs
              </div>

              {/* Store Outlets Interactive Pins */}
              {STORE_OUTLETS.filter(s => s.floor === selectedFloor).map(store => {
                const isSelected = selectedStore?.id === store.id;
                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    style={{ left: `${store.mapX}%`, top: `${store.mapY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-emerald-700 text-white ring-4 ring-emerald-300 scale-110 z-20'
                        : 'bg-white text-slate-800 hover:bg-emerald-50 border border-slate-300 hover:border-emerald-400 z-10'
                    }`}
                  >
                    <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                    <span className="text-[11px] font-bold whitespace-nowrap">
                      {store.unitNumber}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Walking Assistance Guidance Box for Selected Store */}
            {selectedStore && (
              <div className="mt-4 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <Navigation className="w-4 h-4 text-emerald-700" />
                    <span>Turn-by-Turn Navigation to {selectedStore.unitNumber} ({selectedStore.name})</span>
                  </div>
                  <span className="text-[11px] bg-white text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    {selectedStore.nearestLift}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedStore.walkingGuide}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Store List & Detail Card */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Store List */}
          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {filteredStores.map(store => {
              const isSelected = selectedStore?.id === store.id;
              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-emerald-600 shadow-md ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {store.unitNumber}
                        </span>
                        <span className="text-xs text-slate-500">{store.floor}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {store.name}
                      </h4>
                    </div>

                    {store.discountActive && (
                      <span className="text-[10px] font-bold text-white bg-emerald-700 px-2 py-0.5 rounded shadow-xs shrink-0">
                        {store.discountBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {store.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {store.featuredTags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Contact & Shopping Triggers */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${store.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
                        title="Call shop"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${store.whatsapp.replace('+', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStoreForShopping(store.id);
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Shop Products</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredStores.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                No stores found matching your query on {selectedFloor}. Try another category or search term.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
