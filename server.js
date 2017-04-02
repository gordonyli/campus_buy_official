var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var morgan = require('morgan');
//var router = express.Router();


var app = express();
app.use(express.static(__dirname + "/public")); //url looks into public folder
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));


//View Engine
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var index = require("./routes/index");
var contacts = require("./routes/contacts");
var products = require("./routes/products");
var cart = require("./routes/cart");
var users = require("./routes/users");

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.use("/", index);
app.use("/api", contacts);
app.use("/api", products);
app.use("/api", cart);
app.use("/api", users);