import { HeroSection } from './components/HeroSection';
import { SponsorMarquee } from './components/SponsorMarquee';
import { FeatureGrid } from './components/FeatureGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-emerald-950 font-sans overflow-x-hidden relative">
      
      {/* AURORA / MESH GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-200/50 mix-blend-multiply blur-[120px] animate-pulse [animation-duration:10s]" />
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-200/50 mix-blend-multiply blur-[100px] animate-pulse [animation-duration:8s] [animation-delay:2s]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[50vw] rounded-full bg-green-100/40 mix-blend-multiply blur-[120px]" />
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <SponsorMarquee />
        <FeatureGrid />
      </div>
    </div>
  );
}
