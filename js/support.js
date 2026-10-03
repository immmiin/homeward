/* HOMEWARD · Find support: filters (?need=) with FLIP, Quick view drawer, #anchors */
(function () {
  var HW = window.HW;
  var esc = HW.esc;
  var TOTAL = HW.programs.length;

  function primaryRow(p) {
    return '<li class="prog fx c-' + p.color + '" id="' + p.id + '" data-needs="' + p.needs.join(" ") + '">' +
      '<div class="prog__row">' +
        '<span class="prog__swatch" aria-hidden="true">' + HW.iconFor(p.id) + '</span>' +
        '<div class="prog__title"><span class="tag">' + esc(p.tag) + '</span><h3 class="prog__name">' + esc(p.name) + '</h3></div>' +
        '<p class="prog__line">' + HW.glossify(esc(p.line)) + '</p>' +
        '<div class="prog__actions"><button type="button" class="quick" data-id="' + p.id + '" aria-haspopup="dialog" aria-controls="quick-view">' +
          '<span class="plus" aria-hidden="true"></span>Quick view<span class="sr-only">: ' + esc(p.name) + '</span></button></div>' +
      '</div>' +
    '</li>';
  }

  function compactRow(p) {
    var land = p.audience === "landlords";
    return '<li class="mini-prog fx c-' + p.color + (land ? " mini-prog--landlords" : "") + '" id="' + p.id + '" data-needs="' + p.needs.join(" ") + '">' +
      '<div class="mini-prog__top"><span class="icon-badge icon-badge--sm">' + HW.iconFor(p.id) + '</span><span class="tag">' + esc(p.tag) + '</span></div>' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<p>' + esc(p.line) + '</p>' +
      '<div class="mini-prog__links">' + p.links.map(function (k) { return HW.extLink(k); }).join("") + '</div>' +
    '</li>';
  }

  /* ---------- Quick view drawer: modal dialog (focus stays inside, Esc and scrim close, focus returns) ---------- */
  var dlg, opener;
  function openQuick(id, btn) {
    var p = HW.programs.filter(function (x) { return x.id === id; })[0];
    opener = btn;
    dlg.querySelector(".qv__panel").innerHTML =
      '<div class="qv__head c-' + p.color + '">' +
        '<span class="icon-badge qv__icon">' + HW.iconFor(p.id) + '</span>' +
        '<button type="button" class="qv__close" data-close>' + HW.icon.close + '<span class="sr-only">Close quick view</span></button>' +
        '<p class="tag">' + esc(p.tag) + '</p>' +
        '<h2 class="qv__title" id="qv-title">' + esc(p.name) + '</h2>' +
        '<p class="qv__line">' + esc(p.line) + '</p>' +
      '</div>' +
      '<div class="qv__body">' +
        '<section><h3>Who this may help</h3><ul>' + p.who.map(function (t) { return "<li>" + HW.glossify(esc(t)) + "</li>"; }).join("") + '</ul></section>' +
        '<section><h3>How to get started</h3><ol>' + p.start.map(function (t) { return "<li>" + HW.glossify(esc(t)) + "</li>"; }).join("") + '</ol></section>' +
        '<section class="qv__links"><h3>Visit official NYC information</h3>' + p.links.map(function (k) { return HW.extLink(k); }).join("") + '</section>' +
        '<p class="qv__note">A provider can review your situation. This guide doesn’t decide what you can receive.</p>' +
      '</div>';
    dlg.showModal();
    dlg.querySelector(".qv__close").focus();
  }

  function initDrawer() {
    dlg = document.getElementById("quick-view");
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();   // scrim or close button
    });
    dlg.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  /* ---------- Filters with FLIP: items shift and fade into place (250ms) ---------- */
  function apply(key, announce) {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-needs]"));
    var first = new Map();
    items.forEach(function (el) { if (!el.hidden) first.set(el, el.getBoundingClientRect()); });

    document.querySelectorAll(".filter").forEach(function (f) { f.setAttribute("aria-pressed", String(f.dataset.key === key)); });
    var shown = 0;
    items.forEach(function (el) {
      var on = key === "all" || el.dataset.needs.split(" ").indexOf(key) !== -1;
      el.hidden = !on;
      if (on) shown++;
    });
    var prim = document.getElementById("primary");
    // Eviction & legal help: Legal assistance leads (DOM order, so tab order matches)
    var legal = document.getElementById("legal");
    if (key === "legal") prim.insertBefore(legal, prim.firstChild);
    else prim.insertBefore(legal, document.getElementById("cash"));
    document.getElementById("more-section").hidden = !document.querySelector("#more [data-needs]:not([hidden])");
    prim.closest(".programs").hidden = !prim.querySelector("[data-needs]:not([hidden])");

    if (announce && HW.motionOn() && Element.prototype.animate) {
      items.forEach(function (el) {
        if (el.hidden) return;
        var a = first.get(el), b = el.getBoundingClientRect();
        if (a) {
          var dx = a.left - b.left, dy = a.top - b.top;
          if (dx || dy) el.animate([{ transform: "translate(" + dx + "px," + dy + "px)" }, { transform: "none" }], { duration: 250, easing: "cubic-bezier(.16,1,.3,1)" });
        } else {
          el.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 250, easing: "cubic-bezier(.16,1,.3,1)" });
        }
      });
    }

    var label = HW.filters.filter(function (f) { return f.key === key; })[0].label;
    document.getElementById("filter-status").textContent = "Showing " + shown + " of " + TOTAL + " services" + (key === "all" ? "" : " · " + label);
    if (announce) {
      var url = new URL(location.href);
      if (key === "all") url.searchParams.delete("need"); else url.searchParams.set("need", key);
      url.hash = "";
      history.replaceState(null, "", url);
    }
  }

  /* #anchors: show the service (switching to All if filtered out), scroll to it, mark it with the frame */
  function openHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    if (!el || !el.hasAttribute("data-needs")) return;
    if (el.hidden) apply("all", false);
    document.querySelectorAll(".is-target").forEach(function (x) { x.classList.remove("is-target"); });
    el.classList.add("is-target");
    el.scrollIntoView();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("primary").innerHTML = HW.programs.filter(function (p) { return p.tier === "primary"; }).map(primaryRow).join("");
    document.getElementById("more").innerHTML = HW.programs.filter(function (p) { return p.tier === "more"; }).map(compactRow).join("");
    document.getElementById("filters").innerHTML = HW.filters.map(function (f) {
      return '<button type="button" class="filter" data-key="' + f.key + '" aria-pressed="false">' + HW.icon.check + esc(f.label) + '</button>';
    }).join("");

    initDrawer();
    document.getElementById("filters").addEventListener("click", function (e) {
      var f = e.target.closest(".filter");
      if (f) apply(f.dataset.key, true);
    });
    document.getElementById("primary").addEventListener("click", function (e) {
      var q = e.target.closest(".quick");
      if (q) openQuick(q.dataset.id, q);
    });

    var need = new URLSearchParams(location.search).get("need");
    var valid = HW.filters.some(function (f) { return f.key === need; });
    apply(valid ? need : "all", false);
    openHash();
    window.addEventListener("hashchange", openHash);
  });
})();
