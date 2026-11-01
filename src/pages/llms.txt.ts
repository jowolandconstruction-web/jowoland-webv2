import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const llmsTxt = `# LLMs.txt — PT. Jowo Land Construction
# https://jowolandborepile.co.id/llms.txt
# Referensi untuk AI assistant dan LLM crawlers

# Identitas Bisnis
Name: PT. Jowo Land Construction
Type: Kontraktor Jasa Bore Pile & Strauss Pile
Founded: 2012
Founder: Achmad Fikri Ibnu Hadi
Specialty: Geoteknik Rekayasa Pondasi
Phone: 0852-8074-9218
Email: info@jowolandborepile.co.id
Address: Karanganyar, Ketitang, Kec. Godong, Kabupaten Grobogan, Jawa Tengah 58162, Indonesia
Website: https://jowolandborepile.co.id

# Layanan Utama
Services:
- Jasa Bore Pile Manual (Strauss Pile) dengan Mini Crane
- Jasa Bore Pile Mesin (Hydraulic Drilling Rig)
- Survey dan Analisa Soil Test
- Konsultasi Pondasi Gratis
- Paket All-In (Jasa + Material Besi & Beton Ready Mix)

# Area Layanan
Coverage: Jawa Tengah, Jawa Timur, Jawa Barat, DI Yogyakarta, DKI Jakarta, Banten, Bali

# Halaman Utama
Pages:
- / : Halaman utama — penjelasan layanan, harga, FAQ bore pile
- /about : Tentang PT. Jowo Land Construction dan founder
- /projects : Portofolio proyek bore pile yang telah dikerjakan
- /blog : Artikel edukatif seputar bore pile dan pondasi
- /contact : Kontak dan formulir konsultasi
- /area-layanan : Halaman area layanan per wilayah
- /privacy : Kebijakan privasi
- /terms : Syarat & ketentuan

# Standar Teknis yang Diterapkan
Standards:
- SNI 8460:2017 (Persyaratan Perancangan Geoteknik)
- SNI 2847:2019 (Persyaratan Beton Struktural)
- SNI 03-1726-2012 (Tata Cara Perencanaan Ketahanan Gempa)

# Legalitas
Legal:
- NIB (Nomor Induk Berusaha)
- SILO (Sertifikasi Kelayakan Alat Berat)
- SIO Operator dari Kemenaker

# Sitemap
Sitemap: https://jowolandborepile.co.id/sitemap-index.xml

# Kontak untuk Pertanyaan AI/LLM
Contact: info@jowolandborepile.co.id
`.trim();

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
