/* ============================================================
   YES FOR HOCKEY — accordion.js
   FAQ accordion toggle. Pure Vanilla JavaScript.
   ============================================================ */

(function () {
  "use strict";

  var ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  var ICON_MINUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  function initAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      var pm = q ? q.querySelector(".pm") : null;
      if (!q || !a) return;

      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        // close all
        items.forEach(function (other) {
          other.classList.remove("open");
          var oa = other.querySelector(".faq-a");
          var op = other.querySelector(".faq-q .pm");
          if (oa) oa.style.maxHeight = "0";
          if (op) op.innerHTML = ICON_PLUS;
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          if (pm) pm.innerHTML = ICON_MINUS;
        }
      });

      // init icon
      if (pm) pm.innerHTML = ICON_PLUS;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccordion);
  } else {
    initAccordion();
  }
})();
