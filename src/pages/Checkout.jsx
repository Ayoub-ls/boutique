import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Truck, CreditCard } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "motion/react";
import { MOCK_PRODUCTS } from "../data/mockData";

const ALGERIAN_STATES = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa",
  "51 - Ouled Djellal", "52 - Bordj Baji Mokhtar", "53 - Béni Abbès", "54 - Timimoun", "55 - Touggourt",
  "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
];

export default function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    state: "",
    address: "",
    city: ""
  });

  // Mock cart items for summary
  const cartItems = [
    { ...MOCK_PRODUCTS[0], quantity: 1 },
    { ...MOCK_PRODUCTS[1], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    alert("Order placed successfully! (Mock)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-slate-400 mb-12">
        <Link to="/cart" className="hover:text-slate-900">Cart</Link>
        <ChevronRight size={12} />
        <span className="text-slate-900">Checkout</span>
      </nav>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Information */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">Shipping Information</h2>
            
            <div className="space-y-6">
              <Input 
                label="Full Name" 
                placeholder="Enter your full name" 
                required 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              
              <Input 
                label="Phone Number" 
                placeholder="05XX XX XX XX" 
                type="tel"
                required 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  State (Wilaya)
                </label>
                <select 
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full bg-transparent border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select your state</option>
                  {ALGERIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <Input 
                label="City / Commune" 
                placeholder="Enter your city" 
                required 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />

              <Input 
                label="Full Address" 
                placeholder="Street name, house number, etc." 
                required 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">Payment Method</h2>
            <div className="p-6 border-2 border-slate-900 rounded-2xl flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <CreditCard size={20} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Cash on Delivery</p>
                  <p className="text-xs text-slate-500">Pay when you receive your order</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-4 border-slate-900 bg-white"></div>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-32 h-fit"
        >
          <div className="bg-slate-50 p-8 rounded-3xl space-y-8">
            <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold text-slate-900 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-bold text-slate-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full py-4">
              Place Order
            </Button>

            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-3 text-slate-500">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Truck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Fast Delivery in Algeria</span>
              </div>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
