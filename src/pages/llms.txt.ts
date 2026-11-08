import type { APIRoute } from 'astro';
import { phoneDisplay } from '@/config/contact';

export const GET: APIRoute = () => {
  const llmsTxt = `# PT. Jowo Land Construction

> Kontraktor spesialis pekerjaan pondasi dan geoteknik (bore pile / strauss pile) sejak 2012. Melayani 7 provinsi di Jawa & Bali dengan standar SNI 8460:2017, SNI 2847:2019, dan SNI 03-1726-2012.

## Halaman Utama

- [Beranda](https://jowolandborepile.co.id/): Ringkasan layanan pondasi bore pile, estimasi harga, dan FAQ.
- [Area Layanan](https://jowolandborepile.co.id/area-layanan/): Daftar wilayah layanan per kota dan kabupaten.
- [Layanan](https://jowolandborepile.co.id/services/): Layanan dan metode pengerjaan pondasi.
- [Portofolio Proyek](https://jowolandborepile.co.id/projects/): Dokumentasi proyek pondasi yang telah dikerjakan.
- [Blog](https://jowolandborepile.co.id/blog/): Artikel edukatif seputar pondasi dan bore pile.
- [Tentang Kami](https://jowolandborepile.co.id/about/): Profil PT. Jowo Land Construction dan founder.
- [Kontak](https://jowolandborepile.co.id/contact/): Kontak dan formulir konsultasi.
- [Kebijakan Privasi](https://jowolandborepile.co.id/privacy/): Kebijakan privasi situs.
- [Syarat & Ketentuan](https://jowolandborepile.co.id/terms/): Syarat dan ketentuan layanan.

## Kontak

- Website: https://jowolandborepile.co.id/
- Email: info@jowolandborepile.co.id
- Telepon: ${phoneDisplay}
- Alamat: Karanganyar, Ketitang, Kec. Godong, Kabupaten Grobogan, Jawa Tengah 58162, Indonesia
`.trim();

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
