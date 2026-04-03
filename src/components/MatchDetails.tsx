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
  const [analysisType, setAnalysisType] = React.useState<'ai' | 'algo'>('ai');

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

      {/* Statistics Section (Enhanced Bento Style) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            Match Intelligence
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
              <Activity className="w-3 h-3 text-indigo-500" />
              Live Data
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Form Bento Card */}
          <div className="md:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/30 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <TrendingUp className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Momentum Analysis
              </h4>
              
              <div className="grid gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                        <Shield className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-sm font-black text-slate-900">{match.teamA.name}</span>
                    </div>
                    <div className="flex gap-2">
                      {['W', 'W', 'D', 'L', 'W'].map((r, i) => (
                        <motion.div 
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-sm transition-transform hover:scale-110 cursor-default",
                            r === 'W' ? 'bg-emerald-500 shadow-emerald-100' : r === 'D' ? 'bg-amber-500 shadow-amber-100' : 'bg-rose-500 shadow-rose-100'
                          )}
                        >
                          {r}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-100">
                        <Shield className="w-4 h-4 text-rose-600" />
                      </div>
                      <span className="text-sm font-black text-slate-900">{match.teamB.name}</span>
                    </div>
                    <div className="flex gap-2">
                      {['L', 'W', 'L', 'D', 'D'].map((r, i) => (
                        <motion.div 
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-sm transition-transform hover:scale-110 cursor-default",
                            r === 'W' ? 'bg-emerald-500 shadow-emerald-100' : r === 'D' ? 'bg-amber-500 shadow-amber-100' : 'bg-rose-500 shadow-rose-100'
                          )}
                        >
                          {r}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Bento Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/20 text-white space-y-8 relative overflow-hidden group">
            <div className="absolute -bottom-8 -right-8 p-8 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
              <Zap className="w-32 h-32 fill-white" />
            </div>

            <div className="relative z-10">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-8">Power Metrics</h4>
              <div className="space-y-8">
                <StatBar label="Attack" valA={match.teamA.attack} valB={match.teamB.attack} dark />
                <StatBar label="Midfield" valA={match.teamA.midfield} valB={match.teamB.midfield} dark />
                <StatBar label="Defense" valA={match.teamA.defense} valB={match.teamB.defense} dark />
              </div>
            </div>
          </div>

          {/* H2H Bento Card */}
          <div className="md:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/30 space-y-8">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Head to Head History</h4>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  {match.teamA.name}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  {match.teamB.name}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { date: 'Nov 12, 2025', score: '2 - 1', winner: match.teamA.name, league: 'Premier League' },
                { date: 'Apr 22, 2025', score: '0 - 0', winner: 'Draw', league: 'FA Cup' },
                { date: 'Dec 05, 2024', score: '1 - 3', winner: match.teamB.name, league: 'Premier League' },
              ].map((h, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 space-y-4 hover:bg-white hover:shadow-lg hover:border-transparent transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h.date}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-white rounded-md border border-slate-100 text-slate-500">{h.league}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className={cn("w-2 h-2 rounded-full", h.winner === match.teamA.name ? "bg-indigo-500" : "bg-slate-300")} />
                    <span className="text-lg font-black text-slate-900 tracking-tighter">{h.score}</span>
                    <div className={cn("w-2 h-2 rounded-full", h.winner === match.teamB.name ? "bg-rose-500" : "bg-slate-300")} />
                  </div>
                  <div className="text-center">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full",
                      h.winner === 'Draw' ? 'bg-slate-100 text-slate-500' : 
                      h.winner === match.teamA.name ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                    )}>
                      {h.winner === 'Draw' ? 'Draw' : `${h.winner} Win`}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    {analysisType === 'ai' ? (
                      <BrainCircuit className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Zap className="w-5 h-5 text-amber-500" />
                    )}
                    {analysisType === 'ai' ? 'AI Tactical Breakdown' : 'Algorithmic Analysis'}
                  </h3>
                  
                  <div className="flex bg-slate-100 p-1 rounded-xl self-start">
                    <button 
                      onClick={() => setAnalysisType('ai')}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                        analysisType === 'ai' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      AI Mode
                    </button>
                    <button 
                      onClick={() => setAnalysisType('algo')}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                        analysisType === 'algo' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      Algorithm
                    </button>
                  </div>
                </div>

                <motion.div 
                  key={analysisType}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 prose-strong:text-indigo-600 prose-li:text-slate-600"
                >
                  <Markdown>{analysisType === 'ai' ? result.analysis : (result.algoAnalysis || 'No algorithmic analysis available.')}</Markdown>
                </motion.div>
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

function StatBar({ label, valA, valB, dark = false }: { label: string, valA: number, valB: number, dark?: boolean }) {
  const total = valA + valB;
  const percA = (valA / total) * 100;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className={dark ? "text-indigo-400" : "text-indigo-600"}>{valA}</span>
        <span className={dark ? "text-slate-400" : "text-slate-500"}>{label}</span>
        <span className={dark ? "text-rose-400" : "text-rose-600"}>{valB}</span>
      </div>
      <div className={cn(
        "h-2 w-full rounded-full overflow-hidden flex shadow-inner",
        dark ? "bg-slate-800" : "bg-slate-100"
      )}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percA}%` }}
          transition={{ duration: 1, ease: "circOut" }}
          className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.4)]" 
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${100 - percA}%` }}
          transition={{ duration: 1, ease: "circOut" }}
          className="h-full bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.4)]" 
        />
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
