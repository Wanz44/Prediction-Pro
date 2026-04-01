import { TeamStats, Match } from "../types";
import { addDays, formatISO, isBefore, parseISO } from "date-fns";
import { db, collection, getDocs, addDoc, deleteDoc, doc, query, where, onSnapshot, handleFirestoreError, OperationType } from "../firebase";

const MATCHES_COLLECTION = 'matches';

export function calculateProbabilities(a: TeamStats, b: TeamStats): { winA: number, winB: number, draw: number } {
  // Weighted scoring system
  const getScore = (t: TeamStats) => {
    return (
      t.overall * 0.4 +
      ((t.attack + t.midfield + t.defense) / 3) * 0.3 +
      t.form * 0.2 +
      t.fitness * 0.1
    );
  };

  const scoreA = getScore(a);
  const scoreB = getScore(b);
  
  // Base win probabilities
  const total = scoreA + scoreB;
  let winA = (scoreA / total) * 100;
  let winB = (scoreB / total) * 100;
  
  // Calculate draw probability based on score difference
  const diff = Math.abs(scoreA - scoreB);
  // If difference is 0, draw is high (e.g. 30%). If difference is large, draw is low.
  const drawBase = Math.max(5, 30 - (diff * 2));
  
  // Adjust win probabilities to account for draw
  const remaining = 100 - drawBase;
  winA = (winA / 100) * remaining;
  winB = (winB / 100) * remaining;

  return {
    winA: Math.round(winA),
    winB: Math.round(winB),
    draw: Math.round(drawBase)
  };
}

export async function saveMatchToDB(match: Omit<Match, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, MATCHES_COLLECTION), match);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, MATCHES_COLLECTION);
    throw error;
  }
}

export async function cleanupExpiredMatches(): Promise<void> {
  try {
    const now = new Date();
    const q = query(collection(db, MATCHES_COLLECTION));
    const snapshot = await getDocs(q);
    
    const deletePromises = snapshot.docs
      .filter(doc => {
        const match = doc.data() as Match;
        // Assume match ends 2 hours after start
        const matchEnd = addDays(parseISO(match.matchDate), 0); // Simplified: just check if date is past
        // Actually, let's say 3 hours after start
        const matchStartTime = parseISO(match.matchDate);
        const matchEndTime = new Date(matchStartTime.getTime() + 3 * 60 * 60 * 1000);
        return isBefore(matchEndTime, now);
      })
      .map(doc => deleteDoc(doc.ref).catch(err => handleFirestoreError(err, OperationType.DELETE, doc.ref.path)));

    await Promise.all(deletePromises);
    if (deletePromises.length > 0) {
      console.log(`Cleaned up ${deletePromises.length} expired matches.`);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, MATCHES_COLLECTION);
  }
}

export function subscribeToMatches(callback: (matches: Match[]) => void) {
  return onSnapshot(collection(db, MATCHES_COLLECTION), (snapshot) => {
    const matches = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Match));
    callback(matches);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, MATCHES_COLLECTION);
  });
}

export function generateMockUpcomingMatches(): Omit<Match, 'id'>[] {
  const teams: TeamStats[] = [
    { name: 'Real Madrid', overall: 88, attack: 87, midfield: 89, defense: 86, form: 85, fitness: 92, tactics: 'Balanced' },
    { name: 'Manchester City', overall: 89, attack: 90, midfield: 91, defense: 87, form: 88, fitness: 90, tactics: 'Possession' },
    { name: 'Barcelona', overall: 85, attack: 84, midfield: 86, defense: 83, form: 80, fitness: 88, tactics: 'Possession' },
    { name: 'Liverpool', overall: 86, attack: 88, midfield: 85, defense: 84, form: 82, fitness: 85, tactics: 'Gegenpressing' },
    { name: 'Bayern Munich', overall: 87, attack: 89, midfield: 86, defense: 85, form: 84, fitness: 89, tactics: 'Aggressive' },
    { name: 'Arsenal', overall: 84, attack: 85, midfield: 84, defense: 83, form: 86, fitness: 91, tactics: 'Balanced' },
    { name: 'PSG', overall: 85, attack: 89, midfield: 83, defense: 82, form: 78, fitness: 86, tactics: 'Counter-Attack' },
    { name: 'Inter Milan', overall: 85, attack: 83, midfield: 85, defense: 86, form: 87, fitness: 90, tactics: 'Defensive' },
  ];

  const matches: Omit<Match, 'id'>[] = [];
  for (let i = 0; i < 5; i++) {
    const teamA = teams[Math.floor(Math.random() * teams.length)];
    let teamB = teams[Math.floor(Math.random() * teams.length)];
    while (teamB.name === teamA.name) {
      teamB = teams[Math.floor(Math.random() * teams.length)];
    }

    matches.push({
      teamA,
      teamB,
      matchDate: formatISO(addDays(new Date(), i)),
      status: 'upcoming',
      league: 'Champions League',
    });
  }
  return matches;
}
