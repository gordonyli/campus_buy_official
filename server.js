var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;


var app = express();
app.use(express.static(__dirname + "/public")); //url looks into public folder
app.use(bodyParser.json());

//View Engine
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var index = require("./routes/index");
var contacts = require("./routes/contacts");
var products = require("./routes/products");

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.use("/", index);
app.use("/api", contacts);
app.use("/api", products);
