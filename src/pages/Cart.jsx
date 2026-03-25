import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-6">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
          <ShoppingBag size={40} className="text-slate-300" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tighter">Your bag is empty</h2>
          <p className="text-slate-500 text-sm">Looks like you haven't added anything to your bag yet.</p>
        </div>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-4 rounded-3xl font-bold shadow-xl active:scale-95 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Header */}
      <div className="px-6 flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 hover:bg-slate-50 rounded-full">
          <ChevronLeft size={24} className="text-primary" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tighter">Shopping Bag</h1>
      </div>

      {/* Cart Items */}
      <div className="px-6 flex flex-col gap-6">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div 
              key={`${item.id}-${item.size}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm"
            >
              {/* Item Image */}
              <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Item Details */}
              <div className="flex flex-col justify-between flex-grow py-1">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-primary leading-tight">{item.name}</h3>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Size: {item.size}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary */}
      <div className="px-6 mt-4">
        <div className="bg-slate-50 rounded-3xl p-6 flex flex-col gap-4 border border-slate-100">
          <h2 className="font-bold uppercase tracking-widest text-xs text-slate-400">Order Summary</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="flex justify-between text-lg">
              <span className="font-bold tracking-tighter">Total</span>
              <span className="font-bold tracking-tighter text-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 z-40">
        <button className="w-full bg-primary text-white py-4 rounded-3xl font-bold shadow-xl active:scale-[0.98] transition-all">
          Checkout Now
        </button>
      </div>
    </div>
  );
}
