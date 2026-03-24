import { Globe, Zap, TreePine, BarChart3, Cloud } from 'lucide-react';

export const FeatureGrid = () => {
  return (
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
  );
};
