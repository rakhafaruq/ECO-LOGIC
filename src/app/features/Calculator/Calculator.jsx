import { useState, useEffect, useRef } from 'react';
import { Youtube, MonitorPlay, MessageSquare, Briefcase, ActivitySquare, CheckCircle2, ChevronRight, Cloud, ShieldCheck, Zap, Flame, Lightbulb, TreePine, LayoutDashboard, Share2, Download, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const FACTORS = {
  youtube: { audio: 0.005, '144p': 0.015, '360p': 0.035, '720p': 0.1, '1080p': 0.2, '4k': 0.8 },
  streaming: { netflix: 0.15, spotify: 0.02, twitch: 0.2 },
  social: { tiktok: 0.12, instagram: 0.08, twitter: 0.02 },
  work: { zoom: 1.2, email: 0.01, email_attachment: 0.05, slack: 0.005, cloud_gb: 0.03 },
  ai: { chatgpt: 0.005, midjourney: 0.05, copilot: 0.002 }
};

const CATEGORIES = [
  {
    id: 'youtube', title: 'YouTube', icon: Youtube, color: 'text-rose-500', 
    theme: 'from-rose-500 to-rose-400', statLabel: 'Menonton Video', bgGlow: 'bg-rose-500/20',
    fields: [
      { id: 'url', label: 'URL Video YouTube', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
      { id: 'duration', label: 'Durasi Menonton (Menit)', type: 'number', unit: 'menit' },
      { id: 'quality', label: 'Kualitas Streaming', type: 'select', 
        options: [
          { value: 'audio', label: 'Audio Only', desc: '~0.005 kg CO₂/jam' },
          { value: '360p', label: 'SD (360p)', desc: '~0.035 kg CO₂/jam' },
          { value: '1080p', label: 'HD (1080p)', desc: '~0.2 kg CO₂/jam' },
          { value: '4k', label: '4K Ultra HD', desc: '~0.8 kg CO₂/jam' }
        ]}
    ]
  },
  {
    id: 'streaming', title: 'Streaming', icon: MonitorPlay, color: 'text-purple-600', 
    theme: 'from-purple-600 to-purple-500', statLabel: 'Konsumsi Konten', bgGlow: 'bg-purple-500/20',
    fields: [
      { id: 'netflix', label: 'Netflix / Disney+ (Jam/Hari)', type: 'number', unit: 'jam' },
      { id: 'spotify', label: 'Spotify / Apple Music (Jam/Hari)', type: 'number', unit: 'jam' }
    ]
  },
  {
    id: 'social', title: 'Sosial', icon: MessageSquare, color: 'text-sky-500', 
    theme: 'from-sky-500 to-blue-500', statLabel: 'Interaksi Sosial', bgGlow: 'bg-blue-500/20',
    fields: [
      { id: 'tiktok', label: 'TikTok (Jam/Hari)', type: 'number', unit: 'jam' },
      { id: 'instagram', label: 'Instagram (Jam/Hari)', type: 'number', unit: 'jam' }
    ]
  },
  {
    id: 'work', title: 'Kerja & Cloud', icon: Briefcase, color: 'text-emerald-600', 
    theme: 'from-emerald-600 to-emerald-500', statLabel: 'Aktivitas Produktif', bgGlow: 'bg-emerald-500/20',
    fields: [
      { id: 'zoom', label: 'Video Call (Jam/Hari)', type: 'number', unit: 'jam' },
      { id: 'emails', label: 'Kirim Email (Email/Hari)', type: 'number', unit: 'email' },
      { id: 'cloud', label: 'Penyimpanan Cloud (GB)', type: 'number', unit: 'GB' },
      { id: 'ai', label: 'Prompt AI (Prompt/Hari)', type: 'number', unit: 'prompt' }
    ]
  }
];

// Reusable Input Field Component
const InputField = ({ field, value, onChange }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const simulateAnalysis = (url) => {
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      let vidId = '';
      if(url.includes('v=')) vidId = url.split('v=')[1].substring(0, 11);
      else if(url.includes('youtu.be/')) vidId = url.split('youtu.be/')[1].substring(0, 11);
      
      setVideoData({
        title: "Video Terdeteksi dari URL",
        thumbnail: `https://i.ytimg.com/vi/${vidId || 'dQw4w9WgXcQ'}/hqdefault.jpg`,
        creator: "Channel YouTube"
      });
      setIsAnalyzing(false);
      onChange(url);
    }, 1500);
  };

  if (field.type === 'url') {
    return (
      <div className="space-y-3">
        <label className="text-sm font-bold text-emerald-900/80 uppercase tracking-widest">{field.label}</label>
        <div className="relative">
          <input
            type="text"
            placeholder={field.placeholder}
            onBlur={(e) => simulateAnalysis(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 border-2 border-emerald-900/10 rounded-xl text-emerald-950 placeholder-emerald-800/40
              focus:outline-none focus:border-emerald-500/60 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10
              transition-all duration-300 text-sm font-medium backdrop-blur-sm"
          />
          <Youtube className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-800/40" />
        </div>
        
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 overflow-hidden">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-emerald-800/60 font-medium">Menganalisis URL ke server...</span>
            </motion.div>
          )}

          {videoData && !isAnalyzing && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 p-3 bg-white/80 rounded-xl border border-emerald-200 shadow-sm items-center backdrop-blur-sm">
              <img src={videoData.thumbnail} alt="Thumbnail" className="w-24 h-14 object-cover rounded-lg border border-emerald-900/10" />
              <div>
                <p className="text-sm font-bold text-emerald-950 line-clamp-1">{videoData.title}</p>
                <p className="text-xs text-emerald-800/60">{videoData.creator}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto mr-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div className="space-y-3">
        <label className="text-sm font-bold text-emerald-900/80 uppercase tracking-widest">{field.label}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field.options.map((opt) => {
            const isActive = value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`relative p-3 rounded-xl border-2 text-left transition-all overflow-hidden group
                  ${isActive 
                    ? 'border-emerald-500 bg-white shadow-md' 
                    : 'border-emerald-900/10 bg-white/60 hover:bg-white hover:border-emerald-300'}`}
              >
                {isActive && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
                <p className={`text-sm font-bold ${isActive ? 'text-emerald-800' : 'text-emerald-900/80'}`}>{opt.label}</p>
                <p className="text-[10px] text-emerald-800/50 w-full mt-1 font-medium">{opt.desc}</p>
                {isActive && (
                  <motion.div layoutId="quality-check" className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 relative group">
      <label className="text-sm font-bold text-emerald-900/80 uppercase tracking-widest">{field.label}</label>
      <div className="relative flex items-center">
        <input
          type="number"
          min="0"
          placeholder="0"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/60 border-2 border-emerald-900/10 rounded-xl text-emerald-950 placeholder-emerald-800/30
            focus:outline-none focus:border-emerald-400/60 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/5
            transition-all duration-300 text-sm font-medium backdrop-blur-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {field.unit && (
          <span className="absolute right-4 text-xs font-bold text-emerald-800/40 select-none bg-white/50 px-2 py-1 rounded-md">
            {field.unit}
          </span>
        )}
      </div>
    </div>
  );
};

// Results Chart Component
const Results = ({ data, emissions }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    // Fire confetti when results mount!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { return clearInterval(interval); }
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#10b981', '#34d399', '#059669', '#0ea5e9'] }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#10b981', '#34d399', '#059669', '#0ea5e9'] }));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const saveToDashboard = () => {
    if (isSaved) return;
    const history = JSON.parse(localStorage.getItem('ecologic_history') || '[]');
    const newEntry = {
      date: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      total: emissions.total,
      youtube: emissions.youtube,
      streaming: emissions.streaming,
      social: emissions.social,
      work: emissions.work
    };
    history.push(newEntry);
    localStorage.setItem('ecologic_history', JSON.stringify(history));
    setIsSaved(true);
  };

  const chartData = CATEGORIES.map(cat => ({
    name: cat.title,
    value: parseFloat(emissions[cat.id] || 0),
    fill: cat.id === 'youtube' ? '#f43f5e' : cat.id === 'streaming' ? '#9333ea' : cat.id === 'social' ? '#0ea5e9' : '#10b981'
  })).filter(d => d.value > 0);

  const totalEmissions = parseFloat(emissions.total) || 0;
  const treesNeeded = Math.ceil(totalEmissions / 22);

  const tips = [
    { tip: "Turunkan resolusi YouTube ke 720p di HP.", icon: Youtube },
    { tip: "Matikan video saat tidak diperlukan di Zoom.", icon: MonitorPlay },
    { tip: "Hapus email promosi lama & file redundan.", icon: Cloud }
  ];

  // Logic for Gamification Badge
  let badgeTheme = "from-amber-500 to-orange-600 shadow-amber-500/30 border-amber-400";
  let badgeText = "Warga Digital Aktif";
  let badgeIcon = <Flame className="w-5 h-5 text-amber-100" />
  let badgeDesc = "Jejak karbon digital Anda lebih tinggi dari rata-rata. Yuk mulai kurangi!";

  if (totalEmissions < 50) {
    badgeTheme = "from-emerald-400 to-teal-500 shadow-emerald-500/30 border-emerald-300";
    badgeText = "Eco Master Digital";
    badgeIcon = <ShieldCheck className="w-5 h-5 text-emerald-50" />
    badgeDesc = "Luar biasa! Penggunaan digital Anda sangat efisien dan ramah lingkungan.";
  } else if (totalEmissions < 150) {
    badgeTheme = "from-blue-400 to-indigo-500 shadow-blue-500/30 border-blue-300";
    badgeText = "Green Citizen";
    badgeIcon = <ActivitySquare className="w-5 h-5 text-blue-50" />
    badgeDesc = "Penggunaan Anda cukup seimbang. Ada ruang untuk lebih baik!";
  }

  // AI Eco-Bot Logic (Find worst category)
  const highestCategory = chartData.reduce((prev, current) => (prev.value > current.value) ? prev : current, chartData[0]);
  let botAdvice = "Sistem Anda sangat efisien!";
  if (highestCategory && highestCategory.name === 'YouTube') botAdvice = "Mayoritas karbon Anda dari YouTube! Coba turunkan auto-play dan setel resolusi mentok ke 720p.";
  else if (highestCategory && highestCategory.name === 'Streaming') botAdvice = "Streaming mengambil porsi terbesar Anda. Kurangi binge-watching & gunakan unduhan offline jika memungkinkan.";
  else if (highestCategory && highestCategory.name === 'Sosial') botAdvice = "Anda terlalu banyak *doom-scrolling*. Kurangi konsumsi konten video pendek berulang.";
  else if (highestCategory && highestCategory.name === 'Kerja & Cloud') botAdvice = "Banyak file Cloud menumpuk! Coba bersihkan G-Drive dari video atau foto lawas untuk meringankan beban server pusat.";

  const downloadPDF = async () => {
    if(!printRef.current) return;
    setIsDownloading(true);
    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Laporan_ECO-LOGIC_${new Date().getTime()}.pdf`);
    } catch(err) {
      console.error(err);
      alert('Gagal membuat PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
      className="space-y-6 relative"
    >
      <div ref={printRef} className="bg-white/95 rounded-3xl p-2 sm:p-4 space-y-6">
        {/* Hero Stat */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-emerald-100 p-8 sm:p-12 text-center shadow-[0_10px_40px_rgba(16,185,129,0.06)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-tr-full opacity-50 pointer-events-none" />
        
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
          <Cloud className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
        </motion.div>
        <p className="text-sm font-bold text-emerald-800/60 mb-1 uppercase tracking-wider relative z-10">Total Jejak Karbon Digital Tahunan</p>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 relative z-10 drop-shadow-sm"
        >
          {totalEmissions.toLocaleString('id-ID', { maximumFractionDigits: 1 })} <span className="text-2xl text-emerald-800">kg CO₂e</span>
        </motion.p>
        <p className="text-xs font-semibold text-emerald-800/70 max-w-sm mx-auto mt-3 relative z-10">
          Setara dengan mengendarai mobil berbahan bakar bensin sejauh {(totalEmissions * 4).toFixed(0)} km.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Gamification Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
          className={`rounded-2xl bg-gradient-to-br ${badgeTheme} text-white p-6 shadow-xl relative border flex items-center gap-4`}
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-sm shadow-inner">
            {badgeIcon}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-0.5">Title Earned</p>
            <h3 className="text-xl font-black drop-shadow-sm mb-1">{badgeText}</h3>
            <p className="text-xs text-white/90 font-medium leading-relaxed">{badgeDesc}</p>
          </div>
        </motion.div>

        {/* Gamification Tree Offset Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white border border-emerald-200 text-emerald-950 p-6 shadow-lg shadow-emerald-500/5 relative overflow-hidden flex items-center gap-4 flex-1"
        >
          <div className="absolute right-[-20%] top-[-20%] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 border border-emerald-200 shadow-inner">
            <TreePine className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-black mb-1 text-emerald-800">Pohon Penyeimbang</h3>
            <p className="text-xs text-emerald-800/80 leading-relaxed font-bold">
              Tanam <strong className="text-base bg-emerald-600 text-white px-2 py-0.5 rounded-md mx-1 shadow-sm">{treesNeeded}</strong> pohon dewasa untuk menetralisir karbon digital tahuan Anda.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Charts */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-bold text-emerald-950 mb-6 flex items-center gap-2">
            <ActivitySquare className="w-4 h-4 text-emerald-500" /> Distribusi Emisi
          </h3>
          <div className="h-[220px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#064e3b', fontSize: 11, fontWeight: 600}} width={80} />
                  <Tooltip 
                    cursor={{fill: '#f0fdf4'}}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#d1fae5', borderRadius: '12px', backdropFilter: 'blur(8px)', color: '#064e3b', fontWeight: 'bold' }} 
                    itemStyle={{ color: '#064e3b' }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-sm font-bold text-emerald-900/40">Data tidak cukup</div>
            )}
          </div>
        </div>

        {/* Eco Tips */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm h-full flex flex-col">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Saran Diet Digital
            </h3>
            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {tips.map((t, i) => (
                <div key={i} className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                  <span className="text-emerald-700 mt-0.5 shrink-0 text-xs font-bold w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">{i+1}</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-emerald-900 leading-relaxed">{t.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE: AI Eco-Bot Widget */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-emerald-950 to-teal-900 rounded-[2rem] p-6 text-emerald-50 shadow-xl border border-emerald-800 flex items-start sm:items-center gap-5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        <div className="w-14 h-14 bg-emerald-800/50 rounded-full flex flex-shrink-0 items-center justify-center border border-emerald-700/50 relative z-10 shadow-inner group-hover:bg-emerald-700/50 transition-colors">
          <Bot className="w-7 h-7 text-emerald-300" />
        </div>
        <div className="relative z-10">
          <h3 className="text-sm font-black flex items-center gap-2 mb-1.5 uppercase tracking-widest text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" /> Eco-Bot AI Insights
          </h3>
          <p className="text-sm font-medium leading-relaxed max-w-xl">
            "{botAdvice}"
          </p>
        </div>
      </motion.div>

      </div> {/* End of printRef wrapper */}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <button 
          onClick={downloadPDF}
          disabled={isDownloading}
          className={`flex-1 flex justify-center items-center gap-2 px-6 py-4 rounded-[1.5rem] font-bold transition-all shadow-md text-emerald-800 border-2
            ${isDownloading ? 'bg-emerald-50 border-emerald-200 opacity-70' : 'bg-white border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'}`}
        >
          {isDownloading ? <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent flex-shrink-0 rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
          {isDownloading ? 'Memproses PDF...' : 'Unduh File PDF Resmi'}
        </button>
        <button 
          onClick={saveToDashboard}
          className={`flex-1 flex justify-center items-center gap-2 px-6 py-4 rounded-[1.5rem] font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-1
            ${isSaved ? 'bg-teal-600 text-white shadow-teal-500/20' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
        >
          {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
          {isSaved ? 'Tersimpan Di Dashboard!' : 'Simpan Ke Dashboard'}
        </button>
        <button 
          onClick={() => {
            const text = `Saya baru saja mengecek jejak karbon digital melalui ECO-LOGIC! Total emisi saya ${totalEmissions.toLocaleString('id-ID')} kg CO2, setara dengan menanam ${treesNeeded} pohon!`;
            navigator.clipboard.writeText(text);
            alert('Teks berhasil disalin ke clipboard! Bagikan hasil Anda ke sosmed.');
          }}
          className="flex-1 flex justify-center items-center gap-2 px-6 py-4 rounded-[1.5rem] bg-white border-2 border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-50 transition-all shadow-sm hover:-translate-y-1"
        >
          <Share2 className="w-5 h-5 text-emerald-600" />
          Bagikan
        </button>
      </div>

    </motion.div>
  );
};

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const [emissions, setEmissions] = useState({ total: 0 });

  const calcEmissions = () => {
    let results = { total: 0 };
    
    // YouTube
    const ytMins = parseFloat(data.youtube_duration || 0);
    const ytQuality = data.youtube_quality || '1080p';
    const ytHrs = ytMins / 60;
    results.youtube = ytHrs * 365 * (FACTORS.youtube[ytQuality] || 0.2);
    
    // Streaming & Social
    results.streaming = ((parseFloat(data.streaming_netflix || 0) * FACTORS.streaming.netflix) + (parseFloat(data.streaming_spotify || 0) * FACTORS.streaming.spotify)) * 365;
    results.social = ((parseFloat(data.social_tiktok || 0) * FACTORS.social.tiktok) + (parseFloat(data.social_instagram || 0) * FACTORS.social.instagram)) * 365;
    
    // Work
    results.work = ((parseFloat(data.work_zoom || 0) * FACTORS.work.zoom) + (parseFloat(data.work_emails || 0) * FACTORS.work.email)) * 365;
    results.work += parseFloat(data.work_cloud || 0) * FACTORS.work.cloud_gb * 12; // monthly to yearly
    results.work += (parseFloat(data.work_ai || 0) * FACTORS.ai.chatgpt) * 365;
    
    results.total = Object.values(results).reduce((a, b) => a + b, 0);
    setEmissions(results);
  };

  useEffect(() => { calcEmissions(); }, [data]);

  const handleInput = (id, value) => {
    setData(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (currentStep < CATEGORIES.length) setCurrentStep(c => c + 1);
  };

  const isResults = currentStep === CATEGORIES.length;

  return (
    <div className="min-h-screen bg-transparent text-emerald-950 overflow-x-hidden font-sans selection:bg-emerald-200/50 pt-10 px-4">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-300/30 rounded-full blur-[120px] mix-blend-multiply opacity-40" />
      </div>

      <div className="max-w-[75rem] mx-auto py-8 lg:py-12 relative z-10 pb-32">
        
        {/* BENTO GRID SPECIFIC LAYOUT FOR CALCULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: Header & Progress Steps */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Header Bento */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/85 rounded-[2.5rem] p-8 pb-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-emerald-900/5 backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
                <ActivitySquare className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black tracking-widest uppercase text-emerald-800">ECO-LOGIC CALCULATOR</span>
              </div>
              <h1 className="text-4xl font-black text-emerald-950 tracking-tighter mb-4 leading-none">
                Hitung <br/><span className="bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">Jejak Digitalmu.</span>
              </h1>
              <p className="text-sm font-semibold text-emerald-800/60 leading-relaxed">
                Platform modern untuk melacak secara akurat emisi karbon dari aktivitas internet harian Anda ke dalam satuan kilogram CO₂.
              </p>
            </motion.div>

            {/* Vertical Progress Steps Bento */}
            <div className="hidden lg:flex flex-col bg-white/70 rounded-[2.5rem] p-6 shadow-sm border border-emerald-900/5 backdrop-blur-md space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800/40 ml-4 mb-2">Modul Simulasi</h3>
              {CATEGORIES.map((cat, idx) => {
                const isActive = currentStep === idx;
                const isCompleted = currentStep > idx;
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setCurrentStep(idx)}
                    layout
                    className={`w-full flex items-center justify-start gap-4 px-5 py-4 rounded-3xl transition-all duration-300 relative overflow-hidden group
                      ${isActive
                        ? 'bg-white shadow-md border border-emerald-100'
                        : isCompleted
                          ? 'bg-emerald-50/50 hover:bg-emerald-50'
                          : 'bg-transparent hover:bg-white/40'
                      }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-emerald-100/50' : 'bg-transparent'}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : isCompleted ? 'text-emerald-500' : 'text-emerald-800/40 group-hover:text-emerald-800/60'}`} />
                    </div>
                    <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-emerald-950' : isCompleted ? 'text-emerald-700' : 'text-emerald-800/50 group-hover:text-emerald-800/70'}`}>
                      {cat.title}
                    </span>
                    {isActive && <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-8 rounded-full bg-emerald-400" />}
                  </motion.button>
                );
              })}
              {/* Results Tab */}
              <motion.button
                onClick={() => setCurrentStep(CATEGORIES.length)}
                className={`w-full mt-4 flex items-center justify-start gap-4 px-5 py-4 rounded-3xl transition-all duration-300
                  ${currentStep === CATEGORIES.length ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]' : 'hover:bg-white/40 text-emerald-800/40 hover:text-emerald-800/60'}`}
              >
                <div className="p-2 rounded-xl bg-white/10"><Zap className="w-5 h-5" /></div>
                <span className="text-sm font-bold tracking-tight">Cetak Hasil</span>
              </motion.button>
            </div>

            {/* Mobile Progress Steps (Horizontal Wrapper) */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 custom-scrollbar">
               {CATEGORIES.map((cat, idx) => {
                 const isActive = currentStep === idx;
                 const Icon = cat.icon;
                 return (
                    <button key={cat.id} onClick={()=>setCurrentStep(idx)} className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs ${isActive ? 'bg-emerald-600 text-white' : 'bg-white/80 text-emerald-800/50'}`}>
                      <Icon className="w-4 h-4"/> {cat.title}
                    </button>
                 );
               })}
               <button onClick={()=>setCurrentStep(CATEGORIES.length)} className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs ${currentStep === CATEGORIES.length ? 'bg-teal-600 text-white' : 'bg-white/80 text-teal-800/50'}`}>
                  <Zap className="w-4 h-4"/> Hasil
               </button>
            </div>

          </div>

          {/* RIGHT MAIN PANEL: Active Form or Results Bento */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!isResults ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-[3rem] bg-white/85 border border-emerald-900/5 shadow-[0_10px_40px_rgb(0,0,0,0.03)] overflow-hidden backdrop-blur-xl relative"
                >
                  {/* Category Header */}
                  <div className={`px-10 py-12 bg-gradient-to-br ${CATEGORIES[currentStep].theme} relative overflow-hidden flex flex-col items-start`}>
                    <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
                    <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg mb-6 relative z-10">
                      {(() => { const Icon = CATEGORIES[currentStep].icon; return <Icon className="w-8 h-8 text-white" />; })()}
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-sm relative z-10 mb-1">{CATEGORIES[currentStep].title}</h2>
                    <p className="text-white/80 text-sm font-semibold relative z-10">{CATEGORIES[currentStep].statLabel}</p>
                  </div>

                  {/* Form Fields */}
                  <div className="p-8 sm:p-10 space-y-8 bg-transparent">
                    {CATEGORIES[currentStep].fields.map((field) => (
                      <InputField
                        key={field.id}
                        field={field}
                        value={data[`${CATEGORIES[currentStep].id}_${field.id}`]}
                        onChange={(val) => handleInput(`${CATEGORIES[currentStep].id}_${field.id}`, val)}
                      />
                    ))}

                    {/* Subtotal & Next Navigation Wrapper */}
                    <div className="mt-10 pt-8 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex bg-white shadow-sm border border-emerald-100 rounded-[1.5rem] px-5 py-3 items-center gap-3">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                        <span className="text-sm text-emerald-800/60 font-medium">Draft Emisi: <strong className="text-emerald-700 font-black">{(emissions.total).toLocaleString('id-ID', { maximumFractionDigits: 1 })} kg</strong></span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={nextStep}
                        className="w-full sm:w-auto flex justify-center items-center gap-3 px-10 py-4 rounded-3xl bg-emerald-600 text-white font-black hover:bg-emerald-500 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
                      >
                        {currentStep === CATEGORIES.length - 1 ? 'Hitung Grand Total' : 'Sesi Berikutnya'}
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="results">
                  <Results data={data} emissions={emissions} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
