import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Tag, 
  Check, 
  Sparkles, 
  Clock, 
  Copy, 
  ArrowRight,
  ShieldAlert,
  Percent
} from 'lucide-react';
import { MallNotification } from '../types/mall';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: MallNotification[];
  onMarkAllAsRead: () => void;
  onSelectDiscount: (code: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectDiscount
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onSelectDiscount(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Real-time Discounts & Alerts
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Deals Notice */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-semibold">
            <Percent className="w-4 h-4 text-emerald-700" />
            <span>Active Voucher: ALQURESH20</span>
          </div>
          <button
            onClick={() => handleCopy('ALQURESH20')}
            className="px-3 py-1 bg-emerald-700 text-white font-bold rounded-lg text-[10px] cursor-pointer shadow-xs"
          >
            {copiedCode === 'ALQURESH20' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-all ${
                notif.read 
                  ? 'bg-slate-50/80 border-slate-200 text-slate-600' 
                  : 'bg-white border-emerald-300 text-slate-900 shadow-sm ring-1 ring-emerald-100'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  {notif.type === 'discount' && (
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">
                      <Tag className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {notif.type === 'facility' && (
                    <span className="p-1 rounded bg-teal-100 text-teal-800">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {notif.type === 'event' && (
                    <span className="p-1 rounded bg-blue-100 text-blue-800">
                      <Clock className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <h4 className="font-bold text-xs text-slate-900">{notif.title}</h4>
                </div>

                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {notif.timeAgo}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {notif.message}
              </p>

              {notif.code && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    <span>{notif.code}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(notif.code!)}
                    className="text-xs font-semibold text-slate-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === notif.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700 font-bold">Code Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Voucher</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          Push notifications enabled for Al Quresh Mall, Faisalabad.
        </div>
      </div>
    </div>
  );
};
