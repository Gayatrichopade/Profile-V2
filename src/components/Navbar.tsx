import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Download, Menu, X, ArrowUpRight } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Case Studies' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About & Quirks' },
    { id: 'meme-generator', label: 'Meme Generator' },
    { id: 'game', label: 'Arcade Game' },
    { id: 'visitors', label: 'Visitors' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#252a34]/80 bg-[#0a0f18]/95 backdrop-blur-md">
      {/* Primary Top Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Line 1: Brand + Action Buttons (Single line on sm+, or Line 1 on mobile) */}
        <div className="h-16 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Zone 1: Wordmark & Role Beacon */}
          <a 
            href="#overview" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate('overview');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-sm sm:text-base font-bold tracking-tight text-[#dee2f0] hover:text-[#00d2ff] transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-sm bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] group-hover:scale-110 transition-transform" />
            <span>{PROFILE_INFO.name}</span>
            <span className="text-xs font-mono text-[#859399] hidden lg:inline">/ data-scientist</span>
          </a>

          {/* Zone 2: Single-line navigation links (for ultra-wide 2xl displays) */}
          <nav className="hidden 2xl:flex items-center gap-4 text-sm font-medium text-[#bbc9cf]">
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

          {/* Zone 3: Action Buttons (One clean line on sm+, compact on mobile) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* GitHub Button */}
            <a
              href={PROFILE_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono text-[#bbc9cf] hover:text-white bg-[#171c25] hover:bg-[#1f2937] border border-[#252a34] hover:border-[#dee2f0]/40 transition-all whitespace-nowrap shrink-0 active:scale-95 shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden md:inline">GitHub</span>
            </a>

            {/* LinkedIn Button */}
            <a
              href={PROFILE_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono text-[#00d2ff] hover:text-white bg-[#171c25] hover:bg-[#1f2937] border border-[#252a34] hover:border-[#00d2ff]/60 hover:shadow-[0_0_12px_rgba(0,210,255,0.25)] transition-all whitespace-nowrap shrink-0 active:scale-95 shadow-sm"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">LinkedIn</span>
            </a>

            {/* Unified Resume & PDF Action Cluster */}
            <div className="hidden sm:flex items-center bg-[#171c25] rounded-md border border-[#252a34] hover:border-[#00d2ff]/40 p-0.5 shrink-0 shadow-sm transition-colors">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs text-[#dee2f0] hover:text-white hover:bg-[#252a34] rounded font-medium whitespace-nowrap transition-colors active:scale-95"
                title="View interactive CV & document preview"
              >
                <FileText className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span>Resume</span>
              </button>
              <a
                href={PROFILE_INFO.resumePdfUrl}
                download="Gayatri_Chopade_Data_Scientist_Resume.pdf"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-[#00f5a0] hover:text-white hover:bg-[#00f5a0]/15 rounded transition-colors border-l border-[#252a34] font-mono font-medium active:scale-95"
                title="Direct download official attached PDF resume"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="text-[11px]">PDF</span>
              </a>
            </div>

            {/* Contact Button (High-Impact Hero CTA) */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-md text-xs font-bold tracking-wide text-[#0a0f18] bg-gradient-to-r from-[#00d2ff] via-[#00e1d9] to-[#00f5a0] hover:brightness-110 shadow-[0_0_16px_rgba(0,210,255,0.35)] hover:shadow-[0_0_22px_rgba(0,210,255,0.55)] transition-all whitespace-nowrap active:scale-95 shrink-0"
              title="Get in touch with Gayatri"
            >
              <Mail className="w-3.5 h-3.5 fill-current/20" />
              <span>Contact</span>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-md bg-[#171c25] border border-[#252a34] text-[#bbc9cf] hover:text-white hover:border-[#00d2ff]/40 2xl:hidden transition-colors shrink-0 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#00d2ff]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Line 2 on Mobile screens (< sm): Dedicated Action Buttons Row */}
        <div className="flex sm:hidden items-center justify-between gap-1.5 pb-2.5 pt-0.5 border-t border-[#252a34]/40">
          <button
            onClick={onOpenResume}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-[#171c25] border border-[#252a34] text-[11px] font-medium text-[#dee2f0] active:scale-95"
          >
            <FileText className="w-3 h-3 text-[#00d2ff]" />
            <span>Resume</span>
          </button>

          <a
            href={PROFILE_INFO.resumePdfUrl}
            download="Gayatri_Chopade_Data_Scientist_Resume.pdf"
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-[#10b981]/10 border border-[#10b981]/30 text-[11px] font-mono text-[#00f5a0] active:scale-95"
          >
            <Download className="w-3 h-3" />
            <span>PDF</span>
          </a>

          <a
            href={PROFILE_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-[#171c25] border border-[#252a34] text-[11px] font-mono text-[#bbc9cf] active:scale-95"
          >
            <Github className="w-3 h-3" />
            <span>Git</span>
          </a>

          <a
            href={PROFILE_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-[#171c25] border border-[#252a34] text-[11px] font-mono text-[#00d2ff] active:scale-95"
          >
            <Linkedin className="w-3 h-3" />
            <span>LinkedIn</span>
          </a>
        </div>

      </div>

      {/* Responsive Dropdown Menu for all screen sizes < 2xl */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-[#0f172a]/95 border-b border-[#252a34] px-4 py-3 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded text-left transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#00d2ff]/15 text-[#00d2ff] font-bold border border-[#00d2ff]/30'
                    : 'text-[#bbc9cf] hover:text-white hover:bg-[#171c25]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-40" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#252a34]/60 flex items-center justify-between text-xs font-mono text-[#859399]">
            <div className="flex items-center gap-3">
              <a 
                href={PROFILE_INFO.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a 
                href={PROFILE_INFO.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#00d2ff] text-[#00d2ff]/80 flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="text-[#00f5a0] hover:underline flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Form</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
