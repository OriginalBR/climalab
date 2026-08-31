import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'emerald' | 'amber' | 'blue' | 'purple' | 'solar';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'emerald',
  height = 'md',
  showLabel = false,
  label,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4 text-xs font-bold',
  };

  const colorGradients = {
    emerald: 'from-emerald-500 to-teal-400',
    amber: 'from-amber-500 to-yellow-400',
    blue: 'from-sky-500 to-blue-400',
    purple: 'from-purple-500 to-indigo-400',
    solar: 'from-amber-500 via-orange-500 to-rose-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
          <span>{label}</span>
          <span className="font-mono text-emerald-400 font-semibold">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/50 ${heightClasses[height]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients[color]} transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
