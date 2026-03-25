import React, { useState } from 'react';
import { Heart, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to 'M' size for quick add if not specified, or just add without size if applicable
    // For this UI, we'll assume a default size or prompt if needed, but for "Quick Add" we'll just use 'M'
    addToCart(product, 'M', 1);
  };

  return (
    <div 
      className="group flex flex-col gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Badges */}
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            product.badge === 'Sale' ? 'bg-red-500 text-white' : 'bg-white text-primary'
          }`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-all hover:bg-white active:scale-90"
        >
          <Heart 
            size={16} 
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-primary'} 
          />
        </button>

        {/* Quick Add Button (Mobile Friendly) */}
        <div className="absolute bottom-3 right-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickAdd}
            className="p-3 bg-primary text-white rounded-full shadow-xl hover:bg-accent transition-colors"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 px-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-primary hover:underline">
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${product.isSale ? 'text-red-500' : 'text-primary'}`}>
            ${product.price.toFixed(2)}
          </span>
          {product.isSale && (
            <span className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
