import { Info } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-transparent text-emerald-950 pt-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">Tentang ECO-LOGIC</h1>
          <p className="text-emerald-900/70 font-bold text-lg tracking-wide">Memahami jejak karbon di era digital.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white/85 border border-emerald-900/10 shadow-2xl backdrop-blur-xl">
          <div className="prose prose-emerald max-w-none">
            <h2 className="text-2xl font-black mb-4 text-emerald-950">Apa itu Jejak Karbon Digital?</h2>
            <p className="text-emerald-900/80 mb-6 leading-relaxed font-medium">
              Meskipun internet seolah-olah berwujud virtual ("cloud"), infrastruktur yang menjalankannya sangatlah nyata. Pusat data (Data Center) raksasa, jaringan kabel serat optik bawah laut, hingga menara seluler BTS, semuanya membutuhkan jumlah listrik yang masif untuk beroperasi 24/7 dan didinginkan. Mayoritas listrik ini sayangnya masih dihasilkan oleh pembangkit listrik berbahan bakar fosil.
            </p>
            
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 mb-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-800 flex items-center gap-2">
                <Info className="w-5 h-5" /> Fakta Mengejutkan
              </h3>
              <ul className="space-y-3 text-emerald-900/80 list-disc pl-5 font-medium">
                <li>Industri TI dan internet secara global memproduksi emisi karbon yang setara dengan seluruh industri penerbangan komersial dunia (sekitar 2-3% dari total emisi global).</li>
                <li>Menonton video YouTube beresolusi 4K selama satu jam memakan listrik 4x hingga 5x lebih banyak daripada video beresolusi 1080p.</li>
                <li>Satu email yang dikirim dengan lampiran foto besar dapat menghasilkan hingga 50 gram emisi CO2.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-black mb-4 text-emerald-950 mt-8">Tujuan Aplikasi</h2>
            <p className="text-emerald-900/80 leading-relaxed font-medium">
              ECO-LOGIC dibuat untuk meningkatkan kesadaran ("awareness") pengguna bahwa setiap klik, setiap jam streaming, dan setiap file yang disimpan selamanya di Google Drive memiliki beban lingkungan. Dengan kesadaran tersebut, diharapkan pengguna bisa melakukan "Digital Diet" — bukan berarti berhenti berinternet sama sekali, melainkan menggunakannya dengan lebih efisien dan terukur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
