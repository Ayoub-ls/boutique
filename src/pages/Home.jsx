import { motion } from "motion/react";
import { Truck, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { MOCK_PRODUCTS } from "../data/mockData";

const FEATURED_PRODUCTS = MOCK_PRODUCTS.slice(0, 4);

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-[#f8f8f8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 z-10"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Stylish</span>
                <h1 className="text-4xl md:text-8xl font-light tracking-tight text-slate-900 leading-[0.9]">
                  Male <br />
                  <span className="font-medium">Clothes</span>
                </h1>
                <p className="text-base md:text-lg text-slate-500 font-light">30% off Summer Vacation</p>
              </div>
              <Button variant="outline" size="lg" className="w-full text-white bg-slate-700 md:w-auto">
                Shop Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden md:block"
            >
              <img
                src="./images/boutique-hero2.png"
                alt="Hero"
                className="w-full h-[70vh] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-b border-gray-100">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-slate-50 rounded-full">
              <Truck size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Free Shipping</h3>
            <p className="text-xs text-slate-500 max-w-[200px]">Lorem ipsum dolor sit amet consectetu adipisicing elit sed</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-slate-50 rounded-full">
              <Clock size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Support 24/7</h3>
            <p className="text-xs text-slate-500 max-w-[200px]">Lorem ipsum dolor sit amet consectetu adipisicing elit sed</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-slate-50 rounded-full">
              <RefreshCw size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Money Return</h3>
            <p className="text-xs text-slate-500 max-w-[200px]">Lorem ipsum dolor sit amet consectetu adipisicing elit sed</p>
          </div>
        </div>
      </section>

      {/* New Arrival Header */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">New Arrival</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">Lorem ipsum dolor sit amet conse ctetu. Lorem ipsum dolor sit amet conse ctetu.</p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
