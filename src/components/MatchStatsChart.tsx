import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TeamStats } from '../types';

interface MatchStatsChartProps {
  teamA: TeamStats;
  teamB: TeamStats;
}

export const MatchStatsChart: React.FC<MatchStatsChartProps> = ({ teamA, teamB }) => {
  const data = [
    { name: 'OVR', A: teamA.overall, B: teamB.overall },
    { name: 'ATT', A: teamA.attack, B: teamB.attack },
    { name: 'MID', A: teamA.midfield, B: teamB.midfield },
    { name: 'DEF', A: teamA.defense, B: teamB.defense },
    { name: 'FORM', A: teamA.form, B: teamB.form },
    { name: 'FIT', A: teamA.fitness, B: teamB.fitness },
  ];

  return (
    <div className="w-full h-[450px] bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/30 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600" />
      
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          Statistical Delta
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{teamA.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)]" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{teamB.name}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          barGap={12}
        >
          <defs>
            <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#e11d48" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            domain={[0, 100]}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc', radius: 12 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 mb-2">
                      {payload[0].payload.name} Comparison
                    </p>
                    {payload.map((entry: any) => (
                      <div key={entry.name} className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs font-bold">{entry.name}</span>
                        </div>
                        <span className="text-sm font-black">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            name={teamA.name} 
            dataKey="A" 
            fill="url(#colorA)" 
            radius={[6, 6, 0, 0]} 
            barSize={20}
          />
          <Bar 
            name={teamB.name} 
            dataKey="B" 
            fill="url(#colorB)" 
            radius={[6, 6, 0, 0]} 
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex justify-center gap-8">
        <div className="text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Strength</div>
          <div className="text-lg font-black text-slate-900">
            {Math.round((teamA.attack + teamA.midfield + teamA.defense) / 3)}
          </div>
        </div>
        <div className="w-px h-8 bg-slate-100 self-center" />
        <div className="text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Strength</div>
          <div className="text-lg font-black text-slate-900">
            {Math.round((teamB.attack + teamB.midfield + teamB.defense) / 3)}
          </div>
        </div>
      </div>
    </div>
  );
};
