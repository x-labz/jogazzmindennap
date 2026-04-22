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

const resetNavScroll = () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.remove("scrolled");
};

const showLanding = () => {
  document.documentElement.classList.remove('is-spa-page');
  if (landingSections) landingSections.classList.remove("hidden");
  container.innerHTML = "";
  document.body.classList.remove("spa-active");
  document.title = "Jógázz minden nap | Czvikli Zsuzsanna jógaoktató";
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
