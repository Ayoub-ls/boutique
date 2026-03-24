import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isMobile) return null;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tighter text-slate-900">
            BOUTIQUE RS<span className="text-slate-400">.</span>
          </Link>

          {/* Menu Icon */}
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300 active:scale-95"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[80] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tighter text-slate-900">
                  BOUTIQUE RS<span className="text-slate-400">.</span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={22} strokeWidth={1.5} className="text-slate-600" />
                </button>
              </div>

              <nav className="flex-grow p-8">
                <ul className="space-y-6">
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        to={link.path}
                        className={`flex items-center justify-between text-xl font-medium tracking-tight group ${
                          location.pathname === link.path ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight 
                          size={20} 
                          className={`transition-all duration-300 ${
                            location.pathname === link.path ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                          }`} 
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-8 border-t border-slate-100 bg-slate-50">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Connect With Us</p>
                <div className="flex gap-6 text-sm font-medium text-slate-600">
                  <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
                  <a href="#" className="hover:text-slate-900 transition-colors">Facebook</a>
                  <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
