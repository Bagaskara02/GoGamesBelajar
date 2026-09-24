import React, { useState, useEffect } from 'react';
import { Play, Copy, Check, Lightbulb, BookOpen, Target, Terminal, X, Zap, Sparkles } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

const MaterialModal = ({ isOpen, onClose, level, mission }) => {
  const [activeTab, setActiveTab] = useState('materi');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      playSound('open');
      setActiveTab('materi');
    }
  }, [isOpen]);

  if (!isOpen || !level) return null;

  const codeToCopy = level.codeSample || level.materi?.contohKode || '';

  const handleCopyCode = () => {
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeMission = mission || level.mission || {};

  const tabs = [
    { id: 'materi', label: 'Materi Inti', icon: BookOpen, color: 'text-cyan-400', activeBg: 'bg-cyan-500/20', borderColor: 'border-cyan-500' },
    { id: 'analogi', label: 'Analogi Santai', icon: Lightbulb, color: 'text-yellow-400', activeBg: 'bg-yellow-500/20', borderColor: 'border-yellow-500' },
    { id: 'misi', label: 'Misi 2D', icon: Target, color: 'text-green-400', activeBg: 'bg-green-500/20', borderColor: 'border-green-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm font-[Poppins]">
      {/* Modal Container */}
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1a1a2e] shadow-[0_0_20px_rgba(0,255,255,0.2)] animate-fadeIn overflow-hidden"
        style={{
          border: '4px solid #4a4e69',
          boxShadow: '8px 8px 0px rgba(0,0,0,0.6), inset -2px -2px 0px rgba(0,0,0,0.5), inset 2px 2px 0px rgba(255,255,255,0.1)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-[#0f0f23] to-[#16213e] border-b-4 border-[#4a4e69] gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#2a2a4a] border-2 border-[#00ffd0] text-xl sm:text-2xl shrink-0 shadow-[2px_2px_0px_#000]">
              🐹
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] sm:text-[10px] text-[#00ffd0] font-pixel px-2 py-0.5 bg-[#0f0f23] border border-[#00ffd0]">
                  LEVEL {String(level.id).padStart(2, '0')} • {level.category || 'GOLANG'}
                </span>
              </div>
              <h2 className="text-xs sm:text-base md:text-lg font-bold text-white font-pixel truncate">
                {level.title}
              </h2>
              {level.subtitle && (
                <p className="text-[11px] sm:text-xs text-cyan-300/80 truncate mt-0.5">
                  {level.subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-red-500/20 border-2 border-[#4a4e69] hover:border-red-500 transition-colors shrink-0"
            title="Tutup & Mulai Coding"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-2 sm:p-3 gap-1.5 sm:gap-2 bg-[#0f0f23] border-b-2 border-[#4a4e69]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.id);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 font-bold transition-all ${
                  isActive
                    ? `${tab.activeBg} ${tab.color} border-2 ${tab.borderColor} shadow-[2px_2px_0px_#000]`
                    : 'text-gray-400 hover:bg-[#1a1a2e] border-2 border-transparent'
                }`}
              >
                <Icon size={15} className="shrink-0" />
                <span className="font-pixel text-[8px] sm:text-[10px] tracking-wider truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-[#1a1a2e]">
          {activeTab === 'materi' && (
            <div className="space-y-5">
              {/* Dialogue Bubble */}
              <div className="bg-[#232342] p-4 border-2 border-cyan-400 relative shadow-[4px_4px_0px_rgba(0,212,255,0.2)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-pixel text-cyan-300 uppercase">
                    💬 Instruksi Mentor Gopher:
                  </span>
                </div>
                <p className="text-gray-100 text-xs sm:text-sm leading-relaxed">
                  {level.gopherQuote || level.story || level.materi?.penjelasan}
                </p>
              </div>

              {/* Concepts Grid */}
              {Array.isArray(level.concepts) && level.concepts.length > 0 && (
                <div>
                  <h3 className="text-[10px] sm:text-xs font-pixel text-purple-300 uppercase mb-3">
                    ★ Konsep Penting Level Ini:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {level.concepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="bg-[#12182f] p-3.5 border-l-4 border-l-[#00ffd0] border-2 border-[#3a3a5c] flex flex-col justify-between shadow-[3px_3px_0px_#0a0a16]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[9px] font-pixel px-2 py-0.5 bg-indigo-950 text-cyan-300 border border-cyan-500/40">
                              {concept.badge || `Konsep ${idx + 1}`}
                            </span>
                          </div>
                          <h4 className="font-mono font-bold text-sm text-[#ffd700] mb-1.5">
                            {concept.name}
                          </h4>
                          <p className="text-gray-300 text-xs leading-relaxed mb-3">
                            {concept.desc}
                          </p>
                        </div>
                        {concept.code && (
                          <div className="bg-[#080814] text-[#39ff14] font-mono text-[11px] p-2.5 border border-indigo-900 overflow-x-auto whitespace-pre">
                            <code>{concept.code}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Sample */}
              {codeToCopy && (
                <div className="bg-[#090915] border-2 border-indigo-800 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#121329] border-b-2 border-indigo-800">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Terminal size={15} />
                      <span className="text-[10px] font-pixel">contoh_referensi.go</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="text-xs text-gray-300 hover:text-cyan-300 flex items-center gap-1.5 px-2 py-1 bg-[#1a1a2e] border border-indigo-700"
                      title="Salin Contoh Kode"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-green-400" />
                          <span className="text-green-400 text-[10px] font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span className="text-[10px] font-bold">Salin Contoh</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-[#39ff14] font-mono text-xs sm:text-sm overflow-x-auto leading-6">
                    <code>{codeToCopy}</code>
                  </pre>
                </div>
              )}

              {/* Pro Tip */}
              {level.proTip && (
                <div className="bg-amber-950/40 border-2 border-amber-500 p-4 flex gap-3.5 shadow-[4px_4px_0px_rgba(234,179,8,0.2)]">
                  <Zap className="text-amber-400 flex-shrink-0 mt-0.5" size={22} />
                  <div>
                    <h4 className="text-amber-300 font-pixel text-[10px] mb-1.5">
                      💡 PRO TIP: {level.proTip.title}
                    </h4>
                    <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed">
                      {level.proTip.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analogi' && (
            <div className="space-y-5">
              <div className="bg-[#231915] p-5 sm:p-6 border-4 border-amber-500 shadow-[6px_6px_0px_rgba(217,119,6,0.25)]">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-2xl shrink-0">
                    {level.analogy?.icon || '💡'}
                  </div>
                  <div>
                    <span className="text-[9px] font-pixel text-amber-400 uppercase block mb-1">
                      Analogi Kehidupan Sehari-hari
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-amber-200">
                      {level.analogy?.headline || 'Memahami Logika Tanpa Pusing'}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#141010] p-4 border-2 border-amber-700/60 text-amber-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {level.analogy?.story || level.materi?.analogi}
                </div>

                {level.analogy?.takeaway && (
                  <div className="mt-4 bg-amber-900/40 p-3 border-2 border-amber-400/60 flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-300 shrink-0" />
                    <p className="text-xs sm:text-sm text-amber-200 font-bold">
                      Kesimpulan: {level.analogy.takeaway}
                    </p>
                  </div>
                )}
              </div>

              {level.story && (
                <div className="bg-[#12182f] p-4 border-2 border-indigo-700 shadow-[4px_4px_0px_#090915]">
                  <h4 className="text-[10px] font-pixel text-cyan-300 uppercase mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span>Situasi Fasilitas Cyber-Lab:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {level.story}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'misi' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-emerald-950 to-teal-950 border-4 border-[#39ff14] p-5 sm:p-6 shadow-[6px_6px_0px_rgba(57,255,20,0.2)]">
                <div className="flex items-center gap-3 mb-3">
                  <Target size={28} className="text-[#39ff14] shrink-0" />
                  <div>
                    <span className="text-[9px] font-pixel text-[#39ff14] uppercase block mb-1">
                      QUEST OBJECTIVE
                    </span>
                    <h3 className="text-white font-pixel text-xs sm:text-sm">
                      MISI PEMROGRAMAN KAMU
                    </h3>
                  </div>
                </div>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {activeMission.objective}
                </p>

                <div className="mt-4 bg-black/50 border-2 border-emerald-500/50 p-3 text-xs text-emerald-200">
                  ✨ <strong>Catatan Penting:</strong> Validasi jawaban bersifat <strong>fleksibel berbasis konsep</strong>! Kata-kata output tidak harus plek-ketiplek sama persis—selama konsep & struktur logika Go yang kamu tulis sudah benar, misimu otomatis berhasil!
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#12182f] p-4 border-2 border-[#4a4e69] shadow-[4px_4px_0px_#090915]">
                  <div className="text-[9px] font-pixel text-cyan-400 mb-2 uppercase">
                    ⚡ Target Simulasi 2D
                  </div>
                  <div className="text-gray-200 text-xs sm:text-sm font-semibold">
                    {activeMission.visualTarget || level.visualGoal || 'Aktifkan perangkat di kanvas 2D'}
                  </div>
                </div>

                <div className="bg-[#12182f] p-4 border-2 border-[#4a4e69] shadow-[4px_4px_0px_#090915]">
                  <div className="text-[9px] font-pixel text-amber-400 mb-2 uppercase">
                    📟 Contoh Target Output Terminal
                  </div>
                  <pre className="bg-[#080814] p-3 border border-amber-500/40 text-amber-300 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
                    {activeMission.expectedOutput || level.expectedOutput || 'Output sesuai instruksi'}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#0f0f23] border-t-4 border-[#4a4e69] flex items-center justify-between gap-3">
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Klik tombol <strong className="text-cyan-300">&quot;MATERI&quot;</strong> di atas kapan saja untuk membuka panduan ini lagi.
          </span>
          <button
            onClick={() => {
              playSound('start');
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-[#39ff14] hover:bg-green-400 text-[#0f0f23] font-pixel text-[10px] sm:text-xs shadow-[4px_4px_0px_#000] border-2 border-white active:translate-y-[2px] active:shadow-none transition flex items-center justify-center gap-2"
          >
            <Play size={15} className="fill-[#0f0f23]" />
            <span>MULAI CODING!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;
