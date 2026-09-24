import React, { useState, useRef } from 'react';
import { RotateCcw, HelpCircle, Copy, Check, Play, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-[#0f0f23] border-4 border-indigo-900 overflow-hidden text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header bar */}
      <div className="bg-[#1a1a2e] px-2.5 sm:px-4 py-2 sm:py-3 border-b-4 border-indigo-900 flex items-center justify-between gap-1.5 sm:gap-3 flex-nowrap">
        <div className="flex items-center space-x-3 shrink-0">
          {/* Traffic Lights - Pixel style (squares) */}
          <div className="hidden xs:flex space-x-1.5">
            <span className="w-3 h-3 bg-red-500 border-2 border-red-800"></span>
            <span className="w-3 h-3 bg-yellow-500 border-2 border-yellow-800"></span>
            <span className="w-3 h-3 bg-green-500 border-2 border-green-800"></span>
          </div>

          {/* Active File Tab */}
          <div className="flex items-center space-x-2 bg-[#0f0f23] px-3 py-1.5 border-2 border-indigo-700 text-cyan-300">
            <span className="text-[11px]">🐹</span>
            <span className="font-bold text-xs uppercase tracking-wider" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem' }}>main.go</span>
          </div>
          <span className="text-[10px] font-medium text-slate-400 hidden xl:inline uppercase tracking-widest" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>
            [CTRL+ENTER RUN]
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Hint Button */}
          {hint && (
            <button
              onClick={() => {
                soundEffects.playClick();
                setShowHint(!showHint);
              }}
              title="Petunjuk Misi"
              className={`p-1.5 sm:px-3 sm:py-1.5 border-2 flex items-center space-x-1 transition-all ${
                showHint
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[2px_2px_0px_0px_#f59e0b]'
                  : 'bg-[#0f0f23] text-slate-300 border-indigo-700 hover:text-amber-400 hover:border-amber-400 hover:shadow-[2px_2px_0px_0px_#fbbf24]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-xs font-bold uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>Hint</span>
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Salin Kode"
            className="p-1.5 sm:p-2 bg-[#0f0f23] hover:bg-indigo-900 text-slate-300 hover:text-cyan-300 border-2 border-indigo-700 hover:border-cyan-400 transition-all hover:shadow-[2px_2px_0px_0px_#22d3ee]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onReset();
            }}
            title="Kembalikan ke Kode Awal"
            className="p-1.5 sm:px-3 sm:py-1.5 bg-[#0f0f23] hover:bg-red-950/40 text-slate-300 hover:text-red-400 border-2 border-indigo-700 hover:border-red-500 flex items-center space-x-1 transition-all hover:shadow-[2px_2px_0px_0px_#ef4444]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-bold uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>Reset</span>
          </button>

          {/* Run Code Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onRun();
            }}
            disabled={isExecuting}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 border-2 flex items-center space-x-2 transition-all active:translate-y-[2px] active:shadow-none ${
              isExecuting
                ? 'bg-slate-700 border-slate-900 text-slate-400 cursor-not-allowed shadow-[4px_4px_0px_0px_#0f172a]'
                : 'bg-green-500 border-green-200 text-[#0f0f23] hover:bg-green-400 shadow-[4px_4px_0px_0px_#052e16]'
            }`}
          >
            {isExecuting ? (
              <>
                <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-none animate-spin"></div>
                <span className="uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem' }}>PROSES</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0f0f23]" />
                <span className="uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem' }}>
                  <span className="inline sm:hidden">RUN</span>
                  <span className="hidden sm:inline">JALANKAN</span>
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hint Alert Drawer */}
      {showHint && hint && (
        <div className="bg-[#2d1b00] border-b-4 border-amber-600 px-4 py-3 flex items-start space-x-3 text-xs text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="text-amber-300 block mb-1 uppercase tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem' }}>Bocoran Petunjuk:</strong>
            <p className="leading-relaxed font-sans">{hint}</p>
          </div>
        </div>
      )}

      {/* Error Quick Alert Banner */}
      {hasError && onViewTerminal && (
        <div className="bg-red-950/80 border-b-4 border-red-600 px-3.5 py-2 flex items-center justify-between text-xs text-red-200">
          <div className="flex items-center space-x-3 truncate">
            <div className="w-2.5 h-2.5 bg-red-500 border border-red-200 animate-ping flex-shrink-0"></div>
            <span className="font-bold uppercase tracking-wider truncate" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>Error Sintaks / Logika</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onViewTerminal();
            }}
            className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-500 border-2 border-red-300 text-white font-bold uppercase transition flex-shrink-0 ml-2 shadow-[2px_2px_0px_0px_#450a0a] active:translate-y-[2px] active:shadow-none"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}
          >
            <span>Cek Terminal</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Quick Snippets Bar */}
      <div className="bg-[#16213e] px-3 py-2 border-b-4 border-indigo-900 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-cyan-400 flex-shrink-0 mr-1 hidden sm:inline uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}>
          Snippets:
        </span>
        {QUICK_SNIPPETS.map((snip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleInsertSnippet(snip.insert)}
            className="px-2 py-1 bg-[#0f0f23] hover:bg-indigo-900 active:bg-indigo-800 text-cyan-300 hover:text-cyan-100 border-2 border-indigo-700 hover:border-cyan-400 whitespace-nowrap font-mono transition-all transform active:translate-y-[1px] flex-shrink-0 shadow-[2px_2px_0px_0px_#1e1b4b]"
            title={`Sisipkan ${snip.label}`}
            style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}
          >
            {snip.label}
          </button>
        ))}
      </div>

      {/* Code Editor Body */}
      <div className="relative flex-1 flex overflow-hidden bg-[#0a0a1a]">
        {/* Line Numbers Gutter */}
        <div
          aria-hidden="true"
          className="w-12 bg-[#050510] py-4 select-none text-right pr-3 text-indigo-400 border-r-2 border-indigo-900 leading-6"
          style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}
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
          placeholder="// Ketik kode Golang di sini..."
          spellCheck="false"
          className="flex-1 w-full bg-transparent text-slate-100 p-4 outline-none resize-none leading-6 selection:bg-cyan-500/40 selection:text-cyan-100"
          style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}
        />
      </div>

      {/* Editor Status Footer */}
      <div className="bg-[#1a1a2e] px-4 py-2 border-t-4 border-indigo-900 flex items-center justify-between text-indigo-300 uppercase tracking-widest" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>GO v1.22+</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 border border-green-200 shadow-[0_0_5px_#22c55e]"></span>
          <span>READY</span>
        </div>
      </div>
    </div>
  );
}
