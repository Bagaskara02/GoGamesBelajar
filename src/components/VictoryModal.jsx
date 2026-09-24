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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-[Poppins]">
      {/* Modal Container */}
      <div 
        className="w-full max-w-lg relative bg-[#1a1a2e] flex flex-col items-center p-8 animate-in zoom-in duration-500"
        style={{ 
          border: '4px solid #f59e0b', 
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(245, 158, 11, 0.1), 8px 8px 0px rgba(0,0,0,0.8)' 
        }}
      >
        {/* Close Button */}
        <button 
          onClick={() => { playSound('click'); onStay(); }}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white border-2 border-transparent hover:border-gray-500 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Trophy Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse"></div>
          <div className="text-7xl relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-bounce" style={{ animationDuration: '2s' }}>
            🏆
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-yellow-400 font-['Press_Start_2P'] text-xs mb-4 tracking-widest uppercase">
            Level {level.id} Selesai!
          </div>
          <h2 className="text-3xl font-bold text-white font-['Press_Start_2P'] mb-2 text-shadow-lg" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
            LUAR BIASA!
          </h2>
          <p className="text-gray-300 mt-4">
            Kamu telah berhasil menyelesaikan misi ini dengan sempurna.
          </p>
        </div>

        {/* Stats / Rewards Cards */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-[#0f0f23] p-4 border-2 border-[#4a4e69] flex flex-col items-center justify-center relative overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            <Star className="text-yellow-400 mb-2 absolute opacity-10 top-2 right-2" size={40} />
            <div className="text-gray-400 font-['Press_Start_2P'] text-[8px] mb-1 z-10">EXP DIDAPAT</div>
            <div className="text-2xl font-bold text-green-400 font-['Press_Start_2P'] z-10">+{level.exp || 100}</div>
          </div>
          
          <div className="bg-[#0f0f23] p-4 border-2 border-[#4a4e69] flex flex-col items-center justify-center relative overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            <Trophy className="text-blue-400 mb-2 absolute opacity-10 top-2 left-2" size={40} />
            <div className="text-gray-400 font-['Press_Start_2P'] text-[8px] mb-1 z-10">STATUS</div>
            <div className="text-lg font-bold text-blue-400 font-['Press_Start_2P'] z-10">SELESAI</div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          {!isLastLevel && (
            <button 
              onClick={() => { playSound('start'); onNextLevel(); }}
              className="w-full group relative py-4 bg-green-600 hover:bg-green-500 transition-colors font-['Press_Start_2P'] text-white text-[10px] md:text-xs overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.5)] border-2 border-green-400 flex items-center justify-center gap-2"
              style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              <span className="relative z-10">LEVEL BERIKUTNYA</span>
              <ChevronRight size={18} className="relative z-10 text-green-200" />
            </button>
          )}
          
          <button 
            onClick={() => { playSound('click'); onStay(); }}
            className="w-full py-3 bg-[#2a2a4a] hover:bg-[#3a3a5a] transition-colors font-['Press_Start_2P'] text-cyan-400 text-[10px] shadow-[4px_4px_0px_rgba(0,0,0,0.5)] border-2 border-[#4a4e69] flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} />
            <span>LIHAT SIMULASI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
