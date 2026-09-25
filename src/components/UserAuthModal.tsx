import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  LogOut, 
  Award, 
  ShoppingBag
} from 'lucide-react';
import { UserProfile } from '../types/mall';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onLogin: (profile: Partial<UserProfile>) => void;
  onLogout: () => void;
  onOpenOrders: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onLogin,
  onLogout,
  onOpenOrders
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Millat Town, Faisalabad');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      onLogin({
        name: fullName || 'Valued Shopper',
        phone: phone || '0300-1234567',
        email: email || `${phone || 'customer'}@alquresh.pk`,
        address: address,
        city: 'Faisalabad',
        loyaltyPoints: 150,
        isLoggedIn: true
      });
    } else {
      onLogin({
        name: fullName || (phone ? `User (${phone})` : 'Abdul Hanan'),
        phone: phone || '0300-7654321',
        email: email || 'shopper@alquresh.pk',
        address: address,
        city: 'Faisalabad',
        loyaltyPoints: 320,
        isLoggedIn: true
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              {userProfile.isLoggedIn ? 'Your Mall Account' : (authMode === 'login' ? 'Sign In to Al Quresh' : 'Create Free Account')}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGGED IN VIEW */}
        {userProfile.isLoggedIn ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-base font-bold text-slate-900">{userProfile.name}</h4>
                <div className="text-xs text-slate-500">{userProfile.phone}</div>
                <div className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-700" />
                  <span>{userProfile.address || 'Millat Town, Faisalabad'}</span>
                </div>
              </div>
            </div>

            {/* Loyalty Points Card */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-700 text-white rounded-lg shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-600 font-medium">Al Quresh Privilege Points</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">
                    {userProfile.loyaltyPoints} Points
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                Gold Member
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenOrders();
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200 hover:border-emerald-300"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>View Order History & Tracking</span>
              </button>

              <button
                onClick={onLogout}
                className="w-full py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOGIN OR REGISTER FORM */
          <div className="p-6 space-y-4">
            {/* Mode switch */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  authMode === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  authMode === 'register' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register New
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {authMode === 'register' && (
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Usman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-slate-600 block mb-1">Mobile Number (WhatsApp) *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-mono"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Area in Faisalabad</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Millat Town, Faisalabad"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-slate-600 block mb-1">Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-900/10"
              >
                {authMode === 'login' ? 'Sign In to Account' : 'Complete Registration (+150 Points)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  onLogin({
                    name: 'Guest Shopper (Millat Town)',
                    phone: '0300-8889999',
                    address: 'Millat Town, Faisalabad',
                    city: 'Faisalabad',
                    loyaltyPoints: 50,
                    isLoggedIn: true
                  });
                  onClose();
                }}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 text-center cursor-pointer"
              >
                Continue as Fast Guest (No password)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
