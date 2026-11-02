import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  TrendingUp, 
  Layers, 
  Cpu, 
  CheckCircle,
  X
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';

export const FeaturedProjects: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="projects" className="py-12 sm:py-16 bg-[#0f131d]/90 border-t border-[#252a34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Flagship Case Studies &amp; Data Products</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              Featured Enterprise Projects &amp; ML Solutions
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Real-world data products delivered at John Deere and HCLTech combining optimization, predictive ML, and automated BI.
            </p>
          </div>

          <div className="text-xs font-mono text-[#00f5a0] bg-[#10b981]/10 px-3 py-1.5 rounded border border-[#10b981]/30">
            <span>MEASURABLE BUSINESS IMPACT</span>
          </div>
        </div>

        {/* 2x2 Interactive Card Grid with Hover Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASE_STUDIES.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedCase(project)}
              className="group cyber-panel-elevated rounded-xl p-6 border border-[#252a34] hover:border-[#00d2ff]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-[1.015] shadow-lg relative overflow-hidden"
            >
              {/* Subtle accent glow gradient on hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00d2ff]/5 rounded-full blur-2xl group-hover:bg-[#00d2ff]/10 transition-colors pointer-events-none" />

              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-mono text-[#00d2ff] uppercase tracking-wider">
                      {project.organization} · {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00d2ff] transition-colors tracking-tight mt-0.5">
                      {project.title}
                    </h3>
                  </div>

                  <span className="w-8 h-8 rounded-lg bg-[#171c25] border border-[#252a34] group-hover:border-[#00d2ff]/40 flex items-center justify-center shrink-0 text-[#859399] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Impact Highlight Badge */}
                <div className="p-2.5 rounded-lg bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-xs text-[#00d2ff] font-mono font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{project.impact}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#dee2f0] leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* 3 Metrics counters */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[#0a0f18]/90 border border-[#252a34] mb-5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-bold font-mono text-[#00f5a0] tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono text-[#859399] uppercase truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies strip */}
              <div className="pt-3 border-t border-[#252a34]/60 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#171c25] text-[#bbc9cf] border border-[#252a34]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-[11px] font-semibold text-[#00d2ff] flex items-center gap-1">
                  <span>Explore Case</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Deep Dive for Selected Case Study */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_35px_rgba(0,210,255,0.25)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#171c25] border-b border-[#252a34]">
                <div>
                  <div className="text-[11px] font-mono text-[#00d2ff] uppercase">
                    {selectedCase.organization} · {selectedCase.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                    {selectedCase.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1 rounded-lg text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#dee2f0]">
                
                {/* Impact Statement */}
                <div className="p-3.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 text-xs text-[#00f5a0] font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>Verified Outcome: {selectedCase.impact}</span>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-[#859399] mb-1 font-semibold">
                    PROJECT ARCHITECTURE &amp; CONTEXT
                  </h4>
                  <p className="leading-relaxed text-[#bbc9cf]">
                    {selectedCase.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-[#859399] mb-2 font-semibold">
                    KEY ENGINEERING DELIVERABLES
                  </h4>
                  <ul className="space-y-2">
                    {selectedCase.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#171c25]/40 p-2.5 rounded border border-[#252a34]">
                        <CheckCircle className="w-4 h-4 text-[#00d2ff] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-[#0a0f18] border border-[#252a34]">
                  {selectedCase.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold font-mono text-[#00f5a0] tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono text-[#859399] uppercase">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#859399] mb-2 font-semibold">
                    STACK &amp; TOOLING UTILIZED
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-[#171c25] text-white border border-[#252a34]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCase.githubUrl && (
                  <div className="pt-2">
                    <a
                      href={selectedCase.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn-secondary px-4 py-2 rounded text-xs flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Open Source Repository on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
