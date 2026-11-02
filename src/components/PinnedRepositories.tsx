import React, { useState } from 'react';
import { 
  Star, 
  GitFork, 
  BookOpen, 
  ExternalLink, 
  Terminal, 
  Sparkles, 
  Check, 
  Copy,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { REPOSITORIES } from '../data/portfolioData';
import { Repository } from '../types/portfolio';

interface PinnedRepositoriesProps {
  onSelectRepo: (repo: Repository) => void;
}

export const PinnedRepositories: React.FC<PinnedRepositoriesProps> = ({ onSelectRepo }) => {
  const [filter, setFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'pinned', label: 'Pinned Only' },
    { id: 'llm', label: 'LLM & Kernels' },
    { id: 'diffusion', label: 'Diffusion & Vision' },
    { id: 'bio', label: 'Bioinformatics' },
  ];

  const filteredRepos = REPOSITORIES.filter((repo) => {
    if (filter === 'pinned') return repo.isPinned;
    if (filter === 'llm') return repo.topics.includes('llm') || repo.topics.includes('triton') || repo.topics.includes('quantization');
    if (filter === 'diffusion') return repo.topics.includes('diffusion-models') || repo.topics.includes('generative-ai');
    if (filter === 'bio') return repo.topics.includes('bioinformatics') || repo.topics.includes('graph-neural-networks');
    return true;
  });

  const handleCopyCommand = (e: React.MouseEvent, repo: Repository) => {
    e.stopPropagation();
    navigator.clipboard.writeText(repo.installCommand);
    setCopiedId(repo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="repositories" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-xs" />
              <span>Artifacts &amp; Source Repositories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              Featured Research &amp; Open-Source Projects
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Production inference engines, high-speed matrix kernels, and computational graph models.
            </p>
          </div>

          {/* Interactive Filter Controls - Allowed Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#171c25] rounded-lg border border-[#252a34] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  filter === cat.id
                    ? 'bg-[#00d2ff] text-[#0a0f18] font-semibold shadow-sm'
                    : 'text-[#bbc9cf] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              onClick={() => onSelectRepo(repo)}
              className="group cyber-panel-elevated rounded-lg p-5 flex flex-col justify-between cursor-pointer border border-[#252a34] hover:border-[#00d2ff]/40 transition-all duration-200"
            >
              <div>
                {/* Top Row: Repo Name and Star / Pin */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#00d2ff] shrink-0" />
                    <h3 className="text-base font-semibold text-[#f8fafc] group-hover:text-[#00d2ff] transition-colors tracking-tight">
                      {repo.name}
                    </h3>
                  </div>
                  {repo.isPinned && (
                    <span className="text-[11px] font-mono text-[#00f5a0] bg-[#10b981]/10 px-2 py-0.5 rounded-sm border border-[#10b981]/30">
                      Pinned
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#bbc9cf] leading-relaxed mb-4 line-clamp-3">
                  {repo.description}
                </p>

                {/* Benchmark Telemetry Box if present */}
                {repo.benchmarkStats && (
                  <div className="p-2.5 rounded bg-[#0a0f18]/80 border border-[#252a34] mb-4 text-xs font-mono">
                    <div className="flex justify-between items-center text-[11px] text-[#859399] mb-1">
                      <span>VERIFIED METRIC</span>
                      <span className="text-[#00f5a0]">LIVE TESTED</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#dee2f0]">Throughput:</span>
                      <span className="text-[#00d2ff] font-semibold tabular-nums">{repo.benchmarkStats.throughput}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-0.5">
                      <span className="text-[#dee2f0]">Latency:</span>
                      <span className="text-[#00f5a0] font-semibold tabular-nums">{repo.benchmarkStats.latency}</span>
                    </div>
                  </div>
                )}

                {/* Topic tags - Clean styling */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[11px] font-mono text-[#859399] bg-[#171c25] px-2 py-0.5 rounded border border-[#252a34]"
                    >
                      #{topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="text-[11px] font-mono text-[#859399] px-1 py-0.5">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Metadata & Actions */}
              <div className="pt-3 border-t border-[#252a34]/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs text-[#859399]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: repo.languageColor }} 
                      />
                      <span className="text-[#dee2f0] font-mono text-xs">{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#ffd79f]" />
                      <span className="font-mono text-white tabular-nums">{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span className="font-mono tabular-nums">{repo.forks}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#859399]">{repo.license}</span>
                </div>

                {/* Quick install & inspect button */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={(e) => handleCopyCommand(e, repo)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono rounded bg-[#171c25] hover:bg-[#252a34] text-[#bbc9cf] hover:text-white border border-[#252a34] transition-colors truncate"
                    title={repo.installCommand}
                  >
                    {copiedId === repo.id ? (
                      <>
                        <Check className="w-3 h-3 text-[#00f5a0]" />
                        <span className="text-[#00f5a0]">Copied Command</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="truncate">{repo.installCommand}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectRepo(repo)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold text-[#00d2ff] hover:text-white bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 rounded border border-[#00d2ff]/30 flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
