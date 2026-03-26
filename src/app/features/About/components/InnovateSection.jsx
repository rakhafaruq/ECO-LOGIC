import { Lightbulb, MousePointerClick, FileText, Settings2 } from 'lucide-react';
import { motion } from 'motion/react';

export const InnovateSection = () => {
  const criteria = [
    {
      icon: <Lightbulb className="w-6 h-6 text-emerald-600" />,
      title: "Innovation",
      desc: "Fokus pada jejak karbon DIGITAL - topik yang belum banyak diangkat dalam kompetisi sustainability"
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-emerald-600" />,
      title: "Usability",
      desc: "Interface intuitif dengan calculator interaktif, real-time visualization, dan tips actionable"
    },
    {
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      title: "Informativeness",
      desc: "Scientific citations dari IEA, The Shift Project, dan Carbon Trust - data yang dapat dipertanggungjawabkan"
    },
    {
      icon: <Settings2 className="w-6 h-6 text-emerald-600" />,
      title: "Functionality",
      desc: "LocalStorage persistence, PWA ready architecture, dan Web Carbon Badge untuk self assessment"
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
          Kesesuaian dengan INNOVATE 2026
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {criteria.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-[2rem] p-8 shadow-sm flex flex-col sm:flex-row items-start gap-6 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3">{item.title}</h3>
              <p className="text-emerald-800/70 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
