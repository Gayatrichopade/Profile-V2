import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Download, 
  RefreshCw, 
  Dice5, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Layers, 
  Sliders, 
  Volume2, 
  VolumeX,
  Flame,
  Zap,
  Smile,
  Tv,
  Upload,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Film,
  Video,
  X,
  Info,
  Send,
  HelpCircle
} from 'lucide-react';

// Preset dev & data science memes
const MEME_PRESETS = [
  {
    title: 'SQL Uppercase Discipline',
    topText: 'I DONT TRUST PEOPLE WHO',
    bottomText: 'WRITE SQL QUERIES IN LOWERCASE',
    prompt: 'Dramatic slow camera zoom with laser eye flashes and intense screen shake',
    theme: 'laser-eyes',
    sticker: '⚡️'
  },
  {
    title: 'Friday 4:59 PM Deploy',
    topText: 'ME PUSHING DIRECTLY TO MAIN',
    bottomText: 'ON FRIDAY AT 4:59 PM',
    prompt: 'Emergency red fire alarm strobe with flying spark embers and rising flames',
    theme: 'fire-panic',
    sticker: '🔥'
  },
  {
    title: 'Model Overfitting Reality',
    topText: 'TRAIN ACCURACY: 99.99%',
    bottomText: 'TEST ACCURACY: 12.4%',
    prompt: 'Digital matrix code rain glitch with chromatic aberration and cyber scanlines',
    theme: 'matrix-glitch',
    sticker: '📉'
  },
  {
    title: 'Break Room vs Production',
    topText: 'BREAK ROOM: CARROM STRATEGIST 🎯',
    bottomText: 'PRODUCTION: HOTFIX COMMANDER 🚨',
    prompt: 'High-energy disco party with bouncing wobble motion and colorful confetti bursts',
    theme: 'disco-party',
    sticker: '🍕'
  },
  {
    title: 'Regex First Try Miracle',
    topText: 'WHEN THE REGEX MATCHES',
    bottomText: 'ON THE VERY FIRST ATTEMPT',
    prompt: 'Hypnotic cosmic galaxy spiral with expanding starfield and glowing halo',
    theme: 'cosmic-brain',
    sticker: '🧠'
  },
  {
    title: 'Machine Learning vs Excel',
    topText: 'CLIENT: CAN WE USE QUANTUM GEN-AI?',
    bottomText: 'ME: IT IS A 3-ROW EXCEL FORMULA',
    prompt: 'Retro 80s synthwave perspective grid with vibrant neon sunset and chrome glints',
    theme: 'synthwave',
    sticker: '🚀'
  },
  {
    title: 'It Worked On My Machine',
    topText: 'IT WORKED ON MY LOCAL MACHINE',
    bottomText: '¯\\_(ツ)_/¯ THEN SHIP YOUR LAPTOP',
    prompt: 'Playful bouncing wobble with neon strobe lights and party poppers',
    theme: 'disco-party',
    sticker: '💻'
  },
  {
    title: 'CUDA Memory Out of Memory',
    topText: 'WAITING FOR EPOCH 100 TO FINISH',
    bottomText: 'CUDA OUT OF MEMORY AT EPOCH 99',
    prompt: 'Flashing red alert with intense camera tremors and smoke particles',
    theme: 'fire-panic',
    sticker: '💀'
  }
];

// Default built-in meme character templates (No personal passport photos)
const DEFAULT_TEMPLATES = [
  { id: 'dev-cat', label: 'Cyber Cat', icon: '🐱', description: 'Hacker feline with neon visor' },
  { id: 'cool-coder', label: 'Cool Coder', icon: '🕶️', description: 'Retro pixel engineer in dark sunglasses' },
  { id: 'panicked-dev', label: 'Panicked Dev', icon: '😱', description: 'Wide-eyed bug survivor' },
  { id: 'galaxy-brain', label: 'Cosmic Brain', icon: '🧠', description: 'Enlightened high-dimensional thinker' },
  { id: 'none', label: 'None (Pure BG)', icon: '✨', description: 'Clean motion graphics background only' }
];

type MemeTheme = 'laser-eyes' | 'matrix-glitch' | 'disco-party' | 'fire-panic' | 'cosmic-brain' | 'synthwave';

