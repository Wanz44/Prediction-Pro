import React from 'react';
import { Filter, Calendar, Zap, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface MatchFilterProps {
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  leagues: string[];
}

export const MatchFilter: React.FC<MatchFilterProps> = ({ selectedLeague, setSelectedLeague, leagues }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
      <button
        onClick={() => setSelectedLeague('All')}
        className={cn(
          "px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all shrink-0",
          selectedLeague === 'All' 
            ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" 
            : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
        )}
      >
        All Leagues
      </button>
      {leagues.map((league) => (
        <button
          key={league}
          onClick={() => setSelectedLeague(league)}
          className={cn(
            "px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all shrink-0",
            selectedLeague === league 
              ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" 
              : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
          )}
        >
          {league}
        </button>
      ))}
    </div>
  );
};
