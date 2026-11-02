import React, { useState, useMemo } from 'react';
import { Cpu, Gauge, Zap, Database, Server, RefreshCw, BarChart3, ShieldCheck } from 'lucide-react';
import { BENCHMARKS } from '../data/portfolioData';

export const BenchmarkLab: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('llama-3-8b-quant');
  const [precision, setPrecision] = useState<'FP16' | 'INT8' | 'FP4'>('FP4');
  const [gpuTarget, setGpuTarget] = useState<'H100' | 'A100' | 'RTX4090'>('H100');
  const [batchSize, setBatchSize] = useState<number>(8);

  const selectedModel = useMemo(() => {
    return BENCHMARKS.find((m) => m.modelId === selectedModelId) || BENCHMARKS[0];
  }, [selectedModelId]);

  // Compute realistic simulation metrics
  const telemetry = useMemo(() => {
    const gpuMultipliers = {
      H100: 2.1,
      A100: 1.4,
      RTX4090: 1.0,
    };

    const precMultipliers = {
      FP16: 1.0,
      INT8: 1.62,
      FP4: 2.18,
    };

    const vramCompression = {
      FP16: 1.0,
      INT8: 0.52,
      FP4: 0.28,
    };

    const baseThroughput = 
      precision === 'FP4' ? selectedModel.fp4Throughput :
      precision === 'INT8' ? selectedModel.int8Throughput : selectedModel.fp16Throughput;

    const effectiveThroughput = Math.round(baseThroughput * gpuMultipliers[gpuTarget] * Math.sqrt(batchSize / 4));
    const estimatedLatency = Math.max(2.1, (1000 / (effectiveThroughput / batchSize))).toFixed(1);
    const allocatedVramMB = Math.round(selectedModel.memoryFootprintMB * vramCompression[precision] + (batchSize * 42));
    const bandwidthUtil = Math.min(98.5, 62 + (batchSize * 3.2)).toFixed(1);

    return {
      throughput: effectiveThroughput,
      latency: estimatedLatency,
      vramMB: allocatedVramMB,
      bandwidthUtil,
    };
  }, [selectedModel, precision, gpuTarget, batchSize]);

  return (
    <section id="benchmarks" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#252a34]">
          <div>
            <div className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Telemetry &amp; Inference Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
              Live Model Architecture Benchmarks
            </h2>
            <p className="mt-1 text-sm text-[#bbc9cf]">
              Simulate inference throughput, quantization scaling, and VRAM footprints across hardware targets.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#00f5a0] bg-[#10b981]/10 px-3 py-1.5 rounded border border-[#10b981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>TRITON / CUDA KERNEL EMULATOR ACTIVE</span>
          </div>
        </div>

        {/* Main Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Column (4 cols) */}
          <div className="lg:col-span-4 cyber-panel rounded-lg p-5 sm:p-6 border border-[#252a34] space-y-5">
            <div className="text-sm font-semibold text-white uppercase font-mono tracking-wider pb-2 border-b border-[#252a34]">
              Parameter Controls
            </div>

            {/* Model Architecture Selector */}
            <div>
              <label className="block text-xs font-mono text-[#bbc9cf] mb-2">
                TARGET MODEL ARCHITECTURE
              </label>
              <div className="space-y-1.5">
                {BENCHMARKS.map((m) => (
                  <button
                    key={m.modelId}
                    onClick={() => setSelectedModelId(m.modelId)}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between border ${
                      selectedModelId === m.modelId
                        ? 'bg-[#1b2029] border-[#00d2ff] text-white'
                        : 'bg-[#171c25]/60 border-[#252a34] text-[#bbc9cf] hover:border-[#00d2ff]/40'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-[11px] font-mono text-[#859399]">{m.parameters} · {m.category}</div>
                    </div>
                    {selectedModelId === m.modelId && (
                      <span className="w-2 h-2 rounded-full bg-[#00d2ff]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Precision Selector */}
            <div>
              <label className="block text-xs font-mono text-[#bbc9cf] mb-2">
                QUANTIZATION / PRECISION
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['FP16', 'INT8', 'FP4'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`py-2 text-xs font-mono font-semibold rounded border transition-colors ${
                      precision === p
                        ? 'bg-[#00d2ff] text-[#0a0f18] border-[#00d2ff]'
                        : 'bg-[#171c25] text-[#bbc9cf] border-[#252a34] hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* GPU Accelerator Selector */}
            <div>
              <label className="block text-xs font-mono text-[#bbc9cf] mb-2">
                ACCELERATOR HARDWARE
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['H100', 'A100', 'RTX4090'] as const).map((gpu) => (
                  <button
                    key={gpu}
                    onClick={() => setGpuTarget(gpu)}
                    className={`py-2 text-xs font-mono font-semibold rounded border transition-colors ${
                      gpuTarget === gpu
                        ? 'bg-[#10b981] text-[#0a0f18] border-[#10b981]'
                        : 'bg-[#171c25] text-[#bbc9cf] border-[#252a34] hover:text-white'
                    }`}
                  >
                    {gpu}
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Size Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#bbc9cf] mb-2">
                <span>CONCURRENT BATCH SIZE</span>
                <span className="text-[#00d2ff] font-bold tabular-nums">{batchSize}</span>
              </div>
              <input
                type="range"
                min="1"
                max="64"
                step="1"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full accent-[#00d2ff] bg-[#171c25] h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#859399] mt-1">
                <span>1 (Single Stream)</span>
                <span>32</span>
                <span>64 (Max Pipeline)</span>
              </div>
            </div>

          </div>

          {/* Right Telemetry Displays (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 4 Quantitative Telemetry Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="cyber-panel p-4 rounded-lg border border-[#252a34]">
                <div className="text-[11px] font-mono text-[#859399] flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#00d2ff]" />
                  <span>THROUGHPUT</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#00d2ff] tabular-nums">
                  {telemetry.throughput}
                </div>
                <div className="text-[11px] text-[#859399] font-mono mt-0.5">tokens/sec</div>
              </div>

              <div className="cyber-panel p-4 rounded-lg border border-[#252a34]">
                <div className="text-[11px] font-mono text-[#859399] flex items-center gap-1.5 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-[#00f5a0]" />
                  <span>PER-TOKEN LATENCY</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#00f5a0] tabular-nums">
                  {telemetry.latency}
                </div>
                <div className="text-[11px] text-[#859399] font-mono mt-0.5">milliseconds</div>
              </div>

              <div className="cyber-panel p-4 rounded-lg border border-[#252a34]">
                <div className="text-[11px] font-mono text-[#859399] flex items-center gap-1.5 mb-1">
                  <Database className="w-3.5 h-3.5 text-[#ffd79f]" />
                  <span>VRAM FOOTPRINT</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ffd79f] tabular-nums">
                  {(telemetry.vramMB / 1024).toFixed(2)}
                </div>
                <div className="text-[11px] text-[#859399] font-mono mt-0.5">Gigabytes (GB)</div>
              </div>

              <div className="cyber-panel p-4 rounded-lg border border-[#252a34]">
                <div className="text-[11px] font-mono text-[#859399] flex items-center gap-1.5 mb-1">
                  <Server className="w-3.5 h-3.5 text-[#a5e7ff]" />
                  <span>BANDWIDTH UTIL</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#a5e7ff] tabular-nums">
                  {telemetry.bandwidthUtil}%
                </div>
                <div className="text-[11px] text-[#859399] font-mono mt-0.5">HBM3 / GDDR6X</div>
              </div>
            </div>

            {/* Visual Scaling & Telemetry Chart */}
            <div className="cyber-panel p-5 sm:p-6 rounded-lg border border-[#252a34]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#00d2ff]" />
                  <span className="text-sm font-semibold text-white font-mono">
                    Quantization Scaling Delta ({selectedModel.name})
                  </span>
                </div>
                <span className="text-xs font-mono text-[#00f5a0] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30">
                  Target: {gpuTarget} @ Batch {batchSize}
                </span>
              </div>

              {/* Comparative bars */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#859399]">FP16 Baseline (Standard Weights)</span>
                    <span className="text-white tabular-nums">{Math.round(selectedModel.fp16Throughput * (gpuTarget === 'H100' ? 2.1 : gpuTarget === 'A100' ? 1.4 : 1.0))} tok/s · {(selectedModel.memoryFootprintMB / 1024).toFixed(1)} GB VRAM</span>
                  </div>
                  <div className="w-full h-3 bg-[#171c25] rounded overflow-hidden">
                    <div className="h-full bg-[#859399]/60 rounded" style={{ width: '45%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#a5e7ff]">INT8 AWQ (Fused Layer Norm)</span>
                    <span className="text-white tabular-nums">{Math.round(selectedModel.int8Throughput * (gpuTarget === 'H100' ? 2.1 : gpuTarget === 'A100' ? 1.4 : 1.0))} tok/s · {(selectedModel.memoryFootprintMB * 0.52 / 1024).toFixed(1)} GB VRAM</span>
                  </div>
                  <div className="w-full h-3 bg-[#171c25] rounded overflow-hidden">
                    <div className="h-full bg-[#00d2ff]/80 rounded" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#00f5a0] font-semibold">Triton FP4 Custom Kernel (Gayatri's Implementation)</span>
                    <span className="text-[#00f5a0] font-semibold tabular-nums">
                      {Math.round(selectedModel.fp4Throughput * (gpuTarget === 'H100' ? 2.1 : gpuTarget === 'A100' ? 1.4 : 1.0))} tok/s · {(selectedModel.memoryFootprintMB * 0.28 / 1024).toFixed(1)} GB VRAM
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#171c25] rounded overflow-hidden">
                    <div className="h-full bg-[#00f5a0] rounded shadow-[0_0_10px_#00f5a0]" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>

              {/* Accuracy retention note */}
              <div className="mt-5 pt-4 border-t border-[#252a34] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#bbc9cf] gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00f5a0]" />
                  <span>Validation Benchmark: <strong className="text-white">{selectedModel.accuracyMetric}</strong></span>
                </div>
                <div className="font-mono text-[#00d2ff]">
                  Validated Score: {selectedModel.scoreValue}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
