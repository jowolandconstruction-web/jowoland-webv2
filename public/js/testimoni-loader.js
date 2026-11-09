// Muat markup testimoni dari /fragments/testimoni/ saat section mendekati layar.
(function () {
  var section = document.getElementById('testimoni-section');
  if (!section) return;
  var src = section.getAttribute('data-src');
  if (!src) return;

  var loading = false;
  function loadFragment() {
    if (loading || section.dataset.loaded === 'true') return;
    loading = true;
    section.dataset.loaded = 'true';
    fetch(src)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var range = document.createRange();
        range.selectNodeContents(section);
        section.replaceChildren(range.createContextualFragment(html));
        section.style.minHeight = '';

        // Jalankan ulang <script> inline bawaan fragmen (innerHTML/fragment
        // tidak selalu mengeksekusinya). Skrip slider punya guard idempoten.
        section.querySelectorAll('script').forEach(function (old) {
          var script = document.createElement('script');
          for (var i = 0; i < old.attributes.length; i++) {
            script.setAttribute(old.attributes[i].name, old.attributes[i].value);
          }
          script.textContent = old.textContent;
          old.parentNode.replaceChild(script, old);
        });
      })
      .catch(function () {
        section.dataset.loaded = 'false';
        loading = false;
      });
  }

  if (!('IntersectionObserver' in window)) {
    loadFragment();
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        loadFragment();
        observer.disconnect();
      }
    });
  }, { rootMargin: '600px' });
  observer.observe(section);
})();
