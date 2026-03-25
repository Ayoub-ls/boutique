import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'motion/react';

export default function ProductGrid({ products, title, subtitle }) {
  return (
    <section className="px-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        {subtitle && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {subtitle}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tighter">{title}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
