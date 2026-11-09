// Floating WhatsApp button — tampil setelah 1,5 detik.
(function () {
  function initWaBtn() {
    const btn = document.getElementById('wa-float-btn');
    if (!btn || btn.dataset.waInit) return;
    btn.dataset.waInit = 'true';
    // Show after 1.5s
    setTimeout(function () {
      btn.style.opacity = '1';
      btn.style.translate = '0 0';
      btn.style.pointerEvents = 'auto';
    }, 1500);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWaBtn);
  } else {
    initWaBtn();
  }
  document.addEventListener('astro:page-load', initWaBtn);
})();
