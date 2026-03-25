import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, User, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PRODUCTS } from '../../data/products';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { cartCount } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/shop?search=${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Promo Banner */}
      <div className="bg-primary text-white text-[10px] py-1.5 text-center font-medium tracking-widest uppercase">
        -10% OFF today • Free shipping on orders over $100
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1 hover:bg-slate-50 rounded-full transition-colors"
          >
            <Menu size={20} className="text-primary" />
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-1 hover:bg-slate-50 rounded-full transition-colors"
          >
            <Search size={20} className="text-primary" />
          </button>
        </div>

        <Link to="/" className="text-xl font-bold tracking-tighter text-primary">
          LUMINA
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to={user ? "/profile" : "/login"} 
            className="p-1 hover:bg-slate-50 rounded-full transition-colors"
          >
            <User size={20} className={user ? "text-accent" : "text-primary"} />
          </Link>
          <Link to="/cart" className="p-1 hover:bg-slate-50 rounded-full transition-colors relative">
            <ShoppingBag size={20} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-white z-[100] p-6 shadow-2xl border-b border-slate-100"
          >
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearchSubmit} className="flex-grow relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-primary transition-all text-sm font-medium"
                />
              </form>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-full"
              >
                <X size={24} className="text-primary" />
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-6 flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick Results</h3>
                <div className="flex flex-col gap-3">
                  {searchResults.map(p => (
                    <Link 
                      key={p.id} 
                      to={`/product/${p.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-100">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary group-hover:underline">{p.name}</span>
                        <span className="text-xs text-slate-400">${p.price.toFixed(2)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold tracking-tighter">LUMINA</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} className="text-primary" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg font-medium">
                <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
                <Link to="/shop?category=Dresses" onClick={() => setIsMenuOpen(false)}>Dresses</Link>
                <Link to="/shop?category=Trousers" onClick={() => setIsMenuOpen(false)}>Trousers</Link>
                <Link to="/shop?category=Accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
                <Link to="/shop?category=Outerwear" className="text-red-500" onClick={() => setIsMenuOpen(false)}>Sale</Link>
              </div>

              <div className="absolute bottom-8 left-6 right-6 pt-8 border-t border-slate-100">
                <div className="flex flex-col gap-4 text-sm text-slate-500">
                  <Link to="/help">Help & Support</Link>
                  <Link to="/stores">Store Locator</Link>
                  <div className="flex gap-4 mt-2">
                    <span className="font-bold text-primary">EN</span>
                    <span>FR</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
