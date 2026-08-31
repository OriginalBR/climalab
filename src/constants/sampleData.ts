import { Measurement } from '../types';

export const SAMPLE_DATASET: Measurement[] = [
  { id: 's-1', testNumber: 1, timeMinutes: 0, tempBlack: 24.5, tempClear: 24.5, notes: 'Início da exposição solar' },
  { id: 's-2', testNumber: 1, timeMinutes: 10, tempBlack: 29.2, tempClear: 26.8, notes: 'Sol pleno e sem vento' },
  { id: 's-3', testNumber: 1, timeMinutes: 20, tempBlack: 34.0, tempClear: 29.5, notes: 'Intensa absorção na garrafa preta' },
  { id: 's-4', testNumber: 1, timeMinutes: 30, tempBlack: 38.5, tempClear: 32.1, notes: 'Medição final do primeiro teste' },
  { id: 's-5', testNumber: 2, timeMinutes: 0, tempBlack: 25.0, tempClear: 25.0, notes: 'Início do segundo ensaio' },
  { id: 's-6', testNumber: 2, timeMinutes: 10, tempBlack: 29.8, tempClear: 27.2, notes: 'Brisa leve' },
  { id: 's-7', testNumber: 2, timeMinutes: 20, tempBlack: 34.7, tempClear: 30.1, notes: 'Condição estável' },
  { id: 's-8', testNumber: 2, timeMinutes: 30, tempBlack: 39.1, tempClear: 32.8, notes: 'Medição final do segundo teste' },
];
