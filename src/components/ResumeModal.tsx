import React, { useEffect, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  FileText,
  Eye,
  FileCheck2
} from 'lucide-react';
import { PROFILE_INFO, EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS_LIST, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');

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
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-xl bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_40px_rgba(0,210,255,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-3.5 bg-[#171c25] border-b border-[#252a34] gap-3">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Curriculum Vitae · Gayatri Chopade
            </span>
          </div>

          {/* View Mode Switcher and Download Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Toggle between Interactive CV and PDF Document view */}
            <div className="flex items-center gap-1 p-0.5 bg-[#0a0f18] rounded-md border border-[#252a34] text-xs font-mono">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                  viewMode === 'interactive'
                    ? 'bg-[#00d2ff] text-[#0a0f18] font-bold'
                    : 'text-[#bbc9cf] hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Web CV</span>
              </button>

              <button
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                  viewMode === 'pdf'
                    ? 'bg-[#00d2ff] text-[#0a0f18] font-bold'
                    : 'text-[#bbc9cf] hover:text-white'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>PDF Preview</span>
              </button>
            </div>

            {/* Direct Official PDF Download Button */}
            <a
              href={PROFILE_INFO.resumePdfUrl}
              download="Gayatri_Chopade_Data_Scientist_Resume.pdf"
              className="cyber-btn-primary px-3.5 py-1.5 text-xs rounded font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.35)]"
              title="Download official attached PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="cyber-btn-secondary px-3 py-1.5 text-xs rounded hidden md:flex items-center gap-1.5"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* View Mode 1: PDF Embed Preview */}
        {viewMode === 'pdf' ? (
          <div className="flex-1 bg-[#0a0f18] p-4 sm:p-6 flex flex-col items-center justify-center min-h-[550px]">
            <iframe
              src={`${PROFILE_INFO.resumePdfUrl}#view=FitH`}
              title="Gayatri Chopade Official Resume PDF"
              className="w-full h-[640px] rounded-lg border border-[#252a34] bg-[#171c25]"
            />
            <div className="mt-3 text-xs font-mono text-[#859399] flex items-center justify-between w-full">
              <span>Attached Document: Gayatri_Chopade-_Data_Scientist_5_Yrs_Exp_5922dda7.pdf</span>
              <a
                href={PROFILE_INFO.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00d2ff] hover:underline flex items-center gap-1"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* View Mode 2: Interactive Web CV Sheet */
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
                  <span>Pune, MH | +91 7666047068</span>
                  <span>·</span>
                  <span className="text-[#00f5a0]">{PROFILE_INFO.email}</span>
                  <span>·</span>
                  <a href={PROFILE_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    github.com/Gayatrichopade
                  </a>
                  <span>·</span>
                  <a href={PROFILE_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    linkedin.com/in/gayatri-chopade
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#171c25] border border-[#00d2ff]/30 text-xs font-mono text-right hidden sm:block">
                <div className="text-[#00d2ff] font-bold">4+ YEARS OF EXPERIENCE</div>
                <div className="text-[#859399]">Data Science &amp; Analytics</div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#00d2ff] mb-2 font-bold flex items-center gap-1.5">
                <span>PROFESSIONAL SUMMARY</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#dee2f0] leading-relaxed">
                Data Science and Analytics Engineer with 4+ years of experience delivering machine learning, BI automation, manufacturing analytics, and enterprise workflow solutions. Skilled in Python, SQL, Power BI, Databricks, PySpark, Power Platform, and GenAI-enabled analytics. Proven ability to translate business problems into scalable data products, improve operational efficiency, reduce cost, and communicate insights to engineering and business stakeholders.
              </p>
            </div>

            {/* Core Strengths */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#ffd79f] mb-3 font-bold flex items-center gap-1.5">
                <span>CORE STRENGTHS</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#171c25]/60 border border-[#252a34]">
                  <div className="font-bold text-white mb-1 text-[11px] font-mono text-[#00d2ff]">Data Science &amp; AI</div>
                  <p className="text-[11px] text-[#bbc9cf] leading-relaxed">
                    Python, SQL, ML modeling, feature engineering, model evaluation, GenAI analytics, and recommendation systems.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#171c25]/60 border border-[#252a34]">
                  <div className="font-bold text-white mb-1 text-[11px] font-mono text-[#00f5a0]">Manufacturing Analytics</div>
                  <p className="text-[11px] text-[#bbc9cf] leading-relaxed">
                    Manufacturing KPIs, production analysis, SAP/enterprise data exposure, operational dashboards, and decision support.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#171c25]/60 border border-[#252a34]">
                  <div className="font-bold text-white mb-1 text-[11px] font-mono text-[#ffd79f]">Business Automation</div>
                  <p className="text-[11px] text-[#bbc9cf] leading-relaxed">
                    Power BI, Power Apps, Power Automate, SharePoint, process visibility, approval tracking, and stakeholder reporting.
                  </p>
                </div>
              </div>
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

            {/* Footer with direct download action */}
            <div className="pt-6 border-t border-[#252a34] flex items-center justify-between">
              <span className="text-xs font-mono text-[#859399]">
                Official Attached PDF Ready for Download
              </span>
              <a
                href={PROFILE_INFO.resumePdfUrl}
                download="Gayatri_Chopade_Data_Scientist_Resume.pdf"
                className="cyber-btn-primary px-4 py-2 text-xs rounded font-bold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Attached Resume PDF</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
