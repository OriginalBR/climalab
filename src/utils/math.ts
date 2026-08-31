import { Measurement, TestSummary, GlobalExperimentStats, SimulationParams, SimulatedPoint } from '../types';

/**
 * Calculates Delta T (Temperature Variation): ΔT = T_final - T_initial
 */
export function calculateDeltaT(finalT: number, initialT: number): number {
  return Number((finalT - initialT).toFixed(2));
}

/**
 * Calculates Arithmetic Average
 */
export function calculateAverage(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / values.length).toFixed(2));
}

/**
 * Calculates percentage difference: ((DeltaHigher - DeltaLower) / DeltaLower) * 100
 */
export function calculatePercentageDifference(delta1: number, delta2: number): number {
  if (delta1 === 0 && delta2 === 0) return 0;
  const higher = Math.max(delta1, delta2);
  const lower = Math.min(delta1, delta2);
  if (lower <= 0) return 0;
  return Number((((higher - lower) / lower) * 100).toFixed(1));
}

/**
 * Calculates heating rate in °C per minute
 */
export function calculateHeatingRate(deltaT: number, minutes: number): number {
  if (minutes <= 0) return 0;
  return Number((deltaT / minutes).toFixed(3));
}

/**
 * Summarizes a single experimental test
 */
export function summarizeTest(measurements: Measurement[], testNum: number): TestSummary | null {
  const testPoints = measurements
    .filter(m => m.testNumber === testNum)
    .sort((a, b) => a.timeMinutes - b.timeMinutes);

  if (testPoints.length < 2) return null;

  const first = testPoints[0];
  const last = testPoints[testPoints.length - 1];

  const deltaTBlack = calculateDeltaT(last.tempBlack, first.tempBlack);
  const deltaTClear = calculateDeltaT(last.tempClear, first.tempClear);
  const differenceDeltaT = Number((deltaTBlack - deltaTClear).toFixed(2));
  const percentageDifference = calculatePercentageDifference(deltaTBlack, deltaTClear);

  return {
    testNumber: testNum,
    initialTempBlack: first.tempBlack,
    finalTempBlack: last.tempBlack,
    deltaTBlack,
    initialTempClear: first.tempClear,
    finalTempClear: last.tempClear,
    deltaTClear,
    differenceDeltaT,
    percentageDifference,
    measurementCount: testPoints.length,
    maxTimeMinutes: last.timeMinutes,
  };
}

/**
 * Computes consolidated global statistics across all recorded real tests
 */
export function computeGlobalStats(measurements: Measurement[]): GlobalExperimentStats {
  if (!measurements || measurements.length === 0) {
    return {
      hasData: false,
      totalTests: 0,
      totalMeasurements: 0,
      avgInitialTemp: 0,
      avgFinalTempBlack: 0,
      avgFinalTempClear: 0,
      avgDeltaTBlack: 0,
      avgDeltaTClear: 0,
      avgDifference: 0,
      avgPercentageDiff: 0,
      winningBottle: 'none',
      highestTempRecorded: 0,
    };
  }

  const testNumbers = Array.from(new Set(measurements.map(m => m.testNumber)));
  const validSummaries: TestSummary[] = [];

  testNumbers.forEach(tNum => {
    const summary = summarizeTest(measurements, tNum);
    if (summary) validSummaries.push(summary);
  });

  if (validSummaries.length === 0) {
    // Has measurements, but not enough points per test to form a delta
    const allBlack = measurements.map(m => m.tempBlack);
    const allClear = measurements.map(m => m.tempClear);
    const maxT = Math.max(...allBlack, ...allClear);

    return {
      hasData: true,
      totalTests: testNumbers.length,
      totalMeasurements: measurements.length,
      avgInitialTemp: calculateAverage(measurements.map(m => (m.tempBlack + m.tempClear) / 2)),
      avgFinalTempBlack: calculateAverage(allBlack),
      avgFinalTempClear: calculateAverage(allClear),
      avgDeltaTBlack: 0,
      avgDeltaTClear: 0,
      avgDifference: 0,
      avgPercentageDiff: 0,
      winningBottle: 'none',
      highestTempRecorded: maxT,
    };
  }

  const avgInitialTemp = calculateAverage(validSummaries.map(s => (s.initialTempBlack + s.initialTempClear) / 2));
  const avgFinalTempBlack = calculateAverage(validSummaries.map(s => s.finalTempBlack));
  const avgFinalTempClear = calculateAverage(validSummaries.map(s => s.finalTempClear));
  const avgDeltaTBlack = calculateAverage(validSummaries.map(s => s.deltaTBlack));
  const avgDeltaTClear = calculateAverage(validSummaries.map(s => s.deltaTClear));
  const avgDifference = Number((avgDeltaTBlack - avgDeltaTClear).toFixed(2));
  const avgPercentageDiff = calculatePercentageDifference(avgDeltaTBlack, avgDeltaTClear);

  let winningBottle: 'black' | 'clear' | 'equal' | 'none' = 'none';
  if (avgDeltaTBlack > avgDeltaTClear) winningBottle = 'black';
  else if (avgDeltaTClear > avgDeltaTBlack) winningBottle = 'clear';
  else winningBottle = 'equal';

  const allTemps = measurements.flatMap(m => [m.tempBlack, m.tempClear]);
  const highestTempRecorded = Math.max(...allTemps);

  return {
    hasData: true,
    totalTests: validSummaries.length,
    totalMeasurements: measurements.length,
    avgInitialTemp,
    avgFinalTempBlack,
    avgFinalTempClear,
    avgDeltaTBlack,
    avgDeltaTClear,
    avgDifference,
    avgPercentageDiff,
    winningBottle,
    highestTempRecorded,
  };
}

/**
 * Runs parametric physical simulation based on solar radiation model
 */
export function runParametricSimulation(params: SimulationParams): SimulatedPoint[] {
  const points: SimulatedPoint[] = [];
  const { initialTemp, exposureMinutes, intervalMinutes, blackHeatingRate, clearHeatingRate, solarIntensity, windConvection } = params;

  // Environmental multiplier
  let solarMultiplier = 1.0;
  if (solarIntensity === 'low') solarMultiplier = 0.7;
  if (solarIntensity === 'high') solarMultiplier = 1.35;

  let windCoolingFactor = 0.0;
  if (windConvection === 'breeze') windCoolingFactor = 0.08;
  if (windConvection === 'moderate') windCoolingFactor = 0.18;

  // Natural heating curves with saturation (Newton's cooling law curve approximation)
  for (let t = 0; t <= exposureMinutes; t += intervalMinutes) {
    // Thermal rise saturation factor
    const timeFrac = t / 10; // scaled per 10min
    
    // Diminishing returns formula as equilibrium approaches: ΔT = Max * (1 - e^(-k*t))
    const blackGain = (blackHeatingRate * solarMultiplier * (1 - Math.exp(-0.45 * timeFrac))) / (1 + windCoolingFactor);
    const clearGain = (clearHeatingRate * solarMultiplier * (1 - Math.exp(-0.35 * timeFrac))) / (1 + windCoolingFactor);

    const tempBlack = Number((initialTemp + blackGain).toFixed(2));
    const tempClear = Number((initialTemp + clearGain).toFixed(2));
    const difference = Number((tempBlack - tempClear).toFixed(2));

    points.push({
      timeMinutes: t,
      tempBlack,
      tempClear,
      difference,
    });
  }

  return points;
}
