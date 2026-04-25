const STARTPAGE = "aktualis";

let container;
let landingSections;
const { jmn } = window;

const pageScripts = {
  video: jmn.Y.render,
  fasciaflow: jmn.Y.render,
};

const VALID_PAGES = [
  "aktualis","rolam","orak","video","fasciaflow",
  "manual","kepzes","tabor","bars","jelentkezes",
  "jem","credits","privacy","ebook"
];

const BASE_URL = "https://www.jogazzmindennap.hu";

const PAGE_META = {
  "": {
    title: "Jógázz minden nap | Czvikli Zsuzsanna jógaoktató",
    description: "Jóga Budapesten és online - Czvikli Zsuzsanna, 30 év tapasztalat. Hatha, Flow, Ashtanga, Vinyasa. Fasciális jógaterápia, arcterápia. Samadhi Jóga Stúdió.",
    canonical: BASE_URL + "/",
  },
  aktualis: {
    title: "Aktuális események | Czvikli Zsuzsanna",
    description: "Aktuális jóga események, online sorozatok, képzések és elvonulások Czvikli Zsuzsannával.",
    canonical: BASE_URL + "/aktualis",
  },
  orak: {
    title: "Jógaórák | Czvikli Zsuzsanna",
    description: "Flow jóga Budapesten és online. Csoportos jógaórák, Kreatív Tavaszi Flow online sorozat. Samadhi Jóga Stúdió, Budapest XIII. ker.",
    canonical: BASE_URL + "/orak",
  },
  kepzes: {
    title: "Jógaoktató képzés | Czvikli Zsuzsanna",
    description: "100 órás akkreditált Flow Jóga oktatói képzés és Fascia a jógában továbbképzés jógaoktatóknak. Budapest, Samadhi Jóga Stúdió.",
    canonical: BASE_URL + "/kepzes",
  },
  manual: {
    title: "Kezelések | Czvikli Zsuzsanna",
    description: "Fasciális arcterápia, fasciális jógaterápia és integrált manuális terápia. Budapest, XIII. ker., VI. ker., Csömör.",
    canonical: BASE_URL + "/manual",
  },
  rolam: {
    title: "Rólam | Czvikli Zsuzsanna jógaoktató",
    description: "Czvikli Zsuzsanna jógaoktató, 30 év tapasztalattal. Fasciális jógaterapeuta, integrál tanácsadó. Hatha, Flow, Ashtanga, Vinyasa.",
    canonical: BASE_URL + "/rolam",
  },
  tabor: {
    title: "Jóga elvonulás | Czvikli Zsuzsanna",
    description: "Jóga, önismeret és meditáció elvonulás. Többnapos tábor jógával, meditációval és önismereti programokkal.",
    canonical: BASE_URL + "/tabor",
  },
  video: {
    title: "Jóga videók | Czvikli Zsuzsanna",
    description: "130+ jóga videó magyarul. Hatha, Flow, Ashtanga, Vinyasa jóga videók. Korlátlan visszanézhetőség.",
    canonical: BASE_URL + "/video",
  },
  fasciaflow: {
    title: "Fascia Flow videók | Czvikli Zsuzsanna",
    description: "Otthoni fascia flow videó csomag. Kötőszöveti mozgás és lazítás otthonról, bármikor.",
    canonical: BASE_URL + "/fasciaflow",
  },
  ebook: {
    title: "108 inspiráció e-book | Czvikli Zsuzsanna",
    description: "108 inspiráció jógaórákhoz e-book. Jógaoktatók és gyakorlók számára.",
    canonical: BASE_URL + "/ebook",
  },
  bars: {
    title: "Access Bars kezelés | Czvikli Zsuzsanna",
    description: "Access Bars® kezelés Budapesten. Relaxáció és stresszoldás az idegrendszer szintjén.",
    canonical: BASE_URL + "/bars",
  },
};

const updateMeta = (page) => {
  const meta = PAGE_META[page || ""] || PAGE_META[""];
  document.title = meta.title;

  let desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", meta.description);

  let canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute("href", meta.canonical);

  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", meta.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", meta.description);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", meta.canonical);
};

const resetNavScroll = () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.remove("scrolled");
};

const showLanding = () => {
  document.documentElement.classList.remove('is-spa-page');
  if (landingSections) landingSections.classList.remove("hidden");
  container.innerHTML = "";
  document.body.classList.remove("spa-active");
  updateMeta("");
  window.scrollTo(0, 0);
  resetNavScroll();
};

const showSPA = (page) => {
  document.documentElement.classList.add('is-spa-page');
  if (landingSections) landingSections.classList.add("hidden");
  document.body.classList.add("spa-active");

  const renderFn = Handlebars.templates[page + ".hbs"];

  if (!renderFn) {
    console.log("page not found", page);
    navigateTo("/");
    return;
  }

  const items = page === "fasciaflow" ? jmn.fasciaFlowList : jmn.videoList;

  container.innerHTML = renderFn({
    flags: { mode_youtube_auth: true },
    items: items,
    images: jmn.tabor,
  });

  updateMeta(page);
  window.scrollTo(0, 0);
  resetNavScroll();

  if (pageScripts[page]) {
    pageScripts[page](items);
  }
};

const getPageFromPath = () => {
  const path = location.pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!path || path === "index.html") return null;
  return path;
};

const route = () => {
  const page = getPageFromPath();
  if (!page) {
    showLanding();
  } else if (VALID_PAGES.indexOf(page) !== -1) {
    showSPA(page);
  } else {
    showLanding();
  }
};

const navigateTo = (path) => {
  history.pushState(null, "", path);
  route();
};

const start = () => {
  container = document.getElementById("pageContent");
  landingSections = document.getElementById("landingSections");

  // Handle GitHub Pages 404 SPA redirect
  const redirect = sessionStorage.getItem('spa-redirect');
  if (redirect) {
    sessionStorage.removeItem('spa-redirect');
    history.replaceState(null, "", redirect);
  }

  // Intercept all internal link clicks
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // External links, mailto, tel — let them through
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    // Anchor links (scroll within page) — #a-kapcsolat, #landing-about, etc.
    if (href.startsWith("#a-")) return;

    // Internal SPA route: /orak, /video, etc.
    if (href.startsWith("/") && href.length > 1) {
      const page = href.substring(1);
      if (VALID_PAGES.indexOf(page) !== -1) {
        e.preventDefault();
        navigateTo(href);
        return;
      }
    }

    // Root link
    if (href === "/") {
      e.preventDefault();
      navigateTo("/");
      return;
    }
  });

  // Handle browser back/forward
  window.addEventListener("popstate", route);

  // Initial route
  route();
};

document.addEventListener("DOMContentLoaded", start);

