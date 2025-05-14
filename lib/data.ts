import { Match, Team, TokenData, User, LeaderboardEntry } from './types';

export const tokens: TokenData[] = [
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'SUI',
    logo: 'https://cryptologos.cc/logos/sui-sui-logo.png',
    price: 1.25,
    change24h: 5.2,
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: 68423.12,
    change24h: 2.1,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 3451.67,
    change24h: 1.5,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    price: 143.78,
    change24h: 4.2,
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    price: 0.45,
    change24h: -1.8,
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    price: 6.78,
    change24h: -0.5,
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    price: 0.56,
    change24h: 1.2,
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    price: 585.45,
    change24h: 0.8,
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    price: 34.21,
    change24h: 3.5,
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    price: 0.12,
    change24h: -2.1,
  },
];

export const users: User[] = [
  {
    id: 'user1',
    username: 'CryptoChampion',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto1',
    teams: [],
  },
  {
    id: 'user2',
    username: 'TokenTrader',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto2',
    teams: [],
  },
  {
    id: 'user3',
    username: 'BlockchainBaron',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto3',
    teams: [],
  },
];

export const dummyTeams: Team[] = [
  {
    id: 'team1',
    name: 'Crypto Crushers',
    owner: 'user1',
    tokens: [tokens[0], tokens[1], tokens[3], tokens[8]],
    totalValue: 72051.76,
    createdAt: '2023-09-15T14:30:00Z',
  },
  {
    id: 'team2',
    name: 'Token Titans',
    owner: 'user2',
    tokens: [tokens[2], tokens[4], tokens[5], tokens[9]],
    totalValue: 3458.90,
    createdAt: '2023-09-16T10:15:00Z',
  },
  {
    id: 'team3',
    name: 'Blockchain Beasts',
    owner: 'user1',
    tokens: [tokens[1], tokens[6], tokens[7], tokens[8]],
    totalValue: 69043.78,
    createdAt: '2023-09-17T09:45:00Z',
  },
  {
    id: 'team4',
    name: 'DeFi Dragons',
    owner: 'user2',
    tokens: [tokens[0], tokens[2], tokens[4], tokens[7]],
    totalValue: 4038.37,
    createdAt: '2023-09-18T16:20:00Z',
  },
];

// Helper function to generate random percentage changes
const randomPercentageChange = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Ensure team A always wins for demo purposes
export const liveMatches: Match[] = [
  {
    id: 'match1',
    status: 'live',
    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    duration: '2h',
    teamA: {
      id: 'team1',
      name: 'Crypto Crushers',
      owner: users[0],
      initialValue: 72051.76,
      currentValue: 74934.83,
      percentageChange: 4.00,
    },
    teamB: {
      id: 'team2',
      name: 'Token Titans',
      owner: users[1],
      initialValue: 3458.90,
      currentValue: 3406.02,
      percentageChange: -1.53,
    },
  },
  {
    id: 'match2',
    status: 'live',
    startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    duration: '4h',
    teamA: {
      id: 'team3',
      name: 'Blockchain Beasts',
      owner: users[0],
      initialValue: 69043.78,
      currentValue: 71115.09,
      percentageChange: 3.00,
    },
    teamB: {
      id: 'team4',
      name: 'DeFi Dragons',
      owner: users[1],
      initialValue: 4038.37,
      currentValue: 3957.60,
      percentageChange: -2.00,
    },
  },
];

