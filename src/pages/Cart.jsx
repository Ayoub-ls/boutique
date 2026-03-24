import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { MOCK_PRODUCTS } from "../data/mockData";

export default function Cart() {
  // Mock cart items
  const cartItems = [
    { ...MOCK_PRODUCTS[0], quantity: 1 },
    { ...MOCK_PRODUCTS[1], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-medium tracking-tight text-slate-900 mb-12">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="hidden md:grid grid-cols-6 gap-4 pb-6 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center pb-8 border-b border-gray-100">
                <div className="col-span-3 flex items-center gap-6">
                  <div className="w-24 aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500">Color: Black / Size: M</p>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 flex items-center gap-1 pt-2">
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-center text-sm font-medium text-slate-600">
                  ${item.price.toFixed(2)}
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center border border-slate-100 bg-slate-50 rounded-xl overflow-hidden shadow-sm">
                    <button className="px-3 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 active:bg-slate-200">-</button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button className="px-3 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 active:bg-slate-200">+</button>
                  </div>
                </div>

                <div className="text-right text-sm font-bold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-slate-600 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-300">
                Continue Shopping
              </Link>
              <button className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 hover:-translate-y-0.5 transition-all duration-300">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-8 rounded-3xl space-y-8">
              <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
              
              <div className="space-y-4">
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

              <Link to="/checkout">
                <Button className="w-full py-4 flex items-center justify-center gap-2">
                  Checkout <ArrowRight size={16} />
                </Button>
              </Link>

              <div className="pt-6 text-center">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center space-y-8">
          <div className="inline-flex p-8 bg-slate-50 rounded-full text-slate-300">
            <ShoppingBag size={64} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-slate-900">Your cart is empty</h2>
            <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Link to="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
