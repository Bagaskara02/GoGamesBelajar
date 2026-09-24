import React, { useState } from 'react';
import { BookOpen, Volume2, VolumeX, Award, ChevronDown, Check, Lock, RotateCcw } from 'lucide-react';
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
    <header className="bg-gradient-to-r from-[#0f0f23] to-[#1a1a2e] border-b-[3px] border-[#3a3a5c] sticky top-0 z-40 px-2 sm:px-6 py-2 shadow-[0_4px_0_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-nowrap">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-[#2d2d44] border-2 border-[#4a4a75] shadow-[2px_2px_0px_#11111a] rounded-none">
            <div className="text-lg sm:text-2xl" style={{ imageRendering: 'pixelated' }}>
              🐹
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xs sm:text-base font-pixel text-white tracking-wider whitespace-nowrap drop-shadow-[2px_2px_0px_#000]">
                Gopher<span className="text-[#00ffd0]">Quest</span>
              </h1>
              <span className="text-[8px] sm:text-[10px] font-pixel px-1.5 py-1 bg-[#1a1a2e] text-[#ff00ff] border-2 border-[#ff00ff] hidden xs:inline shadow-[1px_1px_0px_#000]">
                2D EDU
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium hidden sm:block mt-1 font-mono uppercase">
              Misi Koding Dimulai!
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
            className="flex items-center space-x-1 sm:space-x-2 bg-[#1a1a2e] hover:bg-[#2d2d44] border-2 border-[#00ffd0] px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white transition-all shadow-[2px_2px_0px_#00aa88] active:shadow-none active:translate-y-[2px]"
          >
            <span className="font-pixel text-[#00ffd0]">
              LVL {currentLevel?.id || 1}
            </span>
            <span className="truncate max-w-[60px] sm:max-w-[150px] hidden md:inline font-mono">
              {currentLevel?.title}
            </span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ffd0]" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[90vw] max-w-[320px] sm:w-80 max-h-[400px] overflow-y-auto bg-[#0f0f23] border-[3px] border-[#3a3a5c] shadow-[4px_4px_0_rgba(0,0,0,0.5)] p-2 z-40 space-y-1">
                <div className="px-2 py-2 text-[10px] sm:text-xs font-pixel text-gray-400 border-b-2 border-[#2d2d44] flex justify-between items-center mb-2">
                  <span>PILIH LEVEL</span>
                  <span className="text-[#00ffd0]">{progressPercent}% CLEAR</span>
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
                          ? 'bg-[#1a2b3c] text-white border-[#00ffd0]'
                          : isUnlocked
                          ? 'bg-[#1a1a2e] text-gray-300 border-[#2d2d44] hover:border-[#00ffd0] hover:bg-[#2d2d44]'
                          : 'bg-[#0a0a16] text-gray-600 border-[#1a1a2e] cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className={`font-pixel text-[10px] ${isCurrent ? 'text-[#00ffd0]' : 'text-gray-500'}`}>
                          {String(lvl.id).padStart(2, '0')}
                        </span>
                        <div className="truncate font-mono">
                          <span className="block font-bold truncate">{lvl.title}</span>
                          <span className="text-[9px] text-gray-500 block truncate uppercase">
                            {lvl.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center shrink-0 ml-2">
                        {isUnlocked ? (
                          isCurrent ? (
                            <div className="w-3 h-3 bg-[#00ffd0] shadow-[0_0_5px_#00ffd0]"></div>
                          ) : (
                            <Check className="w-4 h-4 text-[#00ffd0]" />
                          )
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-gray-600" />
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
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Progress Bar (Segmented Pixel) - Hidden on mobile */}
          <div className="hidden lg:flex flex-col space-y-1 w-24 mr-2">
            <div className="text-[8px] font-pixel text-[#00ffd0] text-right">{progressPercent}%</div>
            <div className="flex h-2 w-full space-x-[1px] bg-[#0f0f23] border border-[#3a3a5c] p-[1px]">
              {levels.map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 ${i <= currentLevelIndex ? 'bg-[#00ffd0]' : 'bg-[#1a1a2e]'}`} 
                />
              ))}
            </div>
          </div>

          {/* XP Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-[#2d1b00] border-2 border-[#ffd700] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-pixel text-[#ffd700] shadow-[2px_2px_0px_#997a00]">
            <span className="text-xs">⭐</span>
            <span>{xp} XP</span>
          </div>

          {/* Buku Materi Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenMaterial();
            }}
            className="flex items-center space-x-1.5 bg-[#4f46e5] hover:bg-[#6366f1] text-white border-2 border-[#818cf8] px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold font-mono transition-all shadow-[2px_2px_0px_#312e81] active:shadow-none active:translate-y-[2px] shrink-0"
            title="Buku Panduan Misi"
          >
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline uppercase">Materi</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 sm:p-2 bg-[#1a1a2e] hover:bg-[#2d2d44] text-white border-2 border-[#3a3a5c] transition-all shadow-[2px_2px_0px_#0f0f23] active:shadow-none active:translate-y-[2px] shrink-0"
            title={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00ffd0]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            )}
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={() => {
              if (window.confirm("AWAS: Kamu akan kehilangan semua XP dan progress. Lanjut reset?")) {
                soundEffects.playClick();
                onResetProgress();
              }
            }}
            className="p-1.5 sm:p-2 bg-[#1a1a2e] hover:bg-[#4a1111] text-gray-400 hover:text-[#ff4444] border-2 border-[#3a3a5c] hover:border-[#ff4444] transition-all shadow-[2px_2px_0px_#0f0f23] hover:shadow-[2px_2px_0px_#4a1111] active:shadow-none active:translate-y-[2px] shrink-0"
            title="Reset Game"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
