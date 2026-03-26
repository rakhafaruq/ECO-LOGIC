import { Leaf, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export const ImpactSection = () => {
  return (
    <div className="w-full">
      {/* Stats Section */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-16 mb-4">
        <div className="bg-white/70 backdrop-blur-2xl border border-emerald-100/60 rounded-[3rem] shadow-sm p-10 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-100/60">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center py-6 md:py-0"
            >
              <span className="text-6xl lg:text-7xl font-black text-emerald-600 mb-4 tracking-tighter">306M</span>
              <span className="text-emerald-800/80 font-semibold text-lg max-w-[200px] mx-auto leading-tight">Ton CO₂ dari email global/tahun</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center py-6 md:py-0"
            >
              <span className="text-6xl lg:text-7xl font-black text-emerald-600 mb-4 tracking-tighter">1%</span>
              <span className="text-emerald-800/80 font-semibold text-lg max-w-[200px] mx-auto leading-tight">Kontribusi internet ke emisi global</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-6 md:py-0"
            >
              <span className="text-6xl lg:text-7xl font-black text-emerald-600 mb-4 tracking-tighter">4%</span>
              <span className="text-emerald-800/80 font-semibold text-lg max-w-[200px] mx-auto leading-tight">Pangsa emisi dari ICT di 2025</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-24">
        <div className="w-full bg-emerald-600 rounded-[3rem] py-20 sm:py-28 relative overflow-hidden shadow-2xl">
          {/* Subtle Background Pattern/Gradients */}
          <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/50 mix-blend-screen blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-400/30 mix-blend-screen blur-[80px] pointer-events-none" />

          <div className="max-w-[50rem] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto rounded-full border-2 border-emerald-400/60 flex items-center justify-center mb-8 bg-emerald-500/20 backdrop-blur-sm"
            >
              <Leaf className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
            >
              Mulai Perjalanan Digitalmu yang Lebih Hijau
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-emerald-50/90 font-medium text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Setiap langkah kecil membawa perubahan besar. Hitung jejak karbonmu sekarang dan dapatkan tips praktis untuk menguranginya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full bg-white text-emerald-700 font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
              >
                <Calculator className="w-5 h-5 text-emerald-600" />
                Mulai Sekarang
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
