/* ============================================================
   YES FOR HOCKEY — slider.js
   Hero image slider: auto-fade, arrows, dots, pause on hover.
   Pure Vanilla JavaScript.
   ============================================================ */

(function () {
  "use strict";

  function initSlider() {
    var slider = document.querySelector("[data-hero-slider]");
    if (!slider) return;

    var slides = slider.querySelectorAll(".hero-slide");
    var dots = slider.querySelectorAll(".hero-dots button");
    var prev = slider.querySelector("[data-slide-prev]");
    var next = slider.querySelector("[data-slide-next]");
    var total = slides.length;
    if (total === 0) return;

    var index = 0;
    var paused = false;
    var timer = null;

    function show(i) {
      index = (i + total) % total;
      slides.forEach(function (s, n) { s.classList.toggle("active", n === index); });
      dots.forEach(function (d, n) { d.classList.toggle("active", n === index); });
    }
    function goNext() { show(index + 1); }
    function goPrev() { show(index - 1); }

    function start() {
      stop();
      if (!paused) timer = setInterval(goNext, 6000);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d, n) { d.addEventListener("click", function () { show(n); start(); }); });
    if (next) next.addEventListener("click", function () { goNext(); start(); });
    if (prev) prev.addEventListener("click", function () { goPrev(); start(); });

    slider.addEventListener("mouseenter", function () { paused = true; stop(); });
    slider.addEventListener("mouseleave", function () { paused = false; start(); });

    // Touch swipe
    var startX = 0;
    slider.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) { goNext(); } else { goPrev(); }
        start();
      }
    }, { passive: true });

    // Keyboard
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { goPrev(); start(); }
      if (e.key === "ArrowRight") { goNext(); start(); }
    });

    show(0);
    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSlider);
  } else {
    initSlider();
  }
})();
