/**
 * Pusat data kontak & tautan WhatsApp.
 *
 * Semua tautan WhatsApp di situs dibangun dari berkas ini supaya nomor
 * atau pesan pembuka cukup diubah di satu tempat.
 */

/** Nomor WhatsApp format internasional tanpa tanda '+' (dipakai di URL). */
export const whatsappNumber = '6285280749218';

/** Nomor telepon format internasional (dipakai di structured data). */
export const phoneE164 = '+6285280749218';

/** Nomor telepon untuk ditampilkan ke pengguna. */
export const phoneDisplay = '0852-8074-9218';

/** Pesan pembuka default untuk tombol WhatsApp. */
export const defaultWhatsappMessage = `Halo PT. Jowo Land Construction, saya ingin order layanan pondasi bore pile.

Nama:
Lokasi Proyek (Kota/Kecamatan):
Jenis Bangunan (Rumah/Gudang/Ruko):
Jumlah Titik:
Kedalaman:
Diameter:`;

/**
 * Bangun tautan WhatsApp.
 * @param message Pesan kustom (default: pesan pembuka umum).
 */
export function whatsappLink(message: string = defaultWhatsappMessage): string {
  return `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
}
