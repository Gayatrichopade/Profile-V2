import React, { useEffect, useState } from 'react';
import { Award, Zap, Users, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

export const StatsStrip: React.FC = () => {
  const [counts, setCounts] = useState({
    exp: 0,
    acc: 0,
    savings: 0,
    mentored: 0,
  });

  // Animated count-up on load
  useEffect(() => {
    let start = 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        exp: Math.round(ease * 5),
        acc: parseFloat((ease * 87.0).toFixed(1)),
        savings: Math.round(ease * 42),
        mentored: Math.round(ease * 40),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const stats = [
    {
      value: `${counts.exp}+ Years`,
      label: 'DATA SCIENCE EXPERIENCE',
      caption: 'John Deere & HCLTech enterprise models',
      color: 'text-[#00d2ff]',
      icon: Clock,
    },
    {
      value: `${counts.acc}%`,
      label: 'PREDICTION ACCURACY (SOTA)',
      caption: 'Supervised stress prediction with XGBoost',
      color: 'text-[#00f5a0]',
      icon: Award,
    },
    {
      value: `$${counts.savings}K / Prod`,
      label: 'COST REDUCTION ACHIEVED',
      caption: 'Python automation & virtual stress testing',
      color: 'text-[#ffd79f]',
      icon: TrendingDown,
    },
    {
      value: `${counts.mentored}+ Engineers`,
      label: 'COLLEAGUES MENTORED',
      caption: 'Batch training & technical interviewing',
      color: 'text-[#a5e7ff]',
      icon: Users,
    },
  ];

  return (
    <div className="w-full border-y border-[#252a34]/80 bg-[#0f172a]/70 backdrop-blur-md py-6 sm:py-8 my-4 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-start p-4 rounded-lg bg-[#171c25]/50 border border-[#252a34]/70 hover:border-[#00d2ff]/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-[#859399]" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#859399] uppercase">
                    {stat.label}
                  </span>
                </div>
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-mono tracking-tight tabular-nums ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-[#859399] mt-1 font-sans">
                  {stat.caption}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
