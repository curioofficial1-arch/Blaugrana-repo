export interface UserProfile {
  id: string;
  displayName: string;
  penya: string;
  favoritePlayer: string;
  membershipTier: 'Soci' | 'Culers Premium' | 'Fan Culer';
  membershipNumber: string;
  country: string;
  bio?: string;
  avatarUrl?: string;
  loyaltyPoints: number;
  badges: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MatchInfo {
  id: string;
  opponent: string;
  opponentShort: string;
  opponentLogoText: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
  score?: { barca: number; opponent: number };
  status: 'UPCOMING' | 'COMPLETED' | 'LIVE';
  round: string;
  highlights?: string[];
  attendance?: string;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';
  nationality: string;
  avatarSeed: string;
  fanRating: number;
  totalVotes: number;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    passAccuracy?: string;
    cleanSheets?: number;
  };
  highlightTrait: string;
  status: 'In Form' | 'Key Player' | 'Captain';
}

export interface LeagueStanding {
  rank: number;
  team: string;
  shortName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Match Preview' | 'Club News' | 'La Masia' | 'Interview';
  date: string;
  readTime: string;
  summary: string;
  author: string;
}

export interface TransferRumor {
  id: string;
  player: string;
  currentClub: string;
  position: string;
  type: 'Inbound' | 'Outbound' | 'Contract Extension';
  tier: 1 | 2 | 3;
  source: string;
  probability: number;
  description: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface FanPoll {
  id: string;
  question: string;
  description: string;
  totalVotes: number;
  options: PollOption[];
  expiresIn: string;
}

export interface RoadmapFeature {
  id: string;
  name: string;
  tagline: string;
  status: 'Completed' | 'Active (Current Step)' | 'Upcoming';
  description: string;
  icon: string;
  plannedHighlights: string[];
}
