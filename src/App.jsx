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

  // 4. State Modal, Banner, & Mobile Tabs ('editor' | 'terminal')
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [canvasCollapsed, setCanvasCollapsed] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor');

  // Sync saat level berpindah
  useEffect(() => {
    const savedCode = localStorage.getItem(`gopherquest_code_${currentLevel.id}`);
    setUserCode(savedCode !== null ? savedCode : currentLevel.starterCode);
    setIsSuccess(false);
    setShowCelebrationBanner(false);
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
      const result = validateGolangCode(userCode, currentLevel);

      if (result.success) {
        setIsSuccess(true);
        setShowCelebrationBanner(true);
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

        // Tidak lagi memaksa pop-up modal setelah 900ms!
        // Pengguna dapat leluasa mengamati simulasi 2D dan mengeklik "Buka Hasil & Level Berikutnya" saat siap.
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
    setShowCelebrationBanner(false);
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4">
        {/* Celebration Banner (Muncul saat kode berhasil tanpa menutupi layar) */}
        {isSuccess && showCelebrationBanner && (
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg shadow-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn border border-emerald-300/40">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <span className="text-2xl sm:text-3xl animate-bounce">🎉</span>
              <div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <span className="font-black text-xs sm:text-sm tracking-wide uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                    Misi Level {currentLevel.id} Sukses!
                  </span>
                  <span className="text-xs font-bold text-amber-300">+150 XP</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-50 font-medium mt-0.5">
                  Simulasi 2D telah aktif 100%! Kamu bebas mengamati animasi sebelum lanjut ke level berikutnya.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setShowCelebrationBanner(false);
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-950/40 hover:bg-emerald-950/60 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 border border-white/20"
                title="Tutup banner ini dan amati simulasi di kanvas"
              >
                <span>Amati Simulasi</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  setIsVictoryOpen(true);
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-950 rounded-xl text-xs font-black shadow-md transition transform active:scale-95 flex items-center justify-center space-x-1.5"
              >
                <span>🏆 Level Berikutnya</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* MOBILE VIEW (< 1024px): Kanvas 2D Selalu Tampil di Atas + Tab Editor/Terminal di Bawah */}
        <div className="lg:hidden flex flex-col gap-3">
          {/* Kanvas Simulasi 2D Persisten di HP */}
          <div className={`w-full transition-all duration-300 ${canvasCollapsed ? 'h-[50px]' : 'h-[190px] xs:h-[220px] sm:h-[260px]'}`}>
            <GameCanvas2D
              level={currentLevel}
              isSuccess={isSuccess}
              isExecuting={isExecuting}
              onClaimVictory={() => setIsVictoryOpen(true)}
              isCollapsed={canvasCollapsed}
              onToggleCollapse={() => setCanvasCollapsed(!canvasCollapsed)}
            />
          </div>

          {/* Tab Segmented Control untuk Workspace HP (Editor vs Terminal) */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-sm sticky top-[64px] z-30">
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
                setMobileTab('terminal');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                mobileTab === 'terminal'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Terminal Console</span>
              {terminalError && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-0.5"></span>}
              {isSuccess && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-0.5"></span>}
            </button>
          </div>

          {/* Konten Workspace Aktif */}
          {mobileTab === 'editor' ? (
            <div className="w-full min-h-[440px] flex flex-col">
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
              <div className="flex-1">
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
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setMobileTab('editor');
                }}
                className="w-full py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:text-sky-600 transition flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
              >
                <Code className="w-3.5 h-3.5 text-sky-500" />
                <span>Kembali ke Editor Kode</span>
              </button>
            </div>
          )}
        </div>

        {/* DESKTOP VIEW (>= 1024px): Side-by-side Dual Column */}
        <div className="hidden lg:flex flex-1 flex-row gap-5">
          {/* Sisi Kiri: Game 2D & Terminal Output */}
          <section className="w-1/2 flex flex-col gap-4">
            <div className="h-[320px] xl:h-[350px] w-full">
              <GameCanvas2D
                level={currentLevel}
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
