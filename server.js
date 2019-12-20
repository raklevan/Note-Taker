const express = require('express');
const path = require("path")

const app = express();

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//require routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app)

//   * GET `*` - Should return the `index.html` file
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

 //listener 
app.listen(PORT, ()=> {console.log("app listening on port:"+PORT)});

