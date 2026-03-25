import React from 'react';
import Navbar from './Navbar';
import { motion } from 'motion/react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-[104px]" // Height of promo banner + navbar
      >
        {children}
      </motion.main>
    </div>
  );
}
