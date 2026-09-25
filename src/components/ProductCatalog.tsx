import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Check, 
  Eye, 
  X, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  ArrowRight,
  Heart
} from 'lucide-react';
import { ProductItem } from '../types/mall';
import { PRODUCTS } from '../data/mallData';

interface ProductCatalogProps {
  onAddToCart: (product: ProductItem, selectedVariant?: string) => void;
  selectedStoreFilter?: string | null;
  onClearStoreFilter?: () => void;
  searchFilter: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  selectedStoreFilter,
  onClearStoreFilter,
  searchFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [modalVariant, setModalVariant] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Filter products
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesStore = !selectedStoreFilter || prod.storeId === selectedStoreFilter;
    const matchesSearch = !searchFilter ||
      prod.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.categoryLabel.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.storeName.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesCategory && matchesStore && matchesSearch;
  });

  const handleQuickAdd = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const defaultVariant = product.sizesOrVariants?.[0] || 'Standard';
    onAddToCart(product, defaultVariant);
    setAddedNotice(`Added "${product.name.slice(0, 24)}..." to bag`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const handleOpenModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setModalVariant(product.sizesOrVariants?.[0] || 'Standard');
  };

  const handleModalAdd = () => {
    if (!selectedProduct) return;
    onAddToCart(selectedProduct, modalVariant);
    setAddedNotice(`Added "${selectedProduct.name.slice(0, 24)}..." to bag`);
    setSelectedProduct(null);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification for Add to Cart */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-bounce">
          <Check className="w-4 h-4 text-white stroke-[3]" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Al Quresh Mall Retail Outlets Online</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900">
            Mall Retail Collections & Cosmetics
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Order directly from Al Quresh Mall retail shops. Available for same-day doorstep delivery across Faisalabad or express pickup at Millat Road.
          </p>
        </div>

        {/* Selected Store Filter Banner */}
        {selectedStoreFilter && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-medium">
            <span>Filtered by outlet</span>
            {onClearStoreFilter && (
              <button 
                onClick={onClearStoreFilter}
                className="ml-1 hover:text-emerald-950 underline cursor-pointer font-bold"
              >
                Clear Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Collections' },
          { id: 'cosmetics_creams', label: 'Cosmetics, Creams & Powders' },
          { id: 'mens_suits', label: "Men's Suits & Prince Coats" },
          { id: 'ladies_suits', label: "Ladies' Luxury Suits" },
          { id: 'perfumes', label: 'Pure Oud & French Perfumes' },
          { id: 'shawls', label: 'Pashmina & Velvet Shawls' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

          return (
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-xs hover:shadow-xl"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                  {/* Discount / In-stock badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {discountPct > 0 && (
                      <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        Save {discountPct}%
                      </span>
                    )}
                  </div>

                  {/* Store Outlet badge */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-800 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                    <span className="truncate max-w-[150px] font-medium">{product.storeName}</span>
                    <span className="text-emerald-700 font-semibold shrink-0">{product.floor.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="uppercase text-[10px] tracking-wider text-emerald-700 font-bold">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="ml-1 text-slate-800 tabular-nums">{product.rating}</span>
                      <span className="text-slate-400 text-[10px] ml-0.5">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-[11px] text-slate-400 line-through tabular-nums">
                      Rs. {product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Add to shopping bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-1.5 text-slate-500 hover:text-slate-800 bg-white/90 rounded-full border border-slate-200 cursor-pointer shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Image */}
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-200">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Main Info */}
                <div className="space-y-3">
                  <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                    {selectedProduct.categoryLabel} · {selectedProduct.floor}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {selectedProduct.name}
                  </h3>
                  <div className="text-xs text-slate-500">
                    Sold by: <strong className="text-slate-800">{selectedProduct.storeName}</strong>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">
                      Rs. {selectedProduct.price.toLocaleString()}
                    </span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        Rs. {selectedProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock at Mall
                    </span>
                  </div>

                  {/* Size or Variant Selector */}
                  {selectedProduct.sizesOrVariants && selectedProduct.sizesOrVariants.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs text-slate-700 font-medium block">
                        Select Option / Variant:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizesOrVariants.map(variant => (
                          <button
                            key={variant}
                            onClick={() => setModalVariant(variant)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                              modalVariant === variant
                                ? 'bg-emerald-700 text-white font-bold border-emerald-700 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                            }`}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart button */}
                  <div className="pt-3">
                    <button
                      onClick={handleModalAdd}
                      className="w-full py-3 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-900/10"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag (Rs. {selectedProduct.price.toLocaleString()})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Description & Specs */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Product Overview & Authenticity
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 space-y-2">
                  <span className="text-xs font-bold text-emerald-900 block">
                    Product Specifications & Features:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    {selectedProduct.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {/* Trust markers */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Genuine Mall Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Same-day Faisalabad Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>7-Day In-Mall Exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
