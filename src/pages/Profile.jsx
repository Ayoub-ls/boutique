import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, ShoppingBag, Heart, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: ShoppingBag, label: 'My Orders', path: '/orders' },
    { icon: Heart, label: 'My Wishlist', path: '/wishlist' },
    { icon: Settings, label: 'Account Settings', path: '/settings' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* Header */}
      <div className="px-6 flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 hover:bg-slate-50 rounded-full">
          <ChevronLeft size={24} className="text-primary" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tighter">My Profile</h1>
      </div>

      {/* User Info Card */}
      <div className="px-6">
        <div className="bg-primary text-white rounded-3xl p-8 flex flex-col items-center text-center gap-4 shadow-xl">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
            <User size={40} className="text-white" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tighter">{user.name || 'User'}</h2>
            <p className="text-white/60 text-sm">{user.email}</p>
          </div>
          <div className="px-4 py-1 bg-accent/20 rounded-full border border-accent/30">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Gold Member</span>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="px-6 flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <Link 
            key={item.label}
            to={item.path}
            className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <item.icon size={20} />
              </div>
              <span className="font-bold text-primary">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
        ))}

        <button 
          onClick={handleLogout}
          className="flex items-center justify-between p-5 bg-red-50 rounded-3xl border border-red-100 hover:bg-red-100 transition-all group mt-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl text-red-500">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-red-600">Sign Out</span>
          </div>
        </button>
      </div>

      {/* Help Section */}
      <div className="px-6 mt-4">
        <div className="bg-slate-50 rounded-3xl p-6 flex flex-col gap-4 border border-slate-100">
          <h3 className="font-bold text-sm tracking-tight">Need Help?</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our customer support is available 24/7 to help you with your orders and any questions you might have.
          </p>
          <button className="text-xs font-bold text-primary underline uppercase tracking-widest text-left">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
