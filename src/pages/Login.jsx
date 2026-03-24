import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "motion/react";

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-medium tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">Please enter your details to sign in.</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-6">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              required 
            />
            <div className="space-y-2">
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                required 
              />
              <div className="text-right">
                <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button className="w-full py-4">Sign In</Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-white px-4 text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-4 w-4" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                <img src="https://www.svgrepo.com/show/448234/facebook.svg" className="h-4 w-4" alt="Facebook" />
                Facebook
              </button>
            </div>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-slate-900 hover:underline">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