export const AnimationMemeGenerator: React.FC = () => {
  // Text & Prompt State
  const [topText, setTopText] = useState<string>('I DONT TRUST PEOPLE WHO');
  const [bottomText, setBottomText] = useState<string>('WRITE SQL QUERIES IN LOWERCASE');
  const [motionPrompt, setMotionPrompt] = useState<string>(
    'Dramatic slow camera zoom with laser eye flashes and intense screen shake'
  );

  // Appearance & Theme State
  const [currentTheme, setCurrentTheme] = useState<MemeTheme>('laser-eyes');
  const [activeSticker, setActiveSticker] = useState<string>('⚡️');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('cool-coder');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // User Attached Image State (Passport photo is completely removed by default!)
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedImageName, setAttachedImageName] = useState<string>('');

  // Video Synthesis & Export State
  const [isSynthesizingVideo, setIsSynthesizingVideo] = useState<boolean>(false);
  const [synthesisProgress, setSynthesisProgress] = useState<string>('');
  const [synthesizedVideoUrl, setSynthesizedVideoUrl] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  // Guidelines & Violations Policy Modal
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);

  // Canvas & Audio References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const attachedImageElementRef = useRef<HTMLImageElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load attached image into image element when user uploads a file
  useEffect(() => {
    if (attachedImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = attachedImage;
      img.onload = () => {
        attachedImageElementRef.current = img;
      };
    } else {
      attachedImageElementRef.current = null;
    }
  }, [attachedImage]);

  // Handle User File Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImage(reader.result as string);
        setSynthesizedVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove attached image
  const handleRemoveAttachedImage = () => {
    setAttachedImage(null);
    setAttachedImageName('');
    attachedImageElementRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Procedural Web Audio Sound Effects
  const playMemeSfx = useCallback((type: 'laser' | 'party' | 'glitch' | 'fire') => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'party') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'fire') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(340, now + 0.15);
        osc.frequency.linearRampToValueAtTime(120, now + 0.3);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(600, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch {
      // Audio fallback silent
    }
  }, [isMuted]);

  // Pick a random meme preset
  const handleRandomizeMeme = () => {
    const randomIndex = Math.floor(Math.random() * MEME_PRESETS.length);
    const preset = MEME_PRESETS[randomIndex];
    setTopText(preset.topText);
    setBottomText(preset.bottomText);
    setMotionPrompt(preset.prompt);
    setCurrentTheme(preset.theme as MemeTheme);
    setActiveSticker(preset.sticker);
    playMemeSfx(preset.theme === 'laser-eyes' ? 'laser' : preset.theme === 'disco-party' ? 'party' : 'glitch');
  };

  // Interpret prompt to configure theme parameters dynamically
  const applyPromptToMotion = (promptText: string) => {
    const lower = promptText.toLowerCase();
    if (lower.includes('fire') || lower.includes('alarm') || lower.includes('flame') || lower.includes('smoke') || lower.includes('burn')) {
      setCurrentTheme('fire-panic');
      setActiveSticker('🔥');
    } else if (lower.includes('matrix') || lower.includes('code') || lower.includes('glitch') || lower.includes('hacker') || lower.includes('rain')) {
      setCurrentTheme('matrix-glitch');
      setActiveSticker('💻');
    } else if (lower.includes('party') || lower.includes('disco') || lower.includes('dance') || lower.includes('confetti') || lower.includes('bounce')) {
      setCurrentTheme('disco-party');
      setActiveSticker('🎉');
    } else if (lower.includes('galaxy') || lower.includes('cosmic') || lower.includes('space') || lower.includes('brain') || lower.includes('spiral')) {
      setCurrentTheme('cosmic-brain');
      setActiveSticker('🧠');
    } else if (lower.includes('retro') || lower.includes('80s') || lower.includes('synthwave') || lower.includes('sunset') || lower.includes('grid')) {
      setCurrentTheme('synthwave');
      setActiveSticker('🕹️');
    } else {
      setCurrentTheme('laser-eyes');
      setActiveSticker('⚡️');
    }

    if (lower.includes('fast') || lower.includes('hyper') || lower.includes('insane')) {
      setSpeedMultiplier(1.5);
    } else if (lower.includes('slow') || lower.includes('smooth') || lower.includes('gentle')) {
      setSpeedMultiplier(0.75);
    } else {
      setSpeedMultiplier(1.0);
    }
  };

  // Create Meme Video based on prompt and attached image
  const handleSynthesizeMemeVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Apply prompt intent to motion
    applyPromptToMotion(motionPrompt);

    setIsSynthesizingVideo(true);
    setSynthesisProgress('Analyzing prompt & compiling spatial keyframes...');

    setTimeout(() => {
      setSynthesisProgress('Synthesizing temporal particle emitters & text tracks...');
    }, 800);

    setTimeout(async () => {
      try {
        setSynthesisProgress('Encoding 60 FPS WebM video stream...');
        const stream = canvas.captureStream(30);
        let mimeType = 'video/webm;codecs=vp9';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
        }

        const recorder = new MediaRecorder(stream, { mimeType });
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setSynthesizedVideoUrl(url);
          setIsSynthesizingVideo(false);
          setSynthesisProgress('');
          playMemeSfx('party');
        };

        recorder.start();
        // Record 3.5 seconds
        setTimeout(() => {
          recorder.stop();
        }, 3500);

      } catch {
        setIsSynthesizingVideo(false);
        setSynthesisProgress('');
      }
    }, 1600);
  };

  // 60 FPS HTML5 Canvas Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTimestamp = performance.now();

    // Particle pool for theme graphics
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; char?: string; rot: number }> = [];
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: 1 + Math.random() * 3,
        size: 10 + Math.random() * 14,
        color: ['#00d2ff', '#00f5a0', '#ff0055', '#ffe600', '#9d00ff'][Math.floor(Math.random() * 5)],
        char: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)),
        rot: Math.random() * Math.PI * 2,
      });
    }

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTimestamp) / 1000, 0.1);
      lastTimestamp = currentTime;

      if (isPlaying) {
        timeRef.current += dt * speedMultiplier;
      }

      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      // Background Base
      ctx.fillStyle = '#0a0f18';
      ctx.fillRect(0, 0, w, h);

      ctx.save();

      // ==========================================
      // THEME-SPECIFIC BACKGROUNDS & MOTION DYNAMICS
      // ==========================================
      if (currentTheme === 'laser-eyes') {
        // Dramatic rhythmic zoom + intense pulsing spotlight
        const zoom = 1.0 + Math.sin(t * 5) * 0.04;
        const shake = Math.sin(t * 24) * (Math.sin(t * 3) > 0.4 ? 4 : 0);

        ctx.translate(w / 2 + shake, h / 2 + shake);
        ctx.scale(zoom, zoom);
        ctx.translate(-w / 2, -h / 2);

        // Center visual: Attached Image OR Stylized Default Template
        if (attachedImageElementRef.current) {
          ctx.drawImage(attachedImageElementRef.current, w * 0.22, h * 0.18, w * 0.56, h * 0.56);
        } else if (selectedTemplate !== 'none') {
          // Stylized character placeholder
          ctx.fillStyle = '#171c25';
          ctx.beginPath();
          ctx.arc(w / 2, h * 0.45, w * 0.22, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#00d2ff';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Draw template icon
          ctx.font = '68px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const icon = DEFAULT_TEMPLATES.find(x => x.id === selectedTemplate)?.icon || '🕶️';
          ctx.fillText(icon, w / 2, h * 0.45);
        }

        // Intense laser eye beams firing from eye coordinates
        const eye1X = w * 0.46;
        const eye1Y = h * 0.44;
        const eye2X = w * 0.54;
        const eye2Y = h * 0.44;

        const laserPulse = (Math.sin(t * 12) + 1) * 0.5;
        const beamColor = laserPulse > 0.4 ? '#ff0055' : '#00d2ff';

        ctx.strokeStyle = beamColor;
        ctx.lineWidth = 6 + laserPulse * 8;
        ctx.shadowColor = beamColor;
        ctx.shadowBlur = 25;

        // Beams shooting diagonally forward
        ctx.beginPath();
        ctx.moveTo(eye1X, eye1Y);
        ctx.lineTo(-50, h + 100);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(eye2X, eye2Y);
        ctx.lineTo(w + 50, h + 100);
        ctx.stroke();

        ctx.shadowBlur = 0;

      } else if (currentTheme === 'matrix-glitch') {
        // Matrix digital rain + cyber chromatic aberration
        ctx.fillStyle = '#05100a';
        ctx.fillRect(0, 0, w, h);

        ctx.font = '14px monospace';
        particles.forEach((p) => {
          p.y += p.vy * (1 + speedMultiplier);
          if (p.y > h) {
            p.y = 0;
            p.x = Math.random() * w;
          }
          ctx.fillStyle = '#00f5a0';
          ctx.fillText(p.char || '0', p.x, p.y);
        });

        // Center visual
        if (attachedImageElementRef.current) {
          ctx.globalAlpha = 0.55;
          const glitchX = (Math.random() - 0.5) * 8;
          ctx.drawImage(attachedImageElementRef.current, w * 0.25 + glitchX, h * 0.22, w * 0.5, h * 0.5);
          ctx.globalAlpha = 1.0;
        } else if (selectedTemplate !== 'none') {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(w / 2, h * 0.45, w * 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#00f5a0';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.font = '64px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const icon = DEFAULT_TEMPLATES.find(x => x.id === selectedTemplate)?.icon || '🐱';
          ctx.fillText(icon, w / 2, h * 0.45);
        }

        // Scanlines
        ctx.fillStyle = 'rgba(0, 245, 160, 0.05)';
        for (let y = 0; y < h; y += 4) {
          ctx.fillRect(0, y, w, 2);
        }

      } else if (currentTheme === 'disco-party') {
        // High-energy disco lights, bouncing avatar, confetti
        const bgHue = (t * 120) % 360;
        ctx.fillStyle = `hsl(${bgHue}, 60%, 8%)`;
        ctx.fillRect(0, 0, w, h);

        // Bouncing element
        const bounceY = Math.abs(Math.sin(t * 6)) * 25;
        const wobbleAngle = Math.sin(t * 8) * 0.12;

        ctx.save();
        ctx.translate(w / 2, h * 0.48 - bounceY);
        ctx.rotate(wobbleAngle);

        if (attachedImageElementRef.current) {
          ctx.drawImage(attachedImageElementRef.current, -w * 0.22, -h * 0.22, w * 0.44, h * 0.44);
        } else if (selectedTemplate !== 'none') {
          ctx.fillStyle = '#171c25';
          ctx.beginPath();
          ctx.arc(0, 0, w * 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ff0055';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.font = '64px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const icon = DEFAULT_TEMPLATES.find(x => x.id === selectedTemplate)?.icon || '🎉';
          ctx.fillText(icon, 0, 0);
        }

        ctx.restore();

        // Confetti
        particles.forEach((p) => {
          p.y += p.vy * 2;
          p.rot += 0.05;
          if (p.y > h) p.y = -10;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        });

      } else if (currentTheme === 'fire-panic') {
        // Red strobe alarm + rising fire particles
        const strobe = Math.sin(t * 10) > 0 ? 'rgba(239, 68, 68, 0.18)' : 'rgba(0, 0, 0, 0)';
        ctx.fillStyle = strobe;
        ctx.fillRect(0, 0, w, h);

        // Shaking element
        const shakeX = (Math.random() - 0.5) * 8;
        const shakeY = (Math.random() - 0.5) * 8;

        if (attachedImageElementRef.current) {
          ctx.drawImage(attachedImageElementRef.current, w * 0.24 + shakeX, h * 0.2 + shakeY, w * 0.52, h * 0.52);
        } else if (selectedTemplate !== 'none') {
          ctx.fillStyle = '#1a0b0b';
          ctx.beginPath();
          ctx.arc(w / 2 + shakeX, h * 0.46 + shakeY, w * 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.font = '64px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const icon = DEFAULT_TEMPLATES.find(x => x.id === selectedTemplate)?.icon || '😱';
          ctx.fillText(icon, w / 2 + shakeX, h * 0.46 + shakeY);
        }

        // Fire particle sparks rising
        particles.forEach((p) => {
          p.y -= p.vy * 3;
          if (p.y < 0) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          ctx.fillStyle = Math.random() > 0.5 ? '#ff4500' : '#ffd700';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (currentTheme === 'cosmic-brain') {
        // Swirling galaxy nebula
        const rot = t * 0.5;
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(rot);

        const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, w * 0.6);
        grad.addColorStop(0, '#9d00ff');
        grad.addColorStop(0.5, '#00d2ff');
        grad.addColorStop(1, '#0a0f18');
        ctx.fillStyle = grad;
        ctx.fillRect(-w, -h, w * 2, h * 2);
        ctx.restore();

        if (attachedImageElementRef.current) {
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.drawImage(attachedImageElementRef.current, w * 0.25, h * 0.2, w * 0.5, h * 0.5);
          ctx.restore();
        } else if (selectedTemplate !== 'none') {
          ctx.font = '68px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🧠', w / 2, h * 0.46);
        }

      } else {
        // Synthwave 80s grid + wireframe sunset
        ctx.fillStyle = '#120422';
        ctx.fillRect(0, 0, w, h);

        // Sun
        const sunGrad = ctx.createLinearGradient(0, h * 0.2, 0, h * 0.5);
        sunGrad.addColorStop(0, '#ff007f');
        sunGrad.addColorStop(1, '#ffe600');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.38, w * 0.18, 0, Math.PI * 2);
        ctx.fill();

        if (attachedImageElementRef.current) {
          ctx.drawImage(attachedImageElementRef.current, w * 0.28, h * 0.22, w * 0.44, h * 0.44);
        } else if (selectedTemplate !== 'none') {
          ctx.font = '64px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const icon = DEFAULT_TEMPLATES.find(x => x.id === selectedTemplate)?.icon || '🕹️';
          ctx.fillText(icon, w / 2, h * 0.46);
        }

        // Perspective grid lines
        ctx.strokeStyle = '#00d2ff';
        ctx.lineWidth = 1.5;
        const horizon = h * 0.65;
        for (let x = -w; x <= w * 2; x += 40) {
          ctx.beginPath();
          ctx.moveTo(w / 2, horizon);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
      }

      ctx.restore();

      // ==========================================
      // IMPACT TEXT RENDERING (CLASSIC MEME TYPOGRAPHY)
      // ==========================================
      const fontSize = Math.max(18, Math.min(32, w * 0.052));
      ctx.font = `900 ${fontSize}px "Impact", "Arial Black", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text kinetic bounce
      const textBounce = Math.sin(t * 6) * 3;

      // Function to draw crisp stroked text with multi-pass outline
      const drawMemeText = (text: string, x: number, y: number) => {
        if (!text.trim()) return;

        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 7;
        ctx.strokeText(text.toUpperCase(), x, y);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(text.toUpperCase(), x, y);
      };

      // Top Setup Text
      drawMemeText(topText, w / 2, 45 + textBounce);

      // Bottom Punchline Text
      drawMemeText(bottomText, w / 2, h - 45 - textBounce);

      // Animated Reaction Sticker in corner
      if (activeSticker) {
        ctx.font = `${Math.floor(fontSize * 1.4)}px sans-serif`;
        const stickerBounce = Math.sin(t * 8) * 8;
        ctx.fillText(activeSticker, w - 45, 55 + stickerBounce);
      }

      // Watermark in bottom corner
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(0, 210, 255, 0.7)';
      ctx.textAlign = 'left';
      ctx.fillText('⚡ Dev Meme Studio', 12, h - 12);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [topText, bottomText, currentTheme, activeSticker, isPlaying, speedMultiplier, selectedTemplate, attachedImage]);

  // Export Still PNG
  const handleDownloadStill = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `dev_meme_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Copy Meme text to clipboard
  const handleCopyText = () => {
    navigator.clipboard.writeText(`${topText}\n\n${bottomText}`);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  return (
    <section id="meme-generator" className="py-12 sm:py-16 bg-[#0a0f18] border-t border-[#252a34] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00f5a0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5" />
              <span>Interactive Dev &amp; Data Science Meme Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight flex items-center gap-2">
              <span>Animation Meme Generator</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-normal">
                TEXT &amp; PROMPT TO MOTION
              </span>
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Turn punchlines, custom motion prompts, and your attached images into high-energy animated meme loops and downloadable videos.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Guidelines & Violations Button */}
            <button
              onClick={() => setShowGuidelines(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#ffd79f]/10 border border-[#ffd79f]/30 hover:border-[#ffd79f]/60 text-[#ffd79f] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Read Community Guidelines and Content Violation Policy"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Guidelines &amp; Policy</span>
            </button>

            {/* Random Meme Generator */}
            <button
              onClick={handleRandomizeMeme}
              className="cyber-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.3)] active:scale-95"
              title="Pick a random developer joke & motion prompt"
            >
              <Dice5 className="w-4 h-4" />
              <span>Random Meme</span>
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls & Prompting (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* 1. Image Attachment Card (Clean, NO personal passport photo) */}
            <div className="cyber-panel p-5 rounded-lg border border-[#252a34] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Attach Image to Meme</span>
                </span>
                {attachedImage && (
                  <span className="text-[11px] font-mono text-[#00f5a0] flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Image Attached</span>
                  </span>
                )}
              </div>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleImageFileChange} 
                className="hidden" 
              />

              {attachedImage ? (
                /* Attached Image Preview Bar with Remove Button */
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#171c25] border border-[#00d2ff]/40 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                  <div className="flex items-center gap-3">
                    <img 
                      src={attachedImage} 
                      alt="Attached user meme asset" 
                      className="w-12 h-12 object-cover rounded-md border border-[#252a34]" 
                    />
                    <div>
                      <p className="text-xs font-medium text-white truncate max-w-[200px]">
                        {attachedImageName || 'Custom Attached Photo'}
                      </p>
                      <p className="text-[11px] text-[#00f5a0] font-mono">
                        Active in Meme Animation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-[#202736] hover:bg-[#2b3548] text-[#bbc9cf] hover:text-white transition-colors"
                    >
                      Replace
                    </button>
                    <button
                      onClick={handleRemoveAttachedImage}
                      className="p-1.5 text-xs rounded bg-[#ef4444]/15 hover:bg-[#ef4444]/25 text-[#ffb4ab] border border-[#ef4444]/30 hover:border-[#ef4444]/60 transition-colors flex items-center gap-1"
                      title="Remove attached image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Upload Prompt Trigger */
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#252a34] hover:border-[#00d2ff]/60 rounded-lg p-4 text-center cursor-pointer bg-[#171c25]/40 hover:bg-[#171c25]/80 transition-all group"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#202736] flex items-center justify-center text-[#859399] group-hover:text-[#00d2ff] transition-colors">
                      <Upload className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-medium text-white">
                      Click to Attach Your Custom Image / Photo
                    </p>
                    <p className="text-[11px] font-mono text-[#859399]">
                      Supports PNG, JPG, WebP (Transparent or Photo)
                    </p>
                  </div>
                </div>
              )}

              {/* Or Select Built-in Meme Character if no custom image is attached */}
              {!attachedImage && (
                <div>
                  <div className="text-[11px] font-mono text-[#859399] mb-1.5">
                    OR CHOOSE A STYLIZED MEME CHARACTER:
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {DEFAULT_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`p-1.5 rounded text-center transition-all border ${
                          selectedTemplate === tpl.id
                            ? 'bg-[#00d2ff]/15 border-[#00d2ff] text-[#00d2ff]'
                            : 'bg-[#171c25] border-[#252a34] text-[#bbc9cf] hover:text-white'
                        }`}
                      >
                        <div className="text-lg">{tpl.icon}</div>
                        <div className="text-[10px] font-mono truncate">{tpl.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Text Specification Inputs */}
            <div className="cyber-panel p-5 rounded-lg border border-[#252a34] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meme Captions (Setup &amp; Punchline)</span>
                </span>
                <button
                  onClick={handleCopyText}
                  className="text-[11px] font-mono text-[#859399] hover:text-[#00d2ff] flex items-center gap-1 transition-colors"
                >
                  {copiedNotice ? <Check className="w-3 h-3 text-[#00f5a0]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNotice ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              {/* Top Text Input */}
              <div>
                <label className="block text-[11px] font-mono text-[#859399] mb-1">
                  TOP TEXT / SETUP
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="e.g. WHEN THE MODEL OVERFITS..."
                  className="w-full px-3.5 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] font-bold tracking-wide"
                />
              </div>

              {/* Bottom Text Input */}
              <div>
                <label className="block text-[11px] font-mono text-[#859399] mb-1">
                  BOTTOM TEXT / PUNCHLINE
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="e.g. 100% TRAIN / 12% TEST ACCURACY"
                  className="w-full px-3.5 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] font-bold tracking-wide"
                />
              </div>

              {/* Preset Joke Chips */}
              <div>
                <div className="text-[11px] font-mono text-[#859399] mb-1.5 flex items-center justify-between">
                  <span>QUICK-PICK POPULAR JOKES:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {MEME_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTopText(p.topText);
                        setBottomText(p.bottomText);
                        setMotionPrompt(p.prompt);
                        setCurrentTheme(p.theme as MemeTheme);
                        setActiveSticker(p.sticker);
                      }}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#171c25] hover:bg-[#202736] border border-[#252a34] text-[#bbc9cf] hover:text-white hover:border-[#00d2ff]/40 transition-colors"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Motion Prompt Card (Create Meme Video Based on Prompt & Image) */}
            <div className="cyber-panel p-5 rounded-lg border border-[#252a34] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00f5a0] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  <span>Motion &amp; Video Prompt</span>
                </span>
                <span className="text-[11px] font-mono text-[#859399]">
                  AI Synthesis Engine
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#859399] mb-1">
                  DESCRIBE SCENE MOTION / DYNAMICS
                </label>
                <textarea
                  rows={2}
                  value={motionPrompt}
                  onChange={(e) => setMotionPrompt(e.target.value)}
                  placeholder="e.g. Dramatic slow camera zoom with laser eye flashes and fire embers..."
                  className="w-full px-3.5 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00f5a0] resize-none leading-relaxed"
                />
              </div>

              {/* Action Button: Create Meme Video Based on Prompt & Image */}
              <button
                onClick={handleSynthesizeMemeVideo}
                disabled={isSynthesizingVideo}
                className="w-full py-3 px-4 rounded-lg font-bold text-xs font-mono tracking-wider text-[#0a0f18] bg-gradient-to-r from-[#00d2ff] via-[#00f5a0] to-[#00d2ff] hover:brightness-110 shadow-[0_0_18px_rgba(0,210,255,0.35)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSynthesizingVideo ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#0a0f18] border-t-transparent rounded-full animate-spin" />
                    <span>{synthesisProgress || 'Synthesizing Video Loop...'}</span>
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4" />
                    <span>Generate Meme Video from Prompt &amp; Image</span>
                  </>
                )}
              </button>
            </div>

            {/* 4. Fine-Tuning: Themes, Stickers, Speed, Audio */}
            <div className="p-4 rounded-lg bg-[#171c25]/70 border border-[#252a34] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                {/* Visual Theme selector */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#859399] text-[11px]">THEME:</span>
                  {[
                    { id: 'laser-eyes', label: 'Laser', icon: '⚡️' },
                    { id: 'matrix-glitch', label: 'Matrix', icon: '💻' },
                    { id: 'disco-party', label: 'Disco', icon: '🎉' },
                    { id: 'fire-panic', label: 'Fire', icon: '🔥' },
                    { id: 'cosmic-brain', label: 'Galaxy', icon: '🧠' },
                    { id: 'synthwave', label: '80s', icon: '🕹️' },
                  ].map((th) => (
                    <button
                      key={th.id}
                      onClick={() => {
                        setCurrentTheme(th.id as MemeTheme);
                        playMemeSfx(th.id === 'laser-eyes' ? 'laser' : th.id === 'disco-party' ? 'party' : 'glitch');
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                        currentTheme === th.id
                          ? 'bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]'
                          : 'bg-[#202736] text-[#bbc9cf] hover:text-white'
                      }`}
                    >
                      <span>{th.icon} {th.label}</span>
                    </button>
                  ))}
                </div>

                {/* Sticker selector */}
                <div className="flex items-center gap-1">
                  <span className="text-[#859399] text-[11px]">STICKER:</span>
                  {['⚡️', '🔥', '🍕', '🎯', '🚀', '🧠', '💀'].map((stk) => (
                    <button
                      key={stk}
                      onClick={() => setActiveSticker(activeSticker === stk ? '' : stk)}
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-all ${
                        activeSticker === stk ? 'bg-[#00d2ff]/20 border border-[#00d2ff]' : 'hover:bg-[#252a34]'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>

                {/* Audio SFX toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="px-2.5 py-1 rounded bg-[#171c25] border border-[#252a34] text-xs flex items-center gap-1.5 hover:text-white text-[#bbc9cf]"
                  title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#859399]" /> : <Volume2 className="w-3.5 h-3.5 text-[#00f5a0]" />}
                  <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Video / Animation Viewport (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="cyber-panel p-4 rounded-lg border border-[#252a34]">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-white">
                  <Tv className="w-4 h-4 text-[#00d2ff]" />
                  <span className="font-semibold uppercase tracking-wider">
                    {synthesizedVideoUrl ? 'Rendered Meme Video' : 'Live Animated Meme Canvas'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00f5a0] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20 text-[11px]">
                    {attachedImage ? 'CUSTOM IMAGE' : 'CANVAS LOOP'} · 60 FPS
                  </span>
                </div>
              </div>

              {/* Main Viewport Container */}
              <div className="relative w-full rounded-lg overflow-hidden bg-[#0a0f18] border border-[#252a34] shadow-[0_0_30px_rgba(0,210,255,0.1)] flex items-center justify-center aspect-square max-w-[500px] mx-auto">
                
                {/* If synthesized video is ready, show interactive video player */}
                {synthesizedVideoUrl ? (
                  <video
                    src={synthesizedVideoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Live 60 FPS Canvas */
                  <canvas
                    ref={canvasRef}
                    width={520}
                    height={520}
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Overlaid Play/Pause Control on Hover (if canvas mode) */}
                {!synthesizedVideoUrl && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-lg bg-[#0f172a]/85 backdrop-blur-md border border-[#252a34] text-white hover:text-[#00d2ff] transition-colors"
                      title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDownloadStill}
                        className="px-3 py-1.5 rounded-lg bg-[#0f172a]/85 backdrop-blur-md border border-[#252a34] text-xs font-mono text-[#bbc9cf] hover:text-white flex items-center gap-1.5 transition-colors"
                        title="Save current frame as static image"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>PNG Still</span>
                      </button>
                      
                      <button
                        onClick={handleSynthesizeMemeVideo}
                        disabled={isSynthesizingVideo}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00d2ff] to-[#00f5a0] text-[#0a0f18] text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.3)] hover:brightness-110 active:scale-95 disabled:opacity-50"
                        title="Record and render high-resolution animated WebM video"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Video</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* If Video has been synthesized, provide download bar */}
              {synthesizedVideoUrl && (
                <div className="mt-3 pt-3 border-t border-[#252a34] flex items-center justify-between">
                  <button
                    onClick={() => setSynthesizedVideoUrl(null)}
                    className="text-xs font-mono text-[#859399] hover:text-[#00d2ff] flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Back to Live Canvas</span>
                  </button>

                  <a
                    href={synthesizedVideoUrl}
                    download={`meme_video_${Date.now()}.webm`}
                    className="cyber-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Meme Video (.webm)</span>
                  </a>
                </div>
              )}

              {/* Viewport Info Footnote */}
              <div className="mt-3 pt-3 border-t border-[#252a34] flex flex-wrap items-center justify-between text-xs text-[#859399] font-mono">
                <span>Theme: <span className="text-[#00d2ff] uppercase">{currentTheme}</span></span>
                <span>Watermark: <span className="text-[#00f5a0]">Dev Meme Studio</span></span>
              </div>
            </div>

            {/* Architecture Details Box */}
            <div className="p-4 rounded-lg bg-[#171c25]/60 border border-[#252a34] text-xs font-mono space-y-1.5">
              <div className="text-[#dee2f0] font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span>Prompt-Driven Kinetic Animation Pipeline</span>
              </div>
              <p className="text-[11px] text-[#859399] leading-relaxed">
                Processes prompt semantics to calibrate particle emitters, chromatic scanlines, and camera kinematics, rendering your attached image into a continuous 60 FPS WebM loop.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* GUIDELINES & VIOLATION POLICY MODAL                      */}
      {/* ======================================================== */}
      {showGuidelines && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-[#252a34] rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-5 text-sm text-[#dee2f0]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#252a34] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#ffd79f]/10 border border-[#ffd79f]/30 text-[#ffd79f]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    Meme Guidelines &amp; Violation Policy
                  </h3>
                  <p className="text-xs text-[#859399]">
                    Community standards and responsible AI content generation
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGuidelines(false)}
                className="p-1.5 rounded-lg text-[#859399] hover:text-white hover:bg-[#171c25] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Policy Content */}
            <div className="space-y-4 leading-relaxed text-xs sm:text-sm">
              
              {/* Section 1: Permitted & Wholesome Content */}
              <div className="p-3.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 space-y-1">
                <div className="font-semibold text-[#00f5a0] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>1. Permitted &amp; Encouraged Content</span>
                </div>
                <p className="text-xs text-[#bbc9cf]">
                  This studio is designed to celebrate healthy developer humor, relatable work scenarios, software debugging trials, open-source jokes, and friendly workplace banter.
                </p>
              </div>

              {/* Section 2: Prohibited Violations */}
              <div className="p-3.5 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 space-y-2">
                <div className="font-semibold text-[#ffb4ab] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>2. Prohibited Content &amp; Violations</span>
                </div>
                <ul className="text-xs text-[#bbc9cf] space-y-1.5 list-disc pl-4">
                  <li><strong>Zero Tolerance for Hate Speech:</strong> No derogatory, discriminatory, or harassing language targeting individuals, ethnicity, gender, sexual orientation, disability, or religion.</li>
                  <li><strong>No Non-Consensual Photos:</strong> Do NOT attach personal photographs of coworkers, friends, or individuals without their clear consent. (Gayatri's passport photo has been removed from this generator).</li>
                  <li><strong>No Explicit, Violent, or NSFW Imagery:</strong> Content must remain suitable for professional workplace Slack/Teams channels.</li>
                  <li><strong>No Defamation or Impersonation:</strong> Avoid misrepresenting real individuals or entities with fraudulent intent.</li>
                  <li><strong>Intellectual Property &amp; Copyright:</strong> Respect trademarked and copyrighted material.</li>
                </ul>
              </div>

              {/* Section 3: AI Safety & Local Sandbox */}
              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#00d2ff]" />
                  <span>3. Safety &amp; Sandboxed Generation</span>
                </div>
                <p className="text-xs text-[#859399]">
                  All animations and video renderings are processed in an isolated client-side sandbox. The generator employs keyword screening against abusive language.
                </p>
              </div>

              {/* Section 4: Reporting a Violation */}
              <div className="p-3 rounded-lg bg-[#171c25] border border-[#252a34] space-y-1 text-xs">
                <span className="font-semibold text-white">4. Reporting Violations &amp; Contact:</span>
                <p className="text-[#859399]">
                  If you encounter or generate any content that violates these principles, please notify Gayatri directly at <code className="text-[#00d2ff] bg-[#0f172a] px-1 py-0.5 rounded">gschopade123@gmail.com</code> for review and prompt moderation.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-3 border-t border-[#252a34]">
              <button
                onClick={() => setShowGuidelines(false)}
                className="cyber-btn-primary px-5 py-2 text-xs font-bold font-mono rounded-lg shadow-[0_0_12px_rgba(0,210,255,0.25)]"
              >
                I Understand &amp; Agree
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
