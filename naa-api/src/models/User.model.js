//Require Mongoose
var mongoose = require('mongoose');


var userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    pseudo: String,
    createdAt: Date

});

module.exports = mongoose.model('User', userModel)
