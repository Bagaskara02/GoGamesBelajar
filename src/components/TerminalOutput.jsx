import React, { useState } from 'react';
import { Terminal, CheckCircle2, AlertTriangle, Trash2, HelpCircle, MapPin, Wrench } from 'lucide-react';

export default function TerminalOutput({
  output,
  error,
  diagnostics,
  expectedOutput,
  isSuccess,
  isExecuting,
  onClear
}) {
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'expected'

  // Support both object diagnostics ({ line, codeSnippet, cause, message, hint }) and string diagnostics
  const diagObj = typeof diagnostics === 'object' && diagnostics !== null
    ? diagnostics
    : diagnostics
    ? { message: String(diagnostics), cause: String(diagnostics), hint: '' }
    : null;

  return (
    <div className="flex flex-col h-full bg-[#0f0f23] border-4 border-indigo-900 overflow-hidden text-xs text-slate-200 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Terminal Title Bar */}
      <div className="bg-[#1a1a2e] px-3 sm:px-4 py-2 border-b-4 border-indigo-900 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-y-1">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-cyan-400 uppercase tracking-widest" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem' }}>
              TERMINAL
            </span>
          </div>

          <div className="flex space-x-1.5 sm:space-x-2">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-2.5 py-1.5 border-2 transition-all uppercase tracking-wider ${
                activeTab === 'console'
                  ? 'bg-cyan-900/50 text-cyan-300 border-cyan-500 shadow-[2px_2px_0px_0px_#06b6d4]'
                  : 'bg-[#0f0f23] text-indigo-400 border-indigo-800 hover:text-cyan-200 hover:border-cyan-800'
              }`}
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}
            >
              Output
            </button>
            <button
              onClick={() => setActiveTab('expected')}
              className={`px-2.5 py-1.5 border-2 transition-all uppercase tracking-wider ${
                activeTab === 'expected'
                  ? 'bg-amber-900/50 text-amber-300 border-amber-500 shadow-[2px_2px_0px_0px_#f59e0b]'
                  : 'bg-[#0f0f23] text-indigo-400 border-indigo-800 hover:text-amber-200 hover:border-amber-800'
              }`}
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}
            >
              Target
            </button>
          </div>
        </div>

        <button
          onClick={onClear}
          title="Bersihkan Layar Terminal"
          className="p-1.5 bg-[#0f0f23] hover:bg-red-900 text-indigo-400 hover:text-red-200 border-2 border-indigo-800 hover:border-red-500 transition-all shadow-[2px_2px_0px_0px_#3730a3] hover:shadow-[2px_2px_0px_0px_#ef4444]"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Content Area */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 custom-scrollbar bg-[#050510]">
        {/* Command Line Prompt */}
        <div className="flex items-center space-x-2 text-green-400" style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.82rem' }}>
          <span className="font-bold">$</span>
          <span>go run main.go</span>
          {isExecuting && (
            <span className="inline-block w-2.5 h-4 bg-green-400 animate-pulse ml-1"></span>
          )}
          {!isExecuting && activeTab === 'console' && (
            <span className="inline-block w-2.5 h-4 bg-green-400 animate-pulse ml-1 opacity-70"></span>
          )}
        </div>

        {activeTab === 'console' ? (
          <>
            {isExecuting && (
              <div className="text-cyan-400 animate-pulse flex items-center space-x-2 py-1" style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem' }}>
                <span>[mengompilasi dan memeriksa konsep kode...]</span>
              </div>
            )}

            {/* Detailed Specific Error & Line-Level Diagnostic Box */}
            {error && (
              <div className="bg-red-950/85 border-4 border-red-600 p-3.5 sm:p-4 space-y-3 shadow-[4px_4px_0px_0px_#450a0a]">
                <div className="flex items-start justify-between gap-2 border-b-2 border-red-800/80 pb-2.5">
                  <div className="flex items-start space-x-2.5 text-red-200 font-bold">
                    <span className="text-base leading-none mt-0.5">💀</span>
                    <span className="text-xs sm:text-sm font-bold text-red-300">{error}</span>
                  </div>
                  {diagObj?.line && (
                    <span
                      className="px-2 py-1 bg-red-600 text-white font-bold shrink-0 border border-red-300"
                      style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}
                    >
                      BARIS {diagObj.line}
                    </span>
                  )}
                </div>

                {/* Code Snippet at Fault */}
                {diagObj?.codeSnippet && (
                  <div className="bg-[#090915] border-2 border-red-500/60 p-2.5 font-mono text-xs text-red-300 overflow-x-auto">
                    <div className="text-[10px] text-red-400/80 mb-1 flex items-center space-x-1 font-sans font-semibold">
                      <MapPin className="w-3 h-3 text-red-400" />
                      <span>Lokasi kode yang perlu diperiksa (Baris ke-{diagObj.line}):</span>
                    </div>
                    <code>
                      <span className="text-red-500 select-none mr-2">{diagObj.line} |</span>
                      {diagObj.codeSnippet}
                    </code>
                  </div>
                )}

                {/* Specific Cause & Spoiler-Free Hint */}
                {diagObj && (
                  <div className="bg-[#2d1b00] p-3 border-2 border-amber-500 text-amber-100 space-y-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    {(diagObj.cause || diagObj.message) && (
                      <div className="flex items-start space-x-2.5">
                        <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-400 block mb-0.5 uppercase tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}>
                            Apa yang Membuat Error:
                          </strong>
                          <p className="text-amber-100/95 leading-relaxed text-xs sm:text-sm">
                            {diagObj.cause || diagObj.message}
                          </p>
                        </div>
                      </div>
                    )}

                    {diagObj.hint && (
                      <div className="flex items-start space-x-2.5 pt-2 border-t border-amber-700/60">
                        <Wrench className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-cyan-300 block mb-0.5 uppercase tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}>
                            Petunjuk Perbaikan:
                          </strong>
                          <p className="text-cyan-100/95 leading-relaxed text-xs sm:text-sm">
                            {diagObj.hint}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Standard Output (stdout) */}
            {output && (
              <div className="bg-[#0f0f23] p-3.5 border-2 border-indigo-900 text-green-400 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.82rem' }}>
                {output}
              </div>
            )}

            {/* Success Notification */}
            {isSuccess && !error && (
              <div className="bg-green-950/80 border-4 border-green-500 p-3.5 sm:p-4 flex items-start space-x-3 shadow-[4px_4px_0px_0px_#052e16]">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-green-300 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.52rem', lineHeight: '1.4' }}>
                    ★ QUEST CLEAR! KONSEP TEPAT!
                  </strong>
                  <p className="text-green-200/95 text-xs sm:text-sm leading-relaxed">
                    {diagObj?.message || 'Kompilasi sukses! Konsep & logika Golang kamu berjalan dengan sangat baik. +150 EXP!'}
                  </p>
                </div>
              </div>
            )}

            {!output && !error && !isExecuting && (
              <div className="text-indigo-400/70 italic py-2 text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
                // Menunggu instruksi... Ketik kodemu lalu tekan tombol RUN / JALANKAN.
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <div className="bg-cyan-950/40 border-2 border-cyan-500/50 p-2.5 text-cyan-200 text-xs leading-relaxed">
              ✨ <strong>Validasi Pintar Berbasis Konsep:</strong> Teks tidak harus plek-ketiplek 100% sama persis! Selama konsep & struktur logika Go yang kamu tulis benar, jawabanmu tetap dinilai <strong>BENAR</strong>.
            </div>
            <div className="text-amber-400 text-xs flex items-center space-x-2 font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}>Contoh Target Output Misi Ini:</span>
            </div>
            <pre className="bg-[#2d1b00] p-4 border-4 border-amber-600 text-amber-300 whitespace-pre-wrap shadow-[4px_4px_0px_0px_#451a03]" style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>
              {expectedOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
