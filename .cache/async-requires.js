// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-flashcards-index-js": () => import("./../src/pages/flashcards/index.js" /* webpackChunkName: "component---src-pages-flashcards-index-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-translations-index-js": () => import("./../src/pages/translations/index.js" /* webpackChunkName: "component---src-pages-translations-index-js" */)
}

