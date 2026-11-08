// Marquee logo klien beranda.
// HTML hanya memuat satu set logo; salinan loop dibuat di sini agar animasi
// berjalan mulus tanpa menggandakan markup.
(function () {
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(function (track) {
      if (track.dataset.marqueeInit === 'true') return;
      track.dataset.marqueeInit = 'true';
      var originals = Array.prototype.slice.call(track.children);
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarquee);
  } else {
    initMarquee();
  }
  document.addEventListener('astro:page-load', initMarquee);
})();
