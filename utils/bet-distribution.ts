/**
 * Utility for distributing betting pool between two users based on portfolio performance
 */

export type TimeInterval = '1m' | '5m' | '1h' | '12h';

interface DistributionResult {
  winnerShare: number;
  loserShare: number;
  winnerAddress: string;
  loserAddress: string;
  winnerGain: number;
  loserGain: number;
}

/**
 * Distributes the betting pool between two users based on their portfolio performance
 * 
 * @param gainA - User A's portfolio gain percentage (e.g., 0.4 for 0.4%)
 * @param gainB - User B's portfolio gain percentage (e.g., 0.1 for 0.1%)
 * @param potAmount - Total pot amount in SUI
 * @param timeInterval - Time interval for the match ('1m', '5m', '1h', '12h')
 * @param addressA - Wallet address of User A
 * @param addressB - Wallet address of User B
 * @returns Distribution result with winner and loser shares
 */
export function distributeBettingPool(
  gainA: number,
  gainB: number,
  potAmount: number,
  timeInterval: TimeInterval,
  addressA: string,
  addressB: string
): DistributionResult {
  // Parameters
  const smoothingConstants: Record<TimeInterval, number> = {
    '1m': 0.2, // 0.2%
    '5m': 0.15, // 0.15%
    '1h': 0.1, // 0.1%
    '12h': 0.05, // 0.05%
  };
  
  // Get smoothing constant based on time interval
  const k = smoothingConstants[timeInterval];
  
  // Set loss floor (minimum share for loser, e.g., 5% of pot)
  const floor = 0.05 * potAmount;
  
  // Identify winner and loser
  const isAWinner = gainA > gainB;
  const winnerGain = isAWinner ? gainA : gainB;
  const loserGain = isAWinner ? gainB : gainA;
  const winnerAddress = isAWinner ? addressA : addressB;
  const loserAddress = isAWinner ? addressB : addressA;
  
  // Adjusted gains (add smoothing constant to both)
  const adjustedWinnerGain = winnerGain + k;
  const adjustedLoserGain = loserGain + k;
  const totalAdjustedGain = adjustedWinnerGain + adjustedLoserGain;
  
  // Initial shares calculation
  let winnerShare = (adjustedWinnerGain / totalAdjustedGain) * potAmount;
  let loserShare = potAmount - winnerShare;
  
  // Apply floor (ensure loser gets minimum share)
  if (loserShare < floor) {
    loserShare = floor;
    winnerShare = potAmount - floor;
  }
  
  return {
    winnerShare,
    loserShare,
    winnerAddress,
    loserAddress,
    winnerGain,
    loserGain
  };
}

/**
 * Calculates the distribution of a betting pool for a match
 * 
 * @param match - Match object with team performance data
 * @param potAmount - Total pot amount (default: 2 SUI, assuming each player bet 1 SUI)
 * @returns Distribution result with winner and loser shares
 */
export function calculateMatchDistribution(
  match: any, // Replace with your Match type
  potAmount: number = 2 // Default to 2 SUI (1 SUI from each player)
): DistributionResult | null {
  // Ensure match has necessary data
  if (!match.teamOne || !match.playerOne || 
      !match.teamTwo || !match.playerTwo ||
      match.status !== 'COMPLETED') {
    return null;
  }
  
  // Extract performance data
  // Note: You'll need to adapt this to how your app actually tracks gains
  const gainA = match.teamOne.performanceGain || 0;
  const gainB = match.teamTwo.performanceGain || 0;
  
  // Determine time interval from match duration
  let timeInterval: TimeInterval = '1h'; // Default
  if (match.duration) {
    if (match.duration <= 1) timeInterval = '1m';
    else if (match.duration <= 5) timeInterval = '5m';
    else if (match.duration <= 60) timeInterval = '1h';
    else timeInterval = '12h';
  }
  
  return distributeBettingPool(
    gainA,
    gainB,
    potAmount,
    timeInterval,
    match.playerOne.address,
    match.playerTwo.address
  );
}
