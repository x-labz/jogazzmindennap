const STARTPAGE = "aktualis";

let container;
const { jmn } = window;

const pageScripts = {
  video: jmn.Y.render,
};

const processHashChange = () => {
  // console.log(location.hash);

  const page = location.hash.substring(1);

  const isLink = page.substring(0, 2) !== "a-";
  if (!isLink) return;

  const renderFn = Handlebars.templates[page + ".hbs"];

  if (!renderFn) {
    location.href = `https://${location.hostname}`;
  }

  container.innerHTML = renderFn({
    flags: { mode_youtube_auth: true },
    items: jmn.videoList,
    images: jmn.tabor,
  });

  window.scrollTo(0, 0);

  if (pageScripts[page]) {
    pageScripts[page]();
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
