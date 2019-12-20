const path = require("path");


module.exports = function(app){

// * The following HTML routes should be created:
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
}