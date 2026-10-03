/* HOMEWARD · Home: concern ledger, story colour + reveal, hero house tilt */
(function () {
  var HW = window.HW;
  var arrow = HW.icon.arrow;

  /* ---------- How can we help? A ledger: house + concern + (+/–), opening to labeled rows ---------- */
  function initConcerns() {
    var list = document.getElementById("concerns");
    if (!list) return;
    list.innerHTML = HW.concerns.map(function (c) {
      var bid = "concern-btn-" + c.id, pid = "concern-panel-" + c.id;
      return '<li class="concern c-' + c.color + '">' +
        '<h3><button type="button" class="concern__btn" id="' + bid + '" aria-expanded="false" aria-controls="' + pid + '">' +
          HW.houseSlot(c.color) +
          '<span class="concern__label">' + HW.esc(c.label) + '</span>' +
          '<span class="pm" aria-hidden="true"></span>' +
        '</button></h3>' +
        '<div class="concern__panel" id="' + pid + '" role="region" aria-labelledby="' + bid + '"><div><div class="concern__body">' +
          '<dl class="ledger">' +
            '<dt class="mono">' + (c.id === "eviction" ? "Start here" : "What may help") + '</dt>' +
            '<dd><span class="prog-name">' + HW.esc(c.programName) + '</span><p>' + HW.glossify(HW.esc(c.summary)) + '</p></dd>' +
            '<dt class="mono">What to do next</dt>' +
            '<dd><ol>' + c.steps.map(function (s) { return "<li><span>" + HW.esc(s) + "</span></li>"; }).join("") + '</ol></dd>' +
            '<dt class="mono">Good to know</dt>' +
            '<dd><p>' + HW.esc(c.more) + '</p></dd>' +
            '<dt class="mono">Official info</dt>' +
            '<dd>' + HW.extLink(c.link) + '</dd>' +
          '</dl>' +
          '<div class="concern__actions">' +
            '<a class="btn btn--primary" href="support.html?need=' + c.need + '">View support options ' + arrow + '</a>' +
            '<a class="textlink" href="explore.html' + (c.worry ? "?concern=" + c.id : "") + '">Answer a few questions instead</a>' +
          '</div>' +
          '<p class="concern__note">Choosing this doesn\u2019t confirm what you can receive. A provider can review your situation.</p>' +
        '</div></div></div>' +
      '</li>';
    }).join("");
    HW.initHouses(list);

    var btns = list.querySelectorAll(".concern__btn");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btns.forEach(function (b) {
          var on = open && b === btn;
          b.setAttribute("aria-expanded", String(on));
          b.classList.toggle("is-selected", on);
          document.getElementById(b.getAttribute("aria-controls")).classList.toggle("is-open", on);
        });
      });
    });
  }

  /* ---------- More than you see: colour story + open-frame reveal ---------- */
  function initStories() {
    var section = document.getElementById("stories");
    var tablist = section && section.querySelector(".story-tabs");
    if (!tablist) return;
    var panel = document.getElementById("story-panel");
    var media = panel.querySelector(".story__media");
    var caption = panel.querySelector(".story__caption");
    var hidden = panel.querySelector(".story__hidden");
    var toggle = panel.querySelector(".story__toggle");
    var after = panel.querySelector(".story__after");
    var count = panel.querySelector(".story__count");
    var idx = 0;

    tablist.innerHTML = HW.stories.map(function (s) {
      return '<button type="button" role="tab" class="story-tab" id="story-tab-' + s.id + '" aria-controls="story-panel" aria-selected="false" tabindex="-1">' + HW.esc(s.tab) + '</button>';
    }).join("");
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    function fresh(el) { el.classList.remove("is-fresh"); void el.offsetWidth; el.classList.add("is-fresh"); }

    function reveal(on) {
      panel.classList.toggle("is-revealed", on);
      panel.classList.toggle("duo-on", on);
      toggle.setAttribute("aria-pressed", String(on));
      toggle.textContent = on ? "Back to the everyday" : "Look closer";
      var st = HW.stories[idx], text = HW.esc(st.hidden), key = HW.esc(st.hl || "");
      hidden.innerHTML = key && text.indexOf(key) !== -1
        ? text.replace(key, '<span class="hl-bar' + (st.hlColor === "mint" ? " hl-bar--mint" : "") + '">' + key + "</span>")
        : text;
      after.hidden = !on;
    }

    function select(i, focusTab) {
      idx = (i + HW.stories.length) % HW.stories.length;
      var s = HW.stories[idx];
      section.setAttribute("data-story", s.id);         // the section cross-fades to this scene's colour
      tabs.forEach(function (t, n) {
        t.setAttribute("aria-selected", String(n === idx));
        t.tabIndex = n === idx ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", tabs[idx].id);
      media.innerHTML = HW.plates[s.id] + (HW.hasPhoto(s.photo) ? '<img src="' + s.photo + '" alt="">' : "");
      HW.initPhotos(media.parentNode);
      caption.textContent = s.everyday;
      fresh(caption);
      count.textContent = (idx + 1) + " / " + HW.stories.length;
      reveal(false); // switching always resets to the everyday state
      if (focusTab) tabs[idx].focus();
    }

    tabs.forEach(function (t, n) {
      t.addEventListener("click", function () { select(n); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, to = null;
        if (k === "ArrowRight") to = idx + 1;
        else if (k === "ArrowLeft") to = idx - 1;
        else if (k === "Home") to = 0;
        else if (k === "End") to = HW.stories.length - 1;
        if (to !== null) { e.preventDefault(); select(to, true); }
      });
    });
    panel.querySelectorAll(".story__step").forEach(function (b) {
      b.addEventListener("click", function () { select(idx + Number(b.dataset.dir)); });
    });
    toggle.addEventListener("click", function () { reveal(toggle.getAttribute("aria-pressed") !== "true"); });

    select(0);
  }

  /* ---------- Hero house: tilts slightly toward the pointer over the headline (desktop, motion on; max ±5°) ---------- */
  function initTilt() {
    var title = document.querySelector(".hero__title"), house = document.querySelector(".hframe__house");
    if (!title || !house || !window.matchMedia("(pointer: fine)").matches) return;
    var reset = function () { house.style.setProperty("--rx", "0deg"); house.style.setProperty("--ry", "0deg"); };
    title.addEventListener("pointermove", function (e) {
      if (!HW.motionOn() || window.innerWidth < 900) return reset();
      var r = house.getBoundingClientRect(), t = title.getBoundingClientRect();
      var dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (t.width / 2)));
      var dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / t.height));
      house.style.setProperty("--ry", (dx * 5).toFixed(2) + "deg");
      house.style.setProperty("--rx", (-dy * 5).toFixed(2) + "deg");
    });
    title.addEventListener("pointerleave", reset);
    document.addEventListener("hw:motion", reset);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initConcerns();
    initStories();
    initTilt();
  });
})();
