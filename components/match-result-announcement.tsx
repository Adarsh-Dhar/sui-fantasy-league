"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Frown } from "lucide-react";

// Define a simplified Match interface for this component
interface MatchTeam {
  id: string;
  name: string;
  tokens: string[];
  playerId: string;
}

interface Match {
  id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  teamOne: MatchTeam;
  teamTwo?: MatchTeam;
}

interface MatchResultAnnouncementProps {
  match: Match;
  teamOneScore: number;
  teamTwoScore: number;
  onClose?: () => void;
}

export const MatchResultAnnouncement = ({
  match,
  teamOneScore,
  teamTwoScore,
  onClose
}: MatchResultAnnouncementProps) => {
  const [visible, setVisible] = useState(false);
  
  // Determine the winner
  const isTeamOneWinner = teamOneScore > teamTwoScore;
  const isDraw = teamOneScore === teamTwoScore;
  
  // Determine if the current user is team one (the player)
  // In this application, teamOne is always the current user's team
  
  // Format scores with sign and 4 decimal places
  const formatScore = (score: number) => {
    return `${score >= 0 ? '+' : ''}${score.toFixed(4)}%`;
  };
  
  // Simple confetti function
  const showConfetti = () => {
    // Create canvas element for confetti
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    // Get context and set dimensions
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Confetti particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];
    
    // Create particles
    const colors = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#9c27b0'];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let complete = true;
      particles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 2;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        
        if (p.y < canvas.height) {
          complete = false;
        }
      });
      
      if (complete) {
        cancelAnimationFrame(animationId);
        document.body.removeChild(canvas);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    // Clean up after 5 seconds
    setTimeout(() => {
      cancelAnimationFrame(animationId);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }, 5000);
  };
  
  useEffect(() => {
    // Show the announcement with a slight delay
    const timer = setTimeout(() => {
      setVisible(true);
      
      // If team one is the winner, show confetti
      if (isTeamOneWinner) {
        showConfetti();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isTeamOneWinner]);
  
  // If not visible yet, don't render anything
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          {isDraw ? (
            <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          ) : isTeamOneWinner ? (
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-green-500" />
            </div>
          ) : (
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Frown className="h-8 w-8 text-red-500" />
            </div>
          )}
          
          <h2 className="text-2xl font-bold mb-2">
            {isDraw ? (
              "It's a Draw!"
            ) : isTeamOneWinner ? (
              "Congratulations!"
            ) : (
              "Better luck next time 😔"
            )}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {isDraw ? (
              "Both teams performed equally well!"
            ) : isTeamOneWinner ? (
              "Your team outperformed the opponent!"
            ) : (
              `${match.teamTwo?.name || 'The opponent'} had better performance. Don't give up!`
            )}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${isTeamOneWinner ? 'bg-green-100 dark:bg-green-900/20' : isDraw ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-muted'}`}>
              <div className="text-sm font-medium mb-1">{match.teamOne.name}</div>
              <div className={`text-xl font-bold ${isTeamOneWinner ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                {formatScore(teamOneScore)}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${!isTeamOneWinner && !isDraw ? 'bg-green-100 dark:bg-green-900/20' : isDraw ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-muted'}`}>
              <div className="text-sm font-medium mb-1">{match.teamTwo?.name || 'Opponent'}</div>
              <div className={`text-xl font-bold ${!isTeamOneWinner && !isDraw ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                {formatScore(teamTwoScore)}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onClose} 
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
