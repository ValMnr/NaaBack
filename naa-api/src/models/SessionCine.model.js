//Require Mongoose
var mongoose = require('mongoose');


var SessionCINEModel = new mongoose.Schema({

    userId: String,
    parcoursId: String,
    score: Number,
    createdAt: Date
});

module.exports = mongoose.model('SessionCINE', SessionCINEModel)



