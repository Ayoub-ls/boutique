import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <nav className="fixed bottom-6 left-4 right-4 md:sticky md:top-0 md:left-0 md:right-0 z-50 bg-white/90 backdrop-blur-md border border-slate-100 md:border-0 md:border-b md:bg-white/80 rounded-3xl md:rounded-none shadow-lg shadow-slate-900/5 md:shadow-none transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - Desktop Only */}
          {!isMobile && (
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900">
              BOUTIQUE RS<span className="text-slate-400">.</span>
            </Link>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
              <Link to="/shop" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Shop</Link>
              <Link to="/collection" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Collection</Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">About</Link>
              <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Contact</Link>
            </div>
          )}

          {/* Icons - Centered on Mobile, Right-aligned on Desktop */}
          <div className={`flex items-center space-x-5 ${isMobile ? 'w-full justify-around' : ''}`}>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/login" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 relative">
              <Heart size={20} strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-slate-900 rounded-full"></span>
            </Link>
            <Link to="/cart" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-slate-900 text-white text-[10px] font-bold rounded-full">
                0
              </span>
            </Link>
            
            {/* Menu Icon - Desktop Only (Mobile Menu is in Header) */}
            {!isMobile && (
              <button className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-95">
                <Menu size={20} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
