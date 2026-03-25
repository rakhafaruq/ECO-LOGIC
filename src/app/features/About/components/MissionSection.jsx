import { Target } from 'lucide-react';
import { motion } from 'motion/react';

export const MissionSection = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 lg:-mt-10 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-emerald-600 rounded-[2.5rem] lg:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative"
      >
        {/* Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-400/20 mix-blend-screen blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start relative z-10">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          
          <div className="text-white">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight">Misi Kami</h2>
            <div className="space-y-6 text-emerald-50/90 font-medium text-lg leading-relaxed">
              <p>
                Di era digital, aktivitas online kita - mulai dari streaming Netflix hingga mengirim email - menghasilkan emisi karbon yang nyata. Data center yang menyimpan video YouTube, server yang memproses video call Zoom, dan jaringan internet global semuanya membutuhkan energi listrik yang sebagian besar masih berasal dari bahan bakar fosil.
              </p>
              <p>
                Eco-Logic hadir untuk membuat jejak karbon digital menjadi <span className="font-bold text-white">visible dan actionable</span>. Dengan data ilmiah yang valid dan tools yang mudah digunakan, kami percaya setiap orang bisa membuat pilihan digital yang lebih ramah lingkungan.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
