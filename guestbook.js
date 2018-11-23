var express = require("express");
var app = express();

var fs = require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serving static files, css + images from the /views directory
app.use(express.static("views"));
app.set("view engine", "ejs");

// route to index.ejs page
app.get("/", function(req, res) {
  res.render("pages/index");
});

// serving json file
var data = require("./demojson.json");
var flag = require("./flagdata.json");

// route to guestbook.ejs
app.get("/guestbook", function(req, res) {
  res.render("pages/guestbook", { users: data, flags: flag });
});

// something gets posted on the /newmessage form
app.post("/newmessage", function(req, res) {
  // jos postaus on tyhjä niin älä turhaan tee työtä
  if (Object.keys(req.body).length === 0) {
  return res.status(400).send("Missing details");
  }
  // formatting the demojson.json into a variable
  var formuli = require("./demojson.json");

  // handling the json object, getting it's last id value and simply adding one to it to get a value for the next elements id
  for (var z = 0; z < formuli.length; z++){
    var nro = formuli.slice(-1)[0].id;
  }
    nro++;
    //console.log(nro);

  // pushing the posted form values. req.body comes from the bodyparser express plugin turned into variable on rows 6-7
  // json objekt variable.push and info, some come from the post, some are functions
  formuli.push ({
    "id": nro,
    "username": req.body.username,
    "country": req.body.country,
    "date": new Date(),
    "message": req.body.message
  });

  // turning the array into json format and making it into a new variable jsonStr
  var jsonStr = JSON.stringify(formuli);

  // writing the json formatted data into our json with error handling
  fs.writeFile("demojson.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Guestbook comment added~~");
  });
  // updates the list - need to include both json files
  res.render("pages/guestbook", { users: data, flags: flag });
});

var del = require("./demojson.json");
// delete route :^)
app.get("/delete", function(req, res) {
  res.render("pages/delete", { users: del });

});

app.post("/delete", function(req, res) {
  var removeUser = req.body.sel;
  // console.log(removeUser);
  var json = JSON.stringify(del);
  //console.log(json);
  //fs.writeFileSync("demojson.json", JSON.stringify(json, null, 4));

  res.render("pages/delete", { users: del });
});

app.listen(8081);
console.log(">localhost:8081");
