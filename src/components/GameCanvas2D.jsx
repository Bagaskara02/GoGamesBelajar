import React, { useRef, useEffect } from 'react';

/**
 * Deteksi tema visual 2D secara otomatis berdasarkan teks misi aktif & level
 * Agar saat misi acak berbicara tentang Kopi, Roket, Alarm, Brankas, Baterai, atau Drone,
 * objek mesin 2D dan kostum karakter 2D langsung berubah sesuai cerita misi!
 */
function detectMissionTheme(level, mission) {
  const combinedText = `${mission?.objective || ''} ${mission?.visualTarget || ''} ${mission?.targetText || ''} ${level?.title || ''}`.toLowerCase();

  if (/(kopi|kafe|gelas|susu|seduh|minuman|warkop|teh|espresso)/.test(combinedText)) {
    return 'coffee';
  }
  if (/(roket|meluncur|angkasa|antariksa|satelit|orbit|hitung mundur|lunar|mars)/.test(combinedText)) {
    return 'rocket';
  }
  if (/(alarm|bangun|tidur|pagi|jam|jadwal|kasur)/.test(combinedText)) {
    return 'alarm';
  }
  if (/(gerbang|firewall|token|akses|otorisasi|brankas|kunci|mutex|login|pin|sandi|tiket|wahana)/.test(combinedText)) {
    return 'security';
  }
  if (/(suhu|pendingin|kipas|overheat|panas|celcius|derajat|termal|katup)/.test(combinedText)) {
    return 'cooling';
  }
  if (/(daya|baterai|voltase|watt|listrik|energi|reaktor|kapasitas|generator|surya)/.test(combinedText)) {
    return 'power';
  }
  if (/(drone|perisai|robot|senjata|radar|tempur|turret)/.test(combinedText)) {
    return 'drone';
  }
  if (/(json|cloud|api|http|gateway|paket|pipa|channel|worker|swarm)/.test(combinedText)) {
    return 'cloud';
  }
  return 'server';
}

