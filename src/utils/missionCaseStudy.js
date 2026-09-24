/**
 * Generator Studi Kasus & Detektor Tema Visual 2D
 * Menyediakan cerita Studi Kasus kontekstual yang selaras 100% antara:
 * 1. Teks Misi / Quest yang sedang aktif
 * 2. Simulasi Visual Game 2D & Karakter 2D di Kanvas
 */

export function getMissionContext(level, mission) {
  const obj = mission?.objective || level?.mission?.objective || '';
  const target = mission?.visualTarget || level?.visualGoal || '';
  const combined = `${obj} ${target} ${mission?.targetText || ''}`.toLowerCase();

  // 1. TEMA KOPI / BARISTA / KAFE
  if (/(kopi|kafe|gelas|susu|seduh|minuman|warkop|espresso|teh)/.test(combined)) {
    return {
      theme: 'coffee',
      badge: '☕ STUDI KASUS: KAFE OTOMATIS',
      sceneLabel: '☕ KAFE GOPHER 2D',
      caseStudyTitle: 'Otomatisasi Mesin Barista Kafe',
      caseStudyStory:
        'Kedai Gopher Coffee sedang ramai pembeli di pagi hari! Mesin seduh pintar membutuhkan program dengan urutan instruksi yang tepat agar gelas disiapkan lebih dulu sebelum kopi dan susu dituangkan secara otomatis.',
      visualDesc: 'Barista Pixel menyeduh kopi hangat di mesin espresso otomatis'
    };
  }

  // 2. TEMA ROKET / ANTARIKSA
  if (/(roket|meluncur|angkasa|antariksa|satelit|orbit|hitung mundur|lunar|mars)/.test(combined)) {
    return {
      theme: 'rocket',
      badge: '🚀 STUDI KASUS: PELUNCURAN ROKET',
      sceneLabel: '🚀 STASIUN ANTARIKSA 2D',
      caseStudyTitle: 'Komando Peluncuran Roket Orbit',
      caseStudyStory:
        'Stasiun peluncuran antariksa bersiap mengirim roket satelit ke orbit! Komputer kendali membutuhkan instruksi berurutan mulai dari hitung mundur, penyalaan mesin pendorong, hingga roket meluncur ke angkasa.',
      visualDesc: 'Astronot Pixel meluncurkan roket dari menara launchpad'
    };
  }

  // 3. TEMA ALARM / JADWAL PAGI
  if (/(alarm|bangun|tidur|pagi|weker|kasur)/.test(combined)) {
    return {
      theme: 'alarm',
      badge: '⏰ STUDI KASUS: SMART ALARM PAGI',
      sceneLabel: '⏰ KAMAR PAGI 2D',
      caseStudyTitle: 'Sistem Pengingat Bangun Pagi Pintar',
      caseStudyStory:
        'Agar tidak terlambat memulai aktivitas, jam weker pintar di meja kamar harus diprogram untuk membunyikan dering alarm tepat pukul 06:00, mematikan saklar dering, dan membangunkan penghuni kamar.',
      visualDesc: 'Jam weker lonceng kembar berdering membangunkan karakter'
    };
  }

  // 4. TEMA GUDANG STOK / TOKO / KASIR / GAJI / DISKON
  if (/(stok|terjual|gudang|barang|toko|harga|diskon|belanja|kasir|gaji|bonus|pajak|parkir|saldo)/.test(combined)) {
    return {
      theme: 'store',
      badge: '📦 STUDI KASUS: GUDANG & LOGISTIK TOKO',
      sceneLabel: '📦 GUDANG PIXEL-MART 2D',
      caseStudyTitle: 'Manajemen Stok & Kalkulasi Logistik PixelMart',
      caseStudyStory:
        'Manajer Gudang PixelMart sedang melakukan audit persediaan barang mingguan. Setiap hari terdapat barang yang keluar/terjual dari gudang, sehingga sistem harus menghitung sisa stok secara akurat dengan rumus matematika Go!',
      visualDesc: 'Manajer Gudang Pixel memeriksa rak kargo & stok PixelMart'
    };
  }

  // 5. TEMA KLUB VIP / BIOSKOP / TIKET / UMUR / WAHANA
  if (/(vip|klub|umur|tiket|bioskop|wahana|penonton|member)/.test(combined)) {
    return {
      theme: 'vip_club',
      badge: '🎟️ STUDI KASUS: GERBANG AKSES VIP',
      sceneLabel: '🎟️ PINTU VIP CLUB 2D',
      caseStudyTitle: 'Sistem Verifikasi Tiket & Batas Usia VIP Lounge',
      caseStudyStory:
        'Penjaga pintu (Bouncer) di Pixel VIP Lounge hanya boleh membuka pintu karpet merah jika pengunjung memenuhi DUA syarat sekaligus: membawa tiket resmi bertanda khusus DAN memenuhi batas usia minimum!',
      visualDesc: 'Penjaga VIP membuka gerbang karpet merah untuk tamu resmi'
    };
  }

  // 6. TEMA KEAMANAN / FIREWALL / BRANKAS / MUTEX
  if (/(gerbang|firewall|token|akses|otorisasi|brankas|kunci|mutex|login|pin|sandi)/.test(combined)) {
    return {
      theme: 'security',
      badge: '🛡️ STUDI KASUS: KEAMANAN BRANKAS SIBER',
      sceneLabel: '🛡️ BRANKAS KEAMANAN 2D',
      caseStudyTitle: 'Sistem Otorisasi & Penguncian Brankas Data',
      caseStudyStory:
        'Ruang brankas utama dilindungi palang laser berlapis. Sistem keamanan harus memverifikasi seluruh syarat otorisasi dan mengunci akses memori agar data brankas tetap aman tanpa celah kebocoran!',
      visualDesc: 'Petugas keamanan membuka palang laser brankas utama'
    };
  }

  // 7. TEMA SUHU / PENDINGIN / OVERHEAT
  if (/(suhu|pendingin|kipas|overheat|panas|celcius|derajat|termal|katup)/.test(combined)) {
    return {
      theme: 'cooling',
      badge: '❄️ STUDI KASUS: KONTROL TERMAL & PENDINGIN',
      sceneLabel: '❄️ TURBIN PENDINGIN 2D',
      caseStudyTitle: 'Otomatisasi Sensor Suhu & Katup Pendingin Darurat',
      caseStudyStory:
        'Suhu mesin meningkat secara bertahap setiap menit! Sistem pemantau harus mengecek suhu di setiap siklus dan otomatis mengaktifkan peringatan kritis atau menutup katup darurat saat melampaui ambang batas.',
      visualDesc: 'Insinyur Termal menstabilkan turbin pendingin & termometer'
    };
  }

  // 8. TEMA DAYA / BATERAI / ENERGI / GENERATOR
  if (/(daya|baterai|voltase|watt|listrik|energi|reaktor|kapasitas|generator|surya)/.test(combined)) {
    return {
      theme: 'power',
      badge: '⚡ STUDI KASUS: DISTRIBUSI ENERGI & BATERAI',
      sceneLabel: '⚡ GENERATOR DAYA 2D',
      caseStudyTitle: 'Kalkulasi Efisiensi & Cadangan Baterai Generator',
      caseStudyStory:
        'Unit penyimpanan energi cadangan sedang menyuplai listrik ke seluruh fasilitas. Sebagai Engineer Daya, kamu harus menghitung daya bersih dan sisa cadangan baterai agar voltase mencapai 100% stabil!',
      visualDesc: 'Teknisi Listrik mengisi penuh bar daya generator baterai'
    };
  }

  // 9. TEMA DRONE / ROBOT / PERISAI
  if (/(drone|perisai|robot|senjata|radar|tempur|turret|damage)/.test(combined)) {
    return {
      theme: 'drone',
      badge: '🤖 STUDI KASUS: PERTAHANAN DRONE TEMPUR',
      sceneLabel: '🤖 HANGGAR DRONE 2D',
      caseStudyTitle: 'Kalibrasi Perisai & Memori Unit Drone Otonom',
      caseStudyStory:
        'Unit Drone penjaga fasilitas sedang menerima simulasi benturan di hanggar uji coba. Gunakan struktur data dan referensi memori langsung agar kapasitas perisai (shield) drone ter-update secara real-time!',
      visualDesc: 'Pilot Mecha mengaktifkan perisai energi unit Drone 2D'
    };
  }

  // 10. DEFAULT: CLOUD / SERVER / DATA PIPELINE
  return {
    theme: 'server',
    badge: '🖥️ STUDI KASUS: ARSITEKTUR SERVER & CLOUD',
    sceneLabel: '🖥️ PUSAT SERVER 2D',
    caseStudyTitle: 'Pemrosesan Data Server & Jaringan Konkuren',
    caseStudyStory:
      'Pusat data utama sedang menangani banyak antrean tugas dan paket data sekaligus. Terapkan konsep pemrograman Go untuk memproses beban node dan mengirimkan respons data tanpa hambatan!',
    visualDesc: 'Teknisi mengaktifkan menara server & aliran paket data'
  };
}
