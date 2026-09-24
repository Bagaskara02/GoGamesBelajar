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
  const [activeTab, setActiveTab] = useState('console');

  const diagObj = typeof diagnostics === 'object' && diagnostics !== null
    ? diagnostics
    : diagnostics
    ? { message: String(diagnostics), cause: String(diagnostics), hint: '' }
    : null;

  return (
    <div className="flex flex-col h-full bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] overflow-hidden text-xs text-slate-900">
      {/* Terminal Title Bar - Bright Pixel Style */}
      <div className="bg-[#e0f2fe] px-3 sm:px-4 py-2 border-b-[3px] border-slate-900 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap gap-y-1">
          <div className="flex items-center space-x-1.5">
            <Terminal className="w-4 h-4 text-slate-900 shrink-0" />
            <span className="text-slate-900 font-pixel" style={{ fontSize: '0.52rem' }}>
              TERMINAL
            </span>
          </div>

          <div className="flex space-x-1.5">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-2.5 py-1 border-2 border-slate-900 transition-all font-pixel ${
                activeTab === 'console'
                  ? 'bg-[#fde047] text-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
              style={{ fontSize: '0.45rem' }}
            >
              OUTPUT
            </button>
            <button
              onClick={() => setActiveTab('expected')}
              className={`px-2.5 py-1 border-2 border-slate-900 transition-all font-pixel ${
                activeTab === 'expected'
                  ? 'bg-[#fde047] text-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
              style={{ fontSize: '0.45rem' }}
            >
              TARGET
            </button>
          </div>
        </div>

        <button
          onClick={onClear}
          title="Bersihkan Layar Terminal"
          className="p-1.5 bg-white hover:bg-rose-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Content Area - Bright Cream Retro */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#fffef9]">
        {/* Command Line Prompt */}
        <div className="flex items-center space-x-2 text-slate-900 bg-slate-100 px-3 py-1.5 border-2 border-slate-900 font-mono text-base">
          <span className="font-bold text-emerald-700">$</span>
          <span className="font-bold">go run main.go</span>
          <span className="inline-block w-2.5 h-4 bg-slate-900 animate-pulse ml-1"></span>
        </div>

        {activeTab === 'console' ? (
          <>
            {isExecuting && (
              <div className="text-sky-800 bg-sky-100 border-2 border-slate-900 p-2 font-mono text-base animate-pulse">
                [mengompilasi dan memeriksa konsep kode...]
              </div>
            )}

            {/* Specific Error & Line-Level Diagnostic Box */}
            {error && (
              <div className="bg-rose-50 border-[3px] border-slate-900 p-3.5 space-y-3 shadow-[4px_4px_0px_#0f172a]">
                <div className="flex items-start justify-between gap-2 border-b-2 border-slate-900 pb-2">
                  <div className="flex items-start space-x-2 text-rose-900 font-bold">
                    <span className="text-base leading-none mt-0.5">⚠️</span>
                    <span className="text-sm font-bold">{error}</span>
                  </div>
                  {diagObj?.line && (
                    <span
                      className="px-2 py-1 bg-rose-500 text-white border-2 border-slate-900 shrink-0 font-pixel"
                      style={{ fontSize: '0.45rem' }}
                    >
                      BARIS {diagObj.line}
                    </span>
                  )}
                </div>

                {/* Code Snippet at Fault */}
                {diagObj?.codeSnippet && (
                  <div className="bg-white border-2 border-slate-900 p-2.5 font-mono text-base text-rose-900 overflow-x-auto">
                    <div className="text-xs text-slate-600 mb-1 flex items-center space-x-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-rose-600" />
                      <span>Lokasi kode yang perlu diperiksa (Baris ke-{diagObj.line}):</span>
                    </div>
                    <code>
                      <span className="text-rose-600 font-bold select-none mr-2">{diagObj.line} |</span>
                      {diagObj.codeSnippet}
                    </code>
                  </div>
                )}

                {/* Specific Cause & Spoiler-Free Hint */}
                {diagObj && (
                  <div className="bg-[#fef9c3] p-3 border-2 border-slate-900 text-slate-900 space-y-2">
                    {(diagObj.cause || diagObj.message) && (
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-900 block mb-0.5 font-pixel" style={{ fontSize: '0.45rem' }}>
                            APA YANG MEMBUAT ERROR:
                          </strong>
                          <p className="text-slate-900 leading-relaxed text-sm font-medium">
                            {diagObj.cause || diagObj.message}
                          </p>
                        </div>
                      </div>
                    )}

                    {diagObj.hint && (
                      <div className="flex items-start space-x-2 pt-2 border-t-2 border-slate-900/20">
                        <Wrench className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sky-900 block mb-0.5 font-pixel" style={{ fontSize: '0.45rem' }}>
                            PETUNJUK PERBAIKAN:
                          </strong>
                          <p className="text-slate-900 leading-relaxed text-sm font-medium">
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
              <div className="bg-[#f0fdf4] p-3.5 border-2 border-slate-900 text-slate-900 shadow-[3px_3px_0px_#0f172a] font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            )}

            {/* Success Notification */}
            {isSuccess && !error && (
              <div className="bg-[#bbf7d0] border-[3px] border-slate-900 p-3.5 flex items-start space-x-3 shadow-[4px_4px_0px_#0f172a]">
                <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 mb-1 font-pixel" style={{ fontSize: '0.5rem' }}>
                    ★ QUEST CLEAR! KONSEP TEPAT!
                  </strong>
                  <p className="text-slate-900 text-sm font-semibold">
                    {diagObj?.message || 'Kompilasi sukses! Konsep & logika Golang kamu berjalan dengan sangat baik. +150 EXP!'}
                  </p>
                </div>
              </div>
            )}

            {!output && !error && !isExecuting && (
              <div className="text-slate-500 py-2 text-xs sm:text-sm font-mono">
                // Menunggu instruksi... Ketik kodemu lalu tekan tombol JALANKAN.
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <div className="bg-[#e0f2fe] border-2 border-slate-900 p-2.5 text-slate-900 text-sm leading-relaxed shadow-[2px_2px_0px_#0f172a]">
              ✨ <strong>Validasi Pintar Berbasis Konsep:</strong> Teks tidak harus plek-ketiplek 100% sama persis! Selama konsep & struktur logika Go yang kamu tulis benar, jawabanmu tetap dinilai <strong>BENAR</strong>.
            </div>
            <div className="text-slate-900 flex items-center space-x-2 text-xs font-extrabold uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Contoh Target Output Misi Ini:</span>
            </div>
            <pre className="bg-[#fef9c3] p-3.5 border-[3px] border-slate-900 text-slate-900 font-mono text-xs sm:text-sm whitespace-pre-wrap shadow-[3px_3px_0px_#0f172a] leading-relaxed">
              {expectedOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
