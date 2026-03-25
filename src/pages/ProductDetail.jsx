import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, ChevronLeft, Star, ShoppingBag, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { useShop } from '../context/ShopContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  useEffect(() => {
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(MOCK_PRODUCTS.filter(p => p.id !== foundProduct.id).slice(0, 3));
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  const isWishlisted = isInWishlist(product.id);
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* Header / Navigation */}
      <div className="px-6 flex items-center justify-between">
        <Link to="/" className="p-2 -ml-2 hover:bg-slate-50 rounded-full">
          <ChevronLeft size={24} className="text-primary" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-50 rounded-full">
            <Share2 size={20} className="text-primary" />
          </button>
          <button 
            onClick={() => toggleWishlist(product)}
            className="p-2 hover:bg-slate-50 rounded-full"
          >
            <Heart size={20} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-primary'} />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative w-full aspect-[3/4] bg-slate-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {product.badge && (
          <div className="absolute top-6 left-6 px-3 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-current" />
            ))}
            <span className="text-xs text-slate-400 ml-1">(48 reviews)</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.isSale && (
              <span className="text-lg text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed">
          This premium {product.name.toLowerCase()} is crafted from high-quality materials, offering both comfort and style. Perfect for any occasion, it features a modern silhouette and meticulous detailing.
        </p>

        {/* Size Selector */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-widest">Select Size</span>
            <button className="text-[10px] font-bold text-accent underline uppercase tracking-widest">Size Guide</button>
          </div>
          <div className="flex gap-3">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 font-bold transition-all ${
                  selectedSize === size 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-slate-100 text-primary hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-widest">Quantity</span>
          <div className="flex items-center gap-4 bg-slate-50 w-fit p-1 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-white rounded-xl transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-white rounded-xl transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 z-40">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all"
        >
          <ShoppingBag size={20} />
          Add to Bag — ${(product.price * quantity).toFixed(2)}
        </button>
      </div>

      {/* Complete the Look Section */}
      <section className="mt-8 px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">STYLE IT WITH</span>
          <h2 className="text-2xl font-bold tracking-tighter">Complete the Look</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {relatedProducts.map(p => (
            <div key={p.id} className="w-48 flex-shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Product Details Tabs (Simplified) */}
      <section className="px-6 flex flex-col gap-4">
        <div className="border-t border-slate-100 pt-6">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="text-sm font-bold uppercase tracking-widest">Composition & Care</span>
              <Plus size={18} className="group-open:rotate-45 transition-transform" />
            </summary>
            <div className="pt-4 text-sm text-slate-500 leading-relaxed">
              100% Organic Cotton. Machine wash cold, tumble dry low. Made in Portugal.
            </div>
          </details>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="text-sm font-bold uppercase tracking-widest">Shipping & Returns</span>
              <Plus size={18} className="group-open:rotate-45 transition-transform" />
            </summary>
            <div className="pt-4 text-sm text-slate-500 leading-relaxed">
              Free standard shipping on orders over $100. 30-day return policy.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
