import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Globe, Zap, TreePine, Sparkles, BarChart3, Cloud, LayoutDashboard } from 'lucide-react';
import Marquee from 'react-fast-marquee';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const LOGOS = [
    "Tech In Asia", "Greenpeace ID", "Kemenkominfo", "Google Startups", "AWS Green", "WWF Indonesia", "TechCrunch"
  ];

  return (
    <div className="min-h-screen bg-white text-emerald-950 font-sans overflow-x-hidden relative">
      
      {/* AURORA / MESH GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-200/50 mix-blend-multiply blur-[120px] animate-pulse [animation-duration:10s]" />
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-200/50 mix-blend-multiply blur-[100px] animate-pulse [animation-duration:8s] [animation-delay:2s]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[50vw] rounded-full bg-green-100/40 mix-blend-multiply blur-[120px]" />
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION - SAAS TEMPLATE VIBE */}
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto text-center flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-emerald-200/60 backdrop-blur-md mb-8 shadow-sm hover:shadow-md hover:bg-white/80 transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black tracking-widest uppercase text-emerald-800">ECO-LOGIC 4.0: AI & Gamifikasi</span>
            <ChevronRightIcon className="w-3 h-3 text-emerald-400" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1.1] text-emerald-950 mb-8 max-w-5xl"
          >
            Jejak Karbon Digitalmu,
            <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-sm pb-2">
              Kini Terlihat Jelas.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-emerald-800/70 max-w-3xl font-medium leading-relaxed mb-12"
          >
            Internet tidak sebersih yang Anda kira. Hitung total emisi dari YouTube, Netflix, Cloud, hingga AI—lalu dapatkan target diet digital Anda.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/calculator" className="group flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full bg-emerald-600 text-white font-black text-lg hover:bg-emerald-500 transition-all shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_50px_rgba(16,185,129,0.4)] hover:-translate-y-1">
              Kalkulasi Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/dashboard" className="group flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full bg-white text-emerald-800 font-bold text-lg hover:bg-emerald-50 transition-all shadow-sm border border-emerald-200/60 hover:-translate-y-1 backdrop-blur-sm">
              <LayoutDashboard className="w-5 h-5 text-emerald-500" />
              Lihat Dashboard
            </Link>
          </motion.div>
        
        </div>

        {/* TRUSTED BY MARQUEE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="py-10 border-y border-emerald-900/5 bg-white/40 backdrop-blur-sm">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-emerald-800/40 mb-6">Dipercaya oleh ribuan Pejuang Lingkungan</p>
          <Marquee gradient={true} gradientColor="255,255,255" gradientWidth={100} speed={40}>
            {LOGOS.map((logo, i) => (
              <div key={i} className="mx-8 sm:mx-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <span className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tighter">{logo}</span>
              </div>
            ))}
          </Marquee>
        </motion.div>

        {/* BENTO GRID FEATURES - ACETERNITY VIBE */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-emerald-950 mb-4">Fitur Sepelas Kaca.</h2>
            <p className="text-emerald-800/60 font-medium text-lg max-w-2xl mx-auto">Kami tidak hanya membangun kalkulator statis. Ini adalah platform interaktif yang memotret diet digital Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            
            {/* Feature 1 */}
            <div className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-10 overflow-hidden relative group hover:shadow-xl transition-all duration-500">
              <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-200/60 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-6 relative z-10">
                <BarChart3 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-emerald-950 mb-3 tracking-tight relative z-10">Dashboard Personal</h3>
              <p className="text-emerald-800/70 font-medium text-lg max-w-md relative z-10 leading-relaxed">
                Riwayat Jejak Karbon Anda tersimpan aman di peramban lokal. Pantau tren area grafik, setel target bulanan (budget karbon), dan bandingkan diri Anda dengan rata-rata nasional.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-[2.5rem] bg-emerald-900 border border-emerald-800 p-10 text-white overflow-hidden relative group hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-emerald-800/50 shadow-inner flex items-center justify-center mb-6">
                <TreePine className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-black text-emerald-50 mb-3 tracking-tight">Pohon Penyeimbang</h3>
              <p className="text-emerald-100/70 font-medium leading-relaxed">
                Kalkulator gamifikasi tingkat lanjut yang mengkonversi emisi kg karbon Anda menjadi jumlah fisik pohon dewasa yang harus Anda tanam.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-[2.5rem] bg-white border border-emerald-100 p-10 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 relative">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-2xl font-black text-emerald-950 mb-3 tracking-tight">Deteksi Link URL</h3>
              <p className="text-emerald-800/70 font-medium leading-relaxed">Masukan link video YouTube dan sistem mereplika meta-data thumbnail untuk kalkulasi bobot visual data internet Anda.</p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-r from-teal-500 to-emerald-600 p-10 text-white shadow-lg overflow-hidden relative group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <div className="absolute right-0 bottom-0 opacity-10 scale-[2.5] translate-x-1/4 translate-y-1/4">
                <Cloud className="w-64 h-64" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md shadow-inner border border-white/30 flex items-center justify-center mb-6 relative z-10">
                <Zap className="w-8 h-8 text-white group-hover:animate-bounce" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight relative z-10">Unduh Bukti PDF Asli</h3>
              <p className="text-emerald-50/90 font-medium text-lg max-w-md relative z-10 leading-relaxed">
                Kini Anda tidak hanya melihat hasil angka, tetapi Anda bisa mengunduh laporan PDF jejak karbon harian resmi sebagai dokumen fisik langsung dari dalam sistem.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );
}
