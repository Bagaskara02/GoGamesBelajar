import React, { useState } from 'react';
import { BookOpen, Volume2, VolumeX, ChevronDown, Check, Lock, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function Navbar({
  levels,
  currentLevelIndex,
  onSelectLevel,
  onOpenMaterial,
  xp,
  unlockedLevels,
  onResetProgress
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentLevel = levels[currentLevelIndex];
  const progressPercent = Math.round(((currentLevelIndex + 1) / levels.length) * 100);

  const toggleSound = () => {
    const nextState = soundEffects.toggleSound();
    setSoundEnabled(nextState);
  };

  return (
    <header className="bg-[#fffbeb] border-b-[3px] border-slate-900 sticky top-0 z-40 px-2.5 sm:px-6 py-2.5 shadow-[0_4px_0_#0f172a]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-nowrap">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 bg-[#38bdf8] border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a]">
            <div className="text-lg sm:text-2xl">🐹</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xs sm:text-sm font-pixel text-slate-900 tracking-wide whitespace-nowrap">
                GOPHER<span className="text-sky-600">QUEST</span>
              </h1>
              <span className="text-[8px] sm:text-[9px] font-pixel px-1.5 py-0.5 bg-[#fde047] text-slate-900 border-2 border-slate-900 hidden xs:inline shadow-[2px_2px_0px_#0f172a]">
                8-BIT
              </span>
            </div>
            <p className="text-xs text-slate-600 font-bold hidden sm:block">
              Petualangan Pixel Belajar Golang!
            </p>
          </div>
        </div>

        {/* Level Dropdown Selector */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              soundEffects.playClick();
              setDropdownOpen(!dropdownOpen);
            }}
            className="flex items-center space-x-1.5 sm:space-x-2 bg-white hover:bg-sky-100 border-2 border-slate-900 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-900 transition-all shadow-[3px_3px_0px_#0f172a] active:translate-y-[2px] active:shadow-none"
          >
            <span className="font-pixel text-[9px] sm:text-[10px] bg-[#38bdf8] text-slate-950 px-1.5 py-0.5 border border-slate-900">
              LVL {currentLevel?.id || 1}
            </span>
            <span className="truncate max-w-[75px] sm:max-w-[160px] hidden md:inline font-bold text-sm">
              {currentLevel?.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-900" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[92vw] max-w-[330px] sm:w-80 max-h-[410px] overflow-y-auto bg-white border-[3px] border-slate-900 shadow-[6px_6px_0px_#0f172a] p-2 z-40 space-y-1.5">
                <div className="px-2.5 py-2 text-[9px] font-pixel text-slate-800 bg-[#fef08a] border-2 border-slate-900 flex justify-between items-center mb-2">
                  <span>PILIH LEVEL</span>
                  <span className="text-emerald-700">{progressPercent}% CLEAR</span>
                </div>

                {levels.map((lvl, index) => {
                  const isUnlocked = unlockedLevels.includes(lvl.id);
                  const isCurrent = currentLevelIndex === index;

                  return (
                    <button
                      key={lvl.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        soundEffects.playClick();
                        onSelectLevel(index);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors border-2 ${
                        isCurrent
                          ? 'bg-[#bae6fd] text-slate-950 border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                          : isUnlocked
                          ? 'bg-white text-slate-800 border-slate-300 hover:border-slate-900 hover:bg-amber-50'
                          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="font-pixel text-[9px] text-slate-700">
                          {String(lvl.id).padStart(2, '0')}
                        </span>
                        <div className="truncate">
                          <span className="block font-bold text-slate-900 truncate text-sm">{lvl.title}</span>
                          <span className="text-xs text-slate-600 block truncate">
                            {lvl.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center shrink-0 ml-2">
                        {isUnlocked ? (
                          isCurrent ? (
                            <div className="w-3 h-3 bg-sky-500 border border-slate-900"></div>
                          ) : (
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                          )
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Right Stats & Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          {/* Progress Bar (Segmented Pixel) */}
          <div className="hidden lg:flex flex-col space-y-1 w-24 mr-1">
            <div className="text-[8px] font-pixel text-slate-800 text-right">{progressPercent}%</div>
            <div className="flex h-2.5 w-full space-x-[1px] bg-white border-2 border-slate-900 p-[1px]">
              {levels.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 ${i <= currentLevelIndex ? 'bg-[#22c55e]' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>

          {/* XP Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-[#fde047] border-2 border-slate-900 px-2.5 py-1.5 text-[9px] sm:text-[10px] font-pixel text-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <span>⭐</span>
            <span>{xp} XP</span>
          </div>

          {/* Buku Materi Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenMaterial();
            }}
            className="flex items-center space-x-1.5 bg-[#38bdf8] hover:bg-sky-300 text-slate-950 border-2 border-slate-900 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold transition-all shadow-[2px_2px_0px_#0f172a] active:translate-y-[2px] active:shadow-none shrink-0"
            title="Buku Panduan Misi"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline font-pixel text-[9px]">MATERI</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 sm:p-2 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 transition-all shadow-[2px_2px_0px_#0f172a] active:translate-y-[2px] active:shadow-none shrink-0"
            title={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={() => {
              if (window.confirm('Yakin ingin mengulang semua progres dari Level 1?')) {
                soundEffects.playClick();
                onResetProgress();
              }
            }}
            className="p-1.5 sm:p-2 bg-white hover:bg-rose-100 text-slate-900 hover:text-rose-600 border-2 border-slate-900 transition-all shadow-[2px_2px_0px_#0f172a] active:translate-y-[2px] active:shadow-none shrink-0"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
