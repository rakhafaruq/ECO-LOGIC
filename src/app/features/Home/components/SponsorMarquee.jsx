import { motion } from 'motion/react';
import Marquee from 'react-fast-marquee';

export const SponsorMarquee = () => {
  const LOGOS = [
    "Tech In Asia", "Greenpeace ID", "Kemenkominfo", "Google Startups", "AWS Green", "WWF Indonesia", "TechCrunch"
  ];

  return (
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
  );
};
