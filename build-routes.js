const fs = require('fs');
const path = require('path');
const vm = require('vm');

const seo = require('./js/seo-data.js');

const sitemapPath = path.join(__dirname, 'sitemap.xml');
const indexPath = path.join(__dirname, 'index.html');
const videolistPath = path.join(__dirname, 'js', 'videolist.js');
const handlebarsRuntimePath = path.join(__dirname, 'js', 'handlebars.runtime.min-v4.7.7.js');
const templatesPath = path.join(__dirname, 'js', 'templates.js');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const landingMarker = '  <div id="landingSections">';
const footerMarker = '  <footer id="a-kapcsolat" class="premium-footer">';

function loadSiteData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(videolistPath, 'utf8'), sandbox);
  return sandbox.window.jmn;
}

function loadTemplates() {
  const sandbox = {
    window: {},
    console: console,
  };

  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(handlebarsRuntimePath, 'utf8'), sandbox);
  sandbox.Handlebars = sandbox.window.Handlebars || sandbox.Handlebars;
  vm.runInContext(fs.readFileSync(templatesPath, 'utf8'), sandbox);

  return sandbox.Handlebars.templates;
}

const siteData = loadSiteData();
const templates = loadTemplates();

function getTemplateContext(page) {
  return {
    flags: { mode_youtube_auth: true },
    items: page === 'fasciaflow' ? siteData.fasciaFlowList : page === 'video' ? siteData.videoList : [],
    images: siteData.tabor,
  };
}

function renderRouteContent(page) {
  const template = templates[`${page}.hbs`];

  if (!template) {
    throw new Error(`Missing compiled template for ${page}.hbs`);
  }

  return template(getTemplateContext(page));
}

function injectRouteBody(html, routeHtml) {
  const landingStart = html.indexOf(landingMarker);
  const footerStart = html.indexOf(footerMarker);

  if (landingStart === -1 || footerStart === -1) {
    throw new Error('Could not locate landing/page content markers in index.html');
  }

  return html.slice(0, landingStart)
    + '  <div id="landingSections" class="hidden" aria-hidden="true"></div>\n\n'
    + `  <div id="pageContent">${routeHtml}</div>\n\n`
    + html.slice(footerStart);
}

for (const page of seo.STATIC_ROUTES) {
  const meta = seo.getPageMeta(page);
  const templateContext = getTemplateContext(page);
  const routeHtml = renderRouteContent(page);
  const structuredData = seo.getStructuredData(page, templateContext);

  let html = indexHtml;

  html = html.replace('<html lang="hu">', '<html lang="hu" class="is-spa-page">');
  html = html.replace('<head>', '<head>\n  <base href="/" />');
  html = html.replace('<body>', '<body class="spa-active">');

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  );

  html = html.replace(
    /<meta name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${meta.description}" />`
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${meta.title}" />`
  );

  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${meta.description}" />`
  );

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${meta.canonical}" />`
  );

  html = html.replace(
    /<meta property="og:image" content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${meta.image}" />`
  );

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${meta.title}" />`
  );

  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${meta.image}" />`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${meta.canonical}" />`
  );

  html = html.replace(
    /<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="structured-data">\n${JSON.stringify(structuredData, null, 2)}\n  </script>`
  );

  html = injectRouteBody(html, routeHtml);

  const dir = path.join(__dirname, page);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`Generated ${page}/index.html`);
}

function formatDate(mtime) {
  return mtime.toISOString().split('T')[0];
}

function getLastmod(filePath) {
  try {
    return formatDate(fs.statSync(filePath).mtime);
  } catch (e) {
    return formatDate(new Date());
  }
}

function generateSitemap() {
  const today = formatDate(new Date());
  const entries = [];

  const homeMeta = seo.getPageMeta("");
  entries.push({
    loc: homeMeta.canonical,
    lastmod: getLastmod(indexPath),
    changefreq: homeMeta.changefreq,
    priority: homeMeta.priority,
  });

  for (const page of seo.STATIC_ROUTES) {
    const meta = seo.getPageMeta(page);
    const routeIndex = path.join(__dirname, page, 'index.html');
    entries.push({
      loc: meta.canonical,
      lastmod: getLastmod(routeIndex),
      changefreq: meta.changefreq,
      priority: meta.priority,
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const entry of entries) {
    xml.push('  <url>');
    xml.push(`    <loc>${entry.loc}</loc>`);
    xml.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    if (entry.changefreq) {
      xml.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    }
    if (entry.priority) {
      xml.push(`    <priority>${entry.priority}</priority>`);
    }
    xml.push('  </url>');
  }

  xml.push('</urlset>');
  xml.push('');

  fs.writeFileSync(sitemapPath, xml.join('\n'), 'utf8');
  console.log(`Generated sitemap.xml with ${entries.length} URLs (lastmod: ${today})`);
}

generateSitemap();

console.log('All route pages generated successfully!');
