import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, LayoutDashboard } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative pt-8 pb-20 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto text-center flex flex-col items-center">

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1.1] text-emerald-950 mb-8 max-w-5xl"
      >
        Jejak Karbon Digitalmu,
        <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-sm pb-2">
          Kini Terlihat Jelas.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg sm:text-xl md:text-2xl text-emerald-800/70 max-w-3xl font-medium leading-relaxed mb-12"
      >
        Internet tidak sebersih yang Anda kira. Hitung total emisi dari YouTube, Netflix, Cloud, hingga AI—lalu dapatkan target diet digital Anda.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
      >
        <Link to="/calculator" className="group flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full bg-emerald-600 text-white font-black text-lg hover:bg-emerald-500 transition-all shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_50px_rgba(16,185,129,0.4)] hover:-translate-y-1">
          Kalkulasi Sekarang
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/dashboard" className="group flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full bg-white text-emerald-800 font-bold text-lg hover:bg-emerald-50 transition-all shadow-sm border border-emerald-200/60 hover:-translate-y-1 backdrop-blur-sm">
          <LayoutDashboard className="w-5 h-5 text-emerald-500" />
          Lihat Dashboard
        </Link>
      </motion.div>
    </div>
  );
};
