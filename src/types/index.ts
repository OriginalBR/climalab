export type ConclusionStatus = 'confirmed' | 'not_confirmed' | 'inconclusive' | 'insufficient_data';

export interface Measurement {
  id: string;
  testNumber: number; // e.g. 1, 2, 3
  timeMinutes: number; // e.g. 0, 10, 20, 30
  tempBlack: number; // °C
  tempClear: number; // °C
  timestamp?: string;
  notes?: string;
}

export interface TestSummary {
  testNumber: number;
  initialTempBlack: number;
  finalTempBlack: number;
  deltaTBlack: number;
  initialTempClear: number;
  finalTempClear: number;
  deltaTClear: number;
  differenceDeltaT: number; // deltaTBlack - deltaTClear
  percentageDifference: number | null; // null if deltaTClear is 0
  percentageNote: string;
  higherBottle: 'black' | 'clear' | 'equal';
  higherBottleLabel: string;
  measurementCount: number;
  maxTimeMinutes: number;
  isValid: boolean;
}

export interface GlobalExperimentStats {
  hasData: boolean;
  hasValidTests: boolean;
  totalTests: number;
  totalMeasurements: number;
  avgInitialTemp: number;
  avgFinalTempBlack: number;
  avgFinalTempClear: number;
  avgDeltaTBlack: number;
  avgDeltaTClear: number;
  avgDifference: number; // avgDeltaTBlack - avgDeltaTClear
  avgPercentageDiff: number | null; // null if avgDeltaTClear is 0
  percentageReferenceNote: string;
  canCalculatePercentage: boolean;
  winningBottle: 'black' | 'clear' | 'equal' | 'none';
  highestTempRecorded: number;
  conclusionStatus: ConclusionStatus;
  marginThreshold: number; // Configurable minimal difference margin (default: 0.5°C)
  conclusionTitle: string;
  conclusionBadgeText: string;
  conclusionDescription: string;
  interpretationText: string;
  scientificCaveat: string;
  testSummaries: TestSummary[];
  estherSpeech: {
    text: string;
    clozeTemplate: string;
    clozeAnswers: string[];
  };
}

export interface CalculationAuditStep {
  stepNumber: number;
  title: string;
  description: string;
  formula?: string;
  calculationDetails: string[];
  summaryResult: string;
  scientificSignificance: string;
}

export type MasteryLevel = 'none' | 'practicing' | 'good' | 'mastered';

export interface SpeechMember {
  id: string;
  name: string;
  role: string;
  topic: string;
  avatarSeed: string;
  speechText: string;
  clozeTemplate: string; // text with {{word}} syntax for interactive memory quiz
  clozeAnswers: string[];
  tips: string[];
  masteryLevel: MasteryLevel;
  practiceCount: number;
  lastPracticed?: string;
}

export interface ChecklistItem {
  id: string;
  category: 'experiment' | 'data' | 'presentation' | 'materials';
  label: string;
  description?: string;
  completed: boolean;
}

export interface GlossaryTerm {
  term: string;
  symbol?: string;
  category: 'physics' | 'math' | 'climate' | 'method';
  definition: string;
  exampleInProject: string;
}

export interface SimulationParams {
  initialTemp: number; // °C
  exposureMinutes: number; // e.g. 30
  intervalMinutes: number; // e.g. 5
  blackHeatingRate: number; // °C per 10min baseline
  clearHeatingRate: number; // °C per 10min baseline
  solarIntensity: 'low' | 'medium' | 'high'; // affects curve steepness
  windConvection: 'none' | 'breeze' | 'moderate'; // cools down slightly
}

export interface SimulatedPoint {
  timeMinutes: number;
  tempBlack: number;
  tempClear: number;
  difference: number;
}

export type ActivePage = 
  | 'dashboard'
  | 'experiment'
  | 'simulation'
  | 'data'
  | 'charts'
  | 'math'
  | 'ods13'
  | 'speeches'
  | 'presentation'
  | 'checklist';
