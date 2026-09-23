import React, { useState, useRef } from 'react';
import { RotateCcw, HelpCircle, Copy, Check, Play, Sparkles, FileCode } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const QUICK_SNIPPETS = [
  { label: ':=', insert: ' := ' },
  { label: 'fmt.Println()', insert: 'fmt.Println()' },
  { label: '""', insert: '""' },
  { label: '()', insert: '()' },
  { label: '{ }', insert: '{\n    \n}' },
  { label: 'func ', insert: 'func ' },
  { label: 'var ', insert: 'var ' },
  { label: 'return ', insert: 'return ' },
  { label: 'err != nil', insert: 'err != nil' },
  { label: 'go func()', insert: 'go func() {\n    \n}()' }
];

export default function CodeEditor({
  code,
  onChange,
  onRun,
  onReset,
  hint,
  isExecuting,
  isSuccess,
  hasError = false,
  onViewTerminal
}) {
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const lines = (code || '').split('\n');
  const lineCount = Math.max(lines.length, 12);

  // Tab indenting 4 spaces & Ctrl+Enter to run
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopy = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertSnippet = (snippet) => {
    soundEffects.playClick();
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(code + snippet);
      return;
    }
    const start = textarea.selectionStart ?? code.length;
    const end = textarea.selectionEnd ?? code.length;
    const newCode = code.substring(0, start) + snippet + code.substring(end);
    onChange(newCode);

    setTimeout(() => {
      textarea.focus();
      let newCursorPos = start + snippet.length;
      if (snippet === '""' || snippet === '()') {
        newCursorPos = start + 1;
      } else if (snippet === 'fmt.Println()') {
        newCursorPos = start + 12;
      }
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }, 10);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl border border-slate-700/80 shadow-lg overflow-hidden text-slate-100">
      {/* macOS IDE Window Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Traffic Lights */}
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm"></span>
          </div>

          {/* Active File Tab */}
          <div className="flex items-center space-x-2 bg-slate-800/90 px-3.5 py-1 rounded-xl text-xs font-mono text-sky-300 border border-slate-700">
            <span>🐹</span>
            <span className="font-bold">main.go</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 hidden xl:inline">
            (Tekan Ctrl + Enter untuk menjalankan)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Hint Button */}
          {hint && (
            <button
              onClick={() => {
                soundEffects.playClick();
                setShowHint(!showHint);
              }}
              title="Petunjuk Misi"
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition ${
                showHint
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-amber-400'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Petunjuk</span>
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Salin Kode"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-300 border border-slate-700 rounded-xl text-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onReset();
            }}
            title="Kembalikan ke Kode Awal"
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Run Code Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onRun();
            }}
            disabled={isExecuting}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-black tracking-wider flex items-center space-x-2 transition-all transform active:scale-95 shadow-md ${
              isExecuting
                ? 'bg-sky-900 text-sky-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isExecuting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>MENGEKSEKUSI...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>JALANKAN KODE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hint Alert Drawer */}
      {showHint && hint && (
        <div className="bg-amber-950/50 border-b border-amber-500/40 px-4 py-2.5 sm:px-5 sm:py-3 flex items-start space-x-3 text-xs text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="text-amber-300 block mb-0.5 font-bold">Bocoran Petunjuk:</strong>
            <p className="leading-relaxed font-sans">{hint}</p>
          </div>
        </div>
      )}

      {/* Error Quick Alert Banner (if error occurred during last run) */}
      {hasError && onViewTerminal && (
        <div className="bg-rose-950/80 border-b border-rose-500/50 px-3.5 py-2 flex items-center justify-between text-xs text-rose-200 animate-fadeIn">
          <div className="flex items-center space-x-2 truncate">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping flex-shrink-0"></span>
            <span className="font-semibold truncate">Program belum tepat atau ada error sintaks</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onViewTerminal();
            }}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-rose-500/30 hover:bg-rose-500/50 border border-rose-400/40 text-white font-bold text-[11px] transition flex-shrink-0 ml-2"
          >
            <span>Lihat Solusi di Terminal</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Golang Virtual Quick-Bar for Mobile & Fast Coding */}
      <div className="bg-slate-950/95 px-3 py-1.5 border-b border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-500 font-sans font-bold flex-shrink-0 mr-1 hidden sm:inline">
          Karakter Cepat:
        </span>
        {QUICK_SNIPPETS.map((snip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleInsertSnippet(snip.insert)}
            className="px-2 py-1 bg-slate-800 hover:bg-sky-900/60 active:bg-sky-700 text-sky-300 hover:text-sky-100 border border-slate-700/80 rounded-lg whitespace-nowrap text-[11px] font-mono transition transform active:scale-95 flex-shrink-0"
            title={`Sisipkan ${snip.label}`}
          >
            {snip.label}
          </button>
        ))}
      </div>

      {/* Code Editor Body */}
      <div className="relative flex-1 flex overflow-hidden bg-slate-900">
        {/* Line Numbers Gutter */}
        <div
          aria-hidden="true"
          className="w-12 bg-slate-950/70 py-4 select-none text-right pr-3 font-mono text-xs text-slate-500 border-r border-slate-800 leading-6"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea Input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="// Tulis kode Golang kamu di sini..."
          spellCheck="false"
          className="flex-1 w-full bg-transparent text-slate-100 font-mono text-xs sm:text-sm p-4 outline-none resize-none leading-6 selection:bg-sky-500/30 selection:text-sky-200"
        />
      </div>

      {/* Editor Status Footer */}
      <div className="bg-slate-950 px-5 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-4 font-mono">
          <span>UTF-8</span>
          <span>Golang v1.22+</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-slate-300 font-medium">Kompiler Siap</span>
        </div>
      </div>
    </div>
  );
}
