/**
 * GopherQuest 2D - Kurikulum Lengkap 14 Level Golang (Tingkat Menengah - Latihan Analisis Logika)
 * 
 * Desain Soal Ditingkatkan:
 * - Menuntut analisis alur eksekusi, perhitungan data, dan kondisi logika.
 * - Contoh materi (codeSample) tetap mengajarkan konsep dasar dengan analogi ramah.
 * - Soal misi (mission) memberikan problem solving teknis nyata di fasilitas server.
 */

export const LEVELS_DATA = [
  {
    id: 1,
    category: "Beginner",
    categoryColor: "blue",
    title: "Booting The Core",
    subtitle: "Urutan Inisialisasi & Multiple Output",
    story: "Ruang server utama padam total akibat lonjakan listrik darurat. Sebagai Lead Engineer, kamu harus menyusun urutan boot sequence 3 tahap untuk membangkitkan fasilitas secara bertahap!",
    gopherQuote: "Perhatikan urutan eksekusi: komputer menjalankan instruksi baris per baris dari atas ke bawah di dalam func main(). Susun urutan boot log yang diminta!",
    concepts: [
      {
        badge: "Fondasi 1",
        name: "package main",
        desc: "Memberitahu compiler Go bahwa file ini adalah executable mandiri yang akan dieksekusi langsung.",
        code: "package main"
      },
      {
        badge: "Fondasi 2",
        name: "import \"fmt\"",
        desc: "Pustaka Format standar Go untuk menampilkan teks dan data ke konsol terminal.",
        code: 'import "fmt"'
      },
      {
        badge: "Fondasi 3",
        name: "Urutan Baris (Top to Bottom)",
        desc: "Setiap panggilan fmt.Println akan mencetak teks di baris baru secara berurutan sesuai posisinya di dalam func main().",
        code: "fmt.Println(\"Baris 1\")\nfmt.Println(\"Baris 2\")"
      }
    ],
    // CONTOH: Kasir Warkop (Konteks berbeda)
    codeSample: `package main

import "fmt"

func main() {
    // Contoh mencetak struk transaksi warkop:
    fmt.Println("=== KAFE GOPHER ===")
    fmt.Println("Item: Kopi Tubruk")
    fmt.Println("Status: LUNAS")
}`,
    proTip: {
      title: "Println vs Print",
      content: "fmt.Println otomatis menambahkan karakter ganti baris (newline) di akhir teks. Jadi setiap kali memanggil Println, teks berikutnya akan turun ke baris baru!"
    },
    analogy: {
      icon: "☕",
      headline: "Analogi Daftar Antrean Masak di Dapur",
      story: "Eksekusi kode itu seperti koki memasak pesanan:\n• Koki membaca nota dari urutan paling atas.\n• 'Nyalakan kompor' dulu, baru 'rebus air', baru 'tuang kopi'.\nJika urutan barismu terbalik, kopinya tumpah ke kompor dingin!",
      takeaway: "Urutan baris instruksi menentukan alur kerja sistem."
    },
    mission: {
      objective: "Susun 3 baris cetak di dalam func main() secara berurutan persis:\n1. \"Booting Core...\"\n2. \"Status: READY\"\n3. \"Menyalakan Listrik\"",
      targetText: "Booting Core...\nStatus: READY\nMenyalakan Listrik",
      expectedOutput: "Booting Core...\nStatus: READY\nMenyalakan Listrik",
      visualTarget: "Nyalakan lampu indikator dan server rack"
    },
    missionVariants: [
      {
        objective: 'Sistem mesin kopi otomatis. Susun 3 baris cetak: 1. "Siapkan Gelas" 2. "Tuang Kopi" 3. "Tambahkan Susu"',
        targetText: `Siapkan Gelas
Tuang Kopi
Tambahkan Susu`,
        expectedOutput: `Siapkan Gelas
Tuang Kopi
Tambahkan Susu`,
        expectedLines: ["fmt.Println(\"Siapkan Gelas\")", "fmt.Println(\"Tuang Kopi\")", "fmt.Println(\"Tambahkan Susu\")"],
        starterCode: `package main

import "fmt"

func main() {
    // Susun instruksi mesin kopi:
    
}
`,
        visualTarget: 'Mesin kopi menyeduh minuman otomatis'
      },
      {
        objective: 'Peluncuran roket luar angkasa. Cetak berurutan: 1. "Hitung Mundur: 3..." 2. "Mesin Menyala" 3. "Roket Meluncur"',
        targetText: `Hitung Mundur: 3...
Mesin Menyala
Roket Meluncur`,
        expectedOutput: `Hitung Mundur: 3...
Mesin Menyala
Roket Meluncur`,
        expectedLines: ["fmt.Println(\"Hitung Mundur: 3...\")", "fmt.Println(\"Mesin Menyala\")", "fmt.Println(\"Roket Meluncur\")"],
        starterCode: `package main

import "fmt"

func main() {
    // Susun instruksi peluncuran roket:
    
}
`,
        visualTarget: 'Roket meluncur ke luar angkasa'
      },
      {
        objective: 'Alarm pagi ceria. Cetak urutan: 1. "Alarm Berbunyi" 2. "Matikan Alarm" 3. "Bangun Tidur"',
        targetText: `Alarm Berbunyi
Matikan Alarm
Bangun Tidur`,
        expectedOutput: `Alarm Berbunyi
Matikan Alarm
Bangun Tidur`,
        expectedLines: ["fmt.Println(\"Alarm Berbunyi\")", "fmt.Println(\"Matikan Alarm\")", "fmt.Println(\"Bangun Tidur\")"],
        starterCode: `package main

import "fmt"

func main() {
    // Susun aktivitas pagi:
    
}
`,
        visualTarget: 'Karakter bangun tidur dengan segar'
      }
    ],
    starterCode: `package main

import "fmt"

func main() {
    // Susun 3 tahap inisialisasi boot server secara berurutan:
    
}
`,
    expectedOutput: "Booting Core...\nStatus: READY\nMenyalakan Listrik",
    solutionCode: `package main

import "fmt"

func main() {
    fmt.Println("Booting Core...")
    fmt.Println("Status: READY")
    fmt.Println("Menyalakan Listrik")
}
`,
    hint: "Panggil fmt.Println sebanyak 3 kali dengan string yang diminta secara berurutan.",
    sceneType: "server_room",
    visualGoal: "Nyalakan lampu indikator dan server rack"
  },
  {
    id: 2,
    category: "Beginner",
    categoryColor: "blue",
    title: "Power Grid & Voltage",
    subtitle: "Kalkulasi Daya (Formula Aritmatika)",
    story: "Daya reaktor tidak seimbang. Baterai cadangan memiliki kapasitas awal, namun server menyerap daya konstan selama beberapa jam. Hitung sisa daya dengan rumus formula yang tepat!",
    gopherQuote: "Jangan cuma isi angka mati; gunakan variabel untuk menampung rumus perhitungan: sisa = kapasitas - (beban * durasi)!",
    concepts: [
      {
        badge: "Variabel & Rumus",
        name: "Perhitungan Aritmatika",
        desc: "Go memprioritaskan operasi perkalian (*) sebelum pengurangan (-). Gunakan tanda kurung jika ingin memperjelas urutan.",
        code: "hasil := total - (pakai * jam)"
      },
      {
        badge: "Short Declaration",
        name: "Operator :=",
        desc: "Membuat variabel baru sekaligus mengisinya dengan hasil kalkulasi matematika.",
        code: "sisaDaya := 200 - 90"
      }
    ],
    // CONTOH: Penghitungan Biaya Parkir (Konteks berbeda)
    codeSample: `package main

import "fmt"

func main() {
    // Contoh menghitung biaya parkir:
    tarifPerJam := 3000
    lamaParkir := 4
    totalBiaya := tarifPerJam * lamaParkir

    fmt.Println("Total Parkir:", totalBiaya) // 12000
}`,
    proTip: {
      title: "Variabel yang Tidak Dipakai",
      content: "Di Go, jika kamu membuat variabel baru tapi lupa memakainya dalam operasi atau mencetaknya, program akan error saat dikompilasi!"
    },
    analogy: {
      icon: "🔋",
      headline: "Analogi Saldo Baterai Powerbank",
      story: "Kamu punya powerbank kapasitas 200 mAh:\n• Setiap jam HP kamu menyedot 45 mAh.\n• Jika kamu cas selama 2 jam, total daya terpakai adalah 45 x 2 = 90 mAh.\n• Sisa daya powerbank kamu tinggal 200 - 90 = 110 mAh!",
      takeaway: "Gunakan variabel perantara agar logika perhitungannya transparan dan mudah diperiksa."
    },
    mission: {
      objective: "Deklarasikan variabel 'kapasitas' bernilai 200, 'beban' bernilai 45, dan 'durasi' bernilai 2. Hitung 'sisaDaya' dengan rumus: kapasitas - (beban * durasi). Cetak teks \"Sisa Daya: \" diikuti variabel sisaDaya (target output: Sisa Daya: 110)!",
      targetText: "Sisa Daya: 110",
      expectedOutput: "Sisa Daya: 110",
      visualTarget: "Stabilkan meteran voltase generator daya ke angka 100%"
    },
    missionVariants: [
      {
        objective: 'Deklarasikan \'stok\' = 500, \'terjual\' = 20, \'hari\' = 7. Hitung \'sisaStok\' = stok - (terjual * hari). Cetak "Sisa Stok: " diikuti nilai sisaStok (output: Sisa Stok: 360)!',
        targetText: 'Sisa Stok: 360',
        expectedOutput: 'Sisa Stok: 360',
        starterCode: `package main

import "fmt"

func main() {
    // Hitung sisa stok barang:
    
}
`,
        visualTarget: 'Update papan gudang menjadi 360'
      },
      {
        objective: 'Deklarasikan \'saldo\' = 100000, \'tarif\' = 15000, \'gerbang\' = 3. Hitung \'sisaSaldo\' = saldo - (tarif * gerbang). Cetak "Sisa Saldo: " diikuti sisaSaldo!',
        targetText: 'Sisa Saldo: 55000',
        expectedOutput: 'Sisa Saldo: 55000',
        starterCode: `package main

import "fmt"

func main() {
    // Hitung sisa saldo tol:
    
}
`,
        visualTarget: 'Gerbang tol terbuka dengan saldo berkurang'
      },
      {
        objective: 'Deklarasikan \'bensin\' = 50, \'konsumsi\' = 5, \'jam\' = 8. Hitung \'sisaBensin\' = bensin - (konsumsi * jam). Cetak "Sisa Bensin: " diikuti sisaBensin!',
        targetText: 'Sisa Bensin: 10',
        expectedOutput: 'Sisa Bensin: 10',
        starterCode: `package main

import "fmt"

func main() {
    // Hitung sisa bahan bakar:
    
}
`,
        visualTarget: 'Jarum indikator bensin mobil turun ke angka 10'
      }
    ],
    starterCode: `package main

import "fmt"

func main() {
    // 1. Buat variabel kapasitas := 200
    // 2. Buat variabel beban := 45
    // 3. Buat variabel durasi := 2
    // 4. Hitung sisaDaya := kapasitas - (beban * durasi)
    // 5. Cetak: fmt.Println("Sisa Daya:", sisaDaya)
    
}
`,
    expectedOutput: "Sisa Daya: 110",
    solutionCode: `package main

import "fmt"

func main() {
    kapasitas := 200
    beban := 45
    durasi := 2
    sisaDaya := kapasitas - (beban * durasi)
    fmt.Println("Sisa Daya:", sisaDaya)
}
`,
    hint: "Deklarasikan keempat variabel tersebut lalu gunakan fmt.Println(\"Sisa Daya:\", sisaDaya).",
    sceneType: "power_generator",
    visualGoal: "Stabilkan meteran voltase generator daya ke angka 100%"
  },
  {
    id: 3,
    category: "Beginner",
    categoryColor: "blue",
    title: "Firewall Security Gate",
    subtitle: "Otorisasi Multi-Kriteria (Logika && / AND)",
    story: "Gerbang laser keamanan memerlukan autentikasi ganda: token otorisasi kode DAN level izin akses. Jika hanya satu yang cocok, akses tetap ditolak!",
    gopherQuote: "Gunakan operator logika '&&' (AND) untuk memastikan DUA syarat terpenuhi sekaligus sebelum pintu terbuka!",
    concepts: [
      {
        badge: "Logika AND",
        name: "Operator &&",
        desc: "Kondisi hanya bernilai true jika syarat di kiri DAN syarat di kanan sama-sama bernilai benar.",
        code: "if kode == \"ABC\" && level >= 2"
      },
      {
        badge: "Percabangan",
        name: "if - else if - else",
        desc: "Menguji beberapa skenario bertingkat secara berurutan hingga salah satu kondisi terpenuhi.",
        code: "} else if level < 2 {\n    // ...\n}"
      }
    ],
    // CONTOH: Syarat Masuk Wahana Ekstrem (Konteks berbeda)
    codeSample: `package main

import "fmt"

func main() {
    // Contoh verifikasi wahana roller coaster:
    tinggiBadan := 160
    punyaTiket := true

    if tinggiBadan >= 150 && punyaTiket {
        fmt.Println("Status: DIPERSILAKAN NAIK")
    } else {
        fmt.Println("Status: DILARANG NAIK")
    }
}`,
    proTip: {
      title: "Operator Perbandingan di Go",
      content: "Gunakan '==' untuk membandingkan kesamaan, '!=' untuk tidak sama, dan '>=' untuk lebih besar sama dengan."
    },
    analogy: {
      icon: "🚪",
      headline: "Analogi Pintu Bank dengan Dua Kunci",
      story: "Pintu brankas bank punya 2 lubang kunci:\n• Kunci 1 dipegang Kepala Cabang (Token Kode).\n• Kunci 2 dipegang Satpam Senior (Level Izin).\nJika satpam tidak hadir meski kuncinya benar, pintu brankas tetap mengunci!",
      takeaway: "Logika '&&' menjamin keamanan maksimal dengan memvalidasi banyak syarat."
    },
    mission: {
      objective: "Diberikan variabel 'token' (\"GOPHER-SEC\") dan 'izinLevel' (4). Jika token == \"GOPHER-SEC\" dan izinLevel >= 3, cetak \"AKSES OTORISASI DITERIMA\". Jika tidak, cetak \"AKSES DITOLAK\".",
      targetText: "AKSES OTORISASI DITERIMA",
      expectedOutput: "AKSES OTORISASI DITERIMA",
      visualTarget: "Nonaktifkan laser gerbang merah menjadi hijau"
    },
    missionVariants: [
      {
        objective: 'Diberikan \'tiket\' ("VIP-PASS") dan \'umur\' (20). Jika tiket == "VIP-PASS" && umur >= 18, cetak "AKSES VIP DIBERIKAN", selain itu "AKSES DITOLAK".',
        targetText: 'AKSES VIP DIBERIKAN',
        expectedOutput: 'AKSES VIP DIBERIKAN',
        starterCode: `package main

import "fmt"

func main() {
    tiket := "VIP-PASS"
    umur := 20
    
}
`,
        visualTarget: 'Pintu klub malam terbuka untuk VIP'
      },
      {
        objective: 'Diberikan \'kunci\' ("KODE-RAHASIA") dan \'sidikJari\' (true). Jika kunci == "KODE-RAHASIA" && sidikJari, cetak "BRANKAS TERBUKA", selain itu "BRANKAS TERKUNCI".',
        targetText: 'BRANKAS TERBUKA',
        expectedOutput: 'BRANKAS TERBUKA',
        starterCode: `package main

import "fmt"

func main() {
    kunci := "KODE-RAHASIA"
    sidikJari := true
    
}
`,
        visualTarget: 'Pintu brankas bank terbuka otomatis'
      },
      {
        objective: 'Diberikan \'status\' ("AMAN") dan \'suhu\' (80). Jika status == "AMAN" && suhu < 100, cetak "SISTEM NORMAL", selain itu "PERINGATAN BAHAYA".',
        targetText: 'SISTEM NORMAL',
        expectedOutput: 'SISTEM NORMAL',
        starterCode: `package main

import "fmt"

func main() {
    status := "AMAN"
    suhu := 80
    
}
`,
        visualTarget: 'Layar monitor menunjukkan status hijau'
      }
    ],
    starterCode: `package main

import "fmt"

func main() {
    token := "GOPHER-SEC"
    izinLevel := 4

    // Buat logika percabangan if-else dengan operator &&:
    // Jika token cocok dan izinLevel >= 3 -> cetak "AKSES OTORISASI DITERIMA"
    // Selain itu -> cetak "AKSES DITOLAK"
    
}
`,
    expectedOutput: "AKSES OTORISASI DITERIMA",
    solutionCode: `package main

import "fmt"

func main() {
    token := "GOPHER-SEC"
    izinLevel := 4

    if token == "GOPHER-SEC" && izinLevel >= 3 {
        fmt.Println("AKSES OTORISASI DITERIMA")
    } else {
        fmt.Println("AKSES DITOLAK")
    }
}
`,
    hint: "Gunakan: if token == \"GOPHER-SEC\" && izinLevel >= 3 { fmt.Println(\"AKSES OTORISASI DITERIMA\") } else { ... }",
    sceneType: "security_gate",
    visualGoal: "Nonaktifkan laser gerbang merah menjadi hijau"
  },
  {
    id: 4,
    category: "Beginner",
    categoryColor: "blue",
    title: "Reactor Cooling Loop",
    subtitle: "Looping dengan Filter Kondisi di Dalamnya",
    story: "Suhu turbin reaktor dipantau dari 85°C hingga 100°C dengan kenaikan 5°C setiap siklus. Sensor harus menyaring dan memberikan tanda bahaya jika suhu melewati 90°C!",
    gopherQuote: "Kombinasikan for loop dengan if-else di dalamnya untuk mengklasifikasikan data di setiap putaran!",
    concepts: [
      {
        badge: "Kenaikan Kustom",
        name: "Step Increment (+= 5)",
        desc: "Counter loop tidak harus naik 1 per 1. Kamu bisa menaikkannya per 5 atau angka lain menggunakan 'suhu += 5'.",
        code: "for s := 85; s <= 100; s += 5"
      },
      {
        badge: "Filter di Loop",
        name: "Nested If di dalam For",
        desc: "Mengevaluasi kondisi spesifik untuk setiap nilai putaran loop saat ini.",
        code: "if s > 90 {\n    fmt.Println(\"Panas\")\n}"
      }
    ],
    // CONTOH: Penghitungan Angka Genap / Ganjil (Konteks berbeda)
    codeSample: `package main

import "fmt"

func main() {
    // Contoh memfilter angka genap:
    for angka := 1; angka <= 5; angka++ {
        if angka%2 == 0 {
            fmt.Println(angka, "adalah GENAP")
        } else {
            fmt.Println(angka, "adalah GANJIL")
        }
    }
}`,
    proTip: {
      title: "Variabel Lingkup Loop",
      content: "Variabel counter yang dideklarasikan di dalam header 'for' (misal: 'suhu := 85') hanya bisa diakses di dalam blok kurung kurawal loop tersebut."
    },
    analogy: {
      icon: "🌡️",
      headline: "Analogi Termometer Air Mendidih",
      story: "Kamu memasak air dari suhu 85°C:\n• Di 85°C dan 90°C: air masih aman.\n• Begitu naik ke 95°C dan 100°C: uap panas menyembur keras (Kondisi Kritis)!\nSensor membunyikan peluit hanya saat air mendekati titik didih.",
      takeaway: "Filter di dalam loop memisahkan data normal dari anomali berbahaya."
    },
    mission: {
      objective: "Buat loop dari suhu := 85; suhu <= 100; suhu += 5. Di setiap putaran, jika suhu > 90 cetak \"KRITIS:\" diikuti suhu. Jika tidak, cetak \"NORMAL:\" diikuti suhu.",
      targetText: "NORMAL: 85, NORMAL: 90, KRITIS: 95, KRITIS: 100",
      expectedOutput: "NORMAL: 85\nNORMAL: 90\nKRITIS: 95\nKRITIS: 100",
      visualTarget: "Putar turbin pendingin 3 putaran hingga uap es keluar"
    },
    missionVariants: [
      {
        objective: 'Loop i dari 10 hingga 50 (i += 10). Jika i > 30, cetak "AWAS: i", selain itu "AMAN: i".',
        targetText: `AMAN: 10
AMAN: 20
AMAN: 30
AWAS: 40
AWAS: 50`,
        expectedOutput: `AMAN: 10
AMAN: 20
AMAN: 30
AWAS: 40
AWAS: 50`,
        starterCode: `package main

import "fmt"

func main() {
    
}
`,
        visualTarget: 'Pompa air mengatur debit otomatis'
      },
      {
        objective: 'Loop kecepatan dari 60 hingga 120 (kecepatan += 20). Jika kecepatan >= 100, cetak "TILANG: kecepatan", selain itu "NORMAL: kecepatan".',
        targetText: `NORMAL: 60
NORMAL: 80
TILANG: 100
TILANG: 120`,
        expectedOutput: `NORMAL: 60
NORMAL: 80
TILANG: 100
TILANG: 120`,
        starterCode: `package main

import "fmt"

func main() {
    
}
`,
        visualTarget: 'Kamera jalan raya mendeteksi mobil ngebut'
      },
      {
        objective: 'Loop baterai dari 10 hingga 30 (baterai += 5). Jika baterai < 20, cetak "LOW: baterai", selain itu "OK: baterai".',
        targetText: `LOW: 10
LOW: 15
OK: 20
OK: 25
OK: 30`,
        expectedOutput: `LOW: 10
LOW: 15
OK: 20
OK: 25
OK: 30`,
        starterCode: `package main

import "fmt"

func main() {
    
}
`,
        visualTarget: 'Indikator baterai handphone mengisi daya'
      }
    ],
    starterCode: `package main

import "fmt"

func main() {
    // Loop dari suhu := 85; suhu <= 100; suhu += 5
    // Jika suhu > 90 -> fmt.Println("KRITIS:", suhu)
    // Selain itu -> fmt.Println("NORMAL:", suhu)
    
}
`,
    expectedOutput: "NORMAL: 85\nNORMAL: 90\nKRITIS: 95\nKRITIS: 100",
    solutionCode: `package main

import "fmt"

func main() {
    for suhu := 85; suhu <= 100; suhu += 5 {
        if suhu > 90 {
            fmt.Println("KRITIS:", suhu)
        } else {
            fmt.Println("NORMAL:", suhu)
        }
    }
}
`,
    hint: "Gunakan for suhu := 85; suhu <= 100; suhu += 5 dengan percabangan if suhu > 90 di dalamnya.",
    sceneType: "cooling_fan",
    visualGoal: "Putar turbin pendingin 3 putaran hingga uap es keluar"
  },
  {
    id: 5,
    category: "Intermediate",
    categoryColor: "indigo",
    title: "Energy Converter Modules",
    subtitle: "Fungsi Kalkulasi dengan Return Status Dinamis",
    story: "Modul konverter butuh memproses bahan mentah energi dan menentukan status mutu efisiensi. Rancang fungsi yang menghitung daya bersih dan mengevaluasi status mutunya!",
    gopherQuote: "Di dalam fungsi, hitung daya bersih dari rumus persentase, lalu tentukan apakah statusnya 'OPTIMAL' atau 'RENDAH' menggunakan percabangan return!",
    concepts: [
      {
        badge: "Kalkulasi Fungsi",
        name: "Perhitungan di Body Fungsi",
        desc: "Fungsi dapat melakukan serangkaian perhitungan sebelum memutuskan nilai apa yang akan dikembalikan.",
        code: "bersih := (watt * efisiensi) / 100"
      },
      {
        badge: "Multiple Returns Dinamis",
        name: "Return Bersyarat",
        desc: "Kamu bisa menggunakan if-else di dalam fungsi untuk mengembalikan string status yang berbeda.",
        code: "if bersih >= 100 {\n    return bersih, \"OPTIMAL\"\n}"
      }
    ],
    // CONTOH: Penghitung Pajak & Grade Gaji (Konteks berbeda)
    codeSample: `package main

import "fmt"

// Contoh fungsi menghitung gaji bersih dan kategori grade:
func hitungGaji(kotor int, potongPajak int) (int, string) {
    bersih := kotor - potongPajak
    if bersih > 5000000 {
        return bersih, "GRADE-A"
    }
    return bersih, "GRADE-B"
}

func main() {
    gaji, grade := hitungGaji(7000000, 1000000)
    fmt.Println("Gaji Bersih:", gaji, "Kategori:", grade)
}`,
    proTip: {
      title: "Multiple Return di Go",
      content: "Go sangat terkenal dengan multiple return values. Ini adalah cara resmi Go mengembalikan data hasil beserta status atau error tanpa butuh try-catch!"
    },
    analogy: {
      icon: "⚡",
      headline: "Analogi Uji Kelayakan Baterai di Pabrik",
      story: "Alat tester baterai menerima bahan energi:\n• Menghitung daya murni setelah dikurangi hambatan kawat.\n• Jika daya murni >= 100 Watt -> stempel 'OPTIMAL'.\n• Jika kurang -> stempel 'RENDAH'.\nPenguji membawa pulang hasil angka watt DAN label stempelnya sekaligus!",
      takeaway: "Fungsi menyatukan pemrosesan logika agar bisa digunakan berulang-ulang."
    },
    mission: {
      objective: "Buat fungsi 'prosesEnergi(watt int, efisiensi int) (int, string)'. Hitung dayaBersih := (watt * efisiensi) / 100. Jika dayaBersih >= 100, kembalikan dayaBersih dan \"OPTIMAL\". Jika kurang, kembalikan dayaBersih dan \"RENDAH\". Di func main(), panggil prosesEnergi(150, 80) dan cetak hasilnya (output: 120 OPTIMAL)!",
      targetText: "120 OPTIMAL",
      expectedOutput: "120 OPTIMAL",
      visualTarget: "Hubungkan dua pipa konverter energi menuju stasiun pusat"
    },
    missionVariants: [
      {
        objective: 'Buat fungsi hitungGaji(kotor int, potongan int) (int, string). bersih = kotor - potongan. Jika bersih >= 5000, return bersih dan "TINGGI", selain itu "STANDAR". Panggil hitungGaji(7000, 1000) dan cetak hasilnya.',
        targetText: '6000 TINGGI',
        expectedOutput: '6000 TINGGI',
        starterCode: `package main

import "fmt"

// Buat fungsi hitungGaji:

func main() {
    
}
`,
        visualTarget: 'Mesin ATM mengeluarkan uang lembaran'
      },
      {
        objective: 'Buat fungsi cekKelulusan(tugas int, ujian int) (int, string). total = tugas + ujian. Jika total >= 80, return total dan "LULUS", selain itu "REMEDIAL". Panggil cekKelulusan(40, 45) dan cetak hasilnya.',
        targetText: '85 LULUS',
        expectedOutput: '85 LULUS',
        starterCode: `package main

import "fmt"

// Buat fungsi cekKelulusan:

func main() {
    
}
`,
        visualTarget: 'Raport siswa dicetak dengan stempel lulus'
      },
      {
        objective: 'Buat fungsi hitungJarak(bensin int, efisiensi int) (int, string). jarak = bensin * efisiensi. Jika jarak >= 100, return jarak dan "JAUH", selain itu "DEKAT". Panggil hitungJarak(10, 12) dan cetak hasilnya.',
        targetText: '120 JAUH',
        expectedOutput: '120 JAUH',
        starterCode: `package main

import "fmt"

// Buat fungsi hitungJarak:

func main() {
    
}
`,
        visualTarget: 'Mobil balap melaju di lintasan panjang'
      }
    ],
    starterCode: `package main

import "fmt"

// 1. Lengkapi fungsi prosesEnergi:
func prosesEnergi(watt int, efisiensi int) (int, string) {
    dayaBersih := (watt * efisiensi) / 100
    if dayaBersih >= 100 {
        return dayaBersih, "OPTIMAL"
    }
    return dayaBersih, "RENDAH"
}

func main() {
    // 2. Panggil prosesEnergi dengan parameter (150, 80)
    // 3. Cetak kedua nilai returnnya ke konsol:
    
}
`,
    expectedOutput: "120 OPTIMAL",
    solutionCode: `package main

import "fmt"

func prosesEnergi(watt int, efisiensi int) (int, string) {
    dayaBersih := (watt * efisiensi) / 100
    if dayaBersih >= 100 {
        return dayaBersih, "OPTIMAL"
    }
    return dayaBersih, "RENDAH"
}

func main() {
    hasil, status := prosesEnergi(150, 80)
    fmt.Println(hasil, status)
}
`,
    hint: "Di main(): hasil, status := prosesEnergi(150, 80) lalu fmt.Println(hasil, status)",
    sceneType: "power_converter",
    visualGoal: "Hubungkan dua pipa konverter energi menuju stasiun pusat"
  },
  {
    id: 6,
    category: "Intermediate",
    categoryColor: "indigo",
    title: "Server Rack Storage",
    subtitle: "Iterasi Slice & Akumulasi Overload (Range)",
    story: "Cluster server menyimpan data kapasitas beban beberapa node. Kamu harus melakukan audit menyeluruh menggunakan loop range untuk menghitung berapa server yang mengalami overload!",
    gopherQuote: "Gunakan 'for _, beban := range daftarBeban' untuk membaca setiap angka beban satu per satu dan hitung berapa yang melebihi batas!",
    concepts: [
      {
        badge: "Iterasi Koleksi",
        name: "for index, val := range slice",
        desc: "Cara paling idiomatis di Go untuk membaca seluruh item di dalam Slice. Gunakan '_' jika tidak butuh index-nya.",
        code: "for _, angka := range data {\n    // ...\n}"
      },
      {
        badge: "Akumulator",
        name: "Counter Pola Hitung",
        desc: "Inisialisasi variabel counter = 0 di luar loop, lalu tambahkan counter++ setiap kali kondisi terpenuhi.",
        code: "if angka > 75 {\n    total++\n}"
      }
    ],
    // CONTOH: Menyaring Nilai Lulus Ujian (Konteks berbeda)
    codeSample: `package main

import "fmt"

func main() {
    daftarNilai := []int{65, 80, 55, 90, 75}
    lulusCount := 0

    // Looping dengan range untuk menghitung yang lulus:
    for _, nilai := range daftarNilai {
        if nilai >= 70 {
            lulusCount++
        }
    }

    fmt.Println("Total Siswa Lulus:", lulusCount) // 3
}`,
    proTip: {
      title: "Blank Identifier pada Range",
      content: "Range menghasilkan dua nilai: indeks dan elemen. Jika kamu tidak membutuhkan indeks, wajib ganti variabel pertama dengan tanda '_' agar compiler tidak komplain!"
    },
    analogy: {
      icon: "📦",
      headline: "Analogi Petugas Sortir Paket Bandara",
      story: "Petugas berdiri di sisi sabuk konveyor bagasi:\n• Setiap koper yang lewat ditimbang satu-satu (looping range).\n• Jika berat koper > 20 kg (kondisi overload), petugas mencatat di kertas checklist (+1).\nDi akhir penerbangan, petugas tahu persis berapa koper yang kena denda kelebihan muatan!",
      takeaway: "Range memudahkan inspeksi setiap elemen data secara otomatis."
    },
    mission: {
      objective: "Diberikan slice 'bebanNodes := []int{45, 88, 30, 95, 60}'. Buat loop range untuk menghitung berapa banyak node yang memiliki beban > 75. Cetak teks \"Node Overload: \" diikuti jumlahnya (target output: Node Overload: 2)!",
      targetText: "Node Overload: 2",
      expectedOutput: "Node Overload: 2",
      visualTarget: "Pasang 3 unit server rack (Alpha, Beta, Gamma) ke kabinet"
    },
    missionVariants: [
      {
        objective: 'Diberikan umurTamu := []int{15, 20, 12, 25, 18}. Hitung berapa banyak tamu yang umur >= 18. Cetak "Tamu Dewasa: " diikuti jumlahnya.',
        targetText: 'Tamu Dewasa: 3',
        expectedOutput: 'Tamu Dewasa: 3',
        starterCode: `package main

import "fmt"

func main() {
    umurTamu := []int{15, 20, 12, 25, 18}
    
}
`,
        visualTarget: 'Penjaga tiket mengizinkan tamu dewasa masuk'
      },
      {
        objective: 'Diberikan hargaMenu := []int{45000, 60000, 30000, 55000, 20000}. Hitung berapa menu yang harganya > 50000. Cetak "Menu Mahal: " diikuti jumlahnya.',
        targetText: 'Menu Mahal: 2',
        expectedOutput: 'Menu Mahal: 2',
        starterCode: `package main

import "fmt"

func main() {
    hargaMenu := []int{45000, 60000, 30000, 55000, 20000}
    
}
`,
        visualTarget: 'Kasir restoran mencetak struk mahal'
      },
      {
        objective: 'Diberikan kecepatan := []int{60, 90, 75, 105, 50}. Hitung kendaraan yang kecepatan > 80. Cetak "Pelanggaran: " diikuti jumlahnya.',
        targetText: 'Pelanggaran: 2',
        expectedOutput: 'Pelanggaran: 2',
        starterCode: `package main

import "fmt"

func main() {
    kecepatan := []int{60, 90, 75, 105, 50}
    
}
`,
        visualTarget: 'Kamera polisi menangkap pelanggar kecepatan'
      }
    ],
    starterCode: `package main

import "fmt"

func main() {
    bebanNodes := []int{45, 88, 30, 95, 60}
    overloadCount := 0

    // 1. Buat loop range untuk memeriksa bebanNodes:
    // 2. Jika beban > 75, tambahkan overloadCount++
    

    // 3. Cetak hasil hitungan:
    fmt.Println("Node Overload:", overloadCount)
}
`,
    expectedOutput: "Node Overload: 2",
    solutionCode: `package main

import "fmt"

func main() {
    bebanNodes := []int{45, 88, 30, 95, 60}
    overloadCount := 0

    for _, beban := range bebanNodes {
        if beban > 75 {
            overloadCount++
        }
    }

    fmt.Println("Node Overload:", overloadCount)
}
`,
    hint: "Gunakan: for _, beban := range bebanNodes { if beban > 75 { overloadCount++ } }",
    sceneType: "server_rack",
    visualGoal: "Pasang 3 unit server rack (Alpha, Beta, Gamma) ke kabinet"
  },
  {
    id: 7,
    category: "Intermediate",
    categoryColor: "indigo",
    title: "Hardware Direct Memory",
    subtitle: "Kalibrasi Nilai Memori Fisik via Pointer (* & &)",
    story: "Register memori hardware mengalami lonjakan angka bahaya (999). Kamu harus merancang fungsi kalibrasi yang menerima alamat memori dan langsung mereset nilainya ke 100 hanya jika angka saat ini melebihi ambang batas aman!",
    gopherQuote: "Gunakan operator dereference (*) di dalam fungsi untuk memeriksa dan menimpa nilai asli di memori!",
    concepts: [
      {
        badge: "Pointer Parameter",
        name: "func ubah(target *int)",
        desc: "Fungsi yang menerima parameter pointer memiliki wewenang untuk mengubah variabel pemanggil aslinya.",
        code: "func reset(p *int) {\n    *p = 100\n}"
      },
      {
        badge: "Address Operator",
        name: "Simbol & (Alamat)",
        desc: "Menyematkan '&' di depan variabel saat memanggil fungsi untuk mengirimkan alamat memorinya.",
        code: "reset(&variabelAsli)"
      }
    ],
    // CONTOH: Mengisi Ulang Baterai HP (Konteks berbeda)
    codeSample: `package main

import "fmt"

// Contoh fungsi mengisi baterai langsung ke sumbernya:
func casBaterai(baterai *int, dayaCas int) {
    *baterai = *baterai + dayaCas
    if *baterai > 100 {
        *baterai = 100 // Batas maksimal
    }
}

func main() {
    dayaHP := 70
    casBaterai(&dayaHP, 50)
    fmt.Println("Baterai Sekarang:", dayaHP) // 100
}`,
    proTip: {
      title: "Perbedaan * dan &",
      content: "& digunakan saat MEMBUAT pointer / mengoper alamat ke fungsi. * digunakan di dalam fungsi untuk MEMBACA atau MENGUBAH isi memori tersebut!"
    },
    analogy: {
      icon: "🛠️",
      headline: "Analogi Kunci Teknisi Brankas",
      story: "Brankas kantor error menunjukkan angka pin rusak:\n• Jika kamu mencatat angkanya di kertas lalu coret kertasnya, brankas aslinya tetap macet!\n• Kamu memberikan kunci master (&brankas) ke teknisi. Teknisi membuka penutup brankas (*brankas) dan memutar roda gigi digitalnya langsung ke angka 100.",
      takeaway: "Pointer memanipulasi hardware langsung di lokasi memorinya tanpa duplikasi."
    },
    mission: {
      objective: "Buat fungsi 'kalibrasiChip(chip *int, batas int)' yang memeriksa: jika *chip > batas, ubah nilainya menjadi 100 (*chip = 100). Di func main(), panggil kalibrasiChip(&statusChip, 500), lalu cetak statusChip!",
      targetText: "Chip Status: 100",
      expectedOutput: "Chip Status: 100",
      visualTarget: "Reset register chip memori merah 999 menjadi hijau 100"
    },
    missionVariants: [
      {
        objective: 'Buat fungsi chargeHP(baterai *int). Jika *baterai < 100, ubah nilainya menjadi 100. Panggil fungsi tersebut dengan baterai awal 15. Cetak "Baterai Penuh: " dan nilainya.',
        targetText: 'Baterai Penuh: 100',
        expectedOutput: 'Baterai Penuh: 100',
        starterCode: `package main

import "fmt"

func chargeHP(baterai *int) {
    
}

func main() {
    level := 15
    
}
`,
        visualTarget: 'Handphone menyala hijau 100%'
      },
      {
        objective: 'Buat fungsi remDarurat(kecepatan *int). Jika *kecepatan > 0, ubah menjadi 0. Panggil dengan kecepatan 80. Cetak "Kecepatan Sekarang: " dan nilainya.',
        targetText: 'Kecepatan Sekarang: 0',
        expectedOutput: 'Kecepatan Sekarang: 0',
        starterCode: `package main

import "fmt"

func remDarurat(kecepatan *int) {
    
}

func main() {
    speed := 80
    
}
`,
        visualTarget: 'Kereta api berhenti mendadak'
      },
      {
        objective: 'Buat fungsi diskonBesar(harga *int). Jika *harga > 100, kurangi 50 (*harga -= 50). Panggil dengan harga awal 120. Cetak "Harga Diskon: " dan nilainya.',
        targetText: 'Harga Diskon: 70',
        expectedOutput: 'Harga Diskon: 70',
        starterCode: `package main

import "fmt"

func diskonBesar(harga *int) {
    
}

func main() {
    price := 120
    
}
`,
        visualTarget: 'Label harga toko dicoret menjadi murah'
      }
    ],
    starterCode: `package main

import "fmt"

// 1. Lengkapi fungsi kalibrasiChip:
func kalibrasiChip(chip *int, batas int) {
    if *chip > batas {
        *chip = 100
    }
}

func main() {
    statusChip := 999
    
    // 2. Panggil kalibrasiChip dengan alamat &statusChip dan batas 500:
    

    fmt.Println("Chip Status:", statusChip)
}
`,
    expectedOutput: "Chip Status: 100",
    solutionCode: `package main

import "fmt"

func kalibrasiChip(chip *int, batas int) {
    if *chip > batas {
        *chip = 100
    }
}

func main() {
    statusChip := 999
    kalibrasiChip(&statusChip, 500)
    fmt.Println("Chip Status:", statusChip)
}
`,
    hint: "Di main(): kalibrasiChip(&statusChip, 500) lalu cetak fmt.Println(\"Chip Status:\", statusChip)",
    sceneType: "memory_hardware",
    visualGoal: "Reset register chip memori merah 999 menjadi hijau 100"
  },
  {
    id: 8,
    category: "Intermediate",
    categoryColor: "indigo",
    title: "Drone Defense Unit",
    subtitle: "Struct Methods & Mutasi Nilai (Pointer Receiver)",
    story: "Drone pertahanan fasilitas menerima tembakan laser penyerang. Buat method perisai yang mengurangi kapasitas perisai drone dan mengevaluasi status ketahanannya!",
    gopherQuote: "Gunakan pointer receiver (d *Drone) jika method yang kamu buat ingin MENGUBAH nilai field internal di dalam struct!",
    concepts: [
      {
        badge: "Pointer Receiver",
        name: "func (d *Drone) Kurangi()",
        desc: "Menggunakan tanda bintang '*' pada receiver agar perubahan nilai field di dalam method berpengaruh permanen ke objek aslinya.",
        code: "func (d *Drone) KenaHit(dmg int) {\n    d.Perisai -= dmg\n}"
      },
      {
        badge: "Method Bersyarat",
        name: "Evaluasi State Objek",
        desc: "Method dapat mencetak laporan kondisi drone terkini berdasarkan nilai perisai yang tersisa.",
        code: "if d.Perisai > 0 { ... }"
      }
    ],
    // CONTOH: Karakter Game RPG (Konteks berbeda)
    codeSample: `package main

import "fmt"

type Hero struct {
    Nama string
    HP   int
}

// Method dengan pointer receiver untuk memotong HP hero:
func (h *Hero) Diserang(damage int) {
    h.HP -= damage
    fmt.Println(h.Nama, "terkena serangan! Sisa HP:", h.HP)
}

func main() {
    ksatria := Hero{Nama: "Arthur", HP: 100}
    ksatria.Diserang(30) // HP berkurang jadi 70
}`,
    proTip: {
      title: "Kapan Pakai Pointer Receiver?",
      content: "Gunakan (d *Drone) jika method perlu mengubah data struct, atau jika struct berukuran besar agar tidak boros memori salinan (copy overhead)."
    },
    analogy: {
      icon: "🛡️",
      headline: "Analogi Perisai Pelindung Robot",
      story: "Robot drone memiliki plat perisai komposit:\n• Ditembak meriam sebesar 50 damage.\n• Plat perisai mengelupas dan berkurang dari 150 menjadi 100.\n• Sistem diagnostik menyala: 'Perisai Aktif: 100'. Robot siap melanjutkan patroli!",
      takeaway: "Pointer receiver memungkinkan objek mengubah kondisi internal dirinya sendiri."
    },
    mission: {
      objective: "Buat struct 'Drone' dengan field Model string dan Perisai int. Buat method '(d *Drone) TerimaDamage(dmg int)' yang mengurangi d.Perisai -= dmg dan mencetak: d.Model + \" Sisa Perisai: \" + d.Perisai. Di main(), buat Drone{Model: \"GOPHER-1\", Perisai: 150}, panggil TerimaDamage(50) (output: GOPHER-1 Sisa Perisai: 100)!",
      targetText: "GOPHER-1 Sisa Perisai: 100",
      expectedOutput: "GOPHER-1 Sisa Perisai: 100",
      visualTarget: "Luncurkan drone patroli terbang dengan aura perisai pelindung"
    },
    missionVariants: [
      {
        objective: 'Buat struct Mobil(Bensin int). Buat method (m *Mobil) Jalan(km int) yang mengurangi Bensin sebanyak km. Panggil Jalan(10) pada Mobil dengan Bensin 50, cetak "Sisa Bensin: " + bensin.',
        targetText: 'Sisa Bensin: 40',
        expectedOutput: 'Sisa Bensin: 40',
        starterCode: `package main

import "fmt"

type Mobil struct {
    Bensin int
}

func (m *Mobil) Jalan(km int) {
    
}

func main() {
    
}
`,
        visualTarget: 'Mobil sedan melaju dan bensin berkurang'
      },
      {
        objective: 'Buat struct Akun(Saldo int). Buat method (a *Akun) Tarik(jml int) yang mengurangi Saldo sebanyak jml. Panggil Tarik(500) pada Akun dengan Saldo 2000, cetak "Sisa Saldo: " + saldo.',
        targetText: 'Sisa Saldo: 1500',
        expectedOutput: 'Sisa Saldo: 1500',
        starterCode: `package main

import "fmt"

type Akun struct {
    Saldo int
}

func (a *Akun) Tarik(jml int) {
    
}

func main() {
    
}
`,
        visualTarget: 'Mesin ATM mengeluarkan uang pecahan'
      },
      {
        objective: 'Buat struct Karakter(HP int). Buat method (k *Karakter) Heal(jml int) yang menambah HP sebanyak jml. Panggil Heal(30) pada Karakter dengan HP 40, cetak "HP Sekarang: " + hp.',
        targetText: 'HP Sekarang: 70',
        expectedOutput: 'HP Sekarang: 70',
        starterCode: `package main

import "fmt"

type Karakter struct {
    HP int
}

func (k *Karakter) Heal(jml int) {
    
}

func main() {
    
}
`,
        visualTarget: 'Ksatria game RPG minum potion penambah nyawa'
      }
    ],
    starterCode: `package main

import "fmt"

type Drone struct {
    Model   string
    Perisai int
}

// 1. Lengkapi method TerimaDamage dengan pointer receiver (d *Drone):
func (d *Drone) TerimaDamage(dmg int) {
    d.Perisai -= dmg
    fmt.Println(d.Model, "Sisa Perisai:", d.Perisai)
}

func main() {
    // 2. Buat objek Drone dengan Model: "GOPHER-1" dan Perisai: 150
    // 3. Panggil method TerimaDamage(50):
    
}
`,
    expectedOutput: "GOPHER-1 Sisa Perisai: 100",
    solutionCode: `package main

import "fmt"

type Drone struct {
    Model   string
    Perisai int
}

func (d *Drone) TerimaDamage(dmg int) {
    d.Perisai -= dmg
    fmt.Println(d.Model, "Sisa Perisai:", d.Perisai)
}

func main() {
    bot := Drone{Model: "GOPHER-1", Perisai: 150}
    bot.TerimaDamage(50)
}
`,
    hint: "Di main(): bot := Drone{Model: \"GOPHER-1\", Perisai: 150} lalu bot.TerimaDamage(50)",
    sceneType: "drone_defense",
    visualGoal: "Luncurkan drone patroli terbang dengan aura perisai pelindung"
  },
  {
    id: 9,
    category: "Advanced",
    categoryColor: "purple",
    title: "Universal Protocol Link",
    subtitle: "Interface Polymorphism & Kontrak Multi-Method",
    story: "Stasiun pusat butuh modul daya universal. Buat interface 'ModulDaya' yang mewajibkan dua method: HasilkanWatt() int dan NamaModul() string, lalu hubungkan modul ReaktorNuklir ke sistem monitoring grid!",
    gopherQuote: "Di Go, interface adalah kontrak perilaku. Pastikan struct kamu mengimplementasikan SEMUA method yang ada di dalam kontrak interface!",
    concepts: [
      {
        badge: "Kontrak Interface",
        name: "Multi-Method Interface",
        desc: "Interface bisa memiliki lebih dari satu method. Struct wajib memiliki semua method tersebut agar lolos kontrak.",
        code: "type ModulDaya interface {\n    HasilkanWatt() int\n    NamaModul() string\n}"
      },
      {
        badge: "Fungsi Polimorfik",
        name: "Abstraksi Parameter",
        desc: "Fungsi dapat berinteraksi dengan struct apapun asalkan struct tersebut mematuhi kontrak interface yang ditentukan.",
        code: "func Sambung(m ModulDaya) { ... }"
      }
    ],
    // CONTOH: Sistem Pembayaran Toko (Konteks berbeda)
    codeSample: `package main

import "fmt"

type MetodeBayar interface {
    Bayar(jumlah int) string
}

type DompetDigital struct{}

func (d DompetDigital) Bayar(jumlah int) string {
    return fmt.Sprintf("Sukses Bayar Rp%d via QRIS", jumlah)
}

func ProsesTransaksi(m MetodeBayar, nominal int) {
    fmt.Println(m.Bayar(nominal))
}

func main() {
    qris := DompetDigital{}
    ProsesTransaksi(qris, 50000)
}`,
    proTip: {
      title: "Zero Coupling di Go",
      content: "Struct tidak perlu tahu nama interface yang diimplementasikannya! Compiler Go yang akan otomatis mencocokkan method-methodnya di balik layar (Duck Typing)."
    },
    analogy: {
      icon: "🔌",
      headline: "Analogi Kartu SIM Universal Smartphone",
      story: "Slot kartu SIM smartphone hanya menetapkan aturan:\n• Harus punya chip kuningan mikro (Method 1).\n• Harus bisa merespons sinyal frekuensi 4G/5G (Method 2).\nMau kartunya Telkomsel, XL, atau Indosat, HP akan langsung mengenalinya tanpa perlu setelan khusus!",
      takeaway: "Interface menyatukan komponen berbeda dalam satu standar antarmuka yang seragam."
    },
    mission: {
      objective: "Buat struct ReaktorNuklir yang memiliki method 'HasilkanWatt() int' (return 1000) dan 'NamaModul() string' (return \"Nuklir Core-1\"). Buat fungsi 'InspeksiModul(m ModulDaya)' yang mencetak: m.NamaModul() + \" Output: \" + m.HasilkanWatt() + \" Watt\". Panggil fungsi tersebut di main()!",
      targetText: "Nuklir Core-1 Output: 1000 Watt",
      expectedOutput: "Nuklir Core-1 Output: 1000 Watt",
      visualTarget: "Aktifkan transceiver satelit penerima sinyal universal"
    },
    missionVariants: [
      {
        objective: 'Buat interface Pekerja dengan method Gaji() int dan Nama() string. Buat struct Manager (return 10000, "Budi"). Buat fungsi CetakGaji(p Pekerja). Panggil fungsi tersebut.',
        targetText: 'Budi Gaji: 10000',
        expectedOutput: 'Budi Gaji: 10000',
        starterCode: `package main

import "fmt"

// Definisikan interface Pekerja dan struct Manager

func CetakGaji(p Pekerja) {
    fmt.Println(p.Nama(), "Gaji:", p.Gaji())
}

func main() {
    
}
`,
        visualTarget: 'Slip gaji karyawan manajer dicetak'
      },
      {
        objective: 'Buat interface Kendaraan dengan method Roda() int dan Merk() string. Buat struct Motor (return 2, "Honda"). Buat fungsi CekKendaraan(k Kendaraan). Panggil fungsi tersebut.',
        targetText: 'Honda Roda: 2',
        expectedOutput: 'Honda Roda: 2',
        starterCode: `package main

import "fmt"

// Definisikan interface Kendaraan dan struct Motor

func CekKendaraan(k Kendaraan) {
    fmt.Println(k.Merk(), "Roda:", k.Roda())
}

func main() {
    
}
`,
        visualTarget: 'Motor sport melintas di garasi balap'
      },
      {
        objective: 'Buat interface Senjata dengan method Damage() int dan Tipe() string. Buat struct Pedang (return 50, "Pedang Besi"). Buat fungsi InfoSenjata(s Senjata). Panggil fungsi tersebut.',
        targetText: 'Pedang Besi Damage: 50',
        expectedOutput: 'Pedang Besi Damage: 50',
        starterCode: `package main

import "fmt"

// Definisikan interface Senjata dan struct Pedang

func InfoSenjata(s Senjata) {
    fmt.Println(s.Tipe(), "Damage:", s.Damage())
}

func main() {
    
}
`,
        visualTarget: 'Karakter game menghunuskan pedang tajam'
      }
    ],
    starterCode: `package main

import "fmt"

type ModulDaya interface {
    HasilkanWatt() int
    NamaModul() string
}

type ReaktorNuklir struct{}

// 1. Implementasikan kedua method untuk ReaktorNuklir:
func (r ReaktorNuklir) HasilkanWatt() int {
    return 1000
}

func (r ReaktorNuklir) NamaModul() string {
    return "Nuklir Core-1"
}

// 2. Lengkapi fungsi InspeksiModul:
func InspeksiModul(m ModulDaya) {
    fmt.Println(m.NamaModul(), "Output:", m.HasilkanWatt(), "Watt")
}

func main() {
    // 3. Buat objek ReaktorNuklir dan panggil InspeksiModul:
    
}
`,
    expectedOutput: "Nuklir Core-1 Output: 1000 Watt",
    solutionCode: `package main

import "fmt"

type ModulDaya interface {
    HasilkanWatt() int
    NamaModul() string
}

type ReaktorNuklir struct{}

func (r ReaktorNuklir) HasilkanWatt() int {
    return 1000
}

func (r ReaktorNuklir) NamaModul() string {
    return "Nuklir Core-1"
}

func InspeksiModul(m ModulDaya) {
    fmt.Println(m.NamaModul(), "Output:", m.HasilkanWatt(), "Watt")
}

func main() {
    core := ReaktorNuklir{}
    InspeksiModul(core)
}
`,
    hint: "Di main(): core := ReaktorNuklir{} lalu InspeksiModul(core)",
    sceneType: "protocol_interface",
    visualGoal: "Aktifkan transceiver satelit penerima sinyal universal"
  },
  {
    id: 10,
    category: "Advanced",
    categoryColor: "purple",
    title: "Swarm Worker Fleet",
    subtitle: "Paralel Task Execution dengan Goroutine",
    story: "Server antrean dibanjiri oleh 2 tugas komputasi independen. Eksekusi kedua tugas secara bersamaan menggunakan Goroutine agar latensi total server berkurang!",
    gopherQuote: "Ketik kata kunci 'go' di depan fungsi untuk melempar pekerjaan ke thread background asinkron!",
    concepts: [
      {
        badge: "Concurrency",
        name: "Kata Kunci 'go'",
        desc: "Memulai fungsi baru di dalam Goroutine independen yang berjalan bersamaan dengan alur utama program.",
        code: "go proses(1)\ngo proses(2)"
      },
      {
        badge: "Waktu Sinkronisasi",
        name: "time.Sleep",
        desc: "Memberi jeda waktu sejenak pada fungsi main agar goroutine di latar belakang sempat menuntaskan pekerjaannya sebelum program keluar.",
        code: "time.Sleep(50 * time.Millisecond)"
      }
    ],
    // CONTOH: Mengunduh File Bersamaan (Konteks berbeda)
    codeSample: `package main

import (
    "fmt"
    "time"
)

func unduhFile(nama string) {
    fmt.Println("Selesai mengunduh:", nama)
}

func main() {
    // Mengunduh 2 file bersamaan di background:
    go unduhFile("gambar.png")
    go unduhFile("lagu.mp3")

    time.Sleep(40 * time.Millisecond) // Tunggu download selesai
}`,
    proTip: {
      title: "Bobot Ekstrem Ringan",
      content: "Goroutine hanya membutuhkan memori awal ~2 KB. Kamu bisa menjalankan ribuan goroutine sekaligus di satu laptop biasa tanpa membuat RAM penuh!"
    },
    analogy: {
      icon: "🛵",
      headline: "Analogi Dua Kurir Pengantar Makanan",
      story: "Ada 2 pesanan yang harus diantar ke arah berlawanan:\n• Jika hanya ada 1 kurir (sekuensial): pesanan kedua harus menunggu dingin.\n• Dengan 2 kurir ojol independen (goroutine): kedua motor langsung gas pol bersamaan di waktu yang sama!",
      takeaway: "Goroutine mempercepat throughput sistem secara dramatis."
    },
    mission: {
      objective: "Diberikan fungsi 'prosesTask(nama string)'. Jalankan dua tugas secara bersamaan di background: prosesTask(\"AUTH\") dan prosesTask(\"TELEMETRI\") menggunakan kata kunci 'go'. Tunggu dengan time.Sleep(50 * time.Millisecond).",
      targetText: "Task: AUTH Selesai, Task: TELEMETRI Selesai",
      expectedOutput: "Task: AUTH Selesai\nTask: TELEMETRI Selesai",
      visualTarget: "Armada robot mini worker melesat memproses antrean data"
    },
    missionVariants: [
      {
        objective: 'Fungsi unduh(file string). Jalankan dua goroutine: unduh("Video") dan unduh("Lagu"). Tunggu dengan time.Sleep.',
        targetText: `Download: Video Selesai
Download: Lagu Selesai`,
        expectedOutput: `Download: Video Selesai
Download: Lagu Selesai`,
        starterCode: `package main

import (
    "fmt"
    "time"
)

func unduh(file string) {
    fmt.Printf("Download: %s Selesai\n", file)
}

func main() {
    // Jalankan goroutine unduh
    
    time.Sleep(50 * time.Millisecond)
}
`,
        visualTarget: 'Dua bar loading download berjalan cepat bersamaan'
      },
      {
        objective: 'Fungsi masak(menu string). Jalankan dua goroutine: masak("Nasi") dan masak("Ayam"). Tunggu dengan time.Sleep.',
        targetText: `Memasak: Nasi Selesai
Memasak: Ayam Selesai`,
        expectedOutput: `Memasak: Nasi Selesai
Memasak: Ayam Selesai`,
        starterCode: `package main

import (
    "fmt"
    "time"
)

func masak(menu string) {
    fmt.Printf("Memasak: %s Selesai\n", menu)
}

func main() {
    // Jalankan goroutine masak
    
    time.Sleep(50 * time.Millisecond)
}
`,
        visualTarget: 'Koki restoran menumis wajan dan menanak nasi'
      },
      {
        objective: 'Fungsi kirimEmail(tujuan string). Jalankan dua goroutine: kirimEmail("Bos") dan kirimEmail("Klien"). Tunggu dengan time.Sleep.',
        targetText: `Email ke: Bos Terkirim
Email ke: Klien Terkirim`,
        expectedOutput: `Email ke: Bos Terkirim
Email ke: Klien Terkirim`,
        starterCode: `package main

import (
    "fmt"
    "time"
)

func kirimEmail(tujuan string) {
    fmt.Printf("Email ke: %s Terkirim\n", tujuan)
}

func main() {
    // Jalankan goroutine kirimEmail
    
    time.Sleep(50 * time.Millisecond)
}
`,
        visualTarget: 'Dua amplop surat elektronik melesat di layar'
      }
    ],
    starterCode: `package main

import (
    "fmt"
    "time"
)

func prosesTask(nama string) {
    fmt.Printf("Task: %s Selesai\\n", nama)
}

func main() {
    // 1. Jalankan prosesTask("AUTH") sebagai goroutine
    // 2. Jalankan prosesTask("TELEMETRI") sebagai goroutine
    

    // Jeda sejenak agar kedua goroutine selesai:
    time.Sleep(50 * time.Millisecond)
}
`,
    expectedOutput: "Task: AUTH Selesai\nTask: TELEMETRI Selesai",
    solutionCode: `package main

import (
    "fmt"
    "time"
)

func prosesTask(nama string) {
    fmt.Printf("Task: %s Selesai\\n", nama)
}

func main() {
    go prosesTask("AUTH")
    go prosesTask("TELEMETRI")
    time.Sleep(50 * time.Millisecond)
}
`,
    hint: "Ketik: go prosesTask(\"AUTH\") dan baris berikutnya: go prosesTask(\"TELEMETRI\")",
    sceneType: "worker_swarm",
    visualGoal: "Armada robot mini worker melesat memproses antrean data"
  },
  {
    id: 11,
    category: "Advanced",
    categoryColor: "purple",
    title: "Pipes of Power",
    subtitle: "Pipa Data Channels & Kalkulasi Nilai Sensor",
    story: "Stasiun sensor mengirim data tegangan mentah lewat pipa Channel. Goroutine menghitung nilai tegangan yang telah dikalikan dua, lalu mengirimkannya lewat channel ke stasiun penerima!",
    gopherQuote: "Perhatikan arah panah: 'ch <- nilai' untuk memasukkan data ke pipa, dan 'hasil := <-ch' untuk menyedot keluar!",
    concepts: [
      {
        badge: "Inisialisasi Pipa",
        name: "make(chan int)",
        desc: "Mempersiapkan channel bertipe integer untuk pertukaran data antar goroutine.",
        code: "ch := make(chan int)"
      },
      {
        badge: "Kirim & Terima",
        name: "Operator Panah (<-)",
        desc: "Arah panah menentukan arah aliran: masuk ke channel (send) atau ditarik keluar dari channel (receive).",
        code: "ch <- 100\nhasil := <-ch"
      }
    ],
    // CONTOH: Pesanan Makanan dari Dapur Restoran (Konteks berbeda)
    codeSample: `package main

import "fmt"

func main() {
    pipaPesanan := make(chan string)

    go func() {
        // Dapur menyiapkan makanan:
        pipaPesanan <- "Burger Siap Saji"
    }()

    // Pelayan menunggu di ujung pipa (blocking sync):
    makanan := <-pipaPesanan
    fmt.Println("Pelayan Mengantar:", makanan)
}`,
    proTip: {
      title: "Sinkronisasi Tanpa Sleep",
      content: "Membaca channel '<-ch' secara alami bersifat blocking (menunggu). Artinya kamu tidak perlu lagi memakai time.Sleep manual!"
    },
    analogy: {
      icon: "📬",
      headline: "Analogi Pipa Paralon Pneumatic Bank",
      story: "Nasabah memasukkan tabung uang ke corong pipa:\n• Tabung meluncur melintasi pipa pneumatic.\n• Kasir teller di lantai 2 langsung menangkap tabung yang keluar dari corong pipa.\nData berpindah tempat secara aman tanpa ada yang tercecer!",
      takeaway: "Channel menghubungkan goroutine secara aman tanpa tabrakan memori."
    },
    mission: {
      objective: "Buat channel integer 'ch := make(chan int)'. Di dalam goroutine, hitung 'hasil := 50 * 2' lalu kirim ke channel (ch <- hasil). Di func main(), terima data tersebut dan cetak: \"Tegangan Diterima: \" diikuti nilainya (output: Tegangan Diterima: 100)!",
      targetText: "Tegangan Diterima: 100",
      expectedOutput: "Tegangan Diterima: 100",
      visualTarget: "Kirim kapsul data bercahaya melintasi pipa pneumatic"
    },
    missionVariants: [
      {
        objective: 'Buat channel string. Di goroutine, kirim pesan "Paket Tiba" ke channel. Di main, terima dan cetak nilainya.',
        targetText: 'Status: Paket Tiba',
        expectedOutput: 'Status: Paket Tiba',
        starterCode: `package main

import "fmt"

func main() {
    // Buat channel string
    
}
`,
        visualTarget: 'Kurir melempar kotak paket ke pintu rumah'
      },
      {
        objective: 'Buat channel int. Di goroutine, hitung harga = 100 + 50 dan kirim ke channel. Di main, terima dan cetak "Total Harga: " + nilainya.',
        targetText: 'Total Harga: 150',
        expectedOutput: 'Total Harga: 150',
        starterCode: `package main

import "fmt"

func main() {
    // Buat channel int
    
}
`,
        visualTarget: 'Mesin kasir menghitung struk total belanja'
      },
      {
        objective: 'Buat channel bool. Di goroutine, evaluasi status = (10 > 5) dan kirim ke channel. Di main, terima dan cetak "Status Valid: " + nilainya.',
        targetText: 'Status Valid: true',
        expectedOutput: 'Status Valid: true',
        starterCode: `package main

import "fmt"

func main() {
    // Buat channel bool
    
}
`,
        visualTarget: 'Ceklis hijau besar muncul di layar verifikasi'
      }
    ],
    starterCode: `package main

import "fmt"

func main() {
    // 1. Buat channel bertipe int:
    ch := make(chan int)

    // 2. Jalankan goroutine yang menghitung 50 * 2 lalu mengirimkannya ke channel:
    go func() {
        hasil := 50 * 2
        ch <- hasil
    }()

    // 3. Terima nilai dari channel ch dan cetak:
    
}
`,
    expectedOutput: "Tegangan Diterima: 100",
    solutionCode: `package main

import "fmt"

func main() {
    ch := make(chan int)

    go func() {
        hasil := 50 * 2
        ch <- hasil
    }()

    nilai := <-ch
    fmt.Println("Tegangan Diterima:", nilai)
}
`,
    hint: "Terima data dengan: nilai := <-ch lalu fmt.Println(\"Tegangan Diterima:\", nilai)",
    sceneType: "channel_pipeline",
    visualGoal: "Kirim kapsul data bercahaya melintasi pipa pneumatic"
  },
  {
    id: 12,
    category: "Advanced",
    categoryColor: "purple",
    title: "Vault Deadlock & Mutex",
    subtitle: "Proteksi Data Bersama (Race Condition Prevention)",
    story: "Brankas saldo cadangan fasilitas diakses oleh fungsi penarikan daya. Lindungi variabel saldo bersama menggunakan sync.Mutex agar nilainya tidak korup!",
    gopherQuote: "Ingat prinsip grendel toilet: mu.Lock() sebelum mengurangi saldo, dan mu.Unlock() tepat sesudahnya!",
    concepts: [
      {
        badge: "Kunci Gembok",
        name: "mu.Lock()",
        desc: "Mengunci akses ke variabel bersama. Thread lain akan menunggu antre di luar gembok.",
        code: "mu.Lock()\nsaldo -= jumlah"
      },
      {
        badge: "Lepas Kunci",
        name: "mu.Unlock()",
        desc: "Membuka gembok kembali agar operasi transaksi berikutnya dapat berjalan.",
        code: "mu.Unlock()"
      }
    ],
    // CONTOH: Penghitung Tiket Konser (Konteks berbeda)
    codeSample: `package main

import (
    "fmt"
    "sync"
)

var (
    sisaTiket int = 50
    gembok    sync.Mutex
)

func beliTiket(banyak int) {
    gembok.Lock()
    sisaTiket -= banyak
    gembok.Unlock()
}

func main() {
    beliTiket(10)
    fmt.Println("Sisa Tiket Tersedia:", sisaTiket) // 40
}`,
    proTip: {
      title: "Gunakan 'defer mu.Unlock()'!",
      content: "Sangat direkomendasikan menulis 'defer mu.Unlock()' tepat setelah 'mu.Lock()'. Ini menjamin gembok pasti akan terbuka otomatis meski terjadi error di tengah jalan."
    },
    analogy: {
      icon: "🔐",
      headline: "Analogi Grendel Pintu Toilet Stasiun",
      story: "Bilik toilet umum hanya bisa dipakai 1 orang dalam 1 waktu:\n• Masuk -> pasang grendel (Lock).\n• Buang hajat -> data diproses.\n• Keluar -> buka grendel (Unlock).\nJika tidak digrendel, orang lain akan menerobos masuk dan terjadi kekacauan tabrakan!",
      takeaway: "Mutex mencegah data race pada memori yang diakses bersamaan."
    },
    mission: {
      objective: "Fasilitas memiliki saldo awal 250. Lengkapi fungsi 'tarikDaya(jumlah int)' dengan mu.Lock() sebelum saldo -= jumlah dan mu.Unlock() setelahnya. Panggil tarikDaya(50) di main() agar saldo menjadi 200!",
      targetText: "Saldo Brankas Aman: 200",
      expectedOutput: "Saldo Brankas Aman: 200",
      visualTarget: "Grendel pintu brankas terkunci hijau dan saldo tersimpan aman"
    },
    missionVariants: [
      {
        objective: 'Variabel viewer = 1000. Fungsi tambahViewer(jumlah int) menggunakan mutex. Panggil tambahViewer(500) lalu cetak viewer.',
        targetText: 'Total Viewer: 1500',
        expectedOutput: 'Total Viewer: 1500',
        starterCode: `package main

import (
    "fmt"
    "sync"
)

var (
    viewer int = 1000
    mu     sync.Mutex
)

func tambahViewer(jumlah int) {
    // Gunakan lock & unlock
    
}

func main() {
    tambahViewer(500)
    fmt.Println("Total Viewer:", viewer)
}
`,
        visualTarget: 'Angka penonton live streaming bertambah pesat'
      },
      {
        objective: 'Variabel stok = 50. Fungsi kurangiStok(jumlah int) menggunakan mutex. Panggil kurangiStok(20) lalu cetak stok.',
        targetText: 'Sisa Gudang: 30',
        expectedOutput: 'Sisa Gudang: 30',
        starterCode: `package main

import (
    "fmt"
    "sync"
)

var (
    stok int = 50
    mu   sync.Mutex
)

func kurangiStok(jumlah int) {
    // Gunakan lock & unlock
    
}

func main() {
    kurangiStok(20)
    fmt.Println("Sisa Gudang:", stok)
}
`,
        visualTarget: 'Kardus barang di gudang berkurang aman'
      },
      {
        objective: 'Variabel like = 0. Fungsi tambahLike() menggunakan mutex untuk like++. Panggil tambahLike() dan cetak like.',
        targetText: 'Total Like: 1',
        expectedOutput: 'Total Like: 1',
        starterCode: `package main

import (
    "fmt"
    "sync"
)

var (
    like int = 0
    mu   sync.Mutex
)

func tambahLike() {
    // Gunakan lock & unlock
    
}

func main() {
    tambahLike()
    fmt.Println("Total Like:", like)
}
`,
        visualTarget: 'Tombol jempol beranimasi klik satu kali'
      }
    ],
    starterCode: `package main

import (
    "fmt"
    "sync"
)

var (
    saldo int = 250
    mu    sync.Mutex
)

func tarikDaya(jumlah int) {
    // 1. Kunci mutex:
    
    saldo -= jumlah

    // 2. Lepas kunci mutex:
    
}

func main() {
    // Panggil tarikDaya(50) dan cetak saldo:
    tarikDaya(50)
    fmt.Println("Saldo Brankas Aman:", saldo)
}
`,
    expectedOutput: "Saldo Brankas Aman: 200",
    solutionCode: `package main

import (
    "fmt"
    "sync"
)

var (
    saldo int = 250
    mu    sync.Mutex
)

func tarikDaya(jumlah int) {
    mu.Lock()
    saldo -= jumlah
    mu.Unlock()
}

func main() {
    tarikDaya(50)
    fmt.Println("Saldo Brankas Aman:", saldo)
}
`,
    hint: "Ketik mu.Lock() sebelum saldo -= jumlah dan mu.Unlock() setelahnya.",
    sceneType: "safe_vault",
    visualGoal: "Grendel pintu brankas terkunci hijau dan saldo tersimpan aman"
  },
  {
    id: 13,
    category: "Expert",
    categoryColor: "rose",
    title: "Core Meltdown Recovery",
    subtitle: "Error Handling Eksplisit & Prosedur Defer",
    story: "Alarm kebocoran reaktor berbunyi! Buat fungsi verifikasi keselamatan yang mengembalikan error jika suhu melebihi 100°C, tangani error tersebut secara elegan, dan pasang prosedur darurat defer untuk mengunci katup radiasi!",
    gopherQuote: "Di Go, 'Errors are values'. Error bukan exception melainkan data biasa yang wajib diperiksa dengan pola 'if err != nil'!",
    concepts: [
      {
        badge: "Pola Error Go",
        name: "if err != nil",
        desc: "Pengecekan standar di Go: jika err bukan nil, artinya fungsi gagal dan masalah harus segera ditangani.",
        code: "if err != nil {\n    fmt.Println(err)\n}"
      },
      {
        badge: "Jaminan Eksekusi",
        name: "Kata Kunci 'defer'",
        desc: "Menunda eksekusi suatu baris hingga fungsi pembungkusnya selesai keluar. Menjamin pembersihan resource tetap berjalan.",
        code: "defer fmt.Println(\"Selesai\")"
      }
    ],
    // CONTOH: Validasi Saldo Transfer Bank (Konteks berbeda)
    codeSample: `package main

import (
    "errors"
    "fmt"
)

func transferUang(saldo int, nominal int) error {
    if nominal > saldo {
        return errors.New("Gagal: Saldo tidak mencukupi untuk transfer!")
    }
    return nil // nil berarti tidak ada error (sukses)
}

func main() {
    defer fmt.Println("Sesi transaksi ditutup aman.")

    err := transferUang(50000, 100000)
    if err != nil {
        fmt.Println("Peringatan:", err)
    }
}`,
    proTip: {
      title: "LIFO pada Defer (Last In, First Out)",
      content: "Jika kamu memasang beberapa baris defer berturut-turut, Go akan mengeksekusinya dengan urutan terbalik dari yang paling terakhir dipasang!"
    },
    analogy: {
      icon: "🛡️",
      headline: "Analogi Montir Servis Mobil & Pesan WhatsApp",
      story: "• Di bahasa lain ada 'try-catch' yang sering disalahgunakan orang untuk menyembunyikan masalah.\n• Di Go, montir bengkel bilang terus terang: 'Nih mobilmu udah selesai, TAPI ada catatan ban depanmu agak tipis ya (err)'.\n• 'defer' itu seperti kamu memasang timer kunci otomatis pintu rumah: mau kamu keluar lewat pintu depan atau lompat jendela, pintunya dijamin otomatis terkunci saat kamu pergi!",
      takeaway: "Error handling eksplisit membuat aplikasi Go sangat tangguh dan jarang mengalami crash misterius di production."
    },
    mission: {
      objective: "Fungsi periksaSuhu(suhu int) error mengembalikan errors.New(\"BAHAYA: Reaktor Overheat\") jika suhu > 100. Di func main(), pasang defer untuk mencetak \"Katup Darurat Berhasil Ditutup\", lalu panggil periksaSuhu(120) dan cetak pesan errornya jika err != nil!",
      targetText: "BAHAYA: Reaktor Overheat / Katup Darurat Berhasil Ditutup",
      expectedOutput: "BAHAYA: Reaktor Overheat\nKatup Darurat Berhasil Ditutup",
      visualTarget: "Tutup katup reaktor otomatis dan pulihkan stabilitas suhu"
    },
    missionVariants: [
      {
        objective: 'Fungsi validasiUmur(umur int) error mengembalikan error jika umur < 18. Di main, pasang defer "Selesai", panggil validasiUmur(15), cetak error.',
        targetText: `Error: Umur Belum Cukup
Selesai`,
        expectedOutput: `Error: Umur Belum Cukup
Selesai`,
        starterCode: `package main

import (
    "errors"
    "fmt"
)

func validasiUmur(umur int) error {
    if umur < 18 { return errors.New("Error: Umur Belum Cukup") }
    return nil
}

func main() {
    
}
`,
        visualTarget: 'Peringatan sensor batasan umur muncul'
      },
      {
        objective: 'Fungsi bukaFile(nama string) error mengembalikan error jika nama kosong. Di main, pasang defer "Tutup File", panggil bukaFile(""), cetak error.',
        targetText: `Error: Nama File Kosong
Tutup File`,
        expectedOutput: `Error: Nama File Kosong
Tutup File`,
        starterCode: `package main

import (
    "errors"
    "fmt"
)

func bukaFile(nama string) error {
    if nama == "" { return errors.New("Error: Nama File Kosong") }
    return nil
}

func main() {
    
}
`,
        visualTarget: 'Folder file terkunci dan tidak bisa dibuka'
      },
      {
        objective: 'Fungsi bayar(saldo int, harga int) error mengembalikan error jika harga > saldo. Di main, pasang defer "Transaksi Ditutup", panggil bayar(100, 200), cetak error.',
        targetText: `Error: Saldo Kurang
Transaksi Ditutup`,
        expectedOutput: `Error: Saldo Kurang
Transaksi Ditutup`,
        starterCode: `package main

import (
    "errors"
    "fmt"
)

func bayar(saldo int, harga int) error {
    if harga > saldo { return errors.New("Error: Saldo Kurang") }
    return nil
}

func main() {
    
}
`,
        visualTarget: 'Mesin kartu kredit menampilkan notifikasi saldo ditolak'
      }
    ],
    starterCode: `package main

import (
    "errors"
    "fmt"
)

func periksaSuhu(suhu int) error {
    if suhu > 100 {
        return errors.New("BAHAYA: Reaktor Overheat")
    }
    return nil
}

func main() {
    // 1. Pasang defer untuk mencetak "Katup Darurat Berhasil Ditutup":
    

    // 2. Panggil periksaSuhu(120) dan periksa dengan if err != nil:
    err := periksaSuhu(120)
    if err != nil {
        fmt.Println(err)
    }
}
`,
    expectedOutput: "BAHAYA: Reaktor Overheat\nKatup Darurat Berhasil Ditutup",
    solutionCode: `package main

import (
    "errors"
    "fmt"
)

func periksaSuhu(suhu int) error {
    if suhu > 100 {
        return errors.New("BAHAYA: Reaktor Overheat")
    }
    return nil
}

func main() {
    defer fmt.Println("Katup Darurat Berhasil Ditutup")

    err := periksaSuhu(120)
    if err != nil {
        fmt.Println(err)
    }
}
`,
    hint: "Ketik: defer fmt.Println(\"Katup Darurat Berhasil Ditutup\") di awal func main()",
    sceneType: "meltdown_recovery",
    visualGoal: "Tutup katup reaktor otomatis dan pulihkan stabilitas suhu"
  },
  {
    id: 14,
    category: "Expert",
    categoryColor: "rose",
    title: "Cloud Gateway & REST API",
    subtitle: "Serialisasi JSON Struct Tag Standar Industri",
    story: "Level Puncak! Hubungkan seluruh infrastruktur stasiun ke jaringan Cloud pusat dengan membuat format data telemetri berformat JSON standar industri!",
    gopherQuote: "Kamu tidak butuh framework berat hanya untuk bikin REST API berkinerja tinggi. Standard library bawaan Go sudah kelas dunia!",
    concepts: [
      {
        badge: "Tag Struct JSON",
        name: "`json:\"nama_key\"`",
        desc: "Tag metadata di sebelah field struct yang memberitahu Go nama key JSON yang diinginkan saat serialisasi.",
        code: "type Status struct {\n    Server string `json:\"server\"`\n}"
      },
      {
        badge: "Serialisasi",
        name: "json.Marshal(data)",
        desc: "Mengubah objek struct Go menjadi byte array berformat string JSON standar untuk ditransmisikan via API.",
        code: "jsonData, err := json.Marshal(data)"
      }
    ],
    // CONTOH: Profil Pengguna Aplikasi (Konteks berbeda)
    codeSample: `package main

import (
    "encoding/json"
    "fmt"
)

// Contoh model data profil pengguna:
type ProfilUser struct {
    Username string \`json:"username"\`
    Role     string \`json:"role"\`
}

func main() {
    akun := ProfilUser{Username: "budi_dev", Role: "ADMIN"}

    // Mengubah struct ke format JSON:
    hasilJSON, _ := json.Marshal(akun)

    fmt.Println(string(hasilJSON)) // {"username":"budi_dev","role":"ADMIN"}
}`,
    proTip: {
      title: "Hasil json.Marshal Berupa []byte",
      content: "Ingat bahwa json.Marshal mengembalikan byte buffer '[]byte'. Kamu harus mengubahnya menjadi teks yang bisa dibaca dengan memanggil fungsi konversi 'string(jsonData)'!"
    },
    analogy: {
      icon: "🌐",
      headline: "Analogi Pelayan Restoran Bintang Lima",
      story: "REST API itu seperti pelayan restoran bintang 5:\n• Tamu memesan menu via URL: 'GET /status'.\n• Pelayan pergi ke dapur, mengambil data dari koki.\n• Pelayan mengemas makanan dalam kotak bento universal standar bernama JSON, lalu menyajikannya kembali dengan rapi ke meja tamu!",
      takeaway: "JSON dan REST API menghubungkan aplikasi backend Go kamu dengan website React, aplikasi mobile Flutter, atau ribuan sistem lain di seluruh dunia."
    },
    mission: {
      objective: "Buat struct 'ServerStatus' dengan field Status string `json:\"status\"` dan Server string `json:\"server\"`. Isi datanya dengan Status: \"ONLINE\" dan Server: \"Gopher-HQ\". Ubah menjadi JSON dengan json.Marshal lalu cetak string JSON tersebut!",
      targetText: "{\"status\":\"ONLINE\",\"server\":\"Gopher-HQ\"}",
      expectedOutput: `{"status":"ONLINE","server":"Gopher-HQ"}`,
      visualTarget: "Pancarkan sinyal satelit cloud dan nyalakan seluruh grid kota cyberpunk!"
    },
    missionVariants: [
      {
        objective: 'Buat struct Profil dengan Nama string `json:"nama"` dan Umur int `json:"umur"`. Isi dengan "Budi", 25. Marshal dan cetak JSON.',
        targetText: '{"nama":"Budi","umur":25}',
        expectedOutput: '{"nama":"Budi","umur":25}',
        starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

type Profil struct {
    Nama string \`json:"nama"\`
    Umur int    \`json:"umur"\`
}

func main() {
    
}
`,
        visualTarget: 'Kartu nama digital dikirim ke cloud'
      },
      {
        objective: 'Buat struct Barang dengan Produk string `json:"produk"` dan Harga int `json:"harga"`. Isi dengan "Sepatu", 100000. Marshal dan cetak JSON.',
        targetText: '{"produk":"Sepatu","harga":100000}',
        expectedOutput: '{"produk":"Sepatu","harga":100000}',
        starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

type Barang struct {
    Produk string \`json:"produk"\`
    Harga  int    \`json:"harga"\`
}

func main() {
    
}
`,
        visualTarget: 'Katalog e-commerce mengunggah item barang'
      },
      {
        objective: 'Buat struct Pesanan dengan ID string `json:"id"` dan Jumlah int `json:"jumlah"`. Isi dengan "ORD-01", 5. Marshal dan cetak JSON.',
        targetText: '{"id":"ORD-01","jumlah":5}',
        expectedOutput: '{"id":"ORD-01","jumlah":5}',
        starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

type Pesanan struct {
    ID     string \`json:"id"\`
    Jumlah int    \`json:"jumlah"\`
}

func main() {
    
}
`,
        visualTarget: 'Truk pengiriman online memproses kode order'
      }
    ],
    starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

type ServerStatus struct {
    Status string \`json:"status"\`
    Server string \`json:"server"\`
}

func main() {
    data := ServerStatus{
        Status: "ONLINE",
        Server: "Gopher-HQ",
    }

    // 1. Ubah struct data menjadi byte JSON menggunakan json.Marshal:
    

    // 2. Cetak hasil JSON dalam bentuk string ke konsol:
    
}
`,
    expectedOutput: `{"status":"ONLINE","server":"Gopher-HQ"}`,
    solutionCode: `package main

import (
    "encoding/json"
    "fmt"
)

type ServerStatus struct {
    Status string \`json:"status"\`
    Server string \`json:"server"\`
}

func main() {
    data := ServerStatus{
        Status: "ONLINE",
        Server: "Gopher-HQ",
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    fmt.Println(string(jsonData))
}
`,
    hint: "Ketik: jsonData, _ := json.Marshal(data) lalu fmt.Println(string(jsonData))",
    sceneType: "cloud_gateway",
    visualGoal: "Pancarkan sinyal satelit cloud dan nyalakan seluruh grid kota cyberpunk!"
  }
];