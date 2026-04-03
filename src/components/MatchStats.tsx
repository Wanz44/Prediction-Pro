import React from 'react';
import { TeamStats } from '../types';
import { Trophy, Zap, Activity, Shield, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MatchStatsProps {
  team: TeamStats;
  color: 'indigo' | 'rose';
}

export const MatchStats: React.FC<MatchStatsProps> = ({ team, color }) => {
  const accentColor = color === 'indigo' ? 'text-indigo-600' : 'text-rose-600';
  const bgColor = color === 'indigo' ? 'bg-indigo-50' : 'bg-rose-50';
  const borderColor = color === 'indigo' ? 'border-indigo-100' : 'border-rose-100';
  const progressColor = color === 'indigo' ? 'bg-indigo-600' : 'bg-rose-600';

  const stats = [
    { label: 'Overall', value: team.overall, icon: Trophy, desc: 'Global Rating' },
    { label: 'Attack', value: team.attack, icon: Zap, desc: 'Offensive Power' },
    { label: 'Midfield', value: team.midfield, icon: Activity, desc: 'Pitch Control' },
    { label: 'Defense', value: team.defense, icon: Shield, desc: 'Backline Strength' },
    { label: 'Form', value: team.form, icon: TrendingUp, desc: 'Recent Momentum' },
    { label: 'Fitness', value: team.fitness, icon: Activity, desc: 'Stamina Level' },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40 overflow-hidden relative group transition-all hover:shadow-2xl hover:shadow-slate-200/60">
      <div className={cn("absolute -top-12 -right-12 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12", accentColor)}>
        <Shield className="w-64 h-64" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border transition-transform group-hover:scale-110 duration-500", bgColor, borderColor, accentColor)}>
              <Shield className="w-7 h-7 fill-current opacity-20" />
              <span className="absolute font-black text-lg">{team.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{team.name}</h3>
              <div className="flex items-center gap-2">
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border", borderColor, bgColor, accentColor)}>
                  {team.tactics}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={cn("text-4xl font-black tracking-tighter", accentColor)}>
              {team.overall}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team OVR</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100/50 space-y-3 group/stat hover:bg-white hover:shadow-md hover:border-transparent transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <stat.icon className={cn("w-3 h-3", accentColor)} />
                  {stat.label}
                </div>
                <span className="text-lg font-black text-slate-900">{stat.value}</span>
              </div>
              
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className={cn("h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]", progressColor)}
                  />
                </div>
                <p className="text-[9px] font-medium text-slate-400 italic">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
