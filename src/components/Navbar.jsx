import React, { useState } from 'react';
import { BookOpen, Volume2, VolumeX, Award, ChevronDown, Check, Lock, RotateCcw, Sparkles } from 'lucide-react';
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
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-blue-600 shadow-md shadow-sky-500/20 p-0.5">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-xl">
              🐹
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                Gopher<span className="text-sky-600">Quest</span>
              </h1>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                2D EDU
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Belajar Golang Interaktif dari Nol sampai Mahir
            </p>
          </div>
        </div>

        {/* Level Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => {
              soundEffects.playClick();
              setDropdownOpen(!dropdownOpen);
            }}
            className="flex items-center space-x-1.5 sm:space-x-2.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs font-bold text-slate-800 transition shadow-sm"
          >
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-sky-500 text-white font-bold text-[10px] sm:text-[11px]">
              LVL {currentLevel.id}
            </span>
            <span className="truncate max-w-[80px] sm:max-w-[180px] hidden sm:inline">
              {currentLevel.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[90vw] max-w-[360px] sm:w-96 max-h-[420px] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-40 space-y-1">
                <div className="px-3.5 py-2.5 text-xs font-bold text-slate-500 border-b border-slate-100 flex justify-between items-center">
                  <span>PILIH LEVEL (TOTAL {levels.length})</span>
                  <span className="text-sky-600 font-black">{progressPercent}% Selesai</span>
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
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                        isCurrent
                          ? 'bg-sky-50 text-sky-800 border border-sky-200 font-bold'
                          : isUnlocked
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-400 cursor-not-allowed opacity-50 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <span className="font-bold text-xs text-slate-400 w-5">
                          #{lvl.id}
                        </span>
                        <div className="truncate">
                          <span className="block font-bold text-slate-800 truncate">{lvl.title}</span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {lvl.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 flex-shrink-0 ml-2">
                        {isUnlocked ? (
                          isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                          ) : (
                            <Check className="w-4 h-4 text-emerald-600" />
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
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* XP Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl text-xs font-bold text-amber-800 shadow-sm">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{xp} XP</span>
          </div>

          {/* Buku Materi Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenMaterial();
            }}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-3.5 py-2 rounded-2xl text-xs font-bold transition shadow-sm shadow-sky-500/20"
            title="Buka Penjelasan & Analogi Materi"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Buku Materi</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition border border-slate-200"
            title={soundEnabled ? 'Matikan Suara Audio' : 'Aktifkan Suara Audio'}
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
              if (window.confirm("Apakah kamu yakin ingin mengulang seluruh progres dari Level 1?")) {
                soundEffects.playClick();
                onResetProgress();
              }
            }}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition border border-slate-200"
            title="Reset Seluruh Progres"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
