import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';

interface MatchDateFilterProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const MatchDateFilter: React.FC<MatchDateFilterProps> = ({ selectedDate, setSelectedDate }) => {
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 3));

  return (
    <div className="flex items-center justify-center gap-4 mb-12">
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
              "flex flex-col items-center justify-center min-w-[80px] p-4 rounded-3xl border transition-all shrink-0",
              isSameDay(date, selectedDate)
                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200"
                : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
            )}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest mb-1">
              {format(date, 'EEE')}
            </span>
            <span className="text-xl font-black">
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
  );
};
