export interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updatedAt: string;
  license: string;
  topics: string[];
  isPinned: boolean;
  benchmarkStats?: {
    latency: string;
    throughput: string;
    memoryEfficiency: string;
    accuracyDelta?: string;
  };
  readmeSnippet: string;
  installCommand: string;
  architectureDiagram?: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  repo?: string;
}

export interface ModelBenchmark {
  modelId: string;
  name: string;
  category: 'LLM' | 'Diffusion' | 'Graph Neural Net' | 'Edge Vision';
  parameters: string;
  fp16Throughput: number; // tokens/sec or img/sec
  int8Throughput: number;
  fp4Throughput: number;
  memoryFootprintMB: number;
  accuracyMetric: string;
  scoreValue: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  authors: string[];
  doi?: string;
  abstract: string;
  linkText: string;
  pdfUrl?: string;
}
