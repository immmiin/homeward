/* HOMEWARD content + routing rules.
   Every program summary is paraphrased from the official NYC page it links to.
   We never state conditions, amounts, deadlines or income limits here:
   we point people to the official page and to a provider instead. */

window.HW = window.HW || {};

/* Optional image files actually present in assets/. Only listed files are requested,
   so the live site never logs 404s for empty slots. Add a filename here after adding the file. */
HW.assetFiles = {
  photos: [],                         // e.g. "assets/photos/commute.jpg", "assets/photos/building.jpg"
  house: "assets/3d/house.png",       // the 3D house render (set to "" to use the drawn fallback)
  houseColors: []                     // e.g. "orange" if assets/3d/house-orange.png exists
};
HW.hasPhoto = function (path) { return HW.assetFiles.photos.indexOf(path) !== -1; };

HW.DSS = { label: "718-557-1399", tel: "tel:7185571399" };

HW.links = {
  prevention: { label: "NYC Homelessness Prevention", url: "https://www.nyc.gov/site/hra/help/homelessness-prevention.page" },
  homebase: { label: "Homebase (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/homebase.page" },
  homebaseLocator: { label: "Find the Homebase for your ZIP code", url: "https://www.nyc.gov/site/hra/help/homebase-locations.page" },
  cityfheps: { label: "CityFHEPS (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/cityfheps.page" },
  cityfhepsShelter: { label: "CityFHEPS: if you're in shelter", url: "https://www.nyc.gov/site/hra/help/in-shelter.page" },
  facingEviction: { label: "Rental assistance if you're facing eviction", url: "https://www.nyc.gov/site/hra/help/facing-eviction.page" },
  legal: { label: "Legal assistance (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/legal-assistance.page" },
  legalTenants: { label: "Free legal help for tenants", url: "https://www.nyc.gov/site/hra/help/legal-services-for-tenants.page" },
  cash: { label: "Cash Assistance (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/cash-assistance.page" },
  accessHRA: { label: "ACCESS HRA", url: "https://a069-access.nyc.gov/" },
  supportive: { label: "Supportive Housing (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/supportive-housing.page" },
  supportiveAccess: { label: "Accessing supportive housing", url: "https://www.nyc.gov/site/hra/help/accessing-supportive-housing.page" },
  affordable: { label: "Affordable Housing Services (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/affordable-housing.page" },
  hsu: { label: "Home Support Unit (NYC HRA)", url: "https://www.nyc.gov/site/hra/help/home-support-unit.page" },
  income: { label: "Source of income discrimination", url: "https://www.nyc.gov/site/hra/help/income-discrimination.page" },
  evictionRights: { label: "Eviction prevention and tenant rights (HPD)", url: "https://www.nyc.gov/site/hpd/services-and-information/eviction-prevention.page" },
  dhsShelter: { label: "NYC shelter services (DHS)", url: "https://www.nyc.gov/site/dhs/shelter/shelter.page" },
  dhsFamilies: { label: "Families with children: applying for shelter (DHS)", url: "https://www.nyc.gov/site/dhs/shelter/families/families-with-children-applying.page" },
  dhsAdults: { label: "Single adults: applying for shelter (DHS)", url: "https://www.nyc.gov/site/dhs/shelter/singleadults/single-adults-applying.page" }
};

