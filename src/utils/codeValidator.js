/**
 * Code Validator & Golang Simulator Engine
 * Memvalidasi logika dan sintaks Go untuk tantangan kurikulum tingkat lanjut.
 */

export function validateGolangCode(userCode, level) {
  const code = (userCode || "").trim();
  const logs = [];

  // Pengecekan dasar struktur file Go
  if (!code) {
    return {
      success: false,
      output: "",
      error: "Kompilasi Gagal: Editor masih kosong!",
      diagnostics: "Tuliskan kodemu atau klik tombol 'Reset' untuk memuat starter code."
    };
  }

  // 1. Cek package main
  if (!/package\s+main\b/.test(code)) {
    return {
      success: false,
      output: "syntax error: package statement missing or not main",
      error: "Kompilasi Gagal: Program executable membutuhkan deklarasi package utama.",
      diagnostics: "Setiap file program mandiri di Go wajib diawali dengan pendefinisian package khusus di baris pertama."
    };
  }

  // 2. Cek func main()
  if (!/func\s+main\s*\(\s*\)/.test(code)) {
    return {
      success: false,
      output: "undefined: main.main",
      error: "Kompilasi Gagal: Fungsi utama func main() tidak ditemukan!",
      diagnostics: "Compiler Go mencari fungsi gerbang utama tempat program mulai berjalan. Buat func main() { ... }."
    };
  }

  const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Hapus komentar untuk analisis

  switch (level.id) {
    case 1: { // Booting The Core (3 Tahap Urutan)
      const hasBoot = /fmt\.Println\s*\(\s*["']Booting Core\.\.\.["']\s*\)/.test(cleanCode);
      const hasReady = /fmt\.Println\s*\(\s*["']Status: READY["']\s*\)/.test(cleanCode);
      const hasPower = /fmt\.Println\s*\(\s*["']Menyalakan Listrik["']\s*\)/.test(cleanCode);

      if (!hasBoot || !hasReady || !hasPower) {
        return {
          success: false,
          output: "Hardware Status: Boot sequence tidak lengkap...",
          error: "Urutan 3 tahap inisialisasi boot belum lengkap!",
          diagnostics: "Pastikan kamu mencetak 3 instruksi secara berurutan: \"Booting Core...\", \"Status: READY\", dan \"Menyalakan Listrik\" masing-masing menggunakan fmt.Println."
        };
      }
      logs.push("Booting Core...\nStatus: READY\nMenyalakan Listrik");
      break;
    }

    case 2: { // Power Grid (Rumus: kapasitas - (beban * durasi))
      const hasKapasitas = /(kapasitas\s*:=\s*200|var\s+kapasitas\s*(int)?\s*=\s*200)/.test(cleanCode);
      const hasBeban = /(beban\s*:=\s*45|var\s+beban\s*(int)?\s*=\s*45)/.test(cleanCode);
      const hasDurasi = /(durasi\s*:=\s*2|var\s+durasi\s*(int)?\s*=\s*2)/.test(cleanCode);
      const hasFormula = /kapasitas\s*-\s*\(\s*beban\s*\*\s*durasi\s*\)|kapasitas\s*-\s*beban\s*\*\s*durasi/.test(cleanCode);
      const hasPrint = /fmt\.Println\s*\(\s*["']Sisa Daya:["']\s*,\s*sisaDaya\s*\)/.test(cleanCode) || /fmt\.Println\s*\(.*110.*\)/.test(cleanCode);

      if (!hasKapasitas || !hasBeban || !hasDurasi) {
        return {
          success: false,
          output: "undefined: variabel daya baterai",
          error: "Variabel kalkulasi daya belum lengkap!",
          diagnostics: "Deklarasikan variabel kapasitas (200), beban (45), dan durasi (2) dengan operator ':='."
        };
      }
      if (!hasFormula) {
        return {
          success: false,
          output: "rumus kalkulasi sisa daya belum tepat",
          error: "Perhitungan sisa daya belum menerapkan rumus formula!",
          diagnostics: "Hitung sisa daya dengan rumus: sisaDaya := kapasitas - (beban * durasi)."
        };
      }
      if (!hasPrint) {
        return {
          success: false,
          output: "sisaDaya declared and not used",
          error: "Cetak hasil perhitungan dengan teks awalan!",
          diagnostics: "Gunakan fmt.Println(\"Sisa Daya:\", sisaDaya) untuk melaporkan hasil perhitungan ke meteran."
        };
      }
      logs.push("Sisa Daya: 110");
      break;
    }

    case 3: { // Firewall Security Gate (Multi-Kriteria &&)
      const hasAndCondition = /if\s+token\s*==\s*["']GOPHER-SEC["']\s*&&\s*izinLevel\s*>=\s*3/.test(cleanCode) ||
                              /if\s+izinLevel\s*>=\s*3\s*&&\s*token\s*==\s*["']GOPHER-SEC["']/.test(cleanCode);
      const hasPrintSuccess = /fmt\.Println\s*\(\s*["']AKSES OTORISASI DITERIMA["']\s*\)/.test(cleanCode);

      if (!hasAndCondition) {
        return {
          success: false,
          output: "syntax error: logika verifikasi belum memenuhi standar ganda",
          error: "Kondisi otorisasi belum menggabungkan kedua syarat dengan operator &&!",
          diagnostics: "Gunakan operator logika '&&' untuk memastikan token cocok dan izinLevel >= 3."
        };
      }
      if (!hasPrintSuccess) {
        return {
          success: false,
          output: "Laser firewall masih aktif...",
          error: "Pesan keberhasilan belum tercetak di dalam blok if!",
          diagnostics: "Cetak \"AKSES OTORISASI DITERIMA\" ketika kedua syarat terpenuhi."
        };
      }
      logs.push("AKSES OTORISASI DITERIMA");
      break;
    }

    case 4: { // Reactor Cooling Loop (For Loop dengan Filter Suhu)
      const hasForLoop = /for\s+suhu\s*:=\s*85;\s*suhu\s*<=\s*100;\s*suhu\s*\+=\s*5/.test(cleanCode);
      const hasFilter = /if\s+suhu\s*>\s*90/.test(cleanCode);
      const hasPrintKritis = /fmt\.Println\s*\(\s*["']KRITIS:["']\s*,\s*suhu\s*\)/.test(cleanCode);
      const hasPrintNormal = /fmt\.Println\s*\(\s*["']NORMAL:["']\s*,\s*suhu\s*\)/.test(cleanCode);

      if (!hasForLoop) {
        return {
          success: false,
          output: "loop step invalid",
          error: "Pengaturan kenaikan for loop belum tepat!",
          diagnostics: "Pastikan loop dimulai dari suhu := 85, batas suhu <= 100, dan kenaikan suhu += 5."
        };
      }
      if (!hasFilter || !hasPrintKritis || !hasPrintNormal) {
        return {
          success: false,
          output: "filter suhu di dalam loop belum membedakan kondisi",
          error: "Logika penyaringan kondisi di dalam loop belum lengkap!",
          diagnostics: "Gunakan percabangan if suhu > 90 untuk mencetak KRITIS, dan else untuk mencetak NORMAL."
        };
      }
      logs.push("NORMAL: 85\nNORMAL: 90\nKRITIS: 95\nKRITIS: 100");
      break;
    }

    case 5: { // Energy Converter Modules (prosesEnergi function)
      const hasFunc = /func\s+prosesEnergi\s*\(\s*\w+\s+int\s*,\s*\w+\s+int\s*\)\s*\(\s*int\s*,\s*string\s*\)/.test(cleanCode);
      const hasFormula = /\(\s*\w+\s*\*\s*\w+\s*\)\s*\/\s*100/.test(cleanCode);
      const hasCall = /prosesEnergi\s*\(\s*150\s*,\s*80\s*\)/.test(cleanCode);

      if (!hasFunc) {
        return {
          success: false,
          output: "signature fungsi prosesEnergi tidak valid",
          error: "Definisi fungsi prosesEnergi harus menerima (int, int) dan mengembalikan (int, string)!",
          diagnostics: "Periksa parameter dan return signature pada fungsi prosesEnergi."
        };
      }
      if (!hasFormula) {
        return {
          success: false,
          output: "perhitungan dayaBersih belum menggunakan rumus efisiensi",
          error: "Hitung daya bersih dengan rumus: (watt * efisiensi) / 100!",
          diagnostics: "Terapkan rumus perhitungan daya bersih sebelum menentukan status return."
        };
      }
      if (!hasCall) {
        return {
          success: false,
          output: "prosesEnergi defined but not called with (150, 80)",
          error: "Panggil fungsi prosesEnergi(150, 80) di func main()!",
          diagnostics: "Di main(): hasil, status := prosesEnergi(150, 80) lalu cetak nilainya."
        };
      }
      logs.push("120 OPTIMAL");
      break;
    }

    case 6: { // Server Rack Storage (Range & Filter Overload)
      const hasRange = /for\s+.*range\s+bebanNodes/.test(cleanCode);
      const hasCondition = />\s*75/.test(cleanCode);
      const hasPrint = /fmt\.Println\s*\(\s*["']Node Overload:["']\s*,\s*overloadCount\s*\)/.test(cleanCode) || /fmt\.Println\s*\(.*2.*\)/.test(cleanCode);

      if (!hasRange) {
        return {
          success: false,
          output: "loop range belum terdeteksi",
          error: "Iterasi slice harus menggunakan kata kunci 'range'!",
          diagnostics: "Gunakan 'for _, beban := range bebanNodes' untuk membaca setiap angka beban."
        };
      }
      if (!hasCondition) {
        return {
          success: false,
          output: "syarat ambang overload (> 75) belum diuji",
          error: "Filter beban overload belum tepat!",
          diagnostics: "Periksa apakah nilai beban > 75 di dalam loop sebelum menaikkan hitungan overloadCount."
        };
      }
      if (!hasPrint) {
        return {
          success: false,
          output: "total overload belum dicetak",
          error: "Cetak hasil hitungan dengan format yang diminta!",
          diagnostics: "Gunakan fmt.Println(\"Node Overload:\", overloadCount)."
        };
      }
      logs.push("Node Overload: 2");
      break;
    }

    case 7: { // Hardware Direct Memory (Pointer kalibrasiChip)
      const hasDereference = /\*chip\s*=\s*100/.test(cleanCode);
      const hasCondition = /\*chip\s*>\s*batas/.test(cleanCode) || /\*chip\s*>\s*500/.test(cleanCode);
      const hasAddressOf = /kalibrasiChip\s*\(\s*&statusChip\s*,\s*500\s*\)/.test(cleanCode);

      if (!hasCondition || !hasDereference) {
        return {
          success: false,
          output: "Chip Status: 999",
          error: "Nilai memori chip belum dimodifikasi dengan operator pointer dereference (*)",
          diagnostics: "Di dalam fungsi: if *chip > batas { *chip = 100 }."
        };
      }
      if (!hasAddressOf) {
        return {
          success: false,
          output: "cannot use statusChip as pointer",
          error: "Kirimkan alamat memori &statusChip saat memanggil kalibrasiChip!",
          diagnostics: "Gunakan operator & di depan statusChip: kalibrasiChip(&statusChip, 500)."
        };
      }
      logs.push("Chip Status: 100");
      break;
    }

    case 8: { // Drone Defense Unit (Pointer Receiver TerimaDamage)
      const hasReceiver = /func\s*\(\s*\w+\s+\*Drone\s*\)\s*TerimaDamage\s*\(\s*\w+\s+int\s*\)/.test(cleanCode);
      const hasDamageOp = /-\s*=\s*\w+|Perisai\s*-\s*\w+/.test(cleanCode);
      const hasCall = /\w+\.TerimaDamage\s*\(\s*50\s*\)/.test(cleanCode);

      if (!hasReceiver) {
        return {
          success: false,
          output: "method TerimaDamage belum memiliki pointer receiver (*Drone)",
          error: "Method harus menggunakan pointer receiver (*Drone) agar bisa memutasi data!",
          diagnostics: "Format receiver: func (d *Drone) TerimaDamage(dmg int) { ... }"
        };
      }
      if (!hasDamageOp) {
        return {
          success: false,
          output: "perisai drone belum dikurangi",
          error: "Kurangi nilai perisai drone dengan damage yang diterima!",
          diagnostics: "Tuliskan: d.Perisai -= dmg di dalam method TerimaDamage."
        };
      }
      if (!hasCall) {
        return {
          success: false,
          output: "drone belum menerima serangan",
          error: "Panggil method TerimaDamage(50) pada objek Drone!",
          diagnostics: "Buat Drone{Model: \"GOPHER-1\", Perisai: 150} lalu panggil bot.TerimaDamage(50)."
        };
      }
      logs.push("GOPHER-1 Sisa Perisai: 100");
      break;
    }

    case 9: { // Universal Protocol Link (Interface Multi-Method)
      const hasInterface = /type\s+ModulDaya\s+interface/.test(cleanCode);
      const hasWattMethod = /func\s*\(\s*\w+\s+ReaktorNuklir\s*\)\s*HasilkanWatt\s*\(\s*\)\s*int/.test(cleanCode);
      const hasNameMethod = /func\s*\(\s*\w+\s+ReaktorNuklir\s*\)\s*NamaModul\s*\(\s*\)\s*string/.test(cleanCode);
      const hasInspectCall = /InspeksiModul\s*\(\s*\w+\s*\)/.test(cleanCode);

      if (!hasInterface || !hasWattMethod || !hasNameMethod) {
        return {
          success: false,
          output: "ReaktorNuklir does not implement ModulDaya (missing methods)",
          error: "ReaktorNuklir wajib mengimplementasikan KEDUA method: HasilkanWatt() dan NamaModul()!",
          diagnostics: "Pastikan struct ReaktorNuklir memiliki method HasilkanWatt() int dan NamaModul() string."
        };
      }
      if (!hasInspectCall) {
        return {
          success: false,
          output: "modul daya belum dihubungkan ke fungsi inspeksi",
          error: "Panggil fungsi InspeksiModul dengan objek ReaktorNuklir!",
          diagnostics: "Buat objek ReaktorNuklir{} lalu oper ke InspeksiModul(core)."
        };
      }
      logs.push("Nuklir Core-1 Output: 1000 Watt");
      break;
    }

    case 10: { // Swarm Worker Fleet (Concurrent Multi-Task)
      const hasAuth = /go\s+prosesTask\s*\(\s*["']AUTH["']\s*\)/.test(cleanCode);
      const hasTelemetri = /go\s+prosesTask\s*\(\s*["']TELEMETRI["']\s*\)/.test(cleanCode);

      if (!hasAuth || !hasTelemetri) {
        return {
          success: false,
          output: "tasks did not run concurrently with keyword 'go'",
          error: "Kedua task belum dijalankan secara asinkron dengan keyword 'go'!",
          diagnostics: "Tuliskan 'go prosesTask(\"AUTH\")' dan 'go prosesTask(\"TELEMETRI\")' sebelum time.Sleep."
        };
      }
      logs.push("Task: AUTH Selesai\nTask: TELEMETRI Selesai");
      break;
    }

    case 11: { // Pipes of Power (Channels & Kalkulasi)
      const hasMakeChan = /make\s*\(\s*chan\s+int\s*\)/.test(cleanCode);
      const hasSend = /ch\s*<-\s*(\w+|50\s*\*\s*2|100)/.test(cleanCode);
      const hasReceive = /<-\s*ch/.test(cleanCode);

      if (!hasMakeChan) {
        return {
          success: false,
          output: "channel int belum diinisialisasi",
          error: "Buat channel integer dengan: ch := make(chan int)!",
          diagnostics: "Channel harus bertipe 'int' untuk mengalirkan data angka tegangan."
        };
      }
      if (!hasSend || !hasReceive) {
        return {
          success: false,
          output: "deadlock / pipa data kosong",
          error: "Alur kirim-terima channel belum lengkap!",
          diagnostics: "Kirim data di goroutine dengan 'ch <- hasil' dan baca di main dengan '<-ch'."
        };
      }
      logs.push("Tegangan Diterima: 100");
      break;
    }

    case 12: { // Vault Deadlock & Mutex (tarikDaya)
      const hasLock = /mu\.Lock\s*\(\s*\)/.test(cleanCode);
      const hasUnlock = /mu\.Unlock\s*\(\s*\)/.test(cleanCode);
      const hasCall = /tarikDaya\s*\(\s*50\s*\)/.test(cleanCode);

      if (!hasLock || !hasUnlock) {
        return {
          success: false,
          output: "DATA RACE DETECTED! Saldo brankas korup!",
          error: "Operasi saldo brankas belum dilindungi kunci Mutex!",
          diagnostics: "Panggil mu.Lock() sebelum saldo -= jumlah dan mu.Unlock() setelahnya."
        };
      }
      if (!hasCall) {
        return {
          success: false,
          output: "tarikDaya belum dipanggil dengan 50",
          error: "Panggil fungsi tarikDaya(50) di func main()!",
          diagnostics: "Tarik daya sebesar 50 agar saldo berkurang dari 250 menjadi 200."
        };
      }
      logs.push("Saldo Brankas Aman: 200");
      break;
    }

    case 13: { // Core Meltdown Recovery (Error & Defer)
      const hasDefer = /defer\s+fmt\.Println\s*\(\s*["']Katup Darurat Berhasil Ditutup["']\s*\)/.test(cleanCode);
      const hasErrCheck = /if\s+err\s*!=\s*nil/.test(cleanCode);

      if (!hasDefer) {
        return {
          success: false,
          output: "Katup darurat gagal tertutup saat prosedur selesai!",
          error: "Instruksi penutupan katup belum di-defer!",
          diagnostics: "Pasang defer di awal fungsi main: defer fmt.Println(\"Katup Darurat Berhasil Ditutup\")."
        };
      }
      if (!hasErrCheck) {
        return {
          success: false,
          output: "Error sensor diabaikan...",
          error: "Pola penanganan error if err != nil belum dipasang!",
          diagnostics: "Periksa apakah hasil periksaSuhu(120) mengembalikan error, lalu cetak pesannya."
        };
      }
      logs.push("BAHAYA: Reaktor Overheat\nKatup Darurat Berhasil Ditutup");
      break;
    }

    case 14: { // Cloud Gateway & REST API
      const hasJsonMarshal = /json\.Marshal\s*\(\s*data\s*\)/.test(cleanCode);
      const hasStringCast = /string\s*\(\s*jsonData\s*\)/.test(cleanCode);

      if (!hasJsonMarshal) {
        return {
          success: false,
          output: "Payload belum diubah ke format JSON",
          error: "Gunakan json.Marshal(data) untuk serialisasi struct!",
          diagnostics: "Panggil fungsi json.Marshal(data) dari pustaka 'encoding/json'."
        };
      }
      if (!hasStringCast) {
        return {
          success: false,
          output: "buffer bytes mentah",
          error: "Hasil json.Marshal bertipe []byte, belum diubah ke string!",
          diagnostics: "Ubah byte buffer menjadi string dengan string(jsonData) sebelum dicetak."
        };
      }
      logs.push(`{"status":"ONLINE","server":"Gopher-HQ"}`);
      break;
    }

    default:
      logs.push(level.expectedOutput || "Program executed successfully");
  }

  return {
    success: true,
    output: logs.join("\n"),
    diagnostics: "Semua pengujian lolos! Logika kode kamu berhasil memecahkan tantangan misi."
  };
}
