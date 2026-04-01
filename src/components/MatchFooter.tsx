import React from 'react';
import { Trophy, BrainCircuit, Globe, ShieldCheck, Zap } from 'lucide-react';

export const MatchFooter: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 mt-20">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-black text-slate-900">FIFA Predictor <span className="text-indigo-600">Pro</span></h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            The world's most advanced football prediction engine, powered by Gemini AI. 
            Analyze global leagues, tactical battles, and win probabilities with precision.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure Analysis
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Globe className="w-4 h-4 text-indigo-500" />
              Global Coverage
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Platform</h3>
          <ul className="space-y-4 text-sm font-bold text-slate-500">
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Match Discovery</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Leagues Database</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Tactical Engine</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">API Documentation</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Company</h3>
          <ul className="space-y-4 text-sm font-bold text-slate-500">
            <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        <p>© 2026 FIFA Match Predictor Pro AI. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-indigo-600" />
          Powered by Google Gemini AI
        </div>
      </div>
    </footer>
  );
};
