import React, { useState } from 'react';
import { BookOpen, Target, Sparkles, Check, ArrowRight, Lightbulb, Copy, Code2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function MaterialModal({ isOpen, onClose, level }) {
  const [activeTab, setActiveTab] = useState('materi'); // 'materi' | 'analogi' | 'misi'
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen || !level) return null;

  const handleStartGame = () => {
    soundEffects.playClick();
    onClose();
  };

  const handleCopyCode = () => {
    soundEffects.playClick();
    if (level.codeSample) {
      navigator.clipboard.writeText(level.codeSample);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Kategori badge styling
  const categoryBadgeColors = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    rose: 'bg-rose-100 text-rose-700 border-rose-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[94vh] sm:max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden text-slate-800">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-slate-50 via-sky-50 to-indigo-50 px-4 py-3.5 sm:px-6 sm:py-5 border-b border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-md shadow-sky-500/20 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
              🐹
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${categoryBadgeColors[level.categoryColor] || categoryBadgeColors.blue}`}>
                  Level {level.id.toString().padStart(2, '0')} • {level.category}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 hidden xs:inline">FASE MATERI</span>
              </div>
              <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 line-clamp-1">
                {level.title} <span className="text-sky-600 font-bold">— {level.subtitle}</span>
              </h2>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition font-bold text-sm"
            title="Tutup & Mulai Coding"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/80 px-3 sm:px-6 pt-2 sm:pt-3 flex space-x-1.5 sm:space-x-2 border-b border-slate-200/70 overflow-x-auto">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('materi');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center space-x-2 rounded-t-xl transition ${
              activeTab === 'materi'
                ? 'bg-white text-sky-600 shadow-sm border-t border-x border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Materi Inti</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('analogi');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center space-x-2 rounded-t-xl transition ${
              activeTab === 'analogi'
                ? 'bg-white text-amber-600 shadow-sm border-t border-x border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Analogi Keseharian</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('misi');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center space-x-2 rounded-t-xl transition ${
              activeTab === 'misi'
                ? 'bg-white text-emerald-600 shadow-sm border-t border-x border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-emerald-500" />
            <span>Misi Level Ini</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {activeTab === 'materi' && (
            <div className="space-y-6">
              {/* Mentor Gopher Dialogue Bubble */}
              <div className="bg-sky-50/80 border border-sky-200/70 rounded-2xl p-4 flex items-start space-x-3.5">
                <div className="text-2xl flex-shrink-0 mt-0.5">💬</div>
                <div>
                  <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1">
                    Instruksi Mas Gopher (Mentor)
                  </h4>
                  <p className="text-sm text-sky-950 leading-relaxed font-medium">
                    {level.gopherQuote}
                  </p>
                </div>
              </div>

              {/* Structured Concepts Cards Grid */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-sky-500" />
                  <span>Konsep Utama yang Perlu Kamu Tahu:</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {level.concepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-slate-100 text-slate-700 uppercase mb-2">
                          {concept.badge}
                        </span>
                        <h4 className="font-mono font-bold text-sm text-indigo-600 mb-2">
                          {concept.name}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {concept.desc}
                        </p>
                      </div>

                      {concept.code && (
                        <div className="bg-slate-900 text-emerald-400 font-mono text-[11px] p-2.5 rounded-xl overflow-x-auto">
                          <code>{concept.code}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Sample Box */}
              {level.codeSample && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200/70 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center space-x-2">
                      <span>📄</span>
                      <span>Contoh Kode Lengkap Golang</span>
                    </span>

                    <button
                      onClick={handleCopyCode}
                      className="text-xs font-semibold text-slate-600 hover:text-sky-600 flex items-center space-x-1 transition"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Contoh</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto leading-6">
                    <code>{level.codeSample}</code>
                  </pre>
                </div>
              )}

              {/* Pro Tip Card */}
              {level.proTip && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3.5">
                  <div className="text-2xl flex-shrink-0 mt-0.5">💡</div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      {level.proTip.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {level.proTip.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analogi' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl">
                    {level.analogy.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                      Konsep Santai Tanpa Rumit
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-amber-950">
                      {level.analogy.headline}
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {level.analogy.story}
                </div>

                <div className="mt-4 bg-amber-100/60 p-4 rounded-xl border border-amber-300/60 flex items-center space-x-3">
                  <Check className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-amber-900 font-bold">
                    Poin Penting: {level.analogy.takeaway}
                  </p>
                </div>
              </div>

              {/* Latar Belakang Cerita Game */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>Konteks Situasi Fasilitas Game:</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {level.story}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'misi' && (
            <div className="space-y-6">
              {/* Mission Hero Banner */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-emerald-500/15">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
                    🎯
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-100 font-bold block">
                      Target Tantangan 2D
                    </span>
                    <h3 className="text-xl font-black tracking-wide">
                      Misi Pemrograman Kamu
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-medium text-emerald-50 leading-relaxed mt-2">
                  {level.mission.objective}
                </p>

                {level.mission.targetText && (
                  <div className="mt-4 bg-emerald-950/40 border border-white/20 p-3.5 rounded-2xl">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-mono block mb-1">
                      Teks Spesifik yang Harus Muncul:
                    </span>
                    <code className="text-sm sm:text-base font-mono font-bold text-emerald-300">
                      {level.mission.targetText}
                    </code>
                  </div>
                )}
              </div>

              {/* Dua Kartu Syarat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Visual Target Canvas 2D
                  </span>
                  <div className="text-sm font-bold text-slate-800 flex items-center space-x-2 mt-2">
                    <span className="text-xl">⚡</span>
                    <span>{level.mission.visualTarget}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Output Terminal
                  </span>
                  <pre className="mt-2 bg-slate-900 text-amber-300 font-mono text-xs p-3 rounded-xl overflow-x-auto">
                    {level.expectedOutput}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-white px-6 py-4 border-t border-slate-200/80 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            Kamu selalu bisa membuka panduan ini lewat tombol <strong className="text-slate-800">&quot;Buku Materi&quot;</strong> di navbar.
          </div>

          <button
            onClick={handleStartGame}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm tracking-wide flex items-center justify-center space-x-2.5 shadow-lg shadow-sky-500/25 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <span>SAYA PAHAM, LANJUT CODING!</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
}
