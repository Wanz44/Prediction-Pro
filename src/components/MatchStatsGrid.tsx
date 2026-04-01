import React from 'react';
import { TeamStats } from '../types';
import { MatchStats } from './MatchStats';

interface MatchStatsGridProps {
  teamA: TeamStats;
  teamB: TeamStats;
}

export const MatchStatsGrid: React.FC<MatchStatsGridProps> = ({ teamA, teamB }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <MatchStats team={teamA} color="indigo" />
      <MatchStats team={teamB} color="rose" />
    </div>
  );
};
