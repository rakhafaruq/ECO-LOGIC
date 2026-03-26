import { Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export const WebsiteCarbonSection = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 lg:pt-28 lg:pb-0">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950"
        >
          Jejak Karbon Website Ini
        </motion.h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-[2.5rem] p-10 lg:p-16 text-center shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 border border-emerald-100">
          <Leaf className="w-10 h-10" />
        </div>
        
        <h3 className="text-2xl font-bold text-emerald-950 mb-4">Practice What We Preach</h3>
        <p className="text-emerald-800/80 font-medium text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Kami juga berkomitmen untuk menjaga website Eco-Logic tetap ramah lingkungan dengan optimasi performa dan hosting hijau.
        </p>

        <div className="text-sm font-semibold text-emerald-600/60 max-w-lg mx-auto">
          Data tidak tersedia. Website Carbon API mungkin sedang down atau URL belum terdaftar. Coba lagi setelah website ini di-deploy ke produksi.
        </div>
      </motion.div>
    </div>
  );
};
