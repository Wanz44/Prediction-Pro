import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Match, TeamStats, PredictionResult } from './types';
import { MatchHeader } from './components/MatchHeader';
import { MatchFooter } from './components/MatchFooter';
import { MatchDiscoveryView } from './components/MatchDiscoveryView';
import { MatchAnalysisView } from './components/MatchAnalysisView';
import { ManualMatchForm } from './components/ManualMatchForm';
import { subscribeToMatches, cleanupExpiredMatches, saveMatchToDB, generateMockUpcomingMatches, calculateProbabilities, generateAlgorithmicAnalysis, clearAllMatches } from './services/matchService';
import { getMatchAnalysis } from './services/geminiService';
import { isSameDay, parseISO } from 'date-fns';
import { LEAGUES } from './constants';
import { Zap, Plus, Search } from 'lucide-react';
import { cn } from './lib/utils';

export const MatchApp: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isManualEntry, setIsManualEntry] = useState(false);
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

  const handleReset = async () => {
    try {
      await clearAllMatches();
      hasAutoDiscovered.current = false;
      setSelectedMatch(null);
      setPredictionResult(null);
    } catch (err) {
      console.error("Failed to reset database:", err);
    }
  };

  const handlePredict = async (matchToPredict: Match | Omit<Match, 'id'>) => {
    setIsPredicting(true);
    setError(null);
    
    try {
      const probs = calculateProbabilities(matchToPredict.teamA, matchToPredict.teamB);
      const algoAnalysis = generateAlgorithmicAnalysis(matchToPredict.teamA, matchToPredict.teamB, probs);
      
      // We still call AI, but we also have the algorithmic one ready
      const analysis = await getMatchAnalysis(matchToPredict.teamA, matchToPredict.teamB, probs);
      
      setPredictionResult({
        ...probs,
        analysis,
        algoAnalysis
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate AI analysis. Please check your connection.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleManualAnalyze = async (matchData: Omit<Match, 'id'>) => {
    const tempMatch: Match = {
      ...matchData,
      id: 'temp-' + Date.now()
    };
    setSelectedMatch(tempMatch);
    setIsManualEntry(false);
    handlePredict(tempMatch);
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
          onPredict={() => handlePredict(selectedMatch)}
          result={predictionResult}
          error={error}
        />
      );
    }

    if (isManualEntry) {
      return (
        <ManualMatchForm 
          onAnalyze={handleManualAnalyze}
          onCancel={() => setIsManualEntry(false)}
        />
      );
    }

    return (
      <div className="space-y-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsManualEntry(false)}
                className={cn(
                  "px-6 py-3 rounded-2xl font-bold text-sm transition-all",
                  !isManualEntry ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Discovery Mode
                </div>
              </button>
              <button 
                onClick={() => setIsManualEntry(true)}
                className={cn(
                  "px-6 py-3 rounded-2xl font-bold text-sm transition-all",
                  isManualEntry ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Manual Entry
                </div>
              </button>
            </div>
          </div>
        </div>

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
          onReset={handleReset}
        />
      </div>
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