/* Programs on Find support. need = filter keys. */
HW.programs = [
  {
    id: "homebase", tier: "primary", color: "teal", tag: "Staying housed",
    needs: ["rent", "legal", "stay"],
    name: "Homebase",
    line: "Local offices across NYC that help people at risk of losing their home make a plan to stay housed.",
    who: [
      "People in NYC who are worried they may have to enter a shelter.",
      "Renters behind on rent or facing eviction who want to stay in their community.",
      "People who aren't sure where to start: Homebase can talk through options with you."
    ],
    start: [
      "Use the official locator to find the Homebase that serves your ZIP code.",
      "Call that office ahead of time to schedule an appointment. You can also call 311.",
      "Services can include eviction prevention, help applying for benefits, emergency rental assistance, financial counseling and help relocating."
    ],
    links: ["homebaseLocator", "homebase"]
  },
  {
    id: "cityfheps", tier: "primary", color: "blue", tag: "Rent support",
    needs: ["rent", "longterm"],
    name: "CityFHEPS",
    line: "A rental assistance program that can help pay part of the monthly rent for some households, in shelter or in the community.",
    who: [
      "Some households facing eviction or homelessness in the community.",
      "Some households currently staying in a DHS shelter.",
      "A provider, such as Homebase or a shelter case manager, can review whether it may be relevant to you."
    ],
    start: [
      "If you're in the community, start with Homebase. They can help with rental assistance applications.",
      "If you're in shelter, talk with your shelter case manager.",
      "Questions: DSS OneNumber 718-557-1399, Monday to Friday, 8 AM to 5 PM."
    ],
    links: ["cityfheps", "facingEviction", "cityfhepsShelter"]
  },
  {
    id: "legal", tier: "primary", color: "orange", tag: "Eviction & legal help",
    needs: ["legal"],
    name: "Legal assistance",
    line: "Free legal help for NYC tenants facing eviction in Housing Court, in every ZIP code, regardless of immigration status.",
    who: [
      "Tenants who received court papers or a notice about eviction.",
      "Tenants facing harassment or problems with repairs.",
      "Attorneys through this program never ask you to pay. If someone does, report it to civiljustice@hra.nyc.gov."
    ],
    start: [
      "Call 311 and ask for the Tenant Helpline.",
      "At Housing Court, ask about free legal help at your first appearance.",
      "Don't wait: reaching out early gives a lawyer more time to help."
    ],
    links: ["legalTenants", "legal"]
  },
  {
    id: "cash", tier: "primary", color: "yellow", tag: "Rent support",
    needs: ["rent"],
    name: "Cash Assistance",
    line: "Temporary financial support for basic costs, including emergency help that can sometimes cover rent you owe.",
    who: [
      "People struggling to cover basic costs like food, rent and utilities.",
      "People facing an emergency, such as rent they owe or a utility shutoff. Ask about the One Shot Deal.",
      "Some rent assistance programs may ask whether you receive Cash Assistance. Not all of them do."
    ],
    start: [
      "Apply online through ACCESS HRA, or visit a Benefit Access Center.",
      "After applying, you'll have an interview. The official page explains how to schedule it.",
      "Questions: DSS OneNumber 718-557-1399."
    ],
    links: ["cash", "accessHRA"]
  },
  {
    id: "supportive", tier: "more", color: "purple", tag: "Longer-term housing",
    needs: ["longterm"],
    name: "Supportive Housing",
    line: "Affordable housing with support services on site, for people who are homeless or at risk of homelessness.",
    links: ["supportiveAccess", "supportive"]
  },
  {
    id: "affordable", tier: "more", color: "mint", tag: "Longer-term housing",
    needs: ["longterm"],
    name: "Affordable Housing Services",
    line: "A guide to the City's affordable housing resources, including Housing Connect lotteries and NYCHA.",
    links: ["affordable"]
  },
  {
    id: "hsu", tier: "more", color: "neutral", tag: "For landlords, brokers, and property managers",
    needs: ["longterm"],
    audience: "landlords",
    name: "Home Support Unit",
    line: "Works with landlords, brokers and property managers to lease vacant apartments to New Yorkers with housing subsidies. This is not an application for residents.",
    links: ["hsu"]
  }
];

HW.filters = [
  { key: "all", label: "All" },
  { key: "rent", label: "Rent support" },
  { key: "legal", label: "Eviction & legal help" },
  { key: "stay", label: "Staying housed" },
  { key: "longterm", label: "Longer-term housing" }
];

