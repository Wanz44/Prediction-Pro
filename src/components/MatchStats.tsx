import React from 'react';
import { TeamStats } from '../types';
import { Trophy, Zap, Activity, Shield, TrendingUp, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface MatchStatsProps {
  team: TeamStats;
  color: 'indigo' | 'rose';
}

export const MatchStats: React.FC<MatchStatsProps> = ({ team, color }) => {
  const accentColor = color === 'indigo' ? 'text-indigo-600' : 'text-rose-600';
  const bgColor = color === 'indigo' ? 'bg-indigo-50' : 'bg-rose-50';
  const borderColor = color === 'indigo' ? 'border-indigo-100' : 'border-rose-100';

  const stats = [
    { label: 'Overall', value: team.overall, icon: Trophy },
    { label: 'Attack', value: team.attack, icon: Zap },
    { label: 'Midfield', value: team.midfield, icon: Activity },
    { label: 'Defense', value: team.defense, icon: Shield },
    { label: 'Form', value: team.form, icon: TrendingUp },
    { label: 'Fitness', value: team.fitness, icon: Activity },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm overflow-hidden relative group">
      <div className={cn("absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity", accentColor)}>
        <Users className="w-24 h-24" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl bg-white shadow-sm border", borderColor, accentColor)}>
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{team.name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 group/stat hover:bg-white hover:shadow-sm transition-all">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <stat.icon className="w-3 h-3" />
                {stat.label}
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", color === 'indigo' ? 'bg-indigo-600' : 'bg-rose-600')}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Tactics:</span>
          <span className={cn("px-3 py-1 rounded-full border", borderColor, bgColor, accentColor)}>
            {team.tactics}
          </span>
        </div>
      </div>
    </div>
  );
};
