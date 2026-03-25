import React from 'react';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/product/ProductGrid';
import { motion } from 'motion/react';
import { MOCK_PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';

export default function Home() {
  const products = MOCK_PRODUCTS;

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <Hero />

      {/* Category Strip */}
      <section className="px-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tighter">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['Sacs', 'Knitwear', 'Trousers', 'Accessories'].map((cat, i) => (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className="flex-shrink-0"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-2 border-transparent group-hover:border-accent transition-all">
                  <img
                    src={`https://picsum.photos/seed/${cat}/200/200`}
                    alt={cat}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">{cat}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Grid */}
      <ProductGrid
        products={products.filter(p => p.badge === 'NEW').slice(0, 4)}
        title="New Arrivals"
        subtitle="JUST LANDED"
      />

      {/* Featured Banners */}
      <section className="px-6 grid grid-cols-1 gap-6">
        <Link to="/shop?category=Outerwear" className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
          <img
            src="./images/summer.avif"
            alt="Summer Sale"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-6">
            <h3 className="text-white text-3xl font-bold tracking-tighter mb-2">Summer Sale</h3>
            <p className="text-white/80 text-sm font-medium mb-4 uppercase tracking-widest">Up to 50% OFF</p>
            <div className="bg-white text-primary px-6 py-2 rounded-2xl font-bold text-sm shadow-lg">
              View All
            </div>
          </div>
        </Link>
      </section>

      {/* Recommended for You Grid */}
      <ProductGrid
        products={products.filter(p => p.badge !== 'NEW').slice(0, 4)}
        title="Recommended for You"
        subtitle="BASED ON YOUR STYLE"
      />
    </div>
  );
}
