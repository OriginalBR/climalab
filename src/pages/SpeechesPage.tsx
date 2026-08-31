import React, { useState } from 'react';
import { Mic, Brain, Sparkles, Award, Clock, Users } from 'lucide-react';
import { MemberSpeechCard } from '../components/speeches/MemberSpeechCard';
import { SpeechPracticeModal } from '../components/speeches/SpeechPracticeModal';
import { SpeechTimer } from '../components/speeches/SpeechTimer';
import { ProgressBar } from '../components/common/ProgressBar';
import { useExperiment } from '../context/ExperimentContext';
import { SpeechMember } from '../types';

export const SpeechesPage: React.FC = () => {
  const { members } = useExperiment();
  const [selectedMember, setSelectedMember] = useState<SpeechMember | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenPractice = (member: SpeechMember) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  // Group mastery metric
  const totalScore = members.reduce((acc, m) => {
    if (m.masteryLevel === 'mastered') return acc + 100;
    if (m.masteryLevel === 'good') return acc + 70;
    if (m.masteryLevel === 'practicing') return acc + 35;
    return acc;
  }, 0);
  const masteryAverage = Math.round(totalScore / members.length);
  const masteredCount = members.filter(m => m.masteryLevel === 'mastered').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Treinador de Apresentação Oral
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              7 Integrantes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Treinar Falas da Equipe
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Falas oficiais, dicas práticas, leitura em áudio e teste de memória com lacunas
          </p>
        </div>

        {/* Stopwatch */}
        <SpeechTimer />
      </div>

      {/* Group Mastery Progress Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Domínio Coletivo das Falas do Grupo
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-purple-300">
            {masteredCount} de {members.length} alunos com fala dominada
          </span>
        </div>

        <ProgressBar value={masteryAverage} color="purple" height="md" showLabel label="Progresso de Treinamento" />
      </div>

      {/* Members 7 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {members.map((member) => (
          <MemberSpeechCard
            key={member.id}
            member={member}
            onOpenPractice={handleOpenPractice}
          />
        ))}
      </div>

      {/* Practice & Memory Quiz Modal */}
      <SpeechPracticeModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
