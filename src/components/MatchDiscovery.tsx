import React, { useState } from 'react';
import { Search, RefreshCw, Zap, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MatchDiscoveryProps {
  onDiscover: () => void;
  isDiscovering: boolean;
}

export const MatchDiscovery: React.FC<MatchDiscoveryProps> = ({ onDiscover, isDiscovering }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 mb-12">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Globe className="w-32 h-32 animate-pulse" />
      </div>
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Match Discovery Algorithm</h2>
        </div>
        
        <p className="text-slate-400 max-w-xl leading-relaxed">
          Our AI scans global leagues in real-time to identify upcoming high-stakes matches. 
          It calculates deep statistics and saves them to the database for analysis.
        </p>

        <button
          onClick={onDiscover}
          disabled={isDiscovering}
          className="group relative px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg shadow-xl shadow-white/10 hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            {isDiscovering ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
            {isDiscovering ? 'Scanning Global Leagues...' : 'Discover New Matches'}
          </div>
        </button>

        <div className="flex items-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Auto-Cleanup Active
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Globe className="w-4 h-4 text-indigo-500" />
            8+ Leagues Scanned
          </div>
        </div>
      </div>
    </div>
  );
};
