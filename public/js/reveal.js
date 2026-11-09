// Reveal on-scroll: animasikan elemen [data-reveal] saat masuk viewport.
(function () {
  function initReveal() {
    const els = Array.prototype.slice.call(
      document.querySelectorAll('[data-reveal]:not(.is-visible), [data-reveal-children]:not(.is-visible)')
    );

    // Also observe each direct child of [data-reveal-content] so long
    // article bodies (blog posts, project pages) animate block-by-block.
    document.querySelectorAll('[data-reveal-content]').forEach(function (container) {
      Array.prototype.forEach.call(container.children, function (child) {
        if (!child.classList.contains('is-visible')) els.push(child);
      });
    });

    if (!els.length) return;

    const eager = document.body.hasAttribute('data-eager-reveal');
    const belowFoldMargin = eager ? '0px 0px -5% 0px' : '0px 0px -10% 0px';

    // Two scroll-triggered observers for below-fold elements. Tall
    // elements (taller than ~85% of the viewport) use threshold 0 so
    // they still fire; shorter elements use 0.15 so animations feel
    // earned (the user actually sees them play).
    const shortObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          shortObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: belowFoldMargin });

    const tallObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          tallObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: belowFoldMargin });

    // First-pass observer: hands us boundingClientRect and rootBounds
    // for each element without forcing a synchronous layout read. The
    // browser computes the geometry off the main thread, replacing
    // the previous getBoundingClientRect() classifier loop that
    // Lighthouse flagged as a ~76ms forced reflow.
    // rootMargin -25% bottom defines "above-the-fold" as the top 75%
    // of the viewport, matching the prior `rect.top < vh*0.75` rule.
    let revealIndex = 0;
    const firstPass = new IntersectionObserver(function (entries) {
      // Preserve document order so the above-fold stagger is stable.
      entries.sort(function (a, b) {
        const pos = a.target.compareDocumentPosition(b.target);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

      entries.forEach(function (entry) {
        firstPass.unobserve(entry.target);
        if (entry.isIntersecting) {
          const i = revealIndex++;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, 250 + i * 80);
        } else {
          const rb = entry.rootBounds;
          const tall = rb ? entry.boundingClientRect.height > rb.height * 0.85 : false;
          (tall ? tallObs : shortObs).observe(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });

    els.forEach(function (el) { firstPass.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
