import React from 'react';
import { Search, Calendar, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';

interface MatchSearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  leagues: string[];
}

export const MatchSearchAndFilter: React.FC<MatchSearchAndFilterProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedDate, 
  setSelectedDate,
  selectedLeague,
  setSelectedLeague,
  leagues
}) => {
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 3));

  return (
    <div className="space-y-8 mb-16">
      {/* Search Bar */}
      <div className="relative flex-1 w-full max-w-3xl mx-auto">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400">
          <Search className="w-6 h-6" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for matches, teams, or leagues..."
          className="w-full pl-16 pr-16 py-6 bg-white border border-slate-100 rounded-full text-xl font-bold text-slate-900 shadow-2xl shadow-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        )}
      </div>

      {/* Date Filter */}
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4">
          {dates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[90px] p-5 rounded-3xl border transition-all shrink-0",
                isSameDay(date, selectedDate)
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200"
                  : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">
                {format(date, 'EEE')}
              </span>
              <span className="text-2xl font-black">
                {format(date, 'dd')}
              </span>
              <span className="text-[10px] font-medium opacity-60">
                {format(date, 'MMM')}
              </span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronRight className="w-6 h-6 text-slate-600" />
        </button>
      </div>

      {/* League Filter */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
        <button
          onClick={() => setSelectedLeague('All')}
          className={cn(
            "px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all shrink-0",
            selectedLeague === 'All' 
              ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" 
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
              "px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all shrink-0",
              selectedLeague === league 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" 
                : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
            )}
          >
            {league}
          </button>
        ))}
      </div>
    </div>
  );
};
