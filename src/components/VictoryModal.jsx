import React, { useEffect } from 'react';
import { Trophy, ChevronRight, RefreshCw, X, Star } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

const VictoryModal = ({ isOpen, level, onNextLevel, onStay, isLastLevel }) => {
  useEffect(() => {
    if (isOpen) {
      playSound('victory');
    }
  }, [isOpen]);

  if (!isOpen || !level) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md relative bg-[#fffef9] border-[4px] border-slate-900 shadow-[8px_8px_0px_#0f172a] flex flex-col items-center p-6 sm:p-8 text-slate-900 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onStay();
          }}
          className="absolute top-3 right-3 p-1.5 bg-white hover:bg-rose-200 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Trophy Icon */}
        <div className="w-20 h-20 bg-[#fde047] border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] flex items-center justify-center text-5xl mb-4 animate-bounce">
          🏆
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-[#4ade80] border-2 border-slate-900 px-3 py-1 font-pixel text-[9px] text-slate-950 mb-3 shadow-[2px_2px_0px_#0f172a]">
            LEVEL {level.id} SELESAI!
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-pixel mb-2">
            LUAR BIASA!
          </h2>
          <p className="text-slate-700 text-sm font-medium">
            Kamu berhasil menyelesaikan misi pemrograman ini dengan konsep yang tepat!
          </p>
        </div>

        {/* Stats / Rewards Cards */}
        <div className="grid grid-cols-2 gap-3.5 w-full mb-6">
          <div className="bg-[#fef9c3] p-3.5 border-[3px] border-slate-900 flex flex-col items-center justify-center shadow-[3px_3px_0px_#0f172a]">
            <Star className="text-amber-600 mb-1" size={20} />
            <div className="text-slate-700 font-pixel text-[8px] mb-1">EXP DIDAPAT</div>
            <div className="text-sm font-bold text-slate-900 font-pixel">+150 XP</div>
          </div>

          <div className="bg-[#e0f2fe] p-3.5 border-[3px] border-slate-900 flex flex-col items-center justify-center shadow-[3px_3px_0px_#0f172a]">
            <Trophy className="text-sky-700 mb-1" size={20} />
            <div className="text-slate-700 font-pixel text-[8px] mb-1">STATUS</div>
            <div className="text-sm font-bold text-emerald-700 font-pixel">100% CLEAR</div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          {!isLastLevel && (
            <button
              onClick={() => {
                playSound('start');
                onNextLevel();
              }}
              className="w-full py-3.5 bg-[#4ade80] hover:bg-emerald-400 font-pixel text-slate-950 text-[10px] sm:text-xs shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900 active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 transition"
            >
              <span>LEVEL BERIKUTNYA</span>
              <ChevronRight size={18} />
            </button>
          )}

          <button
            onClick={() => {
              playSound('click');
              onStay();
            }}
            className="w-full py-3 bg-white hover:bg-sky-100 font-pixel text-slate-900 text-[9px] sm:text-[10px] shadow-[3px_3px_0px_#0f172a] border-[3px] border-slate-900 active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 transition"
          >
            <RefreshCw size={14} />
            <span>LIHAT SIMULASI 2D</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
