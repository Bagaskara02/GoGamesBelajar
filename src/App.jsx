import React, { useState, useEffect } from 'react';
import { LEVELS_DATA } from './data/levels';
import { validateGolangCode } from './utils/codeValidator';
import { soundEffects } from './utils/soundEffects';
import { Code, Gamepad2, Terminal as TerminalIcon } from 'lucide-react';

import Navbar from './components/Navbar';
import GameCanvas2D from './components/GameCanvas2D';
import CodeEditor from './components/CodeEditor';
import TerminalOutput from './components/TerminalOutput';
import MaterialModal from './components/MaterialModal';
import VictoryModal from './components/VictoryModal';

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

  // 2. State Code Editor & Eksekusi
  const [userCode, setUserCode] = useState(() => {
    const savedCode = localStorage.getItem(`gopherquest_code_${currentLevel.id}`);
    return savedCode !== null ? savedCode : currentLevel.starterCode;
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 3. State Terminal Output
  const [terminalOutput, setTerminalOutput] = useState('');
  const [terminalError, setTerminalError] = useState('');
  const [terminalDiagnostics, setTerminalDiagnostics] = useState('');

  // 4. State Modal & Mobile Tabs ('editor' | 'game' | 'terminal')
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor');

  // Sync saat level berpindah
  useEffect(() => {
    const savedCode = localStorage.getItem(`gopherquest_code_${currentLevel.id}`);
    setUserCode(savedCode !== null ? savedCode : currentLevel.starterCode);
    setIsSuccess(false);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsMaterialOpen(true);
    setIsVictoryOpen(false);

    localStorage.setItem('gopherquest_level_idx', currentLevelIndex.toString());
  }, [currentLevelIndex, currentLevel.id, currentLevel.starterCode]);

  // Simpan kode otomatis saat diketik
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    localStorage.setItem(`gopherquest_code_${currentLevel.id}`, newCode);
  };

  // Reset kode ke template starter
  const handleResetCode = () => {
    setUserCode(currentLevel.starterCode);
    localStorage.removeItem(`gopherquest_code_${currentLevel.id}`);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsSuccess(false);
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
      const result = validateGolangCode(userCode, currentLevel);

      if (result.success) {
        setIsSuccess(true);
        setTerminalOutput(result.output);
        setTerminalError('');
        setTerminalDiagnostics(result.diagnostics);
        soundEffects.playSuccess();

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

        // Buka modal kemenangan setelah animasi 2D merespons
        setTimeout(() => {
          setIsVictoryOpen(true);
        }, 900);
      } else {
        setIsSuccess(false);
        setTerminalOutput(result.output);
        setTerminalError(result.error);
        setTerminalDiagnostics(result.diagnostics);
        soundEffects.playError();

        // Di layar HP kecil, otomatis alihkan ke tab terminal agar pengguna bisa langsung membaca diagnosa error
        if (window.innerWidth < 1024) {
          setMobileTab('terminal');
        }
      }
    }, 450);
  };

  // Pindah ke level selanjutnya
  const handleNextLevel = () => {
    setIsVictoryOpen(false);
    if (currentLevelIndex < LEVELS_DATA.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };

  // Reset seluruh progres
  const handleResetProgress = () => {
    localStorage.clear();
    setUnlockedLevels([1]);
    setCurrentLevelIndex(0);
    setXp(0);
    setUserCode(LEVELS_DATA[0].starterCode);
    setIsSuccess(false);
    setTerminalOutput('');
    setTerminalError('');
    setTerminalDiagnostics('');
    setIsMaterialOpen(true);
    setIsVictoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-800">
      {/* 1. Header & Navigation (Responsive Mobile & Desktop) */}
      <Navbar
        levels={LEVELS_DATA}
        currentLevelIndex={currentLevelIndex}
        onSelectLevel={(idx) => setCurrentLevelIndex(idx)}
        onOpenMaterial={() => setIsMaterialOpen(true)}
        xp={xp}
        unlockedLevels={unlockedLevels}
        onResetProgress={handleResetProgress}
      />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2.5 sm:p-4 md:p-5 flex flex-col">
        {/* Mobile Tab Segmented Switcher (Muncul di layar HP / Tablet < 1024px) */}
        <div className="lg:hidden flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-sm mb-3 sticky top-[68px] z-30">
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileTab('editor');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              mobileTab === 'editor'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Editor Kode</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileTab('game');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              mobileTab === 'game'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Game 2D</span>
            {isSuccess && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileTab('terminal');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              mobileTab === 'terminal'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Terminal</span>
            {terminalError && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>}
          </button>
        </div>

        {/* Content Area: Split View di Desktop (>= 1024px) & Tab View di Mobile (< 1024px) */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-5">
          {/* Sisi Kiri: Game 2D & Terminal Output */}
          <section className={`w-full lg:w-1/2 flex flex-col gap-4 ${
            mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Visualisasi Game 2D */}
            <div className={`h-[280px] sm:h-[320px] md:h-[350px] w-full ${
              mobileTab === 'terminal' ? 'hidden lg:block' : 'block'
            }`}>
              <GameCanvas2D
                level={currentLevel}
                isSuccess={isSuccess}
                isExecuting={isExecuting}
              />
            </div>

            {/* Terminal Output */}
            <div className={`flex-1 min-h-[260px] w-full ${
              mobileTab === 'game' ? 'hidden lg:block' : 'block'
            }`}>
              <TerminalOutput
                output={terminalOutput}
                error={terminalError}
                diagnostics={terminalDiagnostics}
                expectedOutput={currentLevel.expectedOutput}
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

          {/* Sisi Kanan: Code Editor macOS Golang */}
          <section className={`w-full lg:w-1/2 min-h-[460px] sm:min-h-[520px] flex flex-col ${
            mobileTab !== 'editor' ? 'hidden lg:flex' : 'flex'
          }`}>
            <CodeEditor
              code={userCode}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleResetCode}
              hint={currentLevel.hint}
              isExecuting={isExecuting}
              isSuccess={isSuccess}
            />
          </section>
        </div>
      </main>

      {/* 3. Modal Fase Materi (Responsif di Layar HP & Laptop) */}
      <MaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        level={currentLevel}
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
