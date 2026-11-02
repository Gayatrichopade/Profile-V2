import React, { useState } from 'react';
import { Cpu, Sparkles, Code2, Database, BarChart3, Wrench, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const TechnicalSkillset: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  const displayedCategories = activeCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" className="py-12 sm:py-16 bg-[#0a0f18] border-t border-[#252a34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00f5a0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full-Stack Data Science &amp; Enterprise Tooling</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              Technical Skillset &amp; Capabilities
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Production expertise across algorithmic modeling, big data pipelines, low-code automation, and executive BI.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#171c25] rounded-lg border border-[#252a34] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#00d2ff] text-[#0a0f18] font-bold shadow-sm'
                    : 'text-[#bbc9cf] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Glowing Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.category}
              className="cyber-panel rounded-xl p-5 sm:p-6 border border-[#252a34] hover:border-[#00d2ff]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#252a34]/60">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-sm" 
                      style={{ backgroundColor: cat.color }} 
                    />
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      {cat.category}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#859399]">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Badges Grid with Scale-Up and Glowing Shadows */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill;
                    return (
                      <span
                        key={skill}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-[#171c25] text-[#dee2f0] border border-[#252a34] transition-all duration-200 cursor-default select-none hover:scale-110 hover:text-white"
                        style={{
                          borderColor: isHovered ? cat.color : undefined,
                          boxShadow: isHovered ? `0 0 16px ${cat.color}66` : undefined,
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Bottom footer descriptor */}
              <div className="mt-5 pt-3 border-t border-[#252a34]/60 text-[11px] font-mono text-[#859399] flex items-center justify-between">
                <span>Enterprise Verified</span>
                <span style={{ color: cat.color }}>Active in Production</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
