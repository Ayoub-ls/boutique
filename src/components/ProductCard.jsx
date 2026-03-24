import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function ProductCard({ product }) {
  const { id, name, price, oldPrice, image, isNew, discount } = product;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f6f6f6] rounded-2xl">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              New
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
          <Link to={`/product/${id}`} className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <Eye size={18} strokeWidth={1.5} />
          </Link>
          <button className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-2 text-center">
        <h3 className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-bold text-slate-900">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm text-slate-400 line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
