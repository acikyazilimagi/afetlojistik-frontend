module.exports = {
  createOldCatalogs: false,
  indentation: 2,
  keepRemoved: false,
  lexers: {
    js: ['JsxLexer'],
    ts: ['JsxLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer']
  },
  locales: ['en', 'tr'],
  output: 'public/locales/$LOCALE/common.json',
  input: ['src/components/**/*.{js,jsx,ts,tsx}', 'src/pages/**/*.{js,jsx,ts,tsx}', 'src/constants/**/*.{js,jsx,ts,tsx}'],
  sort: function (a, b) {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  },
  verbose: true
}
