import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Measurement, 
  ChecklistItem, 
  SpeechMember, 
  SimulationParams, 
  GlobalExperimentStats, 
  ActivePage, 
  MasteryLevel 
} from '../types';
import { INITIAL_MEMBERS } from '../constants/members';
import { INITIAL_CHECKLIST } from '../constants/checklist';
import { SAMPLE_DATASET } from '../constants/sampleData';
import { computeGlobalStats } from '../utils/math';
import { sound } from '../utils/sound';

interface ExperimentContextType {
  measurements: Measurement[];
  checklist: ChecklistItem[];
  members: SpeechMember[];
  simulationParams: SimulationParams;
  setSimulationParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  globalStats: GlobalExperimentStats;
  addMeasurement: (measurement: Omit<Measurement, 'id'>) => void;
  updateMeasurement: (id: string, updated: Partial<Measurement>) => void;
  deleteMeasurement: (id: string) => void;
  clearAllMeasurements: () => void;
  loadSampleData: () => void;
  toggleChecklistItem: (id: string) => void;
  resetChecklist: () => void;
  updateMemberMastery: (id: string, level: MasteryLevel) => void;
  incrementMemberPractice: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isWelcomeOpen: boolean;
  setWelcomeOpen: (open: boolean) => void;
  isGlossaryOpen: boolean;
  setGlossaryOpen: (open: boolean) => void;
  isReportOpen: boolean;
  setReportOpen: (open: boolean) => void;
  restoreBackup: (data: { measurements?: Measurement[]; checklist?: ChecklistItem[]; members?: SpeechMember[] }) => void;
}

const DEFAULT_SIM_PARAMS: SimulationParams = {
  initialTemp: 24.0,
  exposureMinutes: 30,
  intervalMinutes: 5,
  blackHeatingRate: 14.5,
  clearHeatingRate: 7.2,
  solarIntensity: 'high',
  windConvection: 'none'
};

const ExperimentContext = createContext<ExperimentContextType | undefined>(undefined);

export const ExperimentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Measurements State
  const [measurements, setMeasurements] = useState<Measurement[]>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_measurements_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_checklist_v1');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
    } catch {
      return INITIAL_CHECKLIST;
    }
  });

  // 3. Speech Members State
  const [members, setMembers] = useState<SpeechMember[]>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_members_v1');
      if (saved) {
        const parsed: SpeechMember[] = JSON.parse(saved);
        // Merge with initial to preserve fresh templates if updated
        return INITIAL_MEMBERS.map(init => {
          const match = parsed.find(p => p.id === init.id);
          return match ? { ...init, masteryLevel: match.masteryLevel, practiceCount: match.practiceCount || 0 } : init;
        });
      }
      return INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  // 4. Simulation Parameters
  const [simulationParams, setSimulationParams] = useState<SimulationParams>(DEFAULT_SIM_PARAMS);

  // 5. Active Navigation Page
  const [activePage, setActivePageState] = useState<ActivePage>('dashboard');

  // 6. Sound Setting
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // 7. Modals
  const [isWelcomeOpen, setWelcomeOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('clima_lab_has_seen_welcome') !== 'true';
    } catch {
      return true;
    }
  });
  const [isGlossaryOpen, setGlossaryOpen] = useState<boolean>(false);
  const [isReportOpen, setReportOpen] = useState<boolean>(false);

  // Persist Measurements
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_measurements_v1', JSON.stringify(measurements));
    } catch (e) {
      console.error('Failed to save measurements to localStorage', e);
    }
  }, [measurements]);

  // Persist Checklist
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_checklist_v1', JSON.stringify(checklist));
    } catch (e) {
      console.error('Failed to save checklist to localStorage', e);
    }
  }, [checklist]);

  // Persist Members
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_members_v1', JSON.stringify(members));
    } catch (e) {
      console.error('Failed to save members to localStorage', e);
    }
  }, [members]);

  // Persist Sound
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_sound_enabled', JSON.stringify(soundEnabled));
      sound.setEnabled(soundEnabled);
    } catch (e) {
      console.error('Failed to save sound setting', e);
    }
  }, [soundEnabled]);

  // Handle welcome seen
  const handleCloseWelcome = (open: boolean) => {
    setWelcomeOpen(open);
    if (!open) {
      localStorage.setItem('clima_lab_has_seen_welcome', 'true');
    }
  };

  const setActivePage = (page: ActivePage) => {
    sound.playClick();
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Global Statistics Computed Dynamically
  const globalStats = useMemo(() => {
    return computeGlobalStats(measurements);
  }, [measurements]);

  // Actions
  const addMeasurement = (data: Omit<Measurement, 'id'>) => {
    const newMeasurement: Measurement = {
      ...data,
      id: 'm-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
    };
    setMeasurements(prev => {
      const updated = [...prev, newMeasurement];
      // Sort primarily by testNumber, then by timeMinutes
      return updated.sort((a, b) => a.testNumber - b.testNumber || a.timeMinutes - b.timeMinutes);
    });
    sound.playSuccess();
  };

  const updateMeasurement = (id: string, updated: Partial<Measurement>) => {
    setMeasurements(prev => 
      prev.map(m => m.id === id ? { ...m, ...updated } : m)
          .sort((a, b) => a.testNumber - b.testNumber || a.timeMinutes - b.timeMinutes)
    );
    sound.playClick();
  };

  const deleteMeasurement = (id: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
    sound.playClick();
  };

  const clearAllMeasurements = () => {
    setMeasurements([]);
    sound.playClick();
  };

  const loadSampleData = () => {
    setMeasurements(SAMPLE_DATASET);
    sound.playSuccess();
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => {
        if (item.id === id) {
          const next = !item.completed;
          if (next) sound.playSuccess();
          else sound.playClick();
          return { ...item, completed: next };
        }
        return item;
      })
    );
  };

  const resetChecklist = () => {
    setChecklist(INITIAL_CHECKLIST);
    sound.playClick();
  };

  const updateMemberMastery = (id: string, level: MasteryLevel) => {
    setMembers(prev => 
      prev.map(m => m.id === id ? { ...m, masteryLevel: level } : m)
    );
    sound.playSuccess();
  };

  const incrementMemberPractice = (id: string) => {
    setMembers(prev => 
      prev.map(m => m.id === id ? { 
        ...m, 
        practiceCount: (m.practiceCount || 0) + 1,
        lastPracticed: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      } : m)
    );
  };

  const restoreBackup = (data: { measurements?: Measurement[]; checklist?: ChecklistItem[]; members?: SpeechMember[] }) => {
    if (data.measurements) setMeasurements(data.measurements);
    if (data.checklist) setChecklist(data.checklist);
    if (data.members) setMembers(data.members);
    sound.playSuccess();
  };

  return (
    <ExperimentContext.Provider
      value={{
        measurements,
        checklist,
        members,
        simulationParams,
        setSimulationParams,
        activePage,
        setActivePage,
        globalStats,
        addMeasurement,
        updateMeasurement,
        deleteMeasurement,
        clearAllMeasurements,
        loadSampleData,
        toggleChecklistItem,
        resetChecklist,
        updateMemberMastery,
        incrementMemberPractice,
        soundEnabled,
        toggleSound,
        isWelcomeOpen,
        setWelcomeOpen: handleCloseWelcome,
        isGlossaryOpen,
        setGlossaryOpen,
        isReportOpen,
        setReportOpen,
        restoreBackup,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within an ExperimentProvider');
  }
  return context;
};
