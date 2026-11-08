/**
 * FAQ beranda.
 *
 * Dipisah dari halaman supaya bisa dipakai ulang (mis. untuk schema markup)
 * tanpa menumpuk halaman dengan data panjang.
 */
export const faqs = [
  { q: 'Apa perbedaan bore pile manual dan bore pile mesin?', a: 'Bore pile manual (strauss pile) dikerjakan tanpa mesin besar, cocok untuk lahan sempit dan proyek skala menengah. Bore pile mesin menggunakan mini crane atau hydraulic drilling rig, cocok untuk kedalaman dan kapasitas beban lebih besar.' },
  { q: 'Berapa harga jasa bore pile per meter?', a: 'Harga jasa bore pile berkisar Rp135.000 hingga Rp350.000 per meter, tergantung diameter (30-80 cm) dan metode yang digunakan (mesin mini crane atau alat berat).' },
  { q: 'Apakah bore pile aman untuk bangunan yang berdempetan?', a: 'Ya. Bore pile bekerja dengan mengekstraksi tanah, bukan memukul/mendesak tanah seperti tiang pancang, sehingga minim getaran dan aman untuk bangunan tetangga yang menempel.' },
  { q: 'Apa itu dry boring, wash boring, dan slurry boring?', a: 'Dry boring untuk tanah solid; wash boring untuk tanah berpasir/berair dengan bantuan tekanan air; slurry/casing boring untuk tanah labil menggunakan larutan bentonite agar dinding lubang tidak longsor.' },
  { q: 'Apakah perlu soil test sebelum menentukan metode pondasi?', a: 'Ya, sangat disarankan. Soil test/sondir membantu menentukan kedalaman, diameter, dan metode yang tepat sesuai kondisi tanah aktual di lokasi proyek.' },
  { q: 'Standar SNI apa yang digunakan untuk pondasi bore pile?', a: 'Kami mengikuti SNI 8460:2017 (perancangan geoteknik), SNI 2847:2019 (beton struktural), dan SNI 1726:2012 (ketahanan gempa).' },
  { q: 'Apa itu PDA Test, PIT Test, dan Static Load Test?', a: 'PDA Test mengukur daya dukung dinamis pasca-pengecoran, PIT Test mengecek keutuhan beton di dalam tanah, dan Static Load Test memvalidasi daya dukung aktual tiang secara langsung.' },
  { q: 'Apakah tersedia paket jasa termasuk material?', a: 'Ya, tersedia paket all-in (jasa + besi + beton ready mix) maupun paket jasa saja sesuai kebutuhan proyek Anda.' },
  { q: 'Wilayah mana saja yang dilayani?', a: 'Kami melayani proyek di Jawa Tengah, Jawa Timur, Jawa Barat, Yogyakarta, Jakarta, Banten, dan Bali.' },
  { q: 'Apakah bisa konsultasi dan survey lokasi gratis?', a: 'Ya, kami menyediakan konsultasi awal dan tinjauan gambar denah tanpa biaya sebelum kesepakatan kontrak kerja.' },
  { q: 'Berapa lama pengerjaan bore pile per titik?', a: 'Waktu bervariasi tergantung kedalaman dan jenis tanah; metode mesin (mini crane/hydraulic rig) umumnya lebih cepat dibanding metode manual strauss pile.' },
  { q: 'Berapa kedalaman ideal bore pile untuk rumah 2 lantai?', a: 'Kedalaman ideal ditentukan dari hasil soil test, bukan angka baku — namun umumnya berkisar 6-12 meter untuk rumah 2 lantai, tergantung kondisi tanah setempat.' },
  { q: 'Berapa diameter bore pile yang direkomendasikan untuk ruko?', a: 'Diameter 30-40 cm umumnya cukup untuk ruko 2-3 lantai, namun tetap perlu disesuaikan dengan hasil perhitungan struktur dan kondisi tanah.' },
  { q: 'Apakah bore pile lebih mahal dari tiang pancang?', a: 'Tergantung skala proyek dan kondisi lokasi. Bore pile sering lebih ekonomis untuk proyek dengan akses terbatas karena tidak memerlukan alat pancang besar dan minim getaran.' },
  { q: 'Bagaimana jika hasil pengerjaan tidak sesuai spesifikasi kontrak?', a: 'Setiap lingkup kerja dan spesifikasi sudah tertuang jelas dalam kontrak kami — bila ditemukan ketidaksesuaian, hal ini dapat ditindaklanjuti sesuai ketentuan kontrak kerja yang disepakati.' },
  { q: 'Berapa minimal volume pengerjaan untuk satu proyek?', a: 'Silakan hubungi tim kami untuk konsultasi lebih lanjut, karena minimal volume dapat menyesuaikan lokasi dan jenis proyek.' },
  { q: 'Apakah ada biaya mobilisasi alat ke lokasi proyek?', a: 'Ya, biaya mobilisasi disesuaikan dengan jarak dan aksesibilitas lokasi proyek, dan akan diinformasikan secara transparan sebelum kontrak disepakati.' },
  { q: 'Bagaimana cara menghitung jumlah titik bore pile yang dibutuhkan?', a: 'Jumlah titik dihitung berdasarkan beban struktur bangunan dan daya dukung tanah hasil soil test — tim engineer kami membantu perhitungan ini saat konsultasi.' },
  { q: 'Apa saja jenis bangunan yang bisa menggunakan jasa ini?', a: 'Rumah tinggal, ruko, gudang, pabrik, gedung bertingkat, sekolah, dan tempat ibadah — seluruhnya dapat menggunakan bore pile manual maupun mesin sesuai kebutuhan strukturnya.' },
  { q: 'Apakah PT. Jowo Land Construction pernah mengerjakan proyek BUMN?', a: 'Ya, kami telah dipercaya oleh sejumlah kontraktor besar dan BUMN seperti Hutama Karya, Waskita Karya, dan Wijaya Karya.' },
  { q: 'Apa risiko memilih kontraktor bore pile dengan harga sangat murah?', a: 'Harga yang jauh di bawah pasar berisiko pada kualitas pengerjaan, ketiadaan uji kualitas pasca-konstruksi, atau operator yang tidak bersertifikat — pekerjaan bore pile membutuhkan skill dan biaya yang tidak sedikit.' },
  { q: 'Apa itu SIO, SILO, dan NIB dalam legalitas kontraktor?', a: 'NIB adalah izin usaha resmi, SILO adalah sertifikasi kelayakan alat berat, dan SIO adalah sertifikasi operator dari Kemenaker — ketiganya wajib dimiliki kontraktor bore pile yang legal.' },
  { q: 'Apakah operator alat bor sudah bersertifikat resmi?', a: 'Ya, seluruh operator kami tersertifikasi SIO dari Kemenaker dan proyek diawasi langsung oleh engineer bersertifikat di bidang geoteknik.' },
  { q: 'Bagaimana cara memesan jasa bore pile melalui WhatsApp?', a: 'Klik tombol WhatsApp di halaman ini, sampaikan lokasi dan gambar denah (jika ada) proyek Anda, dan tim kami akan merespons dengan estimasi awal secara cepat.' },
  { q: 'Apakah bore pile mempengaruhi bangunan tetangga saat pengeboran?', a: 'Risiko sangat minim karena bore pile bekerja dengan mengekstraksi tanah secara bertahap, berbeda dengan metode pemukulan pada tiang pancang yang berisiko getaran lebih besar.' },
  { q: 'Apa yang membedakan kontraktor bore pile profesional dan yang kurang berpengalaman?', a: 'Kontraktor profesional memiliki legalitas lengkap, peralatan terawat, tenaga ahli bersertifikat, transparansi kontrak, dan menerapkan uji kualitas pasca-pengecoran (PDA/PIT/Static Load Test), bukan hanya mengandalkan harga murah.' },
  { q: 'Apakah tersedia garansi untuk pekerjaan bore pile?', a: 'Lingkup jaminan pekerjaan tertuang dalam kontrak kerja yang disepakati di awal proyek, silakan konsultasikan detailnya dengan tim kami.' },
  { q: 'Apakah bisa request jadwal pengerjaan yang cepat?', a: 'Kami menerima kuota proyek terbatas setiap bulan untuk menjaga kualitas, silakan hubungi kami sesegera mungkin untuk mengamankan jadwal proyek Anda.' },
];
