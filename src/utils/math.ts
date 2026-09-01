import { 
  Measurement, 
  TestSummary, 
  GlobalExperimentStats, 
  CalculationAuditStep, 
  SimulationParams, 
  SimulatedPoint 
} from '../types';

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
 * Calculates percentage difference using Clear bottle variation as reference baseline:
 * % = ((ΔT_preta - ΔT_transparente) / ΔT_transparente) * 100
 * 
 * If ΔT_transparente is 0, percentage is undefined (division by zero)
 */
export function calculatePercentageDifference(
  deltaBlack: number, 
  deltaClear: number
): { percentage: number | null; note: string; canCalculate: boolean } {
  if (deltaClear === 0) {
    return {
      percentage: null,
      note: 'Não é possível calcular essa porcentagem porque a variação de referência (garrafa transparente) é zero.',
      canCalculate: false,
    };
  }

  const rawPercentage = ((deltaBlack - deltaClear) / deltaClear) * 100;
  const rounded = Number(rawPercentage.toFixed(1));

  let note = '';
  if (rounded > 0) {
    note = `A variação de temperatura da garrafa preta foi ${rounded}% maior que a da transparente, usando a variação da transparente como referência.`;
  } else if (rounded < 0) {
    note = `A variação de temperatura da garrafa preta foi ${Math.abs(rounded)}% menor que a da transparente, usando a variação da transparente como referência.`;
  } else {
    note = 'A variação de temperatura de ambas as garrafas foi equivalente (0% de diferença).';
  }

  return {
    percentage: rounded,
    note,
    canCalculate: true,
  };
}

/**
 * Calculates heating rate in °C per minute
 */
export function calculateHeatingRate(deltaT: number, minutes: number): number {
  if (minutes <= 0) return 0;
  return Number((deltaT / minutes).toFixed(3));
}

/**
 * Summarizes a single experimental test by computing its individual ΔT for each bottle
 */
export function summarizeTest(
  measurements: Measurement[], 
  testNum: number, 
  marginThreshold: number = 0.5
): TestSummary | null {
  const testPoints = measurements
    .filter(m => m.testNumber === testNum && typeof m.tempBlack === 'number' && typeof m.tempClear === 'number')
    .sort((a, b) => a.timeMinutes - b.timeMinutes);

  // A complete test requires at least 2 distinct points (e.g. t=0 and t=final)
  if (testPoints.length < 2) return null;

  const first = testPoints[0];
  const last = testPoints[testPoints.length - 1];

  // Must have a positive time duration
  if (last.timeMinutes <= first.timeMinutes) return null;

  const deltaTBlack = calculateDeltaT(last.tempBlack, first.tempBlack);
  const deltaTClear = calculateDeltaT(last.tempClear, first.tempClear);
  const differenceDeltaT = Number((deltaTBlack - deltaTClear).toFixed(2));
  
  const pctResult = calculatePercentageDifference(deltaTBlack, deltaTClear);

  let higherBottle: 'black' | 'clear' | 'equal' = 'equal';
  let higherBottleLabel = 'Sem diferença clara';

  if (differenceDeltaT >= marginThreshold) {
    higherBottle = 'black';
    higherBottleLabel = 'Preta';
  } else if (-differenceDeltaT >= marginThreshold) {
    higherBottle = 'clear';
    higherBottleLabel = 'Transparente';
  }

  return {
    testNumber: testNum,
    initialTempBlack: first.tempBlack,
    finalTempBlack: last.tempBlack,
    deltaTBlack,
    initialTempClear: first.tempClear,
    finalTempClear: last.tempClear,
    deltaTClear,
    differenceDeltaT,
    percentageDifference: pctResult.percentage,
    percentageNote: pctResult.note,
    higherBottle,
    higherBottleLabel,
    measurementCount: testPoints.length,
    maxTimeMinutes: last.timeMinutes,
    isValid: true,
  };
}

