const express = require("express");
const app = express();
const min = require("./min.js").CompareMagic;

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});
app.post("/", function(req, res) {
  var results = min.compareFiles("testfiles");
  res.send(results);
});

app.listen(3000, function() {
  console.log("Improvement Index comparison app listening on port 3000!");
});
