import React, { useState, useRef } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Sparkles,
  GitPullRequest,
  Star,
  Activity,
  Zap,
  Linkedin,
  Github,
  Mail,
  Quote,
  Download
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onScrollToRepos: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToRepos,
  onOpenContact,
  onOpenResume,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D hover-tilt physics state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return (
    <section id="overview" className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 overflow-hidden z-10">
      
      {/* Background cyber grid & glow */}
      <div className="absolute inset-0 cyber-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00d2ff]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#10b981]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Typographic Hierarchy, Tagline & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 w-full">
            
            {/* Live Role badge - clean unboxed */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f5a0]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#00f5a0]" />
              <span className="tracking-wide font-semibold">DATA SCIENCE &amp; ANALYTICS LEAD</span>
              <span className="text-[#859399]" aria-hidden="true">·</span>
              <span className="text-[#bbc9cf]">5+ YEARS EXPERIENCE</span>
            </div>

            {/* Name & Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8fafc] leading-[1.1] text-balance">
                {PROFILE_INFO.name}
              </h1>
              
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <p className="text-lg sm:text-xl font-semibold text-[#00d2ff] tracking-tight">
                  {PROFILE_INFO.title}
                </p>
              </div>
            </div>

            {/* High-Impact Tagline */}
            <div className="p-3.5 rounded-lg bg-[#171c25]/70 border-l-2 border-[#00d2ff] border border-[#252a34]">
              <p className="text-sm sm:text-base font-medium text-[#f8fafc] leading-snug">
                "{PROFILE_INFO.tagline}"
              </p>
            </div>

            {/* Floating Quote Widget with Slide-in Entrance */}
            <div className="relative overflow-hidden rounded-lg bg-[#0f172a] border border-[#ffd79f]/40 p-3 sm:p-3.5 shadow-[0_0_20px_rgba(255,215,159,0.12)] animate-in fade-in duration-500">
              <div className="flex items-center gap-2.5">
                <Quote className="w-4 h-4 text-[#ffd79f] shrink-0" />
                <span className="text-xs sm:text-sm font-mono font-medium text-[#ffd79f]">
                  {PROFILE_INFO.quote}
                </span>
              </div>
            </div>

            {/* Bio Prose */}
            <p className="text-xs sm:text-sm text-[#dee2f0]/90 leading-relaxed max-w-2xl font-normal">
              {PROFILE_INFO.bio}
            </p>

            {/* Action Buttons (Arranged in clean 1 or 2 lines) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full max-w-full">
              {/* Primary Line / Group: Resume CV + PDF Download & Contact */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Primary CTA: View Resume & Direct PDF Download */}
                <div className="flex items-center bg-[#171c25] p-0.5 rounded-lg border border-[#00d2ff]/40 shadow-[0_0_18px_rgba(0,210,255,0.25)]">
                  <button
                    onClick={onOpenResume}
                    className="cyber-btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-md font-bold tracking-wide flex items-center gap-2 whitespace-nowrap active:scale-95"
                    title="View interactive CV & document preview"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Resume (CV)</span>
                  </button>

                  <a
                    href={PROFILE_INFO.resumePdfUrl}
                    download="Gayatri_Chopade_Data_Scientist_Resume.pdf"
                    className="px-2 sm:px-2.5 py-2 text-xs text-[#00f5a0] hover:text-white hover:bg-[#00f5a0]/15 rounded-md transition-colors flex items-center gap-1.5 border-l border-[#252a34] font-mono font-medium active:scale-95"
                    title="Download attached official PDF resume"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-xs font-mono font-medium">PDF</span>
                  </a>
                </div>

                {/* High-Impact Contact Button */}
                <button
                  onClick={onOpenContact}
                  className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0a0f18] bg-gradient-to-r from-[#00d2ff] via-[#00e1d9] to-[#00f5a0] hover:brightness-110 rounded-lg transition-all whitespace-nowrap flex items-center gap-2 shadow-[0_0_16px_rgba(0,210,255,0.35)] hover:shadow-[0_0_22px_rgba(0,210,255,0.55)] shrink-0 active:scale-95"
                >
                  <Mail className="w-4 h-4 fill-current/20" />
                  <span>Contact</span>
                </button>
              </div>

              {/* Secondary Line / Group: External Profiles */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* LinkedIn Button */}
                <a
                  href={PROFILE_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn-secondary px-3.5 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-medium flex items-center gap-2 whitespace-nowrap active:scale-95"
                >
                  <Linkedin className="w-4 h-4 text-[#00d2ff]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* GitHub Button */}
                <a
                  href={PROFILE_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn-secondary px-3.5 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-medium flex items-center gap-2 whitespace-nowrap active:scale-95"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Quick Academic & Cert Badges */}
            <div className="pt-3 border-t border-[#252a34]/60 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#859399] font-mono">
              <span>CDAC Noida (PG-DBDA, 2021)</span>
              <span aria-hidden="true">·</span>
              <span>Mumbai University (SSJCOE, 2019)</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#00d2ff]">Certified GenAI &amp; ML</span>
            </div>

          </div>

          {/* Right Column: Hero Avatar with Floating Breathing Animation, Neon Glow, & 3D Tilt */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1000px' }}
              className="relative w-full max-w-sm sm:max-w-md select-none group"
            >
              
              {/* Breathing Animated Neon Gradient Border Frame */}
              <div 
                className="absolute -inset-2 rounded-2xl opacity-85 blur-lg transition-all duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.7), rgba(16, 185, 129, 0.5), rgba(0, 210, 255, 0.8), rgba(255, 215, 159, 0.4))',
                  animation: 'breathingGlow 4s ease-in-out infinite alternate',
                }}
              />

              {/* 3D Tilted Card Container */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_35px_-5px_rgba(0,210,255,0.3)] transition-transform duration-150 ease-out"
                style={{
                  transform: tilt.isHovered 
                    ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)` 
                    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                  transformStyle: 'preserve-3d',
                  animation: 'floatHover 6s ease-in-out infinite',
                }}
              >
                
                {/* Specular glare overlay following mouse */}
                {tilt.isHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
                    style={{
                      background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 210, 255, 0.1) 40%, transparent 70%)`,
                    }}
                  />
                )}

                {/* Header bar of avatar container */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#171c25]/95 border-b border-[#252a34]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/90" />
                  </div>
                  <span className="text-[11px] font-mono text-[#bbc9cf] font-medium">
                    gayatri_chopade_ds.profile
                  </span>
                  <div className="text-[11px] font-mono text-[#00f5a0] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] animate-pulse" />
                    <span>JOHN DEERE</span>
                  </div>
                </div>

                {/* Hero Avatar Image with High-Fidelity Depth */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0f18]">
                  <img
                    src={PROFILE_INFO.avatarUrl}
                    alt="Gayatri Chopade - Tech Portrait"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
                    style={{
                      transform: tilt.isHovered ? 'scale(1.05)' : 'scale(1.0)',
                    }}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/public/assets')) {
                        target.src = '/public/assets/aistudio/Gayatri_Chopade_passportPhoto_8d4e6ec2.PNG';
                      }
                    }}
                  />

                  {/* Gradient vignette for telemetry readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-[#0a0f18]/30 to-transparent opacity-90" />

                  {/* Hardware Inference Telemetry Chip */}
                  <div className="absolute top-3 right-3 z-20">
                    <div className="px-2.5 py-1.5 rounded-md bg-[#0a0f18]/90 backdrop-blur-md border border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.3)] text-[10px] font-mono text-[#00d2ff] flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#00f5a0] fill-current" />
                      <span>XGBoost / Databricks ML</span>
                    </div>
                  </div>

                  {/* Floating Telemetry Stats Chip inside viewport */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1.5">
                    {/* Primary Telemetry Chip */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#dee2f0] bg-[#0f172a]/95 backdrop-blur-md px-3 py-2 rounded-lg border border-[#00d2ff]/30 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-[#00d2ff]" />
                        <span>Production Sequencing &amp; Analytics</span>
                      </div>
                      <span className="text-[#00f5a0] font-bold">ACTIVE</span>
                    </div>

                    {/* Secondary Telemetry Badge */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#859399] px-1">
                      <span>Stack: PySpark · SQL · Databricks</span>
                      <span className="text-[#ffd79f]">$42K Cost Reduction</span>
                    </div>
                  </div>

                </div>

                {/* Card footer details */}
                <div className="p-3.5 bg-[#171c25] border-t border-[#252a34] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#bbc9cf]">
                    <Star className="w-3.5 h-3.5 text-[#ffd79f]" />
                    <span className="font-mono text-white">87% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#bbc9cf]">
                    <GitPullRequest className="w-3.5 h-3.5 text-[#00f5a0]" />
                    <span className="font-mono text-white">-20% Time</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#00d2ff]">
                    3D Parallax Tilt
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      <style>{`
        @keyframes breathingGlow {
          0% {
            filter: drop-shadow(0 0 14px rgba(0, 210, 255, 0.45)) blur(8px);
            opacity: 0.75;
          }
          50% {
            filter: drop-shadow(0 0 28px rgba(16, 185, 129, 0.6)) blur(12px);
            opacity: 0.95;
          }
          100% {
            filter: drop-shadow(0 0 32px rgba(0, 210, 255, 0.7)) blur(10px);
            opacity: 0.85;
          }
        }

        @keyframes floatHover {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
};
