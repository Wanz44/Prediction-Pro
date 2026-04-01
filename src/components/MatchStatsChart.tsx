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
    { name: 'Overall', A: teamA.overall, B: teamB.overall },
    { name: 'Attack', A: teamA.attack, B: teamB.attack },
    { name: 'Midfield', A: teamA.midfield, B: teamB.midfield },
    { name: 'Defense', A: teamA.defense, B: teamB.defense },
    { name: 'Form', A: teamA.form, B: teamB.form },
    { name: 'Fitness', A: teamA.fitness, B: teamB.fitness },
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 text-center">
        Statistical Comparison
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" />
          <Bar 
            name={teamA.name} 
            dataKey="A" 
            fill="#4f46e5" 
            radius={[4, 4, 0, 0]} 
            barSize={24}
          />
          <Bar 
            name={teamB.name} 
            dataKey="B" 
            fill="#e11d48" 
            radius={[4, 4, 0, 0]} 
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
