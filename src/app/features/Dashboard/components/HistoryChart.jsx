import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const HistoryChart = ({ historyLength, chartData }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-4 rounded-[3rem] bg-white/85 border border-emerald-900/5 shadow-sm backdrop-blur-xl p-8 pt-10 min-h-[400px] flex flex-col">
      <div className="flex justify-between items-end mb-8 pl-4">
        <div>
          <h3 className="text-2xl font-black text-emerald-950 tracking-tight">Riwayat Tren</h3>
          <p className="text-emerald-800/60 font-medium text-sm">Fluktuasi karbon berdasarkan {historyLength} simulasi pencatatan terakhir.</p>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ecfdf5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#064e3b', fontSize: 10, fontWeight: 700}} dy={10} minTickGap={40} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#064e3b', fontSize: 11, fontWeight: 700}} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.98)', borderColor: '#e4e4e7', borderRadius: '16px', backdropFilter: 'blur(10px)', color: '#064e3b', fontWeight: 'bold', padding: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              itemStyle={{ color: '#047857', fontSize: '18px', fontWeight: '900' }}
            />
            <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={4} fill="url(#chartGradient)" activeDot={{ r: 8, strokeWidth: 3, fill: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
