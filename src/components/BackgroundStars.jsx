import React, { useEffect, useRef } from 'react';

export default function BackgroundStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create stars/dust particles
    const starCount = 85;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      velocity: Math.random() * 0.25 + 0.05,
      color: Math.random() > 0.4 ? '#FAF0DE' : '#E88B9A',
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y -= star.velocity;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        const currentAlpha =
          star.alpha + Math.sin(frame * star.pulseSpeed + star.pulseOffset) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic ambient glowing orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-rosewood-600/10 blur-[130px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-champagne-500/10 blur-[140px] animate-float-delayed" />
      <div className="absolute -bottom-40 left-1/4 w-[28rem] h-[28rem] rounded-full bg-velvet-700/20 blur-[150px] animate-float-slow" />

      {/* Canvas for twinkle stars */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
