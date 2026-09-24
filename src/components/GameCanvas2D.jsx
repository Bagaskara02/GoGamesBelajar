import React, { useRef, useEffect } from 'react';
import { getMissionContext } from '../utils/missionCaseStudy';

export default function GameCanvas2D({
  level,
  mission,
  isSuccess,
  isExecuting,
  onClaimVictory,
  isCollapsed = false,
  onToggleCollapse
}) {
  const canvasRef = useRef(null);
  const missionCtx = getMissionContext(level, mission);
  const theme = missionCtx.theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let animationFrameId;
    let time = 0;

    const clouds = [
      { x: 60, y: 30, speed: 0.25, scale: 1 },
      { x: 270, y: 20, speed: 0.18, scale: 1.15 },
      { x: 480, y: 36, speed: 0.3, scale: 0.9 }
    ];

    const confetti = Array.from({ length: 24 }, () => ({
      x: Math.random() * 640,
      y: Math.random() * 240,
      vy: 1 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 1.2,
      size: 6,
      color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899'][Math.floor(Math.random() * 6)]
    }));

    const render = () => {
      time += 0.045;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. LANGIT PIXEL CERAH
      const skyTop = isSuccess ? '#a7f3d0' : '#bae6fd';
      const skyBottom = isSuccess ? '#ecfdf5' : '#f0f9ff';
      const grad = ctx.createLinearGradient(0, 0, 0, height - 48);
      grad.addColorStop(0, skyTop);
      grad.addColorStop(1, skyBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height - 48);

      // Grid Pixel Halus
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height - 48);
        ctx.stroke();
      }
      for (let y = 0; y < height - 48; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. MATAHARI & AWAN PIXEL
      drawPixelSun(ctx, 575, 42, time, isSuccess);
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x > width + 60) c.x = -80;
        drawPixelCloud(ctx, Math.floor(c.x), c.y, c.scale);
      });

      // 3. LANTAI PIXEL RETRO
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, height - 50, width, 4);
      ctx.fillStyle = isSuccess ? '#4ade80' : '#38bdf8';
      ctx.fillRect(0, height - 46, width, 10);

      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, height - 36, width, 36);
      ctx.fillStyle = '#fde68a';
      for (let x = 0; x < width; x += 32) {
        ctx.fillRect(x, height - 36, 16, 18);
        ctx.fillRect(x + 16, height - 18, 16, 18);
      }

      // 4. SCENE 2D PIXEL SESUAI STUDI KASUS MISI
      drawMissionPixelScene(ctx, width, height, theme, isSuccess, time);

      // 5. KARAKTER 2D PIXEL INTERAKTIF SESUAI STUDI KASUS
      const charX = isSuccess ? 132 + Math.round(Math.sin(time * 2) * 8) : 120;
      const jumpOffset = isSuccess ? Math.abs(Math.round(Math.sin(time * 5) * 16)) : Math.round(Math.sin(time * 2) * 2);
      const charY = height - 50 - jumpOffset;

      drawPixelCharacter2D(ctx, charX, charY, theme, isSuccess, isExecuting, time);

      // 6. SINAR PIXEL EKSEKUSI SAAT RUN
      if (isExecuting) {
        drawPixelLaser(ctx, charX + 44, charY - 38, 420, height - 130, time);
      }

      // 7. CONFETTI PIXEL SAAT SUKSES
      if (isSuccess) {
        confetti.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > height - 52) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(Math.floor(p.x) - 1, Math.floor(p.y) - 1, p.size + 2, p.size + 2);
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [level, mission, theme, isSuccess, isExecuting]);

  const activeVisualGoal = mission?.visualTarget || missionCtx.visualDesc || level.visualGoal;

  return (
    <div className="relative w-full h-full bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] flex flex-col overflow-hidden transition-all">
      {/* Top Header Status - Clean & Compact (Tanpa tombol Acak Misi agar fokus di Tab Quest) */}
      <div className="bg-[#fef08a] px-2.5 sm:px-3.5 py-1.5 border-b-[3px] border-slate-900 flex items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center space-x-2 min-w-0">
          <span className={`w-2.5 h-2.5 border-2 border-slate-900 shrink-0 ${isSuccess ? 'bg-emerald-500 animate-bounce' : 'bg-sky-400 animate-pulse'}`}></span>
          <span className="text-slate-900 tracking-wide truncate font-pixel text-[8px] sm:text-[9px]">
            {missionCtx.sceneLabel}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          {isSuccess && onClaimVictory && (
            <button
              onClick={onClaimVictory}
              className="flex items-center space-x-1 px-2 py-0.5 bg-[#4ade80] hover:bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] transition font-pixel text-[8px]"
              title="Buka Ringkasan Level Berikutnya"
            >
              <span>🏆</span>
              <span>HASIL</span>
            </button>
          )}

          <span
            className={`px-2 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] font-pixel text-[8px] ${
              isSuccess ? 'bg-[#4ade80] text-slate-950' : 'bg-white text-slate-900'
            }`}
          >
            {isSuccess ? '★ SUKSES' : '● SIAP'}
          </span>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="px-1.5 py-0.5 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100 transition lg:hidden text-[10px] font-bold"
              title={isCollapsed ? 'Tampilkan Kanvas Penuh' : 'Lipat Kanvas'}
            >
              <span>{isCollapsed ? '▼' : '▲'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Canvas Viewport - Bebas dari Watermark Mengambang agar Karakter 2D Tidak Tertutup di HP */}
      {!isCollapsed ? (
        <>
          <div className="relative flex-1 w-full flex items-center justify-center bg-[#bae6fd] overflow-hidden min-h-[135px]">
            <canvas
              ref={canvasRef}
              width={640}
              height={280}
              className="w-full h-full object-contain bg-[#bae6fd]"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          {/* Bottom Target Strip (Di Luar Area Gambar Kanvas supaya tidak menutupi animasi 2D!) */}
          <div className="bg-[#fffef9] border-t-[2px] border-slate-900 px-2.5 py-1 text-[11px] sm:text-xs text-slate-900 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="text-amber-600 font-extrabold shrink-0">⚡ Visual 2D:</span>
              <span className="font-semibold text-slate-800 truncate">{activeVisualGoal}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="p-2 bg-[#fffbeb] flex items-center justify-between text-slate-900 text-xs">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-sm">🎮</span>
            <span className="truncate font-bold">Visual 2D: {activeVisualGoal}</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="px-2 py-0.5 bg-sky-300 border-2 border-slate-900 text-slate-900 font-bold text-xs shadow-[2px_2px_0px_#0f172a] shrink-0 ml-2"
          >
            Buka 2D
          </button>
        </div>
      )}
    </div>
  );
}

