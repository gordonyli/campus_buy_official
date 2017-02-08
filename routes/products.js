/**
 * Created by gordonli on 1/31/17.
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
    console.log("Database connection ready");
});


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */


router.post("/Sell/Products",  function(req, res) {
    var newProduct = req.body;
    newProduct.createDate = new Date();


    db.collection(PRODUCTS_COLLECTION).insertOne(newProduct, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new product.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

module.exports = router;
