(function (root, factory) {
  const seo = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = seo;
  }

  root.JMN_SEO = seo;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const BASE_URL = "https://www.jogazzmindennap.hu";
  const SITE_NAME = "Jógázz minden nap";
  const PERSON_NAME = "Czvikli Zsuzsanna";
  const EMAIL = "czviklizsuzsanna@gmail.com";
  const DEFAULT_IMAGE = BASE_URL + "/img/hero_zs.webp";
  const SOCIAL_LINKS = [
    "https://www.facebook.com/czvikliizs",
    "https://www.instagram.com/czviklizs.yoga/"
  ];

  const PAGE_META = {
    "": {
      title: "Jógázz minden nap | Czvikli Zsuzsanna jógaoktató",
      description: "Jóga Budapesten és online - Czvikli Zsuzsanna, 30 év tapasztalat. Hatha, Flow, Ashtanga, Vinyasa. Fasciális jógaterápia, arcterápia. Samadhi Jóga Stúdió.",
      canonical: BASE_URL + "/",
      image: DEFAULT_IMAGE,
      priority: "1.0",
      changefreq: "weekly",
    },
    aktualis: {
      title: "Aktuális események | Czvikli Zsuzsanna",
      description: "Aktuális jóga események, online sorozatok, képzések és elvonulások Czvikli Zsuzsannával.",
      canonical: BASE_URL + "/aktualis",
      image: BASE_URL + "/img/kreativ26.webp",
      priority: "0.9",
      changefreq: "weekly",
    },
    orak: {
      title: "Jógaórák | Czvikli Zsuzsanna",
      description: "Flow jóga Budapesten és online. Csoportos jógaórák, Kreatív Tavaszi Flow online sorozat. Samadhi Jóga Stúdió, Budapest XIII. ker.",
      canonical: BASE_URL + "/orak",
      image: BASE_URL + "/img/mas_p_600x400.jpg",
      priority: "0.9",
      changefreq: "weekly",
    },
    kepzes: {
      title: "Jógaoktató képzés | Czvikli Zsuzsanna",
      description: "100 órás akkreditált Flow Jóga oktatói képzés és Fascia a jógában továbbképzés jógaoktatóknak. Budapest, Samadhi Jóga Stúdió.",
      canonical: BASE_URL + "/kepzes",
      image: BASE_URL + "/img/kepzes_2026.webp",
      priority: "0.8",
      changefreq: "monthly",
    },
    manual: {
      title: "Kezelések | Czvikli Zsuzsanna",
      description: "Fasciális arcterápia, fasciális jógaterápia és integrált manuális terápia. Budapest, XIII. ker., VI. ker., Csömör.",
      canonical: BASE_URL + "/manual",
      image: BASE_URL + "/img/manual11.webp",
      priority: "0.8",
      changefreq: "monthly",
    },
    rolam: {
      title: "Rólam | Czvikli Zsuzsanna jógaoktató",
      description: "Czvikli Zsuzsanna jógaoktató, 30 év tapasztalattal. Fasciális jógaterapeuta, integrál tanácsadó. Hatha, Flow, Ashtanga, Vinyasa.",
      canonical: BASE_URL + "/rolam",
      image: BASE_URL + "/img/czs_rolam.jpg",
      priority: "0.8",
      changefreq: "monthly",
    },
    tabor: {
      title: "Jóga elvonulás | Czvikli Zsuzsanna",
      description: "Jóga, önismeret és meditáció elvonulás. Többnapos tábor jógával, meditációval és önismereti programokkal.",
      canonical: BASE_URL + "/tabor",
      image: BASE_URL + "/img/tabor_foto_2026.png",
      priority: "0.7",
      changefreq: "monthly",
    },
    video: {
      title: "Jóga videók | Czvikli Zsuzsanna",
      description: "130+ jóga videó magyarul. Hatha, Flow, Ashtanga, Vinyasa jóga videók. Korlátlan visszanézhetőség.",
      canonical: BASE_URL + "/video",
      image: BASE_URL + "/img/flowborito_s.jpg",
      priority: "0.8",
      changefreq: "weekly",
    },
    fasciaflow: {
      title: "Fascia Flow videók | Czvikli Zsuzsanna",
      description: "Otthoni fascia flow videó csomag. Kötőszöveti mozgás és lazítás otthonról, bármikor.",
      canonical: BASE_URL + "/fasciaflow",
      image: BASE_URL + "/img/fascia-tricon.webp",
      priority: "0.7",
      changefreq: "monthly",
    },
    ebook: {
      title: "108 inspiráció e-book | Czvikli Zsuzsanna",
      description: "108 inspiráció jógaórákhoz e-book. Jógaoktatók és gyakorlók számára.",
      canonical: BASE_URL + "/ebook",
      image: BASE_URL + "/img/108-37.png",
      priority: "0.6",
      changefreq: "monthly",
    },
    bars: {
      title: "Access Bars kezelés | Czvikli Zsuzsanna",
      description: "Access Bars® kezelés Budapesten. Relaxáció és stresszoldás az idegrendszer szintjén.",
      canonical: BASE_URL + "/bars",
      image: DEFAULT_IMAGE,
      priority: "0.6",
      changefreq: "monthly",
    },
    privacy: {
      title: "Adatvédelem | Czvikli Zsuzsanna",
      description: "Adatvédelmi irányelvek és tájékoztató.",
      canonical: BASE_URL + "/privacy",
      image: DEFAULT_IMAGE,
      priority: "0.1",
      changefreq: "yearly",
    },
    jem: {
      title: "JEM | Czvikli Zsuzsanna",
      description: "Jógázz minden nap - JEM",
      canonical: BASE_URL + "/jem",
      image: DEFAULT_IMAGE,
      priority: "0.1",
      changefreq: "yearly",
    },
    jelentkezes: {
      title: "Jelentkezés | Czvikli Zsuzsanna",
      description: "Jelentkezés eseményekre és programokra.",
      canonical: BASE_URL + "/jelentkezes",
      image: DEFAULT_IMAGE,
      priority: "0.4",
      changefreq: "monthly",
    },
    credits: {
      title: "Credits | Czvikli Zsuzsanna",
      description: "Oldal készítői és hivatkozások.",
      canonical: BASE_URL + "/credits",
      image: DEFAULT_IMAGE,
      priority: "0.1",
      changefreq: "yearly",
    },
  };

  const STATIC_ROUTES = Object.keys(PAGE_META).filter(Boolean);

  function getPageMeta(page) {
    return PAGE_META[page || ""] || PAGE_META[""];
  }

  function getPersonSchema() {
    return {
      "@type": "Person",
      name: PERSON_NAME,
      jobTitle: "Jógaoktató",
      url: PAGE_META.rolam.canonical,
      image: PAGE_META.rolam.image,
      email: "mailto:" + EMAIL,
      sameAs: SOCIAL_LINKS,
    };
  }

  function getSamadhiPlace() {
    return {
      "@type": "Place",
      name: "Samadhi Jógastúdió",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dráva utca 17.",
        addressLocality: "Budapest",
        postalCode: "1133",
        addressCountry: "HU",
      },
    };
  }

  function getVideoListSchema(page, items) {
    const meta = getPageMeta(page);
    const limit = page === "video" ? 12 : items.length;

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: meta.title,
      url: meta.canonical,
      image: meta.image,
      description: meta.description,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.slice(0, limit).map(function (item, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "VideoObject",
              name: item.title,
              description: "Magyar nyelvű jóga videó Czvikli Zsuzsannával.",
              inLanguage: "hu",
              uploadDate: "2020-03-16T08:00:00+01:00",
              url: "https://www.youtube.com/watch?v=" + item.youtube,
              embedUrl: "https://www.youtube.com/embed/" + item.youtube,
              thumbnailUrl: BASE_URL + "/thumbs/jv" + item.id + "tn." + (item.ext || "jpg"),
            },
          };
        }),
      },
    };
  }

  function getStructuredData(page, context) {
    const meta = getPageMeta(page);
    const person = getPersonSchema();
    const data = context || {};

    switch (page || "") {
      case "":
        return {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": BASE_URL + "/#service",
          name: SITE_NAME + " - " + PERSON_NAME,
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          email: "mailto:" + EMAIL,
          areaServed: ["Budapest", "Online"],
          availableLanguage: "hu",
          sameAs: SOCIAL_LINKS,
          founder: person,
          serviceType: [
            "Jógaórák",
            "Online jóga",
            "Fasciális jógaterápia",
            "Fasciális arcterápia"
          ],
        };

      case "rolam":
        return {
          "@context": "https://schema.org",
          ...person,
          description: meta.description,
        };

      case "orak":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Jógaórák Czvikli Zsuzsannával",
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          provider: person,
          availableLanguage: "hu",
          areaServed: ["Budapest", "Online"],
          serviceType: ["Flow jóga", "Online jóga"],
          availableChannel: [
            {
              "@type": "ServiceChannel",
              serviceUrl: "https://www.samadhijoga.hu",
              serviceLocation: getSamadhiPlace(),
            },
          ],
        };

      case "manual":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Fasciális arcterápia és manuális kezelések",
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          provider: person,
          availableLanguage: "hu",
          areaServed: ["Budapest", "Csömör"],
          serviceType: [
            "Fasciális arcterápia",
            "Fasciális jógaterápia",
            "Integrált manuális terápia"
          ],
        };

      case "bars":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Access Bars® kezelés",
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          provider: person,
          availableLanguage: "hu",
          areaServed: ["Budapest"],
          serviceType: ["Access Bars® kezelés"],
        };

      case "kepzes":
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Flow Jóga oktatói továbbképzés",
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          provider: {
            "@type": "Organization",
            name: "Samadhi Jógastúdió",
            url: "https://www.samadhijoga.hu",
          },
          instructor: [person],
          offers: {
            "@type": "Offer",
            price: "240000",
            priceCurrency: "HUF",
            url: meta.canonical,
          },
        };

      case "aktualis":
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: meta.title,
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                url: PAGE_META.orak.canonical,
                name: "Kreatív Tavaszi Flow - 5 alkalmas online jóga sorozat",
              },
              {
                "@type": "ListItem",
                position: 2,
                url: PAGE_META.kepzes.canonical,
                name: "Fascia a jógában akkreditált oktatói továbbképzés",
              },
              {
                "@type": "ListItem",
                position: 3,
                url: PAGE_META.tabor.canonical,
                name: "Jóga, önismeret és meditáció elvonulás",
              },
            ],
          },
        };

      case "tabor":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: meta.title,
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          about: {
            "@type": "Thing",
            name: "Jóga, önismeret és meditáció elvonulás",
          },
        };

      case "video":
      case "fasciaflow":
        return getVideoListSchema(page, data.items || []);

      case "ebook":
        return {
          "@context": "https://schema.org",
          "@type": "Book",
          name: "108 inspiráció jógaórákhoz e-book",
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
          inLanguage: "hu",
          author: person,
          offers: {
            "@type": "Offer",
            price: "5000",
            priceCurrency: "HUF",
            availability: "https://schema.org/InStock",
            url: meta.canonical,
          },
        };

      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: meta.title,
          url: meta.canonical,
          image: meta.image,
          description: meta.description,
        };
    }
  }

  return {
    BASE_URL: BASE_URL,
    PAGE_META: PAGE_META,
    STATIC_ROUTES: STATIC_ROUTES,
    getPageMeta: getPageMeta,
    getStructuredData: getStructuredData,
  };
});
