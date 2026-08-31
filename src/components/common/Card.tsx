import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'none' | 'emerald' | 'amber' | 'blue';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  hoverEffect = false,
  onClick,
}) => {
  const glowClasses = {
    none: 'glass-card border-slate-800/80 bg-slate-900/60',
    emerald: 'glass-panel-glow-emerald bg-slate-900/80',
    amber: 'glass-panel-glow-amber bg-slate-900/80',
    blue: 'border-sky-500/20 shadow-[0_0_25px_rgba(14,165,233,0.1)] bg-slate-900/80',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden ${glowClasses[glow]} ${
        hoverEffect ? 'hover:-translate-y-1 hover:border-slate-700/80 cursor-pointer shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
