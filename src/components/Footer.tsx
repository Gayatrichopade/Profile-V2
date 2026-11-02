import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#252a34] bg-[#0a0f18] py-12 text-xs font-mono text-[#859399] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#252a34]/60">
          
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
              <span className="text-sm font-bold text-white font-sans">{PROFILE_INFO.name}</span>
            </div>
            <span className="hidden sm:inline text-[#3c494e]">·</span>
            <span className="text-xs text-[#00d2ff]">{PROFILE_INFO.title}</span>
          </div>

          {/* Social & Contact Actions */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={PROFILE_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#171c25] border border-[#252a34]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#171c25] border border-[#252a34]"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#00d2ff]" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={onOpenResume}
              className="hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#171c25] border border-[#252a34]"
            >
              <span>Resume</span>
            </button>

            <button
              onClick={onOpenContact}
              className="hover:text-[#00f5a0] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#10b981]/15 text-[#00f5a0] border border-[#10b981]/40"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
          <div>
            <span>© {new Date().getFullYear()} Gayatri Chopade · Transforming Insights into Action</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#859399]">
              CDAC Noida (PG-DBDA) · Mumbai University (SSJCOE)
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#171c25] hover:bg-[#252a34] text-white border border-[#252a34] transition-colors"
              title="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
