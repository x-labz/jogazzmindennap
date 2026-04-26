let container;
let landingSections;
const { jmn } = window;
const JMN_SEO = window.JMN_SEO || {
  getPageMeta: function () {
    return {
      title: document.title,
      description: "",
      canonical: location.href,
      image: "",
    };
  },
  getStructuredData: function () {
    return null;
  },
};

const pageScripts = {
  video: jmn.Y.render,
  fasciaflow: jmn.Y.render,
};

const VALID_PAGES = [
  "aktualis","rolam","orak","video","fasciaflow",
  "manual","kepzes","tabor","bars","jelentkezes",
  "jem","credits","privacy","ebook"
];
const updateMeta = (page, context = {}) => {
  const meta = JMN_SEO.getPageMeta(page);
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

  let ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", meta.image);

  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", meta.title);

  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute("content", meta.description);

  let twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute("content", meta.image);

  const structuredData = JMN_SEO.getStructuredData(page, context);
  let schemaTag = document.getElementById("structured-data");

  if (!schemaTag && structuredData) {
    schemaTag = document.createElement("script");
    schemaTag.type = "application/ld+json";
    schemaTag.id = "structured-data";
    document.head.appendChild(schemaTag);
  }

  if (schemaTag && structuredData) {
    schemaTag.textContent = JSON.stringify(structuredData);
  }
};

const resetNavScroll = () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.remove("scrolled");
};

const showLanding = () => {
  if (!landingSections || landingSections.childElementCount === 0) {
    window.location.href = "/";
    return;
  }

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

  updateMeta(page, {
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
