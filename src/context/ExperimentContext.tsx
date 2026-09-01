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
  marginThreshold: number;
  setMarginThreshold: (margin: number) => void;
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

  // 2. Minimum difference margin setting (default 0.5°C)
  const [marginThreshold, setMarginThresholdState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_margin_threshold_v1');
      return saved ? parseFloat(saved) : 0.5;
    } catch {
      return 0.5;
    }
  });

  // 3. Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_checklist_v1');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
    } catch {
      return INITIAL_CHECKLIST;
    }
  });

  // 4. Speech Members Base State (mastery & practice counts persisted)
  const [storedMemberData, setStoredMemberData] = useState<Record<string, { masteryLevel: MasteryLevel; practiceCount: number; lastPracticed?: string }>>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_members_data_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Simulation Parameters
  const [simulationParams, setSimulationParams] = useState<SimulationParams>(DEFAULT_SIM_PARAMS);

  // 6. Active Navigation Page
  const [activePage, setActivePageState] = useState<ActivePage>('dashboard');

  // 7. Sound Setting
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('clima_lab_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // 8. Modals
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

  // Persist Margin Threshold
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_margin_threshold_v1', String(marginThreshold));
    } catch (e) {
      console.error('Failed to save margin threshold to localStorage', e);
    }
  }, [marginThreshold]);

  // Persist Checklist
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_checklist_v1', JSON.stringify(checklist));
    } catch (e) {
      console.error('Failed to save checklist to localStorage', e);
    }
  }, [checklist]);

  // Persist Members training data
  useEffect(() => {
    try {
      localStorage.setItem('clima_lab_members_data_v2', JSON.stringify(storedMemberData));
    } catch (e) {
      console.error('Failed to save member data to localStorage', e);
    }
  }, [storedMemberData]);

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

  const setMarginThreshold = (margin: number) => {
    const validMargin = Math.max(0, Math.min(10, margin));
    setMarginThresholdState(Number(validMargin.toFixed(2)));
    sound.playClick();
  };

  // Global Statistics Computed Dynamically based on Delta T and margin threshold
  const globalStats = useMemo(() => {
    return computeGlobalStats(measurements, marginThreshold);
  }, [measurements, marginThreshold]);

  // Dynamic Members list: Esther's speech dynamically reflects the scientific conclusion
  const members = useMemo<SpeechMember[]>(() => {
    return INITIAL_MEMBERS.map(init => {
      const savedData = storedMemberData[init.id] || { masteryLevel: 'none' as MasteryLevel, practiceCount: 0 };
      
      if (init.id === 'esther') {
        return {
          ...init,
          speechText: globalStats.estherSpeech.text,
          clozeTemplate: globalStats.estherSpeech.clozeTemplate,
          clozeAnswers: globalStats.estherSpeech.clozeAnswers,
          masteryLevel: savedData.masteryLevel,
          practiceCount: savedData.practiceCount,
          lastPracticed: savedData.lastPracticed,
        };
      }

      return {
        ...init,
        masteryLevel: savedData.masteryLevel,
        practiceCount: savedData.practiceCount,
        lastPracticed: savedData.lastPracticed,
      };
    });
  }, [storedMemberData, globalStats.estherSpeech]);

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
    setStoredMemberData(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || { practiceCount: 0 }),
        masteryLevel: level,
      }
    }));
    sound.playSuccess();
  };

  const incrementMemberPractice = (id: string) => {
    setStoredMemberData(prev => {
      const current = prev[id] || { masteryLevel: 'none', practiceCount: 0 };
      return {
        ...prev,
        [id]: {
          ...current,
          practiceCount: current.practiceCount + 1,
          lastPracticed: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      };
    });
  };

  const restoreBackup = (data: { measurements?: Measurement[]; checklist?: ChecklistItem[]; members?: SpeechMember[] }) => {
    if (data.measurements) setMeasurements(data.measurements);
    if (data.checklist) setChecklist(data.checklist);
    if (data.members) {
      const dataMap: Record<string, { masteryLevel: MasteryLevel; practiceCount: number; lastPracticed?: string }> = {};
      data.members.forEach(m => {
        dataMap[m.id] = {
          masteryLevel: m.masteryLevel,
          practiceCount: m.practiceCount,
          lastPracticed: m.lastPracticed,
        };
      });
      setStoredMemberData(dataMap);
    }
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
        marginThreshold,
        setMarginThreshold,
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
