export interface StoreOutlet {
  id: string;
  name: string;
  unitNumber: string;
  floor: 'Ground Floor' | '1st Floor' | '2nd Floor' | '3rd Floor / Rooftop';
  category: 'mens_fashion' | 'ladies_fashion' | 'perfumes' | 'cosmetics' | 'shawls' | 'services';
  description: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  rating: number;
  reviewsCount: number;
  discountActive: boolean;
  discountBadge?: string;
  discountCode?: string;
  discountPercent?: number;
  mapX: number; // percentage on floor canvas
  mapY: number;
  nearestLift: string;
  walkingGuide: string;
  image: string;
  featuredTags: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  storeId: string;
  storeName: string;
  floor: string;
  category: 'mens_suits' | 'ladies_suits' | 'perfumes' | 'shawls' | 'cosmetics_creams';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  description: string;
  details: string[];
  sizesOrVariants?: string[];
  isFeatured?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  cityArea: string; // e.g. 'Millat Town, Faisalabad'
  rating: number;
  date: string;
  comment: string;
  verifiedVisit: boolean;
  categoryMentioned: string;
}

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  product: ProductItem;
  quantity: number;
  selectedVariant?: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'card';
  deliveryType: 'delivery' | 'mall_pickup';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'placed' | 'confirmed' | 'packing' | 'dispatched' | 'delivered';
  trackingNumber: string;
  riderName?: string;
  riderPhone?: string;
  steps: TrackingStep[];
}

export interface MallNotification {
  id: string;
  title: string;
  message: string;
  type: 'discount' | 'event' | 'facility' | 'order';
  code?: string;
  timeAgo: string;
  read: boolean;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  quickReplies?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  loyaltyPoints: number;
  isLoggedIn: boolean;
}