/* Home: "How can we help?" Each panel: icon + program, one plain sentence, three next steps. */
HW.concerns = [
  {
    id: "rent", color: "orange", label: "I'm behind on rent.", need: "rent", worry: "arrears",
    program: "homebase", programName: "Homebase",
    summary: "Falling behind can happen to anyone, including people who work, and Homebase offices across NYC can talk through options for rent you owe.",
    steps: ["Find the Homebase that serves your ZIP code with the official locator.", "Call ahead to make an appointment, or call 311.", "Bring what you have, like ID and rent records. You can still go without every document."],
    more: "Homebase can help with things like emergency rental assistance and applying for benefits. Cash Assistance also has emergency help that can sometimes cover rent you owe. A provider can review your situation and explain what may be relevant.",
    link: "homebaseLocator"
  },
  {
    id: "eviction", color: "yellow", label: "I received an eviction notice.", need: "legal", worry: "eviction",
    program: "legal", programName: "Legal assistance",
    summary: "Start with free legal help: NYC tenants facing eviction in Housing Court can get free legal representation or advice in every ZIP code, regardless of immigration status.",
    steps: ["Call 311 and ask for the Tenant Helpline.", "If you have a court date, ask about free legal help at Housing Court.", "Keep your notice or court papers together and bring them."],
    more: "Lockouts are illegal in NYC. An eviction has to go through a court process. Homebase can also help you work on a plan to stay housed.",
    link: "legalTenants"
  },
  {
    id: "stay", color: "teal", label: "I'm worried about losing my home.", need: "stay", worry: "leave",
    program: "homebase", programName: "Homebase",
    summary: "You can need help even if you work or still have a home, and reaching out early to Homebase gives you more options.",
    steps: ["Find your Homebase with the official locator.", "Call ahead and explain that you're worried about losing your home.", "Ask about eviction prevention and help applying for benefits."],
    more: "Homebase works with people who are worried they may have to leave where they live. Services can include eviction prevention, financial counseling and help applying for benefits.",
    link: "homebaseLocator"
  },
  {
    id: "options", color: "blue", label: "I want to understand my options.", need: "all", worry: null,
    program: "homebase", programName: "NYC housing support",
    summary: "There's no wrong place to start: browse what each NYC service offers, or answer five quick questions to find a starting point.",
    steps: ["Browse what each NYC service offers.", "Or answer five quick questions to see where to start.", "Questions? Call DSS at 718-557-1399."],
    more: "HOMEWARD is a guide, not an application. It can't decide what you can receive, but it can help you know who to contact and what to ask.",
    link: "prevention"
  }
];

/* Home: "More than you see." Illustrative scenarios, not real testimonies.
   Each scene owns a color; text color switches to keep AA contrast. */
HW.stories = [
  { id: "commute", tab: "The commute", photo: "assets/photos/commute.jpg", color: "blue", onDark: true,
    everyday: "On the way to work.",
    hidden: "A regular commute can come with worries about rent.", hl: "worries about rent", hlColor: "yellow" },
  { id: "groceries", tab: "The grocery run", photo: "assets/photos/groceries.jpg", color: "orange", onDark: false,
    everyday: "Picking up groceries.",
    hidden: "An everyday grocery run can hide a struggle to cover rent.", hl: "struggle to cover rent", hlColor: "mint" },
  { id: "school", tab: "The school run", photo: "assets/photos/school.jpg", color: "purple", onDark: false,
    everyday: "Walking to school.",
    hidden: "A familiar school run can come with uncertainty about home.", hl: "uncertainty about home", hlColor: "yellow" }
];

/* Plain-language glossary (one sentence each, from the linked official page) */
HW.glossary = {
  "Homebase": { def: "Homebase offices across NYC help people at risk of losing their home make a plan to stay housed, including eviction prevention and help applying for benefits.", link: "homebase" },
  "CityFHEPS": { def: "CityFHEPS is a City rental assistance program that helps some individuals and families find and keep housing by paying part of the rent.", link: "cityfheps" },
  "Cash Assistance": { def: "Cash Assistance is temporary financial help from the City for basic costs, with emergency help available in some situations.", link: "cash" },
  "Housing Court": { def: "Housing Court is where eviction cases are heard, and NYC tenants facing eviction there can get free legal help.", link: "legalTenants" }
};

/* Icon set: 24px grid, 2px stroke, square caps, mitred (bracket-like) corners */
HW.icons = (function () {
  var w = function (d) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">' + d + '</svg>'; };
  return {
    house: w('<path d="M3 11 12 3.5 21 11"/><path d="M5.5 9.5V20.5h13V9.5"/><path d="M10 20.5V15h4v5.5"/>'),
    key: w('<circle cx="7.5" cy="12" r="4"/><path d="M11.5 12h10M18 12v3.5M21.5 12v3.5"/>'),
    legal: w('<path d="M5 2.5h9.5l4.5 4.5v14.5H5z"/><path d="M14.5 2.5V7H19"/><path d="M8.5 12h7M8.5 15.5h7M8.5 19h4"/>'),
    coin: w('<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11"/><path d="M15 9H10.5a1.75 1.75 0 0 0 0 3.5h3a1.75 1.75 0 0 1 0 3.5H9"/>'),
    supportive: w('<path d="M2.5 12 10 5.5 17.5 12"/><path d="M4.5 10.5V20.5h11V10.5"/><path d="M8.5 20.5V16h3v4.5"/><path d="M19.5 2.5v6M16.5 5.5h6"/>'),
    building: w('<path d="M4 21V3.5h10V21"/><path d="M14 9h6v12"/><path d="M2 21h20"/><path d="M7.5 7.5h0M10.5 7.5h0M7.5 11.5h0M10.5 11.5h0M7.5 15.5h0M10.5 15.5h0M17 13h0M17 16.5h0" stroke-width="2.4"/>')
  };
})();
HW.programIcon = { homebase: "house", cityfheps: "key", legal: "legal", cash: "coin", supportive: "supportive", affordable: "building", hsu: "building", "shelter-help": "supportive", "case-manager": "key" };

