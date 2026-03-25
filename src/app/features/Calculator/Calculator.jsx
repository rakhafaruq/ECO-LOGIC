import { useState, useEffect } from 'react';
import { ActivitySquare, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FACTORS, CATEGORIES } from './data/calculatorData';
import { InputField } from './components/InputField';
import { Results } from './components/Results';

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const [emissions, setEmissions] = useState({ total: 0 });

  const calcEmissions = () => {
    let results = { total: 0 };
    
    // YouTube (menit/hari → jam, lalu kalikan faktor per jam)
    const ytMins = parseFloat(data.youtube_duration || 0);
    const ytQuality = data.youtube_quality || '1080p';
    const ytHrs = ytMins / 60;
    results.youtube = ytHrs * (FACTORS.youtube[ytQuality] || 0.2);
    
    // Streaming & Social (jam/hari × faktor per jam)
    results.streaming = (parseFloat(data.streaming_netflix || 0) * FACTORS.streaming.netflix) + (parseFloat(data.streaming_spotify || 0) * FACTORS.streaming.spotify);
    results.social = (parseFloat(data.social_tiktok || 0) * FACTORS.social.tiktok) + (parseFloat(data.social_instagram || 0) * FACTORS.social.instagram);
    
    // Work (jam/hari × faktor per jam, cloud GB dibagi 30 untuk harian)
    results.work = (parseFloat(data.work_zoom || 0) * FACTORS.work.zoom) + (parseFloat(data.work_emails || 0) * FACTORS.work.email);
    results.work += parseFloat(data.work_cloud || 0) * FACTORS.work.cloud_gb / 30; // GB bulanan → harian
    results.work += parseFloat(data.work_ai || 0) * FACTORS.ai.chatgpt;
    
    results.total = Object.values(results).reduce((a, b) => a + b, 0);
    setEmissions(results);
  };

  useEffect(() => { calcEmissions(); }, [data]);

  const handleInput = (id, value) => {
    setData(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (currentStep < CATEGORIES.length) setCurrentStep(c => c + 1);
  };

  const isResults = currentStep === CATEGORIES.length;

  return (
    <div className="min-h-screen bg-transparent text-emerald-950 overflow-x-hidden font-sans selection:bg-emerald-200/50 pt-10 px-4">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-300/30 rounded-full blur-[120px] mix-blend-multiply opacity-40" />
      </div>

      <div className="max-w-[75rem] mx-auto py-8 lg:py-12 relative z-10 pb-32">
        
        {/* BENTO GRID SPECIFIC LAYOUT FOR CALCULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: Header & Progress Steps */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Header Bento */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/85 rounded-[2.5rem] p-8 pb-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-emerald-900/5 backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
                <ActivitySquare className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black tracking-widest uppercase text-emerald-800">ECO-LOGIC CALCULATOR</span>
              </div>
              <h1 className="text-4xl font-black text-emerald-950 tracking-tighter mb-4 leading-none">
                Hitung <br/><span className="bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">Jejak Digitalmu.</span>
              </h1>
              <p className="text-sm font-semibold text-emerald-800/60 leading-relaxed">
                Platform modern untuk melacak secara akurat emisi karbon dari aktivitas internet harian Anda ke dalam satuan kilogram CO₂.
              </p>
            </motion.div>

            {/* Vertical Progress Steps Bento */}
            <div className="hidden lg:flex flex-col bg-white/70 rounded-[2.5rem] p-6 shadow-sm border border-emerald-900/5 backdrop-blur-md space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800/40 ml-4 mb-2">Modul Simulasi</h3>
              {CATEGORIES.map((cat, idx) => {
                const isActive = currentStep === idx;
                const isCompleted = currentStep > idx;
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setCurrentStep(idx)}
                    layout
                    className={`w-full flex items-center justify-start gap-4 px-5 py-4 rounded-3xl transition-all duration-300 relative overflow-hidden group
                      ${isActive
                        ? 'bg-white shadow-md border border-emerald-100'
                        : isCompleted
                          ? 'bg-emerald-50/50 hover:bg-emerald-50'
                          : 'bg-transparent hover:bg-white/40'
                      }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-emerald-100/50' : 'bg-transparent'}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : isCompleted ? 'text-emerald-500' : 'text-emerald-800/40 group-hover:text-emerald-800/60'}`} />
                    </div>
                    <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-emerald-950' : isCompleted ? 'text-emerald-700' : 'text-emerald-800/50 group-hover:text-emerald-800/70'}`}>
                      {cat.title}
                    </span>
                    {isActive && <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-8 rounded-full bg-emerald-400" />}
                  </motion.button>
                );
              })}
              {/* Results Tab */}
              <motion.button
                onClick={() => setCurrentStep(CATEGORIES.length)}
                className={`w-full mt-4 flex items-center justify-start gap-4 px-5 py-4 rounded-3xl transition-all duration-300
                  ${currentStep === CATEGORIES.length ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]' : 'hover:bg-white/40 text-emerald-800/40 hover:text-emerald-800/60'}`}
              >
                <div className="p-2 rounded-xl bg-white/10"><Zap className="w-5 h-5" /></div>
                <span className="text-sm font-bold tracking-tight">Cetak Hasil</span>
              </motion.button>
            </div>

            {/* Mobile Progress Steps (Horizontal Wrapper) */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 custom-scrollbar">
               {CATEGORIES.map((cat, idx) => {
                 const isActive = currentStep === idx;
                 const Icon = cat.icon;
                 return (
                    <button key={cat.id} onClick={()=>setCurrentStep(idx)} className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs ${isActive ? 'bg-emerald-600 text-white' : 'bg-white/80 text-emerald-800/50'}`}>
                      <Icon className="w-4 h-4"/> {cat.title}
                    </button>
                 );
               })}
               <button onClick={()=>setCurrentStep(CATEGORIES.length)} className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs ${currentStep === CATEGORIES.length ? 'bg-teal-600 text-white' : 'bg-white/80 text-teal-800/50'}`}>
                  <Zap className="w-4 h-4"/> Hasil
               </button>
            </div>

          </div>

          {/* RIGHT MAIN PANEL: Active Form or Results Bento */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!isResults ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-[3rem] bg-white/85 border border-emerald-900/5 shadow-[0_10px_40px_rgb(0,0,0,0.03)] overflow-hidden backdrop-blur-xl relative"
                >
                  {/* Category Header */}
                  <div className={`px-10 py-12 bg-gradient-to-br ${CATEGORIES[currentStep].theme} relative overflow-hidden flex flex-col items-start`}>
                    <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
                    <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg mb-6 relative z-10">
                      {(() => { const Icon = CATEGORIES[currentStep].icon; return <Icon className="w-8 h-8 text-white" />; })()}
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-sm relative z-10 mb-1">{CATEGORIES[currentStep].title}</h2>
                    <p className="text-white/80 text-sm font-semibold relative z-10">{CATEGORIES[currentStep].statLabel}</p>
                  </div>

                  {/* Form Fields */}
                  <div className="p-8 sm:p-10 space-y-8 bg-transparent">
                    {CATEGORIES[currentStep].fields.map((field) => (
                      <InputField
                        key={field.id}
                        field={field}
                        value={data[`${CATEGORIES[currentStep].id}_${field.id}`]}
                        onChange={(val) => handleInput(`${CATEGORIES[currentStep].id}_${field.id}`, val)}
                      />
                    ))}

                    {/* Subtotal & Next Navigation Wrapper */}
                    <div className="mt-10 pt-8 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex bg-white shadow-sm border border-emerald-100 rounded-[1.5rem] px-5 py-3 items-center gap-3">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                        <span className="text-sm text-emerald-800/60 font-medium">Draft Emisi: <strong className="text-emerald-700 font-black">{(emissions.total).toLocaleString('id-ID', { maximumFractionDigits: 1 })} kg CO₂/hari</strong></span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={nextStep}
                        className="w-full sm:w-auto flex justify-center items-center gap-3 px-10 py-4 rounded-3xl bg-emerald-600 text-white font-black hover:bg-emerald-500 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
                      >
                        {currentStep === CATEGORIES.length - 1 ? 'Hitung Grand Total' : 'Sesi Berikutnya'}
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="results">
                  <Results data={data} emissions={emissions} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
