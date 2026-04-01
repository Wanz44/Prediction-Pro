import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { TeamStats } from '../types';

interface MatchChartProps {
  teamA: TeamStats;
  teamB: TeamStats;
}

export const MatchChart: React.FC<MatchChartProps> = ({ teamA, teamB }) => {
  const data = [
    { subject: 'Overall', A: teamA.overall, B: teamB.overall, fullMark: 100 },
    { subject: 'Attack', A: teamA.attack, B: teamB.attack, fullMark: 100 },
    { subject: 'Midfield', A: teamA.midfield, B: teamB.midfield, fullMark: 100 },
    { subject: 'Defense', A: teamA.defense, B: teamB.defense, fullMark: 100 },
    { subject: 'Form', A: teamA.form, B: teamB.form, fullMark: 100 },
    { subject: 'Fitness', A: teamA.fitness, B: teamB.fitness, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[350px] bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
        Tactical Comparison
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={teamA.name}
            dataKey="A"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.4}
          />
          <Radar
            name={teamB.name}
            dataKey="B"
            stroke="#e11d48"
            fill="#e11d48"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
