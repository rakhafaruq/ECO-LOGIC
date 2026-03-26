import { Mail, MapPin, Phone } from 'lucide-react';
import { FAQSection } from './components/FAQSection';

export default function Contact() {
  return (
    <div className="min-h-screen bg-transparent text-emerald-950 pt-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">Hubungi Kami</h1>
          <p className="text-emerald-900/70 text-lg font-bold">Ada pertanyaan atau ide kerja sama? Kirimkan pesan!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/80 border border-emerald-900/10 shadow-lg backdrop-blur-xl flex items-center gap-4 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl border border-emerald-200 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-900/50 text-sm font-bold uppercase tracking-wider">Email</p>
                <p className="font-bold text-emerald-950 text-lg">hello@eco-logic.id</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 border border-emerald-900/10 shadow-lg backdrop-blur-xl flex items-center gap-4 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-teal-100 rounded-xl border border-teal-200 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-emerald-900/50 text-sm font-bold uppercase tracking-wider">WhatsApp</p>
                <p className="font-bold text-emerald-950 text-lg">+62 812 3456 7890</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 border border-emerald-900/10 shadow-lg backdrop-blur-xl flex items-center gap-4 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-xl border border-green-200 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-emerald-900/50 text-sm font-bold uppercase tracking-wider">Lokasi</p>
                <p className="font-bold text-emerald-950 text-lg">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 rounded-3xl bg-white/85 border border-emerald-900/10 shadow-2xl backdrop-blur-xl">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-emerald-900/80 mb-1.5">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-emerald-950 placeholder-emerald-900/30 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm" placeholder="Budi Santoso" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900/80 mb-1.5">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-emerald-950 placeholder-emerald-900/30 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm" placeholder="budi@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900/80 mb-1.5">Pesan</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-emerald-950 placeholder-emerald-900/30 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm" placeholder="Tuliskan pesan Anda di sini..."></textarea>
              </div>
              <button className="w-full py-3 px-6 rounded-xl bg-emerald-600 border border-emerald-500 shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-white font-bold text-lg hover:bg-emerald-500 hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>

      <FAQSection />
    </div>
  );
}
