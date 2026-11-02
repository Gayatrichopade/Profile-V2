import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Heart, 
  Target, 
  BarChart2, 
  Code2, 
  CheckCircle2, 
  Flame, 
  Coffee, 
  Compass, 
  Sliders,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

export const AboutPersonalDimensions: React.FC = () => {
  // Foodie Explorer State
  const [selectedDish, setSelectedDish] = useState<number>(0);
  const dishes = [
    {
      name: 'Mumbai Street Misal & Vada Pav',
      category: 'Street Food Heritage',
      spice: '9.8 / 10',
      telemetry: 'Crispy farsan, fiery rassa, freshly baked pav. The ultimate algorithmic fuel.',
      icon: '🌶️',
    },
    {
      name: 'Hyderabadi Dum Biryani',
      category: 'Slow-Cooked Mastery',
      spice: '8.5 / 10',
      telemetry: 'Layered basmati, caramelized onions, 32 ground spices sealed under slow dum.',
      icon: '🍲',
    },
    {
      name: 'Artisanal Aeropress Pour-Over',
      category: 'Precision Extraction',
      spice: 'TDS: 1.35%',
      telemetry: 'Single-origin washed beans, 93°C water, inverted brew ratio 18g:270ml.',
      icon: '☕',
    },
    {
      name: 'Neapolitan Sourdough Pizza',
      category: 'Fermentation Art',
      spice: '480°C Oven',
      telemetry: '72-hour cold-fermented dough, San Marzano DOP tomatoes, smoked mozzarella.',
      icon: '🍕',
    },
  ];

  // Carrom Strategist State
  const [selectedShot, setSelectedShot] = useState<number>(0);
  const shots = [
    {
      title: 'Queen + Cover Single-Stroke Sweep',
      difficulty: 'Expert (94% accuracy)',
      angle: '42.5° off Center Baseline',
      desc: 'Precision rebound off right timber rail into top-left corner pocket with follow-through white piece cover.',
      stats: 'Velocity: 2.8 m/s · Spin: Top-spin 12 rad/s',
    },
    {
      title: 'The Cut Shot (Tight Pocket Squeeze)',
      difficulty: 'High Precision',
      angle: '18.2° glancing contact',
      desc: 'Fine-edge striker touch slicing opponent obstruction into bottom right corner.',
      stats: 'Impact Delta: 0.15mm · Deflection: 71.8°',
    },
    {
      title: 'Double-Bank Rebound Defense',
      difficulty: 'Tactical Defensive',
      angle: '63.0° dual rail rebound',
      desc: 'Clears center grid while trapping opponent black carrom piece against the perimeter border.',
      stats: 'Deceleration: 1.2 m/s² · Table coverage: 82%',
    },
  ];

  // Data Storytelling State (Raw Logs vs Distilled Story)
  const [dataViewMode, setDataViewMode] = useState<'raw' | 'story'>('story');

  // Structured Code Execution checklist
  const [checkedPrinciples, setCheckedPrinciples] = useState<Record<string, boolean>>({
    types: true,
    determinism: true,
    telemetry: true,
    zero_slop: true,
  });

  const togglePrinciple = (key: string) => {
    setCheckedPrinciples((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="about" className="py-12 sm:py-16 bg-[#0a0f18] border-t border-[#252a34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-[#252a34]">
          <div className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Identity &amp; Dual Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
            About Me &amp; Personal Dimensions
          </h2>
          <p className="mt-1 text-sm text-[#bbc9cf] max-w-3xl">
            Where foundational Computer Science Engineering converges with Big Data Analytics and the human quirks that power creative problem solving.
          </p>
        </div>

        {/* ============================================================== */}
        {/* HIGHLIGHT: SSJCOE 2019 + CDAC 2021 DUAL FOUNDATION             */}
        {/* ============================================================== */}
        <div className="mb-12 cyber-panel rounded-xl p-6 sm:p-8 border border-[#00d2ff]/30 relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#131d2e] to-[#0f172a]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00d2ff]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00f5a0]">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC GENESIS &amp; SPECIALIZATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Computer Science Engineering + Big Data Analytics
              </h3>
              <p className="text-xs sm:text-sm text-[#dee2f0]/90 leading-relaxed font-normal">
                Gayatri combines foundational Computer Science Engineering from <strong>SSJCOE (2019)</strong> with an intensive Post Graduation Diploma in Big Data Analytics from <strong>CDAC Noida (2021)</strong>, backing <strong>5+ years</strong> of expertise in enterprise analytics, predictive modeling, and scalable data products.
              </p>
            </div>

            {/* The 2 Pillars & The Bridge */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pillar 1: SSJCOE 2019 */}
              <div className="p-4 rounded-lg bg-[#171c25]/80 border border-[#252a34] hover:border-[#00d2ff]/40 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono text-[#00d2ff] mb-2">
                  <span className="font-bold">B.TECH COMPUTER SCIENCE</span>
                  <span>SSJCOE · 2019</span>
                </div>
                <div className="text-xs text-[#859399] font-mono mb-2">
                  Mumbai University (SSJCOE)
                </div>
                <ul className="text-xs text-[#bbc9cf] space-y-1.5 font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00d2ff] font-mono">▸</span>
                    <span>Systems programming, data structures, algorithm design &amp; OS</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00d2ff] font-mono">▸</span>
                    <span>Database management systems (SQL/RDBMS) &amp; software engineering</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00d2ff] font-mono">▸</span>
                    <span>Rigorous engineering and mathematical foundations</span>
                  </li>
                </ul>
              </div>

              {/* Pillar 2: CDAC Noida 2021 */}
              <div className="p-4 rounded-lg bg-[#171c25]/80 border border-[#252a34] hover:border-[#00f5a0]/40 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono text-[#00f5a0] mb-2">
                  <span className="font-bold">PG-DBDA BIG DATA ANALYTICS</span>
                  <span>CDAC NOIDA · 2021</span>
                </div>
                <div className="text-xs text-[#859399] font-mono mb-2">
                  Centre for Development of Advanced Computing (CDAC Noida)
                </div>
                <ul className="text-xs text-[#bbc9cf] space-y-1.5 font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00f5a0] font-mono">▸</span>
                    <span>Distributed data processing with PySpark, Databricks &amp; Hadoop</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00f5a0] font-mono">▸</span>
                    <span>Advanced machine learning algorithms, clustering &amp; feature engineering</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00f5a0] font-mono">▸</span>
                    <span>Enterprise cloud telemetry &amp; high-volume data warehousing</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE BENTO GRID: 4 PASSIONS & QUIRKS                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: 🍕 Foodie Explorer (7 cols) */}
          <div className="lg:col-span-7 cyber-panel-elevated rounded-xl p-5 sm:p-6 border border-[#252a34] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="pizza">🍕</span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Foodie Explorer
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#ffd79f] bg-[#ffd79f]/10 px-2.5 py-0.5 rounded border border-[#ffd79f]/30">
                  CULINARY SENSORY LAB
                </span>
              </div>

              <p className="text-xs text-[#bbc9cf] leading-relaxed mb-4">
                Food is algorithms of temperature, spice extraction, and chemistry. Whether hunting the spiciest roadside Misal Pav or brewing a delicate 93°C pour-over, every bite is a field study.
              </p>

              {/* Interactive Dish Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {dishes.map((dish, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDish(idx)}
                    className={`p-2 rounded text-left text-xs transition-all border ${
                      selectedDish === idx
                        ? 'bg-[#1b2029] border-[#ffd79f] text-white shadow-[0_0_12px_rgba(255,215,159,0.2)]'
                        : 'bg-[#171c25]/60 border-[#252a34] text-[#859399] hover:text-white'
                    }`}
                  >
                    <div className="text-base mb-1">{dish.icon}</div>
                    <div className="font-semibold truncate">{dish.name}</div>
                  </button>
                ))}
              </div>

              {/* Dish Telemetry Card */}
              <div className="p-3.5 rounded-lg bg-[#0a0f18] border border-[#252a34] text-xs font-mono space-y-1">
                <div className="flex justify-between items-center text-[11px] text-[#ffd79f]">
                  <span>CATEGORY: {dishes[selectedDish].category}</span>
                  <span className="text-[#00f5a0]">INDEX: {dishes[selectedDish].spice}</span>
                </div>
                <p className="text-xs text-[#dee2f0] font-sans pt-1">
                  {dishes[selectedDish].telemetry}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#252a34]/60 flex items-center justify-between text-[11px] font-mono text-[#859399] mt-4">
              <span>Street Food · Specialty Coffee · Fermentation</span>
              <span className="text-[#ffd79f]">Always hungry for good food</span>
            </div>
          </div>

          {/* Bento Card 2: 🎯 Carrom Strategist (5 cols) */}
          <div className="lg:col-span-5 cyber-panel-elevated rounded-xl p-5 sm:p-6 border border-[#252a34] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="target">🎯</span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Carrom Strategist
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#00f5a0] bg-[#10b981]/10 px-2.5 py-0.5 rounded border border-[#10b981]/30">
                  GEOMETRIC REBOUNDS
                </span>
              </div>

              <p className="text-xs text-[#bbc9cf] leading-relaxed mb-4">
                Carrom is applied kinematics in miniature: coefficient of restitution, striker momentum, and tactical board control. Master of corner pocket bank-shots and queen protection.
              </p>

              {/* Shot Selection Tabs */}
              <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
                {shots.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedShot(idx)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded whitespace-nowrap transition-colors ${
                      selectedShot === idx
                        ? 'bg-[#00f5a0] text-[#0a0f18] font-bold'
                        : 'bg-[#171c25] text-[#859399] hover:text-white border border-[#252a34]'
                    }`}
                  >
                    Shot {idx + 1}
                  </button>
                ))}
              </div>

              {/* Shot Telemetry Card */}
              <div className="p-3.5 rounded-lg bg-[#0a0f18] border border-[#252a34] space-y-1 text-xs">
                <div className="font-semibold text-white font-mono flex justify-between">
                  <span>{shots[selectedShot].title}</span>
                </div>
                <div className="text-[11px] font-mono text-[#00f5a0]">
                  {shots[selectedShot].angle} · {shots[selectedShot].difficulty}
                </div>
                <p className="text-xs text-[#bbc9cf] font-sans pt-1">
                  {shots[selectedShot].desc}
                </p>
                <div className="text-[10px] font-mono text-[#859399] pt-1 border-t border-[#252a34]">
                  {shots[selectedShot].stats}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#252a34]/60 flex items-center justify-between text-[11px] font-mono text-[#859399] mt-4">
              <span>Striker Weight: 15.0g</span>
              <span className="text-[#00f5a0]">Board Queen Retained</span>
            </div>
          </div>

          {/* Bento Card 3: 📊 Data Storytelling (6 cols) */}
          <div className="lg:col-span-6 cyber-panel-elevated rounded-xl p-5 sm:p-6 border border-[#252a34] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="chart">📊</span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Data Storytelling
                  </h3>
                </div>

                {/* View Switcher */}
                <div className="flex items-center gap-1 p-0.5 bg-[#171c25] rounded border border-[#252a34] text-[11px] font-mono">
                  <button
                    onClick={() => setDataViewMode('raw')}
                    className={`px-2 py-0.5 rounded ${dataViewMode === 'raw' ? 'bg-[#252a34] text-white' : 'text-[#859399]'}`}
                  >
                    Raw Stream
                  </button>
                  <button
                    onClick={() => setDataViewMode('story')}
                    className={`px-2 py-0.5 rounded ${dataViewMode === 'story' ? 'bg-[#00d2ff] text-[#0a0f18] font-bold' : 'text-[#859399]'}`}
                  >
                    Distilled Narrative
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#bbc9cf] leading-relaxed mb-4">
                Petabytes of parquet records are meaningless until synthesized into decisive narratives. Gayatri bridges the gap between low-level telemetry logs and stakeholder strategy.
              </p>

              {/* Interactive View Display */}
              {dataViewMode === 'raw' ? (
                <div className="p-3.5 rounded-lg bg-[#0a0f18] border border-[#252a34] font-mono text-[11px] text-[#859399] space-y-1 overflow-x-auto">
                  <div className="text-[#00d2ff]"># 128,490 events/sec streaming partition</div>
                  <div>2026-11-02T04:22:11.902Z [GPU-7] mem_alloc: 79.4GB, nccl_barrier_wait: 42.1ms</div>
                  <div>2026-11-02T04:22:11.903Z [GPU-7] fragmentation_spike: 18.2%, cache_flush_req</div>
                  <div>2026-11-02T04:22:11.905Z [WORKER-14] heart_beat_stale: delta +142ms, token_drain</div>
                </div>
              ) : (
                <div className="p-3.5 rounded-lg bg-[#0a0f18] border border-[#00d2ff]/30 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-[#00d2ff]">
                    <span className="font-bold">EXECUTIVE TELEMETRY SYNTHESIS</span>
                    <span className="text-[#00f5a0]">RESOLVED</span>
                  </div>
                  <div className="text-xs text-white font-sans leading-relaxed">
                    "Identified an isolated NCCL barrier delay on GPU Node #7 caused by memory fragmentation during FP16 attention pooling. Reallocating with Triton ring-buffers cut tail latency by <strong>41%</strong> across all 128 cluster workers."
                  </div>
                  <div className="text-[10px] text-[#859399] pt-1 border-t border-[#252a34]">
                    Impact: Restored 2.8x throughput · Saved $14k/month in cluster compute idle time.
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#252a34]/60 flex items-center justify-between text-[11px] font-mono text-[#859399] mt-4">
              <span>Clarity over Complexity</span>
              <span className="text-[#00d2ff]">Actionable Telemetry</span>
            </div>
          </div>

          {/* Bento Card 4: 📐 Structured Code Execution (6 cols) */}
          <div className="lg:col-span-6 cyber-panel-elevated rounded-xl p-5 sm:p-6 border border-[#252a34] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="ruler">📐</span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Structured Code Execution
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#a5e7ff] bg-[#a5e7ff]/10 px-2.5 py-0.5 rounded border border-[#a5e7ff]/30">
                  DETERMINISTIC INVARIANTS
                </span>
              </div>

              <p className="text-xs text-[#bbc9cf] leading-relaxed mb-4">
                Anti-slop engineering discipline: deterministic seeds, zero dead click affordances, strict runtime type schemas, and mathematically predictable memory boundaries.
              </p>

              {/* Interactive Quality Invariant Checklist */}
              <div className="space-y-2">
                {[
                  { id: 'types', label: 'Strict Runtime Type Contracts (Zero `any` escapes)' },
                  { id: 'determinism', label: 'Deterministic Seeds & Mathematical Numerical Stability' },
                  { id: 'telemetry', label: 'Sub-millisecond Non-blocking Telemetry Profilers' },
                  { id: 'zero_slop', label: 'Zero-Pill Typography & Architectural Whitespace' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => togglePrinciple(item.id)}
                    className="w-full text-left p-2.5 rounded bg-[#171c25]/80 hover:bg-[#171c25] border border-[#252a34] text-xs font-mono flex items-center justify-between transition-colors"
                  >
                    <span className="text-[#dee2f0]">{item.label}</span>
                    <CheckCircle2 
                      className={`w-4 h-4 shrink-0 ml-2 ${
                        checkedPrinciples[item.id] ? 'text-[#00f5a0]' : 'text-[#859399]'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#252a34]/60 flex items-center justify-between text-[11px] font-mono text-[#859399] mt-4">
              <span>Code as Architecture</span>
              <span className="text-[#a5e7ff]">Production Verifiable</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
