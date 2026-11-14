# Karhutla, dinasti politik, dan APBN

Website statis. Tidak perlu server atau build.

## Pasang di GitHub Pages
1. Buat repository baru di GitHub (publik), lalu upload semua isi folder ini.
2. Buka Settings > Pages. Pada Source pilih "Deploy from a branch", branch `main`, folder `/ (root)`, lalu Save.
3. Tunggu 1-2 menit. Alamatnya: `https://USERNAME.github.io/NAMA-REPO/`

## Ganti data
Taruh `data.json` dan tiga file CSV di satu folder, lalu jalankan `python build_data.py FOLDER_ITU`. File `data/data.json` akan dibuat ulang.
Fakta berita ada di `data/facts.json` (format: t = k/p/d, d = tanggal, w = pihak, s = pernyataan, u = tautan).

## Tes lokal
`python -m http.server 8000`, lalu buka http://localhost:8000
