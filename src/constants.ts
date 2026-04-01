import { TeamStats } from './types';

export const DEFAULT_TEAM_A: TeamStats = {
  name: 'Real Madrid',
  overall: 88,
  attack: 87,
  midfield: 89,
  defense: 86,
  form: 85,
  fitness: 92,
  tactics: 'Balanced',
};

export const DEFAULT_TEAM_B: TeamStats = {
  name: 'Manchester City',
  overall: 89,
  attack: 90,
  midfield: 91,
  defense: 87,
  form: 88,
  fitness: 90,
  tactics: 'Possession',
};

export const LEAGUES = [
  'Champions League',
  'Premier League',
  'La Liga',
  'Ligue 1',
  'Serie A',
  'Bundesliga',
  'FIFA World Cup',
];

export const TACTICS = [
  'Balanced',
  'Aggressive',
  'Defensive',
  'Counter-Attack',
  'Possession',
  'Gegenpressing',
];