export default function GameCanvas2D({
  level,
  mission,
  missionIndex = 0,
  totalMissions = 1,
  onRandomizeMission,
  isSuccess,
  isExecuting,
  onClaimVictory,
  isCollapsed = false,
  onToggleCollapse
}) {
  const canvasRef = useRef(null);
  const theme = detectMissionTheme(level, mission);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let animationFrameId;
    let time = 0;

    // Awan pixel bergerak di langit cerah
    const clouds = [
      { x: 60, y: 34, speed: 0.25, scale: 1 },
      { x: 260, y: 22, speed: 0.18, scale: 1.2 },
      { x: 470, y: 42, speed: 0.3, scale: 0.9 }
    ];

    // Partikel pixel perayaan
    const confetti = Array.from({ length: 26 }, () => ({
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

      // 1. LANGIT PIXEL CERAH (Bukan Gelap!)
      const skyTop = isSuccess ? '#a7f3d0' : '#bae6fd';
      const skyBottom = isSuccess ? '#ecfdf5' : '#f0f9ff';
      const grad = ctx.createLinearGradient(0, 0, 0, height - 56);
      grad.addColorStop(0, skyTop);
      grad.addColorStop(1, skyBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height - 56);

      // Grid Pixel Halus di Latar Belakang
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.06)';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height - 56);
        ctx.stroke();
      }
      for (let y = 0; y < height - 56; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. MATAHARI PIXEL 8-BIT & AWAN PIXEL PUTIH
      drawPixelSun(ctx, 565, 44, time, isSuccess);
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x > width + 60) c.x = -80;
        drawPixelCloud(ctx, Math.floor(c.x), c.y, c.scale);
      });

      // 3. LANTAI PIXEL RETRO (Rumput / Ubin Kayu Cerah dengan Border Tegas)
      // Garis batas atas lantai
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, height - 58, width, 4);

      // Strip atas lantai (Hijau segar saat sukses, Kuning keemasan saat standby)
      ctx.fillStyle = isSuccess ? '#4ade80' : '#38bdf8';
      ctx.fillRect(0, height - 54, width, 12);

      // Pola kotak-kotak pixel pada lantai
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, height - 42, width, 42);
      ctx.fillStyle = '#fde68a';
      for (let x = 0; x < width; x += 32) {
        ctx.fillRect(x, height - 42, 16, 20);
        ctx.fillRect(x + 16, height - 22, 16, 22);
      }

      // 4. OBJEK MESIN / SCENE 2D PIXEL SESUAI TEMA MISI (Kopi, Roket, Alarm, Keamanan, Daya, dll.)
      drawMissionPixelScene(ctx, width, height, theme, isSuccess, time);

      // 5. KARAKTER 2D PIXEL INTERAKTIF (Berganti kostum & alat sesuai tema misi!)
      const charX = isSuccess ? 132 + Math.round(Math.sin(time * 2) * 8) : 120;
      const jumpOffset = isSuccess ? Math.abs(Math.round(Math.sin(time * 5) * 18)) : Math.round(Math.sin(time * 2) * 2);
      const charY = height - 58 - jumpOffset;

      drawPixelCharacter2D(ctx, charX, charY, theme, isSuccess, isExecuting, time);

      // 6. SINAR PIXEL EKSEKUSI SAAT TOMBOL RUN DITEKAN
      if (isExecuting) {
        drawPixelLaser(ctx, charX + 44, charY - 38, 410, height - 135, time);
      }

      // 7. CONFETTI PIXEL SAAT MISI BERHASIL
      if (isSuccess) {
        confetti.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > height - 60) {
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

  const activeVisualGoal = mission?.visualTarget || level.visualGoal;

  const themeLabels = {
    coffee: '☕ KAFE PIXEL 2D',
    rocket: '🚀 STASIUN ROKET 2D',
    alarm: '⏰ KAMAR PAGI 2D',
    security: '🛡️ GERBANG KEAMANAN 2D',
    cooling: '❄️ PENDINGIN REAKTOR 2D',
    power: '⚡ GENERATOR DAYA 2D',
    drone: '🤖 HANGGAR DRONE 2D',
    cloud: '☁️ JARINGAN CLOUD 2D',
    server: '🖥️ RUANG SERVER 2D'
  };

  return (
    <div className="relative w-full h-full bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] flex flex-col overflow-hidden transition-all">
      {/* Top Header Status - Bright Pixel Art Style */}
      <div className="bg-[#fef08a] px-2.5 sm:px-4 py-2 border-b-[3px] border-slate-900 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 min-w-0">
          <span className={`w-3 h-3 border-2 border-slate-900 shrink-0 ${isSuccess ? 'bg-emerald-500 animate-bounce' : 'bg-sky-400 animate-pulse'}`}></span>
          <span
            className="text-slate-900 tracking-wider truncate font-pixel"
            style={{ fontSize: '0.55rem' }}
          >
            {themeLabels[theme] || '8-BIT SIMULATOR'}
          </span>
          {totalMissions > 1 && (
            <span
              className="hidden xs:inline-block px-1.5 py-0.5 bg-white border-2 border-slate-900 text-slate-900 font-pixel shadow-[2px_2px_0px_#0f172a]"
              style={{ fontSize: '0.44rem' }}
            >
              MISI #{missionIndex + 1}/{totalMissions}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Randomize Mission Button */}
          {onRandomizeMission && totalMissions > 1 && (
            <button
              onClick={onRandomizeMission}
              className="flex items-center space-x-1 px-2 py-1 bg-[#c084fc] hover:bg-[#a855f7] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] transition text-[10px] font-bold"
              title="Acak variasi misi baru di level ini"
            >
              <span>🎲</span>
              <span className="hidden sm:inline font-pixel" style={{ fontSize: '0.44rem' }}>
                ACAK MISI
              </span>
            </button>
          )}

          {/* Victory Claim Button */}
          {isSuccess && onClaimVictory && (
            <button
              onClick={onClaimVictory}
              className="flex items-center space-x-1 px-2.5 py-1 bg-[#4ade80] hover:bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-y-[1px] transition font-pixel"
              style={{ fontSize: '0.45rem' }}
              title="Buka Ringkasan Level Berikutnya"
            >
              <span>🏆</span>
              <span>HASIL</span>
            </button>
          )}

          <span
            className={`px-2 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] font-pixel ${
              isSuccess
                ? 'bg-[#4ade80] text-slate-950'
                : 'bg-white text-slate-900'
            }`}
            style={{ fontSize: '0.44rem' }}
          >
            {isSuccess ? '★ SUKSES!' : '● SIAP'}
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

      {/* Canvas Viewport */}
      {!isCollapsed ? (
        <div className="relative flex-1 w-full h-full flex items-center justify-center p-1.5 sm:p-2 bg-[#e0f2fe] overflow-hidden">
          <canvas
            ref={canvasRef}
            width={640}
            height={320}
            className="w-full h-full object-contain border-2 border-slate-900 bg-[#e0f2fe]"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Level Goal Watermark on bottom-right */}
          <div className="absolute bottom-2 right-2.5 sm:bottom-3 sm:right-3 bg-white border-2 border-slate-900 px-2.5 py-1 text-xs text-slate-900 flex items-center space-x-1.5 max-w-[88%] truncate shadow-[3px_3px_0px_#0f172a]">
            <span className="text-amber-600 font-bold flex-shrink-0">⚡ Target:</span>
            <span className="font-bold text-slate-900 truncate">{activeVisualGoal}</span>
          </div>
        </div>
      ) : (
        <div className="p-2.5 bg-[#fffbeb] flex items-center justify-between text-slate-900 text-xs">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-base">🎮</span>
            <span className="truncate font-bold">Misi 2D: {activeVisualGoal}</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="px-2 py-0.5 bg-sky-300 border-2 border-slate-900 text-slate-900 font-bold text-xs shadow-[2px_2px_0px_#0f172a] flex-shrink-0 ml-2"
          >
            Buka Kanvas 2D
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Menggambar Matahari Pixel 8-Bit
 */
function drawPixelSun(ctx, x, y, time, isSuccess) {
  const pulse = Math.round(Math.sin(time * 2) * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x - 22 - pulse, y - 22 - pulse, 44 + pulse * 2, 44 + pulse * 2);
  ctx.fillStyle = isSuccess ? '#facc15' : '#fde047';
  ctx.fillRect(x - 18 - pulse, y - 18 - pulse, 36 + pulse * 2, 36 + pulse * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(x - 10, y - 10, 14, 14);
}

/**
 * Menggambar Awan Putih Pixel 8-Bit
 */
function drawPixelCloud(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  // Outline hitam pixel
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(8, 0, 36, 22);
  ctx.fillRect(0, 6, 52, 16);
  // Isi putih cerah
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(10, 2, 32, 18);
  ctx.fillRect(2, 8, 48, 12);
  // Bayangan bawah awan
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(4, 16, 44, 4);
  ctx.restore();
}

/**
 * Menggambar Karakter 2D Pixel Art (Bentuk Blok Pixel 8-Bit dengan Kostum Sesuai Misi!)
 */
function drawPixelCharacter2D(ctx, x, bottomY, theme, isSuccess, isExecuting, time) {
  ctx.save();
  ctx.translate(Math.floor(x), Math.floor(bottomY));

  // Bayangan di lantai
  ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
  ctx.fillRect(-26, -4, 52, 8);

  // Kaki Pixel (Bergerak saat jalan/lompat)
  const step = Math.round(Math.sin(time * 6) * 3);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-18, -14 + (isSuccess ? step : 0), 14, 14);
  ctx.fillRect(4, -14 - (isSuccess ? step : 0), 14, 14);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(-16, -12 + (isSuccess ? step : 0), 10, 10);
  ctx.fillRect(6, -12 - (isSuccess ? step : 0), 10, 10);

  // Badan Utama Karakter Pixel (Kotak Pixel 8-Bit Berwarna Biru Cerah / Kostum)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-24, -66, 48, 54); // Outline badan

  // Warna baju sesuai tema misi
  const bodyColors = {
    coffee: '#fcd34d',   // Baju koki/barista kuning hangat
    rocket: '#f8fafc',   // Baju astronot putih
    alarm: '#c084fc',    // Piyama ungu pagi
    security: '#38bdf8', // Armor ksatria siber
    power: '#fb923c',    // Rompi engineer oranye
    cooling: '#22d3ee',  // Jaket termal cyan
    drone: '#4ade80',    // Seragam pilot hijau
    cloud: '#818cf8',    // Seragam netrunner
    server: '#38bdf8'    // Baju teknisi biru
  };
  ctx.fillStyle = bodyColors[theme] || '#38bdf8';
  ctx.fillRect(-20, -62, 40, 46);

  // Celemek / Sabuk Pixel
  if (theme === 'coffee') {
    // Celemek Barista Cokelat
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-14, -40, 28, 24);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-8, -36, 16, 6);
  } else {
    // Perut / Panel Dada Pixel
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-12, -38, 24, 20);
  }

  // Wajah & Mata Pixel 8-Bit
  // Mata Kiri & Kanan (Kotak Pixel)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-14, -56, 10, 10);
  ctx.fillRect(4, -56, 10, 10);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-10, -54, 6, 6);
  ctx.fillRect(8, -54, 6, 6);
  // Kilau mata pixel
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-9, -53, 2, 2);
  ctx.fillRect(9, -53, 2, 2);

  // Mulut / Gigi Pixel
  ctx.fillStyle = isSuccess ? '#ef4444' : '#0f172a';
  ctx.fillRect(-6, -44, 12, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-4, -44, 3, 3);
  ctx.fillRect(1, -44, 3, 3);

  // TOPI / HELM PIXEL SESUAI MISI
  if (theme === 'coffee') {
    // Topi Barista / Chef Putih-Cokelat
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-22, -82, 44, 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-18, -78, 36, 12);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(-20, -70, 40, 4);
  } else if (theme === 'rocket') {
    // Visor Helm Astronot
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-26, -74, 52, 12);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-22, -70, 44, 6);
  } else if (theme === 'alarm') {
    // Topi Tidur Ungu
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-20, -78, 40, 14);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(-16, -74, 32, 10);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(16, -76, 8, 8);
  } else {
    // Topi Pixel Petualang / Engineer
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-22, -78, 44, 14);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-18, -74, 36, 10);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-6, -72, 12, 6);
  }

  // ITEM YANG DIPEGANG KARAKTER SESUAI MISI
  if (theme === 'coffee') {
    // Memegang Cangkir Kopi Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(24, -46, 18, 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(26, -44, 14, 14);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(28, -42, 10, 6);
    // Uap kopi
    if (isSuccess) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(30, -54 - Math.round(Math.sin(time * 5) * 3), 3, 6);
      ctx.fillRect(35, -56 - Math.round(Math.cos(time * 5) * 3), 3, 6);
    }
  } else if (theme === 'rocket') {
    // Bendera Antariksa Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(26, -68, 4, 42);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(30, -68, 20, 14);
  } else {
    // Memegang Kunci Inggris / Konsol Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(24, -44, 16, 12);
    ctx.fillStyle = isExecuting ? '#39ff14' : '#38bdf8';
    ctx.fillRect(26, -42, 12, 8);
  }

  // Balon Dialog Kecil di Atas Karakter
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-38, -110, 76, 22);
  ctx.fillStyle = isSuccess ? '#4ade80' : '#ffffff';
  ctx.fillRect(-36, -108, 72, 18);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(isSuccess ? 'MANTAP!' : isExecuting ? 'RUN...' : 'SIAP!', 0, -96);

  ctx.restore();
}

