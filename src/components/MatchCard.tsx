import React from 'react';
import { Match } from '../types';
import { format, parseISO } from 'date-fns';
import { Trophy, Users, Zap, ChevronRight, BarChart3, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="w-full text-left bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Trophy className="w-24 h-24" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-widest border border-indigo-100">
            {match.league}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {match.matchDate ? format(parseISO(match.matchDate), 'HH:mm') : '--:--'}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
              <Shield className="w-6 h-6 text-indigo-600 fill-indigo-50" />
            </div>
            <span className="text-sm font-black text-slate-900 text-center truncate w-full">{match.teamA.name}</span>
          </div>
          
          <div className="text-xs font-black text-slate-200">VS</div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100">
              <Shield className="w-6 h-6 text-rose-600 fill-rose-50" />
            </div>
            <span className="text-sm font-black text-slate-900 text-center truncate w-full">{match.teamB.name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <BarChart3 className="w-3 h-3" />
            Analyze Tactics
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.button>
  );
};
