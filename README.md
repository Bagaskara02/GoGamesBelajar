# 🐹 GopherQuest 2D - Platform Edukasi Game Golang Interaktif

Platform game edukasi interaktif 2D berbasis web untuk mempelajari bahasa pemrograman **Golang** dari tingkat **Pemula (Beginner)** hingga **Ahli (Expert)**.

Dibangun menggunakan **React 18**, **Tailwind CSS**, **HTML5 Canvas 2D**, dan **Web Audio API Synthesizer** dengan estetika visual *Cyberpunk / High-Tech Developer*.

---

## 🚀 Fitur Unggulan

1. **Alur Belajar 3 Fase Gamified**:
   - 📖 **Fase 1: Materi & Analogi**: Penjelasan komprehensif konsep Golang dalam Bahasa Indonesia yang santai, analogi kehidupan nyata/warkop, dan tips pencegahan bug tanpa jargon akademis kaku.
   - 🎮 **Fase 2: Visual 2D Game World & Cyberpunk Code IDE**: Simulasi grafis 2D interaktif (server rack, generator energi, laser firewall, turbin pendingin, armada worker, saluran channel, grendel mutex, cloud gateway) dengan maskot teknisi Gopher.
   - ⚡ **Fase 3: Eksekusi & Validasi Otomatis**: Menjalankan pengujian sintaks & logika Go, output terminal `$ go run main.go`, feedback error bersahabat, partikel perayaan, dan sistem XP/Level Unlock.
2. **Kurikulum Lengkap 14 Level**:
   - Level 01: *Booting The Core* (`package main`, `import "fmt"`, `func main()`, `fmt.Println()`)
   - Level 02: *Power Grid & Voltage* (Variabel `var`, `:=`, tipe data `int`, `string`, `bool`)
   - Level 03: *Firewall Security Gate* (Percabangan `if`, `else if`, `else`)
   - Level 04: *Reactor Cooling Loop* (Looping minimalis khas Go dengan `for`)
   - Level 05: *Energy Converter Modules* (Fungsi `func` & multiple return values `(int, error)`)
   - Level 06: *Server Rack Storage* (Koleksi dinamis `Slice` & `Map`)
   - Level 07: *Hardware Direct Memory* (Pointer langsung `*` dan `&` tanpa copy value)
   - Level 08: *Drone Defense Unit* (`struct` dan method receiver)
   - Level 09: *Universal Protocol Link* (`interface` dan implicit duck-typing)
   - Level 10: *Swarm Worker Fleet* (Concurrency ringan `goroutine` ~2KB memory)
   - Level 11: *Pipes of Power* (`channel`, operator `<-`, transfer data antar thread)
   - Level 12: *Vault Deadlock & Mutex* (`sync.Mutex`, pencegahan race condition)
   - Level 13: *Core Meltdown Recovery* (Error handling idiomatis `if err != nil` dan `defer`)
   - Level 14: *Cloud Gateway & REST API* (`net/http`, HTTP handler, serialisasi JSON payload)
3. **Zero External Assets (Audio & Canvas)**:
   - Efek suara 8-bit retro (success chimes, laser beeps, error buzz) dihasilkan langsung via **Web Audio API** bawaan browser tanpa butuh file MP3 eksternal.
   - Animasi 2D digambar secara prosedural 60 FPS pada HTML5 Canvas.
4. **State Persistence**:
   - Progres level, XP, dan kode yang kamu ketik disimpan otomatis di `localStorage`.

---

## 🛠️ Cara Menjalankan Aplikasi

Pastikan Node.js (v18+) sudah terpasang di komputermu:

```bash
# 1. Masuk ke direktori project
cd d:/Code/Project1/project/Golang/GamesBelajar

# 2. Jalankan server development
npm run dev
```

Buka browser kamu di `http://localhost:3000` (atau port yang ditampilkan di terminal).

Untuk build production:
```bash
npm run build
npm run preview
```

---

## 📁 Struktur Direktori

```
d:/Code/Project1/project/Golang/GamesBelajar/
├── index.html                  # Template HTML + font JetBrains Mono / Inter
├── package.json                # Dependensi project
├── vite.config.js              # Konfigurasi Vite server
├── tailwind.config.js          # Tema warna cyberpunk, neon glow, font
├── src/
│   ├── main.jsx                # Entry point React
│   ├── App.jsx                 # Koordinator state utama & layout responsif
│   ├── index.css               # Styling global, scanlines, neon utilities
│   ├── data/
│   │   └── levels.js           # Database deklaratif 14 level (materi, kode, validator)
│   ├── utils/
│   │   ├── codeValidator.js    # Engine simulator & validator kode Golang
│   │   └── soundEffects.js     # Synthesizer audio Web Audio API (8-bit)
│   └── components/
│       ├── Navbar.jsx          # Header status, level dropdown, XP, audio toggle
│       ├── GameCanvas2D.jsx    # Engine Canvas 2D interaktif (60 FPS)
│       ├── CodeEditor.jsx      # Editor kode cyberpunk (line numbers, tab, shortcuts)
│       ├── TerminalOutput.jsx  # Konsol simulasi terminal bash
│       ├── MaterialModal.jsx   # Modal Fase 1 (Materi, analogi warkop, misi)
│       └── VictoryModal.jsx    # Modal kemenangan saat kode berhasil
```

---

## ➕ Cara Menambah Level Baru (Level 15, 16, dst.)

Menambah level baru sangat mudah karena arsitekturnya dibuat secara modular dan deklaratif.

Cukup buka `src/data/levels.js` dan tambahkan object baru ke dalam array `LEVELS_DATA`:

```javascript
{
  id: 15,
  category: "Expert",
  title: "Microservices gRPC",
  subtitle: "Protocol Buffers & Remote Procedure Call",
  story: "Hubungkan komunikasi antar-microservice menggunakan protokol biner gRPC berkecepatan tinggi!",
  analogy: "Kalau REST API itu surat kertas dikirim lewat pos, gRPC itu telepon kabel langsung dengan bahasa sandi rahasia yang super cepat!",
  material: `### Penjelasan Materi Golang Baru di Sini...`,
  mission: "Tuliskan kode untuk menginisialisasi service gRPC...",
  starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tulis kodemu\n}\n`,
  expectedOutput: "gRPC Server Running",
  solutionCode: `...`,
  hint: "Gunakan fmt.Println(\"gRPC Server Running\")",
  sceneType: "server_room", // atau tambahkan tipe scene baru di GameCanvas2D.jsx
  visualGoal: "Aktifkan streaming gRPC pipeline"
}
```

Kemudian, di `src/utils/codeValidator.js`, tambahkan blok evaluasi untuk `case 15:` sesuai kriteria logika yang kamu inginkan. Selesai!
