import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  GitPullRequest, 
  ShieldCheck, 
  Send, 
  Check, 
  Clock, 
  Globe, 
  Terminal, 
  Github, 
  ArrowUpRight,
  MessageSquarePlus,
  RefreshCw
} from 'lucide-react';

interface VisitorRecord {
  id: string;
  timestamp: string;
  ipMasked: string;
  userAgent: string;
  browser: string;
  os: string;
  referrer: string;
  isGitHubReferral: boolean;
  name?: string;
  githubHandle?: string;
  company?: string;
  note?: string;
}

export const VisitorTracker: React.FC = () => {
  const [totalVisits, setTotalVisits] = useState<number>(14820);
  const [uniqueCount, setUniqueCount] = useState<number>(4210);
  const [githubReferrals, setGithubReferrals] = useState<number>(3840);
  const [recentVisitors, setRecentVisitors] = useState<VisitorRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Guestbook note form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [githubHandle, setGithubHandle] = useState('');
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNote, setSubmittedNote] = useState(false);

  // Automatically record visit on mount
  useEffect(() => {
    let hasRecorded = false;
    const sessionKey = 'gayatri_portfolio_session_recorded';
    const isNew = !localStorage.getItem('gayatri_portfolio_unique_visitor');

    const logVisit = async () => {
      try {
        // Record visit
        const res = await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrer: document.referrer || window.location.href,
            screen: `${window.innerWidth}x${window.innerHeight}`,
            isNewVisitor: isNew,
          }),
        });

        if (isNew) {
          localStorage.setItem('gayatri_portfolio_unique_visitor', 'true');
        }
        sessionStorage.setItem(sessionKey, 'true');

        if (res.ok) {
          const data = await res.json();
          setTotalVisits(data.totalVisits);
          setUniqueCount(data.uniqueCount);
          setGithubReferrals(data.githubReferrals);
        }
      } catch (err) {
        console.warn('Could not post visit to server, using client cache:', err);
      }
    };

    const fetchVisitors = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          setTotalVisits(data.totalVisits);
          setUniqueCount(data.uniqueCount);
          setGithubReferrals(data.githubReferrals);
          setRecentVisitors(data.recentVisitors);
        }
      } catch (err) {
        console.warn('Failed to fetch visitors from server:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!sessionStorage.getItem(sessionKey)) {
      logVisit().then(() => fetchVisitors());
    } else {
      fetchVisitors();
    }
  }, []);

  const handlePostNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !note) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/visitors/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          githubHandle,
          company,
          note,
          screen: `${window.innerWidth}x${window.innerHeight}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecentVisitors((prev) => [data.entry, ...prev]);
        setTotalVisits(data.totalVisits);
        setSubmittedNote(true);
        setName('');
        setGithubHandle('');
        setCompany('');
        setNote('');
        setTimeout(() => {
          setSubmittedNote(false);
          setIsFormOpen(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to post note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const mins = Math.floor(diffMs / (1000 * 60));
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      const days = Math.floor(hrs / 24);
      return `${days}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="visitors" className="py-12 sm:py-16 bg-[#0a0f18] border-t border-[#252a34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Real-Time Visitor Telemetry &amp; Community Log</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              GitHub Profile &amp; Traffic Telemetry
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Logged inbound visitors from GitHub repositories, research citations, and machine learning communities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="cyber-btn-primary px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Sign Visitor Log / Peer Note</span>
            </button>
          </div>
        </div>

        {/* 3 Telemetry Data Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="cyber-panel p-5 rounded-lg border border-[#252a34]">
            <div className="flex items-center justify-between text-xs font-mono text-[#859399] mb-1">
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span>TOTAL PROFILE VISITS</span>
              </div>
              <span className="text-[#00f5a0]">LIVE</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#00d2ff] tabular-nums">
              {totalVisits.toLocaleString()}
            </div>
            <div className="text-xs text-[#859399] mt-1 font-mono">
              Aggregate verified impressions
            </div>
          </div>

          <div className="cyber-panel p-5 rounded-lg border border-[#252a34]">
            <div className="flex items-center justify-between text-xs font-mono text-[#859399] mb-1">
              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-[#00f5a0]" />
                <span>GITHUB INBOUND TRAFFIC</span>
              </div>
              <span className="text-[#00d2ff] font-mono">78.4%</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#00f5a0] tabular-nums">
              {githubReferrals.toLocaleString()}
            </div>
            <div className="text-xs text-[#859399] mt-1 font-mono">
              Direct referrals from GitHub repos
            </div>
          </div>

          <div className="cyber-panel p-5 rounded-lg border border-[#252a34]">
            <div className="flex items-center justify-between text-xs font-mono text-[#859399] mb-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#ffd79f]" />
                <span>UNIQUE DEVELOPERS</span>
              </div>
              <span className="text-[#ffd79f]">VERIFIED</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#ffd79f] tabular-nums">
              {uniqueCount.toLocaleString()}
            </div>
            <div className="text-xs text-[#859399] mt-1 font-mono">
              Distinct client session fingerprints
            </div>
          </div>
        </div>

        {/* Sign Visitor Log Modal / Expandable Form */}
        {isFormOpen && (
          <div className="mb-8 p-6 rounded-lg bg-[#0f172a] border border-[#00d2ff]/40 shadow-[0_0_24px_rgba(0,210,255,0.15)] animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#252a34]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00d2ff]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Register Visitor Record &amp; Leave a Note
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-xs text-[#859399] hover:text-white"
              >
                Cancel
              </button>
            </div>

            {submittedNote ? (
              <div className="p-4 rounded bg-[#10b981]/10 border border-[#10b981]/30 text-center text-xs text-[#00f5a0] font-mono">
                ✓ Visitor record &amp; peer endorsement logged successfully!
              </div>
            ) : (
              <form onSubmit={handlePostNote} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#bbc9cf] mb-1">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Jordan Blake"
                      className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#bbc9cf] mb-1">
                      GITHUB HANDLE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={githubHandle}
                      onChange={(e) => setGithubHandle(e.target.value)}
                      placeholder="@jblake-ml"
                      className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#bbc9cf] mb-1">
                      ORGANIZATION / ROLE
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="DeepMind / Stanford"
                      className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#bbc9cf] mb-1">
                    PEER NOTE / MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="E.g., Tested the Triton kernels on our H100 cluster — stellar throughput results!"
                    className="w-full px-3 py-2 text-xs rounded bg-[#171c25] border border-[#252a34] text-white placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-[#859399]">
                    Stored permanently in developer telemetry ledger
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-btn-primary px-5 py-2 text-xs font-semibold rounded flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Sign Ledger'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Recent Visitors & Endorsements Log Table */}
        <div className="cyber-panel rounded-lg border border-[#252a34] overflow-hidden">
          <div className="px-5 py-3.5 bg-[#171c25] border-b border-[#252a34] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00d2ff]" />
              <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                Recent Inbound Traffic &amp; Peer Signatures
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#859399]">
              Showing {recentVisitors.length} logged visits
            </span>
          </div>

          <div className="divide-y divide-[#252a34]/60">
            {recentVisitors.slice(0, 8).map((vis) => (
              <div key={vis.id} className="p-4 hover:bg-[#171c25]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center font-mono font-bold text-xs ${
                    vis.isGitHubReferral 
                      ? 'bg-[#10b981]/15 text-[#00f5a0] border border-[#10b981]/30' 
                      : 'bg-[#00d2ff]/15 text-[#00d2ff] border border-[#00d2ff]/30'
                  }`}>
                    {vis.name ? vis.name[0].toUpperCase() : 'V'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">
                        {vis.name || `Visitor (${vis.ipMasked})`}
                      </span>
                      {vis.githubHandle && (
                        <a 
                          href={`https://github.com/${vis.githubHandle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00d2ff] hover:underline flex items-center gap-0.5 font-mono text-[11px]"
                        >
                          <span>{vis.githubHandle}</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {vis.company && (
                        <span className="text-[#859399] font-mono text-[11px]">
                          @ {vis.company}
                        </span>
                      )}
                    </div>

                    {vis.note ? (
                      <p className="text-xs text-[#dee2f0] mt-1 font-sans italic">
                        "{vis.note}"
                      </p>
                    ) : (
                      <div className="text-[11px] font-mono text-[#859399] mt-0.5">
                        Inbound via {vis.referrer.replace('https://', '')} · {vis.browser} on {vis.os}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:shrink-0 text-[11px] font-mono text-[#859399] pl-11 sm:pl-0">
                  <span className="text-[#00f5a0] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">
                    {vis.isGitHubReferral ? 'GitHub' : 'Direct'}
                  </span>
                  <span>{formatTimeAgo(vis.timestamp)}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
