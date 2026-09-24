import React, { useState, useEffect } from 'react';
import { Play, Copy, Check, Lightbulb, BookOpen, Target, Terminal, X, Zap, Sparkles, GraduationCap, AlertCircle } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import { LEVEL_DEEP_KNOWLEDGE } from '../utils/deepKnowledgeData';
import { getMissionContext } from '../utils/missionCaseStudy';

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
  const deepInfo = LEVEL_DEEP_KNOWLEDGE[level.id] || LEVEL_DEEP_KNOWLEDGE[1];
  const activeMission = mission || level.mission || {};
  const missionCtx = getMissionContext(level, activeMission);

  const handleCopyCode = () => {
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs = [
    { id: 'materi', label: 'Materi & Dasar Go', icon: BookOpen, activeBg: 'bg-[#38bdf8]' },
    { id: 'analogi', label: 'Analogi Santai', icon: Lightbulb, activeBg: 'bg-[#fde047]' },
    { id: 'misi', label: 'Studi Kasus & Misi', icon: Target, activeBg: 'bg-[#4ade80]' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/55 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#fffef9] border-[4px] border-slate-900 shadow-[8px_8px_0px_#0f172a] animate-fadeIn overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-[#fef08a] border-b-[4px] border-slate-900 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-white border-[3px] border-slate-900 text-lg sm:text-2xl shrink-0 shadow-[2px_2px_0px_#0f172a]">
              🐹
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[8px] sm:text-[9px] text-slate-900 font-pixel px-2 py-0.5 bg-[#38bdf8] border-2 border-slate-900">
                  LEVEL {String(level.id).padStart(2, '0')} • {level.category || 'GOLANG'}
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 truncate">
                {level.title}
              </h2>
              {level.subtitle && (
                <p className="text-xs text-slate-700 font-semibold truncate">
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
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-2 sm:p-2.5 gap-1.5 sm:gap-2 bg-[#f1f5f9] border-b-[3px] border-slate-900">
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
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 font-bold transition-all border-2 border-slate-900 ${
                  isActive
                    ? `${tab.activeBg} text-slate-950 shadow-[2px_2px_0px_#0f172a]`
                    : 'bg-white text-slate-700 hover:bg-amber-50'
                }`}
              >
                <Icon size={15} className="shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold tracking-wide truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 bg-[#f4f1ea] space-y-5">
          {activeTab === 'materi' && (
            <div className="space-y-5">
              {/* 1. Dialogue Bubble Mentor */}
              <div className="bg-[#e0f2fe] p-3.5 sm:p-4 border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold text-sky-900 uppercase">
                    💬 Pengantar Mentor Gopher:
                  </span>
                </div>
                <p className="text-slate-900 text-xs sm:text-sm font-medium leading-relaxed">
                  {level.gopherQuote || level.story}
                </p>
              </div>

              {/* 2. PENGETAHUAN DASAR & MATERI UMUM MENDALAM (Bukan Hanya Soal Misi!) */}
              {deepInfo && (
                <div className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] overflow-hidden">
                  <div className="bg-[#c084fc] px-4 py-2.5 border-b-[3px] border-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-slate-950 shrink-0" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wide">
                      📚 {deepInfo.topicTitle}
                    </h3>
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium bg-purple-50 border-2 border-slate-900 p-3">
                      {deepInfo.overview}
                    </p>

                    {/* Sub-topik Penjelasan Mendalam */}
                    <div className="space-y-3.5">
                      {deepInfo.sections.map((sec, idx) => (
                        <div key={idx} className="bg-[#fffef9] border-2 border-slate-900 p-3.5 shadow-[2px_2px_0px_#0f172a]">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1.5">
                            {sec.title}
                          </h4>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line mb-2.5">
                            {sec.explanation}
                          </p>
                          {sec.code && (
                            <pre className="bg-[#fef9c3] border-2 border-slate-900 p-2.5 font-mono text-xs text-slate-900 overflow-x-auto leading-relaxed">
                              <code>{sec.code}</code>
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Tabel Cheat Sheet Sintaks Dasar */}
                    {deepInfo.cheatSheet && (
                      <div className="border-2 border-slate-900 overflow-hidden">
                        <div className="bg-[#fde047] px-3 py-1.5 border-b-2 border-slate-900 font-extrabold text-xs text-slate-900">
                          📌 Ringkasan Sintaks Dasar (Cheat Sheet Level {level.id})
                        </div>
                        <div className="divide-y-2 divide-slate-900 bg-white">
                          {deepInfo.cheatSheet.map((row, idx) => (
                            <div key={idx} className="p-2.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
                              <code className="bg-sky-100 border border-slate-900 px-2 py-0.5 font-mono font-bold text-slate-900 shrink-0 w-fit">
                                {row.syntax}
                              </code>
                              <span className="text-slate-700 font-medium">{row.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Kesalahan Umum yang Wajib Dihindari */}
                    {deepInfo.commonMistakes && (
                      <div className="bg-rose-50 border-2 border-slate-900 p-3">
                        <div className="flex items-center gap-1.5 text-rose-900 font-extrabold text-xs mb-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>Kesalahan Umum Pemula di Topik Ini:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs text-slate-800 font-medium">
                          {deepInfo.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Poin Inti Level Ini */}
              {Array.isArray(level.concepts) && level.concepts.length > 0 && (
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase mb-2.5">
                    ★ Ringkasan 3 Pilar Utama Level Ini:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {level.concepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3.5 border-[3px] border-slate-900 flex flex-col justify-between shadow-[3px_3px_0px_#0f172a]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#fde047] text-slate-900 border-2 border-slate-900">
                              {concept.badge || `Pilar ${idx + 1}`}
                            </span>
                          </div>
                          <h4 className="font-mono font-bold text-sm text-sky-800 mb-1">
                            {concept.name}
                          </h4>
                          <p className="text-slate-800 text-xs leading-relaxed mb-2.5">
                            {concept.desc}
                          </p>
                        </div>
                        {concept.code && (
                          <div className="bg-[#fef9c3] text-slate-900 font-mono text-xs p-2 border-2 border-slate-900 whitespace-pre-wrap break-words leading-relaxed">
                            <code>{concept.code}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Contoh Kode Utuh */}
              {codeToCopy && (
                <div className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#bae6fd] border-b-[3px] border-slate-900">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Terminal size={15} />
                      <span className="text-xs font-mono font-bold">contoh_referensi.go</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="text-xs text-slate-900 hover:bg-amber-200 flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] font-bold"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-700" />
                          <span className="text-emerald-800 text-xs">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span className="text-xs">Salin Contoh</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 bg-[#fffef9] text-slate-900 font-mono text-xs sm:text-sm overflow-x-auto leading-6">
                    <code>{codeToCopy}</code>
                  </pre>
                </div>
              )}

              {/* 5. Pro Tip */}
              {level.proTip && (
                <div className="bg-[#fef9c3] border-[3px] border-slate-900 p-3.5 flex gap-3 shadow-[4px_4px_0px_#0f172a]">
                  <Zap className="text-amber-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm mb-1">
                      💡 PRO TIP: {level.proTip.title}
                    </h4>
                    <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
                      {level.proTip.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analogi' && (
            <div className="space-y-5">
              <div className="bg-[#fef9c3] p-4 sm:p-6 border-[3px] border-slate-900 shadow-[6px_6px_0px_#0f172a]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-white border-2 border-slate-900 flex items-center justify-center text-2xl shrink-0 shadow-[2px_2px_0px_#0f172a]">
                    {level.analogy?.icon || '💡'}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-amber-800 uppercase block">
                      Analogi Kehidupan Sehari-hari
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {level.analogy?.headline || 'Memahami Logika Tanpa Pusing'}
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-4 border-2 border-slate-900 text-slate-900 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                  {level.analogy?.story}
                </div>

                {level.analogy?.takeaway && (
                  <div className="mt-4 bg-[#bbf7d0] p-3 border-2 border-slate-900 flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-900 shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-900 font-bold">
                      Kesimpulan: {level.analogy.takeaway}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'misi' && (
            <div className="space-y-4">
              {/* Kotak Studi Kasus Kontekstual yang Sesuai dengan Game 2D */}
              <div className="bg-[#fef9c3] border-[3px] border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_#0f172a]">
                <div className="inline-block bg-[#fde047] border-2 border-slate-900 px-2.5 py-0.5 text-xs font-extrabold text-slate-900 mb-2">
                  {missionCtx.badge}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5">
                  {missionCtx.caseStudyTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {missionCtx.caseStudyStory}
                </p>
              </div>

              {/* Instruksi Teknis Misi */}
              <div className="bg-[#bbf7d0] border-[3px] border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_#0f172a]">
                <div className="flex items-center gap-2.5 mb-2">
                  <Target size={22} className="text-slate-900 shrink-0" />
                  <h4 className="text-slate-900 font-extrabold text-sm sm:text-base">
                    Instruksi Penyelesaian Misi:
                  </h4>
                </div>
                <p className="text-slate-900 text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line bg-white p-3.5 border-2 border-slate-900">
                  {activeMission.objective}
                </p>

                <div className="mt-3 bg-white border-2 border-slate-900 p-2.5 text-xs text-slate-900">
                  ✨ <strong>Validasi Fleksibel Berbasis Konsep:</strong> Kata-kata output tidak harus plek-ketiplek sama persis—selama konsep & struktur logika Go kamu benar, misimu otomatis berhasil!
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-white p-3.5 border-[3px] border-slate-900 shadow-[3px_3px_0px_#0f172a]">
                  <div className="text-xs font-extrabold text-sky-800 mb-1.5 uppercase">
                    🎮 Simulasi Visual Game 2D
                  </div>
                  <div className="text-slate-900 text-xs sm:text-sm font-bold">
                    {activeMission.visualTarget || missionCtx.visualDesc}
                  </div>
                </div>

                <div className="bg-white p-3.5 border-[3px] border-slate-900 shadow-[3px_3px_0px_#0f172a]">
                  <div className="text-xs font-extrabold text-amber-800 mb-1.5 uppercase">
                    📟 Contoh Target Output Terminal
                  </div>
                  <pre className="bg-[#fef9c3] p-2.5 border-2 border-slate-900 text-slate-900 font-mono text-xs whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {activeMission.expectedOutput || level.expectedOutput}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#fef08a] border-t-[4px] border-slate-900 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-800 font-bold hidden sm:inline">
            Klik tombol <strong>&quot;MATERI&quot;</strong> di atas kapan saja untuk membaca panduan ini lagi.
          </span>
          <button
            onClick={() => {
              playSound('start');
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#4ade80] hover:bg-emerald-400 text-slate-950 font-pixel text-[9px] sm:text-[10px] shadow-[3px_3px_0px_#0f172a] border-[3px] border-slate-900 active:translate-y-[2px] active:shadow-none transition flex items-center justify-center gap-2"
          >
            <Play size={14} className="fill-slate-950" />
            <span>MULAI CODING!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;
