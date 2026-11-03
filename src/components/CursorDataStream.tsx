import React, { useEffect, useRef } from 'react';

interface StreamPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char?: string;
  alpha: number;
  size: number;
  color: string;
}

export const CursorDataStream: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cursor tracking
    let mouse = { x: -100, y: -100, lastX: -100, lastY: -100, speed: 0 };
    const points: StreamPoint[] = [];
    const matrixChars = ['0', '1', 'λ', 'Σ', 'μ', 'σ', '∇', 'δ', 'π', 'θ', 'ω', '∫'];
    const colors = ['#00d2ff', '#00f5a0', '#38bdf8', '#10b981', '#a5e7ff'];

    let lastSpawnTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;

      const now = performance.now();
      // Spawn trail particles based on movement
      if (now - lastSpawnTime > 16) {
        lastSpawnTime = now;

        // Add 1-2 subtle telemetry stream particles
        const count = Math.min(3, Math.max(1, Math.floor(mouse.speed / 12)));
        for (let i = 0; i < count; i++) {
          const isChar = Math.random() > 0.45;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const angle = Math.random() * Math.PI * 2;
          const driftSpeed = 0.4 + Math.random() * 1.2;

          points.push({
            x: mouse.x + (Math.random() - 0.5) * 12,
            y: mouse.y + (Math.random() - 0.5) * 12,
            vx: Math.cos(angle) * driftSpeed - dx * 0.08,
            vy: Math.sin(angle) * driftSpeed - dy * 0.08,
            char: isChar ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : undefined,
            alpha: 0.85,
            size: isChar ? 9 + Math.random() * 3 : 2 + Math.random() * 2.5,
            color,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting telemetry ribbon between recent points
      if (points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < Math.min(points.length, 14); i++) {
          const xc = (points[i].x + points[i - 1].x) / 2;
          const yc = (points[i].y + points[i - 1].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022; // smooth decay (~0.6-0.8s)

        if (p.alpha <= 0) {
          points.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.char) {
          // Subtle mathematical / matrix symbol
          ctx.font = `${p.size}px "JetBrains Mono", monospace`;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          // Floating telemetry dot
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
