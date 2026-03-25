import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-slate-100">
      {/* Hero Image */}
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        src="./images/hero.avif"
        alt="Spring Collection"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-12 left-6 right-6 flex flex-col items-start gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col gap-1"
        >
          <span className="text-white text-xs font-bold tracking-[0.2em] uppercase opacity-80">
            BEST SELLERS
          </span>
          <h1 className="text-white text-5xl font-bold tracking-tighter leading-[0.9]">
            Spring <br /> Collections
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            to="/shop"
            className="group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-3xl font-bold transition-all hover:bg-primary hover:text-white active:scale-95 shadow-xl"
          >
            Shop Now
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/30 rounded-full"
      >
        <div className="w-full h-1/3 bg-white rounded-full" />
      </motion.div>
    </section>
  );
}
