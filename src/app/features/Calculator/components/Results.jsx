import { useState, useEffect, useRef } from 'react';
import { ActivitySquare, CheckCircle2, Cloud, ShieldCheck, LayoutDashboard, Share2, Download, Bot, Flame, TreePine, Youtube, MonitorPlay, Lightbulb, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { CATEGORIES } from '../data/calculatorData';

// Results Chart Component
export const Results = ({ data, emissions }) => {
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
  const treesNeeded = Math.max(1, Math.ceil((totalEmissions * 365) / 22));

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

  if (totalEmissions < 0.14) {
    badgeTheme = "from-emerald-400 to-teal-500 shadow-emerald-500/30 border-emerald-300";
    badgeText = "Eco Master Digital";
    badgeIcon = <ShieldCheck className="w-5 h-5 text-emerald-50" />
    badgeDesc = "Luar biasa! Penggunaan digital Anda sangat efisien dan ramah lingkungan.";
  } else if (totalEmissions < 0.41) {
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
    setIsDownloading(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      let y = 20;

      // ── Header ──
      pdf.setFillColor(16, 185, 129); // emerald-500
      pdf.roundedRect(15, y - 5, pageW - 30, 28, 4, 4, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('ECO-LOGIC', pageW / 2, y + 6, { align: 'center' });
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.text('Laporan Jejak Karbon Digital Harian', pageW / 2, y + 15, { align: 'center' });
      y += 35;

      // ── Date ──
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(9);
      const dateStr = new Date().toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const safeDate = dateStr.replace(/[^\x00-\x7F]/g, " ");
      pdf.text(`Tanggal: ${safeDate}`, 20, y);
      y += 12;

      // ── Total Emissions Hero ──
      pdf.setFillColor(240, 253, 244); // emerald-50
      pdf.roundedRect(15, y - 5, pageW - 30, 35, 4, 4, 'F');
      pdf.setTextColor(6, 78, 59); // emerald-950
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Total Jejak Karbon Digital Harian', pageW / 2, y + 5, { align: 'center' });
      pdf.setFontSize(28);
      pdf.setTextColor(16, 185, 129);
      
      // FIX: Replace Unicode '₂' that crashes jsPDF with standard '2'
      const safeNumber = totalEmissions.toFixed(1).replace('.', ',');
      pdf.text(`${safeNumber} kg CO2e`, pageW / 2, y + 22, { align: 'center' });
      y += 42;

      // ── Equivalent ──
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(10);
      pdf.text(`Setara mengendarai mobil bensin sejauh ${(totalEmissions * 4).toFixed(1)} km per hari`, pageW / 2, y, { align: 'center' });
      pdf.text(`Perlu menanam ${treesNeeded} pohon dewasa untuk menetralisir`, pageW / 2, y + 6, { align: 'center' });
      y += 18;

      // ── Badge ──
      pdf.setFillColor(6, 78, 59);
      pdf.roundedRect(15, y - 3, pageW - 30, 16, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      
      const safeBadgeText = badgeText.replace(/[^\x00-\x7F]/g, ""); // strip unicode
      const safeBadgeDesc = badgeDesc.replace(/[^\x00-\x7F]/g, "");
      pdf.text(`Title: ${safeBadgeText}`, 22, y + 5);
      pdf.setFontSize(8);
      pdf.setFont(undefined, 'normal');
      pdf.text(safeBadgeDesc, 22, y + 10, { maxWidth: pageW - 45 });
      y += 24;

      // ── Category Breakdown ──
      pdf.setTextColor(6, 78, 59);
      pdf.setFontSize(13);
      pdf.setFont(undefined, 'bold');
      pdf.text('Distribusi Emisi Per Kategori', 20, y);
      y += 8;

      const barColors = {
        'YouTube': [244, 63, 94],
        'Streaming': [147, 51, 234],
        'Sosial': [14, 165, 233],
        'Kerja & Cloud': [16, 185, 129]
      };

      const maxVal = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 1;
      chartData.forEach(item => {
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(6, 78, 59);
        const safeName = item.name.replace(/[^\x00-\x7F]/g, "");
        pdf.text(safeName, 22, y + 4);

        // Draw bar
        const barW = Math.max(((item.value / maxVal) * (pageW - 100)), 2);
        const color = barColors[item.name] || [16, 185, 129];
        pdf.setFillColor(color[0], color[1], color[2]);
        pdf.roundedRect(62, y - 1, barW, 7, 2, 2, 'F');

        // Value label
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(80, 80, 80);
        pdf.text(`${item.value.toFixed(1).replace('.', ',')} kg`, 62 + barW + 3, y + 4);
        y += 12;
      });

      if (chartData.length === 0) {
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text('Tidak ada data emisi yang tersedia.', 22, y + 4);
        y += 12;
      }
      y += 6;

      // ── Tips ──
      pdf.setTextColor(6, 78, 59);
      pdf.setFontSize(13);
      pdf.setFont(undefined, 'bold');
      pdf.text('Saran Diet Digital', 20, y);
      y += 8;

      tips.forEach((t, i) => {
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(60, 60, 60);
        const safeTip = t.tip.replace(/[^\x00-\x7F]/g, "");
        pdf.text(`${i + 1}. ${safeTip}`, 22, y);
        y += 7;
      });
      y += 6;

      // ── AI Eco-Bot Advice ──
      pdf.setFillColor(6, 78, 59);
      pdf.roundedRect(15, y - 3, pageW - 30, 20, 3, 3, 'F');
      pdf.setTextColor(52, 211, 153);
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'bold');
      pdf.text('ECO-BOT AI INSIGHTS', 22, y + 4);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      const safeBot = botAdvice.replace(/[^\x00-\x7F]/g, "");
      pdf.text(`"${safeBot}"`, 22, y + 11, { maxWidth: pageW - 45 });
      y += 28;

      // ── Footer ──
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, y, pageW - 20, y);
      y += 6;
      pdf.setTextColor(160, 160, 160);
      pdf.setFontSize(8);
      pdf.text('Dokumen ini dihasilkan otomatis oleh ECO-LOGIC Carbon Calculator.', pageW / 2, y, { align: 'center' });
      pdf.text('https://eco-logic.app', pageW / 2, y + 5, { align: 'center' });

      // FIX: Force strictly as PDF Blob downloaded via Anchor tag
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Laporan_ECO-LOGIC_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

    } catch(err) {
      console.error('PDF generation error:', err);
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
        <p className="text-sm font-bold text-emerald-800/60 mb-1 uppercase tracking-wider relative z-10">Total Jejak Karbon Digital Harian</p>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 relative z-10 drop-shadow-sm"
        >
          {totalEmissions.toLocaleString('id-ID', { maximumFractionDigits: 1 })} <span className="text-2xl text-emerald-800">kg CO₂e</span>
        </motion.p>
        <p className="text-xs font-semibold text-emerald-800/70 max-w-sm mx-auto mt-3 relative z-10">
          Setara dengan mengendarai mobil berbahan bakar bensin sejauh {(totalEmissions * 4).toFixed(1)} km per hari.
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
              Tanam <strong className="text-base bg-emerald-600 text-white px-2 py-0.5 rounded-md mx-1 shadow-sm">{treesNeeded}</strong> pohon dewasa untuk menetralisir karbon digital Anda selama setahun.
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
