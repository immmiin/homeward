/* HOMEWARD · Explore your options
   Answers live in this object only, in memory. Nothing is stored or sent. */
(function () {
  var HW = window.HW;
  var flow;
  var answers = { live: null, stay: null, worry: [], basic: null, ca: null };
  var qi = 0;          // current question index
  var screen = "intro";
  var Q = HW.questions;
  var esc = HW.esc;

  function label(qid, val) {
    var q = Q.filter(function (x) { return x.id === qid; })[0];
    var o = q.options.filter(function (x) { return x[0] === val; })[0];
    return o ? o[1] : "";
  }

  /* Render a screen with the slide + fade, then move focus to its heading. */
  function show(html, dir, wide) {
    flow.classList.toggle("explore__col--wide", !!wide);
    flow.innerHTML = '<div class="step' + (dir === "back" ? " step--back" : "") + '">' + html + "</div>";
    var h = flow.querySelector("h1");
    if (h) { h.setAttribute("tabindex", "-1"); if (dir) h.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  }

  /* Progress mark: the open frame closes around the house, one step per question */
  var lastGap = 12;
  function gapFor(i) { return (Q.length - 1 - i) * 3; }   // 12, 9, 6, 3, 0 (closed on the last question)
  function progressMark() {
    return '<span class="pmark" aria-hidden="true" style="--gap:' + lastGap + 'px">' +
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="square">' +
        '<path class="pmark__house" stroke-width="2.5" d="M15 23 24 15.5 33 23M17.5 21.5V33h13V21.5M22 33v-5h4v5"/>' +
        '<path class="pmark__tl" stroke-width="3.5" d="M8 20V8h16"/>' +
        '<path class="pmark__br" stroke-width="3.5" d="M40 28v12H26"/>' +
      '</svg></span>';
  }

  /* ---------- Intro ---------- */
  function intro(dir) {
    screen = "intro";
    show(
      '<section class="intro">' +
        '<div class="intro__text">' +
        '<p class="eyebrow">Explore your options</p>' +
        '<h1 class="display intro__title">A few questions can help you find a place to start.</h1>' +
        '<ul class="intro__facts" role="list">' +
          '<li><b>5</b><span>short questions</span></li>' +
          '<li><b>~2 min</b><span>to finish</span></li>' +
          '<li><b>0</b><span>personal details asked or saved</span></li>' +
        '</ul>' +
        '<button type="button" class="btn btn--primary" data-act="start">Start the questions ' + HW.icon.arrow + '</button>' +
        '<p class="intro__note">You can choose “I’m not sure” on any question. This guide does not determine final eligibility. A provider will review your situation.</p>' +
        '</div>' +
        '<div class="intro__visual frame frame--open duo-hover" aria-hidden="true"><span class="frame__c frame__c--tl"></span><span class="frame__c frame__c--br"></span>' +
          '<div class="media intro__media">' + HW.plates.stoop + (HW.hasPhoto("assets/photos/building.jpg") ? '<img src="assets/photos/building.jpg" alt="">' : "") + '</div></div>' +
      '</section>', dir, true);
    HW.initPhotos(flow);
  }

  /* ---------- Question ---------- */
  function question(dir) {
    screen = "q";
    var q = Q[qi];
    var multi = q.type === "multi";
    var bar = "";
    for (var i = 0; i < Q.length; i++) bar += '<i class="' + (i < qi ? "is-done" : i === qi ? "is-current" : "") + '"></i>';
    var opts = q.options.map(function (o) {
      var checked = multi ? answers[q.id].indexOf(o[0]) !== -1 : answers[q.id] === o[0];
      return '<label class="option bracketable' + (multi ? " option--multi" : "") + (o[0] === "unsure" ? " option--unsure" : "") + '">' +
        '<input type="' + (multi ? "checkbox" : "radio") + '" name="' + q.id + '" value="' + o[0] + '"' + (checked ? " checked" : "") + '>' +
        '<span class="option__text">' + esc(o[1]) + '</span>' +
        '<span class="check" aria-hidden="true">' + HW.icon.check + '</span></label>';
    }).join("");
    var help = q.help ?
      '<div class="q-help"><button type="button" class="disclosure-btn" aria-expanded="false" aria-controls="q-help-text"><span class="plus" aria-hidden="true"></span>' + esc(q.help.label) + '</button>' +
      '<p id="q-help-text" hidden>' + HW.glossify(esc(q.help.text)) + '</p></div>' : "";

    show(
      '<form class="q" novalidate>' +
        '<div class="progress"><div class="progress__top">' + progressMark() + '<p class="progress__label">Question ' + (qi + 1) + ' of ' + Q.length + '</p></div>' +
          '<div class="progress__bar" aria-hidden="true">' + bar + '</div></div>' +
        '<fieldset aria-describedby="q-error">' +
          '<legend><h1 class="q__title">' + esc(q.title) + (q.hint ? '<span class="q__hint">' + esc(q.hint) + '</span>' : "") + '</h1></legend>' +
          '<div class="options">' + opts + '</div>' +
        '</fieldset>' +
        help +
        '<p class="q__error" id="q-error" role="alert" hidden></p>' +
        '<div class="q-nav">' +
          '<button type="button" class="btn btn--secondary" data-act="back">' + HW.icon.back + ' Back</button>' +
          '<button type="submit" class="btn btn--primary">' + (qi === Q.length - 1 ? "See my options" : "Continue") + ' ' + HW.icon.arrow + '</button>' +
        '</div>' +
      '</form>', dir);

    // Close the frame one step: render at the previous gap, then move to this question's gap
    var mark = flow.querySelector(".pmark");
    lastGap = gapFor(qi);
    requestAnimationFrame(function () { requestAnimationFrame(function () { mark.style.setProperty("--gap", lastGap + "px"); }); });

    var form = flow.querySelector("form");
    // "I'm not sure" is exclusive on the multi-select question
    if (multi) form.addEventListener("change", function (e) {
      var boxes = form.querySelectorAll('input[name="' + q.id + '"]');
      if (e.target.value === "unsure" && e.target.checked) boxes.forEach(function (b) { if (b.value !== "unsure") b.checked = false; });
      else if (e.target.checked) boxes.forEach(function (b) { if (b.value === "unsure") b.checked = false; });
    });
    form.addEventListener("change", function () { form.querySelector(".q__error").hidden = true; });
    form.addEventListener("submit", function (e) { e.preventDefault(); next(form); });
  }

  function read(form) {
    var q = Q[qi];
    var vals = Array.prototype.map.call(form.querySelectorAll('input[name="' + q.id + '"]:checked'), function (i) { return i.value; });
    if (q.type === "multi") answers[q.id] = vals; else answers[q.id] = vals[0] || null;
    return vals.length > 0;
  }

  function next(form) {
    if (!read(form)) {
      var err = form.querySelector(".q__error");
      err.textContent = "Choose an answer to continue. “I’m not sure” is always okay.";
      err.hidden = false;
      return;
    }
    if (Q[qi].id === "live" && answers.live === "no") return outside();
    if (qi < Q.length - 1) { qi++; question("fwd"); }
    else results();
  }

  function back() {
    var form = flow.querySelector("form");
    if (form) read(form); // keep whatever was chosen on this screen too
    if (qi === 0) intro("back");
    else { qi--; question("back"); }
  }

  /* ---------- Outside NYC ---------- */
  function outside() {
    screen = "outside";
    show(
      '<section class="outside">' +
        '<p class="eyebrow">Outside New York City</p>' +
        '<h1 class="display outside__title">This guide focuses on NYC services.</h1>' +
        '<p class="lede">If you’re planning to move to NYC or aren’t sure what applies to you, you can call DSS at <a class="textlink" href="' + HW.DSS.tel + '">' + HW.DSS.label + '</a>.</p>' +
        '<div class="outside__links">' + HW.extLink("prevention") + '</div>' +
        '<div class="btn-row">' +
          '<button type="button" class="btn btn--primary" data-act="restart">Start again</button>' +
          '<button type="button" class="btn btn--secondary" data-act="edit">' + HW.icon.back + ' Change my answer</button>' +
        '</div>' +
      '</section>', "fwd");
  }

  /* ---------- Results ---------- */
  function concernsText() {
    var w = answers.worry.filter(function (k) { return k !== "unsure"; });
    if (!w.length) return ["Not sure yet. That’s okay."];
    return w.map(function (k) { return label("worry", k); });
  }

  function results() {
    screen = "results";
    var paths = HW.route(answers);
    var first = paths[0];

    var chips = [];
    if (answers.stay) chips.push(label("stay", answers.stay));
    answers.worry.forEach(function (k) { chips.push(label("worry", k)); });
    if (answers.basic === "yes") chips.push("Struggling with basic costs");
    if (answers.ca === "yes") chips.push("Receiving Cash Assistance");

    var pathHtml = function (p, i) {
      var pri = i === 0;
      return '<article class="path c-' + p.color + (pri ? " path--priority" : "") + '" aria-labelledby="path-' + p.id + '">' +
        '<div class="path__head"><span class="icon-badge' + (pri ? "" : " icon-badge--sm") + '">' + HW.iconFor(p.id) + '</span><div>' + (pri ? '<p class="eyebrow">Start here</p>' : "") +
          '<h2 class="path__name" id="path-' + p.id + '">' + esc(p.name) + '</h2></div></div>' +
        '<div class="path__body">' +
          '<div><h3>Why this may be relevant</h3>' + p.why.map(function (t) { return "<p>" + HW.glossify(esc(t)) + "</p>"; }).join("") + '</div>' +
          '<div><h3>What to do next</h3><ol>' + p.next.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ol></div>' +
          '<div class="path__links">' + p.links.map(function (k) { return HW.extLink(k); }).join("") + '</div>' +
        '</div></article>';
    };

    show(
      '<section class="results">' +
        '<header class="results__head">' +
          '<p class="eyebrow">Your results</p>' +
          '<h1 class="display results__title">Your next step starts here.</h1>' +
          '<p class="lede">Based on your answers, these support pathways may be relevant. A provider will need to review your circumstances.</p>' +
          (answers.live === "unsure" ? '<p class="muted">You weren’t sure if you live in NYC. These are NYC services. DSS can help you check what applies: <a class="textlink" href="' + HW.DSS.tel + '">' + HW.DSS.label + '</a>.</p>' : "") +
          '<div class="answers"><span class="small muted">Your answers:</span>' + chips.map(function (c) { return '<span class="tag">' + esc(c) + '</span>'; }).join("") +
            '<button type="button" class="textlink small" data-act="edit">Edit answers</button></div>' +
        '</header>' +
        '<div class="paths">' + pathHtml(first, 0) + '</div>' +
        timeline(first) +
        (paths.length > 1 ? '<p class="paths__also">Also may be relevant</p><div class="paths paths--also">' + paths.slice(1).map(function (p, i) { return pathHtml(p, i + 1); }).join("") + '</div>' : "") +
        '<section class="docs" aria-labelledby="docs-title">' +
          '<h2 id="docs-title" class="headline h-48">What you may be asked to bring</h2>' +
          '<ul class="docs__list" role="list">' + HW.documents.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + '</ul>' +
          '<p class="docs__note">Requirements vary. Confirm with the provider. You can still contact them if you don’t have every document.</p>' +
        '</section>' +
        '<section class="card-zone" aria-labelledby="card-title">' +
          '<div class="card-zone__intro">' +
            '<h2 id="card-title" class="headline h-48">Your next-step card</h2>' +
            '<p>Everything in one place: who to contact first, what to do, and the official links. Print it, email it to yourself, or copy it.</p>' +
            '<div class="card-actions">' +
              '<button type="button" class="btn btn--light" data-act="print">Print your next-step card ' + HW.icon.arrow + '</button>' +
              '<a class="btn btn--light" data-act="email" href="' + mailto(paths) + '">Email this to myself ' + HW.icon.arrow + '</a>' +
              '<p class="card-actions__note">Opens your email app. HOMEWARD doesn’t see or store your answers.</p>' +
              '<button type="button" class="btn btn--ghost-light" data-act="copy">Copy as text</button>' +
              '<p class="copied" aria-live="polite"></p>' +
              '<div class="card-actions__row">' +
                '<button type="button" class="textlink" data-act="edit">Edit answers</button>' +
                '<button type="button" class="textlink" data-act="restart">Start again</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
          ticket(paths) +
        '</section>' +
      '</section>', "fwd", true);
  }

  /* What happens next: generic steps only, no promised timeframes */
  function timeline(first) {
    var steps = [
      ["Contact", "Reach out to " + first.name + " using the steps above."],
      ["Talk it through", "Explain what\u2019s going on. It\u2019s okay not to have every answer."],
      ["Bring what you have", "ID, rent records, any notices. You can still reach out without every document."],
      ["A provider reviews your situation", "They look at your circumstances and explain what may be relevant."]
    ];
    return '<section class="timeline" aria-labelledby="tl-title"><h2 id="tl-title" class="timeline__title">What happens next</h2><ol class="timeline__list">' +
      steps.map(function (s, i) { return '<li><span class="timeline__n" aria-hidden="true">' + (i + 1) + '</span><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></li>'; }).join("") +
      '</ol></section>';
  }

  function uniqueLinks(paths) {
    var seen = {}, out = [];
    paths.forEach(function (p) { p.links.forEach(function (k) { if (!seen[k]) { seen[k] = 1; out.push(HW.links[k]); } }); });
    return out;
  }

  function actions(paths) {
    var out = [];
    paths.forEach(function (p) { if (p.next[0]) out.push(p.next[0]); });
    return out.slice(0, 4);
  }

  function ticket(paths) {
    var first = paths[0];
    return '<article class="ticket" id="next-step-card" aria-label="Your next-step card">' +
      '<div class="ticket__top">' +
        '<span class="logo"><span class="logo__word">homeward</span></span>' +
        '<p class="ticket__meta"><b>My next steps</b>NYC housing support</p>' +
      '</div>' +
      '<div class="ticket__sec tick" style="--i:1"><p class="ticket__k">Main concerns</p><p class="ticket__v">' + concernsText().map(esc).join(" · ") + '</p></div>' +
      '<div class="ticket__sec tick" style="--i:2"><p class="ticket__k">Contact first</p><p class="ticket__big">' + esc(first.name) + '</p><p class="ticket__v">' + esc(first.next[0]) + '</p></div>' +
      '<div class="ticket__sec tick" style="--i:3"><p class="ticket__k">Next actions</p><ol>' + actions(paths).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ol></div>' +
      '<div class="ticket__sec tick" style="--i:4"><p class="ticket__k">Documents you can prepare</p><ul>' + HW.documents.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + '</ul><p class="ticket__v ticket__fine">Requirements vary. You can still reach out without every document.</p></div>' +
      '<div class="ticket__sec tick" style="--i:5"><p class="ticket__k">Official links</p><ul class="ticket__urls">' + uniqueLinks(paths).map(function (l) {
        return '<li><span>' + esc(l.label) + '</span><a href="' + l.url + '" target="_blank" rel="noopener">' + esc(l.url) + '</a></li>';
      }).join("") + '</ul></div>' +
      '<div class="ticket__sec tick" style="--i:6"><p class="ticket__k">DSS OneNumber</p><a class="ticket__phone" href="' + HW.DSS.tel + '">' + HW.DSS.label + '</a></div>' +
      '<p class="ticket__foot">HOMEWARD is an independent student design prototype, not an official NYC government service. This card is a starting point, not a decision. A provider will review your situation.</p>' +
    '</article>';
  }

  /* Plain-text version for email and copy */
  function plain(paths, compact) {
    var first = paths[0];
    var L = [];
    L.push("MY HOMEWARD NEXT STEPS");
    L.push("");
    L.push("Main concerns: " + concernsText().join(", "));
    L.push("");
    L.push("Contact first: " + first.name);
    L.push(first.next[0]);
    L.push("");
    L.push("Next actions:");
    actions(paths).forEach(function (t, i) { L.push((i + 1) + ". " + t); });
    L.push("");
    L.push("Documents you can prepare: " + HW.documents.join("; ") + ". Requirements vary. Confirm with the provider.");
    L.push("");
    L.push("Official links:");
    uniqueLinks(paths).slice(0, compact ? 4 : 99).forEach(function (l) { L.push("- " + l.label + ": " + l.url); });
    L.push("");
    L.push("DSS OneNumber: 718-557-1399");
    L.push("");
    L.push("HOMEWARD is an independent student design prototype, not an official NYC government service.");
    return L.join("\n");
  }

  function mailto(paths) {
    var body = plain(paths, true);
    if (body.length > 1800) body = body.slice(0, 1780) + "\n...";
    return "mailto:?subject=" + encodeURIComponent("My HOMEWARD next steps") + "&body=" + encodeURIComponent(body);
  }

  function copy(btn) {
    var text = plain(HW.route(answers), false);
    var done = function () {
      var c = flow.querySelector(".copied");
      c.textContent = "Copied. Paste it into a note or message.";
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = "Copy as text"; }, 2400);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      ta.remove(); btn.focus();
    }
  }

  function restart() {
    answers = { live: null, stay: null, worry: [], basic: null, ca: null };
    qi = 0;
    intro("back");
  }

  document.addEventListener("DOMContentLoaded", function () {
    flow = document.getElementById("flow");

    // ?concern= from Home preselects only the matching worry in question 3
    var c = new URLSearchParams(location.search).get("concern");
    var match = HW.concerns.filter(function (x) { return x.id === c && x.worry; })[0];
    if (match) answers.worry = [match.worry];

    flow.addEventListener("click", function (e) {
      var t = e.target.closest("[data-act]");
      if (t) {
        var act = t.getAttribute("data-act");
        if (act === "start") { qi = 0; question("fwd"); }
        else if (act === "back") back();
        else if (act === "restart") restart();
        else if (act === "edit") { qi = 0; question("back"); }
        else if (act === "print") window.print();
        else if (act === "copy") copy(t);
        return; // email is a real mailto link
      }
      var d = e.target.closest(".disclosure-btn");
      if (d) {
        var open = d.getAttribute("aria-expanded") !== "true";
        d.setAttribute("aria-expanded", String(open));
        document.getElementById(d.getAttribute("aria-controls")).hidden = !open;
      }
    });

    intro();
  });
})();
