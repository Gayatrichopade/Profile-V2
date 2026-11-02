import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Gamepad2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Play, 
  Pause, 
  Trophy, 
  Zap, 
  Shield, 
  Maximize2, 
  X,
  Sparkles
} from 'lucide-react';

// Procedural Web Audio Sound Generator
class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCollect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  playPulse() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  playHit() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  playStart() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.16);
    });
  }
}

const sounds = new SoundManager();

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  type: 'packet' | 'booster' | 'leak' | 'null_ptr' | 'barrier';
  color: string;
  radius: number;
  angle?: number;
  telegraphTimer?: number;
}

interface CyberRunnerGameProps {
  onClose?: () => void;
  isStandalone?: boolean;
}

export const CyberRunnerGame: React.FC<CyberRunnerGameProps> = ({ onClose, isStandalone = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // High-level Game States: 'TITLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
  const [gameState, setGameState] = useState<'TITLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'>('TITLE');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('gayatri_game_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [health, setHealth] = useState<number>(100);
  const [pulseEnergy, setPulseEnergy] = useState<number>(100);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(isStandalone);

  // References for pure 60fps loop isolated from React render cycles
  const gameRef = useRef({
    state: 'TITLE' as 'TITLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER',
    lastTime: performance.now(),
    score: 0,
    health: 100,
    pulseEnergy: 100,
    multiplier: 1,
    combo: 0,
    hitstop: 0,
    cameraShake: 0,
    hitFlash: 0,
    speedMultiplier: 1.0,
    keys: {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false,
    },
    player: {
      x: 350,
      y: 400,
      targetX: 350,
      targetY: 400,
      radius: 14,
      vx: 0,
      vy: 0,
      shieldActive: false,
      shieldTimer: 0,
    },
    entities: [] as Entity[],
    particles: [] as Particle[],
    spawnTimer: 0,
    bgGridOffset: 0,
  });

  const toggleMute = () => {
    sounds.isMuted = !sounds.isMuted;
    setIsMuted(sounds.isMuted);
  };

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.score = 0;
    g.health = 100;
    g.pulseEnergy = 100;
    g.multiplier = 1;
    g.combo = 0;
    g.speedMultiplier = 1.0;
    g.entities = [];
    g.particles = [];
    g.player.x = 350;
    g.player.y = 380;
    g.player.vx = 0;
    g.player.vy = 0;
    g.state = 'PLAYING';

    setScore(0);
    setHealth(100);
    setPulseEnergy(100);
    setMultiplier(1);
    setGameState('PLAYING');
    sounds.playStart();
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;

      if (e.code === 'KeyM') {
        toggleMute();
        return;
      }

      if (e.code === 'Escape') {
        if (g.state === 'PLAYING') {
          g.state = 'PAUSED';
          setGameState('PAUSED');
        } else if (g.state === 'PAUSED') {
          g.state = 'PLAYING';
          setGameState('PLAYING');
        }
        return;
      }

      if (g.state === 'TITLE' || g.state === 'GAMEOVER') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          startGame();
          return;
        }
      }

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') g.keys.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') g.keys.right = true;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') g.keys.up = true;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') g.keys.down = true;

      if (e.code === 'Space' && g.state === 'PLAYING') {
        e.preventDefault();
        // Trigger pulse/shield if energy >= 40
        if (g.pulseEnergy >= 40 && !g.player.shieldActive) {
          g.pulseEnergy -= 40;
          g.player.shieldActive = true;
          g.player.shieldTimer = 1.2; // 1.2 seconds invincibility
          g.cameraShake = 8;
          sounds.playPulse();

          // Spawn pulse shockwave particles
          for (let i = 0; i < 32; i++) {
            const angle = (i / 32) * Math.PI * 2;
            const speed = 180 + Math.random() * 80;
            g.particles.push({
              x: g.player.x,
              y: g.player.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 3 + Math.random() * 3,
              color: '#00d2ff',
              alpha: 1,
              life: 0,
              maxLife: 0.35,
            });
          }

          // Destroy nearby hazards
          g.entities = g.entities.filter((ent) => {
            if (ent.type === 'leak' || ent.type === 'null_ptr') {
              const dx = ent.x - g.player.x;
              const dy = ent.y - g.player.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 140) {
                g.score += 150 * g.multiplier;
                return false;
              }
            }
            return true;
          });
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') g.keys.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') g.keys.right = false;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') g.keys.up = false;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') g.keys.down = false;
    };

    const handleBlur = () => {
      const g = gameRef.current;
      g.keys.left = false;
      g.keys.right = false;
      g.keys.up = false;
      g.keys.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [startGame]);

  // Main 60 FPS Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = (currentTime: number) => {
      const g = gameRef.current;
      const rawDt = (currentTime - g.lastTime) / 1000;
      g.lastTime = currentTime;

      // Clamp delta time to avoid spiral of death
      const dt = Math.min(rawDt, 0.05);

      // Hitstop logic (brief freeze on heavy impact)
      if (g.hitstop > 0) {
        g.hitstop -= dt;
      } else if (g.state === 'PLAYING') {
        // Difficulty scaling over time
        g.speedMultiplier = Math.min(2.4, 1.0 + (g.score / 5000) * 0.4);

        // Recharge energy over time
        g.pulseEnergy = Math.min(100, g.pulseEnergy + 15 * dt);

        // Player motion update with smooth acceleration
        const moveSpeed = 340;
        let targetVx = 0;
        let targetVy = 0;
        if (g.keys.left) targetVx -= moveSpeed;
        if (g.keys.right) targetVx += moveSpeed;
        if (g.keys.up) targetVy -= moveSpeed;
        if (g.keys.down) targetVy += moveSpeed;

        // Smooth interpolation
        g.player.vx += (targetVx - g.player.vx) * 14 * dt;
        g.player.vy += (targetVy - g.player.vy) * 14 * dt;

        g.player.x += g.player.vx * dt;
        g.player.y += g.player.vy * dt;

        // Clamp boundaries
        g.player.x = Math.max(25, Math.min(canvas.width - 25, g.player.x));
        g.player.y = Math.max(35, Math.min(canvas.height - 35, g.player.y));

        // Shield countdown
        if (g.player.shieldActive) {
          g.player.shieldTimer -= dt;
          if (g.player.shieldTimer <= 0) {
            g.player.shieldActive = false;
          }
        }

        // Spawn entities
        g.spawnTimer += dt;
        const spawnInterval = Math.max(0.35, 0.85 / g.speedMultiplier);

        if (g.spawnTimer > spawnInterval) {
          g.spawnTimer = 0;
          const rand = Math.random();
          const spawnX = 40 + Math.random() * (canvas.width - 80);

          if (rand < 0.45) {
            // Data Packet (Clean reward)
            g.entities.push({
              x: spawnX,
              y: -20,
              width: 14,
              height: 14,
              vx: (Math.random() - 0.5) * 40,
              vy: (140 + Math.random() * 80) * g.speedMultiplier,
              type: 'packet',
              color: '#00d2ff',
              radius: 9,
            });
          } else if (rand < 0.55) {
            // Optimization Booster (Emerald)
            g.entities.push({
              x: spawnX,
              y: -20,
              width: 16,
              height: 16,
              vx: 0,
              vy: 160 * g.speedMultiplier,
              type: 'booster',
              color: '#00f5a0',
              radius: 11,
            });
          } else if (rand < 0.85) {
            // Memory Leak Hazard (Red rotating spike)
            g.entities.push({
              x: spawnX,
              y: -25,
              width: 22,
              height: 22,
              vx: (Math.random() - 0.5) * 60,
              vy: (170 + Math.random() * 90) * g.speedMultiplier,
              type: 'leak',
              color: '#ef4444',
              radius: 12,
              angle: 0,
            });
          } else {
            // Null Pointer Anomaly (Violet pulsed orb with windup)
            g.entities.push({
              x: spawnX,
              y: -30,
              width: 28,
              height: 28,
              vx: (Math.random() - 0.5) * 100,
              vy: 120 * g.speedMultiplier,
              type: 'null_ptr',
              color: '#a855f7',
              radius: 16,
              telegraphTimer: 0.8,
            });
          }
        }

        // Update entities & check collisions
        for (let i = g.entities.length - 1; i >= 0; i--) {
          const ent = g.entities[i];
          ent.x += ent.vx * dt;
          ent.y += ent.vy * dt;
          if (ent.angle !== undefined) ent.angle += 3.5 * dt;

          // Distance to player
          const dx = ent.x - g.player.x;
          const dy = ent.y - g.player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < ent.radius + g.player.radius) {
            // Collision triggered
            if (ent.type === 'packet') {
              g.score += 100 * g.multiplier;
              g.combo += 1;
              if (g.combo % 5 === 0) g.multiplier = Math.min(8, g.multiplier + 1);
              sounds.playCollect();

              // Spawn sparkle particles
              for (let p = 0; p < 8; p++) {
                g.particles.push({
                  x: ent.x,
                  y: ent.y,
                  vx: (Math.random() - 0.5) * 120,
                  vy: (Math.random() - 0.5) * 120,
                  size: 2 + Math.random() * 2,
                  color: '#00d2ff',
                  alpha: 1,
                  life: 0,
                  maxLife: 0.3,
                });
              }
              g.entities.splice(i, 1);
              continue;
            } else if (ent.type === 'booster') {
              g.score += 250 * g.multiplier;
              g.health = Math.min(100, g.health + 20);
              g.pulseEnergy = Math.min(100, g.pulseEnergy + 40);
              sounds.playCollect();
              g.entities.splice(i, 1);
              continue;
            } else if (ent.type === 'leak' || ent.type === 'null_ptr') {
              if (g.player.shieldActive) {
                // Absorbed by shield
                g.score += 150 * g.multiplier;
                sounds.playPulse();
                g.entities.splice(i, 1);
                continue;
              } else {
                // Player Takes Damage
                const damage = ent.type === 'leak' ? 25 : 35;
                g.health -= damage;
                g.combo = 0;
                g.multiplier = 1;
                g.hitstop = 0.06; // 60ms hitstop
                g.cameraShake = 14;
                g.hitFlash = 0.15;
                sounds.playHit();

                // Spawn red impact burst
                for (let p = 0; p < 16; p++) {
                  g.particles.push({
                    x: g.player.x,
                    y: g.player.y,
                    vx: (Math.random() - 0.5) * 200,
                    vy: (Math.random() - 0.5) * 200,
                    size: 3 + Math.random() * 3,
                    color: '#ef4444',
                    alpha: 1,
                    life: 0,
                    maxLife: 0.4,
                  });
                }

                g.entities.splice(i, 1);

                if (g.health <= 0) {
                  g.state = 'GAMEOVER';
                  setGameState('GAMEOVER');
                  if (g.score > highScore) {
                    setHighScore(g.score);
                    localStorage.setItem('gayatri_game_highscore', g.score.toString());
                  }
                }
                continue;
              }
            }
          }

          // Cull off-screen entities
          if (ent.y > canvas.height + 40) {
            g.entities.splice(i, 1);
          }
        }

        // Update particles
        for (let i = g.particles.length - 1; i >= 0; i--) {
          const p = g.particles[i];
          p.life += dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);
          if (p.life >= p.maxLife) {
            g.particles.splice(i, 1);
          }
        }

        // Passive scoring
        g.score += Math.round(15 * dt * g.multiplier);

        // Camera shake decay
        if (g.cameraShake > 0) {
          g.cameraShake -= 30 * dt;
          if (g.cameraShake < 0) g.cameraShake = 0;
        }

        if (g.hitFlash > 0) {
          g.hitFlash -= dt;
        }

        // Push state updates periodically for React perimeter HUD
        setScore(g.score);
        setHealth(Math.max(0, g.health));
        setPulseEnergy(Math.round(g.pulseEnergy));
        setMultiplier(g.multiplier);
      }

      // ==========================================
      // RENDERING CANVAS PIPELINE (Cybernetic Slate)
      // ==========================================
      ctx.save();

      // Screen shake translation
      if (g.cameraShake > 0) {
        const sx = (Math.random() - 0.5) * g.cameraShake;
        const sy = (Math.random() - 0.5) * g.cameraShake;
        ctx.translate(sx, sy);
      }

      // Clear Canvas to canvas base #0a0f18
      ctx.fillStyle = '#0a0f18';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyber Grid matrix scrolling downward
      g.bgGridOffset = (g.bgGridOffset + 70 * (g.state === 'PLAYING' ? g.speedMultiplier : 0.4) * dt) % 36;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = g.bgGridOffset; y < canvas.height; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Particles
      for (const p of g.particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Entities
      for (const ent of g.entities) {
        ctx.save();
        ctx.translate(ent.x, ent.y);

        if (ent.type === 'packet') {
          // Cyan Diamond Data Packet
          ctx.fillStyle = ent.color;
          ctx.shadowColor = '#00d2ff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(0, -ent.radius);
          ctx.lineTo(ent.radius, 0);
          ctx.lineTo(0, ent.radius);
          ctx.lineTo(-ent.radius, 0);
          ctx.closePath();
          ctx.fill();
        } else if (ent.type === 'booster') {
          // Radiant Emerald Octagon
          ctx.fillStyle = ent.color;
          ctx.shadowColor = '#00f5a0';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(0, 0, ent.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#0a0f18';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, ent.radius * 0.5, 0, Math.PI * 2);
          ctx.stroke();
        } else if (ent.type === 'leak') {
          // Red Rotating Spike Hazard
          ctx.rotate(ent.angle || 0);
          ctx.fillStyle = ent.color;
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 10;

          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const rot = (s / 6) * Math.PI * 2;
            const r = s % 2 === 0 ? ent.radius : ent.radius * 0.45;
            const px = Math.cos(rot) * r;
            const py = Math.sin(rot) * r;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        } else if (ent.type === 'null_ptr') {
          // Violet Null Pointer Anomaly
          ctx.fillStyle = ent.color;
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(0, 0, ent.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, ent.radius * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Draw Player Cursor (High precision cybernetic kernel ship)
      if (g.state === 'PLAYING' || g.state === 'PAUSED') {
        ctx.save();
        ctx.translate(g.player.x, g.player.y);

        // Shield glow if active
        if (g.player.shieldActive) {
          ctx.strokeStyle = '#00d2ff';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#00d2ff';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(0, 0, g.player.radius + 8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Ship body
        ctx.fillStyle = '#00d2ff';
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(0, -g.player.radius);
        ctx.lineTo(g.player.radius * 0.9, g.player.radius * 0.8);
        ctx.lineTo(0, g.player.radius * 0.4);
        ctx.lineTo(-g.player.radius * 0.9, g.player.radius * 0.8);
        ctx.closePath();
        ctx.fill();

        // Ship core
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Hit Flash overlay
      if (g.hitFlash > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${g.hitFlash * 2.5})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.restore();

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="game" className={`relative bg-[#0a0f18] ${isFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : 'py-12 sm:py-16 border-t border-[#252a34]'}`}>
      <div className={`mx-auto ${isFullscreen ? 'w-full h-full' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
        
        {/* Section Header (if not full screen) */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#252a34]">
            <div>
              <div className="text-xs font-mono text-[#00f5a0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Interactive Kernel Arcade Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
                Cyber Kernel Matrix: Neural Runner
              </h2>
              <p className="mt-1 text-sm text-[#bbc9cf]">
                60 FPS hardware-accelerated memory bus challenge. Harvest data packets, dodge memory leaks, and deploy quantum EMP pulses.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(true)}
                className="cyber-btn-secondary px-3 py-1.5 rounded text-xs flex items-center gap-1.5"
                title="Expand to Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        )}

        {/* Game Shell Container */}
        <div className={`relative rounded-xl overflow-hidden bg-[#0a0f18] border border-[#252a34] shadow-[0_0_35px_rgba(0,210,255,0.15)] flex flex-col items-center justify-center ${
          isFullscreen ? 'w-full h-full rounded-none border-0' : 'h-[620px]'
        }`}>
          
          {/* Main 60 FPS HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            width={720}
            height={560}
            className="w-full h-full object-contain cursor-crosshair"
          />

          {/* World-Matched Low-Occlusion Perimeter Status Cluster (85% playfield unobstructed) */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono select-none">
            
            {/* Left Status: Score & Multiplier */}
            <div className="flex items-center gap-4 bg-[#0f172a]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#252a34]">
              <div>
                <span className="text-[#859399] text-[10px] block">SCORE</span>
                <span className="text-base font-bold text-[#00d2ff] tabular-nums">{score.toLocaleString()}</span>
              </div>
              <div className="border-l border-[#252a34] pl-3">
                <span className="text-[#859399] text-[10px] block">MULTIPLIER</span>
                <span className="text-sm font-bold text-[#00f5a0] tabular-nums">{multiplier}x</span>
              </div>
            </div>

            {/* Center Status: High Score */}
            <div className="hidden sm:flex items-center gap-2 bg-[#0f172a]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#252a34]">
              <Trophy className="w-3.5 h-3.5 text-[#ffd79f]" />
              <span className="text-[#859399] text-[10px]">RECORD:</span>
              <span className="text-xs font-bold text-white tabular-nums">{highScore.toLocaleString()}</span>
            </div>

            {/* Right Status: Health, Energy & Audio Mute Control */}
            <div className="flex items-center gap-3 bg-[#0f172a]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#252a34]">
              <div>
                <span className="text-[#859399] text-[10px] block">KERNEL HEALTH</span>
                <div className="w-20 h-2 bg-[#171c25] rounded overflow-hidden mt-0.5">
                  <div 
                    className={`h-full transition-all duration-150 ${health > 40 ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`} 
                    style={{ width: `${health}%` }} 
                  />
                </div>
              </div>

              <div className="border-l border-[#252a34] pl-3">
                <span className="text-[#859399] text-[10px] block">EMP PULSE</span>
                <div className="w-16 h-2 bg-[#171c25] rounded overflow-hidden mt-0.5">
                  <div className="h-full bg-[#00d2ff]" style={{ width: `${pulseEnergy}%` }} />
                </div>
              </div>

              {/* Mute toggle button (pointer events re-enabled) */}
              <button
                onClick={toggleMute}
                className="pointer-events-auto p-1.5 rounded text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors ml-1"
                title={isMuted ? 'Unmute Sound (M)' : 'Mute Sound (M)'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#ef4444]" /> : <Volume2 className="w-4 h-4 text-[#00d2ff]" />}
              </button>

              {isFullscreen && (
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="pointer-events-auto p-1.5 rounded text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors"
                  title="Exit Fullscreen (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Flat Control-Hint Line at bottom */}
          <div className="absolute bottom-2.5 left-0 right-0 text-center pointer-events-none text-[11px] font-mono text-[#859399]/80 select-none">
            WASD / Arrows to Move · Space Pulse Shield (40% EMP) · Esc Pause · M Mute
          </div>

          {/* ======================================================== */}
          {/* TITLE SCREEN MODAL (Game Shell Specification)            */}
          {/* ======================================================== */}
          {gameState === 'TITLE' && (
            <div className="absolute inset-0 bg-[#0a0f18]/92 flex flex-col items-center justify-center p-6 text-center select-none z-20">
              
              {/* Bespoke inline SVG Title Lockup */}
              <div className="mb-6">
                <svg width="340" height="74" viewBox="0 0 340 74" fill="none" className="max-w-full">
                  <rect x="2" y="2" width="336" height="70" rx="6" stroke="#00d2ff" strokeOpacity="0.4" strokeWidth="2" />
                  <path d="M12 20L20 12M328 54L320 62" stroke="#00d2ff" strokeWidth="2" />
                  <text x="170" y="36" textAnchor="middle" fill="#00d2ff" fontFamily="JetBrains Mono" fontSize="18" fontWeight="800" letterSpacing="3">
                    CYBER KERNEL MATRIX
                  </text>
                  <text x="170" y="56" textAnchor="middle" fill="#dee2f0" fontFamily="Inter" fontSize="11" fontWeight="600" letterSpacing="4">
                    NEURAL RUNNER · 60 FPS
                  </text>
                </svg>
              </div>

              <p className="text-xs sm:text-sm text-[#bbc9cf] max-w-md mb-8 leading-relaxed font-sans">
                Navigate Gayatri's high-throughput memory bus. Collect cyan data packets, evade memory leaks, and trigger EMP blast waves.
              </p>

              {/* Primary Start CTA */}
              <button
                onClick={startGame}
                className="cyber-btn-primary px-8 py-3 text-sm font-bold tracking-wider rounded-lg flex items-center gap-2 shadow-[0_0_24px_rgba(0,210,255,0.4)] animate-bounce"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ENGAGE SIMULATION [ENTER / SPACE]</span>
              </button>

              <div className="mt-8 text-xs font-mono text-[#859399]">
                High Score Record: <span className="text-[#00f5a0] font-bold">{highScore.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* PAUSED MODAL                                             */}
          {/* ======================================================== */}
          {gameState === 'PAUSED' && (
            <div className="absolute inset-0 bg-[#0a0f18]/85 flex flex-col items-center justify-center p-6 text-center select-none z-20">
              <h3 className="text-2xl font-bold font-mono text-[#00d2ff] mb-2 tracking-wider">
                SIMULATION PAUSED
              </h3>
              <p className="text-xs font-mono text-[#859399] mb-6">
                Press Escape or click below to resume kernel execution.
              </p>
              <button
                onClick={() => {
                  gameRef.current.state = 'PLAYING';
                  setGameState('PLAYING');
                }}
                className="cyber-btn-primary px-6 py-2.5 text-xs font-bold rounded"
              >
                Resume Run
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* GAME OVER MODAL                                          */}
          {/* ======================================================== */}
          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-[#0a0f18]/92 flex flex-col items-center justify-center p-6 text-center select-none z-20 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 flex items-center justify-center mb-3 text-[#ffb4ab]">
                <X className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold font-mono text-[#ffb4ab] mb-1 tracking-wider">
                KERNEL SEGMENTATION FAULT
              </h3>
              <p className="text-xs font-mono text-[#859399] mb-4">
                Memory boundaries breached by unhandled null pointer anomaly.
              </p>

              <div className="bg-[#171c25] p-4 rounded-lg border border-[#252a34] mb-6 w-full max-w-xs space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#859399]">FINAL SCORE:</span>
                  <span className="text-[#00d2ff] font-bold text-sm tabular-nums">{score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#859399]">ALL-TIME RECORD:</span>
                  <span className="text-[#00f5a0] font-bold tabular-nums">{highScore.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={startGame}
                className="cyber-btn-primary px-8 py-3 text-sm font-bold tracking-wider rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETRY KERNEL RUN [SPACE]</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
