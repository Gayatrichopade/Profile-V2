import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  GitFork, 
  Terminal, 
  FileText, 
  Activity, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Cpu
} from 'lucide-react';
import { Repository } from '../types/portfolio';

interface RepoModalProps {
  repo: Repository | null;
  onClose: () => void;
}

export const RepoModal: React.FC<RepoModalProps> = ({ repo, onClose }) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'telemetry' | 'install'>('readme');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!repo) return null;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(repo.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_35px_rgba(0,210,255,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252a34] bg-[#171c25]/90">
          <div className="flex items-center gap-3">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: repo.languageColor }} 
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight font-mono">
                  {repo.name}
                </h3>
                <span className="text-[11px] font-mono text-[#859399] bg-[#0a0f18] px-2 py-0.5 rounded border border-[#252a34]">
                  {repo.license}
                </span>
              </div>
              <p className="text-xs text-[#bbc9cf] mt-0.5">
                {repo.description}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#859399] hover:text-white hover:bg-[#252a34] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action / Telemetry Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#0a0f18]/80 border-b border-[#252a34] text-xs font-mono">
          <div className="flex items-center gap-4 text-[#859399]">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#ffd79f]" />
              <span className="text-white font-semibold tabular-nums">{repo.stars}</span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5" />
              <span className="text-white font-semibold tabular-nums">{repo.forks}</span>
              <span>forks</span>
            </div>
            <div className="hidden sm:inline text-[#00f5a0]">
              {repo.updatedAt}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCommand}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#171c25] hover:bg-[#252a34] text-[#dee2f0] border border-[#252a34] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                  <span className="text-[#00f5a0]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Install</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center px-6 border-b border-[#252a34] bg-[#171c25]/40 text-xs font-mono">
          <button
            onClick={() => setActiveTab('readme')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'readme'
                ? 'border-[#00d2ff] text-[#00d2ff]'
                : 'border-transparent text-[#859399] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>README.md</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'telemetry'
                ? 'border-[#00d2ff] text-[#00d2ff]'
                : 'border-transparent text-[#859399] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry &amp; Benchmarks</span>
          </button>

          <button
            onClick={() => setActiveTab('install')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'install'
                ? 'border-[#00d2ff] text-[#00d2ff]'
                : 'border-transparent text-[#859399] hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Quick Start</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {activeTab === 'readme' && (
            <div className="bg-[#0a0f18] p-5 rounded-lg border border-[#252a34] font-mono text-xs leading-relaxed text-[#dee2f0]">
              <pre className="whitespace-pre-wrap font-mono text-xs">
                {repo.readmeSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              {repo.benchmarkStats ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="cyber-panel p-4 rounded border border-[#252a34]">
                    <div className="text-[11px] font-mono text-[#859399] mb-1">LATENCY PROFILE</div>
                    <div className="text-xl font-bold font-mono text-[#00d2ff]">{repo.benchmarkStats.latency}</div>
                    <div className="text-xs text-[#859399] mt-1">Measured on GPU cluster</div>
                  </div>

                  <div className="cyber-panel p-4 rounded border border-[#252a34]">
                    <div className="text-[11px] font-mono text-[#859399] mb-1">THROUGHPUT VOLUME</div>
                    <div className="text-xl font-bold font-mono text-[#00f5a0]">{repo.benchmarkStats.throughput}</div>
                    <div className="text-xs text-[#859399] mt-1">Peak steady-state throughput</div>
                  </div>

                  <div className="cyber-panel p-4 rounded border border-[#252a34]">
                    <div className="text-[11px] font-mono text-[#859399] mb-1">MEMORY EFFICIENCY</div>
                    <div className="text-xl font-bold font-mono text-[#ffd79f]">{repo.benchmarkStats.memoryEfficiency}</div>
                    <div className="text-xs text-[#859399] mt-1">Relative to naive implementation</div>
                  </div>

                  <div className="cyber-panel p-4 rounded border border-[#252a34]">
                    <div className="text-[11px] font-mono text-[#859399] mb-1">ACCURACY DELTA</div>
                    <div className="text-xl font-bold font-mono text-[#a5e7ff]">{repo.benchmarkStats.accuracyDelta || 'Zero Loss'}</div>
                    <div className="text-xs text-[#859399] mt-1">Standard benchmark verification</div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#859399]">
                  Standard benchmarks logged in continuous regression pipeline.
                </div>
              )}

              <div className="p-4 rounded bg-[#171c25] border border-[#252a34] text-xs">
                <div className="flex items-center gap-2 text-[#00d2ff] font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Automated CI Telemetry Test Suite</span>
                </div>
                <p className="text-[#bbc9cf] leading-relaxed">
                  Every commit triggers regression tests assessing kernel execution time, CUDA memory fragmentation, and numerical parity against unquantized FP32 baselines.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="text-xs text-[#bbc9cf]">
                Install or clone directly into your environment using pip or git:
              </div>
              <div className="p-3.5 bg-[#0a0f18] rounded border border-[#00d2ff]/30 font-mono text-xs flex items-center justify-between text-[#00d2ff]">
                <code>{repo.installCommand}</code>
                <button
                  onClick={handleCopyCommand}
                  className="p-1 rounded hover:bg-[#252a34] text-[#859399] hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00f5a0]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-xs text-[#859399] font-mono">
                Requires Python &ge; 3.10 and PyTorch 2.3+ with CUDA 12.1+ support.
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#171c25] border-t border-[#252a34]">
          <div className="text-xs font-mono text-[#859399]">
            Repository: gayatrichopade/{repo.name}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#bbc9cf] hover:text-white bg-[#0a0f18] border border-[#252a34] rounded"
            >
              Close
            </button>
            <a
              href={`https://github.com/gayatrichopade/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn-primary px-4 py-2 text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
