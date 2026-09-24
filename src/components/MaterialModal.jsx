import React, { useState, useEffect } from 'react';
import { Play, Copy, Check, Lightbulb, BookOpen, Target, Terminal, X, Zap } from 'lucide-react';
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(level.materi.contohKode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'materi', label: 'Buku Panduan', icon: BookOpen, color: 'text-cyan-400', activeBg: 'bg-cyan-500/20', borderColor: 'border-cyan-500' },
    { id: 'analogi', label: 'Dunia Nyata', icon: Lightbulb, color: 'text-yellow-400', activeBg: 'bg-yellow-500/20', borderColor: 'border-yellow-500' },
    { id: 'misi', label: 'Misi Utama', icon: Target, color: 'text-green-400', activeBg: 'bg-green-500/20', borderColor: 'border-green-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-[Poppins]">
      {/* Modal Container */}
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1a1a2e] shadow-[0_0_20px_rgba(0,255,255,0.2)] animate-in fade-in zoom-in duration-300"
        style={{ border: '4px solid #4a4e69', boxShadow: '8px 8px 0px rgba(0,0,0,0.5), inset -2px -2px 0px rgba(0,0,0,0.5), inset 2px 2px 0px rgba(255,255,255,0.1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0f0f23] to-[#16213e] border-b-4 border-[#4a4e69]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#2a2a4a] border-2 border-[#4a4e69] text-2xl">
              🐹
            </div>
            <div>
              <div className="text-xs text-cyan-400 font-['Press_Start_2P'] mb-2">LEVEL {level.id}</div>
              <h2 className="text-xl font-bold text-white font-['Press_Start_2P'] text-shadow-sm">{level.title}</h2>
            </div>
          </div>
          <button 
            onClick={() => { playSound('click'); onClose(); }}
            className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 border-2 border-transparent hover:border-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-4 gap-2 bg-[#0f0f23] border-b-2 border-[#4a4e69]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { playSound('click'); setActiveTab(tab.id); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold transition-all ${
                  isActive 
                    ? `${tab.activeBg} ${tab.color} border-b-4 ${tab.borderColor}`
                    : 'text-gray-400 hover:bg-[#1a1a2e] border-b-4 border-transparent'
                }`}
                style={isActive ? { textShadow: '0 0 10px currentColor' } : {}}
              >
                <Icon size={18} />
                <span className="font-['Press_Start_2P'] text-[10px] tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#1a1a2e]">
          {activeTab === 'materi' && (
            <div className="space-y-6">
              {/* Dialogue Bubble */}
              <div className="flex gap-4">
                <div className="flex-1 bg-[#2a2a4a] p-4 border-2 border-cyan-500 relative shadow-[4px_4px_0px_rgba(0,255,255,0.2)]">
                  <p className="text-gray-200 leading-relaxed">{level.materi.penjelasan}</p>
                  <div className="absolute top-4 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-[12px] border-r-cyan-500 border-b-8 border-b-transparent"></div>
                </div>
              </div>

              {/* Concepts */}
              {level.materi.konsepPenting && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {level.materi.konsepPenting.map((konsep, idx) => (
                    <div key={idx} className="bg-[#16213e] p-4 border-l-4 border-l-purple-500 border-2 border-[#4a4e69]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-['Press_Start_2P'] text-purple-400">Konsep {idx + 1}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{konsep}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Sample */}
              {level.materi.contohKode && (
                <div className="bg-black border-2 border-gray-700 mt-6 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b-2 border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Terminal size={16} />
                      <span className="text-xs font-['Press_Start_2P']">contoh.go</span>
                    </div>
                    <button 
                      onClick={handleCopyCode}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      title="Salin Kode"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-4 text-green-400 font-['Fira_Code'] text-sm overflow-x-auto">
                    <code>{level.materi.contohKode}</code>
                  </pre>
                </div>
              )}

              {/* Pro Tip */}
              {level.materi.tips && (
                <div className="bg-yellow-500/10 border-2 border-yellow-500 p-4 flex gap-4 mt-6 shadow-[4px_4px_0px_rgba(234,179,8,0.2)]">
                  <Zap className="text-yellow-400 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-yellow-400 font-['Press_Start_2P'] text-[10px] mb-2">PRO TIP!</h4>
                    <p className="text-yellow-100/80 text-sm">{level.materi.tips}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analogi' && (
            <div className="flex justify-center items-center h-full min-h-[300px]">
              <div className="max-w-2xl bg-[#2a1a1a] p-8 border-4 border-amber-600 shadow-[8px_8px_0px_rgba(217,119,6,0.3)] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-600/30"></div>
                <Lightbulb size={48} className="text-amber-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                <h3 className="text-xl font-['Press_Start_2P'] text-amber-500 mb-6">Analogi Dunia Nyata</h3>
                <p className="text-amber-100 text-lg leading-relaxed">{level.materi.analogi}</p>
              </div>
            </div>
          )}

          {activeTab === 'misi' && mission && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500 p-6 text-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <Target size={40} className="text-green-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                <h3 className="text-green-400 font-['Press_Start_2P'] text-sm mb-4">MISI SAAT INI</h3>
                <p className="text-white text-lg">{mission.objective}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#16213e] p-5 border-2 border-[#4a4e69] relative">
                  <div className="absolute -top-3 left-4 bg-[#1a1a2e] px-2 text-xs font-['Press_Start_2P'] text-cyan-400">INPUT / TARGET</div>
                  <div className="mt-2 text-gray-300 font-['Fira_Code']">
                    {mission.targetText || "Tidak ada target spesifik"}
                  </div>
                  {mission.visualTarget && (
                    <div className="mt-4 p-3 bg-black/50 border border-gray-700 text-gray-400 text-sm">
                      {mission.visualTarget}
                    </div>
                  )}
                </div>
                
                <div className="bg-[#16213e] p-5 border-2 border-[#4a4e69] relative">
                  <div className="absolute -top-3 left-4 bg-[#1a1a2e] px-2 text-xs font-['Press_Start_2P'] text-purple-400">OUTPUT DIHARAPKAN</div>
                  <div className="mt-2 text-gray-300 font-['Fira_Code']">
                    {mission.expectedOutput || "Output sesuai misi"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0f0f23] border-t-4 border-[#4a4e69] flex justify-end">
          <button 
            onClick={() => { playSound('start'); onClose(); }}
            className="group relative px-6 py-3 bg-green-600 hover:bg-green-500 transition-colors font-['Press_Start_2P'] text-white text-[10px] md:text-xs overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.5)] border-2 border-green-400"
            style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="flex items-center gap-2 relative z-10">
              <Play size={16} className="text-green-200" />
              MULAI CODING!
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;
