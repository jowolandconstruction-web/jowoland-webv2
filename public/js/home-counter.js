// Counter angka statistik beranda (animasi saat masuk viewport).
(function () {
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      element.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(updateCounter);
    }
    requestAnimationFrame(updateCounter);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.autocount');
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (counter) {
        if (counter.dataset.animated === 'true') return;
        counter.dataset.animated = 'true';
        animateCounter(counter);
      });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (counter.dataset.animated === 'true') return;
          counter.dataset.animated = 'true';
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (counter) {
      if (counter.dataset.animated === 'true') return;
      observer.observe(counter);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
  document.addEventListener('astro:page-load', initCounters);
})();
