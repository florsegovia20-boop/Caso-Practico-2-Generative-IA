export interface KPIData {
  name: string;
  current: string;
  target: string;
  metric: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  actions: string[];
}

export interface RiskItem {
  risk: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
  mitigation: string;
}

export interface ChartDataPoint {
  month: string;
  revenueBaseline: number;
  revenueGenAI: number;
}

export interface StrategyData {
  companyName: string;
  executiveSummary: string;
  businessAlignment: {
    challenges: string[];
    goals: string[];
    kpis: KPIData[];
    highImpactUseCases: { title: string; description: string; impact: string }[];
    roadmap: RoadmapPhase[];
  };
  dataInfrastructure: {
    culturePlan: string[];
    infrastructure: { component: string; purpose: string }[];
    qualityMeasures: string[];
  };
  talentCapabilities: {
    rolesNeeded: string[];
    partnerships: string[];
    trainingProgram: { module: string; audience: string }[];
  };
  ethicsGovernance: {
    principles: string[];
    risks: RiskItem[];
    governanceProcess: string;
  };
  projectedGrowth: ChartDataPoint[];
}

export enum AppState {
  INPUT,
  LOADING,
  RESULT,
  ERROR
}