// Custom cursor: dot + lagging ring + comet-trail particles (desktop only).
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const ringWrap = document.getElementById('cursor-ring-wrap');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ringWrap || !ring) return;

  // Build particle pool with per-particle state
  const particleEls = document.querySelectorAll('.cursor-trail-particle');
  const particles = [];
  for (let i = 0; i < particleEls.length; i++) {
    particles.push({ el: particleEls[i], life: 0, x: 0, y: 0 });
  }
  let particleIdx = 0;
  let lastSpawn = 0;
  const SPAWN_INTERVAL = 22; // ms between particle spawns
  const FADE_RATE = 0.025;   // life lost per frame (60fps → ~0.66s lifespan)

  const INTERACTIVE = 'a, button, [role="button"], input:not([type="hidden"]), textarea, select, summary, label[for]';
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let visible = false;
  let hovering = null;

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!visible) {
      visible = true;
      dot.style.opacity = '1';
      ringWrap.style.opacity = '1';
    }
    // Translate from top-left to centre on cursor (10px dot → -5 offset)
    dot.style.transform = 'translate(' + (mouseX - 5) + 'px,' + (mouseY - 5) + 'px)';

    // Spawn a particle, throttled
    const now = performance.now();
    if (now - lastSpawn >= SPAWN_INTERVAL) {
      lastSpawn = now;
      const p = particles[particleIdx];
      p.x = mouseX;
      p.y = mouseY;
      p.life = 1;
      particleIdx = (particleIdx + 1) % particles.length;
    }
  }

  function onLeave() {
    visible = false;
    dot.style.opacity = '0';
    ringWrap.style.opacity = '0';
  }

  function syncHover(e) {
    const target = e.target.closest ? e.target.closest(INTERACTIVE) : null;
    if (target !== hovering) {
      hovering = target;
      ring.classList.toggle('is-hovering', !!target);
    }
  }

  function tick() {
    // Elastic lerp toward mouse — 0.18 = soft, smooth follow
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    // 40px ring → -20 offset to centre on cursor
    ringWrap.style.transform = 'translate(' + (ringX - 20) + 'px,' + (ringY - 20) + 'px)';

    // Age and render particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.life <= 0) continue;
      p.life -= FADE_RATE;
      if (p.life < 0) p.life = 0;
      const op = p.life * 0.7; // peak 0.7
      const sc = 0.4 + p.life * 0.6; // shrink as it fades
      p.el.style.opacity = String(op);
      p.el.style.transform =
        'translate(' + (p.x - 3) + 'px,' + (p.y - 3) + 'px) scale(' + sc + ')';
    }

    requestAnimationFrame(tick);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseover', syncHover);
  document.addEventListener('mouseout', syncHover);
  document.addEventListener('mouseleave', onLeave);
  requestAnimationFrame(tick);
})();
