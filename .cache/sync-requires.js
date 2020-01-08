const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-flashcards-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/flashcards/index.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/index.js"))),
  "component---src-pages-translations-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/translations/index.js")))
}

