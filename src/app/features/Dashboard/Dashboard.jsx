import { useState, useEffect } from 'react';
import { LayoutDashboard, Trash2, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { LatestEmission } from './components/LatestEmission';
import { BudgetRing } from './components/BudgetRing';
import { NationalCompare } from './components/NationalCompare';
import { HistoryChart } from './components/HistoryChart';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [budget, setBudget] = useState(150);
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
  const latestEmissions = hasData ? parseFloat(history[history.length - 1].total) : 0;
  
  const currentMonthEmissions = history
    .slice(-30) 
    .reduce((sum, entry) => sum + parseFloat(entry.total), 0);
  
  const budgetPercentage = Math.min((currentMonthEmissions / budget) * 100, 100);
  const isOverBudget = currentMonthEmissions > budget;
  
  const ringData = [
    { name: 'Used', value: budgetPercentage },
    { name: 'Remaining', value: 100 - budgetPercentage }
  ];

  const chartData = history.slice(-30).map((entry) => ({
    name: entry.date,
    total: parseFloat(entry.total),
  }));

  const getMonthlyBadge = (monthlyTotal) => {
    if (monthlyTotal < 10) {
      return { title: "Eco Master", theme: "from-emerald-400 to-teal-600", icon: "👑", desc: "Luar biasa! Penggunaan digital Anda bulan ini sangat efisien." };
    } else if (monthlyTotal <= budget) {
      return { title: "Green Citizen", theme: "from-blue-400 to-indigo-500", icon: "🛡️", desc: "Jejak digital bulanan Anda seimbang dan terkendali di bawah batas aman." };
    } else {
      return { title: "Digital Explorer", theme: "from-amber-500 to-orange-600", icon: "🔥", desc: `Emisi Anda bulan ini melebihi target. Kurangi "${latestEmissions?.highestCategory || 'Streaming'}" hari ini!` };
    }
  };

  const currentBadge = hasData ? getMonthlyBadge(currentMonthEmissions) : null;
  const NATIONAL_AVG = 300;

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
            <button onClick={clearHistory} className="text-xs font-bold text-rose-500 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer">
              <Trash2 className="w-3 h-3" /> Hapus Riwayat
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
            
            <LatestEmission latestEmissions={latestEmissions} budget={budget} />

            <BudgetRing 
              budget={budget} 
              budgetPercentage={budgetPercentage} 
              isOverBudget={isOverBudget} 
              ringData={ringData} 
              isSettingMode={isSettingMode} 
              setIsSettingMode={setIsSettingMode} 
              newBudget={newBudget} 
              setNewBudget={setNewBudget} 
              saveBudget={saveBudget} 
            />

            <NationalCompare currentMonthEmissions={currentMonthEmissions} NATIONAL_AVG={NATIONAL_AVG} badge={currentBadge} historyLength={history.length}/>

            <HistoryChart historyLength={history.length} chartData={chartData} />

          </div>
        )}
      </div>
    </div>
  );
}
