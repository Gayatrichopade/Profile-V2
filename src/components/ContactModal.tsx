import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Copy, Check, Send, Sparkles, MapPin, ExternalLink, Heart } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Enterprise Analytics / ML Project',
    message: '',
  });

  const celebrationCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Particle celebration animation on submit
  useEffect(() => {
    if (!submitted || !celebrationCanvasRef.current) return;
    const canvas = celebrationCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    const height = (canvas.height = 200);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
      life: number;
    }> = [];

    const colors = ['#00d2ff', '#00f5a0', '#ffd79f', '#38bdf8', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        r: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 0.016;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha = Math.max(0, 1 - p.life / 1.8);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.some((p) => p.alpha > 0)) {
        animId = requestAnimationFrame(drawParticles);
      }
    };

    drawParticles();

    return () => cancelAnimationFrame(animId);
  }, [submitted]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg rounded-xl bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_35px_rgba(0,210,255,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252a34] bg-[#171c25]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Get in Touch · Gayatri Chopade
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 relative">
          
          {/* Quick Direct Email Card */}
          <div className="p-4 rounded-lg bg-[#0a0f18] border border-[#252a34] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#859399]">PRIMARY INBOX</span>
              <span className="text-xs font-mono text-[#00f5a0]">DIRECT COMMUNICATION</span>
            </div>
            
            <div className="flex items-center justify-between gap-3 text-sm font-mono text-[#00d2ff]">
              <span className="truncate">{PROFILE_INFO.email}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-xs rounded bg-[#171c25] hover:bg-[#252a34] text-white border border-[#252a34] transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                      <span className="text-[#00f5a0]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="p-1.5 rounded bg-[#171c25] hover:bg-[#252a34] text-white border border-[#252a34] transition-colors"
                  title="Open mail client"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 rounded-lg bg-[#10b981]/10 border border-[#10b981]/40 text-center space-y-3 relative overflow-hidden">
              <canvas
                ref={celebrationCanvasRef}
                className="absolute inset-0 pointer-events-none w-full h-full"
              />

              <div className="w-12 h-12 rounded-full bg-[#10b981]/20 text-[#00f5a0] flex items-center justify-center mx-auto shadow-[0_0_20px_#00f5a0]">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Transmission Delivered!</h4>
              <p className="text-xs text-[#dee2f0] leading-relaxed">
                Thank you for reaching out, <strong>{formData.name || 'friend'}</strong>! Your message has been dispatched directly to <strong className="text-[#00d2ff]">{PROFILE_INFO.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="cyber-btn-primary px-5 py-2 text-xs rounded font-bold mt-3 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
              >
                Return to Portfolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#bbc9cf] mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jordan Blake"
                    className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#bbc9cf] mb-1.5">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@enterprise.com"
                    className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#bbc9cf] mb-1.5">
                  TOPIC / INQUIRY
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]"
                >
                  <option value="Enterprise Analytics / ML Project">Enterprise Analytics &amp; ML Solutions</option>
                  <option value="Production Sequencing">AI/ML Production Sequencing &amp; Optimization</option>
                  <option value="Power BI & Automation">Power BI Dashboards &amp; Power Automate</option>
                  <option value="Mentorship & Speaking">Technical Mentorship &amp; Speaking</option>
                  <option value="Career & Collaboration">Career &amp; Research Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#bbc9cf] mb-1.5">
                  MESSAGE DETAILS *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your analytics challenge, pipeline requirements, or inquiry..."
                  className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#859399]">
                  Direct routing to {PROFILE_INFO.email}
                </span>

                <button
                  type="submit"
                  className="cyber-btn-primary px-5 py-2 text-xs font-bold rounded flex items-center gap-2 shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
