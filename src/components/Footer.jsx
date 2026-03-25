import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-xl font-bold tracking-tighter text-slate-900">
              BOUTIQUE DEMO<span className="text-slate-400">.</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              © 2026 BOUTIQUE DEMO.<br />All Rights Reserved.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">About Us</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About us</Link></li>
              <li><Link to="/stores" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Store location</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</Link></li>
              <li><Link to="/tracking" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Orders tracking</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Useful Links</h3>
            <ul className="space-y-4">
              <li><Link to="/returns" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Returns</Link></li>
              <li><Link to="/support" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Support Policy</Link></li>
              <li><Link to="/size-guide" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Size guide</Link></li>
              <li><Link to="/faqs" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Subscribe</h3>
            <p className="text-sm text-slate-500 mb-6">Get E-mail updates about our latest shop and special offers.</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email here.."
                className="w-full bg-transparent border-b border-slate-200 py-2 text-sm focus:outline-none focus:border-slate-900 transition-colors"
              />
              <button className="w-full px-6 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300">Facebook</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300">Twitter</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300">Instagram</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300">Youtube</a>
          </div>
          <div className="flex items-center space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
