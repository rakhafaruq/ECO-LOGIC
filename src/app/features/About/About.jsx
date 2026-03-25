import { motion } from 'motion/react';
import { MissionSection } from './components/MissionSection';
import { MethodologySection } from './components/MethodologySection';
import { InnovateSection } from './components/InnovateSection';
import { WebsiteCarbonSection } from './components/WebsiteCarbonSection';
import { ApproachSection } from './components/ApproachSection';

export default function About() {
  return (
    <div className="min-h-screen bg-transparent text-emerald-950 font-sans overflow-x-hidden relative">
      {/* Background Gradients similar to Home */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-200/50 mix-blend-multiply blur-[120px] animate-pulse [animation-duration:10s]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-200/40 mix-blend-multiply blur-[100px] animate-pulse [animation-duration:8s] [animation-delay:2s]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10">
        {/* Hero Area */}
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-emerald-950 mb-6 drop-shadow-sm"
          >
            Tentang Eco-Logic
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-emerald-800/70 font-medium text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Platform pelacakan jejak karbon digital berbasis riset ilmiah untuk membantu individu memahami dan mengurangi dampak lingkungan dari aktivitas online mereka
          </motion.p>
        </div>

        {/* Sections */}
        <MissionSection />
        <MethodologySection />
        <InnovateSection />
        <WebsiteCarbonSection />
        <ApproachSection />
      </div>
    </div>
  );
}
