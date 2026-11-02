import React from 'react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenResume,
  activeSection,
  onNavigate,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Case Studies' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About & Quirks' },
    { id: 'neural-video', label: 'Neural Video' },
    { id: 'game', label: 'Arcade Game' },
    { id: 'visitors', label: 'Visitors' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#252a34]/80 bg-[#0a0f18]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Wordmark */}
        <a 
          href="#overview" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-base font-bold tracking-tight text-[#dee2f0] hover:text-[#00d2ff] transition-colors"
        >
          <div className="w-2.5 h-2.5 rounded-sm bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] group-hover:scale-110 transition-transform" />
          <span>{PROFILE_INFO.name}</span>
          <span className="text-xs font-mono text-[#859399] hidden sm:inline">/ data-scientist</span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#bbc9cf]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative text-xs font-mono ${
                  isActive
                    ? 'text-[#00d2ff] font-bold'
                    : 'text-[#bbc9cf] hover:text-[#f8fafc]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Action CTAs */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={PROFILE_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-[#bbc9cf] hover:text-white bg-[#171c25] border border-[#252a34] rounded hover:border-[#00d2ff]/40 transition-colors whitespace-nowrap shrink-0"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden md:inline">GitHub</span>
          </a>

          <a
            href={PROFILE_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-[#00d2ff] hover:text-white bg-[#171c25] border border-[#252a34] rounded hover:border-[#00d2ff]/40 transition-colors whitespace-nowrap shrink-0"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>

          <button
            onClick={onOpenResume}
            className="cyber-btn-secondary px-3 py-1.5 text-xs rounded font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            className="cyber-btn-primary px-3.5 py-1.5 text-xs rounded font-bold tracking-wide flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>

      </div>
    </header>
  );
};
