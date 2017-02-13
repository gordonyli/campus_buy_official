/**
 * Created by adv on 2/12/17.
 */
var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var PRODUCTS_COLLECTION = "products";
var ObjectID = mongodb.ObjectID;

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Products Collection connection ready");
});


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

//products
router.get("/products",  function(req, res) {
    db.collection(PRODUCTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get products.");
        } else {
            res.status(200).json(docs);
        }
    });
});

module.exports = router;