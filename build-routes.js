const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.jogazzmindennap.hu';

const routes = [
  {
    path: 'orak',
    title: 'Jógaórák | Czvikli Zsuzsanna',
    description: 'Flow jóga Budapesten és online. Csoportos jógaórák, Kreatív Tavaszi Flow online sorozat. Samadhi Jóga Stúdió, Budapest XIII. ker.',
  },
  {
    path: 'kepzes',
    title: 'Jógaoktató képzés | Czvikli Zsuzsanna',
    description: '100 órás akkreditált Flow Jóga oktatói képzés és Fascia a jógában továbbképzés jógaoktatóknak. Budapest, Samadhi Jóga Stúdió.',
  },
  {
    path: 'manual',
    title: 'Kezelések | Czvikli Zsuzsanna',
    description: 'Fasciális arcterápia, fasciális jógaterápia és integrált manuális terápia. Budapest, XIII. ker., VI. ker., Csömör.',
  },
  {
    path: 'rolam',
    title: 'Rólam | Czvikli Zsuzsanna jógaoktató',
    description: 'Czvikli Zsuzsanna jógaoktató, 30 év tapasztalattal. Fasciális jógaterapeuta, integrál tanácsadó. Hatha, Flow, Ashtanga, Vinyasa.',
  },
  {
    path: 'tabor',
    title: 'Jóga elvonulás | Czvikli Zsuzsanna',
    description: 'Jóga, önismeret és meditáció elvonulás. Többnapos tábor jógával, meditációval és önismereti programokkal.',
  },
  {
    path: 'video',
    title: 'Jóga videók | Czvikli Zsuzsanna',
    description: '130+ jóga videó magyarul. Hatha, Flow, Ashtanga, Vinyasa jóga videók. Korlátlan visszanézhetőség.',
  },
  {
    path: 'fasciaflow',
    title: 'Fascia Flow videók | Czvikli Zsuzsanna',
    description: 'Otthoni fascia flow videó csomag. Kötőszöveti mozgás és lazítás otthonról, bármikor.',
  },
  {
    path: 'ebook',
    title: '108 inspiráció e-book | Czvikli Zsuzsanna',
    description: '108 inspiráció jógaórákhoz e-book. Jógaoktatók és gyakorlók számára.',
  },
  {
    path: 'bars',
    title: 'Access Bars kezelés | Czvikli Zsuzsanna',
    description: 'Access Bars® kezelés Budapesten. Relaxáció és stresszoldás az idegrendszer szintjén.',
  },
  {
    path: 'aktualis',
    title: 'Aktuális események | Czvikli Zsuzsanna',
    description: 'Aktuális jóga események, online sorozatok, képzések és elvonulások Czvikli Zsuzsannával.',
  },
];

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of routes) {
  let html = indexHtml;

  // <base href="/"> fixes all relative asset paths when served from a subdirectory
  html = html.replace('<head>', '<head>\n  <base href="/" />');

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  html = html.replace(
    /<meta name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${route.description}" />`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${BASE_URL}/${route.path}" />`
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${route.title}" />`
  );

  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${route.description}" />`
  );

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${BASE_URL}/${route.path}" />`
  );

  const dir = path.join(__dirname, route.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`Generated ${route.path}/index.html`);
}

console.log('All route pages generated successfully!');
