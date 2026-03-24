import { useState } from 'react';
import { Youtube, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InputField = ({ field, value, onChange }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const simulateAnalysis = (url) => {
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      let vidId = '';
      if(url.includes('v=')) vidId = url.split('v=')[1].substring(0, 11);
      else if(url.includes('youtu.be/')) vidId = url.split('youtu.be/')[1].substring(0, 11);
      
      setVideoData({
        title: "Video Terdeteksi dari URL",
        thumbnail: `https://i.ytimg.com/vi/${vidId || 'dQw4w9WgXcQ'}/hqdefault.jpg`,
        creator: "Channel YouTube"
      });
      setIsAnalyzing(false);
      onChange(url);
    }, 1500);
  };

  if (field.type === 'url') {
    return (
      <div className="space-y-3">
        <label className="text-sm font-bold text-emerald-900/80 uppercase tracking-widest">{field.label}</label>
        <div className="relative">
          <input
            type="text"
            placeholder={field.placeholder}
            onBlur={(e) => simulateAnalysis(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 border-2 border-emerald-900/10 rounded-xl text-emerald-950 placeholder-emerald-800/40
              focus:outline-none focus:border-emerald-500/60 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10
              transition-all duration-300 text-sm font-medium backdrop-blur-sm"
          />
          <Youtube className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-800/40" />
        </div>
        
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 overflow-hidden">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-emerald-800/60 font-medium">Menganalisis URL ke server...</span>
            </motion.div>
          )}

          {videoData && !isAnalyzing && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 p-3 bg-white/80 rounded-xl border border-emerald-200 shadow-sm items-center backdrop-blur-sm">
              <img src={videoData.thumbnail} alt="Thumbnail" className="w-24 h-14 object-cover rounded-lg border border-emerald-900/10" />
              <div>
                <p className="text-sm font-bold text-emerald-950 line-clamp-1">{videoData.title}</p>
                <p className="text-xs text-emerald-800/60">{videoData.creator}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto mr-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div className="space-y-3">
        <label className="text-sm font-bold text-emerald-900/80 uppercase tracking-widest">{field.label}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field.options.map((opt) => {
            const isActive = value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`relative p-3 rounded-xl border-2 text-left transition-all overflow-hidden group
                  ${isActive 
                    ? 'border-emerald-500 bg-white shadow-md' 
                    : 'border-emerald-900/10 bg-white/60 hover:bg-white hover:border-emerald-300'}`}
              >
                {isActive && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
                <p className={`text-sm font-bold ${isActive ? 'text-emerald-800' : 'text-emerald-900/80'}`}>{opt.label}</p>
                <p className="text-[10px] text-emerald-800/50 w-full mt-1 font-medium">{opt.desc}</p>
                {isActive && (
                  <motion.div layoutId="quality-check" className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 relative group">
      <label className="text-sm font-bold text-emerald-900/80 uppercase tracking-widest">{field.label}</label>
      <div className="relative flex items-center">
        <input
          type="number"
          min="0"
          placeholder="0"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/60 border-2 border-emerald-900/10 rounded-xl text-emerald-950 placeholder-emerald-800/30
            focus:outline-none focus:border-emerald-400/60 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/5
            transition-all duration-300 text-sm font-medium backdrop-blur-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {field.unit && (
          <span className="absolute right-4 text-xs font-bold text-emerald-800/40 select-none bg-white/50 px-2 py-1 rounded-md">
            {field.unit}
          </span>
        )}
      </div>
    </div>
  );
};
