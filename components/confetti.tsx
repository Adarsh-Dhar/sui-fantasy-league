"use client";

import { useEffect, useRef } from "react";

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    
    canvas.width = W;
    canvas.height = H;
    
    const mp = 150; // max particles
    const particles: any[] = [];
    
    const colors = [
      "#10b981", // green
      "#3b82f6", // blue
      "#f59e0b", // yellow
      "#ef4444", // red
      "#8b5cf6", // purple
      "#ec4899", // pink
    ];
    
    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 5 + 1,
        d: Math.random() * mp,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        opacity: Math.random() + 0.5,
        speedY: Math.random() + 0.1, // vertical speed
        speedX: Math.floor(Math.random() * 6) - 3, // horizontal random speed
      });
    }
    
    let angle = 0;
    
    function draw() {
      ctx?.clearRect(0, 0, W, H);
      
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        ctx?.beginPath();
        ctx?.moveTo(p.x, p.y);
        ctx?.lineTo(p.x + p.tilt + p.speedX, p.y + p.r);
        ctx?.stroke();
      }
      
      update();
    }
    
    function update() {
      angle += 0.01;
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        
        if (p.y > H) {
          particles[i].y = -10;
          particles[i].x = Math.random() * W;
        }
      }
    }
    
    const interval = setInterval(draw, 20);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};

export default Confetti;