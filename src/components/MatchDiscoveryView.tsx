import React from 'react';
import { Match } from '../types';
import { MatchSearchAndFilter } from './MatchSearchAndFilter';
import { MatchGrid } from './MatchGrid';
import { MatchDiscoveryAlgorithm } from './MatchDiscoveryAlgorithm';

interface MatchDiscoveryViewProps {
  matches: Match[];
  onSelect: (match: Match) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  leagues: string[];
  isDiscovering: boolean;
  onDiscover: () => void;
  onReset: () => void;
}

export const MatchDiscoveryView: React.FC<MatchDiscoveryViewProps> = ({ 
  matches, 
  onSelect, 
  searchQuery, 
  setSearchQuery, 
  selectedDate, 
  setSelectedDate,
  selectedLeague,
  setSelectedLeague,
  leagues,
  isDiscovering,
  onDiscover,
  onReset
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <MatchDiscoveryAlgorithm onDiscover={onDiscover} isDiscovering={isDiscovering} onReset={onReset} />
      
      <MatchSearchAndFilter 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        leagues={leagues}
      />

      <MatchGrid matches={matches} onSelect={onSelect} />
    </div>
  );
};