/**
 * Menggambar Objek Mesin & Lingkungan 2D Pixel Art Berdasarkan Tema Misi Aktif
 */
function drawMissionPixelScene(ctx, width, height, theme, isSuccess, time) {
  const cx = 435;
  const floorY = height - 58;

  if (theme === 'coffee') {
    // =========================================================
    // SCENE 1: KAFE & MESIN ESPRESSO KOPI OTOMATIS 2D PIXEL ART
    // =========================================================
    // Meja Bar Kafe Kayu Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 110, floorY - 56, 220, 56);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(cx - 106, floorY - 52, 212, 48);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(cx - 112, floorY - 62, 224, 10);

    // Papan Nama "GOPHER CAFE"
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 96, floorY - 216, 192, 30);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 92, floorY - 212, 184, 22);
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('☕ GOPHER COFFEE', cx, floorY - 196);

    // Bodi Mesin Kopi Espresso Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 72, floorY - 180, 144, 120);
    ctx.fillStyle = isSuccess ? '#10b981' : '#ef4444';
    ctx.fillRect(cx - 68, floorY - 176, 136, 112);

    // Bagian Tengah Stainless Mesin Kopi
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(cx - 56, floorY - 144, 112, 68);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 20, floorY - 144, 40, 20); // Corong Portafilter

    // Layar Status Mesin Kopi
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 52, floorY - 170, 104, 20);
    ctx.fillStyle = isSuccess ? '#4ade80' : '#fde047';
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.fillText(isSuccess ? 'SEDUH: SELESAI!' : 'MENUNGGU KODE', cx, floorY - 157);

    // Gelas / Cangkir Kopi Besar di Bawah Corong
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 24, floorY - 104, 48, 34);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 20, floorY - 100, 40, 26);
    // Gagang Gelas Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx + 24, floorY - 96, 10, 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx + 24, floorY - 92, 6, 10);

    // Isi Kopi & Aliran Kopi + Susu saat Sukses!
    if (isSuccess) {
      // Aliran kopi turun dari corong
      ctx.fillStyle = '#78350f';
      ctx.fillRect(cx - 6, floorY - 124, 5, 24);
      ctx.fillStyle = '#fef3c7'; // Aliran susu
      ctx.fillRect(cx + 1, floorY - 124, 5, 24);

      // Isi kopi + foam susu di dalam cangkir
      ctx.fillStyle = '#78350f';
      ctx.fillRect(cx - 18, floorY - 90, 36, 14);
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(cx - 18, floorY - 96, 36, 6);

      // Uap Harum Kopi Mengepul
      const steamOffset = Math.round(Math.sin(time * 4) * 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 12 + steamOffset, floorY - 118, 4, 10);
      ctx.fillRect(cx + 8 - steamOffset, floorY - 122, 4, 10);
    }
    return;
  }

  if (theme === 'rocket') {
    // =========================================================
    // SCENE 2: PELUNCURAN ROKET ANTARIKSA 2D PIXEL ART
    // =========================================================
    const launchOffset = isSuccess ? Math.min(95, (time * 18) % 95) : 0;
    const ry = floorY - launchOffset;

    // Menara Launchpad Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 86, floorY - 170, 24, 170);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cx - 82, floorY - 166, 16, 162);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 62, floorY - 130, 36, 8);

    // Badan Roket Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 28, ry - 150, 56, 114);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 24, ry - 146, 48, 106);

    // Moncong Merah Roket (Cone Berjenjang Pixel)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 20, ry - 170, 40, 20);
    ctx.fillRect(cx - 12, ry - 186, 24, 16);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 16, ry - 166, 32, 16);
    ctx.fillRect(cx - 8, ry - 182, 16, 14);

    // Sirip Kiri & Kanan Roket
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 44, ry - 68, 16, 34);
    ctx.fillRect(cx + 28, ry - 68, 16, 34);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 40, ry - 64, 12, 26);
    ctx.fillRect(cx + 28, ry - 64, 12, 26);

    // Jendela Kaca Biru Roket
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 14, ry - 122, 28, 28);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(cx - 10, ry - 118, 20, 20);

    // Semburan Api Pixel saat Meluncur
    if (isSuccess) {
      const flameH = 26 + Math.round(Math.sin(time * 10) * 10);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(cx - 20, ry - 36, 40, flameH);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(cx - 14, ry - 36, 28, flameH - 6);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(cx - 8, ry - 36, 16, flameH - 12);
    }
    return;
  }

  if (theme === 'alarm') {
    // =========================================================
    // SCENE 3: JAM WEKER ALARM PAGI CERIA 2D PIXEL ART
    // =========================================================
    const shake = isSuccess ? Math.round(Math.sin(time * 16) * 5) : 0;

    // Meja Kamar Kayu
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 90, floorY - 54, 180, 54);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(cx - 86, floorY - 50, 172, 46);

    // Lonceng Kiri & Kanan Jam Weker
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 64 + shake, floorY - 188, 34, 24);
    ctx.fillRect(cx + 30 + shake, floorY - 188, 34, 24);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(cx - 60 + shake, floorY - 184, 26, 16);
    ctx.fillRect(cx + 34 + shake, floorY - 184, 26, 16);

    // Bodi Kotak Jam Weker Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 56 + shake, floorY - 164, 112, 110);
    ctx.fillStyle = isSuccess ? '#22c55e' : '#ef4444';
    ctx.fillRect(cx - 52 + shake, floorY - 160, 104, 102);

    // Layar Putih Jam
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 40 + shake, floorY - 148, 80, 78);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isSuccess ? '06:00' : '05:59', cx + shake, floorY - 102);

    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.fillStyle = isSuccess ? '#15803d' : '#b91c1c';
    ctx.fillText(isSuccess ? 'BANGUN PAGI!' : 'TIDUR ZZZ', cx + shake, floorY - 128);
    return;
  }

  if (theme === 'security') {
    // =========================================================
    // SCENE 4: GERBANG KEAMANAN & BRANKAS LASER PIXEL ART
    // =========================================================
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 88, floorY - 176, 176, 176);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cx - 82, floorY - 170, 164, 166);

    // Pintu Dalam
    ctx.fillStyle = isSuccess ? '#dcfce7' : '#fee2e2';
    ctx.fillRect(cx - 58, floorY - 138, 116, 134);

    if (!isSuccess) {
      // Palang Laser Merah
      ctx.fillStyle = '#ef4444';
      for (let y = floorY - 122; y < floorY - 16; y += 26) {
        ctx.fillRect(cx - 58, y, 116, 8);
      }
    } else {
      // Pintu Terbuka & Permata Emas
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 9px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TERBUKA!', cx, floorY - 95);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(cx - 22, floorY - 72, 44, 44);
    }

    // Papan Status Gerbang
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 68, floorY - 164, 136, 20);
    ctx.fillStyle = isSuccess ? '#4ade80' : '#f87171';
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isSuccess ? 'AKSES DITERIMA' : 'TERKUNCI (LOCKED)', cx, floorY - 151);
    return;
  }

  if (theme === 'power' || theme === 'cooling') {
    // =========================================================
    // SCENE 5: BATERAI GENERATOR DAYA & PENDINGIN 2D PIXEL ART
    // =========================================================
    // Kutub Atas Baterai
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 28, floorY - 186, 56, 14);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(cx - 24, floorY - 182, 48, 10);

    // Bodi Baterai Raksasa Pixel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 68, floorY - 172, 136, 172);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 62, floorY - 166, 124, 160);

    // Bar Indikator Daya Baterai
    const activeBars = isSuccess ? 4 : 2;
    const barColors = ['#ef4444', '#f59e0b', '#38bdf8', '#22c55e'];
    for (let i = 0; i < 4; i++) {
      const by = floorY - 42 - i * 36;
      ctx.fillStyle = i < activeBars ? barColors[i] : '#e2e8f0';
      ctx.fillRect(cx - 50, by, 100, 28);
      ctx.fillStyle = '#0f172a';
      ctx.strokeRect(cx - 50, by, 100, 28);
    }

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isSuccess ? 'DAYA STABIL 100%' : 'KALIBRASI DAYA...', cx, floorY - 194);
    return;
  }

  // =========================================================
  // SCENE 6 (DEFAULT): DRONE / CLOUD / SERVER RACK PIXEL CERAH
  // =========================================================
  for (let i = 0; i < 2; i++) {
    const rx = cx - 80 + i * 96;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rx, floorY - 168, 76, 168);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(rx + 4, floorY - 164, 68, 160);

    for (let slot = 0; slot < 4; slot++) {
      const sy = floorY - 152 + slot * 36;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(rx + 10, sy, 56, 24);
      // Lampu LED Pixel
      ctx.fillStyle = isSuccess ? '#4ade80' : slot % 2 === 0 ? '#facc15' : '#ef4444';
      ctx.fillRect(rx + 16, sy + 8, 8, 8);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(rx + 30, sy + 8, 28, 8);
    }
  }

  // Drone Pixel Melayang di Atas Server
  const hoverY = floorY - 202 + Math.round(Math.sin(time * 4) * 6);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 32, hoverY - 14, 64, 24);
  ctx.fillStyle = isSuccess ? '#4ade80' : '#fde047';
  ctx.fillRect(cx - 28, hoverY - 10, 56, 16);
}

/**
 * Sinar Pixel Saat Menjalankan Kode
 */
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
