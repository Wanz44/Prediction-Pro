import React from 'react';
import { Match, PredictionResult } from '../types';
import { MatchDetails } from './MatchDetails';
import { MatchStatsGrid } from './MatchStatsGrid';
import { MatchStatsChart } from './MatchStatsChart';
import { ChevronLeft } from 'lucide-react';

interface MatchAnalysisViewProps {
  match: Match;
  onBack: () => void;
  isPredicting: boolean;
  onPredict: () => void;
  result: PredictionResult | null;
  error: string | null;
}

export const MatchAnalysisView: React.FC<MatchAnalysisViewProps> = ({ 
  match, 
  onBack, 
  isPredicting, 
  onPredict, 
  result, 
  error 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-12 group"
      >
        <div className="p-2 bg-white border border-slate-100 rounded-xl group-hover:border-indigo-200 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </div>
        Back to Match Discovery
      </button>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <MatchDetails 
            match={match} 
            isPredicting={isPredicting} 
            onPredict={onPredict} 
            result={result} 
            error={error} 
          />
        </div>

        <div className="space-y-12">
          <div className="sticky top-24 space-y-12">
            <MatchStatsGrid teamA={match.teamA} teamB={match.teamB} />
            <MatchStatsChart teamA={match.teamA} teamB={match.teamB} />
          </div>
        </div>
      </div>
    </div>
  );
};
