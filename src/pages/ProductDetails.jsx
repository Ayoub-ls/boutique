import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { MOCK_PRODUCTS } from "../data/mockData";
import { Heart, ShoppingBag, ChevronRight, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Button from "../components/Button";
import { motion } from "motion/react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-slate-400 mb-12">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-slate-900">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-[3/4] bg-slate-50 rounded-3xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-slate-50 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{product.category}</span>
              <div className="flex items-center text-yellow-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" className="text-slate-200" />
                <span className="ml-2 text-xs text-slate-400 font-medium">(4.8 / 5.0)</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-medium tracking-tight text-slate-900">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-xl md:text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-base md:text-lg text-slate-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed">
            {product.description}
          </p>

          {/* Options */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            {product.sizes && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium border rounded-xl transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-900 hover:bg-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border rounded-xl transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 ${selectedColor === color ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-900 hover:bg-white'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center border border-slate-100 bg-slate-50 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 active:bg-slate-200"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 active:bg-slate-200"
                >
                  +
                </button>
              </div>
              <Button className="flex-grow h-[50px]">Add to Cart</Button>
              <button className="p-4 border border-slate-100 bg-slate-50 text-slate-400 rounded-2xl hover:text-red-500 hover:border-red-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-slate-400" />
              <div className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-slate-400" />
              <div className="text-[10px] font-bold uppercase tracking-widest">30 Days Return</div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-slate-400" />
              <div className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
