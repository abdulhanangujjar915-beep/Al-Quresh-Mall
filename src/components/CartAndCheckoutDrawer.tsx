import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  CreditCard, 
  Truck, 
  Store, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { OrderItem, OrderRecord, ProductItem } from '../types/mall';

interface CartAndCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: OrderItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderSuccess: (order: OrderRecord) => void;
  onOpenTracking: (orderId: string) => void;
}

export const CartAndCheckoutDrawer: React.FC<CartAndCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
  onOpenTracking
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout form fields
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Faisalabad');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'mall_pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'card'>('cod');
  const [walletPhone, setWalletPhone] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0;
  const shippingFee = deliveryType === 'mall_pickup' || subtotal >= 3000 ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const cleaned = promoCode.trim().toUpperCase();

    if (cleaned === 'ALQURESH20') {
      setAppliedDiscount({ code: 'ALQURESH20', percent: 20 });
    } else if (cleaned === 'GLOWBEAUTY' || cleaned === 'SHAWL15') {
      setAppliedDiscount({ code: cleaned, percent: 15 });
    } else if (cleaned === 'MILLAT10') {
      setAppliedDiscount({ code: 'MILLAT10', percent: 10 });
    } else {
      setPromoError('Invalid coupon code. Try ALQURESH20 for 20% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please enter your full name and phone number.');
      return;
    }
    if (deliveryType === 'delivery' && !address) {
      alert('Please provide your complete delivery address in Faisalabad.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrderId = `AQM-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingCode = `FSD-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      const dateStr = `${now.getDate()} Sep 2026`;

      const newOrder: OrderRecord = {
        id: newOrderId,
        date: dateStr,
        customerName: fullName,
        phone: phone,
        address: deliveryType === 'mall_pickup' ? 'Al Quresh Mall Reception Counter, Millat Rd' : address,
        city: city,
        paymentMethod: paymentMethod,
        deliveryType: deliveryType,
        items: [...cartItems],
        subtotal: subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: finalTotal,
        status: 'confirmed',
        trackingNumber: trackingCode,
        riderName: deliveryType === 'delivery' ? 'Faisalabad Express Dispatch' : undefined,
        steps: [
          {
            title: 'Order Placed & Verified',
            description: `Payment method: ${paymentMethod.toUpperCase()}. Order logged in system.`,
            timestamp: `${dateStr}, ${timeStr}`,
            completed: true,
            current: false
          },
          {
            title: 'Outlet Routing & Verification',
            description: 'Item stock reserved at Al Quresh Mall retail shops.',
            timestamp: `${dateStr}, ${timeStr}`,
            completed: true,
            current: true
          },
          {
            title: 'Packing with Security Seal',
            description: 'Quality inspection and tamper-proof mall packaging.',
            timestamp: 'In progress',
            completed: false,
            current: false
          },
          {
            title: deliveryType === 'delivery' ? 'Dispatched with Courier' : 'Ready at Mall Pick-up Desk',
            description: deliveryType === 'delivery' ? 'Rider dispatched to your address in Faisalabad.' : 'Collect from Ground Floor Concierge, Millat Rd.',
            timestamp: 'Pending packaging',
            completed: false,
            current: false
          },
          {
            title: 'Delivered',
            description: 'Order handed over successfully.',
            timestamp: 'Estimated within 2-4 hours',
            completed: false,
            current: false
          }
        ]
      };

      setCreatedOrder(newOrder);
      setCheckoutStep('success');
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-lg bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              {checkoutStep === 'cart' && `Shopping Bag (${cartItems.length})`}
              {checkoutStep === 'checkout' && 'Secure Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART VIEW */}
        {checkoutStep === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">Your bag is empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore cosmetics whitening creams, compact powders, men bespoke suits, and perfumes from Al Quresh Mall.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item, idx) => (
                    <div 
                      key={`${item.product.id}-${idx}`}
                      className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex gap-3 items-center justify-between"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0 px-2 space-y-1">
                        <h4 className="text-xs font-semibold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-emerald-700 font-medium">
                          {item.selectedVariant || 'Standard'} · {item.product.storeName.split(' ')[0]}
                        </div>
                        <div className="text-xs font-bold text-slate-900 tabular-nums">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:text-slate-900 text-slate-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 px-1.5 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:text-slate-900 text-slate-500 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              {cartItems.length > 0 && (
                <div className="pt-2">
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Discount code (e.g. ALQURESH20)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 uppercase font-mono focus:bg-white focus:border-emerald-600 focus:outline-none"
                        />
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {appliedDiscount && (
                      <div className="text-xs text-emerald-800 flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                        <span>Coupon {appliedDiscount.code} applied ({appliedDiscount.percent}% OFF)</span>
                        <button 
                          type="button" 
                          onClick={() => setAppliedDiscount(null)} 
                          className="text-emerald-700 hover:underline cursor-pointer font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {promoError && (
                      <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                        {promoError}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900 tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({appliedDiscount.percent}%):</span>
                      <span className="tabular-nums">- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery in Faisalabad:</span>
                    <span className="text-slate-900 tabular-nums">
                      {subtotal >= 3000 ? <strong className="text-emerald-700">FREE</strong> : 'Rs. 250'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                    <span>Estimated Total:</span>
                    <span className="text-emerald-700 text-base tabular-nums">
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-900/10"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: CHECKOUT VIEW */}
        {checkoutStep === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="p-5 space-y-5 flex-1">
              {/* Back to Cart button */}
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer font-medium"
              >
                ← Back to Cart Items
              </button>

              {/* Delivery Type Option */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Delivery Method:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-700 mb-1" />
                    <div className="text-xs font-bold text-slate-900">Doorstep Delivery</div>
                    <div className="text-[10px] text-slate-500">Millat Town & Faisalabad</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('mall_pickup')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      deliveryType === 'mall_pickup'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-700 mb-1" />
                    <div className="text-xs font-bold text-slate-900">In-Mall Pickup</div>
                    <div className="text-[10px] text-slate-500">Al Quresh Mall Counter (Free)</div>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Contact & Shipping Details
                </h4>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Usman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Mobile (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Delivery Address *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="House / Flat No., Street, Sector or Landmark in Faisalabad (e.g. Millat Town, Madina Town)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Secure Payment Gateways */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Secure Payment Gateway
                  </h4>
                  <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <Lock className="w-3 h-3" />
                    256-Bit Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-900 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</div>
                    <div className="text-[10px] text-slate-500">Pay when parcel arrives</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'jazzcash'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-900 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-red-700">JazzCash Wallet</div>
                    <div className="text-[10px] text-slate-500">Instant mobile payment</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'easypaisa'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-900 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-emerald-700">Easypaisa Wallet</div>
                    <div className="text-[10px] text-slate-500">Instant mobile transfer</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-900 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-blue-700">Debit / Credit Card</div>
                    <div className="text-[10px] text-slate-500">Visa & Mastercard</div>
                  </button>
                </div>

                {/* Sub-inputs based on payment gateway */}
                {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <label className="text-[11px] text-slate-700 block font-medium">
                      Enter {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} Account Number:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XXXXXXXXX"
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-500">
                      You will receive an MPIN authorization prompt on your mobile handset.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <label className="text-[11px] text-slate-700 block font-medium">Card Number:</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-emerald-600 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-emerald-600 focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Action Bar */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Total Payable:</span>
                <span className="text-xl font-bold text-emerald-800 tabular-nums">
                  Rs. {finalTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-emerald-900/10"
              >
                {isProcessing ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm Order (Rs. {finalTotal.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS VIEW */}
        {checkoutStep === 'success' && createdOrder && (
          <div className="p-8 text-center space-y-5 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center mx-auto text-emerald-700">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Order Confirmed!</h3>
              <p className="text-xs text-slate-600">
                Thank you, {createdOrder.customerName}. Your order has been placed with Al Quresh Mall.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-emerald-700">{createdOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tracking Code:</span>
                <span className="font-mono text-slate-900 font-semibold">{createdOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <span className="font-bold text-slate-900 tabular-nums">Rs. {createdOrder.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="uppercase text-emerald-700 font-bold">{createdOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenTracking(createdOrder.id);
                }}
                className="w-full py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Track This Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl cursor-pointer"
              >
                Continue Browsing Mall
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