/**
 * Computes consolidated global statistics and scientific conclusion across all recorded real tests
 */
export function computeGlobalStats(
  measurements: Measurement[], 
  marginThreshold: number = 0.5
): GlobalExperimentStats {
  const SCIENTIFIC_CAVEAT = 'A conclusão se aplica às condições e aos dados deste experimento. Ela não significa que o mesmo resultado ocorrerá necessariamente em todas as situações.';

  if (!measurements || measurements.length === 0) {
    return {
      hasData: false,
      hasValidTests: false,
      totalTests: 0,
      totalMeasurements: 0,
      avgInitialTemp: 0,
      avgFinalTempBlack: 0,
      avgFinalTempClear: 0,
      avgDeltaTBlack: 0,
      avgDeltaTClear: 0,
      avgDifference: 0,
      avgPercentageDiff: null,
      percentageReferenceNote: 'Insira medições para calcular a diferença percentual.',
      canCalculatePercentage: false,
      winningBottle: 'none',
      highestTempRecorded: 0,
      conclusionStatus: 'insufficient_data',
      marginThreshold,
      conclusionTitle: 'AGUARDANDO DADOS',
      conclusionBadgeText: 'AGUARDANDO DADOS',
      conclusionDescription: 'Insira os resultados completos do experimento para gerar uma conclusão.',
      interpretationText: 'Ainda não há dados suficientes com medições iniciais e finais completas para gerar a interpretação científica.',
      scientificCaveat: SCIENTIFIC_CAVEAT,
      testSummaries: [],
      estherSpeech: {
        text: 'Os dados confirmaram nossa hipótese: a garrafa preta aqueceu mais do que a transparente. Usamos uma tabela e um gráfico para organizar as temperaturas e comparar os resultados. Assim, provamos que cores escuras absorvem mais calor.',
        clozeTemplate: 'Os dados {{confirmaram}} nossa hipótese: a garrafa {{preta}} aqueceu mais do que a {{transparente}}. Usamos uma {{tabela}} e um {{gráfico}} para organizar as temperaturas e comparar os resultados. Assim, {{provamos}} que cores {{escuras}} absorvem mais calor.',
        clozeAnswers: ['confirmaram', 'preta', 'transparente', 'tabela', 'gráfico', 'provamos', 'escuras'],
      },
    };
  }

  const testNumbers = Array.from(new Set(measurements.map(m => m.testNumber))).sort((a, b) => a - b);
  const validSummaries: TestSummary[] = [];

  testNumbers.forEach(tNum => {
    const summary = summarizeTest(measurements, tNum, marginThreshold);
    if (summary) validSummaries.push(summary);
  });

  const allTemps = measurements
    .flatMap(m => [m.tempBlack, m.tempClear])
    .filter(t => typeof t === 'number' && !isNaN(t));
  const highestTempRecorded = allTemps.length > 0 ? Math.max(...allTemps) : 0;

  if (validSummaries.length === 0) {
    return {
      hasData: true,
      hasValidTests: false,
      totalTests: testNumbers.length,
      totalMeasurements: measurements.length,
      avgInitialTemp: calculateAverage(measurements.map(m => (m.tempBlack + m.tempClear) / 2)),
      avgFinalTempBlack: calculateAverage(measurements.map(m => m.tempBlack)),
      avgFinalTempClear: calculateAverage(measurements.map(m => m.tempClear)),
      avgDeltaTBlack: 0,
      avgDeltaTClear: 0,
      avgDifference: 0,
      avgPercentageDiff: null,
      percentageReferenceNote: 'É necessário ter ao menos duas medições com tempos diferentes para cada ensaio (início e fim) para calcular o ΔT.',
      canCalculatePercentage: false,
      winningBottle: 'none',
      highestTempRecorded,
      conclusionStatus: 'insufficient_data',
      marginThreshold,
      conclusionTitle: 'AGUARDANDO DADOS COMPLETOS',
      conclusionBadgeText: 'AGUARDANDO DADOS',
      conclusionDescription: 'Insira os resultados completos do experimento para gerar uma conclusão.',
      interpretationText: 'Ainda não há dados suficientes com medições iniciais e finais completas para gerar a interpretação científica.',
      scientificCaveat: SCIENTIFIC_CAVEAT,
      testSummaries: [],
      estherSpeech: {
        text: 'Os dados confirmaram nossa hipótese: a garrafa preta aqueceu mais do que a transparente. Usamos uma tabela e um gráfico para organizar as temperaturas e comparar os resultados. Assim, provamos que cores escuras absorvem mais calor.',
        clozeTemplate: 'Os dados {{confirmaram}} nossa hipótese: a garrafa {{preta}} aqueceu mais do que a {{transparente}}. Usamos uma {{tabela}} e um {{gráfico}} para organizar as temperaturas e comparar os resultados. Assim, {{provamos}} que cores {{escuras}} absorvem mais calor.',
        clozeAnswers: ['confirmaram', 'preta', 'transparente', 'tabela', 'gráfico', 'provamos', 'escuras'],
      },
    };
  }

  const avgInitialTemp = calculateAverage(validSummaries.map(s => (s.initialTempBlack + s.initialTempClear) / 2));
  const avgFinalTempBlack = calculateAverage(validSummaries.map(s => s.finalTempBlack));
  const avgFinalTempClear = calculateAverage(validSummaries.map(s => s.finalTempClear));
  const avgDeltaTBlack = calculateAverage(validSummaries.map(s => s.deltaTBlack));
  const avgDeltaTClear = calculateAverage(validSummaries.map(s => s.deltaTClear));
  const avgDifference = Number((avgDeltaTBlack - avgDeltaTClear).toFixed(2));
  
  const globalPct = calculatePercentageDifference(avgDeltaTBlack, avgDeltaTClear);

  // Conclusion Logic according to rules:
  // 1. Difference = avgDeltaTBlack - avgDeltaTClear
  // 2. Margin threshold comparison
  let conclusionStatus: 'confirmed' | 'not_confirmed' | 'inconclusive' = 'inconclusive';
  let winningBottle: 'black' | 'clear' | 'equal' = 'equal';
  let conclusionTitle = '';
  let conclusionBadgeText = '';
  let conclusionDescription = '';
  let interpretationText = '';
  let estherSpeech = {
    text: '',
    clozeTemplate: '',
    clozeAnswers: [] as string[],
  };

  if (avgDifference >= marginThreshold) {
    // Caso 1: Hipótese Confirmada
    conclusionStatus = 'confirmed';
    winningBottle = 'black';
    conclusionTitle = 'HIPÓTESE CONFIRMADA PELOS DADOS';
    conclusionBadgeText = 'HIPÓTESE CONFIRMADA PELOS DADOS';
    conclusionDescription = 'Nos testes realizados, a garrafa preta apresentou maior aumento médio de temperatura do que a garrafa transparente.';
    interpretationText = `Nos testes realizados, a garrafa preta apresentou uma variação média de temperatura de ${avgDeltaTBlack.toFixed(1)}°C, enquanto a garrafa transparente apresentou ${avgDeltaTClear.toFixed(1)}°C. Portanto, nas condições utilizadas neste experimento, a garrafa preta apresentou maior aumento de temperatura, o que está de acordo com nossa hipótese.`;
    
    estherSpeech = {
      text: 'Os dados confirmaram nossa hipótese: a garrafa preta aqueceu mais do que a transparente. Usamos uma tabela e um gráfico para organizar as temperaturas e comparar os resultados. Assim, provamos que cores escuras absorvem mais calor.',
      clozeTemplate: 'Os dados {{confirmaram}} nossa hipótese: a garrafa {{preta}} aqueceu mais do que a {{transparente}}. Usamos uma {{tabela}} e um {{gráfico}} para organizar as temperaturas e comparar os resultados. Assim, {{provamos}} que cores {{escuras}} absorvem mais calor.',
      clozeAnswers: ['confirmaram', 'preta', 'transparente', 'tabela', 'gráfico', 'provamos', 'escuras'],
    };
  } else if (-avgDifference >= marginThreshold) {
    // Caso 2: Hipótese Não Confirmada
    conclusionStatus = 'not_confirmed';
    winningBottle = 'clear';
    conclusionTitle = 'HIPÓTESE NÃO CONFIRMADA';
    conclusionBadgeText = 'HIPÓTESE NÃO CONFIRMADA';
    conclusionDescription = 'Nos testes realizados, a garrafa transparente apresentou maior aumento médio de temperatura do que a garrafa preta. Portanto, os dados não confirmaram nossa hipótese inicial.';
    interpretationText = `Nos testes realizados, a garrafa transparente apresentou uma variação média de temperatura maior que a garrafa preta (Transparente: ${avgDeltaTClear.toFixed(1)}°C vs Preta: ${avgDeltaTBlack.toFixed(1)}°C). Portanto, os dados obtidos não confirmaram nossa hipótese inicial.`;
    
    estherSpeech = {
      text: 'Os dados não confirmaram nossa hipótese inicial. A garrafa transparente apresentou maior aumento de temperatura nas condições do nosso experimento. Usamos uma tabela e um gráfico para organizar as temperaturas e comparar os resultados.',
      clozeTemplate: 'Os dados {{não confirmaram}} nossa hipótese inicial. A garrafa {{transparente}} apresentou maior aumento de temperatura nas condições do nosso experimento. Usamos uma {{tabela}} e um {{gráfico}} para organizar as temperaturas e comparar os resultados.',
      clozeAnswers: ['não confirmaram', 'transparente', 'tabela', 'gráfico'],
    };
  } else {
    // Caso 3: Resultado Sem Diferença Clara (Inconclusivo)
    conclusionStatus = 'inconclusive';
    winningBottle = 'equal';
    conclusionTitle = 'RESULTADO SEM DIFERENÇA CLARA';
    conclusionBadgeText = 'SEM DIFERENÇA CLARA';
    conclusionDescription = 'As médias apresentaram valores muito próximos. Com os dados disponíveis, não é possível afirmar uma diferença clara entre os dois tratamentos.';
    interpretationText = `As variações médias de temperatura foram muito próximas (Garrafa preta: ${avgDeltaTBlack.toFixed(1)}°C vs Transparente: ${avgDeltaTClear.toFixed(1)}°C, diferença de ${Math.abs(avgDifference).toFixed(1)}°C inferior à margem de ${marginThreshold.toFixed(1)}°C). Com os dados disponíveis, não foi observada uma diferença clara entre as garrafas.`;
    
    estherSpeech = {
      text: 'Os dados não mostraram uma diferença clara entre as duas garrafas. Usamos uma tabela e um gráfico para organizar as temperaturas e comparar os resultados. Por isso, seriam necessários mais testes para chegar a uma conclusão mais clara.',
      clozeTemplate: 'Os dados {{não mostraram}} uma diferença clara entre as duas garrafas. Usamos uma {{tabela}} e um {{gráfico}} para organizar as temperaturas e comparar os resultados. Por isso, seriam necessários {{mais testes}} para chegar a uma conclusão mais clara.',
      clozeAnswers: ['não mostraram', 'tabela', 'gráfico', 'mais testes'],
    };
  }

  return {
    hasData: true,
    hasValidTests: true,
    totalTests: validSummaries.length,
    totalMeasurements: measurements.length,
    avgInitialTemp,
    avgFinalTempBlack,
    avgFinalTempClear,
    avgDeltaTBlack,
    avgDeltaTClear,
    avgDifference,
    avgPercentageDiff: globalPct.percentage,
    percentageReferenceNote: globalPct.note,
    canCalculatePercentage: globalPct.canCalculate,
    winningBottle,
    highestTempRecorded,
    conclusionStatus,
    marginThreshold,
    conclusionTitle,
    conclusionBadgeText,
    conclusionDescription,
    interpretationText,
    scientificCaveat: SCIENTIFIC_CAVEAT,
    testSummaries: validSummaries,
    estherSpeech,
  };
}

