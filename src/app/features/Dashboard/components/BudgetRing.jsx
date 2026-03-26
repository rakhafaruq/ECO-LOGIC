import { Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const BudgetRing = ({ budget, budgetPercentage, isOverBudget, ringData, isSettingMode, setIsSettingMode, newBudget, setNewBudget, saveBudget }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 border border-emerald-900/5 rounded-[2.5rem] bg-white/85 p-6 shadow-sm backdrop-blur-xl relative flex flex-col items-center justify-center"
        >
            <div className="absolute top-6 right-6">
                <button onClick={() => setIsSettingMode(!isSettingMode)} className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors">
                    <Settings2 className="w-4 h-4" />
                </button>
            </div>

            <div className="h-40 w-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={ringData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} stroke="none" dataKey="value">
                            <Cell fill={isOverBudget ? "#f43f5e" : "#3d785dff"} />
                            <Cell fill="#10b981" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className={`text-3xl font-black ${isOverBudget ? "text-rose-500" : "text-emerald-500"}`}>{budgetPercentage.toFixed(2)}%</span>
                    <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">Digunakan</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSettingMode ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-6 left-6 right-6 flex gap-2">
                        <input
                            type="number"
                            placeholder="Target kg..."
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                            className="w-full bg-emerald-50 px-3 py-2 rounded-xl text-sm font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <button onClick={saveBudget} className="bg-emerald-600 text-white rounded-xl px-3 text-sm font-bold">
                            OK
                        </button>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
                        <p className="text-sm font-bold text-emerald-950">Target Bulan ini: {budget} kg</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
