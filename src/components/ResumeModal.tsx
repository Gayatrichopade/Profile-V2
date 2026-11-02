import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Award, CheckCircle, Mail, MapPin } from 'lucide-react';
import { PROFILE_INFO, EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS_LIST, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_40px_rgba(0,210,255,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#171c25] border-b border-[#252a34]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00d2ff]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Curriculum Vitae · Gayatri Chopade
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="cyber-btn-secondary px-3 py-1.5 text-xs rounded flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0a0f18] text-[#dee2f0] font-sans">
          
          {/* Header */}
          <div className="pb-6 border-b border-[#252a34] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {PROFILE_INFO.name}
              </h1>
              <p className="text-sm font-semibold text-[#00d2ff] mt-1 font-mono">
                {PROFILE_INFO.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#859399] mt-2">
                <span>{PROFILE_INFO.location}</span>
                <span>·</span>
                <span className="text-[#00f5a0]">{PROFILE_INFO.email}</span>
                <span>·</span>
                <a href={PROFILE_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  github.com/gayatrichopade
                </a>
                <span>·</span>
                <a href={PROFILE_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  linkedin.com/in/gayatrichopade
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#171c25] border border-[#00d2ff]/30 text-xs font-mono text-right hidden sm:block">
              <div className="text-[#00d2ff] font-bold">5+ YEARS EXPERIENCE</div>
              <div className="text-[#859399]">Analytics &amp; Data Science</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#00d2ff] mb-2 font-bold flex items-center gap-1.5">
              <span>EXECUTIVE SUMMARY</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#dee2f0] leading-relaxed">
              {PROFILE_INFO.bio}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#00f5a0] font-bold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="p-4 rounded-lg bg-[#171c25]/60 border border-[#252a34] space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-mono text-[#00d2ff]">
                        {exp.company} · {exp.location}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#ffd79f] font-semibold">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-[#dee2f0] leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-[#bbc9cf]">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00f5a0] text-xs font-mono">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0a0f18] text-[#859399] border border-[#252a34]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#ffd79f] mb-3 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>CORE TECHNICAL COMPETENCIES</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="p-3 rounded bg-[#171c25]/40 border border-[#252a34]">
                  <div className="font-mono text-[11px] font-bold text-white mb-1.5">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0a0f18] text-[#bbc9cf] border border-[#252a34]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#a5e7ff] mb-3 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>EDUCATION</span>
              </h2>
              <div className="space-y-3">
                {EDUCATION_LIST.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#171c25]/40 border border-[#252a34]">
                    <div className="text-xs font-bold text-white">{edu.degree}</div>
                    <div className="text-[11px] font-mono text-[#00d2ff] mt-0.5">{edu.institution}</div>
                    <div className="text-[10px] font-mono text-[#859399]">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#00f5a0] mb-3 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>CERTIFICATIONS</span>
              </h2>
              <div className="space-y-3">
                {CERTIFICATIONS_LIST.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#171c25]/40 border border-[#252a34]">
                    <div className="text-xs font-bold text-white">{cert.title}</div>
                    <div className="text-[11px] font-mono text-[#00f5a0] mt-0.5">{cert.issuer} · {cert.year}</div>
                    <div className="text-[11px] text-[#859399] mt-1">{cert.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
