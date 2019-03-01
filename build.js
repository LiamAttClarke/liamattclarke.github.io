const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const TEMPLATES_PATH = path.join(__dirname, 'templates');
const PARTIALS_PATH = path.join(TEMPLATES_PATH, 'partials');
const DEST_PATH = __dirname;

const siteContent = require('./content.json');
const partials = {};

// Register partials
fs.readdirSync(PARTIALS_PATH).forEach(srcFileName => {
  let partialNameMatch = srcFileName.match(/(.+)\_partial\.mustache$/);
  if (partialNameMatch) {
    partials[partialNameMatch[1]] = fs.readFileSync(path.join(PARTIALS_PATH, srcFileName), 'utf8');
  }
});

// Compile templates
fs.readdirSync(TEMPLATES_PATH).forEach(templateFileName => {
  if (templateFileName.endsWith('.mustache')) {
    const templateString = fs.readFileSync(path.join(TEMPLATES_PATH, templateFileName), 'utf8');
    const compiledTemplate = mustache.render(templateString, siteContent, partials);
    const fileName = templateFileName.replace('.mustache', '.html');
    fs.writeFileSync(path.join(DEST_PATH, fileName), compiledTemplate);
  }
})