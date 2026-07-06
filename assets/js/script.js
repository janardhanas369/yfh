/* ============================================================
   YES FOR HOCKEY — script.js
   Core: header/footer injection, scroll, mobile menu, dropdown,
   counters, form validation, scroll-reveal, back-to-top.
   Pure Vanilla JavaScript. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  // Base path — auto-detects folder depth from the script's own src attribute.
  // Works for domain-root hosting AND cPanel subfolder installs.
  var BASE = (function () {
    var s = document.querySelector('script[src*="script.js"]');
    var raw = s ? s.getAttribute("src") : "assets/js/script.js";
    return raw.indexOf("../") === 0 ? "../" : "";
  })();

  // ---------- SVG icon set ----------
  var ICONS = {
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>',
    // brand icons
    grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>',
    heart2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
    school: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="M4 5v17"/><path d="m12 2 6 3-6 3-6-3z"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v1a1 1 0 0 0 1 1h1M12 12h.01M16 16h.01M16 12v.01"/></svg>',
    landmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="12" y1="18" x2="12" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 8 4 8"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
    barChart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    pieChart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
    trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    hammer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    globe2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  };

  function icon(name) { return ICONS[name] || ICONS.trophy; }

  // ---------- Nav config ----------
  var NAV = [
    { id: "home", label: "Home", href: BASE + "index.html" },
    { id: "about", label: "About", href: BASE + "about/about.html", dropdown: [
      { label: "Our Story", href: BASE + "about/our-story.html" },
      { label: "Our Team", href: BASE + "about/our-team.html" },
      { label: "Schools", href: BASE + "schools/schools.html" },
      { label: "Our Compliance", href: BASE + "about/compliance.html" },
    ]},
    { id: "programs", label: "Programs", href: BASE + "programs/programs.html" },
    { id: "impact", label: "Impact", href: BASE + "impact.html" },
    { id: "get-involved", label: "Get Involved", href: BASE + "get-involved.html" },
    { id: "gallery", label: "Gallery", href: BASE + "gallery.html" },
    { id: "partners", label: "Our Partners", href: BASE + "our-partners.html" },
    { id: "contact", label: "Contact", href: BASE + "contact.html" },
  ];

  // ============================================================
  // HEADER injection
  // ============================================================
  function renderHeader(active) {
    var navItems = NAV.map(function (item) {
      var isActive = item.id === active ? " active" : "";
      var dd = "";
      if (item.dropdown) {
        var ddLinks = item.dropdown.map(function (d) {
          return '<a href="' + d.href + '">' + d.label + icon("chevRight") + "</a>";
        }).join("");
        dd = '<div class="dropdown"><div class="dd-label">About Us</div>' + ddLinks + "</div>";
      }
      return '<div class="nav-item' + (item.dropdown ? " has-dd" : "") + '">' +
        '<a class="nav-link' + isActive + '" href="' + item.href + '">' + item.label +
        (item.dropdown ? icon("chevron") : "") + "</a>" + dd + "</div>";
    }).join("");

    var html =
      '<header class="site-header" id="siteHeader">' +
        '<div class="container header-inner">' +
          '<a class="header-logo" href="' + BASE + '/index.html">' +
            '<span class="logo-box"><img src="' + BASE + 'logo-yfh.png" alt="YES For Hockey logo"></span>' +
            '<span class="logo-text"><span class="name">YES FOR HOCKEY</span><span class="tag">Empowering Champions</span></span>' +
          "</a>" +
          '<nav class="main-nav">' + navItems + "</nav>" +
          '<div class="header-actions">' +
            '<a class="btn-donate" href="' + BASE + '/donate.html">' + icon("heart") + " Donate Now</a>" +
            '<button class="menu-toggle" id="menuToggle" aria-label="Open menu">' + icon("menu") + "</button>" +
          "</div>" +
        "</div>" +
      "</header>";

    // Mobile menu
    var mLinks = NAV.map(function (item) {
      var isActive = item.id === active ? " active" : "";
      var sub = "";
      if (item.dropdown) {
        sub = '<div class="m-sub">' + item.dropdown.map(function (d) {
          return '<a href="' + d.href + '">' + d.label + "</a>";
        }).join("") + "</div>";
      }
      return '<a class="m-link' + isActive + '" href="' + item.href + '">' + item.label + "</a>" + sub;
    }).join("");

    var mobile =
      '<div class="mobile-menu" id="mobileMenu">' +
        '<div class="overlay" data-close-menu></div>' +
        '<div class="panel">' +
          '<div class="panel-head">' +
            '<div class="logo-row"><span class="lb"><img src="' + BASE + 'logo-yfh.png" alt=""></span><span class="name">YES FOR HOCKEY</span></div>' +
            '<button class="close" id="menuClose" aria-label="Close menu">' + icon("close") + "</button>" +
          "</div>" +
          '<div class="panel-body">' + mLinks + "</div>" +
          '<div class="panel-foot"><a class="btn btn-primary btn-block" href="' + BASE + '/donate.html">' + icon("heart") + " Donate Now</a></div>" +
        "</div>" +
      "</div>";

    var slot = document.getElementById("site-header");
    if (slot) slot.outerHTML = html;
    document.body.insertAdjacentHTML("beforeend", mobile);
  }

  // ============================================================
  // FOOTER injection
  // ============================================================
  function renderFooter() {
    var socials = ["instagram", "facebook", "twitter", "youtube"]
      .map(function (s) {
        return '<a href="#" aria-label="' + s + '">' + icon(s) + "</a>";
      }).join("");

    var orgLinks = [
      { l: "About Us", h: BASE + "about/about.html" },
      { l: "Our Story", h: BASE + "about/our-story.html" },
      { l: "Our Team", h: BASE + "about/our-team.html" },
      { l: "Schools", h: BASE + "schools/schools.html" },
      { l: "Impact", h: BASE + "impact.html" },
    ].map(function (x) { return '<li><a href="' + x.h + '">' + x.l + "</a></li>"; }).join("");

    var progLinks = [
      { l: "Academic Mentorship", h: BASE + "programs/program-academic.html" },
      { l: "Grassroots Hockey Training", h: BASE + "programs/program-hockey.html" },
      { l: "Elite Talent Pathway", h: BASE + "programs/program-elite.html" },
    ].map(function (x) { return '<li><a href="' + x.h + '">' + x.l + "</a></li>"; }).join("");

    var giLinks = [
      { l: "Donate", h: BASE + "donate.html" },
      { l: "Volunteer", h: BASE + "get-involved.html" },
      { l: "Partner With Us", h: BASE + "our-partners.html" },
      { l: "Contact", h: BASE + "contact.html" },
    ].map(function (x) { return '<li><a href="' + x.h + '">' + x.l + "</a></li>"; }).join("");

    // sitemap
    var smLinks = NAV.map(function (n) {
      return '<a href="' + n.href + '">' + n.label + "</a>";
    }).join('<span class="sep">·</span>');
    var aboutSubs = NAV.find(function (n) { return n.id === "about"; }).dropdown
      .map(function (d) { return '<a href="' + d.href + '">' + d.label + "</a>"; })
      .join('<span class="sep">·</span>');

    var html =
      '<footer class="site-footer">' +
        '<div class="top-accent"></div>' +
        '<div class="footer-newsletter">' +
          '<div class="container fn-row">' +
            "<div><h3>Stay in the game.</h3><p>Get stories of impact, program updates, and ways to help — straight to your inbox.</p></div>" +
            '<form id="newsletterForm">' +
              '<input type="email" placeholder="Enter your email" required>' +
              "<button type=\"submit\">Subscribe " + icon("send") + "</button>" +
            "</form>" +
          "</div>" +
        "</div>" +
        '<div class="footer-main">' +
          '<div class="container fgrid">' +
            '<div class="footer-brand">' +
              '<a class="f-logo" href="' + BASE + '/index.html">' +
                '<span class="lb"><img src="' + BASE + 'logo-yfh.png" alt="YES For Hockey"></span>' +
                '<span class="lt"><span class="name">YES FOR HOCKEY</span><span class="tag">Empowering Champions</span></span>' +
              "</a>" +
              "<p>An NGO supporting underprivileged children in government schools through free academic tutoring and hockey coaching — all the way to the national stage.</p>" +
              '<div class="f-social">' + socials + "</div>" +
            "</div>" +
            '<div class="footer-col"><h4>Organisation</h4><ul>' + orgLinks + "</ul></div>" +
            '<div class="footer-col"><h4>Programs</h4><ul>' + progLinks + "</ul></div>" +
            '<div class="footer-col"><h4>Get Involved</h4><ul>' + giLinks +
              '<li><button id="sitemapBtn" type="button">Site Map</button></li></ul>' +
              '<div class="f-contact-mini">' +
                '<div>' + icon("mail") + " hello@yesforhockey.in</div>" +
                '<div>' + icon("mapPin") + " India — Nationwide</div>" +
                '<div>' + icon("clock") + " Response in 2 days</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="container footer-sitemap">' +
            '<div class="fs-label">Site Map</div>' +
            '<div class="fs-links">' + smLinks + '<span class="sep">·</span>' + aboutSubs + '<span class="sep">·</span><a href="' + BASE + '/donate.html">Donate</a></div>' +
          "</div>" +
        "</div>" +
        '<div class="container footer-bottom">' +
          "<p>© " + new Date().getFullYear() + ' YES For Hockey. All rights reserved.</p>' +
          '<p class="made">Made with <span class="heart">♥</span> for children who deserve a shot at glory.</p>' +
        "</div>" +
      "</footer>" +
      '<button class="back-to-top" id="backToTop" aria-label="Back to top">' + icon("arrowUp") + "</button>";

    var slot = document.getElementById("site-footer");
    if (slot) slot.outerHTML = html;
  }

  // ============================================================
  // Under Construction modal
  // ============================================================
  function renderUnderConstruction() {
    var html =
      '<div class="uc-modal" id="ucModal">' +
        '<div class="uc-card">' +
          '<div class="top"></div>' +
          '<button class="uc-close" id="ucClose" aria-label="Close">' + icon("close") + "</button>" +
          '<div class="body">' +
            '<div class="uc-illustration">' +
              '<div class="ring1"></div><div class="ring2"></div>' +
              '<div class="core"><div class="ci">' + icon("hammer") + "</div></div>" +
            "</div>" +
            '<div class="uc-eyebrow"><span class="dot"></span>Under Construction</div>' +
            "<h2>We're Building Something Great</h2>" +
            "<p class=\"uc-desc\">This page is being crafted with care. Check back soon — the full site map and detailed pages are on the way.</p>" +
            '<div class="uc-countdown" id="ucCountdown"></div>' +
            '<a class="btn btn-primary" href="' + BASE + '/index.html">' + icon("home") + " Go Home</a>" +
          "</div>" +
        "</div>" +
      "</div>";
    document.body.insertAdjacentHTML("beforeend", html);

    var target = Date.now() + 30 * 24 * 60 * 60 * 1000;
    var cd = document.getElementById("ucCountdown");
    function tick() {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      function unit(v, l) {
        return '<div class="uc-unit"><div class="uc-val">' + String(v).padStart(2, "0") + '</div><div class="uc-lab">' + l + "</div></div>";
      }
      if (cd) cd.innerHTML = unit(d, "Days") + unit(h, "Hours") + unit(m, "Mins") + unit(s, "Secs");
    }
    tick();
    setInterval(tick, 1000);
  }

  // ============================================================
  // INTERACTIVITY
  // ============================================================
  function initInteractions() {
    var header = document.getElementById("siteHeader");

    // Sticky header on scroll
    function onScroll() {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");

      // Back to top
      var btt = document.getElementById("backToTop");
      if (btt) {
        if (window.scrollY > 600) btt.classList.add("show");
        else btt.classList.remove("show");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    var closeBtn = document.getElementById("menuClose");
    function openMenu() { menu.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeMenu() { menu.classList.remove("open"); document.body.style.overflow = ""; }
    if (toggle) toggle.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (menu) menu.querySelectorAll("[data-close-menu]").forEach(function (el) {
      el.addEventListener("click", closeMenu);
    });
    if (menu) menu.querySelectorAll(".panel-body a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    // Back to top click
    var btt = document.getElementById("backToTop");
    if (btt) btt.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1) {
          var el = document.querySelector(id);
          if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
        }
      });
    });

    // Sitemap / under construction trigger
    var smBtn = document.getElementById("sitemapBtn");
    var ucModal = document.getElementById("ucModal");
    var ucClose = document.getElementById("ucClose");
    function openUC() { ucModal.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeUC() { ucModal.classList.remove("open"); document.body.style.overflow = ""; }
    if (smBtn) smBtn.addEventListener("click", openUC);
    if (ucClose) ucClose.addEventListener("click", closeUC);
    if (ucModal) ucModal.addEventListener("click", function (e) {
      if (e.target === ucModal) closeUC();
    });
    // Expose for inline triggers
    window.YFHopenUC = openUC;

    // Newsletter
    var nl = document.getElementById("newsletterForm");
    if (nl) nl.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = nl.querySelector("input");
      if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showToast("Subscribed!", "Thank you for joining our newsletter.");
        input.value = "";
      } else {
        showToast("Invalid email", "Please enter a valid email address.", true);
      }
    });
  }

  // ============================================================
  // SCROLL REVEAL (IntersectionObserver)
  // ============================================================
  function initReveal() {
    var els = document.querySelectorAll(".reveal, .reveal-zoom, .reveal-left");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(function () { entry.target.classList.add("is-visible"); }, delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    els.forEach(function (el) { obs.observe(el); });
  }

  // ============================================================
  // ANIMATED COUNTERS
  // ============================================================
  function countUp(el, target, duration, suffix) {
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!("IntersectionObserver" in window)) {
      nums.forEach(function (el) {
        el.textContent = el.getAttribute("data-count");
      });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-count"), 10);
          var dur = parseInt(el.getAttribute("data-duration"), 10) || 1800;
          countUp(el, target, dur);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    nums.forEach(function (el) { obs.observe(el); });
  }

  // ============================================================
  // FORM VALIDATION (generic, opt-in via [data-validate])
  // ============================================================
  function initForms() {
    var forms = document.querySelectorAll("form[data-validate]");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;
        var fields = form.querySelectorAll("[data-required]");
        fields.forEach(function (field) {
          var errEl = form.querySelector('[data-error-for="' + field.name + '"]');
          var val = (field.value || "").trim();
          var isEmail = field.type === "email";
          var bad = false;
          if (!val) bad = true;
          else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) bad = true;
          if (bad) {
            valid = false;
            field.classList.add("error");
            if (errEl) errEl.style.display = "flex";
          } else {
            field.classList.remove("error");
            if (errEl) errEl.style.display = "none";
          }
        });
        // amount validation (donate)
        var amtField = form.querySelector("[data-amount]");
        if (amtField) {
          var amt = parseInt(amtField.getAttribute("data-amount"), 10) || 0;
          var errEl = form.querySelector('[data-error-for="amount"]');
          if (amt < 100) {
            valid = false;
            if (errEl) errEl.style.display = "flex";
          } else {
            if (errEl) errEl.style.display = "none";
          }
        }
        if (valid) {
          var successEl = form.querySelector(".form-success");
          if (successEl) successEl.style.display = "flex";
          form.reset();
          // reset chips/amounts after a moment
          setTimeout(function () {
            if (successEl) successEl.style.display = "none";
          }, 6000);
          showToast("Success!", form.getAttribute("data-success-msg") || "Your submission has been received.");
        }
      });
    });
  }

  // ============================================================
  // TOAST (simple)
  // ============================================================
  var toastTimer = null;
  function showToast(title, desc, isError) {
    var t = document.getElementById("yfhToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "yfhToast";
      t.style.cssText =
        "position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%) translateY(2rem);" +
        "background:#3a3d2e;color:#fff;padding:0.9rem 1.25rem;border-radius:14px;" +
        "box-shadow:0 20px 50px -16px rgba(0,0,0,0.4);z-index:3000;max-width:90vw;" +
        "opacity:0;transition:all .3s;font-family:inherit;display:flex;flex-direction:column;gap:2px;";
      document.body.appendChild(t);
    }
    t.innerHTML =
      '<strong style="font-size:.9rem;color:' + (isError ? "#ff8a76" : "#b8d64d") + '">' + title + "</strong>" +
      '<span style="font-size:.8rem;opacity:.85">' + desc + "</span>";
    requestAnimationFrame(function () {
      t.style.opacity = "1";
      t.style.transform = "translateX(-50%) translateY(0)";
    });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.style.opacity = "0";
      t.style.transform = "translateX(-50%) translateY(2rem)";
    }, 4000);
  }

  // ============================================================
  // DONATE amount selector (if present)
  // ============================================================
  function initDonate() {
    var wrap = document.querySelector("[data-donate]");
    if (!wrap) return;
    var btns = wrap.querySelectorAll(".amount-btn");
    var customInput = wrap.querySelector("[data-custom-amount]");
    var hiddenAmt = wrap.querySelector("[data-amount]");
    var impactMsg = wrap.querySelector("[data-impact-msg] .im-txt");
    var impactLab = wrap.querySelector("[data-impact-msg] .im-lab");
    var impacts = JSON.parse(wrap.getAttribute("data-impacts") || "{}");
    var current = 1000;

    function setAmount(val, fromCustom) {
      current = val;
      if (hiddenAmt) hiddenAmt.setAttribute("data-amount", val);
      if (impactLab) impactLab.textContent = "Your Impact · ₹" + val.toLocaleString("en-IN");
      if (impactMsg) impactMsg.textContent = impacts[val] || impacts["custom"] || "Your generous contribution directly supports children's coaching, equipment, and education.";
      btns.forEach(function (b) {
        b.classList.toggle("active", parseInt(b.getAttribute("data-amt"), 10) === val && !fromCustom);
      });
    }

    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var v = parseInt(b.getAttribute("data-amt"), 10);
        if (customInput) customInput.value = "";
        setAmount(v, false);
      });
    });
    if (customInput) customInput.addEventListener("input", function () {
      var v = parseInt(customInput.value, 10) || 0;
      if (v > 0) setAmount(v, true);
    });
    setAmount(current, false);
  }

  // ============================================================
  // CHIP groups (volunteer availability etc.)
  // ============================================================
  function initChips() {
    document.querySelectorAll("[data-chip-group]").forEach(function (group) {
      var input = group.parentElement.querySelector('input[type="hidden"][data-chip-value]');
      var chips = group.querySelectorAll("button");
      chips.forEach(function (c) {
        c.addEventListener("click", function () {
          chips.forEach(function (x) { x.classList.remove("active"); });
          c.classList.add("active");
          if (input) input.value = c.getAttribute("data-chip-val");
        });
      });
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    var body = document.body;
    var active = body.getAttribute("data-page") || "home";

    renderHeader(active);
    renderFooter();
    renderUnderConstruction();
    initInteractions();
    initReveal();
    initCounters();
    initForms();
    initDonate();
    initChips();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose helpers
  window.YFH = { icon: icon, showToast: showToast };
})();
