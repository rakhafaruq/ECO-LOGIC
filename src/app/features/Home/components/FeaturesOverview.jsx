import { Calculator, BarChart2, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturesOverview = () => {
  const cards = [
    {
      icon: <Calculator className="w-6 h-6 text-emerald-600" />,
      title: "Carbon Calculator",
      desc: "Hitung jejak karbon dari aktivitas digitalmu: streaming, email, social media, dan video call."
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emerald-600" />,
      title: "Personal Dashboard",
      desc: "Lacak progress dan riwayat kalkulasimu untuk melihat perkembangan dari waktu ke waktu."
    },
    {
      icon: <Info className="w-6 h-6 text-emerald-600" />,
      title: "Metodologi & Data",
      desc: "Pelajari bagaimana kami menghitung emisi berdasarkan riset ilmiah dari IEA dan The Shift Project."
    }
  ];

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 lg:pt-28 lg:pb-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950 mb-6"
        >
          Apa yang Bisa Kamu Lakukan?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-emerald-800/70 font-medium text-lg max-w-2xl mx-auto"
        >
          Eco-Logic membantu kamu memahami dan mengurangi jejak karbon digital dengan tools yang mudah digunakan
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="bg-white rounded-[2rem] p-8 shadow-[0_4px_30px_#00000008] hover:shadow-[0_8px_40px_rgba(16,185,129,0.1)] transition-all duration-300 border border-emerald-50"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-3">{card.title}</h3>
            <p className="text-emerald-800/70 font-medium leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
