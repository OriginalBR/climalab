import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Volume2 } from 'lucide-react';
import { sound } from '../../utils/sound';

export const SpeechTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const handleToggle = () => {
    sound.playClick();
    setIsActive(!isActive);
  };

  const handleReset = () => {
    sound.playClick();
    setIsActive(false);
    setSeconds(0);
  };

  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');

  // Time guidelines (ideal presentation per member is ~45s to 1min15s)
  const isIdeal = seconds >= 35 && seconds <= 75;
  const isTooLong = seconds > 90;

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-slate-400 hidden sm:inline">Cronômetro de Treino:</span>
      </div>

      <div className="font-mono text-base font-bold text-slate-100 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
        {mm}:{ss}
      </div>

      {isIdeal && (
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 hidden lg:inline">
          Tempo Ideal (~1 min)
        </span>
      )}

      {isTooLong && (
        <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30 hidden lg:inline">
          Atenção ao tempo
        </span>
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={handleToggle}
          className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
          }`}
          title={isActive ? 'Pausar' : 'Iniciar'}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800"
          title="Zerar"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
