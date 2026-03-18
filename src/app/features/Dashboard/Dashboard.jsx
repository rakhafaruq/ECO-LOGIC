import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, Trash2, Activity, Target, Trophy, Info, Settings2, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [budget, setBudget] = useState(150); // Default monthly target in kg
  const [isSettingMode, setIsSettingMode] = useState(false);
  const [newBudget, setNewBudget] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ecologic_history') || '[]');
    setHistory(saved);
    const savedBudget = localStorage.getItem('ecologic_budget');
    if(savedBudget) setBudget(parseFloat(savedBudget));
  }, []);

  const clearHistory = () => {
    if (confirm('Yakin hapus jejak lokal Anda?')) {
      localStorage.removeItem('ecologic_history');
      setHistory([]);
    }
  };

  const saveBudget = () => {
    if(newBudget && !isNaN(newBudget) && parseFloat(newBudget) > 0) {
      localStorage.setItem('ecologic_budget', newBudget);
      setBudget(parseFloat(newBudget));
    }
    setIsSettingMode(false);
  };

  const hasData = history.length > 0;
  
  // Calculate specific metrics
  const latestEmissions = hasData ? parseFloat(history[history.length - 1].total) : 0;
  
  // PieChart Data for Budget
  const budgetPercentage = Math.min((latestEmissions / budget) * 100, 100);
  const isOverBudget = latestEmissions > budget;
  
  const ringData = [
    { name: 'Used', value: budgetPercentage },
    { name: 'Remaining', value: 100 - budgetPercentage }
  ];

  const chartData = history.slice(-30).map((entry, idx) => ({
    name: entry.date,
    total: parseFloat(entry.total),
  }));

  const NATIONAL_AVG = 300; // Mock 300kg/year national average

  return (
    <div className="min-h-screen bg-transparent text-emerald-950 px-4 pb-20 pt-8">
      <div className="max-w-[85rem] mx-auto space-y-6 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/70 p-4 px-8 rounded-full border border-emerald-900/10 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-bold tracking-tight">Dashboard Personal</h1>
          </div>
          {hasData && (
            <button onClick={clearHistory} className="text-xs font-bold text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Reset History
            </button>
          )}
        </div>

        {!hasData ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-12 rounded-[3rem] bg-white/80 border border-emerald-900/5 backdrop-blur-xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[50vh] flex flex-col justify-center items-center">
            <Leaf className="w-16 h-16 text-emerald-200 mb-6" />
            <h2 className="text-3xl font-black text-emerald-950 mb-4 tracking-tight">Ruang Dashboard Kosong</h2>
            <p className="text-emerald-800/60 mb-8 max-w-lg font-semibold text-lg">Mulai gunakan kalkulator dan simpan hasil pertama Anda untuk mengaktifkan pemantauan karbon, ring target, dan algoritma gamifikasi.</p>
            <Link to="/calculator" className="px-8 py-4 rounded-full bg-emerald-600 text-white font-black hover:scale-105 transition-transform shadow-lg shadow-emerald-500/30">
              Gunakan Kalkulator
            </Link>
          </motion.div>
        ) : (
          
          /* BENTO GRID DASHBOARD */
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[minmax(0,auto)_minmax(350px,auto)] gap-6">
            
            {/* LATEST EMISSION SCORE BENTO */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="md:col-span-1 rounded-[2.5rem] bg-gradient-to-br from-emerald-50 to-white p-8 border border-emerald-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center gap-2 text-emerald-800/60 mb-8">
                <Activity className="w-4 h-4" /> <span className="text-xs font-black tracking-widest uppercase">Emisi Terakhir</span>
              </div>
              <div>
                <h2 className="text-[4rem] leading-none font-black text-emerald-950 tracking-tighter mb-2">
                  {latestEmissions.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  <span className="text-xl font-bold text-emerald-600 align-super ml-1">kg</span>
                </h2>
                <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black border ${latestEmissions < budget ? 'bg-emerald-100/50 text-emerald-700 border-emerald-200' : 'bg-rose-100/50 text-rose-700 border-rose-200'}`}>
                  {latestEmissions < budget ? "Aman dari Target" : "Melebihi Target"}
                </div>
              </div>
            </motion.div>

            {/* BUDGET RING BENTO */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="md:col-span-1 border border-emerald-900/5 rounded-[2.5rem] bg-white/85 p-6 shadow-sm backdrop-blur-xl relative flex flex-col items-center justify-center">
              <div className="absolute top-6 right-6">
                <button onClick={() => setIsSettingMode(!isSettingMode)} className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>

              <div className="h-40 w-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ringData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} stroke="none" dataKey="value">
                      <Cell fill={isOverBudget ? '#f43f5e' : '#10b981'} />
                      <Cell fill="#ecfdf5" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className={`text-3xl font-black ${isOverBudget ? 'text-rose-500' : 'text-emerald-500'}`}>{budgetPercentage.toFixed(0)}%</span>
                  <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">Digunakan</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSettingMode ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-6 left-6 right-6 flex gap-2">
                    <input type="number" placeholder="Target kg..." value={newBudget} onChange={e => setNewBudget(e.target.value)} className="w-full bg-emerald-50 px-3 py-2 rounded-xl text-sm font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-400" />
                    <button onClick={saveBudget} className="bg-emerald-600 text-white rounded-xl px-3 text-sm font-bold">OK</button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
                    <p className="text-sm font-bold text-emerald-950">Target Tahunan: {budget} kg</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* NATIONAL COMPARING BENTO */}
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

            {/* AREA CHART BENTO */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-4 rounded-[3rem] bg-white/85 border border-emerald-900/5 shadow-sm backdrop-blur-xl p-8 pt-10 min-h-[400px] flex flex-col">
              <div className="flex justify-between items-end mb-8 pl-4">
                <div>
                  <h3 className="text-2xl font-black text-emerald-950 tracking-tight">Riwayat Tren</h3>
                  <p className="text-emerald-800/60 font-medium text-sm">Fluktuasi karbon berdasarkan {history.length} simulasi pencatatan terakhir.</p>
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

          </div>
        )}
      </div>
    </div>
  );
}
