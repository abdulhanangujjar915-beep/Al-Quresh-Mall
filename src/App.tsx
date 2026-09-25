import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DirectoryAndNavigation } from './components/DirectoryAndNavigation';
import { ProductCatalog } from './components/ProductCatalog';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CartAndCheckoutDrawer } from './components/CartAndCheckoutDrawer';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ReviewsAndTrustSection } from './components/ReviewsAndTrustSection';
import { LocationAndFacilities } from './components/LocationAndFacilities';
import { UserAuthModal } from './components/UserAuthModal';
import { LiveChatSupport } from './components/LiveChatSupport';
import { Footer } from './components/Footer';

import { 
  OrderItem, 
  OrderRecord, 
  ProductItem, 
  ReviewItem, 
  MallNotification, 
  UserProfile 
} from './types/mall';

import { 
  PRODUCTS, 
  REVIEWS, 
  INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS, 
  MALL_INFO, 
  MALL_IMAGES 
} from './data/mallData';

import { 
  Smartphone, 
  Monitor, 
  ShoppingBag, 
  MapPin, 
  Compass, 
  Sparkles, 
  Building2, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'directory' | 'shop' | 'map' | 'reviews'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStoreFilter, setSelectedStoreFilter] = useState<string | null>(null);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('AQM-8921');

  // Mobile App Mode Frame Toggle (Lets user preview the requested mobile app or full web experience)
  const [isMobileDevicePreview, setIsMobileDevicePreview] = useState<boolean>(false);

  // Cart State (saved to local storage)
  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('alquresh_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0], // Pre-populate with Radiant Whitening Day & Night Cream
          quantity: 1,
          selectedVariant: "60g Single Jar"
        },
        {
          product: PRODUCTS[1], // Flawless HD Silk Mineral Compact Powder
          quantity: 1,
          selectedVariant: "Shade 01 (Fair Ivory)"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('alquresh_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('alquresh_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('alquresh_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Notifications State
  const [notifications, setNotifications] = useState<MallNotification[]>(() => {
    try {
      const saved = localStorage.getItem('alquresh_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('alquresh_reviews');
      return saved ? JSON.parse(saved) : REVIEWS;
    } catch {
      return REVIEWS;
    }
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('alquresh_user');
      return saved ? JSON.parse(saved) : {
        name: 'Abdul Hanan',
        email: 'abdulhanan@alquresh.pk',
        phone: '0300-8899112',
        city: 'Faisalabad',
        address: 'Millat Town, Faisalabad',
        loyaltyPoints: 340,
        isLoggedIn: true
      };
    } catch {
      return {
        name: 'Guest Shopper',
        email: '',
        phone: '',
        city: 'Faisalabad',
        address: '',
        loyaltyPoints: 50,
        isLoggedIn: false
      };
    }
  });

  const handleAddToCart = (product: ProductItem, variant?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedVariant === variant);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedVariant: variant }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as OrderItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleOrderSuccess = (newOrder: OrderRecord) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    // Add real-time notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Order ${newOrder.id} Placed!`,
        message: `Your order for Rs. ${newOrder.total.toLocaleString()} has been sent to Al Quresh Mall dispatch desk.`,
        type: 'order',
        timeAgo: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setReviews(prev => [newRev, ...prev]);
  };

  const handleSelectStoreForShopping = (storeId: string) => {
    setSelectedStoreFilter(storeId);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrackingWithId = (orderId?: string) => {
    if (orderId) {
      setActiveTrackingId(orderId);
    }
    setIsTrackingOpen(true);
  };

  const cartTotalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Device View Toggle Bar */}
      <div className="bg-white border-b border-slate-200 py-1.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-800 font-bold uppercase tracking-wider text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Al Quresh Mall Official Portal
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-500 font-medium">
              Millat Rd, Millat Town Faisalabad
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 hidden md:inline">Display Viewport:</span>
            <button
              onClick={() => setIsMobileDevicePreview(false)}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                !isMobileDevicePreview 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full Website</span>
            </button>
            <button
              onClick={() => setIsMobileDevicePreview(true)}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isMobileDevicePreview 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Full viewport or Simulated Mobile App Frame */}
      <div className={`flex-1 flex flex-col ${isMobileDevicePreview ? 'max-w-md mx-auto my-6 border-8 border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-white' : 'w-full'}`}>
        {/* Navigation Bar */}
        <Navbar
          cartCount={cartTotalItems}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenTracking={() => setIsTrackingOpen(true)}
          notifications={notifications}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userName={userProfile.name}
          isLoggedIn={userProfile.isLoggedIn}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="space-y-16">
              {/* Hero Banner with real exterior photo and pillars */}
              <HeroSection
                onExploreDirectory={() => setActiveTab('directory')}
                onExploreShop={() => setActiveTab('shop')}
                onOpenMap={() => setActiveTab('map')}
              />

              {/* Quick Jump Bar */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActiveTab('directory')}
                    className="p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl text-left transition-all group cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <Building2 className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-900">Store Directory</div>
                    <div className="text-[11px] text-slate-500">Ground to 3rd Floor</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl text-left transition-all group cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <Compass className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-900">Lift & Floor Navigation</div>
                    <div className="text-[11px] text-slate-500">Passenger Elevators</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('shop')}
                    className="p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl text-left transition-all group cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <Sparkles className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-900">Cosmetics & Creams</div>
                    <div className="text-[11px] text-slate-500">Whitening, Powders, Serums</div>
                  </button>

                  <button
                    onClick={() => handleOpenTrackingWithId()}
                    className="p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl text-left transition-all group cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <Tag className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-900">Order Tracking</div>
                    <div className="text-[11px] text-slate-500">Live Rider Dispatch</div>
                  </button>
                </div>
              </section>

              {/* Featured Cosmetics & Retail Products Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProductCatalog
                  onAddToCart={handleAddToCart}
                  selectedStoreFilter={selectedStoreFilter}
                  onClearStoreFilter={() => setSelectedStoreFilter(null)}
                  searchFilter={searchQuery}
                />
              </section>

              {/* Mall Directory & Map Preview Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <DirectoryAndNavigation
                  onSelectStoreForShopping={handleSelectStoreForShopping}
                  searchFilter={searchQuery}
                />
              </section>

              {/* Location & Facilities Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LocationAndFacilities />
              </section>

              {/* Reviews & Trust Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <ReviewsAndTrustSection
                  reviews={reviews}
                  onAddReview={handleAddReview}
                />
              </section>
            </div>
          )}

          {activeTab === 'directory' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              <DirectoryAndNavigation
                onSelectStoreForShopping={handleSelectStoreForShopping}
                searchFilter={searchQuery}
              />
            </div>
          )}

          {activeTab === 'map' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              <DirectoryAndNavigation
                onSelectStoreForShopping={handleSelectStoreForShopping}
                searchFilter={searchQuery}
              />
              <LocationAndFacilities />
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              <ProductCatalog
                onAddToCart={handleAddToCart}
                selectedStoreFilter={selectedStoreFilter}
                onClearStoreFilter={() => setSelectedStoreFilter(null)}
                searchFilter={searchQuery}
              />
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              <ReviewsAndTrustSection
                reviews={reviews}
                onAddReview={handleAddReview}
              />
              <LocationAndFacilities />
            </div>
          )}
        </main>

        {/* Live Chat Support Desk */}
        <LiveChatSupport />

        {/* Footer */}
        <Footer
          onSelectTab={setActiveTab}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />
      </div>

      {/* Cart & Checkout Slide-Over */}
      <CartAndCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderSuccess={handleOrderSuccess}
        onOpenTracking={handleOpenTrackingWithId}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        onSelectDiscount={(code) => {
          setIsNotificationsOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* User Auth & Profile Modal */}
      <UserAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        userProfile={userProfile}
        onLogin={(profile) => {
          setUserProfile(prev => ({ ...prev, ...profile, isLoggedIn: true }));
          try {
            localStorage.setItem('alquresh_user', JSON.stringify({ ...userProfile, ...profile, isLoggedIn: true }));
          } catch (e) {
            console.error(e);
          }
        }}
        onLogout={() => {
          setUserProfile({
            name: '',
            email: '',
            phone: '',
            city: 'Faisalabad',
            address: '',
            loyaltyPoints: 0,
            isLoggedIn: false
          });
          try {
            localStorage.removeItem('alquresh_user');
          } catch (e) {
            console.error(e);
          }
        }}
        onOpenOrders={() => {
          setIsTrackingOpen(true);
        }}
      />
    </div>
  );
}
