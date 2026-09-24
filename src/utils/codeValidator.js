/**
 * Code Validator & Smart Golang Diagnostic Engine
 * - Validasi berbasis KONSEP (tidak harus plek-ketiplek sama persis kata-katanya)
 * - Diagnostik spesifik per baris: menunjukkan nomor baris, potongan kode yang salah,
 *   apa yang membuat error, dan petunjuk perbaikan tanpa membocorkan jawaban langsung.
 */

export function validateGolangCode(userCode, level, mission) {
  const rawCode = userCode || "";
  const code = rawCode.trim();
  const rawLines = rawCode.split('\n');

  // Helper: cari nomor baris (1-indexed) berdasarkan regex (mengabaikan baris komentar)
  function findLine(regex, startFromLine = 1) {
    for (let i = startFromLine - 1; i < rawLines.length; i++) {
      const cleanLine = rawLines[i].replace(/\/\/.*$/, '');
      if (regex.test(cleanLine)) return i + 1;
    }
    return null;
  }

  // Helper: ambil isi kode pada baris tertentu
  function getLineContent(lineNum) {
    if (!lineNum || lineNum < 1 || lineNum > rawLines.length) return "";
    return rawLines[lineNum - 1].trim();
  }

  // Helper: buat objek diagnostik terstruktur
  function makeError({ line, errorTitle, compilerMsg, cause, hint }) {
    const snippet = getLineContent(line);
    return {
      success: false,
      output: compilerMsg || `main.go:${line || 1}: syntax/concept error`,
      error: `${errorTitle}${line ? ` (Baris ke-${line})` : ''}`,
      diagnostics: {
        line: line || 1,
        codeSnippet: snippet,
        cause: cause,
        message: cause,
        hint: hint
      }
    };
  }

  // 0. Cek apakah editor kosong
  if (!code) {
    return makeError({
      line: 1,
      errorTitle: "Editor Kode Masih Kosong",
      compilerMsg: "go build: no Go code found in main.go",
      cause: "Tidak ada instruksi kode sama sekali di dalam editor.",
      hint: "Mulai ketikkan struktur program Go kamu atau tekan tombol 'Reset' untuk memunculkan kerangka awal."
    });
  }

  // ============================================================================
  // TAHAP 1: ANALISIS SINTAKS BARIS-DEMI-BARIS (Mendeteksi letak salah secara spesifik)
  // ============================================================================
  let openBraces = 0;
  let lastOpenBraceLine = 1;

  for (let i = 0; i < rawLines.length; i++) {
    const lineNum = i + 1;
    const withoutComment = rawLines[i].replace(/\/\/.*$/, '');
    const trimmed = withoutComment.trim();
    if (!trimmed) continue;

    // 1a. Cek tanda kutip ganda (") yang tidak ditutup pada satu baris (abaikan backtick `)
    if (!trimmed.includes('`')) {
      const doubleQuotes = (trimmed.match(/(?<!\\)"/g) || []).length;
      if (doubleQuotes % 2 !== 0) {
        return makeError({
          line: lineNum,
          errorTitle: "Tanda Kutip String Belum Ditutup",
          compilerMsg: `./main.go:${lineNum}: syntax error: newline in string`,
          cause: `Pada baris ke-${lineNum} (${trimmed}), kamu membuka tanda kutip ganda (") tetapi lupa menutupnya di akhir teks.`,
          hint: `Tambahkan tanda kutip ganda (") di ujung teks pada baris ke-${lineNum} agar menjadi string yang utuh.`
        });
      }
    }

    // 1b. Cek penggunaan tanda kutip satu (') untuk teks panjang (di Go ' hanya untuk 1 karakter/rune)
    const singleQuoteString = trimmed.match(/'([^']{2,})'/);
    if (singleQuoteString) {
      return makeError({
        line: lineNum,
        errorTitle: "Salah Menggunakan Tanda Kutip Tunggal (')",
        compilerMsg: `./main.go:${lineNum}: more than one character in rune literal`,
        cause: `Pada baris ke-${lineNum}, kamu membungkus teks '${singleQuoteString[1]}' dengan kutip satu ('). Di Golang, kutip satu hanya boleh untuk 1 karakter (rune).`,
        hint: `Ganti tanda kutip satu (') pada baris ke-${lineNum} menjadi tanda kutip dua (") seperti "${singleQuoteString[1]}".`
      });
    }

    // 1c. Cek kesalahan huruf besar/kecil pada fmt.Println / fmt.Printf / fmt.Sprint
    if (/\bfmt\.(println|printf|print|sprintf|scanln)\b/.test(trimmed)) {
      const wrongCall = trimmed.match(/\bfmt\.(println|printf|print|sprintf|scanln)\b/)[0];
      const fixedCall = wrongCall.replace('fmt.p', 'fmt.P').replace('fmt.s', 'fmt.S');
      return makeError({
        line: lineNum,
        errorTitle: `Huruf Awal Fungsi '${wrongCall}' Harus Kapital`,
        compilerMsg: `./main.go:${lineNum}: cannot refer to unexported name ${wrongCall}`,
        cause: `Di baris ke-${lineNum} (${trimmed}), kamu menulis '${wrongCall}' dengan huruf kecil. Di Golang, fungsi dari package lain wajib diawali huruf KAPITAL agar bersifat publik (Exported).`,
        hint: `Ubah '${wrongCall}' di baris ke-${lineNum} menjadi '${fixedCall}'.`
      });
    }

    // 1d. Cek tanda kurung biasa ( ) yang tidak seimbang pada baris tersebut
    const cleanStrings = trimmed.replace(/"[^"]*"/g, '""');
    const openParens = (cleanStrings.match(/\(/g) || []).length;
    const closeParens = (cleanStrings.match(/\)/g) || []).length;
    if (openParens !== closeParens && !trimmed.endsWith(',') && !trimmed.endsWith('(')) {
      return makeError({
        line: lineNum,
        errorTitle: "Tanda Kurung '(' dan ')' Tidak Seimbang",
        compilerMsg: `./main.go:${lineNum}: syntax error: unexpected newline, expecting )`,
        cause: `Pada baris ke-${lineNum} (${trimmed}), jumlah kurung buka '(' (${openParens}) tidak sama dengan kurung tutup ')' (${closeParens}).`,
        hint: `Periksa kembali baris ke-${lineNum} dan pastikan setiap panggilan fungsi ditutup dengan tanda ')'.`
      });
    }

    // 1e. Hitung keseimbangan kurung kurawal { }
    for (const ch of cleanStrings) {
      if (ch === '{') {
        openBraces++;
        lastOpenBraceLine = lineNum;
      } else if (ch === '}') {
        openBraces--;
        if (openBraces < 0) {
          return makeError({
            line: lineNum,
            errorTitle: "Kelebihan Kurung Kurawal Tutup '}'",
            compilerMsg: `./main.go:${lineNum}: syntax error: unexpected }`,
            cause: `Pada baris ke-${lineNum}, terdapat kurung kurawal tutup '}' yang tidak memiliki pasangan '{' pembuka.`,
            hint: `Hapus tanda '}' berlebih pada baris ke-${lineNum} atau pastikan blok fungsi/if di atasnya memiliki '{'.`
          });
        }
      }
    }
  }

  if (openBraces > 0) {
    return makeError({
      line: rawLines.length,
      errorTitle: "Kurung Kurawal '{' Belum Ditutup",
      compilerMsg: `./main.go:${rawLines.length}: syntax error: unexpected EOF, expecting }`,
      cause: `Blok kode yang dibuka di sekitar baris ke-${lastOpenBraceLine} belum ditutup dengan tanda kurung kurawal tutup '}'.`,
      hint: `Tambahkan tanda '}' di bagian akhir blok atau di baris paling bawah programmu.`
    });
  }

  // ============================================================================
  // TAHAP 2: PENGECEKAN STRUKTUR WAJIB PROGRAM GOLANG
  // ============================================================================
  const wrongPkgLine = findLine(/^\s*(pakage|Package|package\s+Main)/);
  if (wrongPkgLine) {
    return makeError({
      line: wrongPkgLine,
      errorTitle: "Penulisan 'package main' Kurang Tepat",
      compilerMsg: `./main.go:${wrongPkgLine}: syntax error: invalid package declaration`,
      cause: `Pada baris ke-${wrongPkgLine} (${getLineContent(wrongPkgLine)}), terdapat salah ketik atau huruf kapital pada deklarasi package.`,
      hint: `Gunakan huruf kecil semua: tulis 'package main' di baris ke-${wrongPkgLine}.`
    });
  }

  const pkgLine = findLine(/\bpackage\s+main\b/);
  if (!pkgLine) {
    return makeError({
      line: 1,
      errorTitle: "Deklarasi 'package main' Tidak Ditemukan",
      compilerMsg: "./main.go:1:1: expected 'package', found code",
      cause: "Setiap file program utama di Golang wajib memiliki deklarasi 'package main' di bagian paling atas.",
      hint: "Tambahkan 'package main' pada baris pertama editor."
    });
  }

  const wrongImportLine = findLine(/^\s*import\s+fmt\b/);
  if (wrongImportLine) {
    return makeError({
      line: wrongImportLine,
      errorTitle: "Nama Package Import Kurang Tanda Kutip",
      compilerMsg: `./main.go:${wrongImportLine}: syntax error: import path must be a string`,
      cause: `Pada baris ke-${wrongImportLine} (${getLineContent(wrongImportLine)}), nama package 'fmt' ditulis tanpa tanda kutip ganda.`,
      hint: `Bungkus nama package dengan tanda kutip ganda pada baris ke-${wrongImportLine} menjadi: import "fmt"`
    });
  }

  const mainFuncLine = findLine(/\bfunc\s+main\s*\(\s*\)/);
  if (!mainFuncLine) {
    const anyFuncLine = findLine(/\bfunc\b/) || pkgLine + 2;
    return makeError({
      line: anyFuncLine,
      errorTitle: "Fungsi Gerbang Utama 'func main()' Tidak Ditemukan",
      compilerMsg: "runtime.main_main: function main is undeclared in the main package",
      cause: `Program mandiri Go membutuhkan 'func main()' sebagai titik awal eksekusi, namun belum ditemukan di sekitar baris ke-${anyFuncLine}.`,
      hint: "Pastikan kamu menuliskan 'func main() {' dengan huruf kecil semua."
    });
  }

  // Bersihkan komentar untuk pemeriksaan konsep
  const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  const expectedOutput = mission?.expectedOutput || level?.expectedOutput || "Program berhasil dijalankan!";

  // Helper: ekstrak semua isi cetakan fmt.Print* dari kode user agar simulasi terasa nyata
  function extractPrintedOutputs() {
    const matches = [...cleanCode.matchAll(/fmt\.Print(?:ln|f)?\s*\(([^)]+)\)/g)];
    if (matches.length === 0) return expectedOutput;
    const extracted = matches.map(m => {
      // Ambil isi argumen dan bersihkan tanda kutip jika murni string
      const rawArgs = m[1].split(',').map(arg => {
        const s = arg.trim();
        if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith('`') && s.endsWith('`'))) {
          return s.slice(1, -1);
        }
        return null;
      });
      if (rawArgs.every(a => a !== null)) {
        return rawArgs.join(' ');
      }
      return null;
    });
    if (extracted.every(e => e !== null) && extracted.length > 0) {
      return extracted.join('\n');
    }
    return expectedOutput;
  }

  // ============================================================================
  // TAHAP 3: VALIDASI BERBASIS KONSEP PER LEVEL (Fleksibel, Tidak Harus Plek-Ketiplek!)
  // ============================================================================
  switch (level.id) {
    case 1: {
      // Konsep Level 1: import "fmt" + minimal 3 pemanggilan fmt.Println dengan isi tidak kosong
      if (!findLine(/import\s+"fmt"|import\s*\([\s\S]*?"fmt"/)) {
        return makeError({
          line: pkgLine + 1,
          errorTitle: "Package 'fmt' Belum Di-import",
          compilerMsg: `./main.go:${mainFuncLine + 1}: undefined: fmt`,
          cause: "Kamu mencoba mencetak teks ke layar, tetapi pustaka standar \"fmt\" belum di-import di bawah package main.",
          hint: `Tambahkan baris import "fmt" di sekitar baris ke-${pkgLine + 1}.`
        });
      }

      const printCalls = [...cleanCode.matchAll(/fmt\.Print(?:ln|f)?\s*\(\s*([^)]*)\s*\)/g)];
      const validPrints = printCalls.filter(m => m[1] && m[1].trim().length > 0);

      if (validPrints.length < 3) {
        const errLine = findLine(/fmt\.Print/) || mainFuncLine + 1;
        return makeError({
          line: errLine,
          errorTitle: `Jumlah Baris Cetak Baru ${validPrints.length} dari 3 Tahap`,
          compilerMsg: `Output kurang lengkap: ditemukan ${validPrints.length} instruksi cetak, dibutuhkan minimal 3 tahap berurutan.`,
          cause: `Misi ini melatih konsep eksekusi berurutan (top-to-bottom) dengan 3 tahap output, tetapi di dalam func main() baru ada ${validPrints.length} panggilan fmt.Println yang berisi teks.`,
          hint: `Pastikan ada 3 baris pemanggilan fmt.Println("...") di dalam func main() mulai dari baris ke-${mainFuncLine + 1}. (Teks tidak harus sama persis huruf per huruf, yang penting ada 3 tahap pesan inisialisasi!)`
        });
      }

      return {
        success: true,
        output: extractPrintedOutputs(),
        diagnostics: {
          message: "Konsep struktur dasar Go & urutan eksekusi 3 tahap sudah tepat!"
        }
      };
    }

    case 2: {
      // Konsep Level 2: Deklarasi variabel + operasi aritmatika (+, -, *, /) + cetak hasil
      const varDecls = [...cleanCode.matchAll(/(?:\bvar\s+\w+|\w+\s*:=)\s*([^\n;]+)/g)];
      if (varDecls.length < 2) {
        return makeError({
          line: mainFuncLine + 1,
          errorTitle: "Deklarasi Variabel Belum Lengkap",
          compilerMsg: `./main.go:${mainFuncLine + 1}: missing variable declarations for calculation`,
          cause: `Baru ditemukan ${varDecls.length} variabel di dalam func main(). Misi ini membutuhkan variabel untuk menampung angka input dan variabel hasil perhitungan.`,
          hint: `Deklarasikan variabel menggunakan operator ':=' di bawah baris ke-${mainFuncLine}, lalu simpan rumus perhitungannya ke dalam variabel baru.`
        });
      }

      // Cek apakah ada rumus matematika menggunakan operator +, -, *, atau /
      const hasFormulaLine = findLine(/[a-zA-Z0-9_)\s][\+\-\*\/]\s*[a-zA-Z0-9_(]/, mainFuncLine);
      if (!hasFormulaLine) {
        return makeError({
          line: mainFuncLine + 2,
          errorTitle: "Rumus Kalkulasi Aritmatika Belum Ditemukan",
          compilerMsg: `./main.go:${mainFuncLine + 2}: arithmetic operator (+, -, *, /) not found`,
          cause: "Kamu sudah membuat variabel, tetapi belum menghitung hasilnya menggunakan operator matematika (seperti -, *, +).",
          hint: `Buat satu variabel hasil di sekitar baris ke-${mainFuncLine + 2} yang menghitung variabel-variabel sebelumnya dengan operator matematika (misal: hasil := a - (b * c)).`
        });
      }

      const printLine = findLine(/fmt\.Print/, mainFuncLine);
      if (!printLine) {
        return makeError({
          line: hasFormulaLine + 1,
          errorTitle: "Hasil Perhitungan Belum Dicetak",
          compilerMsg: `./main.go:${hasFormulaLine}: variable declared and not used`,
          cause: `Di Go, variabel hasil yang sudah dihitung di baris ke-${hasFormulaLine} wajib digunakan/dicetak. Jika tidak, compiler Go akan menolak kompilasi.`,
          hint: `Tambahkan fmt.Println(...) di baris ke-${hasFormulaLine + 1} untuk menampilkan variabel hasil perhitunganmu.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep deklarasi variabel dan operasi aritmatika Go sudah benar!" }
      };
    }

    case 3: {
      // Konsep Level 3: Percabangan if dengan operator logika (&& atau ||) + perbandingan
      const ifLine = findLine(/\bif\b/, mainFuncLine);
      if (!ifLine) {
        return makeError({
          line: mainFuncLine + 2,
          errorTitle: "Percabangan 'if' Belum Digunakan",
          compilerMsg: `./main.go:${mainFuncLine + 2}: missing conditional 'if' statement`,
          cause: "Misi ini menguji konsep evaluasi syarat kondisi menggunakan pernyataan 'if', namun belum ditemukan blok 'if' di dalam func main().",
          hint: `Tambahkan pernyataan 'if syarat1 && syarat2 { ... }' di sekitar baris ke-${mainFuncLine + 2}.`
        });
      }

      const hasLogicOp = /\bif\s+[^{]*(&&|\|\|)/.test(cleanCode);
      if (!hasLogicOp) {
        return makeError({
          line: ifLine,
          errorTitle: "Operator Logika Ganda (&&) Belum Dipakai di 'if'",
          compilerMsg: `./main.go:${ifLine}: single condition detected, expected compound logic (&&)`,
          cause: `Pada baris ke-${ifLine} (${getLineContent(ifLine)}), kamu baru memeriksa satu kondisi saja. Gerbang keamanan membutuhkan verifikasi 2 syarat sekaligus.`,
          hint: `Gabungkan kedua syarat pada baris ke-${ifLine} menggunakan operator '&&' (AND), contoh: if syaratA && syaratB {`
        });
      }

      if (!findLine(/fmt\.Print/, ifLine)) {
        return makeError({
          line: ifLine + 1,
          errorTitle: "Belum Mencetak Status di Dalam Blok Kondisi",
          compilerMsg: `./main.go:${ifLine + 1}: empty conditional body`,
          cause: `Blok 'if' pada baris ke-${ifLine} belum mencetak pesan hasil otorisasi ke terminal.`,
          hint: `Tambahkan fmt.Println(...) di dalam blok kurung kurawal setelah baris ke-${ifLine}.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep percabangan if dan operator logika && sudah tepat!" }
      };
    }

    case 4: {
      // Konsep Level 4: Perulangan for + percabangan if di dalam loop
      const forLine = findLine(/\bfor\b/, mainFuncLine);
      if (!forLine) {
        return makeError({
          line: mainFuncLine + 1,
          errorTitle: "Perulangan 'for' Tidak Ditemukan",
          compilerMsg: `./main.go:${mainFuncLine + 1}: missing 'for' loop construct`,
          cause: "Untuk memantau perubahan nilai secara bertahap, kamu wajib menggunakan perulangan 'for', bukan menulis manual satu per satu.",
          hint: `Buat perulangan 'for' di baris ke-${mainFuncLine + 1} dengan format: for variabel := awal; variabel <= batas; variabel += step {`
        });
      }

      const ifInLoopLine = findLine(/\bif\b/, forLine);
      if (!ifInLoopLine) {
        return makeError({
          line: forLine + 1,
          errorTitle: "Belum Ada Filter 'if' di Dalam Perulangan 'for'",
          compilerMsg: `./main.go:${forLine + 1}: missing condition filter inside loop`,
          cause: `Perulangan 'for' sudah dibuat di baris ke-${forLine}, tetapi belum ada pengecekan 'if' di dalamnya untuk membedakan status normal dan kritis/alarm.`,
          hint: `Di dalam blok 'for' (baris ke-${forLine + 1}), tambahkan 'if' dan 'else' untuk mengecek nilai variabel loop di setiap putaran.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep kombinasi perulangan for dan filter kondisi if-else berhasil dikuasai!" }
      };
    }

    case 5: {
      // Konsep Level 5: Custom function dengan parameter & multiple return (atau return nilai) + pemanggilan
      const customFuncLine = findLine(/func\s+(?!main\b)\w+\s*\(/);
      if (!customFuncLine) {
        return makeError({
          line: pkgLine + 2,
          errorTitle: "Fungsi Modular Baru Belum Didefinisikan",
          compilerMsg: "./main.go: missing helper function declaration outside main()",
          cause: "Misi ini meminta pembuatan fungsi khusus di luar 'func main()' untuk mengolah data dan mengembalikan hasil.",
          hint: "Buat fungsi dengan format: func namaFungsi(param1 int, param2 int) (int, string) { ... }"
        });
      }

      const returnLine = findLine(/\breturn\b/, customFuncLine);
      if (!returnLine) {
        return makeError({
          line: customFuncLine + 2,
          errorTitle: "Kata Kunci 'return' Belum Ada di Dalam Fungsi",
          compilerMsg: `./main.go:${customFuncLine + 2}: missing return at end of function`,
          cause: `Fungsi pada baris ke-${customFuncLine} sudah dideklarasikan memiliki nilai kembalian, namun belum mengembalikan nilai dengan 'return'.`,
          hint: `Tambahkan pernyataan 'return hasilAngka, statusTeks' di dalam fungsi tersebut (sekitar baris ke-${customFuncLine + 2}).`
        });
      }

      const funcNameMatch = getLineContent(customFuncLine).match(/func\s+(\w+)/);
      const funcName = funcNameMatch ? funcNameMatch[1] : null;
      const calledInMain = funcName ? findLine(new RegExp(`\\b${funcName}\\s*\\(`), mainFuncLine) : true;

      if (!calledInMain) {
        return makeError({
          line: mainFuncLine + 1,
          errorTitle: `Fungsi '${funcName}()' Belum Dipanggil di func main()`,
          compilerMsg: `./main.go:${mainFuncLine + 1}: function ${funcName} is defined but never called`,
          cause: `Kamu sudah membuat fungsi '${funcName}' dengan baik di baris ke-${customFuncLine}, tetapi belum memanggilnya di dalam 'func main()'.`,
          hint: `Panggil '${funcName}(...)' di baris ke-${mainFuncLine + 1}, tampung hasilnya di variabel, lalu cetak dengan fmt.Println.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep fungsi modular dan return value berhasil diterapkan!" }
      };
    }

    case 6: {
      // Konsep Level 6: Slice/Array + iterasi for range + perhitungan/akumulasi
      const rangeLine = findLine(/\bfor\s+.*?\brange\b/, mainFuncLine);
      if (!rangeLine) {
        return makeError({
          line: mainFuncLine + 2,
          errorTitle: "Iterasi Slice dengan 'for ... range' Belum Ditemukan",
          compilerMsg: `./main.go:${mainFuncLine + 2}: expected 'for _, val := range slice'`,
          cause: "Untuk menelusuri seluruh elemen di dalam Slice secara idiomatik di Go, gunakan kata kunci 'range' pada loop 'for'.",
          hint: `Gunakan pola: for _, nilai := range namaSlice { ... } di sekitar baris ke-${mainFuncLine + 2}.`
        });
      }

      const hasConditionOrCounter = findLine(/\bif\b|\+\+|\+=/, rangeLine);
      if (!hasConditionOrCounter) {
        return makeError({
          line: rangeLine + 1,
          errorTitle: "Logika Pemrosesan Data di Dalam Loop 'range' Belum Ada",
          compilerMsg: `./main.go:${rangeLine + 1}: loop body does not filter or accumulate values`,
          cause: `Pada loop 'range' di baris ke-${rangeLine}, kamu belum mengecek kondisi elemen atau menambahkan counter (+= / ++).`,
          hint: `Di baris ke-${rangeLine + 1}, tambahkan pengecekan 'if' dan naikkan variabel penghitung (misal: counter++).`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep Slice dan iterasi 'for range' sudah benar!" }
      };
    }

    case 7: {
      // Konsep Level 7: Pointer (* untuk tipe/dereference dan & untuk alamat memori)
      const ptrParamLine = findLine(/func\s+\w+\s*\([^)]*\*+\w+/);
      if (!ptrParamLine) {
        return makeError({
          line: pkgLine + 3,
          errorTitle: "Parameter Pointer (*int / *string) Belum Ditemukan pada Fungsi",
          compilerMsg: "./main.go: function parameter must be a pointer type (*T)",
          cause: "Agar fungsi dapat mengubah nilai asli di memori tanpa menyalinnya, parameter fungsi harus bertipe pointer (menggunakan tanda bintang *).",
          hint: "Pastikan tanda '*' menempel pada tipe data parameter fungsi, contoh: func ubahData(ptr *int)"
        });
      }

      const derefLine = findLine(/\*\s*\w+\s*(=|\+=|-=|\*=)/, ptrParamLine);
      if (!derefLine) {
        return makeError({
          line: ptrParamLine + 1,
          errorTitle: "Dereference Pointer (*variabel = ...) Belum Dilakukan",
          compilerMsg: `./main.go:${ptrParamLine + 1}: pointer value is never mutated via dereference (*)`,
          cause: `Di dalam fungsi pada baris ke-${ptrParamLine}, kamu belum mengubah nilai di alamat memori pointer tersebut menggunakan operator '*'.`,
          hint: `Gunakan tanda bintang di depan nama variabel pointer pada baris ke-${ptrParamLine + 1}, contoh: *ptr = nilaiBaru`
        });
      }

      const addrLine = findLine(/&\s*\w+/, mainFuncLine);
      if (!addrLine) {
        return makeError({
          line: mainFuncLine + 2,
          errorTitle: "Operator Alamat Memori (&) Belum Dipakai Saat Memanggil Fungsi",
          compilerMsg: `./main.go:${mainFuncLine + 2}: cannot use variable (type int) as type *int in argument`,
          cause: `Saat memanggil fungsi pointer di dalam 'func main()' (sekitar baris ke-${mainFuncLine + 2}), kamu harus mengirimkan alamat memorinya menggunakan tanda '&'.`,
          hint: `Tambahkan simbol '&' di depan variabel argumen saat memanggil fungsi di baris ke-${mainFuncLine + 2}, contoh: namaFungsi(&variabel)`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep Pointer (& address-of dan * dereference) telah dikuasai!" }
      };
    }

    case 8: {
      // Konsep Level 8: Struct + Method Receiver
      const structLine = findLine(/type\s+\w+\s+struct\b/);
      if (!structLine) {
        return makeError({
          line: pkgLine + 2,
          errorTitle: "Definisi 'struct' Tidak Ditemukan",
          compilerMsg: "./main.go: missing struct type definition",
          cause: "Misi ini membutuhkan pembuatan tipe data komposit 'struct' untuk merepresentasikan entitas objek.",
          hint: "Definisikan struct dengan pola: type NamaStruct struct { Field1 string; Field2 int }"
        });
      }

      const receiverLine = findLine(/func\s*\(\s*\w+\s+\*?\w+\s*\)\s*\w+/);
      if (!receiverLine) {
        return makeError({
          line: structLine + 4,
          errorTitle: "Method dengan Receiver Struct Belum Dibuat",
          compilerMsg: `./main.go:${structLine + 4}: expected method receiver func (s *Struct) MethodName()`,
          cause: `Struct sudah dibuat di baris ke-${structLine}, namun belum memiliki method receiver yang menempel pada struct tersebut.`,
          hint: `Buat method dengan pointer receiver di sekitar baris ke-${structLine + 4}: func (obj *NamaStruct) NamaMethod(...) { ... }`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep Struct dan Pointer Receiver Method sudah tepat!" }
      };
    }

    case 9: {
      // Konsep Level 9: Interface + Implementasi Method pada Struct
      const ifaceLine = findLine(/type\s+\w+\s+interface\b/);
      if (!ifaceLine) {
        return makeError({
          line: pkgLine + 2,
          errorTitle: "Definisi 'interface' Belum Ada",
          compilerMsg: "./main.go: missing interface type declaration",
          cause: "Misi ini menguji konsep polimorfisme Go menggunakan kontrak 'interface'.",
          hint: "Deklarasikan interface dengan: type NamaInterface interface { NamaMethod() TipeReturn }"
        });
      }

      const methodLine = findLine(/func\s*\(\s*\w+\s+\*?\w+\s*\)\s*\w+/);
      if (!methodLine) {
        return makeError({
          line: ifaceLine + 5,
          errorTitle: "Struct Belum Mengimplementasikan Method dari Interface",
          compilerMsg: `./main.go:${ifaceLine + 5}: struct does not implement interface (missing method receiver)`,
          cause: `Interface pada baris ke-${ifaceLine} membutuhkan struct yang mengimplementasikan method-method di dalamnya.`,
          hint: `Buat method receiver untuk struct kamu di sekitar baris ke-${ifaceLine + 5} agar otomatis memenuhi kontrak interface.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep Interface dan Polimorfisme implisit Go berhasil diterapkan!" }
      };
    }

    case 10: {
      // Konsep Level 10: Concurrency dengan Goroutine ('go namaFungsi(...)')
      const goMatches = [...cleanCode.matchAll(/\bgo\s+\w+\s*\(/g)];
      if (goMatches.length < 1) {
        return makeError({
          line: mainFuncLine + 1,
          errorTitle: "Kata Kunci Goroutine 'go' Belum Digunakan",
          compilerMsg: `./main.go:${mainFuncLine + 1}: tasks executed synchronously, expected 'go' keyword`,
          cause: "Untuk menjalankan fungsi secara konkuren (asinkron di latar belakang), pemanggilan fungsi harus diawali kata kunci 'go'.",
          hint: `Tambahkan kata kunci 'go' di depan pemanggilan fungsi pada baris ke-${mainFuncLine + 1}, contoh: go namaFungsi("...")`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep Concurrency dengan Goroutine ('go') berhasil dijalankan!" }
      };
    }

    case 11: {
      // Konsep Level 11: Channel ('make(chan ...)' dan operator '<-')
      const makeChanLine = findLine(/make\s*\(\s*chan\b/);
      if (!makeChanLine) {
        return makeError({
          line: mainFuncLine + 1,
          errorTitle: "Inisialisasi Channel 'make(chan ...)' Belum Ada",
          compilerMsg: `./main.go:${mainFuncLine + 1}: uninitialized channel (nil channel deadlock)`,
          cause: "Sebelum mengirim atau menerima data antar goroutine, pipa channel wajib dibuat menggunakan fungsi make(chan TipeData).",
          hint: `Buat channel terlebih dahulu di baris ke-${mainFuncLine + 1}, contoh: ch := make(chan int)`
        });
      }

      const arrowLine = findLine(/<-/);
      if (!arrowLine) {
        return makeError({
          line: makeChanLine + 2,
          errorTitle: "Operator Aliran Data Channel '<-' Belum Digunakan",
          compilerMsg: `./main.go:${makeChanLine + 2}: fatal error: all goroutines are asleep - deadlock!`,
          cause: `Channel sudah dibuat di baris ke-${makeChanLine}, tetapi belum ada proses pengiriman (ch <- data) maupun penerimaan (<-ch).`,
          hint: `Gunakan operator panah '<-' untuk mengirim nilai ke channel dan membacanya kembali di func main().`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep komunikasi Goroutine dengan Channel ('make(chan)' & '<-') sudah tepat!" }
      };
    }

    case 12: {
      // Konsep Level 12: Mutex ('Lock()' dan 'Unlock()')
      const lockLine = findLine(/\.Lock\s*\(\s*\)/);
      if (!lockLine) {
        return makeError({
          line: mainFuncLine - 3 > 0 ? mainFuncLine - 3 : mainFuncLine + 1,
          errorTitle: "Penguncian Memori '.Lock()' Belum Dipasang",
          compilerMsg: "WARNING: DATA RACE DETECTED on shared variable!",
          cause: "Saat variabel diakses/diubah secara bersama-sama, kamu harus mengunci akses menggunakan Mutex '.Lock()' agar data tidak korup.",
          hint: "Panggil mu.Lock() tepat sebelum baris kode yang memodifikasi variabel bersama."
        });
      }

      const unlockLine = findLine(/\.Unlock\s*\(\s*\)/);
      if (!unlockLine) {
        return makeError({
          line: lockLine + 2,
          errorTitle: "Pelepasan Kunci '.Unlock()' Belum Dipanggil",
          compilerMsg: `./main.go:${lockLine + 2}: fatal error: sync: unlock of locked mutex missing (deadlock)`,
          cause: `Kamu sudah memanggil Lock() di baris ke-${lockLine}, tetapi lupa memanggil Unlock() setelah selesai mengubah data sehingga program akan macet (deadlock)!`,
          hint: `Tambahkan mu.Unlock() (atau defer mu.Unlock()) setelah operasi perubahan data di sekitar baris ke-${lockLine + 2}.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep sinkronisasi memori dengan sync.Mutex (Lock & Unlock) sudah aman!" }
      };
    }

    case 13: {
      // Konsep Level 13: Defer & Error Handling ('defer' dan 'err != nil')
      const deferLine = findLine(/\bdefer\b/);
      if (!deferLine) {
        return makeError({
          line: mainFuncLine + 1,
          errorTitle: "Pernyataan 'defer' Belum Digunakan",
          compilerMsg: `./main.go:${mainFuncLine + 1}: cleanup procedure was not deferred`,
          cause: "Misi ini mengharuskan penggunaan 'defer' agar instruksi penutupan/pembersihan dijamin tetap dieksekusi di akhir fungsi.",
          hint: `Tambahkan kata kunci 'defer' di depan pemanggilan fungsi penutupan/cetak pada baris ke-${mainFuncLine + 1}.`
        });
      }

      const errCheckLine = findLine(/\berr\s*!=\s*nil\b/);
      if (!errCheckLine) {
        return makeError({
          line: deferLine + 2,
          errorTitle: "Penanganan Error 'if err != nil' Belum Ditemukan",
          compilerMsg: `./main.go:${deferLine + 2}: unhandled error return value`,
          cause: "Dalam standar industri Go, setiap fungsi yang berpotensi menghasilkan error wajib diperiksa dengan pola 'if err != nil'.",
          hint: `Tambahkan pengecekan 'if err != nil { ... }' setelah memanggil fungsi pemeriksaan di sekitar baris ke-${deferLine + 2}.`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Konsep Error Handling ('if err != nil') dan 'defer' telah diterapkan dengan benar!" }
      };
    }

    case 14: {
      // Konsep Level 14: JSON Serialization ('json.Marshal' / 'json.Unmarshal')
      const marshalLine = findLine(/json\.(Marshal|Unmarshal|NewEncoder)/);
      if (!marshalLine) {
        return makeError({
          line: mainFuncLine + 2,
          errorTitle: "Fungsi Serialisasi 'json.Marshal' Belum Dipanggil",
          compilerMsg: `./main.go:${mainFuncLine + 2}: struct was not serialized to JSON format`,
          cause: "Untuk mengubah struct Go menjadi payload teks JSON yang siap dikirim lewat API, gunakan fungsi json.Marshal(...) dari package encoding/json.",
          hint: `Panggil json.Marshal(dataStruct) di sekitar baris ke-${mainFuncLine + 2}, lalu ubah byte hasilnya menjadi string dengan string(jsonBytes).`
        });
      }

      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Selamat! Konsep JSON Serialization untuk Cloud & REST API telah dikuasai!" }
      };
    }

    default:
      return {
        success: true,
        output: expectedOutput,
        diagnostics: { message: "Semua pengujian konsep berhasil lolos!" }
      };
  }
}
