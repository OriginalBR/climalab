import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Brain, 
  Sparkles, 
  Check, 
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { SpeechMember, MasteryLevel } from '../../types';
import { useExperiment } from '../../context/ExperimentContext';
import { speechSpeaker } from '../../utils/speech';
import { sound } from '../../utils/sound';

interface SpeechPracticeModalProps {
  member: SpeechMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeechPracticeModal: React.FC<SpeechPracticeModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  const { updateMemberMastery, incrementMemberPractice, globalStats } = useExperiment();

  const [activeTab, setActiveTab] = useState<'read' | 'memory'>('read');
  const [isSpeechHidden, setIsSpeechHidden] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [revealedCloze, setRevealedCloze] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isOpen && member) {
      incrementMemberPractice(member.id);
      setIsSpeechHidden(false);
      setRevealedCloze({});
    }
    return () => {
      speechSpeaker.stop();
      setIsSpeaking(false);
    };
  }, [isOpen, member?.id]);

  if (!member) return null;

  // Dynamically inject real stats tag if this is Esther (Results member) and data is available
  let renderedSpeechText = member.speechText;
  if (member.id === 'esther' && globalStats.hasValidTests) {
    renderedSpeechText += `\n\n[DADOS REAIS DO GRUPO: ΔT Médio Preta: +${globalStats.avgDeltaTBlack.toFixed(1)}°C | ΔT Médio Transparente: +${globalStats.avgDeltaTClear.toFixed(1)}°C | Diferença: ${globalStats.avgDifference > 0 ? '+' : ''}${globalStats.avgDifference.toFixed(1)}°C]`;
  }

  // Cloze test parser: parse {{answer}} parts
  const clozeParts = member.clozeTemplate.split(/(\{\{.*?\}\})/g);

  const toggleRevealCloze = (index: number) => {
    sound.playClick();
    setRevealedCloze(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleRevealAll = () => {
    sound.playClick();
    const all: Record<number, boolean> = {};
    clozeParts.forEach((_, idx) => {
      all[idx] = true;
    });
    setRevealedCloze(all);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      speechSpeaker.stop();
      setIsSpeaking(false);
    } else {
      speechSpeaker.speak(
        renderedSpeechText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleSelectMastery = (level: MasteryLevel) => {
    updateMemberMastery(member.id, level);
    if (level === 'mastered') {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const masteryOptions: { id: MasteryLevel; label: string; pct: number; color: string }[] = [
    { id: 'none', label: 'Ainda não sei', pct: 0, color: 'hover:border-slate-600' },
    { id: 'practicing', label: 'Estou treinando', pct: 35, color: 'hover:border-amber-500' },
    { id: 'good', label: 'Já consigo falar', pct: 70, color: 'hover:border-sky-500' },
    { id: 'mastered', label: 'Consigo falar sem olhar', pct: 100, color: 'hover:border-emerald-500' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${member.name} — ${member.topic}`}
      subtitle={`Treinamento interativo • ${member.role}`}
      icon={<Mic className="w-5 h-5 text-purple-400" />}
      maxWidth="2xl"
    >
      <div className="space-y-5">
        
        {/* Navigation Tabs (Leitura vs Teste de Memória) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('read');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'read'
                  ? 'bg-purple-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🎤 Modo Leitura & Ensaio
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('memory');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'memory'
                  ? 'bg-purple-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Teste de Memória (Lacunas)</span>
            </button>
          </div>

          {/* Read aloud Voice button */}
          <button
            onClick={handleSpeak}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              isSpeaking
                ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Ouvir fala gerada por voz artificial em português"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-purple-400" />}
            <span>{isSpeaking ? 'Parar Áudio' : 'Ouvir Exemplo'}</span>
          </button>
        </div>

        {/* Tab 1: Full Speech Rehearsal */}
        {activeTab === 'read' && (
          <div className="space-y-4">
            
            {/* Speech Display Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Texto da Fala Oficial:
                </span>
                <button
                  onClick={() => setIsSpeechHidden(!isSpeechHidden)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  {isSpeechHidden ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{isSpeechHidden ? 'Mostrar Texto' : 'Esconder para Ensaio'}</span>
                </button>
              </div>

              {isSpeechHidden ? (
                <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                  <EyeOff className="w-8 h-8 mx-auto text-slate-600" />
                  <p>Texto oculto! Tente falar de cabeça como se estivesse na frente dos avaliadores.</p>
                  <Button size="sm" variant="outline" onClick={() => setIsSpeechHidden(false)}>
                    Revelar Fala
                  </Button>
                </div>
              ) : (
                <div className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed whitespace-pre-line select-text">
                  {renderedSpeechText}
                </div>
              )}
            </div>

            {/* Practical Speaking Tips */}
            {member.tips && member.tips.length > 0 && (
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-1.5">
                <strong className="text-purple-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Dicas para {member.name}:
                </strong>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                  {member.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Memory Test with Cloze Gaps */}
        {activeTab === 'memory' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400">
                  Complete mentalmente as palavras ocultas e clique para conferir:
                </span>
                <button
                  onClick={handleRevealAll}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Revelar Todas
                </button>
              </div>

              <div className="text-sm leading-loose text-slate-200 whitespace-pre-line">
                {clozeParts.map((part, idx) => {
                  if (part.startsWith('{{') && part.endsWith('}}')) {
                    const answer = part.slice(2, -2);
                    const isRevealed = revealedCloze[idx];

                    return (
                      <button
                        key={idx}
                        onClick={() => toggleRevealCloze(idx)}
                        className={`inline-flex items-center mx-1 px-2.5 py-0.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                          isRevealed
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow'
                            : 'bg-slate-800 text-purple-300 border-purple-500/40 hover:bg-purple-950/40'
                        }`}
                        title="Clique para revelar a resposta"
                      >
                        {isRevealed ? answer : '______ [?]' }
                      </button>
                    );
                  }
                  return <span key={idx}>{part}</span>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Member Mastery Level Selector */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Meu Domínio Desta Fala:
            </label>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {masteryOptions.find(o => o.id === member.masteryLevel)?.pct}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {masteryOptions.map(opt => {
              const isSelected = member.masteryLevel === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectMastery(opt.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/30'
                      : `bg-slate-950 border-slate-800 text-slate-400 ${opt.color}`
                  }`}
                >
                  <div className="text-[11px] leading-tight">{opt.label}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </Modal>
  );
};