/* Explore questions */
HW.questions = [
  { id: "live", type: "single",
    title: "Do you currently live in New York City?",
    options: [["yes", "Yes"], ["no", "No"], ["unsure", "I'm not sure"]] },
  { id: "stay", type: "single",
    title: "Which best describes where you're staying?",
    options: [["rent", "I rent a home or apartment."], ["temp", "I'm staying temporarily with someone."], ["shelter", "I'm currently in a shelter."], ["unstable", "I don't have a stable place to stay."], ["other", "Something else"], ["unsure", "I'm not sure"]] },
  { id: "worry", type: "multi",
    title: "What are you worried about right now?",
    hint: "Choose all that apply.",
    options: [["rent", "Keeping up with rent"], ["arrears", "Rent I already owe"], ["eviction", "An eviction notice or court case"], ["leave", "Having to leave where I'm staying"], ["stable", "Finding a stable home"], ["unsure", "I'm not sure"]] },
  { id: "basic", type: "single",
    title: "Are you struggling to cover basic costs, including housing?",
    options: [["yes", "Yes"], ["no", "No"], ["unsure", "I'm not sure"]] },
  { id: "ca", type: "single",
    title: "Are you currently receiving Cash Assistance?",
    help: {
      label: "What is Cash Assistance?",
      text: "Cash Assistance is a City program that gives temporary financial help for basic costs. Some rent assistance programs may require that you receive it, but not all do. Your answer never removes an option here. It only helps us suggest what to mention to a provider."
    },
    options: [["yes", "Yes"], ["no", "No"], ["unsure", "I'm not sure"]] }
];

HW.documents = [
  "A photo ID",
  "Your lease or rent records (receipts, rent ledger, landlord letters)",
  "Recent income, pay or benefits documents",
  "Any eviction notice or court papers, if you have them"
];

/* Routing: transparent, rule-based. Returns pathways in order; the first is the priority.
   Rules never exclude a pathway because of the Cash Assistance answer. */
