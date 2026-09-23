import React from 'react';
import { Award, ArrowRight, CheckCircle2, RotateCcw, PartyPopper } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function VictoryModal({
  isOpen,
  level,
  onNextLevel,
  onStay,
  isLastLevel
}) {
  if (!isOpen || !level) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center flex flex-col items-center">
        
        {/* Glow Trophy Icon */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 shadow-xl shadow-amber-400/30 flex items-center justify-center text-4xl">
            🏆
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase mb-2">
          MISI LEVEL {level.id} TUNTAS!
        </span>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
          {isLastLevel ? "SELAMAT! MASTER GOLANG!" : "Kerja Hebat, Engineer!"}
        </h3>

        <p className="text-slate-600 text-xs sm:text-sm max-w-xs mb-6 leading-relaxed">
          {isLastLevel 
            ? "Kamu telah menyelesaikan seluruh kurikulum Golang 14 Level dari Pemula sampai Ahli! Kamu sekarang siap membangun aplikasi backend production!" 
            : `Perangkat sistem '${level.title}' telah stabil dan terkonfigurasi dengan sukses.`}
        </p>

        {/* Reward Stats Cards */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">EXP DIDAPAT</span>
            <span className="text-lg font-black text-amber-600 flex items-center space-x-1 mt-0.5">
              <span>+150 XP</span>
              <Award className="w-4 h-4 text-amber-500" />
            </span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">STATUS 2D LAB</span>
            <span className="text-lg font-black text-emerald-600 flex items-center space-x-1 mt-0.5">
              <span>100% OK</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onStay();
            }}
            className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Review Kode Ini</span>
          </button>

          {!isLastLevel ? (
            <button
              onClick={() => {
                soundEffects.playSuccess();
                onNextLevel();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-black tracking-wide transition transform hover:scale-[1.03] active:scale-95 shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2"
            >
              <span>LEVEL BERIKUTNYA</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundEffects.playSuccess();
                onStay();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-black tracking-wide transition shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2"
            >
              <PartyPopper className="w-4 h-4" />
              <span>SELESAI!</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
