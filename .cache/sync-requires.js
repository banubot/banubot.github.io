const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-flashcards-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/flashcards/index.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/index.js"))),
  "component---src-pages-learn-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/learn/index.js"))),
  "component---src-pages-learn-java-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/learn/java.js"))),
  "component---src-pages-learn-python-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/learn/python.js"))),
  "component---src-pages-learn-springboot-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/learn/springboot.js"))),
  "component---src-pages-learn-sql-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/learn/sql.js"))),
  "component---src-pages-learn-web-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/learn/web.js"))),
  "component---src-pages-translations-index-js": hot(preferDefault(require("/home/hanny/banubot.github.io/src/pages/translations/index.js")))
}

