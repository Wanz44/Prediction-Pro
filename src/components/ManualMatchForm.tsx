import React, { useState } from 'react';
import { TeamStats, Match } from '../types';
import { Shield, Zap, Info, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ManualMatchFormProps {
  onAnalyze: (match: Omit<Match, 'id'>) => void;
  onCancel: () => void;
}

const DEFAULT_STATS: TeamStats = {
  name: '',
  overall: 80,
  attack: 80,
  midfield: 80,
  defense: 80,
  form: 75,
  fitness: 90,
  tactics: 'Balanced'
};

const TACTICS = ['Balanced', 'Possession', 'Counter-Attack', 'Gegenpressing', 'Defensive', 'Aggressive', 'Long Ball'];

export const ManualMatchForm: React.FC<ManualMatchFormProps> = ({ onAnalyze, onCancel }) => {
  const [teamA, setTeamA] = useState<TeamStats>({ ...DEFAULT_STATS, name: 'Home Team' });
  const [teamB, setTeamB] = useState<TeamStats>({ ...DEFAULT_STATS, name: 'Away Team' });
  const [league, setLeague] = useState('Friendly');

  const handleStatChange = (team: 'A' | 'B', field: keyof TeamStats, value: string | number) => {
    if (team === 'A') {
      setTeamA(prev => ({ ...prev, [field]: value }));
    } else {
      setTeamB(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      teamA,
      teamB,
      matchDate: new Date().toISOString(),
      status: 'upcoming',
      league
    });
  };

  const StatInput = ({ label, value, onChange, min = 0, max = 100 }: { label: string, value: number, onChange: (val: number) => void, min?: number, max?: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        <span className="text-sm font-black text-indigo-600">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Manual Match Entry</h2>
            </div>
            <button 
              onClick={onCancel}
              className="text-slate-400 hover:text-white transition-colors text-sm font-bold"
            >
              Cancel
            </button>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            Enter custom team statistics to generate an AI-powered tactical prediction. 
            Adjust the sliders to reflect current team strength, form, and fitness.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Team A */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <input 
                  type="text" 
                  value={teamA.name}
                  onChange={(e) => handleStatChange('A', 'name', e.target.value)}
                  className="text-xl font-black text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-full placeholder:text-slate-300"
                  placeholder="Home Team Name"
                />
              </div>

              <div className="space-y-4">
                <StatInput label="Overall Rating" value={teamA.overall} onChange={(v) => handleStatChange('A', 'overall', v)} />
                <div className="grid grid-cols-3 gap-4">
                  <StatInput label="ATT" value={teamA.attack} onChange={(v) => handleStatChange('A', 'attack', v)} />
                  <StatInput label="MID" value={teamA.midfield} onChange={(v) => handleStatChange('A', 'midfield', v)} />
                  <StatInput label="DEF" value={teamA.defense} onChange={(v) => handleStatChange('A', 'defense', v)} />
                </div>
                <StatInput label="Recent Form" value={teamA.form} onChange={(v) => handleStatChange('A', 'form', v)} />
                <StatInput label="Fitness Level" value={teamA.fitness} onChange={(v) => handleStatChange('A', 'fitness', v)} />
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tactical Style</label>
                  <select 
                    value={teamA.tactics}
                    onChange={(e) => handleStatChange('A', 'tactics', e.target.value)}
                    className="w-full bg-slate-50 border-slate-100 rounded-xl text-sm font-bold focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {TACTICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Team B */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-rose-600" />
                </div>
                <input 
                  type="text" 
                  value={teamB.name}
                  onChange={(e) => handleStatChange('B', 'name', e.target.value)}
                  className="text-xl font-black text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-full placeholder:text-slate-300"
                  placeholder="Away Team Name"
                />
              </div>

              <div className="space-y-4">
                <StatInput label="Overall Rating" value={teamB.overall} onChange={(v) => handleStatChange('B', 'overall', v)} />
                <div className="grid grid-cols-3 gap-4">
                  <StatInput label="ATT" value={teamB.attack} onChange={(v) => handleStatChange('B', 'attack', v)} />
                  <StatInput label="MID" value={teamB.midfield} onChange={(v) => handleStatChange('B', 'midfield', v)} />
                  <StatInput label="DEF" value={teamB.defense} onChange={(v) => handleStatChange('B', 'defense', v)} />
                </div>
                <StatInput label="Recent Form" value={teamB.form} onChange={(v) => handleStatChange('B', 'form', v)} />
                <StatInput label="Fitness Level" value={teamB.fitness} onChange={(v) => handleStatChange('B', 'fitness', v)} />
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tactical Style</label>
                  <select 
                    value={teamB.tactics}
                    onChange={(e) => handleStatChange('B', 'tactics', e.target.value)}
                    className="w-full bg-slate-50 border-slate-100 rounded-xl text-sm font-bold focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {TACTICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-slate-400 bg-slate-50 px-4 py-2 rounded-xl">
              <Info className="w-4 h-4" />
              <span className="text-xs font-medium">AI will analyze these stats to predict the outcome.</span>
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-2xl shadow-indigo-200"
            >
              Analyze Match
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
