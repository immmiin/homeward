/* HOMEWARD shared behavior: header, menu, motion toggle, photo slots, reveals,
   glossary popovers, sticky CTA, small helpers. Nothing is stored. */
(function () {
  var HW = window.HW = window.HW || {};
  var root = document.documentElement;

  HW.icon = {
    arrow: '<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"><path d="M3 10h13M11 4.5 16.5 10 11 15.5"/></svg>',
    back: '<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"><path d="M17 10H4M9 4.5 3.5 10 9 15.5"/></svg>',
    ext: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><path d="M6 3h7v7M13 3 4 12"/></svg>',
    check: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"><path d="M3 8.5 6.5 12 13 4.5"/></svg>',
    close: '<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"><path d="M4.5 4.5l11 11M15.5 4.5l-11 11"/></svg>'
  };

  HW.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  };

  /* Official link markup. All external links open in a new tab, labeled for screen readers. */
  HW.extLink = function (key, cls) {
    var l = HW.links[key];
    return '<a class="' + (cls || "extlink") + '" href="' + l.url + '" target="_blank" rel="noopener">' +
      HW.esc(l.label) + HW.icon.ext + '<span class="sr-only"> (official NYC page, opens in a new tab)</span></a>';
  };

  HW.iconFor = function (id, cls) {
    var name = HW.programIcon[id] || "house";
    return HW.icons[name].replace('class="icon"', 'class="icon' + (cls ? " " + cls : "") + '"');
  };


  /* ---------- The house object ----------
     Isometric fallback drawn in three tones of a palette colour (light roof, base wall, dark gable).
     A 3D render listed in HW.assetFiles (house-<colour>.png, else house.png) replaces it. */
  var TONES = {
    yellow: ["#FFF7B0", "#FBEB4E", "#D6C21E"], orange: ["#F7A27A", "#ED6C2D", "#C24F17"],
    teal: ["#8FCFC8", "#4AA39A", "#2F7C74"],   blue: ["#8DAEFF", "#2E6BF5", "#1B4CC2"],
    purple: ["#DDB3F9", "#BB69F1", "#9145C9"], mint: ["#C6F8DF", "#7EEDB7", "#45C98A"]
  };
  HW.house = function (color) {
    var t = TONES[color] || TONES.teal, k = "#1A1B1E";
    return '<svg viewBox="16 30 156 156" aria-hidden="true" focusable="false">' +
      '<polygon points="36,146 100,178 100,122 36,90" fill="' + t[1] + '"/>' +                          // long wall
      '<polygon points="100,178 152,152 152,96 126,69 100,122" fill="' + t[2] + '"/>' +                 // gable wall
      '<polygon points="100,122 126,69 62,37 36,90" fill="' + t[0] + '"/>' +                           // roof
      '<polygon points="36,90 100,122 100,127 36,95" fill="' + t[2] + '"/>' +                           // eave thickness
      '<polyline points="100,122 126,69 152,96" fill="none" stroke="' + k + '" stroke-width="3" stroke-linejoin="miter"/>' +
      '<polygon points="60.5,66 69.5,70.5 69.5,46.5 60.5,42" fill="' + t[1] + '"/>' +                   // chimney
      '<polygon points="69.5,70.5 75.7,67.4 75.7,43.4 69.5,46.5" fill="' + t[2] + '"/>' +
      '<polygon points="69.5,46.5 75.7,43.4 66.7,38.9 60.5,42" fill="' + t[0] + '"/>' +
      '<polygon points="71.84,163.92 84.64,170.32 84.64,136.32 71.84,129.92" fill="' + k + '"/>' +       // door
      '<polygon points="44.96,134.48 57.76,140.88 57.76,120.88 44.96,114.48" fill="' + k + '"/>' +       // windows
      '<polygon points="115.6,152.2 136.4,141.8 136.4,119.8 115.6,130.2" fill="' + k + '"/>' +
      '<ellipse cx="126" cy="96" rx="5.5" ry="7" fill="' + k + '"/>' +
    '</svg>';
  };
  function houseImg(color) {
    var f = HW.assetFiles || {};
    var src = (f.houseColors || []).indexOf(color) !== -1 ? "assets/3d/house-" + color + ".png" : f.house;
    return src ? '<img src="' + src + '" alt="">' : "";
  }
  HW.houseSlot = function (color, extra) {
    return '<span class="house3d' + (extra ? " " + extra : "") + '" aria-hidden="true">' + HW.house(color) +
      houseImg(color) + '</span>';
  };
  HW.initHouses = function (scope) {
    scope.querySelectorAll(".house3d > img").forEach(function (img) {
      var box = img.parentNode;
      var ok = function () { if (img.naturalWidth > 0) box.classList.add("has-img"); };
      var bad = function () {
        var list = (img.getAttribute("data-fallback") || "").split("|").filter(Boolean);
        if (list.length) { img.setAttribute("data-fallback", list.slice(1).join("|")); img.src = list[0]; return; }
        img.remove();
      };
      img.addEventListener("load", ok);
      img.addEventListener("error", bad);
      if (img.complete) { img.naturalWidth > 0 ? ok() : bad(); }
    });
  };

  HW.motionOn = function () {
    return root.getAttribute("data-motion") !== "off" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  /* ---------- Glossary: plain-language definitions on program names ---------- */
  var termN = 0;
  /* Takes already-escaped text; wraps the first mention of each glossary term. */
  HW.glossify = function (html) {
    if (!HW.glossary) return html;
    Object.keys(HW.glossary).forEach(function (term) {
      var i = html.indexOf(term);
      if (i === -1) return;
      var id = "term-" + (++termN), g = HW.glossary[term];
      var markup = '<span class="term-wrap"><button type="button" class="term" aria-expanded="false" aria-controls="' + id + '">' + term + '</button>' +
        '<span class="term-pop" id="' + id + '" role="note" hidden><b>' + term + '</b>' + HW.esc(g.def) + '<br>' + HW.extLink(g.link) + '</span></span>';
      html = html.slice(0, i) + markup + html.slice(i + term.length);
    });
    return html;
  };

  function closeTerms(except) {
    document.querySelectorAll('.term[aria-expanded="true"]').forEach(function (b) {
      if (b === except) return;
      b.setAttribute("aria-expanded", "false");
      document.getElementById(b.getAttribute("aria-controls")).hidden = true;
    });
  }
  function openTerm(btn) {
    closeTerms(btn);
    var pop = document.getElementById(btn.getAttribute("aria-controls"));
    var open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    pop.hidden = !open;
    if (!open) return;
    // Keep the popover inside the viewport
    pop.style.setProperty("--pop-x", "0px");
    var r = pop.getBoundingClientRect(), shift = 0;
    if (r.right > window.innerWidth - 16) shift = window.innerWidth - 16 - r.right;
    if (r.left + shift < 16) shift = 16 - r.left;
    pop.style.setProperty("--pop-x", shift + "px");
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".term");
    if (t) { e.preventDefault(); e.stopPropagation(); openTerm(t); return; }
    if (!e.target.closest(".term-pop")) closeTerms();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var open = document.querySelector('.term[aria-expanded="true"]');
    if (open) { e.preventDefault(); closeTerms(); open.focus(); }  // close the popover first, not an enclosing dialog
  });

  /* ---------- Page transitions: skip when motion is switched off on this page ---------- */
  window.addEventListener("pageswap", function (e) {
    if (e.viewTransition && !HW.motionOn()) e.viewTransition.skipTransition();
  });
  window.addEventListener("pagereveal", function (e) {
    if (e.viewTransition && !HW.motionOn()) e.viewTransition.skipTransition();
  });

  /* One-time reveals are armed only when this script runs, so content never depends on it. */
  if ("IntersectionObserver" in window) root.classList.add("io");

  document.addEventListener("DOMContentLoaded", function () {
    // Sticky header line on scroll
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 4); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Mobile menu
    var menuBtn = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    if (menuBtn && nav) {
      var setMenu = function (open) {
        menuBtn.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
      };
      menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
      });
      window.addEventListener("resize", function () { if (window.innerWidth > 760) setMenu(false); });
    }

    // Motion toggle: this page only, never stored
    var mt = document.querySelector(".motion-toggle");
    if (mt) {
      var label = mt.querySelector(".motion-toggle__label");
      var sync = function () {
        var off = root.getAttribute("data-motion") === "off";
        mt.setAttribute("aria-pressed", String(off));
        label.textContent = off ? "Motion is off" : "Turn off motion";
      };
      sync();
      mt.addEventListener("click", function () {
        var off = root.getAttribute("data-motion") !== "off";
        if (off) root.setAttribute("data-motion", "off"); else root.removeAttribute("data-motion");
        sync();
        document.dispatchEvent(new CustomEvent("hw:motion"));
      });
    }

    // One-time reveals: headline lines, the footer mark
    if (root.classList.contains("io")) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -12% 0px" });
      document.querySelectorAll(".reveal, .site-footer .logo").forEach(function (el) { io.observe(el); });
    }

    // Mobile sticky CTA: after the hero (or page header), hidden near the footer
    var bar = document.querySelector(".sticky-cta");
    var after = document.querySelector("[data-sticky-after]");
    var footer = document.querySelector(".site-footer");
    if (bar && after && footer && "IntersectionObserver" in window) {
      var link = bar.querySelector("a");
      var aboveVisible = true, footerVisible = false;
      var update = function () {
        var show = !aboveVisible && !footerVisible;
        bar.classList.toggle("is-shown", show);
        bar.setAttribute("aria-hidden", String(!show));
        link.tabIndex = show ? 0 : -1;
      };
      new IntersectionObserver(function (e) { aboveVisible = e[0].isIntersecting; update(); }).observe(after);
      new IntersectionObserver(function (e) { footerVisible = e[0].isIntersecting; update(); }, { rootMargin: "0px 0px 120px 0px" }).observe(footer);
    }

    HW.initPhotos(document);
    HW.initHouses(document);
  });

  /* Photo slots: show the B&W photo if the file exists (trying data-fallback next),
     else keep the graphic plate. */
  HW.initPhotos = function (scope) {
    scope.querySelectorAll(".media > img").forEach(function (img) {
      var box = img.parentNode;
      var ok = function () { if (img.naturalWidth > 0) box.classList.add("has-photo"); };
      var bad = function () {
        var next = img.getAttribute("data-fallback");
        if (next) { img.removeAttribute("data-fallback"); img.src = next; return; }
        box.classList.remove("has-photo"); img.remove();
      };
      img.addEventListener("load", ok);
      img.addEventListener("error", bad);
      if (img.complete) { img.naturalWidth > 0 ? ok() : bad(); }
    });
  };
})();
