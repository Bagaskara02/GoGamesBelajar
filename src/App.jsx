import React, { useState, useEffect } from 'react';
import { LEVELS_DATA } from './data/levels';
import { validateGolangCode } from './utils/codeValidator';
import { soundEffects } from './utils/soundEffects';
import { Code, Terminal as TerminalIcon, Dices, Target } from 'lucide-react';

import Navbar from './components/Navbar';
import GameCanvas2D from './components/GameCanvas2D';
import CodeEditor from './components/CodeEditor';
import TerminalOutput from './components/TerminalOutput';
import MaterialModal from './components/MaterialModal';
import VictoryModal from './components/VictoryModal';

// Helper untuk memilih index misi secara pintar (prioritaskan variasi yang belum pernah diselesaikan)
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

  // Jika user belum pernah menyelesaikan level ini sama sekali dan bukan klik manual acak, mulai dari 0
  if (completed.length === 0 && excludeIndex === null) {
    return 0;
  }

  // Cari variasi yang belum dimainkan dan berbeda dari excludeIndex
  const allIndices = variants.map((_, i) => i);
  const unplayed = allIndices.filter(i => !completed.includes(i) && i !== excludeIndex);

  if (unplayed.length > 0) {
    return unplayed[Math.floor(Math.random() * unplayed.length)];
  }

  // Jika semua sudah pernah dimainkan, pilih acak yang berbeda dari misi aktif saat ini
  const differentIndices = allIndices.filter(i => i !== excludeIndex);
  if (differentIndices.length > 0) {
    return differentIndices[Math.floor(Math.random() * differentIndices.length)];
  }

  return Math.floor(Math.random() * variants.length);
}

