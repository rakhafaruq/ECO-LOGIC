import { Link, useLocation } from 'react-router';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 backdrop-blur-md border-b border-emerald-900/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-900 to-teal-800 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-teal-600 transition-all">ECO-LOGIC</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300
                      ${isActive 
                        ? 'text-emerald-900 bg-emerald-100/60' 
                        : 'text-emerald-800/60 hover:text-emerald-900 hover:bg-emerald-900/5'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div layoutId="nav-pill" className="absolute inset-0 border border-emerald-300 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-emerald-900 hover:text-emerald-700 p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden pt-24 px-4 pb-6 border-b border-emerald-900/10 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-4 text-lg font-bold rounded-2xl transition-all
                      ${isActive 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : 'text-emerald-800/70 hover:bg-emerald-50 border border-transparent'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer to push content down below fixed navbar */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