function drawPixelSun(ctx, x, y, time, isSuccess) {
  const pulse = Math.round(Math.sin(time * 2) * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x - 20 - pulse, y - 20 - pulse, 40 + pulse * 2, 40 + pulse * 2);
  ctx.fillStyle = isSuccess ? '#facc15' : '#fde047';
  ctx.fillRect(x - 16 - pulse, y - 16 - pulse, 32 + pulse * 2, 32 + pulse * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(x - 8, y - 8, 12, 12);
}

function drawPixelCloud(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(8, 0, 36, 20);
  ctx.fillRect(0, 5, 52, 15);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(10, 2, 32, 16);
  ctx.fillRect(2, 7, 48, 11);
  ctx.restore();
}

function drawPixelCharacter2D(ctx, x, bottomY, theme, isSuccess, isExecuting, time) {
  ctx.save();
  ctx.translate(Math.floor(x), Math.floor(bottomY));

  ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
  ctx.fillRect(-24, -4, 48, 6);

  const step = Math.round(Math.sin(time * 6) * 3);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-16, -12 + (isSuccess ? step : 0), 12, 12);
  ctx.fillRect(4, -12 - (isSuccess ? step : 0), 12, 12);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(-14, -10 + (isSuccess ? step : 0), 8, 8);
  ctx.fillRect(6, -10 - (isSuccess ? step : 0), 8, 8);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-22, -62, 44, 52);

  const bodyColors = {
    coffee: '#fcd34d',
    rocket: '#f8fafc',
    alarm: '#c084fc',
    store: '#4ade80',
    vip_club: '#1e293b',
    security: '#38bdf8',
    power: '#fb923c',
    cooling: '#22d3ee',
    drone: '#4ade80',
    server: '#38bdf8'
  };
  ctx.fillStyle = bodyColors[theme] || '#38bdf8';
  ctx.fillRect(-18, -58, 36, 44);

  // Celemek / Dasi / Kostum Dada
  if (theme === 'coffee' || theme === 'store') {
    ctx.fillStyle = theme === 'coffee' ? '#78350f' : '#15803d';
    ctx.fillRect(-12, -38, 24, 22);
  } else if (theme === 'vip_club') {
    // Jas VIP + Dasi Merah
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-8, -38, 16, 20);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-2, -36, 4, 14);
  } else {
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-10, -36, 20, 18);
  }

  // Mata / Kacamata Hitam VIP
  if (theme === 'vip_club') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-16, -54, 32, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-12, -52, 6, 3);
    ctx.fillRect(6, -52, 6, 3);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-13, -54, 9, 9);
    ctx.fillRect(4, -54, 9, 9);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-9, -52, 5, 5);
    ctx.fillRect(8, -52, 5, 5);
  }

  // Topi Sesuai Tema
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-20, -74, 40, 14);
  ctx.fillStyle =
    theme === 'coffee'
      ? '#ffffff'
      : theme === 'store'
      ? '#22c55e'
      : theme === 'vip_club'
      ? '#facc15'
      : '#f59e0b';
  ctx.fillRect(-16, -70, 32, 9);

  // Item di Tangan Karakter
  if (theme === 'coffee') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(22, -44, 16, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(24, -42, 12, 12);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(26, -40, 8, 5);
  } else if (theme === 'store') {
    // Memegang Kardus Paket Stok Barang
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(20, -46, 20, 18);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(22, -44, 16, 14);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(26, -44, 8, 5);
  } else if (theme === 'vip_club') {
    // Memegang Tiket Emas VIP
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(22, -44, 20, 12);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(24, -42, 16, 8);
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(22, -42, 14, 10);
    ctx.fillStyle = isExecuting ? '#39ff14' : '#38bdf8';
    ctx.fillRect(24, -40, 10, 6);
  }

  // Balon Status di Atas Karakter
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-34, -100, 68, 20);
  ctx.fillStyle = isSuccess ? '#4ade80' : '#ffffff';
  ctx.fillRect(-32, -98, 64, 16);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 8px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(isSuccess ? 'BERHASIL!' : isExecuting ? 'RUN...' : 'SIAP!', 0, -87);

  ctx.restore();
}

