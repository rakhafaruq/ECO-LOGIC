import { Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export const NationalCompare = ({ latestEmissions, NATIONAL_AVG }) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="md:col-span-2 rounded-[2.5rem] bg-emerald-900 text-white p-8 border border-emerald-800 shadow-xl overflow-hidden relative flex flex-col justify-center">
      <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-4 text-emerald-300">
        <Trophy className="w-5 h-5" /> <h3 className="text-sm font-black tracking-widest uppercase">Peringkat Jejak Anda</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
        <div className="flex-1">
          <h4 className="text-3xl font-black mb-2 tracking-tight">
            {latestEmissions < NATIONAL_AVG 
              ? "Bagus! Anda di bawah rata-rata." 
              : "Awas! Emisi Anda lebih tinggi."}
          </h4>
          <p className="text-emerald-100/70 font-medium text-sm leading-relaxed max-w-sm">
            Rata-rata warga digital menghabiskan sekitar {NATIONAL_AVG} kg CO2e/tahun. Anda secara perbandingan menggunakan <strong className="text-white">{latestEmissions.toLocaleString()} kg</strong>.
          </p>
        </div>

        <div className="w-full sm:w-1/3 h-4 bg-emerald-950 rounded-full overflow-hidden flex shadow-inner relative">
          <div className="absolute w-1 h-full bg-yellow-400 left-[50%] z-10" title="National Average" />
          <motion.div 
            initial={{ width: 0 }} animate={{ width: `${Math.min((latestEmissions / (NATIONAL_AVG * 2)) * 100, 100)}%` }} 
            className={`h-full ${latestEmissions > NATIONAL_AVG ? 'bg-rose-500' : 'bg-emerald-400'}`} 
          />
        </div>
      </div>
    </motion.div>
  );
};
