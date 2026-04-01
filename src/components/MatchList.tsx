import React from 'react';
import { Match } from '../types';
import { format, parseISO } from 'date-fns';
import { Calendar, MapPin, ChevronRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface MatchListProps {
  matches: Match[];
  onSelect: (match: Match) => void;
  selectedMatchId?: string;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, onSelect, selectedMatchId }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
        <p className="text-slate-400 text-sm">No matches found for this date.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <button
          key={match.id}
          onClick={() => onSelect(match)}
          className={cn(
            "w-full text-left p-4 rounded-2xl border transition-all group relative overflow-hidden",
            selectedMatchId === match.id 
              ? "bg-indigo-50 border-indigo-200 shadow-sm" 
              : "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm"
          )}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col items-center justify-center min-w-[80px] text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {match.matchDate ? format(parseISO(match.matchDate), 'MMM') : 'N/A'}
                </span>
                <span className="text-xl font-black text-slate-900">
                  {match.matchDate ? format(parseISO(match.matchDate), 'dd') : '--'}
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  {match.matchDate ? format(parseISO(match.matchDate), 'HH:mm') : '--:--'}
                </span>
              </div>
              
              <div className="h-8 w-px bg-slate-100" />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">
                    {match.league}
                  </span>
                  {match.status === 'live' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full uppercase tracking-wider animate-pulse">
                      <Zap className="w-2 h-2 fill-rose-600" />
                      Live
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 font-bold text-slate-900">
                  <span>{match.teamA.name}</span>
                  <span className="text-slate-300 text-xs">vs</span>
                  <span>{match.teamB.name}</span>
                </div>
              </div>
            </div>
            
            <ChevronRight className={cn(
              "w-5 h-5 transition-transform group-hover:translate-x-1",
              selectedMatchId === match.id ? "text-indigo-600" : "text-slate-300"
            )} />
          </div>
          
          {selectedMatchId === match.id && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
          )}
        </button>
      ))}
    </div>
  );
};
