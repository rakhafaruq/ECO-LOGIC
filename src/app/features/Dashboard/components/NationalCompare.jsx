import { Trophy } from "lucide-react";
import { motion } from "motion/react";

export const NationalCompare = ({ badge, currentMonthEmissions, NATIONAL_AVG }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 rounded-[2.5rem] bg-emerald-900 text-white p-8 border border-emerald-800 shadow-xl overflow-hidden relative flex flex-col justify-center"
        >
            <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center gap-3 mb-4 text-emerald-300 relative z-10">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <h3 className="text-sm font-black tracking-widest uppercase">Peringkat Jejak Anda</h3>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center relative z-10">
                <div className="flex-1">
                    <h4 className="text-3xl font-black mb-2 tracking-tight drop-shadow-sm">{badge ? badge.title : currentMonthEmissions < NATIONAL_AVG ? "Bagus! Anda di bawah rata-rata." : "Awas! Emisi Anda lebih tinggi."}</h4>
                    <p className="text-emerald-100/70 font-medium text-sm leading-relaxed max-w-sm">
                        Rata-rata warga digital menghabiskan sekitar {NATIONAL_AVG} kg CO2e/bulan. Anda secara perbandingan menggunakan{" "}
                        <strong className="text-white">{currentMonthEmissions.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg</strong>.
                    </p>
                </div>
                {badge && (
                    <div className="w-full sm:w-auto shrink-0 bg-emerald-800/50 border border-emerald-700/50 rounded-3xl p-6 flex flex-col items-center justify-center min-w-[180px] shadow-inner backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl mb-3 border border-white/20 shadow-sm">{badge.icon || "🍃"}</div>
                        <h4 className="text-lg font-black text-center mb-1 tracking-tight">{badge.title}</h4>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
