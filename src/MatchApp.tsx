import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Match, TeamStats, PredictionResult } from './types';
import { MatchHeader } from './components/MatchHeader';
import { MatchFooter } from './components/MatchFooter';
import { MatchDiscoveryView } from './components/MatchDiscoveryView';
import { MatchAnalysisView } from './components/MatchAnalysisView';
import { subscribeToMatches, cleanupExpiredMatches, saveMatchToDB, generateMockUpcomingMatches, calculateProbabilities } from './services/matchService';
import { getMatchAnalysis } from './services/geminiService';
import { isSameDay, parseISO } from 'date-fns';
import { LEAGUES } from './constants';
import { Zap } from 'lucide-react';

export const MatchApp: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLeague, setSelectedLeague] = useState('All');
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasAutoDiscovered = useRef(false);

  // Subscribe to Firestore matches
  useEffect(() => {
    const unsubscribe = subscribeToMatches((updatedMatches) => {
      setMatches(updatedMatches);
      
      // Auto-discover if no matches for today and it's the first load
      if (!hasAutoDiscovered.current && updatedMatches.length === 0 && !isDiscovering) {
        hasAutoDiscovered.current = true;
        handleDiscover();
      }
    });

    // Run cleanup on mount
    cleanupExpiredMatches();

    return () => unsubscribe();
  }, []);

  const handleDiscover = async () => {
    setIsDiscovering(true);
    // Simulate algorithm searching
    await new Promise(resolve => setTimeout(resolve, 3000));
    const newMatches = generateMockUpcomingMatches();
    
    // Save new matches to Firestore
    for (const match of newMatches) {
      const exists = matches.some(m => 
        m.teamA.name === match.teamA.name && 
        m.teamB.name === match.teamB.name && 
        isSameDay(parseISO(m.matchDate), parseISO(match.matchDate))
      );
      
      if (!exists) {
        try {
          await saveMatchToDB(match);
        } catch (err) {
          console.error("Failed to save match:", err);
        }
      }
    }
    
    setIsDiscovering(false);
  };

  const handlePredict = async () => {
    if (!selectedMatch) return;
    setIsPredicting(true);
    setError(null);
    
    try {
      const probs = calculateProbabilities(selectedMatch.teamA, selectedMatch.teamB);
      const analysis = await getMatchAnalysis(selectedMatch.teamA, selectedMatch.teamB, probs);
      
      setPredictionResult({
        ...probs,
        analysis
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate AI analysis. Please check your connection.");
    } finally {
      setIsPredicting(false);
    }
  };

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchesSearch = 
        match.teamA.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.teamB.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDate = match.matchDate ? isSameDay(parseISO(match.matchDate), selectedDate) : false;
      const matchesLeague = selectedLeague === 'All' || match.league === selectedLeague;
      
      return matchesSearch && matchesDate && matchesLeague;
    });
  }, [matches, searchQuery, selectedDate, selectedLeague]);

  const handleSelectMatch = (match: Match) => {
    if (!match || !match.id) return;
    setSelectedMatch(match);
    setPredictionResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (selectedMatch) {
      return (
        <MatchAnalysisView 
          match={selectedMatch}
          onBack={() => setSelectedMatch(null)}
          isPredicting={isPredicting}
          onPredict={handlePredict}
          result={predictionResult}
          error={error}
        />
      );
    }

    return (
      <MatchDiscoveryView 
        matches={filteredMatches}
        onSelect={handleSelectMatch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        leagues={LEAGUES}
        isDiscovering={isDiscovering}
        onDiscover={handleDiscover}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <MatchHeader />
      <main className="pt-24 pb-12">
        {renderContent()}
      </main>
      <MatchFooter />
    </div>
  );
};
