import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      q: "Bagaimana cara Eco-Logic menghitung jejak karbon digital?",
      a: "Kami menggunakan faktor emisi yang berbasis riset ilmiah dari organisasi terpercaya seperti IEA, The Shift Project, dan Carbon Trust. Setiap aktivitas digital (streaming, email, social media, video call) memiliki faktor emisi spesifik yang memperhitungkan energi data center, transmisi jaringan, dan perangkat pengguna."
    },
    {
      q: "Apakah data kalkulasi saya aman?",
      a: "Ya, sangat aman! Semua data disimpan secara lokal di browser Anda menggunakan localStorage. Kami tidak mengirim atau menyimpan data pribadi Anda ke server manapun. Anda memiliki kontrol penuh dan bisa menghapus data kapan saja."
    },
    {
      q: "Mengapa fokus pada jejak karbon digital, bukan transportasi atau energi rumah?",
      a: "Karena jejak karbon digital adalah hidden carbon footprint yang sering diabaikan. Banyak orang sudah aware tentang emisi dari mobil atau AC, tapi tidak sadar bahwa streaming 4K atau video call juga menghasilkan emisi. Kami ingin membuat topik ini lebih visible dan actionable."
    },
    {
      q: "Berapa akurat perhitungan ini?",
      a: "Perhitungan kami berbasis rata-rata industri dan riset peer-reviewed. Angka aktual bisa bervariasi tergantung sumber energi data center (renewable vs fossil), efisiensi jaringan, dan perangkat yang digunakan. Namun, ini memberikan estimasi yang valid untuk awareness dan perbandingan trend personal."
    },
    {
      q: "Apakah Eco-Logic gratis?",
      a: "Ya, 100% gratis! Eco-Logic adalah project awareness untuk kompetisi INNOVATE 2026 dan kami berkomitmen untuk tetap menyediakan akses gratis untuk semua pengguna."
    },
    {
      q: "Bagaimana cara mengurangi jejak karbon digital saya?",
      a: "Beberapa cara mudah: turunkan resolusi streaming video jika tidak perlu 4K/HD, matikan transmisi video saat virtual meeting jika hanya butuh suara, hapus email beserta lampiran yang menumpuk di kotak masuk, dan optimalkan penggunaan memori cloud."
    },
  ];

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <HelpCircle className="w-12 h-12 text-emerald-600 shrink-0" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950 text-center">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-[2.5rem] p-6 sm:p-10 shadow-sm">
        <div className="divide-y divide-emerald-900/10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-6 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="text-lg font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-600/60 shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-emerald-800/70 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
