import { useState, useRef, useEffect } from "react";
import { MOCK_PRODUCTS } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchRef = useRef(null);

  const categories = ["All", "Clothing", "Accessories", "Shoes"];

  const suggestions = searchQuery.length > 1 
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isFilterOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const FilterContent = ({ isMobile = false }) => (
    <div className={`space-y-10 ${isMobile ? 'p-8' : ''}`}>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Categories</h3>
        <ul className="space-y-4">
          {categories.map(cat => (
            <li key={cat}>
              <button
                onClick={() => {
                  setSelectedCategory(cat);
                  if (isMobile) setIsFilterOpen(false);
                }}
                className={`text-sm transition-colors ${selectedCategory === cat ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Price Range</h3>
        <div className="space-y-4">
          <input type="range" className="w-full accent-slate-900" min="0" max="200" />
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>$0</span>
            <span>$200</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Colors</h3>
        <div className="flex flex-wrap gap-3">
          {["bg-black", "bg-white border border-slate-200", "bg-blue-500", "bg-red-500", "bg-yellow-500"].map((color, i) => (
            <button key={i} className={`w-6 h-6 rounded-full ${color} hover:scale-110 transition-transform shadow-sm`}></button>
          ))}
        </div>
      </div>

      {isMobile && (
        <div className="pt-6">
          <Button className="w-full py-4" onClick={() => setIsFilterOpen(false)}>
            Show Results
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">Shop All</h1>
          <p className="text-sm text-slate-500">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-80" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && searchQuery.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                >
                  <div className="p-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Suggestions</h3>
                    {suggestions.length > 0 ? (
                      <div className="space-y-1">
                        {suggestions.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-all group"
                          >
                            <div className="w-12 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors">{product.name}</p>
                              <p className="text-xs text-slate-500">${product.price.toFixed(2)}</p>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 px-2 py-4">No products found for "{searchQuery}"</p>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="bg-slate-50 p-3 border-t border-slate-100">
                      <button 
                        onClick={() => setShowSuggestions(false)}
                        className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-slate-900 hover:text-slate-600 transition-colors"
                      >
                        View all results
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Toggle */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 shadow-sm"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-medium text-slate-900">Filters</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterContent isMobile={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block">
          <FilterContent />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
