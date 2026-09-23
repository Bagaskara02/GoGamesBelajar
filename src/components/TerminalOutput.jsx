import React, { useState } from 'react';
import { Terminal, CheckCircle2, AlertTriangle, XCircle, Trash2, HelpCircle } from 'lucide-react';

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

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl border border-slate-700/80 shadow-md overflow-hidden text-xs text-slate-200">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-sky-400" />
          <div className="flex space-x-1.5">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                activeTab === 'console'
                  ? 'bg-slate-800 text-sky-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Output Eksekusi
            </button>
            <button
              onClick={() => setActiveTab('expected')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                activeTab === 'expected'
                  ? 'bg-slate-800 text-amber-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Target Yang Diharapkan
            </button>
          </div>
        </div>

        <button
          onClick={onClear}
          title="Bersihkan Layar Terminal"
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {/* Command Line Prompt */}
        <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
          <span className="text-emerald-400 font-bold">$</span>
          <span>go run main.go</span>
          {isExecuting && (
            <span className="inline-block w-2 h-4 bg-sky-400 animate-pulse ml-1"></span>
          )}
        </div>

        {activeTab === 'console' ? (
          <>
            {isExecuting && (
              <div className="text-sky-300 animate-pulse flex items-center space-x-2 py-1 font-mono text-[11px]">
                <span>[mengompilasi dan mengeksekusi binary...]</span>
              </div>
            )}

            {/* Diagnostic Error Box (Menggunakan Font Poppins) */}
            {error && (
              <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-start space-x-2.5 text-rose-300 font-bold text-xs sm:text-sm">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
                {diagnostics && (
                  <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-500/20 text-rose-100 text-xs leading-relaxed flex items-start space-x-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-bold block mb-0.5">Petunjuk Mas Gopher:</strong>
                      <p className="text-slate-200">{diagnostics}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Standard Output (stdout) */}
            {output && (
              <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            )}

            {/* Success Notification */}
            {isSuccess && !error && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-start space-x-3 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-300 font-bold text-xs sm:text-sm mb-0.5">
                    ✓ Program Berhasil Dikompilasi & Dieksekusi!
                  </strong>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    Instruksi logika Go kamu tepat. Sistem hardware 2D telah merespons dan kembali stabil!
                  </p>
                </div>
              </div>
            )}

            {!output && !error && !isExecuting && (
              <div className="text-slate-500 italic py-2 text-xs">
                Ketik kode di sebelah kanan lalu klik tombol &quot;Jalankan Kode&quot;...
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2">
            <div className="text-slate-400 text-xs flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Output terminal kamu harus persis memunculkan teks ini:</span>
            </div>
            <pre className="bg-slate-950 p-3.5 rounded-2xl border border-amber-500/30 text-amber-300 font-mono text-xs whitespace-pre-wrap">
              {expectedOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
