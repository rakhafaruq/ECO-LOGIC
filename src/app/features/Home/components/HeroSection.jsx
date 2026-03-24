import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, LayoutDashboard } from 'lucide-react';

function ChevronRightIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );
}

export const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto text-center flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-emerald-200/60 backdrop-blur-md mb-8 shadow-sm hover:shadow-md hover:bg-white/80 transition-all cursor-pointer group"
      >
        <Sparkles className="w-4 h-4 text-emerald-500 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-black tracking-widest uppercase text-emerald-800">ECO-LOGIC 4.0: AI & Gamifikasi</span>
        <ChevronRightIcon className="w-3 h-3 text-emerald-400" />
      </motion.div>

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
