import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface MatchSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MatchSearch: React.FC<MatchSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative flex-1 w-full max-w-2xl mx-auto mb-12">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400">
        <Search className="w-6 h-6" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for matches, teams, or leagues..."
        className="w-full pl-16 pr-16 py-5 bg-white border border-slate-100 rounded-full text-lg font-bold text-slate-900 shadow-xl shadow-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
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
  );
};
