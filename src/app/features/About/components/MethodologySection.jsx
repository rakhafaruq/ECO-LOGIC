import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

export const MethodologySection = () => {
  const dataSources = [
    {
      title: "Streaming Video",
      value: "0.036 - 0.144 kg CO₂/jam",
      desc: "Berbasis kualitas SD, HD, dan 4K dengan perhitungan energi data center dan transmisi jaringan",
      source: "The Shift Project (2022)"
    },
    {
      title: "Email",
      value: "0.0003 - 0.05 kg CO₂/email",
      desc: "Tanpa lampiran vs dengan lampiran. Termasuk energi penyimpanan server dan transmisi",
      source: "Mike Berners-Lee (How Bad Are Bananas?)"
    },
    {
      title: "Social Media",
      value: "0.025 kg CO₂/jam",
      desc: "Rata-rata konsumsi data scrolling feed, autoplay video, dan loading konten",
      source: "Carbon Trust"
    },
    {
      title: "Video Call",
      value: "0.157 kg CO₂/jam",
      desc: "Berdasarkan studi Zoom dengan kamera HD aktif. Audio-only lebih rendah ~96%",
      source: "Purdue University & Yale (2021)"
    }
  ];

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 lg:pt-28 lg:pb-0">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950"
        >
          Metodologi & Sumber Data
        </motion.h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {dataSources.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-emerald-950 mb-3">{item.title}</h3>
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-sm mb-4">
              {item.value}
            </div>
            <p className="text-emerald-800/80 font-medium mb-4">{item.desc}</p>
            <p className="text-emerald-600/60 text-sm font-semibold flex items-center gap-1">
              Sumber: {item.source} <span className="inline-block rotate-45">↗</span>
            </p>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-blue-50/60 border border-blue-100 rounded-[2rem] p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">Catatan Metodologi</h3>
          </div>
          <p className="text-blue-800/80 font-medium leading-relaxed">
            Semua faktor emisi yang kami gunakan berbasis riset peer-reviewed dan data dari organisasi internasional terpercaya. Angka-angka ini memperhitungkan life-cycle analysis termasuk energi data center, transmisi jaringan, dan perangkat end-user. Kami secara berkala memperbarui data untuk mencerminkan efisiensi energi terkini dari industri teknologi.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
