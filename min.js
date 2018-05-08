var fs = require("fs");
var espree = require("espree");

var CompareMagic = function () {};

var folderName = "testfiles";
var resultsArray = [];

var files = [
  "angular-1.6.5.js",
  "bootstrap-3.3.7.js",
  "bootstrap-datepicker-1.8.0.js",
  "chart-2.7.2.js",
  "d3-4.13.0.js",
  "inferno-5.0.4.js",
  "jquery-3.3.1.js",
  "jquery-3.3.1.slim.js",
  "jquery-ui-1.12.1.js",
  "loadash-4.17.10.js",
  "moment-2.22.1.js",
  "mootools-1.6.0.js",
  "react-16.3.2.js",
  "select2-4.0.5.js",
  "vue-2.5.16.js",
  "sonarwhal.com-nav.js",
  "sonarwhal.com-scanner-common.js",
  "sonarwhal.com-scanner-submit.js"

];

CompareMagic.prototype.compareFiles = function (folder) {
  resultsArray = [];
  files.forEach(file => {
    parseFileContent(file, folder);
  });
  return resultsArray;
};

function parseFileContent(fileName, folder) {
  const fileContent = fs.readFileSync(folder + "/" + fileName);
  const improvementIndex = getImprovementIndex(fileName, fileContent);

  const minifiedFileName = fileName.replace(".js", "-min.js");
  const minifiedFileContent = fs.readFileSync(folder + "/" + minifiedFileName);
  const minifiedImprovementIndex = getImprovementIndex(
    minifiedFileName,
    minifiedFileContent
  );

  resultsArray.push({
    file: fileName,
    unminified: improvementIndex,
    minified: minifiedImprovementIndex
  });
}

function getImprovementIndex(fileName, code) {
  const ast = espree.parse(code, {
    tokens: true
  });
  const contentLength = code.length;
  const tokenLength = ast.tokens.length;

  const p = tokenLength / contentLength;

  const improvementIndex = Math.round((1 - p) * 100);
  return improvementIndex;
}
exports.CompareMagic = new CompareMagic();