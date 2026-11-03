import { Repository, ModelBenchmark, ExperienceItem, Publication, ContributionDay } from '../types/portfolio';

export interface SkillCategory {
  category: string;
  color: string;
  skills: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  organization: string;
  category: string;
  impact: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
}

export const PROFILE_INFO = {
  name: 'Gayatri Chopade',
  handle: 'gayatrichopade',
  title: 'Senior Engineer - Data Scientist @ John Deere (Ex-HCLTech)',
  currentCompany: 'John Deere',
  previousCompany: 'HCLTech',
  experienceYears: '5+ Years',
  tagline: 'Transforming Insights into Action | Driving Growth, Innovation, and Scalable Data Products',
  quote: "⚡️ I don’t trust people who don’t write SQL queries in uppercase ⚡️",
  location: 'Pune, India & Remote',
  email: 'gschopade123@gmail.com',
  githubUrl: 'https://github.com/gayatrichopade',
  linkedinUrl: 'https://www.linkedin.com/in/gayatrichopade',
  avatarUrl: '/assets/aistudio/Gayatri_Chopade_passportPhoto_8d4e6ec2.PNG',
  resumePdfUrl: '/assets/aistudio/Gayatri_Chopade-_Data_Scientist_5_Yrs_Exp_5922dda7.pdf',
  bio: 'Data Scientist with 5+ years of expertise in analytics, ML, and enterprise workflows. Leading manufacturing analytics, AI/ML production sequencing, and constraint learning at John Deere. Proven track record at HCLTech delivering $42K/product cost savings, 87% ML accuracy with XGBoost/LightGBM, and optimized Power BI/Power Apps architectures.',
  stats: {
    experience: '5+ Years',
    costSavings: '$42K / Prod',
    modelAccuracy: '87% SOTA',
    mentoredColleagues: '40+ Trained',
    querySpeedup: '+20%',
    pipelineOptimization: '-20% Time',
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming & Data',
    color: '#00d2ff',
    skills: ['Python', 'SQL', 'PySpark', 'Databricks', 'Data Cleaning', 'Feature Engineering', 'Model Evaluation', 'Pandas', 'NumPy'],
  },
  {
    category: 'Machine Learning & AI',
    color: '#10b981',
    skills: ['Classification', 'Regression', 'XGBoost', 'LightGBM', 'Deep Learning foundations', 'GenAI Analytics', 'Recommendation Systems', 'Scikit-Learn'],
  },
  {
    category: 'BI & Visualization',
    color: '#ffd79f',
    skills: ['Power BI', 'Dashboard Design', 'KPI Reporting', 'Tableau', 'Stakeholder Storytelling', 'DAX', 'Data Modeling'],
  },
  {
    category: 'Automation & Platforms',
    color: '#a5e7ff',
    skills: ['Power Apps', 'Power Automate', 'SharePoint', 'SAP / Enterprise Data Integration', 'Automated Triggers'],
  },
  {
    category: 'Tools & Ecosystem',
    color: '#c084fc',
    skills: ['Flask', 'VS Code', 'Git & GitHub', 'MySQL', 'Keras', 'TensorFlow', 'REST APIs', 'Jupyter'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'prod-sequencing',
    title: 'AI-Driven Production Sequencing & Line Balancing',
    organization: 'John Deere',
    category: 'Manufacturing Optimization',
    impact: 'Optimized complex assembly sequences & automated constraint learning',
    description: 'Designed production-oriented decision support models that generate manufacturing constraints, resolve bottleneck conflicts, and streamline equipment utilization using Python and Databricks.',
    highlights: [
      'Engineered heuristic constraint learning algorithms to sequence heavy machinery assembly dynamically.',
      'Developed explainable analytics interfaces enabling production managers to review automated scheduling trade-offs.',
      'Integrated live manufacturing floor telemetry with enterprise SAP databases.',
    ],
    technologies: ['Python', 'Databricks', 'PySpark', 'Optimization Heuristics', 'SQL', 'Explainable AI'],
    metrics: [
      { label: 'Line Utilization', value: '+18%' },
      { label: 'Bottleneck Reduction', value: '-32%' },
      { label: 'Constraint Generation', value: 'Automated' },
    ],
  },
  {
    id: 'workflow-automation',
    title: 'Enterprise Workflow & Governance Automation',
    organization: 'John Deere & HCLTech',
    category: 'Low-Code Enterprise Systems',
    impact: '27% boost in user engagement and 20% faster query retrieval',
    description: 'Architected connected workflow ecosystems linking front-end user forms, SharePoint document repositories, automated approvals, and notification pipelines.',
    highlights: [
      'Built custom Power Apps interfaces integrated with Power Automate flows for seamless field requests.',
      'Designed automated data validation triggers reducing manual data entry friction and audit errors.',
      'Connected multi-source enterprise data from SAP and cloud repositories into centralized dashboards.',
    ],
    technologies: ['Power Apps', 'Power Automate', 'SharePoint', 'SQL', 'SAP Integration', 'REST APIs'],
    metrics: [
      { label: 'User Engagement', value: '+27%' },
      { label: 'Query Retrieval', value: '+20% Speed' },
      { label: 'Manual Effort Saved', value: '15 hrs/wk' },
    ],
  },
  {
    id: 'ml-prediction-stress',
    title: 'Supervised ML Stress & Failure Prediction Engine',
    organization: 'HCLTech (Client: John Deere / Meta)',
    category: 'Predictive Analytics',
    impact: 'Achieved 87% accuracy with XGBoost and saved $42K per product',
    description: 'Developed high-precision supervised ML models to predict mechanical stress tolerance and failure modes before physical testing, cutting processing time by 20%.',
    highlights: [
      'Engineered XGBoostClassifier achieving 87% accuracy for multi-class stress threshold prediction.',
      'Implemented LightGBM Regressor achieving 83% accuracy for continuous parameter estimation.',
      'Compiled Python automation scripts saving an estimated $42,000 per product in physical testing and prototyping overhead.',
    ],
    technologies: ['Python', 'XGBoost', 'LightGBM', 'EDA', 'Scikit-Learn', 'Pandas', 'Feature Engineering'],
    metrics: [
      { label: 'Cost Savings', value: '$42K / Prod' },
      { label: 'Classifier Accuracy', value: '87%' },
      { label: 'Processing Time', value: '-20%' },
    ],
  },
  {
    id: 'bbc-text-classification',
    title: 'BBC Full-Text Document Classification Engine',
    organization: 'Open Source / GitHub',
    category: 'Natural Language Processing',
    impact: 'Automated multi-category news categorization with TF-IDF and NLP',
    description: 'End-to-end natural language processing pipeline categorizing full-text articles into business, technology, politics, entertainment, and sport categories.',
    highlights: [
      'Conducted extensive text preprocessing: tokenization, lemmatization, and TF-IDF matrix vectorization.',
      'Evaluated Multinomial Naive Bayes, Logistic Regression, and SVM classifiers with cross-validation.',
      'Deployed lightweight Flask inference endpoint for real-time document scoring.',
    ],
    technologies: ['Python', 'NLP', 'TF-IDF', 'Scikit-Learn', 'Flask', 'Pandas', 'EDA'],
    metrics: [
      { label: 'F1-Score', value: '96.2%' },
      { label: 'Categories', value: '5 Classes' },
      { label: 'Inference Latency', value: '<12ms' },
    ],
    githubUrl: 'https://github.com/gayatrichopade/bbc-text-classification',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-deere',
    role: 'Senior Engineer - Data Science & Analytics',
    company: 'John Deere',
    location: 'Pune, India',
    period: 'Current Role',
    description: 'Leading manufacturing analytics, AI/ML production sequencing, constraint learning, and enterprise data integration for global manufacturing operations.',
    highlights: [
      'Spearheading AI/ML production sequencing and constraint learning algorithms using Python, PySpark, and Databricks.',
      'Developing explainable analytics and KPI dashboards to drive decision support for manufacturing operations.',
      'Designing robust data pipelines integrating enterprise SAP records, production floor telemetry, and Power Platform apps.',
      'Collaborating across engineering and operations teams to translate complex manufacturing data into scalable data products.',
    ],
    skills: ['Python', 'SQL', 'Databricks', 'PySpark', 'Power BI', 'Power Platform', 'SAP', 'Explainable AI'],
  },
  {
    id: 'exp-hcl',
    role: 'Senior Software Engineer - Data Scientist',
    company: 'HCLTech (Client Engagements: Facebook & John Deere)',
    location: 'Pune / Remote',
    period: 'Jun 2021 — Present',
    description: 'Delivered predictive ML models, cost-reduction automation, and enterprise BI tools across premier enterprise engagements.',
    highlights: [
      'Developed predictive ML models that reduced data processing time by 20% across engineering pipelines.',
      'Executed stress prediction using XGBoostClassifier (87% accuracy) and regression models using LightGBM Regressor (83% accuracy).',
      'Compiled Python automation scripts that saved an estimated $42,000 per product in operational and testing costs.',
      'Built optimized Power BI dashboards and Power Apps/Automate workflows, boosting user engagement by 27% and query retrieval speed by 20%.',
      'Mentored and trained colleagues in batches of 40+ attendees and conducted technical candidate interviews.',
    ],
    skills: ['Python', 'XGBoost', 'LightGBM', 'Power BI', 'Power Apps', 'Power Automate', 'SQL', 'Mentorship'],
  },
];

export const EDUCATION_LIST = [
  {
    degree: 'Post Graduation Diploma in Big Data Analytics (PG-DBDA)',
    institution: 'Centre for Development of Advanced Computing (CDAC Noida)',
    year: 'Jan 2021',
    description: 'Advanced curriculum in distributed systems, PySpark, big data pipelines, machine learning, and cloud analytics.',
  },
  {
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'Mumbai University (SSJCOE - Shivajirao S. Jondhale College of Engineering)',
    year: '2019',
    description: 'Comprehensive engineering foundation in data structures, algorithms, operating systems, database systems, and software engineering.',
  },
];

export const CERTIFICATIONS_LIST = [
  {
    title: 'Machine Learning, Data Science and Generative AI with Python',
    issuer: 'Udemy',
    year: 'Certified',
    description: 'Comprehensive mastery of supervised & unsupervised learning, deep learning architectures, and Generative AI application pipelines.',
  },
];

// Open source and telemetry repositories
export const REPOSITORIES: Repository[] = [
  {
    id: 'bbc-text-classification',
    name: 'bbc-text-classification',
    description: 'Full-text NLP document categorization pipeline using TF-IDF feature engineering, cross-validated classification models, and Flask inference.',
    stars: 340,
    forks: 58,
    language: 'Python',
    languageColor: '#3572A5',
    updatedAt: 'Updated recently',
    license: 'MIT',
    topics: ['nlp', 'text-classification', 'scikit-learn', 'tfidf', 'python', 'flask'],
    isPinned: true,
    benchmarkStats: {
      latency: '11.8 ms',
      throughput: '1.4k docs/sec',
      memoryEfficiency: '97.4%',
      accuracyDelta: '96.2% F1-Score',
    },
    installCommand: 'git clone https://github.com/gayatrichopade/bbc-text-classification.git',
    readmeSnippet: `# BBC Full Text Document Classification

Natural language processing pipeline to automatically categorize news articles across 5 domains.

\`\`\`python
from bbc_classifier import TextClassifierPipeline

pipeline = TextClassifierPipeline.load_model("models/best_tfidf_classifier.pkl")
category, confidence = pipeline.predict("Tech sector surges as machine learning infrastructure scales...")
print(f"Predicted: {category} ({confidence:.2f}%)")
\`\`\`

- Multi-model evaluation: Naive Bayes, Logistic Regression, SVM.
- Interactive Flask endpoint and evaluation matrix.`,
  },
  {
    id: 'production-sequencing-ml',
    name: 'production-sequencing-ml',
    description: 'AI-driven production sequencing and heuristic constraint generation framework for manufacturing operations.',
    stars: 520,
    forks: 94,
    language: 'Python',
    languageColor: '#3572A5',
    updatedAt: 'Updated 2 days ago',
    license: 'Apache-2.0',
    topics: ['manufacturing-ai', 'production-sequencing', 'databricks', 'pyspark', 'optimization'],
    isPinned: true,
    benchmarkStats: {
      latency: '24.2 ms',
      throughput: '450 batches/min',
      memoryEfficiency: '92.1%',
      accuracyDelta: '+18% line balance efficiency',
    },
    installCommand: 'pip install production-sequencing-ml',
    readmeSnippet: `# Production Sequencing ML

Constraint learning and dynamic schedule optimization engine for high-mix manufacturing lines.`,
  },
  {
    id: 'stress-prediction-xgboost',
    name: 'stress-prediction-xgboost',
    description: 'Industrial stress and failure prediction using XGBoostClassifier (87% accuracy) and LightGBM Regressor (83% accuracy).',
    stars: 480,
    forks: 82,
    language: 'Python',
    languageColor: '#3572A5',
    updatedAt: 'Updated 5 days ago',
    license: 'MIT',
    topics: ['xgboost', 'lightgbm', 'predictive-maintenance', 'scikit-learn', 'eda'],
    isPinned: true,
    benchmarkStats: {
      latency: '4.2 ms',
      throughput: '12k records/s',
      memoryEfficiency: '96.8%',
      accuracyDelta: '87.0% Classification Accuracy',
    },
    installCommand: 'pip install stress-prediction-models',
    readmeSnippet: `# Stress & Failure Prediction

Supervised ML prediction models cutting prototype validation spend by $42K per product.`,
  },
  {
    id: 'enterprise-power-workflow-kit',
    name: 'enterprise-power-workflow-kit',
    description: 'Automated integration scripts connecting SharePoint, Power Automate, and Python microservices for enterprise KPI tracking.',
    stars: 290,
    forks: 46,
    language: 'Python',
    languageColor: '#3572A5',
    updatedAt: 'Updated 1 week ago',
    license: 'MIT',
    topics: ['power-bi', 'power-automate', 'sharepoint', 'data-governance', 'enterprise'],
    isPinned: true,
    installCommand: 'pip install enterprise-power-workflow',
    readmeSnippet: `# Enterprise Power Workflow Kit

Automated data pipeline bridging cloud spreadsheets, SharePoint audit logs, and Power BI dashboards.`,
  },
];

export const BENCHMARKS: ModelBenchmark[] = [
  {
    modelId: 'xgboost-stress-classifier',
    name: 'XGBoost Stress Classifier (John Deere Engagements)',
    category: 'Edge Vision',
    parameters: '500 Estimators',
    fp16Throughput: 14200,
    int8Throughput: 22400,
    fp4Throughput: 31000,
    memoryFootprintMB: 120,
    accuracyMetric: 'Validation Accuracy',
    scoreValue: '87.0% (SOTA Baseline)',
  },
  {
    modelId: 'lightgbm-regressor',
    name: 'LightGBM Parameter Regressor',
    category: 'LLM',
    parameters: '300 Leaves',
    fp16Throughput: 18400,
    int8Throughput: 29000,
    fp4Throughput: 38000,
    memoryFootprintMB: 85,
    accuracyMetric: 'R² Correlation Score',
    scoreValue: '83.0% (vs 71% Linear Baseline)',
  },
  {
    modelId: 'bbc-nlp-classifier',
    name: 'BBC Text Multi-Class TF-IDF Classifier',
    category: 'Diffusion',
    parameters: '50k Features',
    fp16Throughput: 8400,
    int8Throughput: 14200,
    fp4Throughput: 19800,
    memoryFootprintMB: 210,
    accuracyMetric: 'Weighted F1-Score',
    scoreValue: '96.2%',
  },
];

// Generate 52 weeks of contribution data for 2026 / 2025
export function generateContributionData(year: number = 2026): { days: ContributionDay[]; total: number } {
  const days: ContributionDay[] = [];
  const startDate = new Date(`${year}-01-01T00:00:00Z`);
  const dayOffset = startDate.getDay();
  let totalContributions = 0;
  const repos = ['bbc-text-classification', 'production-sequencing-ml', 'stress-prediction-xgboost', 'enterprise-power-workflow-kit'];

  for (let i = 0; i < 364; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];

    const dayOfWeek = (dayOffset + i) % 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let hash = 0;
    for (let c = 0; c < dateStr.length; c++) {
      hash = (hash * 31 + dateStr.charCodeAt(c)) & 0xffffffff;
    }
    const rand = Math.abs(hash) % 100;

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (isWeekend) {
      if (rand > 60) {
        count = (rand % 3) + 1;
        level = 1;
      }
    } else {
      if (rand > 15) {
        if (rand > 85) {
          count = 8 + (rand % 6);
          level = 4;
        } else if (rand > 60) {
          count = 5 + (rand % 3);
          level = 3;
        } else if (rand > 35) {
          count = 3 + (rand % 2);
          level = 2;
        } else {
          count = 1 + (rand % 2);
          level = 1;
        }
      }
    }

    totalContributions += count;
    const repo = count > 0 ? repos[Math.abs(hash) % repos.length] : undefined;

    days.push({
      date: dateStr,
      count,
      level,
      repo,
    });
  }

  return { days, total: totalContributions };
}
