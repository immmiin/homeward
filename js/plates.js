/* HOMEWARD graphic plates: art-directed B&W placeholders until real photos exist.
   Tonal grey palette, flat geometry, a fine grain. No faces, no identifiable people.
   Story plates keep their "unseen" details at the edges: the everyday view is
   cropped in, and "Look closer" widens the frame to show them. */
(function () {
  var HW = window.HW = window.HW || {};
  var P = ["#F2F0EC", "#DCD8D0", "#B9B4AB", "#8C877F", "#57534E", "#2B2A2D", "#141416"];

  function grain(id) {
    return '<filter id="' + id + '" x="0" y="0" width="100%" height="100%">' +
      '<feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" result="n"/>' +
      '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0"/></filter>';
  }
  function plate(id, w, h, body) {
    return '<svg class="media__art" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs>' + grain("g-" + id) + '</defs>' + body +
      '<rect width="' + w + '" height="' + h + '" filter="url(#g-' + id + ')" opacity=".22"/></svg>';
  }
  function note(x, y, w, title, rot) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ')">' +
      '<rect width="' + w + '" height="86" fill="' + P[0] + '"/>' +
      '<rect x="10" y="12" width="' + (w - 20) + '" height="20" fill="' + P[6] + '"/>' +
      '<text x="16" y="27" font-family="Inter, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing=".5" fill="' + P[0] + '">' + title + '</text>' +
      '<g fill="' + P[2] + '"><rect x="10" y="44" width="' + (w - 20) + '" height="5"/><rect x="10" y="57" width="' + (w - 36) + '" height="5"/><rect x="10" y="70" width="' + (w - 28) + '" height="5"/></g></g>';
  }
  function phone(x, y, rot, label) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')">' +
      '<rect width="80" height="140" rx="14" fill="' + P[6] + '"/><rect x="7" y="12" width="66" height="112" rx="6" fill="' + P[0] + '"/>' +
      '<rect x="13" y="22" width="54" height="30" rx="8" fill="#fff" stroke="' + P[6] + '" stroke-width="1.5"/>' +
      '<text x="19" y="41" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="700" fill="' + P[6] + '">' + label + '</text>' +
      '<rect x="13" y="62" width="40" height="5" fill="' + P[2] + '"/><rect x="13" y="73" width="30" height="5" fill="' + P[2] + '"/></g>';
  }

  HW.plates = {
    /* The commute: a train car in motion */
    commute: plate("commute", 800, 500,
      '<rect width="800" height="500" fill="' + P[1] + '"/>' +
      '<rect y="118" width="800" height="250" fill="' + P[5] + '"/>' +
      '<g fill="' + P[3] + '"><rect x="120" y="156" width="230" height="140" rx="22"/><rect x="450" y="156" width="230" height="140" rx="22"/></g>' +
      '<g fill="' + P[2] + '"><rect x="148" y="190" width="150" height="6"/><rect x="190" y="222" width="140" height="6"/><rect x="160" y="256" width="90" height="6"/><rect x="478" y="188" width="160" height="6"/><rect x="520" y="224" width="130" height="6"/><rect x="490" y="258" width="80" height="6"/></g>' +
      '<rect y="92" width="800" height="8" fill="' + P[6] + '"/>' +
      '<g fill="none" stroke="' + P[6] + '" stroke-width="6"><circle cx="250" cy="122" r="14"/><circle cx="400" cy="122" r="14"/><circle cx="550" cy="122" r="14"/></g>' +
      '<rect x="384" y="100" width="12" height="400" fill="' + P[6] + '"/>' +
      '<rect y="368" width="800" height="132" fill="' + P[3] + '"/>' +
      '<rect x="90" y="318" width="620" height="54" rx="12" fill="' + P[4] + '"/>' +
      '<rect y="440" width="800" height="6" fill="' + P[2] + '"/>' +
      phone(22, 360, -8, "Rent due") +
      note(684, 4, 112, "NOTICE", 4)),

    /* The grocery run: bags on a counter */
    groceries: plate("groceries", 800, 500,
      '<rect width="800" height="500" fill="' + P[1] + '"/>' +
      '<g fill="' + P[2] + '"><rect y="70" width="800" height="8"/><rect y="150" width="800" height="8"/></g>' +
      '<rect y="330" width="800" height="170" fill="' + P[4] + '"/><rect y="326" width="800" height="8" fill="' + P[5] + '"/>' +
      '<circle cx="300" cy="182" r="38" fill="' + P[5] + '"/><circle cx="356" cy="168" r="28" fill="' + P[4] + '"/>' +
      '<rect x="372" y="104" width="26" height="110" rx="12" fill="' + P[0] + '" transform="rotate(14 385 160)"/>' +
      '<path d="M236 196h196l-16 134H252z" fill="' + P[2] + '"/><path d="M236 196h196v24H236z" fill="' + P[3] + '"/>' +
      '<circle cx="486" cy="226" r="22" fill="' + P[6] + '"/><circle cx="528" cy="216" r="16" fill="' + P[3] + '"/>' +
      '<path d="M452 236h132l-10 94H462z" fill="' + P[3] + '"/><path d="M452 236h132v18H452z" fill="' + P[4] + '"/>' +
      '<rect x="168" y="290" width="62" height="40" rx="8" fill="' + P[0] + '"/>' +
      '<g transform="translate(694 112) rotate(3)"><rect width="78" height="330" fill="' + P[0] + '"/>' +
        '<g fill="' + P[2] + '"><rect x="10" y="18" width="58" height="5"/><rect x="10" y="34" width="40" height="5"/><rect x="10" y="50" width="52" height="5"/><rect x="10" y="66" width="34" height="5"/><rect x="10" y="82" width="54" height="5"/></g>' +
        '<rect x="10" y="104" width="58" height="10" fill="' + P[6] + '"/>' +
        '<text x="10" y="136" font-family="Inter, Arial, sans-serif" font-size="11" font-weight="700" fill="' + P[6] + '">RENT LEFT?</text></g>' +
      note(12, 4, 120, "RENT NOTICE", -4)),

    /* The school run: a crosswalk on a bright morning */
    school: plate("school", 800, 500,
      '<rect width="800" height="500" fill="' + P[1] + '"/>' +
      '<circle cx="600" cy="120" r="56" fill="' + P[0] + '"/>' +
      '<rect x="420" y="150" width="270" height="190" fill="' + P[3] + '"/><path d="M400 150h310l-155-62z" fill="' + P[4] + '"/>' +
      '<g fill="' + P[2] + '"><rect x="448" y="186" width="44" height="50"/><rect x="532" y="186" width="44" height="50"/><rect x="616" y="186" width="44" height="50"/><rect x="448" y="266" width="44" height="50"/><rect x="616" y="266" width="44" height="50"/></g>' +
      '<rect x="534" y="262" width="40" height="78" fill="' + P[5] + '"/>' +
      '<rect y="340" width="800" height="160" fill="' + P[5] + '"/>' +
      '<g fill="' + P[0] + '" opacity=".9"><path d="M70 370h64l-18 130H50z"/><path d="M190 370h64l-10 130h-64z"/><path d="M310 370h64l-3 130h-64z"/><path d="M430 370h64l4 130h-64z"/><path d="M550 370h64l12 130h-64z"/><path d="M670 370h64l18 130h-64z"/></g>' +
      '<rect x="212" y="214" width="16" height="126" fill="' + P[5] + '"/><circle cx="220" cy="184" r="62" fill="' + P[4] + '"/>' +
      '<rect x="282" y="226" width="112" height="150" rx="32" fill="' + P[6] + '"/><rect x="302" y="300" width="72" height="56" rx="12" fill="' + P[4] + '"/><path d="M308 234c0-42 60-42 60 0" fill="none" stroke="' + P[6] + '" stroke-width="10"/>' +
      note(10, 6, 118, "HOUSING", -3) +
      phone(700, 380, 10, "Can we stay?")),

    /* Explore intro: a brownstone stoop, one window lit in teal */
    stoop: plate("stoop", 480, 600,
      '<rect width="480" height="600" fill="' + P[1] + '"/>' +
      '<rect width="480" height="430" fill="' + P[3] + '"/>' +
      '<g fill="' + P[4] + '"><rect y="96" width="480" height="8"/><rect y="250" width="480" height="8"/></g>' +
      '<g fill="' + P[5] + '"><rect x="40" y="128" width="84" height="106"/><rect x="40" width="84" height="80"/><rect x="356" width="84" height="80"/></g>' +
      '<rect x="356" y="128" width="84" height="106" fill="#4AA39A"/>' +
      '<g stroke="' + P[3] + '" stroke-width="5"><path d="M82 128v106M40 181h84M398 128v106M356 181h84M82 0v80M398 0v80"/></g>' +
      '<path d="M176 430V176a64 64 0 0 1 128 0v254z" fill="' + P[6] + '"/>' +
      '<path d="M196 430V190a44 44 0 0 1 88 0v240z" fill="' + P[5] + '"/><circle cx="270" cy="320" r="5" fill="' + P[1] + '"/>' +
      '<g fill="' + P[2] + '"><rect x="140" y="430" width="200" height="28"/><rect x="124" y="458" width="232" height="28"/><rect x="108" y="486" width="264" height="28"/><rect x="92" y="514" width="296" height="28"/><rect x="76" y="542" width="328" height="58"/></g>' +
      '<g fill="' + P[3] + '"><rect x="140" y="452" width="200" height="6"/><rect x="124" y="480" width="232" height="6"/><rect x="108" y="508" width="264" height="6"/><rect x="92" y="536" width="296" height="6"/></g>' +
      '<g stroke="' + P[6] + '" stroke-width="6" fill="none"><path d="M150 410 70 560M330 410l80 150"/></g>')
  };
})();