export const completedMatches: Match[] = [
  {
    id: 'match3',
    status: 'completed',
    startTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    endTime: new Date(Date.now() - 79200000).toISOString(), // 22 hours ago
    duration: '2h',
    teamA: {
      id: 'team1',
      name: 'Crypto Crushers',
      owner: users[0],
      initialValue: 72051.76,
      currentValue: 74934.83,
      percentageChange: 4.00,
    },
    teamB: {
      id: 'team4',
      name: 'DeFi Dragons',
      owner: users[1],
      initialValue: 4038.37,
      currentValue: 3957.60,
      percentageChange: -2.00,
    },
    winner: 'teamA',
  },
  {
    id: 'match4',
    status: 'completed',
    startTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    endTime: new Date(Date.now() - 165600000).toISOString(), // 46 hours ago
    duration: '2h',
    teamA: {
      id: 'team3',
      name: 'Blockchain Beasts',
      owner: users[0],
      initialValue: 69043.78,
      currentValue: 71115.09,
      percentageChange: 3.00,
    },
    teamB: {
      id: 'team2',
      name: 'Token Titans',
      owner: users[1],
      initialValue: 3458.90,
      currentValue: 3406.02,
      percentageChange: -1.53,
    },
    winner: 'teamA',
  },
];

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: users[0],
    wins: 15,
    losses: 3,
    points: 1520,
  },
  {
    rank: 2,
    user: {
      id: 'user4',
      username: 'CoinCollector',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto4',
      teams: [],
    },
    wins: 12,
    losses: 4,
    points: 1245,
  },
  {
    rank: 3,
    user: {
      id: 'user5',
      username: 'TokenLegend',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto5',
      teams: [],
    },
    wins: 10,
    losses: 6,
    points: 1180,
  },
  {
    rank: 4,
    user: users[1],
    wins: 9,
    losses: 7,
    points: 980,
  },
  {
    rank: 5,
    user: users[2],
    wins: 8,
    losses: 8,
    points: 860,
  },
  {
    rank: 6,
    user: {
      id: 'user6',
      username: 'CryptoKing',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto6',
      teams: [],
    },
    wins: 7,
    losses: 9,
    points: 740,
  },
  {
    rank: 7,
    user: {
      id: 'user7',
      username: 'BlockMaster',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto7',
      teams: [],
    },
    wins: 6,
    losses: 10,
    points: 620,
  },
  {
    rank: 8,
    user: {
      id: 'user8',
      username: 'ChainChampion',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto8',
      teams: [],
    },
    wins: 5,
    losses: 11,
    points: 540,
  },
];

// Generate mock price history data points
export const generatePriceHistory = (
  basePrice: number,
  volatility: number,
  dataPoints: number
) => {
  const history = [];
  let currentPrice = basePrice;

  for (let i = 0; i < dataPoints; i++) {
    // Random percentage change within volatility range
    const change = (Math.random() * 2 - 1) * volatility;
    currentPrice = currentPrice * (1 + change / 100);
    
    // Add some time in the past (more recent for later points)
    const timeOffset = (dataPoints - i) * 300000; // 5 minutes per point
    const timestamp = new Date(Date.now() - timeOffset).toISOString();
    
    history.push({
      timestamp,
      price: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return history;
};

// Generate match history data
export const generateMatchHistory = (match: Match, dataPoints: number) => {
  const history = [];
  
  // Ensure team A always comes out ahead by the end
  let teamAPercentage = 0;
  let teamBPercentage = 0;
  
  for (let i = 0; i < dataPoints; i++) {
    // For the last point, ensure the percentages match the final values
    if (i === dataPoints - 1) {
      teamAPercentage = match.teamA.percentageChange;
      teamBPercentage = match.teamB.percentageChange;
    } else {
      // Random fluctuations but trending toward the final values
      const progress = i / (dataPoints - 1);
      const randomFactorA = Math.random() * 2 - 0.5; // Random between -0.5 and 1.5
      const randomFactorB = Math.random() * 2 - 1.5; // Biased negative for team B
      
      teamAPercentage = progress * match.teamA.percentageChange + randomFactorA;
      teamBPercentage = progress * match.teamB.percentageChange + randomFactorB;
    }
    
    const timeOffset = (dataPoints - i) * 180000; // 3 minutes per point
    const timestamp = new Date(Date.now() - timeOffset).toISOString();
    
    const teamAValue = match.teamA.initialValue * (1 + teamAPercentage / 100);
    const teamBValue = match.teamB.initialValue * (1 + teamBPercentage / 100);
    
    history.push({
      timestamp,
      teamA: {
        value: parseFloat(teamAValue.toFixed(2)),
        percentageChange: parseFloat(teamAPercentage.toFixed(2)),
      },
      teamB: {
        value: parseFloat(teamBValue.toFixed(2)),
        percentageChange: parseFloat(teamBPercentage.toFixed(2)),
      },
    });
  }
  
  return history;
};