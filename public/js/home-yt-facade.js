// YouTube facade beranda: iframe baru dimuat setelah pengguna mengklik poster.
(function () {
  function initYtFacade() {
    document.querySelectorAll('.yt-facade').forEach(function (facade) {
      if (facade.dataset.ytInit) return;
      facade.dataset.ytInit = 'true';
      function loadVideo() {
        var src = facade.getAttribute('data-src');
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', src + '?autoplay=1&rel=0');
        iframe.setAttribute('title', facade.getAttribute('aria-label') || 'YouTube video');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.inset = '0';
        facade.innerHTML = '';
        facade.style.position = 'relative';
        facade.appendChild(iframe);
      }
      facade.addEventListener('click', loadVideo);
      facade.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(); }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initYtFacade);
  } else {
    initYtFacade();
  }
  document.addEventListener('astro:page-load', initYtFacade);
})();
