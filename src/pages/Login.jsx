import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[80vh] px-6 py-8 gap-8">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 hover:bg-slate-50 rounded-full">
          <ChevronLeft size={24} className="text-primary" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tighter">Sign In</h1>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tighter leading-tight">Welcome Back</h2>
        <p className="text-slate-500 text-sm">Enter your details to access your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-primary outline-none transition-all text-sm font-medium"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
              <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-accent underline">Forgot?</button>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-primary outline-none transition-all text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-3xl font-bold shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-auto text-center">
        <p className="text-sm text-slate-500">
          Don't have an account? {' '}
          <Link to="/register" className="text-primary font-bold underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
