import React, { useState } from 'react';
import { PlusCircle, Clock, Thermometer, FileText, Check } from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

export const MeasurementInputForm: React.FC = () => {
  const { addMeasurement, measurements } = useExperiment();

  // Suggest default test number based on existing measurements
  const maxExistingTest = measurements.length > 0 ? Math.max(...measurements.map(m => m.testNumber)) : 1;

  const [testNumber, setTestNumber] = useState<number>(maxExistingTest);
  const [timeMinutes, setTimeMinutes] = useState<string>('');
  const [tempBlack, setTempBlack] = useState<string>('');
  const [tempClear, setTempClear] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [successFeedback, setSuccessFeedback] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const time = parseFloat(timeMinutes);
    const black = parseFloat(tempBlack.replace(',', '.'));
    const clear = parseFloat(tempClear.replace(',', '.'));

    if (isNaN(time) || time < 0) {
      setErrorMsg('Informe um tempo de medição válido em minutos.');
      return;
    }
    if (isNaN(black) || black < 0 || black > 80) {
      setErrorMsg('Informe uma temperatura válida para a garrafa preta (ex: 28.5).');
      return;
    }
    if (isNaN(clear) || clear < 0 || clear > 80) {
      setErrorMsg('Informe uma temperatura válida para a garrafa transparente (ex: 26.0).');
      return;
    }

    addMeasurement({
      testNumber: Number(testNumber) || 1,
      timeMinutes: time,
      tempBlack: black,
      tempClear: clear,
      notes: notes.trim() || undefined,
    });

    // Reset inputs for next sequential measurement
    // Automatically suggest next time interval (+10 min)
    setTimeMinutes(String(time + 10));
    setTempBlack('');
    setTempClear('');
    setNotes('');

    setSuccessFeedback(true);
    setTimeout(() => setSuccessFeedback(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {successFeedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Medição registrada com sucesso e salva no navegador!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        
        {/* Test Number */}
        <div>
          <label className="text-slate-300 font-semibold block mb-1">
            Ensaio / Teste Nº:
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setTestNumber(num)}
                className={`flex-1 py-2 rounded-xl font-mono text-xs font-bold border transition-colors ${
                  testNumber === num
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Teste {num}
              </button>
            ))}
          </div>
        </div>

        {/* Time Minutes */}
        <div>
          <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Tempo de Exposição (min):
          </label>
          <input
            type="number"
            min={0}
            step={1}
            placeholder="Ex: 0, 10, 20, 30"
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Temp Black */}
        <div>
          <label className="text-rose-400 font-semibold block mb-1 flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            Temp. Garrafa Preta (°C):
          </label>
          <input
            type="text"
            placeholder="Ex: 29.5"
            value={tempBlack}
            onChange={(e) => setTempBlack(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-rose-300 font-mono font-bold text-sm placeholder-slate-500 focus:outline-none focus:border-rose-500"
            required
          />
        </div>

        {/* Temp Clear */}
        <div>
          <label className="text-sky-400 font-semibold block mb-1 flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-sky-400" />
            Temp. Transparente (°C):
          </label>
          <input
            type="text"
            placeholder="Ex: 26.8"
            value={tempClear}
            onChange={(e) => setTempClear(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sky-300 font-mono font-bold text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
            required
          />
        </div>

      </div>

      {/* Notes / Environmental context */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Anotações opcionais (ex: 'Sol pleno', 'Vento fraco', 'Início')"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={<PlusCircle className="w-4 h-4" />}
          className="w-full sm:w-auto shrink-0 shadow-emerald-950/40"
        >
          Adicionar Medição
        </Button>
      </div>
    </form>
  );
};
