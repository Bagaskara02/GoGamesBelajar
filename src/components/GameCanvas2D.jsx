import React, { useRef, useEffect } from 'react';

/**
 * GameCanvas2D - Visualisasi Game 2D Cyber-Lab Interaktif
 * Menampilkan simulasi hardware cerah, karakter maskot Gopher Engineer, dan animasi 60 FPS.
 */
export default function GameCanvas2D({ level, isSuccess, isExecuting }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Partikel selebrasi keberhasilan
    const particles = [];
    const createSuccessParticles = (x, y) => {
      for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x: x || canvas.width / 2,
          y: y || canvas.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3.5 + 1.5,
          color: ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 5)],
          life: 1,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    if (isSuccess) {
      createSuccessParticles(canvas.width * 0.65, canvas.height * 0.5);
    }

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Background Lab Berkelas (Slate modern dengan aura biru lembut)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Lantai Lab Grid Berperspektif
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Render Mesin/Objek Spesifik sesuai Level
      drawLevelMachinery(ctx, width, height, level, isSuccess, time);

      // 4. Render Maskot Gopher Engineer
      drawGopherMascot(ctx, 80, height - 60, isSuccess, isExecuting, time);

      // 5. Partikel Efek Sukses
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [level, isSuccess, isExecuting]);

  return (
    <div className="relative w-full h-full bg-white rounded-3xl border border-slate-200/90 shadow-md flex flex-col overflow-hidden">
      {/* Top Header Status */}
      <div className="bg-slate-50/90 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
          <span className="font-bold text-slate-700 tracking-wide">
            SIMULASI 2D CYBER-LAB
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            Status Perangkat:
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide transition-all ${
              isSuccess
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'bg-amber-100 text-amber-700 border border-amber-300'
            }`}
          >
            {isSuccess ? '● AKTIF & STABIL' : '○ MENUNGGU INSTRUKSI KODE'}
          </span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 bg-slate-900">
        <canvas
          ref={canvasRef}
          width={640}
          height={320}
          className="w-full h-full object-contain rounded-2xl"
        />

        {/* Level Goal Watermark on bottom-right */}
        <div className="absolute bottom-3 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 flex items-center space-x-2">
          <span className="text-sky-400">⚡ Target:</span>
          <span className="font-semibold text-white">{level.visualGoal}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Menggambar Mesin Laboratorium berdasarkan sceneType
 */
function drawLevelMachinery(ctx, width, height, level, isSuccess, time) {
  const centerX = width * 0.65;
  const centerY = height * 0.52;

  switch (level.sceneType) {
    case 'server_room': {
      // 3 Rak Server Modern dengan Layar Status
      for (let i = 0; i < 3; i++) {
        const rx = centerX - 105 + i * 90;
        const ry = centerY - 70;

        // Casing Rak Server
        ctx.fillStyle = isSuccess ? '#1e293b' : '#0f172a';
        ctx.strokeStyle = isSuccess ? '#38bdf8' : '#334155';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(rx, ry, 70, 140, 8);
        ctx.fill();
        ctx.stroke();

        // Slot Tray Server
        for (let s = 0; s < 5; s++) {
          const sy = ry + 14 + s * 22;
          ctx.fillStyle = isSuccess ? '#0f172a' : '#020617';
          ctx.fillRect(rx + 8, sy, 54, 15);

          // LED Blinking Matrix
          const isLedOn = isSuccess && Math.sin(time * 6 + i * 2 + s) > -0.2;
          ctx.fillStyle = isLedOn ? '#10b981' : (isSuccess ? '#38bdf8' : '#ef4444');
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = isSuccess ? 8 : 2;
          ctx.beginPath();
          ctx.arc(rx + 52, sy + 7.5, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Kabel Daya di Lantai dengan Denyut Cahaya
      ctx.strokeStyle = isSuccess ? '#10b981' : '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(110, height - 40);
      ctx.bezierCurveTo(centerX - 120, height - 10, centerX - 50, height - 35, centerX + 120, height - 40);
      ctx.stroke();

      if (isSuccess) {
        // Pulsa energi berjalan di kabel
        const pulseOffset = (time * 80) % 200;
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(110 + pulseOffset, height - 38, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      break;
    }

    case 'power_generator': {
      // Reaktor Daya Berputar
      ctx.save();
      ctx.translate(centerX, centerY);

      // Cincin Generator Luar
      ctx.strokeStyle = isSuccess ? '#10b981' : '#475569';
      ctx.lineWidth = 10;
      ctx.shadowColor = isSuccess ? '#10b981' : 'transparent';
      ctx.shadowBlur = isSuccess ? 18 : 0;
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Rotor Berputar
      ctx.rotate(isSuccess ? time * 3 : time * 0.3);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = isSuccess ? '#38bdf8' : '#334155';
        ctx.fillRect(-8, -65, 16, 32);
      }
      ctx.restore();

      // Inti Plasma
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.fillStyle = isSuccess ? '#facc15' : '#64748b';
      ctx.shadowColor = isSuccess ? '#facc15' : 'transparent';
      ctx.shadowBlur = isSuccess ? 20 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Meteran Daya Digital
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = isSuccess ? '#10b981' : '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(centerX - 60, centerY + 95, 120, 28, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSuccess ? '#10b981' : '#ef4444';
      ctx.font = 'bold 12px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isSuccess ? 'VOLTASE: 100%' : 'VOLTASE: 0%', centerX, centerY + 113);
      break;
    }

    case 'security_gate': {
      // Pilar Gerbang
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(centerX - 120, centerY - 80, 32, 160, 8);
      ctx.roundRect(centerX + 88, centerY - 80, 32, 160, 8);
      ctx.fill();

      // Laser Keamanan
      const laserCount = 4;
      for (let i = 0; i < laserCount; i++) {
        const ly = centerY - 50 + i * 36;
        ctx.strokeStyle = isSuccess ? '#10b981' : '#ef4444';
        ctx.lineWidth = isSuccess ? 2.5 : 5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 14;

        if (isSuccess) {
          // Gerbang terbuka
          ctx.beginPath();
          ctx.moveTo(centerX - 88, ly);
          ctx.lineTo(centerX - 45, ly);
          ctx.moveTo(centerX + 45, ly);
          ctx.lineTo(centerX + 88, ly);
          ctx.stroke();
        } else {
          // Gerbang tertutup
          ctx.beginPath();
          ctx.moveTo(centerX - 88, ly);
          ctx.lineTo(centerX + 88, ly);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }
      break;
    }

    case 'cooling_fan': {
      // Turbin Pendingin Raksasa
      ctx.save();
      ctx.translate(centerX, centerY);

      // Tabung Turbin
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.stroke();

      // Bilah Kipas Berputar
      const bladeSpeed = isSuccess ? time * 14 : 0;
      ctx.rotate(bladeSpeed);
      for (let i = 0; i < 6; i++) {
        ctx.rotate((Math.PI * 2) / 6);
        ctx.fillStyle = isSuccess ? '#38bdf8' : '#64748b';
        ctx.beginPath();
        ctx.ellipse(0, 38, 14, 32, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Uap Es Dingin
      if (isSuccess) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        for (let i = 0; i < 6; i++) {
          const vx = centerX + 85 + (Math.sin(time * 4 + i) * 25);
          const vy = centerY - 35 + i * 14;
          ctx.beginPath();
          ctx.arc(vx, vy, 12 + i * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case 'worker_swarm': {
      // Antrean Request
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(centerX - 130, centerY - 60, 65, 110, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QUEUE', centerX - 97, centerY);

      // Bot Pekerja Mengangkut Paket
      const botCount = 3;
      for (let i = 0; i < botCount; i++) {
        const bx = centerX - 35 + (isSuccess ? (time * 130 + i * 65) % 190 : 0);
        const by = centerY - 45 + i * 38;

        // Bodi Bot
        ctx.fillStyle = isSuccess ? '#10b981' : '#64748b';
        ctx.beginPath();
        ctx.roundRect(bx, by, 32, 20, 6);
        ctx.fill();

        // Kacamata Visor
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(bx + 6, by + 5, 20, 6);

        // Paket Data Emas
        if (isSuccess) {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.roundRect(bx + 8, by - 10, 16, 9, 3);
          ctx.fill();
        }
      }
      break;
    }

    case 'channel_pipeline': {
      // Pipa Kaca Pneumatic
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.moveTo(centerX - 120, centerY);
      ctx.lineTo(centerX + 120, centerY);
      ctx.stroke();

      ctx.strokeStyle = isSuccess ? '#38bdf8' : '#475569';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Kapsul Data Meluncur Cepat
      if (isSuccess) {
        const packetX = centerX - 110 + ((time * 110) % 220);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(packetX, centerY, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      break;
    }

    case 'cloud_gateway': {
      // Gateway Server Satelit
      ctx.fillStyle = isSuccess ? '#064e3b' : '#1e293b';
      ctx.strokeStyle = isSuccess ? '#10b981' : '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(centerX - 90, centerY - 65, 180, 130, 12);
      ctx.fill();
      ctx.stroke();

      // Layar Status API
      ctx.fillStyle = '#022c22';
      ctx.beginPath();
      ctx.roundRect(centerX - 80, centerY - 55, 160, 85, 8);
      ctx.fill();

      ctx.fillStyle = isSuccess ? '#34d399' : '#64748b';
      ctx.font = 'bold 11px Poppins, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(isSuccess ? 'HTTP/1.1 200 OK' : 'STATUS: OFFLINE', centerX - 68, centerY - 30);
      ctx.fillText(isSuccess ? '{"status":"ONLINE"}' : 'MENUNGGU REST API...', centerX - 68, centerY - 10);
      ctx.fillText(isSuccess ? 'SERVER: Gopher-HQ' : '', centerX - 68, centerY + 10);

      // Pancaran Gelombang Satelit
      if (isSuccess) {
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.7)';
        ctx.lineWidth = 2.5;
        const pulseR = 40 + (time * 35) % 55;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 65, pulseR, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      }
      break;
    }

    default: {
      // General Cyber Machinery Card
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = isSuccess ? '#38bdf8' : '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(centerX - 100, centerY - 65, 200, 130, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSuccess ? '#10b981' : '#f59e0b';
      ctx.font = 'bold 14px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isSuccess ? '● SISTEM TERHUBUNG' : '○ STATUS: STANDBY', centerX, centerY - 20);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px Poppins, sans-serif';
      ctx.fillText(level.visualGoal, centerX, centerY + 15);
      break;
    }
  }
}

/**
 * Karakter Maskot Gopher Engineer Lucu & Ekspresif
 */
function drawGopherMascot(ctx, x, y, isSuccess, isExecuting, time) {
  ctx.save();
  ctx.translate(x, y);

  // Goyangan nafas halus
  const bobY = Math.sin(time * 4) * 3;
  ctx.translate(0, bobY);

  // Tubuh Gopher (Biru Khas Mascot Golang)
  ctx.fillStyle = '#00add8';
  ctx.beginPath();
  ctx.roundRect(-24, -48, 48, 50, [20, 20, 14, 14]);
  ctx.fill();

  // Telinga Lucu
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(-20, -45, 8, 0, Math.PI * 2);
  ctx.arc(20, -45, 8, 0, Math.PI * 2);
  ctx.fill();

  // Moncong Krem
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.ellipse(0, -25, 15, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dua Gigi Kelinci Besar Khas Gopher
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-6, -18, 5, 8);
  ctx.fillRect(1, -18, 5, 8);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.strokeRect(-6, -18, 5, 8);
  ctx.strokeRect(1, -18, 5, 8);

  // Mata Putih Besar
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-9, -34, 7, 0, Math.PI * 2);
  ctx.arc(9, -34, 7, 0, Math.PI * 2);
  ctx.fill();

  // Pupil Mata Hitam (Menoleh ke kanan ke arah mesin)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-7, -34, 3.5, 0, Math.PI * 2);
  ctx.arc(11, -34, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Kilatan Cahaya di Mata
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-8, -36, 1.5, 0, Math.PI * 2);
  ctx.arc(10, -36, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Helm Proyek / Engineer Oranye
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(0, -48, 18, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(-22, -49, 44, 5);

  // Kacamata Google Engineer di Helm
  ctx.fillStyle = isSuccess ? '#10b981' : '#38bdf8';
  ctx.fillRect(-14, -46, 11, 4);
  ctx.fillRect(3, -46, 11, 4);

  // Tangan Gopher
  ctx.fillStyle = '#fef08a';
  if (isSuccess) {
    // Angkat dua tangan bersorak gembira!
    ctx.beginPath();
    ctx.arc(-24, -36, 6, 0, Math.PI * 2);
    ctx.arc(24, -36, 6, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Memegang laptop mini
    ctx.beginPath();
    ctx.arc(-14, -10, 5, 0, Math.PI * 2);
    ctx.arc(14, -10, 5, 0, Math.PI * 2);
    ctx.fill();

    // Laptop mini
    ctx.fillStyle = '#334155';
    ctx.fillRect(-12, -8, 24, 4);
    ctx.fillStyle = isExecuting ? '#10b981' : '#38bdf8';
    ctx.fillRect(-10, -16, 20, 8);
  }

  ctx.restore();

  // Bayangan di Lantai
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(x, y + 4, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();
}
