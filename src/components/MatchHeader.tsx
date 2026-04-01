import React from 'react';
import { Trophy, BrainCircuit } from 'lucide-react';

export const MatchHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight text-slate-900">FIFA Predictor <span className="text-indigo-600">Pro</span></h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advanced Tactical Analysis</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">Discover</a>
            <a href="#" className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">Leagues</a>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-indigo-100">Gemini 3.1</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
