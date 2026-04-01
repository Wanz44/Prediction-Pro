import React from 'react';
import { Match } from '../types';
import { MatchCard } from './MatchCard';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3 } from 'lucide-react';

interface MatchGridProps {
  matches: Match[];
  onSelect: (match: Match) => void;
}

export const MatchGrid: React.FC<MatchGridProps> = ({ matches, onSelect }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No Matches Found</h3>
        <p className="text-slate-400 text-sm">Try adjusting your search or filters to find more matches.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <MatchCard match={match} onClick={() => onSelect(match)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
