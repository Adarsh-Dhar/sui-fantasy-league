export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
}

export interface Team {
  id: string;
  name: string;
  owner: string;
  tokens: TokenData[];
  totalValue: number;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  teams: Team[];
}

export interface Match {
  id: string;
  status: 'live' | 'completed' | 'scheduled';
  startTime: string;
  endTime?: string;
  duration: string;
  teamA: {
    id: string;
    name: string;
    owner: User;
    initialValue: number;
    currentValue: number;
    percentageChange: number;
  };
  teamB: {
    id: string;
    name: string;
    owner: User;
    initialValue: number;
    currentValue: number;
    percentageChange: number;
  };
  winner?: 'teamA' | 'teamB' | null;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  wins: number;
  losses: number;
  points: number;
}

export interface PriceHistory {
  timestamp: string;
  price: number;
}

export interface TokenWithHistory extends TokenData {
  priceHistory: PriceHistory[];
}

export interface MatchWithHistory extends Match {
  history: {
    timestamp: string;
    teamA: {
      value: number;
      percentageChange: number;
    };
    teamB: {
      value: number;
      percentageChange: number;
    };
  }[];
}