/**
 * Ensiklopedia Pengetahuan Dasar & Materi Umum Golang (Level 1 - 14)
 * Memberikan pembelajaran menyeluruh tentang teori dasar, variasi sintaks,
 * cara kerja di balik layar, dan kesalahan umum di luar soal misi.
 */

export const LEVEL_DEEP_KNOWLEDGE = {
  1: {
    topicTitle: 'Pengetahuan Dasar: Anatomi Program Go & Paket fmt',
    overview:
      'Sebelum terjun ke logika yang rumit, setiap programmer Go wajib memahami bagaimana compiler Go membaca sebuah file kode. Berbeda dengan bahasa scripting seperti Python atau JavaScript yang langsung mengeksekusi baris pertama, Go adalah bahasa terkompilasi (compiled language) yang mengorganisir kode di dalam satuan paket (package).',
    sections: [
      {
        title: '1. Mengapa Harus "package main" & "func main()"?',
        explanation:
          'Di Golang, ada 2 jenis package: Package Executable (program yang bisa dijalankan langsung menjadi aplikasi) dan Package Library (kumpulan fungsi pembantu untuk di-import file lain). Nama "package main" adalah kata kunci khusus yang memberitahu compiler Go: "Buatlah file aplikasi yang bisa dijalankan!". Sedangkan "func main()" adalah titik awal (entry point) yang pertama kali dicari komputer saat program dijalankan.',
        code: `package main // Wajib untuk program utama

import "fmt" // Mengambil pustaka standar Format I/O

func main() {
    // Komputer SELALU mulai membaca dari baris pertama di dalam sini
    fmt.Println("Langkah Pertama")
}`
      },
      {
        title: '2. Perbedaan fmt.Print(), fmt.Println(), dan fmt.Printf()',
        explanation:
          'Paket "fmt" memiliki 3 fungsi cetak utama yang sering dipakai sehari-hari:\n• fmt.Print(): Mencetak teks APA ADANYA tanpa pindah baris di akhir.\n• fmt.Println(): Mencetak teks lalu OTOMATIS menekan Enter (baris baru/newline) di ujungnya.\n• fmt.Printf(): Mencetak teks dengan format khusus menggunakan simbol verb seperti %s (string) dan %d (angka bulat).',
        code: `fmt.Print("Halo ")
fmt.Print("Dunia!") // Hasil: Halo Dunia! (menyatu di satu baris)

fmt.Println("Baris A")
fmt.Println("Baris B") // Otomatis turun ke baris di bawahnya

fmt.Printf("Nama: %s, Skor: %d\\n", "Gopher", 100)`
      },
      {
        title: '3. Komentar Kode (Comments) & Aturan Titik Koma (;)',
        explanation:
          'Di Go, kamu tidak perlu menulis tanda titik koma (;) di akhir setiap baris karena compiler Go otomatis menambahkannya saat kompilasi. Untuk menulis catatan yang diabaikan oleh komputer, gunakan // untuk satu baris atau /* ... */ untuk banyak baris.',
        code: `// Ini komentar satu baris (tidak akan dieksekusi komputer)
/*
   Ini komentar blok multi-baris
   Cocok untuk dokumentasi panjang
*/`
      }
    ],
    cheatSheet: [
      { syntax: 'package main', desc: 'Menandai file sebagai program utama yang bisa dieksekusi' },
      { syntax: 'import "fmt"', desc: 'Memuat pustaka standar untuk cetak layar & format teks' },
      { syntax: 'fmt.Println(a, b)', desc: 'Mencetak beberapa data sekaligus (otomatis dipisah spasi) + ganti baris' },
      { syntax: 'fmt.Printf("%s %d", str, num)', desc: 'Mencetak teks dengan template format (%s = teks, %d = angka)' }
    ],
    commonMistakes: [
      'Menulis fmt.println() dengan huruf "p" kecil — di Go, fungsi dari package lain WAJIB diawali huruf kapital (Exported).',
      'Membungkus teks kalimat dengan tanda kutip satu (\'Halo\') — di Go, kutip satu hanya untuk 1 karakter (rune), gunakan kutip dua ("Halo").'
    ]
  },

  2: {
    topicTitle: 'Pengetahuan Dasar: Variabel, Tipe Data Dasar & Operasi Matematika',
    overview:
      'Golang adalah bahasa bertipe statis (Statically Typed Language). Artinya, setiap variabel memiliki tipe data yang jelas dan tetap (tidak bisa tiba-tiba berubah dari angka menjadi teks). Namun, Go sangat modern karena punya fitur Type Inference yang bisa menebak tipe data secara otomatis!',
    sections: [
      {
        title: '1. Dua Cara Membuat Variabel: "var" vs ":=" (Short Declaration)',
        explanation:
          'Ada cara formal dan cara singkat untuk membuat variabel di Go:\n• Kata kunci "var": Bisa digunakan di mana saja (di dalam maupun di luar fungsi), dan tipe datanya bisa ditulis eksplisit.\n• Operator ":=": Cara paling populer di dalam fungsi! Sekaligus mendeklarasikan variabel baru dan menebak tipe datanya otomatis dari nilainya.',
        code: `var harga int = 15000      // Cara eksplisit dengan tipe int
var namaToko = "PixelMart" // var dengan tebakan tipe otomatis

// Cara singkat (Short Declaration) - hanya boleh di dalam fungsi:
jumlahBeli := 3
memberAktif := true`
      },
      {
        title: '2. Empat Tipe Data Pondasi di Golang',
        explanation:
          'Kenali 4 tipe data dasar yang paling sering dipakai:\n• int: Bilangan bulat positif/negatif (contoh: 10, -5, 2000).\n• float64: Bilangan desimal/pecahan (contoh: 3.14, 99.5).\n• string: Teks yang diapit kutip dua (contoh: "Belajar Go").\n• bool: Nilai kebenaran logika, hanya berisi true atau false.',
        code: `var umur int = 21
var suhuRuangan float64 = 24.5
var pesan string = "Sistem Normal"
var sudahLulus bool = true`
      },
      {
        title: '3. Konstanta (const) & Aturan Ketat Variabel Go',
        explanation:
          'Jika sebuah nilai bersifat tetap dan tidak boleh diubah (seperti rumus Pi atau pajak tetap), gunakan "const". Selain itu, Go punya aturan unik: setiap variabel lokal yang kamu buat di dalam fungsi WAJIB dipakai! Jika menganggur, program tidak mau dikompilasi agar kode selalu bersih.',
        code: `const PajakPPN = 11 // Nilai const tidak bisa diubah lagi
total := 100000 + (100000 * PajakPPN / 100)`
      }
    ],
    cheatSheet: [
      { syntax: 'x := 10', desc: 'Membuat variabel baru x bertipe int dengan nilai 10' },
      { syntax: 'x = 25', desc: 'Mengubah nilai variabel x yang SUDAH dibuat sebelumnya (tanpa titik dua)' },
      { syntax: '+, -, *, /, %', desc: 'Tambah, Kurang, Kali, Bagi, dan Sisa Bagi (Modulo)' },
      { syntax: 'const Pi = 3.14', desc: 'Membuat konstanta tetap yang nilainya terkunci' }
    ],
    commonMistakes: [
      'Menggunakan ":=" dua kali pada nama variabel yang sama (untuk mengubah nilai variabel lama, cukup gunakan "=" tanpa titik dua).',
      'Membuat variabel tetapi lupa memakainya atau mencetaknya (error: declared and not used).'
    ]
  },

  3: {
    topicTitle: 'Pengetahuan Dasar: Percabangan (If-Else, Switch) & Logika Boolean',
    overview:
      'Program yang cerdas harus bisa mengambil keputusan berdasarkan situasi. Di Go, pengambilan keputusan dilakukan dengan mengevaluasi ekspresi Boolean (pernyataan yang menghasilkan nilai true atau false).',
    sections: [
      {
        title: '1. Struktur if, else if, dan else Tanpa Tanda Kurung ()',
        explanation:
          'Berbeda dari C++, Java, atau JavaScript, penulisan kondisi "if" di Golang TIDAK memerlukan tanda kurung biasa (...) di sekeliling syaratnya, tetapi WAJIB menggunakan kurung kurawal { ... }.',
        code: `nilai := 85

if nilai >= 90 {
    fmt.Println("Predikat: A")
} else if nilai >= 75 {
    fmt.Println("Predikat: B")
} else {
    fmt.Println("Perlu Remedial")
}`
      },
      {
        title: '2. Operator Perbandingan & Logika Ganda (&&, ||, !)',
        explanation:
          'Untuk menggabungkan beberapa syarat sekaligus, gunakan operator logika:\n• && (AND / DAN): Bernilai true HANYA JIKA kedua syarat di kiri dan kanan sama-sama benar.\n• || (OR / ATAU): Bernilai true jika SALAH SATU syarat saja sudah benar.\n• ! (NOT / NEGASI): Membalikkan nilai true menjadi false (dan sebaliknya).',
        code: `unyaTiket := true
umur := 20

// Kedua syarat harus terpenuhi:
if punyaTiket && umur >= 18 {
    fmt.Println("Silakan Masuk!")
}`
      },
      {
        title: '3. Percabangan Switch-Case yang Lebih Rapi',
        explanation:
          'Saat kamu memiliki terlalu banyak "else if", gunakan "switch". Keunggulan switch di Go: kamu tidak perlu menulis "break" di setiap akhir case karena Go otomatis menghentikan pengecekan setelah satu case cocok!',
        code: `statusLampu := "HIJAU"
switch statusLampu {
case "MERAH":
    fmt.Println("Berhenti")
case "HIJAU":
    fmt.Println("Jalan Terus!")
default:
    fmt.Println("Hati-hati")
}`
      }
    ],
    cheatSheet: [
      { syntax: '== dan !=', desc: 'Sama dengan (==) dan Tidak sama dengan (!=)' },
      { syntax: '>, <, >=, <=', desc: 'Lebih besar, lebih kecil, lebih besar/sama dengan, lebih kecil/sama dengan' },
      { syntax: 'syaratA && syaratB', desc: 'Benar jika KEDUA syarat terpenuhi' },
      { syntax: 'syaratA || syaratB', desc: 'Benar jika MINIMAL SATU syarat terpenuhi' }
    ],
    commonMistakes: [
      'Tertukar antara "=" (mengisi nilai variabel) dengan "==" (membandingkan kesamaan dua nilai di dalam if).',
      'Menaruh kurung kurawal buka "{" di baris baru di bawah if — di Go, tanda "{" wajib berada di baris yang sama dengan if/else.'
    ]
  },

  4: {
    topicTitle: 'Pengetahuan Dasar: Perulangan (For Loop) & Kontrol Alur Eksekusi',
    overview:
      'Tahukah kamu? Di bahasa pemrograman Go, TIDAK ADA kata kunci "while" atau "do-while"! Para perancang Go menyederhanakan semuanya menjadi satu kata kunci perulangan serbaguna yaitu "for".',
    sections: [
      {
        title: '1. Tiga Gaya Perulangan "for" di Golang',
        explanation:
          'Satu kata kunci "for" bisa berubah wujud menjadi 3 gaya perulangan:\n1. Gaya Klasik (Inisialisasi; Syarat; Perubahan Nilai)\n2. Gaya While (Hanya menulis syarat kondisi)\n3. Gaya Infinite Loop (Tanpa syarat, berputar terus sampai dihentikan dengan break)',
        code: `// 1. Gaya Klasik (Cetak 1 sampai 5):
for i := 1; i <= 5; i++ {
    fmt.Println("Putaran ke:", i)
}

// 2. Gaya While (Berputar selama baterai > 0):
baterai := 30
for baterai > 0 {
    baterai -= 10
}`
      },
      {
        title: '2. Mengendalikan Putaran dengan "break" dan "continue"',
        explanation:
          'Di dalam perulangan, kamu bisa mengontrol jalannya putaran:\n• continue: Melompati sisa kode di putaran saat ini dan langsung lanjut ke angka putaran berikutnya.\n• break: Menghentikan dan keluar dari seluruh perulangan seketika.',
        code: `for angka := 1; angka <= 10; angka++ {
    if angka == 3 {
        continue // Angka 3 dilewati
    }
    if angka == 8 {
        break // Berhenti total saat mencapai 8
    }
    fmt.Println(angka)
}`
      }
    ],
    cheatSheet: [
      { syntax: 'for i := 0; i < 10; i++', desc: 'Perulangan terukur dari 0 sampai 9 (naik 1 per putaran)' },
      { syntax: 'i += 5 / i -= 2', desc: 'Menaikkan nilai sebesar 5 atau menurunkan sebesar 2' },
      { syntax: 'continue', desc: 'Lewati putaran saat ini, lanjut ke putaran berikutnya' },
      { syntax: 'break', desc: 'Hentikan perulangan secara paksa' }
    ],
    commonMistakes: [
      'Salah menulis arah syarat batas (misal: mulai dari 85 dan naik += 5, tapi syaratnya ditulis suhu >= 100 sehingga loop tidak pernah jalan atau malah tak berhenti).'
    ]
  },

  5: {
    topicTitle: 'Pengetahuan Dasar: Modularisasi Fungsi & Multiple Return Values',
    overview:
      'Fungsi (Function) adalah blok kode yang diberi nama dan bisa dipanggil berulang kali. Salah satu fitur paling disukai dari Golang adalah kemampuan sebuah fungsi untuk mengembalikan LEBIH DARI SATU nilai sekaligus (Multiple Return Values)!',
    sections: [
      {
        title: '1. Anatomi Fungsi: Parameter & Nilai Kembalian (Return)',
        explanation:
          'Saat membuat fungsi, kita menentukan input yang diterima (parameter beserta tipe datanya) dan tipe data apa yang akan dihasilkan setelah fungsi selesai bekerja.',
        code: `// Menerima 2 input int, mengembalikan 1 hasil int:
func hitungLuas(panjang int, lebar int) int {
    return panjang * lebar
}`
      },
      {
        title: '2. Mengembalikan Banyak Nilai Sekaligus (Multiple Return)',
        explanation:
          'Di banyak bahasa lain, fungsi hanya bisa me-return 1 nilai. Di Go, kamu cukup menulis daftar tipe return di dalam tanda kurung, misalnya (int, string). Fitur ini sangat sering dipakai di Go untuk mengembalikan (hasilData, statusError).',
        code: `func bagiAngka(a int, b int) (int, string) {
    if b == 0 {
        return 0, "GAGAL: Pembagi Nol"
    }
    return a / b, "SUKSES"
}

func main() {
    hasil, pesan := bagiAngka(20, 4)
    fmt.Println(hasil, pesan) // 5 SUKSES
}`
      }
    ],
    cheatSheet: [
      { syntax: 'func nama(a int, b int) int', desc: 'Fungsi dengan 2 parameter int dan 1 return int' },
      { syntax: 'func nama(a, b int) (int, string)', desc: 'Penulisan parameter singkat & return 2 nilai sekaligus' },
      { syntax: 'hasil, _ := fungsi()', desc: 'Menggunakan underscore (_) untuk mengabaikan salah satu nilai return' }
    ],
    commonMistakes: [
      'Lupa menuliskan tipe data pada setiap parameter fungsi, atau urutan nilai pada "return a, b" terbalik dari deklarasi "(int, string)".'
    ]
  },

  6: {
    topicTitle: 'Pengetahuan Dasar: Array, Slice Dinamis & Iterasi For-Range',
    overview:
      'Bagaimana jika kita ingin menyimpan 100 data nilai sensor sekaligus? Membuat 100 variabel satu per satu tentu tidak mungkin. Go menyediakan struktur koleksi data berurutan yaitu Array (ukuran tetap) dan Slice (ukuran fleksibel/dinamis).',
    sections: [
      {
        title: '1. Perbedaan Array vs Slice di Golang',
        explanation:
          '• Array ([4]int): Ukurannya terkunci sejak dibuat (misal hanya muat 4 angka, tidak bisa ditambah).\n• Slice ([]int - tanpa angka di dalam kurung siku): Jauh lebih populer di Go! Ukurannya dinamis, bisa ditambah elemen baru kapan saja menggunakan fungsi append().',
        code: `// Slice dinamis bertipe int:
skorPemain := []int{80, 95, 70}

// Menambahkan elemen baru ke Slice:
skorPemain = append(skorPemain, 100)
fmt.Println("Jumlah data:", len(skorPemain)) // 4`
      },
      {
        title: '2. Menelusuri Koleksi Data dengan "for ... range"',
        explanation:
          'Kata kunci "range" memudahkan kita membaca isi Slice dari elemen pertama sampai terakhir. Setiap putaran "range" selalu menghasilkan 2 hal: (1) Nomor urut posisi/index (mulai dari 0), dan (2) Nilai elemennya. Jika tidak butuh nomor index-nya, ganti dengan tanda garis bawah (_).',
        code: `daftarSuhu := []int{30, 85, 92, 40}

for index, nilai := range daftarSuhu {
    fmt.Println("Urutan", index, "bernilai:", nilai)
}

// Jika hanya butuh nilainya saja (tanpa index):
for _, nilai := range daftarSuhu {
    fmt.Println(nilai)
}`
      }
    ],
    cheatSheet: [
      { syntax: 'data := []int{10, 20, 30}', desc: 'Membuat Slice integer dengan 3 elemen awal' },
      { syntax: 'len(data)', desc: 'Mengetahui banyaknya elemen di dalam Slice' },
      { syntax: 'data = append(data, 40)', desc: 'Menambahkan angka 40 ke ujung belakang Slice' },
      { syntax: 'for _, v := range data', desc: 'Membaca setiap nilai elemen di dalam Slice' }
    ],
    commonMistakes: [
      'Menulis "for v := range data" (hanya 1 variabel) — hati-hati! Jika hanya menulis 1 variabel di depan range, variabel itu akan berisi nomor INDEX (0, 1, 2...), bukan isi datanya!'
    ]
  },

  7: {
    topicTitle: 'Pengetahuan Dasar: Pointer (& dan *) & Manajemen Memori RAM',
    overview:
      'Secara bawaan (default), Golang bersifat "Pass by Value". Artinya, setiap kali kamu mengirim variabel ke sebuah fungsi, Go membuat SALINAN (fotokopi) dari variabel tersebut. Mengubah salinan di dalam fungsi tidak akan mengubah variabel aslinya! Di sinilah Pointer berperan.',
    sections: [
      {
        title: '1. Memahami Alamat Memori (&) dan Dereference (*)',
        explanation:
          'Pointer adalah variabel khusus yang menyimpan ALAMAT MEMORI RAM dari variabel lain, bukan menyalin isinya. Ada 2 simbol utama:\n• Simbol & (Address-Of): Mengambil alamat lokasi memori dari sebuah variabel (contoh: &skor).\n• Simbol * (Dereference): Mengakses atau mengubah nilai asli yang tersimpan di alamat memori tersebut.',
        code: `skor := 50
ptr := &skor // ptr menyimpan alamat memori milik skor

*ptr = 100   // Mengubah isi di alamat tersebut menjadi 100
fmt.Println(skor) // Nilai skor asli ikut berubah jadi 100!`
      },
      {
        title: '2. Mengirim Pointer ke Dalam Fungsi',
        explanation:
          'Dengan parameter bertipe pointer (misal *int), fungsi dapat memodifikasi variabel asli secara langsung tanpa perlu mengembalikan nilai (return) dan tanpa memboroskan RAM untuk menyalin data berukuran besar.',
        code: `func resetKeNol(angka *int) {
    *angka = 0 // Langsung mengubah variabel asli di memori
}

func main() {
    energi := 500
    resetKeNol(&energi) // Kirim alamatnya dengan &
    fmt.Println(energi) // 0
}`
      }
    ],
    cheatSheet: [
      { syntax: '&variabel', desc: 'Mengambil alamat memori RAM tempat variabel disimpan' },
      { syntax: 'param *int', desc: 'Mendeklarasikan parameter fungsi yang menerima pointer ke int' },
      { syntax: '*param = 100', desc: 'Mengubah nilai asli di dalam alamat memori yang ditunjuk pointer' }
    ],
    commonMistakes: [
      'Lupa menambahkan tanda "&" saat memanggil fungsi pointer di func main(), atau lupa menambahkan tanda "*" saat mengubah nilai di dalam fungsi.'
    ]
  },

  8: {
    topicTitle: 'Pengetahuan Dasar: Struct & Method Receiver (Pemrograman Berorientasi Objek di Go)',
    overview:
      'Golang tidak menggunakan konsep "class" atau pewarisan (inheritance) seperti Java/PHP. Sebagai gantinya, Go menggunakan pendekatan yang jauh lebih ringan dan fleksibel yaitu "Struct" yang dipadukan dengan "Method Receiver".',
    sections: [
      {
        title: '1. Membungkus Data dengan "struct"',
        explanation:
          'Struct memungkinkan kita menggabungkan berbagai properti dengan tipe data berbeda menjadi satu kesatuan objek (misalnya objek Karakter Game, Mobil, Produk Toko, atau Drone).',
        code: `type Karakter struct {
    Nama  string
    Darah int
    Level int
}

hero := Karakter{Nama: "GopherKnight", Darah: 100, Level: 5}`
      },
      {
        title: '2. Method dengan Value Receiver vs Pointer Receiver',
        explanation:
          'Kita bisa menempelkan fungsi khusus (Method) ke sebuah Struct dengan menuliskan "(v *NamaStruct)" tepat setelah kata kunci "func". Gunakan tanda bintang (*) atau Pointer Receiver jika method tersebut perlu mengubah nilai field di dalam struct!',
        code: `// Menggunakan Pointer Receiver (*Karakter) agar Darah asli berkurang:
func (k *Karakter) KenaSerangan(damage int) {
    k.Darah -= damage
}

func main() {
    hero := Karakter{Nama: "Gopher", Darah: 100}
    hero.KenaSerangan(30)
    fmt.Println(hero.Darah) // 70
}`
      }
    ],
    cheatSheet: [
      { syntax: 'type Nama struct { ... }', desc: 'Membuat cetakan tipe data komposit baru' },
      { syntax: 'obj.NamaField', desc: 'Mengakses atau mengubah properti milik objek struct' },
      { syntax: 'func (s *Struct) Aksi()', desc: 'Membuat method yang bisa memodifikasi isi struct asli' }
    ],
    commonMistakes: [
      'Membuat method tanpa tanda bintang `func (d Drone) TerimaDamage()` — tanpa pointer `*Drone`, perubahan pada `d.Perisai` hanya mengubah salinan sementara dan hilang begitu fungsi selesai!'
    ]
  },

  9: {
    topicTitle: 'Pengetahuan Dasar: Interface & Polimorfisme Implisit di Golang',
    overview:
      'Interface adalah "kontrak kemampuan". Di dalam Interface, kita hanya menulis daftar nama method beserta tipe return-nya tanpa isi kode. Keajaiban Go: sebuah Struct otomatis dianggap memenuhi Interface jika memiliki semua method yang diminta—tanpa perlu menulis kata kunci "implements"!',
    sections: [
      {
        title: '1. Kontrak Interface & Implementasi Otomatis',
        explanation:
          'Misalkan kita membuat interface "AlatPembayaran" yang mewajibkan method "Bayar() string". Struct apapun (entah itu DompetDigital, KartuKredit, atau TransferBank) yang memiliki method "Bayar() string" secara otomatis sah menjadi AlatPembayaran!',
        code: `type AlatPembayaran interface {
    Bayar() string
}

type DompetGopay struct{}

func (d DompetGopay) Bayar() string {
    return "Lunas via QRIS"
}

func ProsesKasir(alat AlatPembayaran) {
    fmt.Println(alat.Bayar())
}`
      }
    ],
    cheatSheet: [
      { syntax: 'type Kontrak interface { Aksi() int }', desc: 'Mendefinisikan kontrak interface' },
      { syntax: 'func Proses(k Kontrak)', desc: 'Fungsi polimorfik yang menerima struct apapun yang memenuhi kontrak' },
      { syntax: 'any / interface{}', desc: 'Interface kosong yang bisa menampung tipe data apa saja' }
    ],
    commonMistakes: [
      'Jika interface meminta 2 method (misal HasilkanWatt() dan NamaModul()), tetapi struct baru membuat 1 method saja, maka struct tersebut belum sah memenuhi interface.'
    ]
  },

  10: {
    topicTitle: 'Pengetahuan Dasar: Concurrency & Goroutine (Kekuatan Utama Golang)',
    overview:
      'Salah satu alasan utama perusahaan raksasa dunia berpindah ke Golang adalah fitur Concurrency-nya. Dengan kata kunci "go", kamu bisa menjalankan ribuan pekerjaan secara bersamaan (asinkron) hanya dengan konsumsi memori ~2 Kilobyte per Goroutine!',
    sections: [
      {
        title: '1. Eksekusi Sekuensial vs Konkuren (Goroutine)',
        explanation:
          'Tanpa kata kunci "go", fungsi kedua harus menunggu fungsi pertama selesai 100%. Dengan menambahkan kata kunci "go" di depan pemanggilan fungsi, Go langsung menjalankannya di jalur latar belakang (background) dan lanjut ke baris berikutnya tanpa menunggu!',
        code: `func kirimEmail(tujuan string) {
    fmt.Println("Mengirim ke:", tujuan)
}

func main() {
    go kirimEmail("user1@go.dev") // Berjalan paralel di background
    go kirimEmail("user2@go.dev") // Berjalan paralel bersamaan!

    time.Sleep(100 * time.Millisecond) // Menunggu goroutine selesai
}`
      }
    ],
    cheatSheet: [
      { syntax: 'go namaFungsi()', desc: 'Meluncurkan fungsi sebagai Goroutine ringan di latar belakang' },
      { syntax: 'sync.WaitGroup', desc: 'Alat standar produksi untuk menunggu kumpulan Goroutine selesai' }
    ],
    commonMistakes: [
      'Jika func main() selesai duluan sebelum Goroutine sempat bekerja, seluruh program langsung tertutup! Karena itu diperlukan sinkronisasi (Channel, WaitGroup, atau Sleep).'
    ]
  },

  11: {
    topicTitle: 'Pengetahuan Dasar: Channels (Pipa Komunikasi Antar Goroutine)',
    overview:
      'Bagaimana cara sebuah Goroutine mengirimkan hasil kerjanya kembali ke fungsi utama? Go memiliki filosofi terkenal: "Jangan berkomunikasi dengan berbagi memori, tapi berbagilah memori dengan berkomunikasi melalui Channel."',
    sections: [
      {
        title: '1. Membuat Channel & Operator Panah "<-"',
        explanation:
          'Channel ibarat pipa pneumatik bertipe data khusus. Kita membuatnya dengan `make(chan TipeData)`. Perhatikan arah panah `<-`:\n• `ch <- nilai`: Memasukkan/mengirim nilai KE dalam pipa channel.\n• `hasil := <-ch`: Mengambil/menerima nilai DARI dalam pipa channel.',
        code: `ch := make(chan int) // Membuat pipa khusus data angka bulat (int)

go func() {
    ch <- 250 // Mengirim angka 250 ke dalam pipa
}()

terima := <-ch // Membaca angka yang keluar dari pipa
fmt.Println("Data masuk:", terima)`
      }
    ],
    cheatSheet: [
      { syntax: 'ch := make(chan int)', desc: 'Membuat unbuffered channel bertipe int' },
      { syntax: 'ch <- data', desc: 'Mengirim data masuk ke dalam channel' },
      { syntax: 'val := <-ch', desc: 'Menerima/membaca data dari channel' }
    ],
    commonMistakes: [
      'Deadlock! Terjadi jika kita membaca `<-ch` padahal tidak ada goroutine yang mengirim data ke `ch` (atau sebaliknya pada unbuffered channel).'
    ]
  },

  12: {
    topicTitle: 'Pengetahuan Dasar: Race Condition & Penguncian Memori (sync.Mutex)',
    overview:
      'Bayangkan 2 orang menarik uang dari 1 rekening ATM di detik yang sama persis! Tanpa penguncian, saldo rekening akan kacau (Data Race / Race Condition). Di Go, kita melindungi variabel bersama menggunakan `sync.Mutex` (Mutual Exclusion Lock).',
    sections: [
      {
        title: '1. Cara Kerja mu.Lock() dan mu.Unlock()',
        explanation:
          'Saat sebuah Goroutine memanggil `mu.Lock()`, goroutine lain yang ingin mengakses variabel tersebut wajib mengantre di luar sampai `mu.Unlock()` dipanggil. Praktik terbaiknya adalah langsung memasang `defer mu.Unlock()` setelah `mu.Lock()`.',
        code: `var mu sync.Mutex
var saldo = 1000

func potongSaldo(jumlah int) {
    mu.Lock()         // Kunci pintu akses!
    defer mu.Unlock() // Pastikan kunci dibuka kembali saat fungsi selesai
    saldo -= jumlah
}`
      }
    ],
    cheatSheet: [
      { syntax: 'var mu sync.Mutex', desc: 'Membuat objek kunci Mutex dari package sync' },
      { syntax: 'mu.Lock()', desc: 'Mengunci akses eksklusif sebelum memodifikasi variabel bersama' },
      { syntax: 'mu.Unlock()', desc: 'Membuka kunci agar goroutine lain bisa masuk' }
    ],
    commonMistakes: [
      'Memanggil `mu.Lock()` tetapi lupa memanggil `mu.Unlock()`, menyebabkan program membeku selamanya (Deadlock).'
    ]
  },

  13: {
    topicTitle: 'Pengetahuan Dasar: Error Handling Eksplisit & Kata Kunci "defer"',
    overview:
      'Golang sengaja tidak menggunakan blok `try-catch` yang sering menyembunyikan alur error. Di Go, error diperlakukan sebagai nilai kembalian biasa (`error` value) sehingga programmer selalu sadar dan menangani setiap kemungkinan kegagalan secara eksplisit.',
    sections: [
      {
        title: '1. Kata Kunci "defer" (Jaminan Eksekusi Akhir)',
        explanation:
          'Baris kode yang diawali kata kunci `defer` akan ditunda eksekusinya dan DIJAMIN baru dijalankan tepat sebelum fungsi berakhir (walaupun fungsi berhenti di tengah jalan karena error!). Sangat berguna untuk menutup koneksi database, menutup file, atau menutup katup darurat.',
        code: `func prosesFile() {
    defer fmt.Println("2. File ditutup dengan aman")
    fmt.Println("1. Sedang membaca isi file...")
}`
      },
      {
        title: '2. Pola Standar Industri: "if err != nil"',
        explanation:
          'Nilai kosong untuk tipe `error` adalah `nil` (artinya aman/tidak ada masalah). Jika `err != nil`, berarti telah terjadi gangguan yang harus ditangani.',
        code: `err := cekSensor(120)
if err != nil {
    fmt.Println("Terjadi Error:", err)
    return
}`
      }
    ],
    cheatSheet: [
      { syntax: 'defer fungsi()', desc: 'Menjadwalkan fungsi agar dijalankan paling akhir sebelum keluar blok' },
      { syntax: 'if err != nil { ... }', desc: 'Memeriksa apakah fungsi menghasilkan error (tidak bernilai nil)' },
      { syntax: 'errors.New("pesan")', desc: 'Membuat objek error baru dengan pesan teks' }
    ],
    commonMistakes: [
      'Mengabaikan variabel `err` tanpa mengecek `if err != nil`, sehingga bug tersembunyi saat sistem gagal bekerja.'
    ]
  },

  14: {
    topicTitle: 'Pengetahuan Dasar: JSON Serialization, Struct Tags & REST API Backend',
    overview:
      'Di dunia nyata, Golang adalah raja dalam pembuatan layanan Backend API dan Microservices. Format komunikasi standar antar aplikasi modern (Web, Mobile Android/iOS, Server Cloud) adalah JSON (JavaScript Object Notation).',
    sections: [
      {
        title: '1. Mengubah Struct menjadi JSON dengan json.Marshal()',
        explanation:
          'Pustaka bawaan `"encoding/json"` menyediakan fungsi `json.Marshal(data)` yang mengubah Struct Go menjadi deretan byte JSON (`[]byte`), lalu dapat kita ubah menjadi teks dengan `string(jsonBytes)`. Ingat: hanya field struct yang diawali HURUF KAPITAL yang bisa diubah ke JSON!',
        code: `type ResponsAPI struct {
    Status string \`json:"status"\`
    Kode   int    \`json:"kode_http"\`
}

res := ResponsAPI{Status: "OK", Kode: 200}
jsonBytes, _ := json.Marshal(res)
fmt.Println(string(jsonBytes)) // {"status":"OK","kode_http":200}`
      },
      {
        title: '2. Membaca JSON menjadi Struct dengan json.Unmarshal()',
        explanation:
          'Sebaliknya, saat server menerima teks JSON dari pengguna, gunakan `json.Unmarshal([]byte(teksJSON), &targetStruct)` (perhatikan tanda pointer `&` agar struct terisi datanya!).',
        code: `var dataMasuk ResponsAPI
json.Unmarshal(jsonBytes, &dataMasuk)`
      }
    ],
    cheatSheet: [
      { syntax: 'json.Marshal(structObj)', desc: 'Serialisasi Struct Go menjadi byte array JSON ([]byte, error)' },
      { syntax: 'string(jsonBytes)', desc: 'Mengonversi hasil []byte menjadi string teks yang bisa dicetak' },
      { syntax: '`json:"nama_field"`', desc: 'Struct Tag untuk mengatur nama key JSON yang dihasilkan' }
    ],
    commonMistakes: [
      'Mencetak hasil `json.Marshal` langsung tanpa `string(...)` (yang tercetak malah deretan angka byte ASCII seperti `[123 34 115...]`), atau membuat nama field Struct dengan huruf kecil sehingga diabaikan oleh `encoding/json`!'
    ]
  }
};
