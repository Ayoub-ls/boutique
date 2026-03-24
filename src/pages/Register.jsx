import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "motion/react";

export default function Register() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-medium tracking-tight text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-500">Join Boutique RS for a premium shopping experience.</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="First Name" 
                type="text" 
                placeholder="John" 
                required 
              />
              <Input 
                label="Last Name" 
                type="text" 
                placeholder="Doe" 
                required 
              />
            </div>
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 accent-slate-900" id="terms" required />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                I agree to the <Link to="/terms" className="text-slate-900 font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-slate-900 font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>
            
            <Button className="w-full py-4">Create Account</Button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-slate-900 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
