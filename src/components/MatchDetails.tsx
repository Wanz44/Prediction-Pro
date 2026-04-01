import React from 'react';
import { Match, PredictionResult } from '../types';
import { 
  Trophy, 
  Users, 
  Activity, 
  Shield, 
  Zap, 
  TrendingUp, 
  Info, 
  RefreshCw,
  ChevronRight,
  AlertCircle,
  BarChart3,
  BrainCircuit,
  Clock,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import { cn } from '../lib/utils';
import { MatchChart } from './MatchChart';

interface MatchDetailsProps {
  match: Match;
  isPredicting: boolean;
  onPredict: () => void;
  result: PredictionResult | null;
  error: string | null;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ 
  match, 
  isPredicting, 
  onPredict, 
  result, 
  error 
}) => {
  return (
    <div className="space-y-8">
      {/* Match Header */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="text-[10px] font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-widest border border-indigo-100">
            {match.league}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* Team A */}
          <div className="flex flex-col items-center gap-4 flex-1 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center border border-indigo-100 shadow-inner">
              <Shield className="w-10 h-10 text-indigo-600 fill-indigo-50" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">{match.teamA.name}</h2>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Trophy className="w-3 h-3" />
                Rating: {match.teamA.overall}
              </div>
            </div>
          </div>

          {/* VS & Info */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shadow-slate-200">
              VS
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-400">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                <Calendar className="w-3 h-3" />
                {match.matchDate ? format(parseISO(match.matchDate), 'MMM dd, yyyy') : 'N/A'}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {match.matchDate ? format(parseISO(match.matchDate), 'HH:mm') : 'N/A'}
              </div>
            </div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center gap-4 flex-1 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center border border-rose-100 shadow-inner">
              <Shield className="w-10 h-10 text-rose-600 fill-rose-50" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">{match.teamB.name}</h2>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Trophy className="w-3 h-3" />
                Rating: {match.teamB.overall}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Chart */}
      <MatchChart teamA={match.teamA} teamB={match.teamB} />

      {/* Statistics Section (Betpawa style) */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Match Statistics
          </h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-widest">H2H</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-widest">Form</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Recent Form */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Form (Last 5)</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">{match.teamA.name}</span>
                <div className="flex gap-1.5">
                  {['W', 'W', 'D', 'L', 'W'].map((r, i) => (
                    <div key={i} className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white",
                      r === 'W' ? 'bg-emerald-500' : r === 'D' ? 'bg-amber-500' : 'bg-rose-500'
                    )}>{r}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">{match.teamB.name}</span>
                <div className="flex gap-1.5">
                  {['L', 'W', 'L', 'D', 'D'].map((r, i) => (
                    <div key={i} className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white",
                      r === 'W' ? 'bg-emerald-500' : r === 'D' ? 'bg-amber-500' : 'bg-rose-500'
                    )}>{r}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Comparison */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Performance Metrics</h4>
            <div className="space-y-4">
              <StatBar label="Attack Power" valA={match.teamA.attack} valB={match.teamB.attack} />
              <StatBar label="Midfield Control" valA={match.teamA.midfield} valB={match.teamB.midfield} />
              <StatBar label="Defensive Solidity" valA={match.teamA.defense} valB={match.teamB.defense} />
            </div>
          </div>
        </div>

        {/* Head to Head (Mocked) */}
        <div className="pt-8 border-t border-slate-50 space-y-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Head to Head History</h4>
          <div className="grid gap-3">
            {[
              { date: '2025-11-12', score: '2 - 1', winner: match.teamA.name },
              { date: '2025-04-22', score: '0 - 0', winner: 'Draw' },
              { date: '2024-12-05', score: '1 - 3', winner: match.teamB.name },
            ].map((h, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400">{h.date}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">{match.teamA.name}</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-black text-slate-900">{h.score}</span>
                  <span className="text-xs font-bold text-slate-700">{match.teamB.name}</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{h.winner === 'Draw' ? 'Draw' : 'Winner'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Action */}
      <div className="flex justify-center">
        <button
          onClick={onPredict}
          disabled={isPredicting}
          className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            {isPredicting ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            )}
            {isPredicting ? 'Analyzing Tactics...' : 'Generate AI Prediction'}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-rose-600 opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && !isPredicting && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Win Probabilities
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <ProbabilityCard label={match.teamA.name} value={result.winA} color="indigo" />
                <ProbabilityCard label="Draw" value={result.draw} color="slate" />
                <ProbabilityCard label={match.teamB.name} value={result.winB} color="rose" />
              </div>

              <div className="mt-12 pt-12 border-t border-slate-50">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  AI Tactical Breakdown
                </h3>
                <div className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 prose-strong:text-indigo-600 prose-li:text-slate-600">
                  <Markdown>{result.analysis}</Markdown>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-start gap-4 text-rose-700">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

function StatBar({ label, valA, valB }: { label: string, valA: number, valB: number }) {
  const total = valA + valB;
  const percA = (valA / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <span>{valA}</span>
        <span>{label}</span>
        <span>{valB}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
        <div className="h-full bg-indigo-500" style={{ width: `${percA}%` }} />
        <div className="h-full bg-rose-500" style={{ width: `${100 - percA}%` }} />
      </div>
    </div>
  );
}

function ProbabilityCard({ label, value, color }: { label: string, value: number, color: 'indigo' | 'rose' | 'slate' }) {
  const colors = {
    indigo: 'bg-indigo-600 text-indigo-600',
    rose: 'bg-rose-600 text-rose-600',
    slate: 'bg-slate-500 text-slate-500'
  };

  const colorClasses = (colors[color as keyof typeof colors] || colors.slate) as string;
  const parts = colorClasses.split(' ');
  const bgClass = parts[0] || 'bg-slate-500';
  const textClass = parts[1] || 'text-slate-500';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate max-w-[120px]">{label}</span>
        <span className={cn("text-3xl font-black", textClass)}>{value}%</span>
      </div>
      <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={cn("h-full rounded-full", bgClass)}
        />
      </div>
    </div>
  );
}
