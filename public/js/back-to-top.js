
(function () {
  const THRESHOLD = 400;
  const CIRCUMFERENCE = 131.95;
  let docMaxScrollY = 0;
  function updateDocMaxScrollY() {
    docMaxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  }
  window.addEventListener('resize', updateDocMaxScrollY, { passive: true });
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateDocMaxScrollY).observe(document.documentElement);
  }

  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn || btn.dataset.bttInit) return;
    btn.dataset.bttInit = 'true';

    const ring = document.getElementById('back-to-top-ring');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ticking = false;
    let visible = false;

    // Ensure initial hidden state is applied via JS (guards against any cascade override)
    btn.style.opacity = '0';
    btn.style.translate = '0 2rem';
    btn.style.pointerEvents = 'none';

    function show() {
      if (reducedMotion) {
        btn.style.transition = 'none';
      } else {
        btn.style.transition = 'opacity 250ms cubic-bezier(0,0,0.2,1), translate 250ms cubic-bezier(0,0,0.2,1)';
      }
      btn.style.opacity = '1';
      btn.style.translate = '0 0';
      btn.style.pointerEvents = 'auto';
      visible = true;
    }

    function hide() {
      if (reducedMotion) {
        btn.style.transition = 'none';
      } else {
        btn.style.transition = 'opacity 300ms cubic-bezier(0.4,0,1,1), translate 300ms cubic-bezier(0.4,0,1,1)';
      }
      btn.style.opacity = '0';
      btn.style.translate = '0 2rem';
      btn.style.pointerEvents = 'none';
      visible = false;
    }

    function updateFrame() {
      const pct = docMaxScrollY > 0 ? Math.min(1, Math.max(0, window.scrollY / docMaxScrollY)) : 0;
      if (ring) {
        ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - pct));
      }
      if (window.scrollY > THRESHOLD) {
        if (!visible) show();
      } else {
        if (visible) hide();
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFrame);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    document.addEventListener('astro:before-swap', function () {
      window.removeEventListener('scroll', onScroll);
    }, { once: true });

    // Run the first frame on rAF so it picks up the initial scroll
    // position after layout has settled — and read scrollHeight here
    // (after first paint) instead of forcing layout pre-paint.
    requestAnimationFrame(function () {
      updateDocMaxScrollY();
      updateFrame();
    });
  }

  document.addEventListener('astro:page-load', initBackToTop);
  initBackToTop();
})();