HW.route = function (a) {
  var w = a.worry || [];
  var has = function (k) { return w.indexOf(k) !== -1; };
  var community = a.stay === "rent" || a.stay === "temp";
  var out = [];
  var add = function (p, score) { p.score = score; out.push(p); };

  // 1. Eviction notice or court case: legal help comes first.
  if (has("eviction")) add({
    id: "legal", name: "Legal assistance", color: "orange",
    why: ["You mentioned an eviction notice or court case. NYC tenants facing eviction in Housing Court can get free legal help in every ZIP code, regardless of immigration status."],
    next: ["Call 311 and ask for the Tenant Helpline.", "If you have a court date, ask about free legal help at Housing Court.", "Keep your notice or court papers together and bring them."],
    links: ["legalTenants", "legal"]
  }, 100);

  // 2. No stable place to stay: official emergency housing help.
  if (a.stay === "unstable") add({
    id: "shelter-help", name: "Emergency housing help (DHS)", color: "purple",
    why: ["You said you don't have a stable place to stay. NYC's Department of Homeless Services explains how to get temporary housing help today."],
    next: ["Start with the official NYC Department of Homeless Services shelter page.", "From there, find the page that fits your household: families with children, or single adults.", "If you're unsure where to go, call 311 or DSS at 718-557-1399."],
    links: ["dhsShelter", "dhsFamilies", "dhsAdults"]
  }, 95);

  // 3. In shelter: case manager + official CityFHEPS info.
  if (a.stay === "shelter") add({
    id: "case-manager", name: "Your shelter case manager + CityFHEPS", color: "blue",
    why: ["You said you're currently in a shelter. Your case manager is the best person to review your situation and talk about moving into housing, including rental assistance like CityFHEPS."],
    next: ["Ask your case manager whether CityFHEPS may be relevant to your household.", "Read the official CityFHEPS page for people in shelter."],
    links: ["cityfhepsShelter", "cityfheps"]
  }, 92);

  // 4. In the community with a rent, arrears, eviction or having-to-leave worry: Homebase.
  var homebaseWorry = has("rent") || has("arrears") || has("eviction") || has("leave");
  if (community && homebaseWorry) add({
    id: "homebase", name: "Homebase", color: "teal",
    why: ["You're " + (a.stay === "rent" ? "renting" : "staying with someone") + " and worried about " + HW.worryPhrase(w) + ". Homebase helps people in NYC make a plan to stay housed."],
    next: ["Use the official locator to find the Homebase that serves your ZIP code.", "Call ahead to schedule an appointment, or call 311.", "Ask about eviction prevention and emergency rental assistance."],
    links: ["homebaseLocator", "homebase"]
  }, 90);

  // 5. Rent worries (community): CityFHEPS as a secondary pathway.
  if (a.stay !== "shelter" && (has("rent") || has("arrears"))) {
    var why = ["You mentioned rent. CityFHEPS is a rental assistance program that may help some households pay part of their rent."];
    if (a.ca === "yes") why.push("You said you receive Cash Assistance. Mention this to the provider.");
    if (a.ca === "no" || a.ca === "unsure") why.push("Not receiving Cash Assistance doesn't rule this out. A provider can explain what applies.");
    add({
      id: "cityfheps", name: "CityFHEPS", color: "blue", why: why,
      next: ["Ask a provider whether CityFHEPS may be relevant to your household.", "Homebase can help with rental assistance applications."],
      links: ["cityfheps", "facingEviction"]
    }, 60);
  }

  // 6. Struggling with basic costs: Cash Assistance as a secondary pathway.
  if (a.basic === "yes") add({
    id: "cash", name: "Cash Assistance", color: "yellow",
    why: ["You said covering basic costs, including housing, is hard right now. Cash Assistance offers temporary financial help, and emergency help (the One Shot Deal) can sometimes cover rent you owe."],
    next: ["Read the official Cash Assistance page.", "Apply online through ACCESS HRA, or call DSS at 718-557-1399 with questions."],
    links: ["cash", "accessHRA"]
  }, 50);

  // 7. Finding a stable home: longer-term housing resources.
  if (has("stable")) add({
    id: "affordable", name: "Affordable Housing Services", color: "mint",
    why: ["You're looking for a stable home. The City's Affordable Housing Services page gathers longer-term options like Housing Connect and NYCHA."],
    next: ["Browse the official Affordable Housing Services page.", "Ask a provider which longer-term options may fit your household."],
    links: ["affordable", "supportiveAccess"]
  }, 40);

  // 8. Never a dead end: many "I'm not sure" answers, or nothing matched.
  var unsure = ["live", "stay", "basic", "ca"].filter(function (k) { return a[k] === "unsure"; }).length + (has("unsure") ? 1 : 0);
  var hasHomebase = out.some(function (p) { return p.id === "homebase"; });
  if (!hasHomebase && (unsure >= 2 || out.length === 0 || (!homebaseWorry && community))) add({
    id: "homebase", name: "Homebase counseling + DSS OneNumber", color: "teal",
    why: ["It's okay not to be sure. A Homebase counselor can talk through your situation and point you to what may be relevant, and DSS can answer questions by phone."],
    next: ["Use the official locator to find the Homebase that serves your ZIP code, and call ahead.", "Or call DSS at 718-557-1399 (Monday to Friday, 8 AM to 5 PM)."],
    links: ["homebaseLocator", "prevention"]
  }, out.length === 0 ? 100 : 30);

  out.sort(function (x, y) { return y.score - x.score; });
  return out;
};

HW.worryPhrase = function (w) {
  var map = { rent: "keeping up with rent", arrears: "rent you already owe", eviction: "an eviction notice or court case", leave: "having to leave where you're staying" };
  var list = w.filter(function (k) { return map[k]; }).map(function (k) { return map[k]; });
  if (list.length <= 1) return list[0] || "your housing";
  return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
};