export default function App() {
  // 1. State Level & Kurikulum
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

  // Level aktif
  const currentLevel = LEVELS_DATA[currentLevelIndex] || LEVELS_DATA[0];

  // State Variasi Misi (Randomized ketika sudah pernah di level tersebut)
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

  // 2. State Code Editor & Eksekusi (Disimpan per level + variasi misi)
  const codeStorageKey = `gopherquest_code_${currentLevel.id}_v${currentMissionIndex}`;

  const [userCode, setUserCode] = useState(() => {
    const savedCode = localStorage.getItem(`gopherquest_code_${currentLevel.id}_v${currentMissionIndex}`);
    return savedCode !== null ? savedCode : currentMission.starterCode;
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 3. State Terminal Output
  const [terminalOutput, setTerminalOutput] = useState('');
  const [terminalError, setTerminalError] = useState('');
  const [terminalDiagnostics, setTerminalDiagnostics] = useState('');

  // 4. State Modal, Banner, & Mobile Tabs ('editor' | 'terminal')
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [canvasCollapsed, setCanvasCollapsed] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor');

  // Sync saat level atau variasi misi berpindah
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

  // Handler pindah level (Jika kembali ke level yang sudah pernah dilewati, otomatis randomize misi!)
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

  // Handler Acak Misi Baru di Level yang Sama
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

  // Simpan kode otomatis saat diketik
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    localStorage.setItem(codeStorageKey, newCode);
  };

  // Reset kode ke template starter
  const handleResetCode = () => {
    setUserCode(currentMission.starterCode);
    localStorage.removeItem(codeStorageKey);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsSuccess(false);
    setShowCelebrationBanner(false);
  };

  // Eksekusi & Validasi Kode
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

        // Tandai variasi misi ini sudah diselesaikan agar saat kembali ke level ini dapat misi berbeda
        const completedKey = `gopherquest_completed_missions_${currentLevel.id}`;
        const completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
        if (!completed.includes(currentMissionIndex)) {
          completed.push(currentMissionIndex);
          localStorage.setItem(completedKey, JSON.stringify(completed));
        }

        // Buka level berikutnya jika belum terbuka
        const nextLevelId = currentLevel.id + 1;
        if (!unlockedLevels.includes(nextLevelId) && nextLevelId <= LEVELS_DATA.length) {
          const updatedUnlocked = [...unlockedLevels, nextLevelId];
          setUnlockedLevels(updatedUnlocked);
          localStorage.setItem('gopherquest_unlocked', JSON.stringify(updatedUnlocked));
        }

        // Tambah XP (+150 XP)
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

  // Pindah ke level selanjutnya
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

  // Reset seluruh progres
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
    <div className="min-h-screen bg-[#0a0a16] text-gray-200 flex flex-col font-sans selection:bg-[#00ffd0]/20 selection:text-[#00ffd0]">
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
        {/* Active Mission Quest Bar (Codedex-Style Quest Strip + Randomize Mission Button) */}
        <div className="bg-[#121329] border-2 border-indigo-800 px-3 py-2.5 sm:px-4 sm:py-3 shadow-[3px_3px_0_#05050d] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start sm:items-center space-x-2.5 min-w-0">
            <div className="w-7 h-7 bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Target className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center flex-wrap gap-1.5 mb-0.5">
                <span
                  className="text-[#00ffd0] uppercase tracking-wider"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.48rem' }}
                >
                  QUEST LEVEL {currentLevel.id} • VARIASI #{currentMissionIndex + 1}/{totalVariants}
                </span>
                <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 px-1.5 py-0.2 font-semibold">
                  ✓ Validasi Konsep Fleksibel
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                {currentMission.objective}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
            <button
              onClick={handleRandomizeMission}
              className="px-2.5 py-1.5 bg-purple-950 hover:bg-purple-800 text-purple-200 border-2 border-purple-400 shadow-[2px_2px_0_#000] active:translate-y-[1px] active:shadow-none transition flex items-center space-x-1.5 text-xs font-bold"
              title="Acak soal misi berbeda di level yang sama agar bisa latihan terus!"
            >
              <Dices className="w-3.5 h-3.5 text-purple-300" />
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}>
                ACAK MISI LAIN
              </span>
            </button>
          </div>
        </div>

        {/* Celebration Banner - Retro Pixel Style */}
        {isSuccess && showCelebrationBanner && (
          <div className="bg-[#11111a] text-white p-3 sm:p-4 border-[3px] border-[#00ffd0] shadow-[4px_4px_0_#0088aa] flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <span className="text-2xl sm:text-3xl animate-bounce">🏆</span>
              <div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start flex-wrap gap-y-1">
                  <span className="font-pixel text-[10px] sm:text-xs text-[#00ffd0] tracking-wide uppercase bg-[#00ffd0]/10 px-2 py-1 border border-[#00ffd0]">
                    MISI {currentLevel.id} (VAR #{currentMissionIndex + 1}) CLEAR!
                  </span>
                  <span className="text-xs font-pixel text-[#ffd700]">+150 XP</span>
                </div>
                <p className="text-xs text-gray-300 mt-1.5">
                  Konsep kode kamu tepat! Kamu bisa coba variasi misi lain di level ini atau lanjut ke level berikutnya.
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={handleRandomizeMission}
                className="flex-1 sm:flex-none px-3 py-2 bg-purple-900 hover:bg-purple-700 text-white text-[10px] font-pixel border-2 border-purple-300 transition-all shadow-[2px_2px_0px_#0f0f23] active:shadow-none active:translate-y-[2px]"
                title="Coba variasi soal lain di level ini"
              >
                <span>🎲 MISI LAIN</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setShowCelebrationBanner(false);
                }}
                className="flex-1 sm:flex-none px-3 py-2 bg-[#1a1a2e] hover:bg-[#2d2d44] text-white text-[10px] font-pixel border-2 border-[#3a3a5c] transition-all shadow-[2px_2px_0px_#0f0f23] active:shadow-none active:translate-y-[2px]"
                title="Tutup dan amati simulasi"
              >
                <span>LIHAT SIMULASI</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  setIsVictoryOpen(true);
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-[#00ffd0] hover:bg-[#00ccaa] text-[#0a0a16] text-[10px] font-pixel border-2 border-white transition-all shadow-[2px_2px_0px_#fff] active:shadow-none active:translate-y-[2px] flex items-center justify-center space-x-2"
              >
                <span>NEXT LEVEL</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* MOBILE VIEW (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-3">
          {/* Kanvas Simulasi 2D Persisten di HP */}
          <div className={`w-full transition-all duration-300 shadow-[4px_4px_0_rgba(0,0,0,0.5)] ${canvasCollapsed ? 'h-[52px]' : 'h-[165px] xs:h-[190px] sm:h-[240px]'}`}>
            <GameCanvas2D
              level={currentLevel}
              mission={currentMission}
              missionIndex={currentMissionIndex}
              totalMissions={totalVariants}
              onRandomizeMission={handleRandomizeMission}
              isSuccess={isSuccess}
              isExecuting={isExecuting}
              onClaimVictory={() => setIsVictoryOpen(true)}
              isCollapsed={canvasCollapsed}
              onToggleCollapse={() => setCanvasCollapsed(!canvasCollapsed)}
            />
          </div>

          {/* Tab Segmented Control (Pixel Style) */}
          <div className="flex items-center bg-[#11111a] p-1 border-[2px] border-[#3a3a5c] shadow-[2px_2px_0_rgba(0,0,0,0.5)] sticky top-[64px] z-30">
            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileTab('editor');
              }}
              className={`flex-1 py-2 text-[10px] font-pixel transition-colors flex items-center justify-center space-x-1.5 ${
                mobileTab === 'editor'
                  ? 'bg-[#00ffd0] text-[#0a0a16] border-2 border-white shadow-[1px_1px_0_#fff]'
                  : 'bg-transparent text-gray-400 hover:text-white border-2 border-transparent'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>EDITOR</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileTab('terminal');
              }}
              className={`flex-1 py-2 text-[10px] font-pixel transition-colors flex items-center justify-center space-x-1.5 ${
                mobileTab === 'terminal'
                  ? 'bg-[#00ffd0] text-[#0a0a16] border-2 border-white shadow-[1px_1px_0_#fff]'
                  : 'bg-transparent text-gray-400 hover:text-white border-2 border-transparent'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>CONSOLE</span>
              {terminalError && <span className="w-2 h-2 rounded-none bg-[#ff0055] animate-pulse ml-1"></span>}
              {isSuccess && <span className="w-2 h-2 rounded-none bg-[#00ffd0] ml-1"></span>}
            </button>
          </div>

          {/* Konten Workspace Aktif */}
          {mobileTab === 'editor' ? (
            <div className="w-full min-h-[440px] flex flex-col shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
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
            <div className="w-full min-h-[380px] flex flex-col gap-2">
              <div className="flex-1 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
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
                className="w-full py-2.5 bg-[#1a1a2e] border-2 border-[#00ffd0] text-[10px] font-pixel text-[#00ffd0] hover:bg-[#00ffd0] hover:text-[#0a0a16] transition-colors flex items-center justify-center space-x-2 shadow-[2px_2px_0_#00aa88] active:translate-y-[2px] active:shadow-none"
              >
                <Code className="w-3.5 h-3.5" />
                <span>KEMBALI KE EDITOR</span>
              </button>
            </div>
          )}
        </div>

        {/* DESKTOP VIEW (>= 1024px) */}
        <div className="hidden lg:flex flex-1 flex-row gap-5">
          {/* Sisi Kiri: Game 2D & Terminal Output */}
          <section className="w-1/2 flex flex-col gap-4">
            <div className="h-[320px] xl:h-[350px] w-full shadow-[4px_4px_0_rgba(0,0,0,0.5)] bg-[#11111a]">
              <GameCanvas2D
                level={currentLevel}
                mission={currentMission}
                missionIndex={currentMissionIndex}
                totalMissions={totalVariants}
                onRandomizeMission={handleRandomizeMission}
                isSuccess={isSuccess}
                isExecuting={isExecuting}
                onClaimVictory={() => setIsVictoryOpen(true)}
              />
            </div>

            <div className="flex-1 min-h-[280px] w-full shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
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

          {/* Sisi Kanan: Code Editor */}
          <section className="w-1/2 min-h-[620px] flex flex-col shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
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

      {/* 3. Modal Fase Materi */}
      <MaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        level={currentLevel}
        mission={currentMission}
      />

      {/* 4. Modal Kemenangan */}
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