/**
 * Builds the 7-step calculation audit for student/teacher presentation
 */
export function getCalculationAudit(
  measurements: Measurement[], 
  marginThreshold: number = 0.5
): CalculationAuditStep[] {
  const stats = computeGlobalStats(measurements, marginThreshold);

  if (!stats.hasValidTests || stats.testSummaries.length === 0) {
    return [
      {
        stepNumber: 1,
        title: 'Verificação de Dados Coletados',
        description: 'Verificação se há medições iniciais e finais completas para cada garrafa.',
        calculationDetails: ['Nenhum teste possui par de medições inicial (t=0) e final (t>0) completo.'],
        summaryResult: 'Aguardando dados completos.',
        scientificSignificance: 'Não é possível calcular variações térmicas (ΔT) sem pontos inicial e final.',
      }
    ];
  }

  const summaries = stats.testSummaries;

  // Step 1: Initial Temperatures
  const step1Details = summaries.map(
    s => `Teste ${s.testNumber}: Garrafa Preta = ${s.initialTempBlack.toFixed(1)}°C | Garrafa Transparente = ${s.initialTempClear.toFixed(1)}°C`
  );

  // Step 2: Final Temperatures
  const step2Details = summaries.map(
    s => `Teste ${s.testNumber}: Garrafa Preta = ${s.finalTempBlack.toFixed(1)}°C | Garrafa Transparente = ${s.finalTempClear.toFixed(1)}°C (em t = ${s.maxTimeMinutes} min)`
  );

  // Step 3: Delta T per test
  const step3Details = summaries.map(
    s => `Teste ${s.testNumber}: ΔT_preta = ${s.finalTempBlack.toFixed(1)} − ${s.initialTempBlack.toFixed(1)} = +${s.deltaTBlack.toFixed(1)}°C | ΔT_transparente = ${s.finalTempClear.toFixed(1)} − ${s.initialTempClear.toFixed(1)} = +${s.deltaTClear.toFixed(1)}°C (Diferença individual: ${s.differenceDeltaT > 0 ? '+' : ''}${s.differenceDeltaT.toFixed(1)}°C)`
  );

  // Step 4: Averages
  const blackDeltasStr = summaries.map(s => `${s.deltaTBlack.toFixed(1)}`).join(' + ');
  const clearDeltasStr = summaries.map(s => `${s.deltaTClear.toFixed(1)}`).join(' + ');
  const count = summaries.length;
  const step4Details = [
    `Média ΔT Preta = (${blackDeltasStr}) ÷ ${count} = +${stats.avgDeltaTBlack.toFixed(1)}°C`,
    `Média ΔT Transparente = (${clearDeltasStr}) ÷ ${count} = +${stats.avgDeltaTClear.toFixed(1)}°C`,
  ];

  // Step 5: Difference between averages
  const diffStr = `Diferença das Médias = ${stats.avgDeltaTBlack.toFixed(1)}°C − ${stats.avgDeltaTClear.toFixed(1)}°C = ${stats.avgDifference > 0 ? '+' : ''}${stats.avgDifference.toFixed(1)}°C`;
  const step5Details = [
    diffStr,
    stats.canCalculatePercentage 
      ? `Diferença Percentual = ((${stats.avgDeltaTBlack.toFixed(1)} − ${stats.avgDeltaTClear.toFixed(1)}) ÷ ${stats.avgDeltaTClear.toFixed(1)}) × 100 = ${stats.avgPercentageDiff}%`
      : stats.percentageReferenceNote,
  ];

  // Step 6: Criterion and margin
  const marginStr = `Margem configurada = ${marginThreshold.toFixed(1)}°C.`;
  let criterionAnalysis = '';
  if (stats.avgDifference >= marginThreshold) {
    criterionAnalysis = `Como a diferença (+${stats.avgDifference.toFixed(1)}°C) é MAIOR ou IGUAL à margem (+${marginThreshold.toFixed(1)}°C), classifica-se como Hipótese Confirmada.`;
  } else if (-stats.avgDifference >= marginThreshold) {
    criterionAnalysis = `Como a diferença negativa (${stats.avgDifference.toFixed(1)}°C) é MAIOR ou IGUAL à margem em favor da transparente, classifica-se como Hipótese Não Confirmada.`;
  } else {
    criterionAnalysis = `Como o valor absoluto da diferença (|${stats.avgDifference.toFixed(1)}°C|) é INFERIOR à margem (${marginThreshold.toFixed(1)}°C), classifica-se como Sem Diferença Clara.`;
  }

  // Step 7: Final conclusion
  const step7Details = [
    `Status Científico: ${stats.conclusionTitle}`,
    `Interpretação: "${stats.interpretationText}"`,
    `Ressalva: "${stats.scientificCaveat}"`,
  ];

  return [
    {
      stepNumber: 1,
      title: 'Temperaturas Iniciais (T_inicial)',
      description: 'Registro das temperaturas antes do início da exposição solar para cada teste.',
      formula: 'T_inicial = T(t = 0 min)',
      calculationDetails: step1Details,
      summaryResult: `Temperatura inicial média geral: ${stats.avgInitialTemp.toFixed(1)}°C`,
      scientificSignificance: 'Permite isolar variações causadas por pequenas diferenças térmicas de partida.',
    },
    {
      stepNumber: 2,
      title: 'Temperaturas Finais (T_final)',
      description: 'Registro das temperaturas no término da exposição solar.',
      formula: 'T_final = T(t = t_máx)',
      calculationDetails: step2Details,
      summaryResult: `Média final: Preta = ${stats.avgFinalTempBlack.toFixed(1)}°C | Transparente = ${stats.avgFinalTempClear.toFixed(1)}°C`,
      scientificSignificance: 'Mede o estado térmico atingido após a absorção contínua da radiação.',
    },
    {
      stepNumber: 3,
      title: 'Cálculo do ΔT de Cada Teste Individual',
      description: 'Cálculo do aumento efetivo de temperatura em cada ensaio independente.',
      formula: 'ΔT = T_final − T_inicial',
      calculationDetails: step3Details,
      summaryResult: `${summaries.length} ${summaries.length === 1 ? 'teste calculado' : 'testes calculados'} com sucesso.`,
      scientificSignificance: 'Grandeza fundamental que remove qualquer assimetria na temperatura inicial da água.',
    },
    {
      stepNumber: 4,
      title: 'Médias Aritméticas das Variações',
      description: 'Consolidação estatística dos testes para minimizar ruídos ambientais.',
      formula: 'x̄ = (ΔT₁ + ΔT₂ + ... + ΔTₙ) ÷ n',
      calculationDetails: step4Details,
      summaryResult: `ΔT Médio Preta: +${stats.avgDeltaTBlack.toFixed(1)}°C | ΔT Médio Transparente: +${stats.avgDeltaTClear.toFixed(1)}°C`,
      scientificSignificance: 'Aumenta a confiabilidade do experimento ao diluir variações pontuais (vento, nuvens).',
    },
    {
      stepNumber: 5,
      title: 'Diferença entre as Médias de ΔT',
      description: 'Subtração direta das médias e cálculo proporcional relativo.',
      formula: 'Diferença = x̄(ΔT_preta) − x̄(ΔT_transparente)',
      calculationDetails: step5Details,
      summaryResult: `Diferença média: ${stats.avgDifference > 0 ? '+' : ''}${stats.avgDifference.toFixed(1)}°C`,
      scientificSignificance: 'Quantifica numericamente a vantagem térmica observada.',
    },
    {
      stepNumber: 6,
      title: 'Aplicação do Critério e Margem de Tolerância',
      description: 'Comparação da diferença média com a margem mínima para evitar conclusões precipitadas.',
      formula: '|ΔT_médio_preta − ΔT_médio_transparente| ≥ Margem_mínima',
      calculationDetails: [marginStr, criterionAnalysis],
      summaryResult: `Critério aplicado com margem de ${marginThreshold.toFixed(1)}°C.`,
      scientificSignificance: 'Garante rigor metodológico científico ao descartar variações estatisticamente insignificantes.',
    },
    {
      stepNumber: 7,
      title: 'Conclusão Científica Fundamentada',
      description: 'Síntese textual baseada estritamente nas evidências numéricas apuradas.',
      calculationDetails: step7Details,
      summaryResult: stats.conclusionTitle,
      scientificSignificance: 'Evita viés de confirmação e apoia a investigação científica nos fatos medidos.',
    },
  ];
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

/**
 * Logic Verification Suite for internal self-tests (Testes A, B, C, D, E)
 */
export interface LogicTestResult {
  id: string;
  name: string;
  description: string;
  inputMeasurements: Measurement[];
  margin: number;
  expectedStatus: 'confirmed' | 'not_confirmed' | 'inconclusive' | 'insufficient_data';
  actualStatus: 'confirmed' | 'not_confirmed' | 'inconclusive' | 'insufficient_data';
  passed: boolean;
  details: {
    avgDeltaTBlack: number;
    avgDeltaTClear: number;
    difference: number;
    conclusionTitle: string;
  };
}

export function runLogicTests(): LogicTestResult[] {
  // Teste A: Preta ΔT = 15°C, Transparente ΔT = 10°C => Hipótese Confirmada
  const testA_measurements: Measurement[] = [
    { id: 'ta-1', testNumber: 1, timeMinutes: 0, tempBlack: 25.0, tempClear: 25.0 },
    { id: 'ta-2', testNumber: 1, timeMinutes: 30, tempBlack: 40.0, tempClear: 35.0 },
  ];
  const statsA = computeGlobalStats(testA_measurements, 0.5);
  const resultA: LogicTestResult = {
    id: 'test-a',
    name: 'Teste A: Hipótese Confirmada',
    description: 'Preta: ΔT médio = 15°C | Transparente: ΔT médio = 10°C (Diferença = +5°C)',
    inputMeasurements: testA_measurements,
    margin: 0.5,
    expectedStatus: 'confirmed',
    actualStatus: statsA.conclusionStatus,
    passed: statsA.conclusionStatus === 'confirmed',
    details: {
      avgDeltaTBlack: statsA.avgDeltaTBlack,
      avgDeltaTClear: statsA.avgDeltaTClear,
      difference: statsA.avgDifference,
      conclusionTitle: statsA.conclusionTitle,
    },
  };

  // Teste B: Preta ΔT = 10°C, Transparente ΔT = 15°C => Hipótese Não Confirmada
  const testB_measurements: Measurement[] = [
    { id: 'tb-1', testNumber: 1, timeMinutes: 0, tempBlack: 25.0, tempClear: 25.0 },
    { id: 'tb-2', testNumber: 1, timeMinutes: 30, tempBlack: 35.0, tempClear: 40.0 },
  ];
  const statsB = computeGlobalStats(testB_measurements, 0.5);
  const resultB: LogicTestResult = {
    id: 'test-b',
    name: 'Teste B: Hipótese Não Confirmada',
    description: 'Preta: ΔT médio = 10°C | Transparente: ΔT médio = 15°C (Diferença = -5°C)',
    inputMeasurements: testB_measurements,
    margin: 0.5,
    expectedStatus: 'not_confirmed',
    actualStatus: statsB.conclusionStatus,
    passed: statsB.conclusionStatus === 'not_confirmed',
    details: {
      avgDeltaTBlack: statsB.avgDeltaTBlack,
      avgDeltaTClear: statsB.avgDeltaTClear,
      difference: statsB.avgDifference,
      conclusionTitle: statsB.conclusionTitle,
    },
  };

  // Teste C: Preta ΔT = 10.2°C, Transparente ΔT = 10.0°C (Margem 0.5°C) => Sem Diferença Clara
  const testC_measurements: Measurement[] = [
    { id: 'tc-1', testNumber: 1, timeMinutes: 0, tempBlack: 25.0, tempClear: 25.0 },
    { id: 'tc-2', testNumber: 1, timeMinutes: 30, tempBlack: 35.2, tempClear: 35.0 },
  ];
  const statsC = computeGlobalStats(testC_measurements, 0.5);
  const resultC: LogicTestResult = {
    id: 'test-c',
    name: 'Teste C: Sem Diferença Clara (Margem 0.5°C)',
    description: 'Preta: ΔT médio = 10.2°C | Transparente: ΔT médio = 10.0°C (Diferença = 0.2°C < 0.5°C)',
    inputMeasurements: testC_measurements,
    margin: 0.5,
    expectedStatus: 'inconclusive',
    actualStatus: statsC.conclusionStatus,
    passed: statsC.conclusionStatus === 'inconclusive',
    details: {
      avgDeltaTBlack: statsC.avgDeltaTBlack,
      avgDeltaTClear: statsC.avgDeltaTClear,
      difference: statsC.avgDifference,
      conclusionTitle: statsC.conclusionTitle,
    },
  };

  // Teste D: Sem dados completos => Aguardando Dados
  const testD_measurements: Measurement[] = [];
  const statsD = computeGlobalStats(testD_measurements, 0.5);
  const resultD: LogicTestResult = {
    id: 'test-d',
    name: 'Teste D: Dados Insuficientes / Aguardando',
    description: 'Nenhuma medição registrada no banco de dados',
    inputMeasurements: testD_measurements,
    margin: 0.5,
    expectedStatus: 'insufficient_data',
    actualStatus: statsD.conclusionStatus,
    passed: statsD.conclusionStatus === 'insufficient_data',
    details: {
      avgDeltaTBlack: statsD.avgDeltaTBlack,
      avgDeltaTClear: statsD.avgDeltaTClear,
      difference: statsD.avgDifference,
      conclusionTitle: statsD.conclusionTitle,
    },
  };

  // Teste E: Caso com temperaturas iniciais diferentes
  const testE_measurements: Measurement[] = [
    { id: 'te-1', testNumber: 1, timeMinutes: 0, tempBlack: 24.0, tempClear: 26.0 },
    { id: 'te-2', testNumber: 1, timeMinutes: 30, tempBlack: 39.0, tempClear: 36.0 },
  ];
  // ΔT preta = 39 - 24 = 15°C | ΔT transparente = 36 - 26 = 10°C => Hipótese confirmada mesmo com T0 diferente
  const statsE = computeGlobalStats(testE_measurements, 0.5);
  const resultE: LogicTestResult = {
    id: 'test-e',
    name: 'Teste E: Temperaturas Iniciais Diferentes',
    description: 'Preta: T0=24°C, Tf=39°C (ΔT=15°C) | Transparente: T0=26°C, Tf=36°C (ΔT=10°C)',
    inputMeasurements: testE_measurements,
    margin: 0.5,
    expectedStatus: 'confirmed',
    actualStatus: statsE.conclusionStatus,
    passed: statsE.conclusionStatus === 'confirmed' && statsE.avgDeltaTBlack === 15 && statsE.avgDeltaTClear === 10,
    details: {
      avgDeltaTBlack: statsE.avgDeltaTBlack,
      avgDeltaTClear: statsE.avgDeltaTClear,
      difference: statsE.avgDifference,
      conclusionTitle: statsE.conclusionTitle,
    },
  };

  return [resultA, resultB, resultC, resultD, resultE];
}
