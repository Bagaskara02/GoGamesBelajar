import React, { useState, useEffect } from 'react';
import { LEVELS_DATA } from './data/levels';
import { validateGolangCode } from './utils/codeValidator';
import { soundEffects } from './utils/soundEffects';
import { getMissionContext } from './utils/missionCaseStudy';
import { Code, Terminal as TerminalIcon, Dices, Target } from 'lucide-react';

import Navbar from './components/Navbar';
import GameCanvas2D from './components/GameCanvas2D';
import CodeEditor from './components/CodeEditor';
import TerminalOutput from './components/TerminalOutput';
import MaterialModal from './components/MaterialModal';
import VictoryModal from './components/VictoryModal';

function pickSmartMissionIndex(level, excludeIndex = null) {
  const variants = level?.missionVariants || [];
  if (variants.length <= 1) return 0;

  const completedKey = `gopherquest_completed_missions_${level.id}`;
  let completed = [];
  try {
    completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
  } catch {
    completed = [];
  }

  if (completed.length === 0 && excludeIndex === null) {
    return 0;
  }

  const allIndices = variants.map((_, i) => i);
  const unplayed = allIndices.filter(i => !completed.includes(i) && i !== excludeIndex);

  if (unplayed.length > 0) {
    return unplayed[Math.floor(Math.random() * unplayed.length)];
  }

  const differentIndices = allIndices.filter(i => i !== excludeIndex);
  if (differentIndices.length > 0) {
    return differentIndices[Math.floor(Math.random() * differentIndices.length)];
  }

  return Math.floor(Math.random() * variants.length);
}

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = localStorage.getItem('gopherquest_level_idx');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const saved = localStorage.getItem('gopherquest_unlocked');
    return saved !== null ? JSON.parse(saved) : [1];
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('gopherquest_xp');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const currentLevel = LEVELS_DATA[currentLevelIndex] || LEVELS_DATA[0];

  const [currentMissionIndex, setCurrentMissionIndex] = useState(() => {
    const initialLevel = LEVELS_DATA[currentLevelIndex] || LEVELS_DATA[0];
    return pickSmartMissionIndex(initialLevel, null);
  });

  const currentMission =
    currentLevel.missionVariants && currentLevel.missionVariants.length > 0
      ? currentLevel.missionVariants[currentMissionIndex] || currentLevel.missionVariants[0]
      : {
          objective: currentLevel.mission?.objective || '',
          targetText: currentLevel.mission?.targetText || '',
          expectedOutput: currentLevel.expectedOutput || '',
          starterCode: currentLevel.starterCode || '',
          visualTarget: currentLevel.visualGoal || ''
        };

  const missionCtx = getMissionContext(currentLevel, currentMission);
  const codeStorageKey = `gopherquest_code_${currentLevel.id}_v${currentMissionIndex}`;

  const [userCode, setUserCode] = useState(() => {
    const savedCode = localStorage.getItem(`gopherquest_code_${currentLevel.id}_v${currentMissionIndex}`);
    return savedCode !== null ? savedCode : currentMission.starterCode;
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [terminalOutput, setTerminalOutput] = useState('');
  const [terminalError, setTerminalError] = useState('');
  const [terminalDiagnostics, setTerminalDiagnostics] = useState('');

  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [canvasCollapsed, setCanvasCollapsed] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor');

  useEffect(() => {
    const savedCode = localStorage.getItem(codeStorageKey);
    setUserCode(savedCode !== null ? savedCode : currentMission.starterCode);
    setIsSuccess(false);
    setShowCelebrationBanner(false);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsVictoryOpen(false);

    localStorage.setItem('gopherquest_level_idx', currentLevelIndex.toString());
  }, [currentLevelIndex, currentLevel.id, currentMissionIndex, codeStorageKey, currentMission.starterCode]);

  const handleSelectLevel = (idx) => {
    const targetLevel = LEVELS_DATA[idx] || LEVELS_DATA[0];
    const nextVariantIdx = pickSmartMissionIndex(
      targetLevel,
      idx === currentLevelIndex ? currentMissionIndex : null
    );
    setCurrentLevelIndex(idx);
    setCurrentMissionIndex(nextVariantIdx);
    setIsMaterialOpen(true);
  };

  const handleRandomizeMission = () => {
    soundEffects.playClick();
    const nextIdx = pickSmartMissionIndex(currentLevel, currentMissionIndex);
    const nextVariant = currentLevel.missionVariants?.[nextIdx];
    localStorage.removeItem(`gopherquest_code_${currentLevel.id}_v${nextIdx}`);
    setCurrentMissionIndex(nextIdx);
    if (nextVariant) {
      setUserCode(nextVariant.starterCode);
    }
    setIsSuccess(false);
    setShowCelebrationBanner(false);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
  };

  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    localStorage.setItem(codeStorageKey, newCode);
  };

  const handleResetCode = () => {
    setUserCode(currentMission.starterCode);
    localStorage.removeItem(codeStorageKey);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsSuccess(false);
    setShowCelebrationBanner(false);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    soundEffects.playLaser();

    setTimeout(() => {
      setIsExecuting(false);
      const result = validateGolangCode(userCode, currentLevel, currentMission);

      if (result.success) {
        setIsSuccess(true);
        setShowCelebrationBanner(true);
        setTerminalOutput(result.output);
        setTerminalError('');
        setTerminalDiagnostics(result.diagnostics);
        soundEffects.playSuccess();

        const completedKey = `gopherquest_completed_missions_${currentLevel.id}`;
        const completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
        if (!completed.includes(currentMissionIndex)) {
          completed.push(currentMissionIndex);
          localStorage.setItem(completedKey, JSON.stringify(completed));
        }

        const nextLevelId = currentLevel.id + 1;
        if (!unlockedLevels.includes(nextLevelId) && nextLevelId <= LEVELS_DATA.length) {
          const updatedUnlocked = [...unlockedLevels, nextLevelId];
          setUnlockedLevels(updatedUnlocked);
          localStorage.setItem('gopherquest_unlocked', JSON.stringify(updatedUnlocked));
        }

        const newXp = xp + 150;
        setXp(newXp);
        localStorage.setItem('gopherquest_xp', newXp.toString());
      } else {
        setIsSuccess(false);
        setShowCelebrationBanner(false);
        setTerminalOutput(result.output);
        setTerminalError(result.error);
        setTerminalDiagnostics(result.diagnostics);
        soundEffects.playError();
      }
    }, 450);
  };

  const handleNextLevel = () => {
    setIsVictoryOpen(false);
    setShowCelebrationBanner(false);
    if (currentLevelIndex < LEVELS_DATA.length - 1) {
      const nextIdx = currentLevelIndex + 1;
      const nextLevel = LEVELS_DATA[nextIdx];
      setCurrentLevelIndex(nextIdx);
      setCurrentMissionIndex(pickSmartMissionIndex(nextLevel, null));
      setIsMaterialOpen(true);
    }
  };

  const handleResetProgress = () => {
    localStorage.clear();
    setUnlockedLevels([1]);
    setCurrentLevelIndex(0);
    setCurrentMissionIndex(0);
    setXp(0);
    setUserCode(LEVELS_DATA[0].missionVariants?.[0]?.starterCode || LEVELS_DATA[0].starterCode);
    setIsSuccess(false);
    setShowCelebrationBanner(false);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsMaterialOpen(true);
    setIsVictoryOpen(false);
  };

  const totalVariants = currentLevel.missionVariants?.length || 1;

  return (
    <div className="min-h-screen bg-transparent text-slate-900 flex flex-col selection:bg-sky-300/60 selection:text-slate-950 overflow-x-clip">
      {/* 1. Header & Navigation */}
      <Navbar
        levels={LEVELS_DATA}
        currentLevelIndex={currentLevelIndex}
        onSelectLevel={handleSelectLevel}
        onOpenMaterial={() => setIsMaterialOpen(true)}
        xp={xp}
        unlockedLevels={unlockedLevels}
        onResetProgress={handleResetProgress}
      />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4">
        {/* TAB QUEST & STUDI KASUS (Dilengkapi Cerita Studi Kasus yang Sesuai Misi & Game 2D + Tombol Acak Misi) */}
        <div className="bg-white border-[3px] border-slate-900 p-3 sm:p-4 shadow-[4px_4px_0_#0f172a] flex flex-col gap-2.5">
          {/* Top Row: Badges + Tombol Acak Misi (Hanya di Tab Quest ini!) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="bg-[#38bdf8] text-slate-950 px-2.5 py-0.5 border-2 border-slate-900 text-xs font-extrabold tracking-wide uppercase">
                Quest Level {currentLevel.id} • Variasi #{currentMissionIndex + 1}/{totalVariants}
              </span>
              <span className="bg-[#fde047] text-slate-900 px-2.5 py-0.5 border-2 border-slate-900 text-xs font-extrabold">
                {missionCtx.badge}
              </span>
              <span className="text-[11px] bg-[#bbf7d0] border-2 border-slate-900 text-slate-900 px-2 py-0.5 font-bold hidden sm:inline-block">
                ✓ Validasi Konsep Fleksibel
              </span>
            </div>

            <button
              onClick={handleRandomizeMission}
              className="px-2.5 py-1 bg-[#c084fc] hover:bg-[#a855f7] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-y-[1px] active:shadow-none transition flex items-center space-x-1.5 text-xs font-extrabold shrink-0"
              title="Acak soal misi berbeda di level yang sama agar bisa latihan terus!"
            >
              <Dices className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span className="font-pixel text-[8px]">ACAK MISI LAIN</span>
            </button>
          </div>

          {/* Studi Kasus Box & Instruksi Misi */}
          <div className="bg-[#fffbeb] border-2 border-slate-900 p-2.5 sm:p-3 flex flex-col gap-1.5">
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              <strong className="text-amber-900 font-extrabold">{missionCtx.caseStudyTitle}: </strong>
              <span>{missionCtx.caseStudyStory}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-900/20 flex items-start space-x-2">
              <Target className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-950 font-bold leading-snug">
                <span className="text-emerald-800 uppercase mr-1">Tugas Koding:</span>
                {currentMission.objective}
              </p>
            </div>
          </div>
        </div>

        {/* Celebration Banner */}
        {isSuccess && showCelebrationBanner && (
          <div className="bg-[#bbf7d0] text-slate-900 p-3 sm:p-4 border-[3px] border-slate-900 shadow-[4px_4px_0_#0f172a] flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <span className="text-3xl animate-bounce">🏆</span>
              <div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start flex-wrap gap-y-1">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-slate-950 bg-[#fde047] px-2 py-1 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                    MISI {currentLevel.id} (VAR #{currentMissionIndex + 1}) CLEAR!
                  </span>
                  <span className="text-xs font-pixel text-emerald-900">+150 XP</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-bold mt-1">
                  Konsep kode kamu tepat! Coba variasi misi lain di level ini atau lanjut ke level berikutnya.
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={handleRandomizeMission}
                className="flex-1 sm:flex-none px-3 py-2 bg-[#c084fc] hover:bg-[#a855f7] text-slate-950 text-[8px] sm:text-[9px] font-pixel border-2 border-slate-900 transition-all shadow-[2px_2px_0px_#0f172a] active:shadow-none active:translate-y-[1px]"
              >
                <span>🎲 MISI LAIN</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setShowCelebrationBanner(false);
                }}
                className="flex-1 sm:flex-none px-3 py-2 bg-white hover:bg-slate-100 text-slate-900 text-[8px] sm:text-[9px] font-pixel border-2 border-slate-900 transition-all shadow-[2px_2px_0px_#0f172a] active:shadow-none active:translate-y-[1px]"
              >
                <span>LIHAT SIMULASI</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  setIsVictoryOpen(true);
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 bg-[#fde047] hover:bg-yellow-300 text-slate-950 text-[8px] sm:text-[9px] font-pixel border-2 border-slate-900 transition-all shadow-[2px_2px_0px_#0f172a] active:shadow-none active:translate-y-[1px] flex items-center justify-center space-x-1.5"
              >
                <span>NEXT LEVEL</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* MOBILE VIEW (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-3">
          <div className={`w-full transition-all duration-300 ${canvasCollapsed ? 'h-[44px]' : 'h-[205px] xs:h-[220px] sm:h-[255px]'}`}>
            <GameCanvas2D
              level={currentLevel}
              mission={currentMission}
              isSuccess={isSuccess}
              isExecuting={isExecuting}
              onClaimVictory={() => setIsVictoryOpen(true)}
              isCollapsed={canvasCollapsed}
              onToggleCollapse={() => setCanvasCollapsed(!canvasCollapsed)}
            />
          </div>

          {/* Tab Segmented Control */}
          <div className="flex items-center bg-white p-1 border-[3px] border-slate-900 shadow-[3px_3px_0_#0f172a] sticky top-[52px] z-30">
            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileTab('editor');
              }}
              className={`flex-1 py-2 text-[9px] font-pixel transition-colors flex items-center justify-center space-x-1.5 ${
                mobileTab === 'editor'
                  ? 'bg-[#38bdf8] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'bg-transparent text-slate-600 hover:text-slate-900 border-2 border-transparent'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>EDITOR KODE</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileTab('terminal');
              }}
              className={`flex-1 py-2 text-[9px] font-pixel transition-colors flex items-center justify-center space-x-1.5 ${
                mobileTab === 'terminal'
                  ? 'bg-[#38bdf8] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'bg-transparent text-slate-600 hover:text-slate-900 border-2 border-transparent'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
              {terminalError && <span className="w-2.5 h-2.5 bg-rose-500 border border-slate-900 animate-pulse ml-1"></span>}
              {isSuccess && <span className="w-2.5 h-2.5 bg-emerald-500 border border-slate-900 ml-1"></span>}
            </button>
          </div>

          {mobileTab === 'editor' ? (
            <div className="w-full min-h-[420px] flex flex-col">
              <CodeEditor
                code={userCode}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                onReset={handleResetCode}
                hint={currentLevel.hint}
                isExecuting={isExecuting}
                isSuccess={isSuccess}
                hasError={Boolean(terminalError)}
                onViewTerminal={() => setMobileTab('terminal')}
              />
            </div>
          ) : (
            <div className="w-full min-h-[360px] flex flex-col gap-2.5">
              <div className="flex-1">
                <TerminalOutput
                  output={terminalOutput}
                  error={terminalError}
                  diagnostics={terminalDiagnostics}
                  expectedOutput={currentMission.expectedOutput || currentLevel.expectedOutput}
                  isSuccess={isSuccess}
                  isExecuting={isExecuting}
                  onClear={() => {
                    setTerminalOutput('');
                    setTerminalError('');
                    setTerminalDiagnostics('');
                  }}
                />
              </div>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setMobileTab('editor');
                }}
                className="w-full py-2.5 bg-[#fde047] border-[3px] border-slate-900 text-[9px] font-pixel text-slate-900 hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2 shadow-[3px_3px_0_#0f172a] active:translate-y-[2px] active:shadow-none"
              >
                <Code className="w-4 h-4" />
                <span>KEMBALI KE EDITOR KODE</span>
              </button>
            </div>
          )}
        </div>

        {/* DESKTOP VIEW (>= 1024px) */}
        <div className="hidden lg:flex flex-1 flex-row gap-5">
          <section className="w-1/2 flex flex-col gap-4">
            <div className="h-[325px] xl:h-[350px] w-full">
              <GameCanvas2D
                level={currentLevel}
                mission={currentMission}
                isSuccess={isSuccess}
                isExecuting={isExecuting}
                onClaimVictory={() => setIsVictoryOpen(true)}
              />
            </div>

            <div className="flex-1 min-h-[280px] w-full">
              <TerminalOutput
                output={terminalOutput}
                error={terminalError}
                diagnostics={terminalDiagnostics}
                expectedOutput={currentMission.expectedOutput || currentLevel.expectedOutput}
                isSuccess={isSuccess}
                isExecuting={isExecuting}
                onClear={() => {
                  setTerminalOutput('');
                  setTerminalError('');
                  setTerminalDiagnostics('');
                }}
              />
            </div>
          </section>

          <section className="w-1/2 min-h-[620px] flex flex-col">
            <CodeEditor
              code={userCode}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleResetCode}
              hint={currentLevel.hint}
              isExecuting={isExecuting}
              isSuccess={isSuccess}
              hasError={Boolean(terminalError)}
            />
          </section>
        </div>
      </main>

      <MaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        level={currentLevel}
        mission={currentMission}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        level={currentLevel}
        onNextLevel={handleNextLevel}
        onStay={() => setIsVictoryOpen(false)}
        isLastLevel={currentLevelIndex === LEVELS_DATA.length - 1}
      />
    </div>
  );
}
