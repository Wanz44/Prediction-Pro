export interface TeamStats {
  name: string;
  overall: number;
  attack: number;
  midfield: number;
  defense: number;
  form: number; // 0-100 (Recent performance)
  fitness: number; // 0-100 (Fatigue level)
  tactics: string;
}

export interface Match {
  id: string;
  teamA: TeamStats;
  teamB: TeamStats;
  matchDate: string; // ISO 8601
  status: 'upcoming' | 'live' | 'finished';
  league: string;
  prediction?: {
    winA: number;
    winB: number;
    draw: number;
    analysis: string;
  };
}

export interface PredictionResult {
  winA: number;
  winB: number;
  draw: number;
  analysis: string;
}
