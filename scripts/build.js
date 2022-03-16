const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const mustache = require("mustache");
const siteContent = require("../src/content.json");

const SRC_PATH = path.join(__dirname, "../src")
const TEMPLATES_PATH = path.join(SRC_PATH, "templates");
const PARTIALS_PATH = path.join(TEMPLATES_PATH, "partials");
// Using /docs path because GitHub Pages can only serve from / or /docs
const DEST_PATH = path.join(__dirname, "../docs");

const partials = {};

function build() {
  mkdirp.sync(DEST_PATH)

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
      const compiledTemplate = mustache.render(templateString, siteContent, partials);
      const fileName = templateFileName.replace(".mustache", ".html");
      fs.writeFileSync(path.join(DEST_PATH, fileName), compiledTemplate);
    }
  });
}

build();
