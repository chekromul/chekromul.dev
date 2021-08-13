const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ErrorOverlayPlugin = require('eleventy-plugin-error-overlay');

const filters = require('./utils/filters.js')
const shortcodes = require('./utils/shortcodes');
const transforms = require('./utils/transforms');

module.exports = (config) => {
  const manifestPath = path.resolve(__dirname, '_site/assets/manifest.json');

  // Allow eleventy to understand yaml files
  config.addDataExtension('yml', (contents) => yaml.load(contents));

  // Shows error name, message, and fancy stacktrace
  config.addPlugin(ErrorOverlayPlugin);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  // Transforms
  Object.keys(transforms).forEach((key) => {
    config.addTransform(key, transforms[key]);
  });

  // Shortcodes
  config.addNunjucksAsyncShortcode('webpack', shortcodes.webpack);

  // Pass-through files
  config.addPassthroughCopy('src/_headers');
  config.addPassthroughCopy('src/favicon.png');
  config.addPassthroughCopy('src/site.webmanifest');
  config.addPassthroughCopy('src/assets/fonts');
  config.addPassthroughCopy('src/assets/images');

  // BrowserSync Overrides
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    // Reload when manifest file changes
    files: [manifestPath],
    // Show 404 page on invalid urls
    callbacks: {
      ready: (err, browserSync) => {
        browserSync.addMiddleware('*', (req, res) => {
          const fourOFour = fs.readFileSync('_site/404.html');
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(fourOFour);
          res.end();
        });
      }
    },
    // Speed/clean up build time
    ui: false,
    ghostMode: false
  });

  return {
    dir: { input: 'src', output: '_site', includes: 'includes', data: 'data' },
    // Allow nunjucks, markdown and 11ty files to be processed
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    // Allow pre-processing `.md` files with nunjucks
    // thus transforming the shortcodes
    markdownTemplateEngine: 'njk',
  };
};
