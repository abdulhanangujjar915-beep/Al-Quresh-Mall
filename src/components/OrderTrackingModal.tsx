import React, { useState } from 'react';
import { 
  Compass, 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Phone, 
  Package, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { OrderRecord } from '../types/mall';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [searchId, setSearchId] = useState<string>('');
  const [activeOrderId, setActiveOrderId] = useState<string>(orders[0]?.id || 'AQM-8921');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrder = orders.find(
    o => o.id.toLowerCase() === activeOrderId.toLowerCase() || 
         o.trackingNumber.toLowerCase() === activeOrderId.toLowerCase()
  ) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const found = orders.find(
      o => o.id.toLowerCase() === searchId.trim().toLowerCase() ||
           o.trackingNumber.toLowerCase() === searchId.trim().toLowerCase()
    );

    if (found) {
      setActiveOrderId(found.id);
    } else {
      setErrorMsg(`No order found matching "${searchId}". Try sample ID: AQM-8921`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-800">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Al Quresh Mall Order Tracking
              </h3>
              <p className="text-xs text-slate-500">
                Track live parcel status & rider dispatch in Faisalabad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Order Switcher */}
        <div className="p-5 border-b border-slate-200 space-y-3 bg-white">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. AQM-8921) or Tracking Number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {errorMsg && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Quick Select Buttons from Existing Orders */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-500 text-[11px] shrink-0 font-medium">Sample Orders:</span>
            {orders.map(order => (
              <button
                key={order.id}
                onClick={() => {
                  setActiveOrderId(order.id);
                  setErrorMsg(null);
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                  activeOrderId === order.id
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {order.id} ({order.status})
              </button>
            ))}
          </div>
        </div>

        {/* Order Details Body */}
        {currentOrder ? (
          <div className="p-5 overflow-y-auto space-y-6">
            {/* Summary card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-xs text-slate-500">Order Reference</div>
                  <div className="text-base font-bold font-mono text-slate-900 flex items-center gap-2">
                    <span>{currentOrder.id}</span>
                    <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {currentOrder.status}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500">Tracking Number</div>
                  <div className="text-xs font-mono text-emerald-700 font-bold">
                    {currentOrder.trackingNumber}
                  </div>
                </div>
              </div>

              {/* Recipient & Payment info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Customer:</span>
                  <span className="font-semibold text-slate-900">{currentOrder.customerName}</span>
                  <span className="block text-slate-500">{currentOrder.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Delivery Location:</span>
                  <span className="text-slate-800">{currentOrder.address}</span>
                  <span className="block text-slate-500">{currentOrder.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Payment & Total:</span>
                  <span className="uppercase text-emerald-700 font-semibold">{currentOrder.paymentMethod}</span>
                  <span className="block text-slate-900 font-bold tabular-nums">
                    Rs. {currentOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Rider card if assigned */}
              {currentOrder.riderName && (
                <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-slate-400 text-[10px] block">Assigned Delivery Rider:</span>
                      <span className="font-semibold text-slate-900">{currentOrder.riderName}</span>
                    </div>
                  </div>
                  {currentOrder.riderPhone && (
                    <a
                      href={`tel:${currentOrder.riderPhone}`}
                      className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{currentOrder.riderPhone}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Step Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Live Shipment Timeline</span>
              </h4>

              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-8">
                {currentOrder.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Bullet marker */}
                    <div className={`absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-emerald-600 text-white font-bold' 
                        : step.current
                        ? 'bg-emerald-700 text-white font-bold animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{idx + 1}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`text-xs font-bold ${
                          step.completed ? 'text-slate-900' : step.current ? 'text-emerald-700' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items in parcel */}
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Items in This Shipment ({currentOrder.items.length})
              </span>
              <div className="space-y-2">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">{item.product.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {item.selectedVariant || 'Standard'} · Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-slate-800 tabular-nums">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm">
            Select an order above to view tracking progress.
          </div>
        )}
      </div>
    </div>
  );
};
