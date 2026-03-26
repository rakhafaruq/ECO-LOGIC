import { Activity } from "lucide-react";
import { motion } from "motion/react";

export const LatestEmission = ({ latestEmissions, budget }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-1 rounded-[2.5rem] bg-gradient-to-br from-emerald-50 to-white p-8 border border-emerald-100 shadow-sm flex flex-col justify-between relative overflow-hidden"
        >
            <div className="flex items-center gap-2 text-emerald-800/60 mb-6">
                <Activity className="w-4 h-4" /> <span className="text-xs font-black tracking-widest uppercase">Emisi Terakhir</span>
            </div>
            <div>
                <h2 className="text-[4rem] leading-none font-black text-emerald-950 tracking-tighter mb-2 ml-2">
                    {latestEmissions.toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    <span className="text-xl font-bold text-emerald-600 align-super ml-2">kg</span>
                </h2>
                <div
                    className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black border ${latestEmissions < budget ? "bg-emerald-100/50 text-emerald-700 border-emerald-200" : "bg-rose-100/50 text-rose-700 border-rose-200"}`}
                >
                    {latestEmissions < budget ? "Aman dari Target" : "Melebihi Target"}
                </div>
            </div>
        </motion.div>
    );
};
