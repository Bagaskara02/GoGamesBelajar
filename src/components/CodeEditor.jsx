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
    <div className="flex flex-col h-full bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] overflow-hidden text-slate-900">
      {/* Header bar - Responsive Mobile & Desktop */}
      <div className="bg-[#bae6fd] px-2 sm:px-4 py-1.5 sm:py-2 border-b-[3px] border-slate-900 flex items-center justify-between gap-1.5 flex-nowrap">
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 min-w-0">
          {/* Pixel squares (Hidden on mobile phones to save space) */}
          <div className="hidden sm:flex space-x-1">
            <span className="w-3 h-3 bg-rose-500 border-2 border-slate-900"></span>
            <span className="w-3 h-3 bg-amber-400 border-2 border-slate-900"></span>
            <span className="w-3 h-3 bg-emerald-400 border-2 border-slate-900"></span>
          </div>

          {/* Active File Tab */}
          <div className="flex items-center space-x-1 bg-white px-2 py-0.5 sm:py-1 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <span className="text-xs">🐹</span>
            <span className="font-mono font-bold text-xs text-slate-900">main.go</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
          {hint && (
            <button
              onClick={() => {
                soundEffects.playClick();
                setShowHint(!showHint);
              }}
              title="Petunjuk Misi"
              className={`p-1 sm:px-2 sm:py-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none text-xs font-bold flex items-center space-x-1 transition ${
                showHint ? 'bg-[#fde047] text-slate-900' : 'bg-white hover:bg-amber-100 text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-pixel text-[8px]">HINT</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Salin Kode"
            className="p-1 sm:p-1.5 bg-white hover:bg-sky-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onReset();
            }}
            title="Reset Kode"
            className="p-1 sm:px-2 sm:py-1.5 bg-white hover:bg-rose-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none text-xs font-bold flex items-center space-x-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-pixel text-[8px]">RESET</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onRun();
            }}
            disabled={isExecuting}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none flex items-center space-x-1 transition shrink-0 ${
              isExecuting
                ? 'bg-slate-300 text-slate-700 cursor-not-allowed'
                : 'bg-[#4ade80] hover:bg-emerald-400 text-slate-950'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-slate-950 shrink-0" />
            <span className="font-pixel text-[8px] sm:text-[9px]">
              {isExecuting ? (
                '...'
              ) : (
                <>
                  <span className="inline sm:hidden">RUN</span>
                  <span className="hidden sm:inline">JALANKAN</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Hint Drawer */}
      {showHint && hint && (
        <div className="bg-[#fef9c3] border-b-[3px] border-slate-900 px-4 py-2.5 flex items-start space-x-2.5 text-xs text-slate-900">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-pixel text-[9px] text-amber-800 block mb-1">💡 PETUNJUK MISI:</strong>
            <p className="font-semibold text-sm">{hint}</p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {hasError && onViewTerminal && (
        <div className="bg-rose-100 border-b-[3px] border-slate-900 px-3.5 py-2 flex items-center justify-between text-xs text-rose-950">
          <div className="flex items-center space-x-2 truncate">
            <span className="w-2.5 h-2.5 bg-rose-600 border border-slate-900 animate-ping shrink-0"></span>
            <span className="font-bold truncate">Ada error pada kodemu! Cek detail barisnya.</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onViewTerminal();
            }}
            className="px-2.5 py-1 bg-rose-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] font-pixel text-[8px] shrink-0 ml-2"
          >
            LIHAT ERROR &rarr;
          </button>
        </div>
      )}

      {/* Quick Snippets Bar */}
      <div className="bg-[#f8fafc] px-3 py-1.5 border-b-[2px] border-slate-900 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[9px] font-pixel text-slate-600 shrink-0 mr-1 hidden sm:inline">
          SNIPPET:
        </span>
        {QUICK_SNIPPETS.map((snip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleInsertSnippet(snip.insert)}
            className="px-2 py-0.5 bg-white hover:bg-[#fde047] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] active:shadow-none whitespace-nowrap text-sm font-mono font-bold transition shrink-0"
          >
            {snip.label}
          </button>
        ))}
      </div>

      {/* Code Editor Body - Bright Paper Retro Theme */}
      <div className="relative flex-1 flex overflow-hidden bg-[#fffef9]">
        {/* Line Numbers Gutter */}
        <div
          aria-hidden="true"
          className="w-12 bg-[#f1f5f9] py-4 select-none text-right pr-3 font-mono text-xs sm:text-sm text-slate-500 border-r-[2px] border-slate-900 leading-6"
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
          className="flex-1 w-full bg-transparent text-slate-900 font-mono text-xs sm:text-sm p-4 outline-none resize-none leading-6 selection:bg-sky-300/50"
        />
      </div>

      {/* Footer Status Bar */}
      <div className="bg-[#f1f5f9] px-4 py-1.5 border-t-[3px] border-slate-900 flex items-center justify-between text-xs text-slate-800">
        <div className="flex items-center space-x-4 font-pixel text-[8px]">
          <span>UTF-8</span>
          <span>GOLANG 1.22</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 bg-emerald-500 border border-slate-900"></span>
          <span className="font-pixel text-[8px] text-slate-800">READY</span>
        </div>
      </div>
    </div>
  );
}
