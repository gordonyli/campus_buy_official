/**
 * Created by Ik Tae Kim on 3/11/17.
 */
var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var CART_COLLECTION = "cart";
var ObjectID = mongodb.ObjectID;

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Cart Collection connection ready");
});


// CART API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

//cart get request
router.get("/cart",  function(req, res) {
    db.collection(CART_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get cart.");
        } else {
            console.log("cart");
            res.status(200).json(docs);
        }
    });
});

router.post("/new/cart",  function(req, res) {
    var newCart = req.body;
    newCart.createDate = new Date();
    db.collection(CART_COLLECTION).insertOne(newCart, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to add product to cart.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

router.get("/cart/:id",  function(req, res) {
    db.collection(CART_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get product from the cart");
        } else {
            console.log(req.params.id);
            res.status(200).json(doc);
        }
    });
});

router.delete("/cart/:id",  function(req, res) {
    db.collection(CART_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete product in the cart");
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;