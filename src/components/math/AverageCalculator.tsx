import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Sigma, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { calculateAverage } from '../../utils/math';
import { sound } from '../../utils/sound';

export const AverageCalculator: React.FC = () => {
  const [testValues, setTestValues] = useState<string[]>(['14.0', '13.5', '14.5']);
  const [result, setResult] = useState<number | null>(14.0);

  const handleAddSample = () => {
    sound.playClick();
    setTestValues(prev => [...prev, '']);
  };

  const handleRemoveSample = (index: number) => {
    sound.playClick();
    setTestValues(prev => prev.filter((_, i) => i !== index));
  };

  const handleValueChange = (index: number, val: string) => {
    const next = [...testValues];
    next[index] = val;
    setTestValues(next);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = testValues
      .map(v => parseFloat(v.replace(',', '.')))
      .filter(n => !isNaN(n));

    if (numbers.length > 0) {
      sound.playClick();
      setResult(calculateAverage(numbers));
    }
  };

  const validNumbers = testValues
    .map(v => parseFloat(v.replace(',', '.')))
    .filter(n => !isNaN(n));
  const sum = validNumbers.reduce((a, b) => a + b, 0);

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sigma className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-100 font-display">
            Calculadora 2: Média Aritmética dos Ensaios
          </h3>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4 text-xs">
        <div className="space-y-2">
          <label className="text-slate-300 font-semibold block">
            Valores dos Ensaios / Testes (°C):
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {testValues.map((val, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleValueChange(idx, e.target.value)}
                    placeholder={`Teste ${idx + 1}`}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl font-mono text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono">°C</span>
                </div>
                {testValues.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSample(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddSample}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 pt-1"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar mais um teste
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
        >
          Calcular Média Aritmética
        </Button>
      </form>

      {/* Result demonstration */}
      {result !== null && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-emerald-400">
              Cálculo da Média:
            </span>
            <span className="font-mono text-slate-300 font-bold">
              ({validNumbers.join(' + ')}) ÷ {validNumbers.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-0.5">Média Final Consolidada:</span>
            <span className="text-2xl font-mono font-extrabold text-emerald-300">
              {result.toFixed(2)}°C
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
            💡 <em>A média permite representar os resultados de vários testes em um único valor e ajuda a reduzir a influência de variações entre as medições.</em>
          </p>
        </div>
      )}
    </Card>
  );
};