function drawMissionPixelScene(ctx, width, height, theme, isSuccess, time) {
  const cx = 435;
  const floorY = height - 50;

  // 1. TEMA TOKO & GUDANG LOGISTIK (stok, terjual, barang, harga, gaji)
  if (theme === 'store') {
    // Bangunan Rak Gudang PIXEL-MART
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 104, floorY - 170, 208, 170);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 98, floorY - 164, 196, 158);

    // Papan Nama PIXEL-MART
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 90, floorY - 196, 180, 28);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(cx - 86, floorY - 192, 172, 20);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('📦 GUDANG PIXEL-MART', cx, floorY - 178);

    // 2 Tingkat Rak Gudang & Kardus Stok Barang
    for (let row = 0; row < 2; row++) {
      const ry = floorY - 116 + row * 56;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(cx - 88, ry + 32, 176, 8);
      for (let box = 0; box < 4; box++) {
        const bx = cx - 80 + box * 42;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(bx, ry, 34, 32);
        ctx.fillStyle = isSuccess ? '#f59e0b' : '#d97706';
        ctx.fillRect(bx + 3, ry + 3, 28, 26);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(bx + 11, ry + 3, 12, 8);
      }
    }

    // Layar Audit Stok Otomatis
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 72, floorY - 156, 144, 24);
    ctx.fillStyle = isSuccess ? '#4ade80' : '#fde047';
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.fillText(isSuccess ? 'STOK TERVERIFIKASI!' : 'AUDIT STOK GUDANG', cx, floorY - 140);
    return;
  }

  // 2. TEMA KLUB MALAM VIP / BIOSKOP / WAHANA (VIP-PASS, umur, tiket)
  if (theme === 'vip_club') {
    // Bangunan Pintu VIP Lounge
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 96, floorY - 174, 192, 174);
    ctx.fillStyle = '#312e81';
    ctx.fillRect(cx - 90, floorY - 168, 180, 162);

    // Papan Neon "VIP CLUB LOUNGE"
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 84, floorY - 198, 168, 28);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(cx - 80, floorY - 194, 160, 20);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('★ VIP CLUB LOUNGE ★', cx, floorY - 180);

    // Pintu Masuk & Karpet Merah
    ctx.fillStyle = isSuccess ? '#4ade80' : '#1e1b4b';
    ctx.fillRect(cx - 48, floorY - 128, 96, 128);

    // Karpet Merah di Lantai
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 56, floorY - 12, 112, 12);

    if (!isSuccess) {
      // Tali Beludru Merah Pembatas VIP
      ctx.fillStyle = '#facc15';
      ctx.fillRect(cx - 64, floorY - 56, 10, 56);
      ctx.fillRect(cx + 54, floorY - 56, 10, 56);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(cx - 54, floorY - 38, 108, 10);
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 8px "Press Start 2P", monospace';
      ctx.fillText('WELCOME VIP!', cx, floorY - 68);
    }

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 66, floorY - 156, 132, 20);
    ctx.fillStyle = isSuccess ? '#4ade80' : '#fde047';
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.fillText(isSuccess ? 'VIP PASS: DITERIMA' : 'CEK TIKET & UMUR', cx, floorY - 143);
    return;
  }

  // 3. TEMA KAFE & MESIN KOPI ESPRESSO
  if (theme === 'coffee') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 106, floorY - 52, 212, 52);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(cx - 102, floorY - 48, 204, 44);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 92, floorY - 202, 184, 28);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 88, floorY - 198, 176, 20);
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('☕ GOPHER COFFEE', cx, floorY - 184);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 68, floorY - 168, 136, 116);
    ctx.fillStyle = isSuccess ? '#10b981' : '#ef4444';
    ctx.fillRect(cx - 64, floorY - 164, 128, 108);

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(cx - 52, floorY - 134, 104, 64);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 22, floorY - 98, 44, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 18, floorY - 94, 36, 22);

    if (isSuccess) {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(cx - 4, floorY - 118, 4, 22);
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(cx + 1, floorY - 118, 4, 22);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(cx - 16, floorY - 86, 32, 12);
    }
    return;
  }

  // 4. TEMA PELUNCURAN ROKET
  if (theme === 'rocket') {
    const launchOffset = isSuccess ? Math.min(80, (time * 16) % 80) : 0;
    const ry = floorY - launchOffset;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 82, floorY - 160, 22, 160);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cx - 78, floorY - 156, 14, 152);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 26, ry - 142, 52, 106);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 22, ry - 138, 44, 98);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 16, ry - 160, 32, 18);
    ctx.fillRect(cx - 38, ry - 64, 12, 26);
    ctx.fillRect(cx + 26, ry - 64, 12, 26);

    if (isSuccess) {
      const flameH = 24 + Math.round(Math.sin(time * 10) * 8);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(cx - 18, ry - 36, 36, flameH);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(cx - 8, ry - 36, 16, flameH - 8);
    }
    return;
  }

  // 5. TEMA JAM WEKER ALARM PAGI
  if (theme === 'alarm') {
    const shake = isSuccess ? Math.round(Math.sin(time * 16) * 4) : 0;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 84, floorY - 48, 168, 48);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(cx - 80, floorY - 44, 160, 40);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 52 + shake, floorY - 154, 104, 106);
    ctx.fillStyle = isSuccess ? '#22c55e' : '#ef4444';
    ctx.fillRect(cx - 48 + shake, floorY - 150, 96, 98);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 36 + shake, floorY - 138, 72, 72);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isSuccess ? '06:00' : '05:59', cx + shake, floorY - 96);
    return;
  }

  // 6. TEMA BRANKAS KEAMANAN
  if (theme === 'security') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 84, floorY - 168, 168, 168);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cx - 78, floorY - 162, 156, 158);
    ctx.fillStyle = isSuccess ? '#dcfce7' : '#fee2e2';
    ctx.fillRect(cx - 54, floorY - 132, 108, 128);
    if (!isSuccess) {
      ctx.fillStyle = '#ef4444';
      for (let y = floorY - 116; y < floorY - 16; y += 26) {
        ctx.fillRect(cx - 54, y, 108, 8);
      }
    }
    return;
  }

  // 7. TEMA GENERATOR DAYA & PENDINGIN
  if (theme === 'power' || theme === 'cooling') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 64, floorY - 164, 128, 164);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 58, floorY - 158, 116, 152);

    const activeBars = isSuccess ? 4 : 2;
    const barColors = ['#ef4444', '#f59e0b', '#38bdf8', '#22c55e'];
    for (let i = 0; i < 4; i++) {
      const by = floorY - 40 - i * 34;
      ctx.fillStyle = i < activeBars ? barColors[i] : '#e2e8f0';
      ctx.fillRect(cx - 46, by, 92, 26);
    }
    return;
  }

  // 8. DEFAULT: DRONE & SERVER RACK
  for (let i = 0; i < 2; i++) {
    const rx = cx - 76 + i * 92;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rx, floorY - 160, 72, 160);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(rx + 4, floorY - 156, 64, 152);
    for (let slot = 0; slot < 4; slot++) {
      const sy = floorY - 144 + slot * 34;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(rx + 10, sy, 52, 22);
      ctx.fillStyle = isSuccess ? '#4ade80' : '#ef4444';
      ctx.fillRect(rx + 16, sy + 7, 8, 8);
    }
  }
}

function drawPixelLaser(ctx, x1, y1, x2, y2, time) {
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t + Math.sin(time * 15 + i) * 6;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(Math.floor(px) - 5, Math.floor(py) - 5, 10, 10);
    ctx.fillStyle = i % 2 === 0 ? '#fde047' : '#38bdf8';
    ctx.fillRect(Math.floor(px) - 3, Math.floor(py) - 3, 6, 6);
  }
}
