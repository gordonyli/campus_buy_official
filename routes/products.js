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


// PRODUCTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

//products get request
router.get("/products",  function(req, res) {
    db.collection(PRODUCTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get products.");
        } else {
            res.status(200).json(docs);
        }
    });
});

router.post("/new/products",  function(req, res) {
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

router.get("/product/:id",  function(req, res) {
    db.collection(PRODUCTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            
            res.status(200).json(doc);
        }
    });
});

router.delete("/products/:id",  function(req, res) {
    db.collection(PRODUCTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete product");
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;