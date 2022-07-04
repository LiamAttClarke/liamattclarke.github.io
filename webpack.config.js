const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const CopyPlugin = require("copy-webpack-plugin");

const SRC_PATH = path.join(__dirname, "./src")
// Using /docs path because GitHub Pages can only serve from / or /docs
const PUBLIC_PATH = path.resolve(__dirname, "docs");
const TEMPLATES_PATH = path.join(SRC_PATH, "templates");
const PARTIALS_PATH = path.join(TEMPLATES_PATH, "partials");

const SITE_CONTENT = require(path.join(SRC_PATH, "content.json"));

class MustachePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.processAssets.tapAsync({
        name: "mustache-webpack-plugin",
        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
      }, async (unusedAssets, callback) => {
        const partials = {};

        // Register partials
        fs.readdirSync(PARTIALS_PATH).forEach(srcFileName => {
          let partialNameMatch = srcFileName.match(/(.+)\_partial\.mustache$/);
          if (partialNameMatch) {
            partials[partialNameMatch[1]] = fs.readFileSync(path.join(PARTIALS_PATH, srcFileName), "utf8");
          }
        });

        // Compile templates
        fs.readdirSync(TEMPLATES_PATH).forEach(templateFileName => {
          if (templateFileName.endsWith(".mustache")) {
            const templateString = fs.readFileSync(path.join(TEMPLATES_PATH, templateFileName), "utf8");
            const compiledTemplate = mustache.render(templateString, SITE_CONTENT, partials);
            const fileName = templateFileName.replace(".mustache", ".html");
            fs.writeFileSync(path.join(PUBLIC_PATH, fileName), compiledTemplate);
          }
        });

        callback();
      });
    });
  }
}

module.exports = {
  entry: "./src/main.js",
  output: {
    path: PUBLIC_PATH,
    filename: "bundle.js",
    // This deletes the output of the hacky mustache plugin
    // clean: true
  },
  devServer: {
    static: {
      directory: PUBLIC_PATH
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "src", from: "styles/**/*", to: PUBLIC_PATH },
        { context: "src", from: "images/**/*", to: PUBLIC_PATH },
        { context: "src", from: "CNAME", to: PUBLIC_PATH }
      ]
    }),
    new MustachePlugin(),
  ],
};
