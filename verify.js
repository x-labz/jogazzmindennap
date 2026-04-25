const fs = require('fs');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function countMatches(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function expect(condition, successMessage, errorMessage) {
  if (condition) {
    console.log(`OK: ${successMessage}`);
    return 0;
  }

  console.error(`ERROR: ${errorMessage}`);
  return 1;
}

function verifyShell(html, label) {
  let errors = 0;
  const headClose = html.indexOf('</head>');
  const bodyOpen = html.indexOf('<body');
  const bodyClose = html.indexOf('</body>');
  const htmlClose = html.indexOf('</html>');
  const htmlCloseTagLength = '</html>'.length;

  errors += expect(
    headClose !== -1 && bodyOpen !== -1 && bodyClose !== -1 && htmlClose !== -1 && headClose < bodyOpen && bodyOpen < bodyClose && bodyClose < htmlClose,
    `${label} document order is valid`,
    `${label} has invalid head/body/html ordering`
  );

  const bodyOnlySnippets = [
    '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TKF8Z2P"',
    '<script src="js/videolist.js"></script>',
    '<script src="js/video_yt_au.js"></script>',
    '<script src="js/handlebars.runtime.min-v4.7.7.js"></script>',
    '<script src="js/menu.js"></script>',
    '<script src="js/templates.js?t=1712604000009"></script>',
    '<script src="js/seo-data.js"></script>',
    '<script src="js/router.js"></script>',
  ];

  for (const snippet of bodyOnlySnippets) {
    const index = html.indexOf(snippet);
    errors += expect(
      index !== -1 && index > bodyOpen && index < bodyClose,
      `${label} keeps runtime markup inside body`,
      `${label} has runtime markup outside body: ${snippet}`
    );
  }

  const trailingContent = htmlClose === -1 ? 'missing </html>' : html.slice(htmlClose + htmlCloseTagLength).trim();
  errors += expect(
    htmlClose !== -1 && trailingContent === '',
    `${label} has no trailing content after </html>`,
    `${label} has content after </html>`
  );

  return errors;
}

function verifyDivBalance(html, label) {
  const openDivs = countMatches(html, /<div\b/g);
  const closeDivs = countMatches(html, /<\/div>/g);

  return expect(
    openDivs === closeDivs,
    `${label} has balanced div tags (${openDivs})`,
    `${label} has unbalanced div tags: open=${openDivs}, close=${closeDivs}`
  );
}

function verifyJsonLd(html, label, expectedType) {
  const match = html.match(/<script type="application\/ld\+json" id="structured-data">([\s\S]*?)<\/script>/);

  if (!match) {
    return expect(false, '', `${label} JSON-LD script tag is missing`);
  }

  try {
    const parsed = JSON.parse(match[1]);
    return expect(
      parsed['@type'] === expectedType,
      `${label} JSON-LD is valid`,
      `${label} JSON-LD has wrong schema type: ${parsed['@type']}`
    );
  } catch (error) {
    return expect(false, '', `${label} JSON-LD validation failed: ${error.message}`);
  }
}

function verify() {
  let errors = 0;
  const indexHtml = read('index.html');
  const aktualisTemplate = read('views/aktualis.hbs');
  const aktualisHtml = read('aktualis/index.html');
  const orakHtml = read('orak/index.html');

  errors += expect(
    indexHtml.includes('<div id="landingSections">'),
    'Homepage structure is intact',
    'Homepage is missing landingSections'
  );
  errors += verifyShell(indexHtml, 'index.html');

  errors += verifyDivBalance(aktualisTemplate, 'views/aktualis.hbs');

  errors += expect(
    aktualisHtml.includes('<div id="landingSections" class="hidden" aria-hidden="true"></div>'),
    '/aktualis/ hides landingSections correctly',
    '/aktualis/ did not hide landingSections properly'
  );
  errors += expect(
    aktualisHtml.includes('<h1 class="light center-text">Aktuális események</h1>'),
    '/aktualis/ prerendered content is present',
    '/aktualis/ is missing the prerendered H1 content'
  );
  errors += verifyDivBalance(aktualisHtml, 'aktualis/index.html');
  errors += verifyShell(aktualisHtml, 'aktualis/index.html');

  errors += expect(
    orakHtml.includes('<div id="landingSections" class="hidden" aria-hidden="true"></div>'),
    '/orak/ hides landingSections correctly',
    '/orak/ did not hide landingSections properly'
  );
  errors += expect(
    orakHtml.includes('<h1 class="light">Jógaórák</h1>'),
    '/orak/ prerendered content is present',
    '/orak/ is missing the prerendered H1 content'
  );
  errors += verifyShell(orakHtml, 'orak/index.html');
  errors += verifyJsonLd(orakHtml, 'orak/index.html', 'Service');

  if (errors === 0) {
    console.log('\nALL CHECKS PASSED');
  } else {
    console.log(`\nFOUND ${errors} ERROR(S)`);
    process.exitCode = 1;
  }
}

verify();
