// Form kontak → buka WhatsApp. Nomor diambil dari data-wa-number pada form.
function initContactForm() {
  const form = document.getElementById('contact-form');
  const button = document.getElementById('submit-button');
  const msgEl = document.getElementById('form-message');

  if (!form || !button || !msgEl) return;
  if (form.dataset.waInit) return;
  form.dataset.waInit = 'true';

  const waNumber = form.dataset.waNumber || '';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value?.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value?.trim() || '';
    const email = form.querySelector('[name="email"]')?.value?.trim() || '';
    const location = form.querySelector('[name="location"]')?.value?.trim() || '';
    const message = form.querySelector('[name="message"]')?.value?.trim() || '';

    if (!name || !phone || !message) {
      msgEl.textContent = 'Mohon isi nama, nomor telepon, dan pesan.';
      msgEl.className = 'text-sm text-destructive';
      msgEl.classList.remove('hidden');
      return;
    }

    const lines = [
      '🏗️ *Inquiry Jasa Bore Pile — PT. Jowo Land Construction*',
      '',
      `👤 *Nama:* ${name}`,
      `📞 *Telepon:* ${phone}`,
      email ? `📧 *Email:* ${email}` : '',
      location ? `📍 *Lokasi Proyek:* ${location}` : '',
      '',
      `💬 *Pesan:*`,
      message,
    ].filter(Boolean).join('\n');

    const waUrl = `https://api.whatsapp.com/send/?phone=${waNumber}&text=${encodeURIComponent(lines)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    msgEl.textContent = 'Membuka WhatsApp… Jika tidak terbuka otomatis, klik tombol di atas lagi.';
    msgEl.className = 'text-sm text-success';
    msgEl.classList.remove('hidden');
  });
}

initContactForm();
document.addEventListener('astro:after-swap', initContactForm);
