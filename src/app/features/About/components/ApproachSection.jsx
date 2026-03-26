import { BookOpen, Database, Target } from 'lucide-react';
import { motion } from 'motion/react';

export const ApproachSection = () => {
  const steps = [
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
      title: "Konsep & Riset",
      desc: "Merancang framework dan validasi data ilmiah"
    },
    {
      icon: <Database className="w-8 h-8 text-emerald-600" />,
      title: "Development",
      desc: "Implementasi teknis dan optimasi performa"
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: "UI/UX Design",
      desc: "User experience dan visual interface"
    }
  ];

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950"
        >
          Pendekatan Kami
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-[2.5rem] p-10 text-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-8 border border-emerald-100">
              {step.icon}
            </div>
            
            <h3 className="text-xl font-bold text-emerald-950 mb-4">{step.title}</h3>
            <p className="text-emerald-800/70 font-medium leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
