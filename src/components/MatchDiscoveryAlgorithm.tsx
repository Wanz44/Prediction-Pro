import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Zap, Globe, ShieldCheck, Activity, BarChart3, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface MatchDiscoveryAlgorithmProps {
  onDiscover: () => void;
  isDiscovering: boolean;
  onReset: () => void;
}

export const MatchDiscoveryAlgorithm: React.FC<MatchDiscoveryAlgorithmProps> = ({ onDiscover, isDiscovering, onReset }) => {
  const [step, setStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const steps = [
    { label: 'Scanning Global Leagues', icon: Globe },
    { label: 'Analyzing Team Statistics', icon: BarChart3 },
    { label: 'Calculating Win Probabilities', icon: Activity },
    { label: 'Saving to Database', icon: ShieldCheck },
  ];

  useEffect(() => {
    if (isDiscovering) {
      const interval = setInterval(() => {
        setStep((s) => (s + 1) % steps.length);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setStep(0);
    }
  }, [isDiscovering]);

  const handleResetClick = () => {
    if (showConfirm) {
      onReset();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 mb-12 border border-slate-800">
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <Globe className="w-48 h-48 animate-pulse" />
      </div>
      
      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-500/20">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-black tracking-tight">Match Discovery Algorithm</h2>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Global Scanning</span>
          </div>
        </div>
        
        <p className="text-slate-400 max-w-2xl text-lg leading-relaxed font-medium">
          Our proprietary AI engine scans 8+ global leagues in real-time to identify upcoming high-stakes matches. 
          It calculates deep statistics, tactical profiles, and saves them to our secure database for analysis.
        </p>

        <div className="flex flex-wrap items-center gap-8">
          <button
            onClick={onDiscover}
            disabled={isDiscovering}
            className="group relative px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-xl shadow-2xl shadow-white/10 hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="flex items-center gap-3 relative z-10">
              {isDiscovering ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Search className="w-6 h-6" />
              )}
              {isDiscovering ? 'Analyzing Global Data...' : 'Discover New Matches'}
            </div>
          </button>

          <AnimatePresence mode="wait">
            {isDiscovering && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 bg-slate-800/50 px-6 py-4 rounded-2xl border border-slate-700"
              >
                {React.createElement(steps[step].icon, { className: "w-5 h-5 text-indigo-400" })}
                <span className="text-sm font-bold text-slate-300">{steps[step].label}</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={cn("w-1.5 h-1.5 rounded-full bg-indigo-500", i === step % 3 ? "animate-bounce" : "opacity-30")} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isDiscovering && (
            <button
              onClick={handleResetClick}
              className={cn(
                "px-6 py-3 font-bold text-sm transition-all flex items-center gap-2 rounded-xl border",
                showConfirm 
                  ? "bg-rose-500/10 border-rose-500/50 text-rose-400 animate-pulse" 
                  : "text-slate-500 hover:text-rose-400 border-transparent hover:bg-slate-800"
              )}
            >
              <RefreshCw className={cn("w-4 h-4", showConfirm && "animate-spin")} />
              {showConfirm ? "Click again to confirm reset" : "Reset Database"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-10 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Auto-Cleanup Active
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Globe className="w-5 h-5 text-indigo-500" />
            8+ Leagues Scanned
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <BrainCircuit className="w-5 h-5 text-indigo-500" />
            Gemini AI Integration
          </div>
        </div>
      </div>
    </div>
  );
};
