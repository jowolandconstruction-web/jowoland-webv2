// Slider testimoni (dipanggil dari fragmen /fragments/testimoni/).
(function () {
  var viewport = document.getElementById('testi-viewport');
  var track = document.getElementById('testi-track');
  var btnPrev = document.getElementById('testi-prev');
  var btnNext = document.getElementById('testi-next');
  var dotsContainer = document.getElementById('testi-dots');
  if (!viewport || !track) return;
  if (viewport.dataset.testiInit === 'true') return;
  viewport.dataset.testiInit = 'true';

  var slides = Array.prototype.slice.call(track.querySelectorAll('.testi-slide'));
  var total = slides.length;
  var current = 0;
  var perView = 1;
  var autoTimer;

  function getPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getSlideWidth() {
    if (slides.length === 0) return 0;
    return slides[0].getBoundingClientRect().width + 24; // +gap(6 * 4px = 24px)
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    var pages = Math.ceil(total / perView);
    for (var i = 0; i < pages; i++) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Halaman ' + (i + 1));
      dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 ' +
        (i === Math.floor(current / perView) ? 'bg-brand-500 w-6' : 'bg-foreground-muted/30 hover:bg-foreground-muted/60');
      (function (idx) { dot.addEventListener('click', function () { goTo(idx * perView); }); })(i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    var dots = dotsContainer.querySelectorAll('button');
    var page = Math.floor(current / perView);
    dots.forEach(function (d, i) {
      d.className = 'rounded-full transition-all duration-300 ' +
        (i === page ? 'bg-brand-500 w-6 h-2.5' : 'bg-foreground-muted/30 hover:bg-foreground-muted/60 w-2.5 h-2.5');
    });
  }

  function goTo(idx) {
    var maxPage = Math.ceil(total / perView) - 1;
    current = Math.max(0, Math.min(idx, maxPage * perView));
    var offset = getSlideWidth() * current;
    track.style.transform = 'translateX(-' + offset + 'px)';
    updateDots();
    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current >= maxPage * perView;
  }

  function init() {
    perView = getPerView();
    current = 0;
    buildDots();
    goTo(0);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () {
      var maxPage = Math.ceil(total / perView) - 1;
      goTo(current + perView > maxPage * perView ? 0 : current + perView);
    }, 5000);
  }

  if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - perView); startAuto(); });
  if (btnNext) btnNext.addEventListener('click', function () { goTo(current + perView); startAuto(); });

  // Touch/swipe support
  var touchStartX = 0;
  viewport.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { goTo(current + perView); } else { goTo(current - perView); }
      startAuto();
    }
  }, { passive: true });

  window.addEventListener('resize', function () { init(); startAuto(); });

  init();
  startAuto();
})();
