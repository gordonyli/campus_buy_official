// var mongodb = require("mongodb");
// var Schema = mongodb.Schema;
// var bcrypt = require('bcrypt-nodejs');

// var UserSchema = new Schema({
// 	firstName: { type: String, required: true },
// 	lastName: { type: String, required: true },
// 	email: { type: String, required: true, lowercase: true, unique: true },
// 	phone: { type: Number, required: true},
// 	password: { type: String, required: true }
// });

// // UserSchema.pre('save', function(next) {
// // 	var user = this;
// // 	bcrypt.hash(user.password, null, null, function(err, hash) {
// // 		if (err) return next(err);
// // 		user.password = hash;
// // 		next();
// // 	});

// // });

// module.exports = mongodb.model('User', UserSchema);