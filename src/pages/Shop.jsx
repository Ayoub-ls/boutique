import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { Filter, ChevronDown, LayoutGrid, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ["All", "Dresses", "Knitwear", "Trousers", "Accessories", "Outerwear", "Skirts", "Tops", "Shoes"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || "All";
  const initialSearch = queryParams.get('search') || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const cat = queryParams.get('category');
    const search = queryParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
  }, [location.search]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-serif italic text-primary mb-4">The Collection</h1>
          <p className="text-slate-500 max-w-2xl">
            Explore our curated selection of timeless pieces, designed for the modern individual who values quality and effortless style.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-primary transition-colors text-sm font-medium"
            >
              <Filter size={16} />
              <span>Filter</span>
              <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {searchQuery && (
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                <span>Search: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery("")} className="hover:text-primary">
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <span className="font-medium text-primary">{filteredAndSortedProducts.length}</span>
              <span>products</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pr-8 pl-4 py-2 text-sm font-medium focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-slate-50 border-b border-slate-100"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-3">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No products found.</p>
            <button 
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
