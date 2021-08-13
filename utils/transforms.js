const htmlminifier = require("html-minifier");

const shouldTransformHTML = (outputPath) =>
  outputPath &&
  outputPath.endsWith(".html") &&
  process.env.NODE_ENV === "production";

module.exports = {
  htmlmin: (content, outputPath) =>
    shouldTransformHTML(outputPath)
      ? htmlminifier.minify(content, {
          html5: true,
          removeComments: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        })
      : content
};
