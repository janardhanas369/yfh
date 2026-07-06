/* ============================================================
   YES FOR HOCKEY — gallery.js
   Gallery filtering + lightbox. Pure Vanilla JavaScript.
   ============================================================ */

(function () {
  "use strict";

  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var ICON_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';

  function initGallery() {
    var gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    var filters = gallery.querySelectorAll(".gallery-filters button");
    var grid = gallery.querySelector(".masonry");
    var items = grid ? Array.prototype.slice.call(grid.querySelectorAll(".m-item")) : [];
    var filtered = items.slice();

    // Build lightbox
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.id = "galleryLightbox";
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">' + ICON_CLOSE + "</button>" +
      '<button class="lb-nav lb-prev" aria-label="Previous">' + ICON_PREV + "</button>" +
      '<button class="lb-nav lb-next" aria-label="Next">' + ICON_NEXT + "</button>" +
      '<div class="lb-content">' +
        '<img src="" alt="">' +
        '<div class="lb-meta"><div class="cat"></div><div class="ti"></div><div class="count"></div></div>' +
      "</div>";
    document.body.appendChild(lb);

    var lbImg = lb.querySelector("img");
    var lbCat = lb.querySelector(".lb-meta .cat");
    var lbTi = lb.querySelector(".lb-meta .ti");
    var lbCount = lb.querySelector(".lb-meta .count");
    var current = 0;

    function openLB(i) {
      current = i;
      var item = filtered[i];
      if (!item) return;
      lbImg.src = item.getAttribute("data-full") || item.querySelector("img").src;
      lbCat.textContent = item.getAttribute("data-cat");
      lbTi.textContent = item.getAttribute("data-title");
      lbCount.textContent = (i + 1) + " of " + filtered.length;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeLB() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    function navLB(dir) {
      current = (current + dir + filtered.length) % filtered.length;
      openLB(current);
    }

    lb.querySelector(".lb-close").addEventListener("click", closeLB);
    lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); navLB(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); navLB(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") navLB(-1);
      if (e.key === "ArrowRight") navLB(1);
    });

    // Filter
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        filtered = [];
        items.forEach(function (item) {
          var show = cat === "All" || item.getAttribute("data-cat") === cat;
          item.style.display = show ? "" : "none";
          if (show) filtered.push(item);
        });
      });
    });

    // Open lightbox on item click
    items.forEach(function (item, i) {
      item.addEventListener("click", function () {
        // find index in filtered
        var idx = filtered.indexOf(item);
        if (idx === -1) {
          filtered = items.filter(function (x) { return x.style.display !== "none"; });
          idx = filtered.indexOf(item);
        }
        openLB(idx);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGallery);
  } else {
    initGallery();
  }
})();
