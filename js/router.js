const STARTPAGE = "aktualis";

let container;
const { jmn } = window;

const pageScripts = {
  video: jmn.Y.render,
  fasciaflow: jmn.Y.render,
};

const processHashChange = () => {
  // console.log(location.hash);

  const page = location.hash.substring(1);

  const isLink = page.substring(0, 2) !== "a-";
  if (!isLink) return;

  const renderFn = Handlebars.templates[page + ".hbs"];

  if (!renderFn) {
    console.log("page not found", page);
    location.href = "/";
    return;
  }

  // Use fasciaFlowList for fasciaflow page, otherwise use videoList
  const items = page === 'fasciaflow' ? jmn.fasciaFlowList : jmn.videoList;

  container.innerHTML = renderFn({
    flags: { mode_youtube_auth: true },
    items: items,
    images: jmn.tabor,
  });

  window.scrollTo(0, 0);

  if (pageScripts[page]) {
    pageScripts[page](items);
  }
};

const start = () => {
  container = document.getElementById("pageContent");

  window.addEventListener("hashchange", processHashChange);

  const { origin, pathname, hash } = location;

  location.assign(origin + pathname + (hash || "#" + STARTPAGE));
  processHashChange();
};

document.addEventListener("DOMContentLoaded", start);
