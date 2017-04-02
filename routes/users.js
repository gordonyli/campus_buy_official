//var User = require('../public/models/userSchema');
var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var USERS_COLLECTION = "users";
var ObjectID = mongodb.ObjectID;
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';


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
    console.log("Users Collection Connection Ready");
});

//user registeration route
router.post("/users", function(req, res) {
    var user = req.body;
    // user.firstName = req.body.firstName;
    // user.lastName = req.body.lastName;
    // user.email = req.body.email;
    // user.phone = req.body.phone;
    // user.password = req.body.password;
    if (req.body.firstName == null || req.body.firstName == '' || req.body.lastName == null || req.body.lastName == '' || 
        req.body.email == null || req.body.email == '' || req.body.phone == null || req.body.phone == '' || 
        req.body.password == null || req.body.password == '') {
        res.send(null);
    } else {
        // user.save(function(err) {
        //     if (err) {
        //         res.send('Email already exists!');
        //     } else {
        //         res.send('User created!');
        //     }
        // });
        db.collection(USERS_COLLECTION).insertOne(user, function(err, doc) {
            //db.collection(USERS_COLLECTION).update(email, req.body.email, {upsert: true}, function(err, doc) {
            // if (err) {
            //     handleError(res, err.message, "Failed to create new user.");
            //     //res.send('Email already exists!');
            // } else {
            //     res.status(201).json(doc.ops[0]);
            //     console.log(doc);
            //     //res.send('User Created!');
            // }

            res.status(201).json(doc.ops[0]);
        });
    }
});

// // user login route
// router.post('/authenticate', function(req, res) {
//     db.collection(USERS_COLLECTION).findOne({ email: req.body.email }).select('firstName lastName email phone password').exec(function(err, user) {
//         if(err) throw err;

//         if(!user) {
//             handleError(res, err.message, "Failed to authenticate user.");
//         } else if (user) {

//         }
//     });
// });
router.post('/authenticate', function(req, res) {
    db.collection(USERS_COLLECTION).findOne({ email: req.body.email, password: req.body.password }, function(err, doc) {
        //console.log(doc);
        // if (doc == null) {
        //    handleError(res, err.message, "Failed to authenticate");
        // } else {
        //     res.status(200).json(doc);
        // }
        if (doc != null) {
            var token = jwt.sign({ firstName: doc.firstName, lastName: doc.lastName, email: doc.email, phone: doc.phone }, secret, { expiresIn: '24h'});
            res.status(200).json({doc, token: token});
            //console.log(token);
        } else {
            res.status(200).json(doc);
        }
        //console.log(doc.firstName);
        
    });
});

router.use(function(req, res, next) {

    var token = req.body.token || req.body.query || req.headers['x-access-token'];

    if(token) {
        //verify token
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(200).json({message: 'Token invalid'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(200).json({message: 'No token provided'});
    }
});

router.post('/me', function(req, res) {
    res.send(req.decoded);
});

// router.get("/contact/:id",  function(req, res) {
//     //console.log("hello");
//     db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
//         if (err) {
//             //console.log("hello");
//             handleError(res, err.message, "Failed to get contact");
//         } else {
//             res.status(200).json(doc);
//         }
//     });
// });


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

module.exports = router;