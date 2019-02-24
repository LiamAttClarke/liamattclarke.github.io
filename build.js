const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const SRC_PATH = path.join(__dirname, 'src');
const DEST_PATH = path.join(__dirname, 'public');

const siteContent = require('./src/content.json');
const templateFiles = [];
const partials = {};

// Register partials
fs.readdirSync(SRC_PATH).forEach(srcFileName => {
  if (srcFileName.match(/\_partial\.mustache$/)) {
    partials[srcFileName.match(/(.+)\_partial\.mustache$/)[1]] = fs.readFileSync(path.join(SRC_PATH, srcFileName), 'utf8');
  } else if (path.extname(srcFileName) === '.mustache') {
    templateFiles.push(srcFileName);
  }
});

// Compile templates
templateFiles.forEach(templateFileName => {
  const templateString = fs.readFileSync(path.join(SRC_PATH, templateFileName), 'utf8');
  const compiledTemplate = mustache.render(templateString, siteContent, partials);
  const fileName = templateFileName.replace('.mustache', '.html');
  fs.writeFileSync(path.join(DEST_PATH, fileName), compiledTemplate);
})