import React from 'react';
import { Mic, Brain, Sparkles, Award, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SpeechMember, MasteryLevel } from '../../types';

interface MemberSpeechCardProps {
  member: SpeechMember;
  onOpenPractice: (member: SpeechMember) => void;
}

export const MemberSpeechCard: React.FC<MemberSpeechCardProps> = ({
  member,
  onOpenPractice,
}) => {
  const masteryConfig: Record<MasteryLevel, { label: string; variant: 'emerald' | 'amber' | 'blue' | 'slate' }> = {
    mastered: { label: 'Domínio Completo (100%)', variant: 'emerald' },
    good: { label: 'Consigo Falar (70%)', variant: 'blue' },
    practicing: { label: 'Treinando (35%)', variant: 'amber' },
    none: { label: 'Ainda não treinou (0%)', variant: 'slate' },
  };

  const status = masteryConfig[member.masteryLevel];

  // Pick themed avatar colors
  const avatarColors: Record<string, string> = {
    Diogo: 'from-amber-500 to-orange-600',
    Maria: 'from-emerald-500 to-teal-600',
    Ana: 'from-sky-500 to-blue-600',
    Gabrielle: 'from-purple-500 to-pink-600',
    Kaio: 'from-indigo-500 to-purple-600',
    Esther: 'from-rose-500 to-red-600',
    Julia: 'from-teal-500 to-emerald-600',
  };

  const bgGrad = avatarColors[member.avatarSeed] || 'from-slate-700 to-slate-800';

  return (
    <Card className="border-slate-800 bg-slate-950/80 hover:border-slate-700 flex flex-col justify-between space-y-4 group">
      
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${bgGrad} flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-black/40`}>
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-display group-hover:text-emerald-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">{member.role}</p>
            </div>
          </div>

          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        </div>

        {/* Topic Badge */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tema:</span>
          <span className="text-xs font-bold text-slate-200">{member.topic}</span>
        </div>

        {/* Snippet preview */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed italic">
          "{member.speechText.slice(0, 140)}..."
        </p>
      </div>

      {/* Footer / Practice Action */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500 font-mono">
          {member.practiceCount > 0 ? `${member.practiceCount} ensaios` : 'Nenhum ensaio'}
        </span>

        <Button
          size="sm"
          variant="secondary"
          icon={<Mic className="w-3.5 h-3.5 text-purple-400" />}
          onClick={() => onOpenPractice(member)}
          className="hover:border-purple-500/40"
        >
          Treinar Fala
        </Button>
      </div>

    </Card>
  );
};
