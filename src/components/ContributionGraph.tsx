import React, { useState, useMemo } from 'react';
import { Calendar, Flame, Trophy, GitCommit, GitPullRequest, ArrowUpRight } from 'lucide-react';
import { generateContributionData } from '../data/portfolioData';
import { ContributionDay } from '../types/portfolio';

export const ContributionGraph: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);

  const { days, total } = useMemo(() => {
    return generateContributionData(selectedYear);
  }, [selectedYear]);

  // Group into 52 weeks of 7 days
  const weeks = useMemo(() => {
    const res: ContributionDay[][] = [];
    for (let i = 0; i < 52; i++) {
      res.push(days.slice(i * 7, (i + 1) * 7));
    }
    return res;
  }, [days]);

  // Color mapping for levels
  const levelColors = {
    0: 'bg-[#171c25] border-[#252a34]',
    1: 'bg-[#064e3b] border-[#047857]',
    2: 'bg-[#059669] border-[#10b981]',
    3: 'bg-[#10b981] border-[#34d399]',
    4: 'bg-[#00f5a0] border-[#a7f3d0] shadow-[0_0_6px_rgba(0,245,160,0.5)]',
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', ''];

  return (
    <section id="contributions" className="py-12 sm:py-16 bg-[#0f131d]/60 border-t border-[#252a34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with stats and year switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-mono text-[#00f5a0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5" />
              <span>Contribution Activity Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              {total.toLocaleString()} Contributions in {selectedYear}
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Verifiable activity log across distributed ML systems, model kernels, and open-source packages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#171c25] rounded-lg border border-[#252a34]">
              {[2026, 2025].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    selectedYear === yr
                      ? 'bg-[#00d2ff] text-[#0a0f18] font-semibold'
                      : 'text-[#bbc9cf] hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Heat Map Main Container */}
        <div className="cyber-panel rounded-lg p-5 sm:p-6 border border-[#252a34]">
          
          {/* Streak & Metric telemetry cards above the grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-[#252a34]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-[#00f5a0]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#859399]">CURRENT STREAK</div>
                <div className="text-base sm:text-lg font-bold font-mono text-[#00f5a0] tabular-nums">42 Days</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-[#00d2ff]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#859399]">LONGEST STREAK</div>
                <div className="text-base sm:text-lg font-bold font-mono text-[#00d2ff] tabular-nums">118 Days</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#ffd79f]/10 border border-[#ffd79f]/30 flex items-center justify-center shrink-0">
                <GitCommit className="w-5 h-5 text-[#ffd79f]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#859399]">TOTAL COMMITS</div>
                <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">942 Commits</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#a5e7ff]/10 border border-[#a5e7ff]/30 flex items-center justify-center shrink-0">
                <GitPullRequest className="w-5 h-5 text-[#a5e7ff]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#859399]">PR REVIEWS</div>
                <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">284 Reviews</div>
              </div>
            </div>
          </div>

          {/* Interactive Heat Map Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[740px]">
              
              {/* Month Header row */}
              <div className="flex text-[11px] font-mono text-[#859399] mb-2 pl-7 justify-between">
                {months.map((m) => (
                  <span key={m} className="w-12 text-left">{m}</span>
                ))}
              </div>

              {/* Grid with day labels */}
              <div className="flex gap-1.5">
                {/* Day labels column */}
                <div className="flex flex-col justify-between py-0.5 text-[10px] font-mono text-[#859399] w-6 shrink-0 h-[104px]">
                  {dayLabels.map((lbl, idx) => (
                    <span key={idx} className="h-3 leading-3">{lbl}</span>
                  ))}
                </div>

                {/* 52 columns */}
                <div className="flex gap-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((day, dIdx) => (
                        <button
                          key={`${wIdx}-${dIdx}`}
                          type="button"
                          onMouseEnter={() => setHoveredDay(day)}
                          onClick={() => setSelectedDay(day)}
                          className={`w-3 h-3 rounded-[2px] transition-transform hover:scale-125 hover:z-10 relative cursor-pointer border ${
                            levelColors[day.level]
                          } ${
                            selectedDay?.date === day.date
                              ? 'ring-2 ring-[#00d2ff] ring-offset-1 ring-offset-[#0a0f18]'
                              : ''
                          }`}
                          aria-label={`${day.date}: ${day.count} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend & Hover Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-[#252a34] text-xs font-mono text-[#859399]">
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#171c25] border border-[#252a34]" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#064e3b] border border-[#047857]" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#059669] border border-[#10b981]" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981] border border-[#34d399]" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00f5a0] border border-[#a7f3d0]" />
                  </div>
                  <span>More</span>
                </div>

                <div className="text-xs text-[#dee2f0]">
                  {hoveredDay ? (
                    <span className="text-[#00d2ff]">
                      {hoveredDay.date}: <strong>{hoveredDay.count} contributions</strong>
                      {hoveredDay.repo && ` in ${hoveredDay.repo}`}
                    </span>
                  ) : (
                    <span>Hover over any cell to inspect daily commit density</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Selected Day Inspect Card */}
          {selectedDay && (
            <div className="mt-4 p-4 rounded bg-[#171c25]/80 border border-[#00d2ff]/30 text-xs font-mono flex items-center justify-between gap-4">
              <div>
                <span className="text-[#859399]">Selected Date: </span>
                <span className="text-white font-semibold">{selectedDay.date}</span>
                <span className="text-[#859399] mx-2">·</span>
                <span className="text-[#00f5a0] font-semibold">{selectedDay.count} commits recorded</span>
                {selectedDay.repo && (
                  <span className="text-[#00d2ff] ml-2">({selectedDay.repo})</span>
                )}
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-[#859399] hover:text-white"
              >
                Close
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
