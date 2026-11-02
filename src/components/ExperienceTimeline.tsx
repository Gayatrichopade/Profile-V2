import React from 'react';
import { Briefcase, GraduationCap, Award, CheckCircle, TrendingUp, DollarSign, Users, Clock, ShieldCheck } from 'lucide-react';
import { EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS_LIST } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 bg-[#0a0f18] border-t border-[#252a34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00f5a0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>5+ Years Career Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              Professional Experience &amp; Impact
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Production engineering at John Deere and high-impact enterprise data science engagements at HCLTech (clients: Facebook &amp; John Deere).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#00d2ff] bg-[#00d2ff]/10 px-3 py-1.5 rounded border border-[#00d2ff]/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>MEASURABLE ENTERPRISE VALUE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Animated Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#252a34] space-y-8">
              
              {EXPERIENCES.map((exp, idx) => (
                <div key={exp.id} className="relative group">
                  
                  {/* Timeline Node indicator */}
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                    idx === 0 
                      ? 'bg-[#00d2ff] border-[#0a0f18] shadow-[0_0_12px_#00d2ff]' 
                      : 'bg-[#10b981] border-[#0a0f18] shadow-[0_0_12px_#10b981]'
                  }`} />

                  {/* Card Container */}
                  <div className="cyber-panel-elevated p-6 rounded-xl border border-[#252a34] hover:border-[#00d2ff]/40 transition-all duration-200 space-y-4">
                    
                    {/* Role, Company & Dates */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#252a34]/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {exp.role}
                          </h3>
                          {idx === 0 && (
                            <span className="text-[10px] font-mono font-bold text-[#00f5a0] bg-[#10b981]/15 px-2 py-0.5 rounded border border-[#10b981]/30">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-[#00d2ff] font-mono mt-0.5">
                          {exp.company}
                        </div>
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="text-xs font-mono font-semibold text-[#ffd79f] block">
                          {exp.period}
                        </span>
                        <span className="text-[11px] font-mono text-[#859399]">
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#dee2f0] leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Metric Highlights List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono text-[#859399] uppercase font-bold tracking-wider">
                        KEY DELIVERABLES &amp; IMPACT:
                      </div>
                      <ul className="space-y-2 text-xs text-[#bbc9cf]">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 bg-[#0a0f18]/60 p-2.5 rounded-lg border border-[#252a34]">
                            <span className="text-[#00d2ff] font-mono font-bold mt-0.5">▸</span>
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills Utilized */}
                    <div className="pt-3 border-t border-[#252a34]/60 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-mono text-[#859399] mr-1 uppercase">Stack:</span>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#171c25] text-[#dee2f0] border border-[#252a34]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Right Column: Education & Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Education Box */}
            <div className="cyber-panel p-6 rounded-xl border border-[#252a34] space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#252a34]">
                <GraduationCap className="w-4 h-4 text-[#00f5a0]" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Education
                </h3>
              </div>

              <div className="space-y-4">
                {EDUCATION_LIST.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#171c25]/60 border border-[#252a34] space-y-1">
                    <span className="text-[10px] font-mono text-[#00d2ff] font-semibold block">
                      {edu.year}
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-[11px] font-mono text-[#859399]">
                      {edu.institution}
                    </p>
                    <p className="text-[11px] text-[#bbc9cf] pt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="cyber-panel p-6 rounded-xl border border-[#252a34] space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#252a34]">
                <Award className="w-4 h-4 text-[#ffd79f]" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {CERTIFICATIONS_LIST.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#171c25]/60 border border-[#252a34] space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-[#00f5a0]">{cert.issuer}</span>
                      <span className="text-[#ffd79f]">{cert.year}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-[#bbc9cf] pt-0.5 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentorship & Leadership Summary Card */}
            <div className="p-4 rounded-xl bg-[#171c25]/40 border border-[#252a34] text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Users className="w-4 h-4 text-[#00d2ff]" />
                <span>Leadership &amp; Talent Development</span>
              </div>
              <p className="text-[11px] text-[#bbc9cf] leading-relaxed">
                Trained and onboarded cohorts of <strong>40+ engineering colleagues</strong> in Python, machine learning workflows, and automated Power Platform analytics. Experienced in conducting technical interview loops.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
