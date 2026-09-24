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
    { id: 'materi', label: 'Materi Inti', icon: BookOpen, activeBg: 'bg-[#38bdf8]' },
    { id: 'analogi', label: 'Analogi Santai', icon: Lightbulb, activeBg: 'bg-[#fde047]' },
    { id: 'misi', label: 'Misi 2D', icon: Target, activeBg: 'bg-[#4ade80]' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-sm">
      {/* Modal Container - Bright Retro Pixel Card */}
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#fffef9] border-[4px] border-slate-900 shadow-[8px_8px_0px_#0f172a] animate-fadeIn overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-[#fef08a] border-b-[4px] border-slate-900 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white border-[3px] border-slate-900 text-xl sm:text-2xl shrink-0 shadow-[3px_3px_0px_#0f172a]">
              🐹
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8px] sm:text-[9px] text-slate-900 font-pixel px-2 py-0.5 bg-[#38bdf8] border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
                  LEVEL {String(level.id).padStart(2, '0')} • {level.category || 'GOLANG'}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 font-pixel truncate">
                {level.title}
              </h2>
              {level.subtitle && (
                <p className="text-xs sm:text-sm text-slate-700 font-bold truncate mt-0.5">
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
            className="p-1.5 sm:p-2 bg-white text-slate-900 hover:bg-rose-200 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none transition-colors shrink-0"
            title="Tutup & Mulai Coding"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-2 sm:p-3 gap-2 bg-[#f1f5f9] border-b-[3px] border-slate-900">
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
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 font-bold transition-all border-2 border-slate-900 ${
                  isActive
                    ? `${tab.activeBg} text-slate-950 shadow-[3px_3px_0px_#0f172a]`
                    : 'bg-white text-slate-700 hover:bg-amber-50'
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f4f1ea] space-y-5">
          {activeTab === 'materi' && (
            <div className="space-y-5">
              {/* Dialogue Bubble */}
              <div className="bg-[#e0f2fe] p-4 border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] font-pixel text-sky-900 uppercase">
                    💬 Instruksi Mentor Gopher:
                  </span>
                </div>
                <p className="text-slate-900 text-sm sm:text-base font-medium leading-relaxed">
                  {level.gopherQuote || level.story}
                </p>
              </div>

              {/* Concepts Grid */}
              {Array.isArray(level.concepts) && level.concepts.length > 0 && (
                <div>
                  <h3 className="text-[10px] sm:text-xs font-pixel text-slate-900 uppercase mb-3">
                    ★ Konsep Penting Level Ini:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {level.concepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3.5 border-[3px] border-slate-900 flex flex-col justify-between shadow-[4px_4px_0px_#0f172a]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[8px] font-pixel px-2 py-0.5 bg-[#fde047] text-slate-900 border-2 border-slate-900">
                              {concept.badge || `Konsep ${idx + 1}`}
                            </span>
                          </div>
                          <h4 className="font-mono font-bold text-lg text-sky-800 mb-1">
                            {concept.name}
                          </h4>
                          <p className="text-slate-800 text-sm leading-relaxed mb-3">
                            {concept.desc}
                          </p>
                        </div>
                        {concept.code && (
                          <div className="bg-[#fef9c3] text-slate-900 font-mono text-base p-2.5 border-2 border-slate-900 overflow-x-auto whitespace-pre">
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
                <div className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#bae6fd] border-b-[3px] border-slate-900">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Terminal size={15} />
                      <span className="text-[9px] font-pixel">contoh_referensi.go</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="text-xs text-slate-900 hover:bg-amber-200 flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]"
                      title="Salin Contoh Kode"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-700" />
                          <span className="text-emerald-800 text-[9px] font-pixel">TERSALIN!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span className="text-[9px] font-pixel">SALIN</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-[#fffef9] text-slate-900 font-mono text-lg overflow-x-auto leading-6">
                    <code>{codeToCopy}</code>
                  </pre>
                </div>
              )}

              {/* Pro Tip */}
              {level.proTip && (
                <div className="bg-[#fef9c3] border-[3px] border-slate-900 p-4 flex gap-3.5 shadow-[4px_4px_0px_#0f172a]">
                  <Zap className="text-amber-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h4 className="text-slate-900 font-pixel text-[9px] mb-1.5">
                      💡 PRO TIP: {level.proTip.title}
                    </h4>
                    <p className="text-slate-800 text-sm leading-relaxed font-medium">
                      {level.proTip.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analogi' && (
            <div className="space-y-5">
              <div className="bg-[#fef9c3] p-5 sm:p-6 border-[3px] border-slate-900 shadow-[6px_6px_0px_#0f172a]">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 bg-white border-2 border-slate-900 flex items-center justify-center text-2xl shrink-0 shadow-[2px_2px_0px_#0f172a]">
                    {level.analogy?.icon || '💡'}
                  </div>
                  <div>
                    <span className="text-[9px] font-pixel text-amber-800 uppercase block mb-1">
                      Analogi Kehidupan Sehari-hari
                    </span>
                    <h3 className="text-sm sm:text-base font-pixel text-slate-900">
                      {level.analogy?.headline || 'Memahami Logika Tanpa Pusing'}
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-4 border-2 border-slate-900 text-slate-900 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                  {level.analogy?.story}
                </div>

                {level.analogy?.takeaway && (
                  <div className="mt-4 bg-[#bbf7d0] p-3 border-2 border-slate-900 flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-900 shrink-0" />
                    <p className="text-sm text-slate-900 font-bold">
                      Kesimpulan: {level.analogy.takeaway}
                    </p>
                  </div>
                )}
              </div>

              {level.story && (
                <div className="bg-white p-4 border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                  <h4 className="text-[9px] font-pixel text-sky-800 uppercase mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-sky-600" />
                    <span>Situasi Petualangan:</span>
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {level.story}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'misi' && (
            <div className="space-y-5">
              <div className="bg-[#bbf7d0] border-[3px] border-slate-900 p-5 sm:p-6 shadow-[6px_6px_0px_#0f172a]">
                <div className="flex items-center gap-3 mb-3">
                  <Target size={28} className="text-slate-900 shrink-0" />
                  <div>
                    <span className="text-[9px] font-pixel text-emerald-900 uppercase block mb-1">
                      QUEST OBJECTIVE
                    </span>
                    <h3 className="text-slate-900 font-pixel text-xs sm:text-sm">
                      MISI PEMROGRAMAN KAMU
                    </h3>
                  </div>
                </div>
                <p className="text-slate-900 text-sm sm:text-base font-bold leading-relaxed whitespace-pre-line">
                  {activeMission.objective}
                </p>

                <div className="mt-4 bg-white border-2 border-slate-900 p-3 text-sm text-slate-900 shadow-[2px_2px_0px_#0f172a]">
                  ✨ <strong>Catatan Penting:</strong> Validasi jawaban bersifat <strong>fleksibel berbasis konsep</strong>! Kata-kata output tidak harus plek-ketiplek sama persis—selama konsep & struktur logika Go yang kamu tulis sudah benar, misimu otomatis berhasil!
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                  <div className="text-[9px] font-pixel text-sky-800 mb-2 uppercase">
                    ⚡ Target Simulasi 2D
                  </div>
                  <div className="text-slate-900 text-sm font-bold">
                    {activeMission.visualTarget || level.visualGoal || 'Aktifkan perangkat di kanvas 2D'}
                  </div>
                </div>

                <div className="bg-white p-4 border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                  <div className="text-[9px] font-pixel text-amber-800 mb-2 uppercase">
                    📟 Contoh Target Output Terminal
                  </div>
                  <pre className="bg-[#fef9c3] p-3 border-2 border-slate-900 text-slate-900 font-mono text-lg whitespace-pre-wrap overflow-x-auto">
                    {activeMission.expectedOutput || level.expectedOutput || 'Output sesuai instruksi'}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#fef08a] border-t-[4px] border-slate-900 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-800 font-bold hidden sm:inline">
            Klik tombol <strong>&quot;MATERI&quot;</strong> di atas kapan saja untuk membuka panduan ini lagi.
          </span>
          <button
            onClick={() => {
              playSound('start');
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-[#4ade80] hover:bg-emerald-400 text-slate-950 font-pixel text-[10px] sm:text-xs shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900 active:translate-y-[2px] active:shadow-none transition flex items-center justify-center gap-2"
          >
            <Play size={15} className="fill-slate-950" />
            <span>MULAI CODING!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;
