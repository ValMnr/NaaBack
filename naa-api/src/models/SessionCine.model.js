//Require Mongoose
var mongoose = require('mongoose');


var SessionCINEModel = new mongoose.Schema({

    userId: String,
    questionsArray: [String],
    selfEsteemScore: Number,
    serenityScore: Number,
    confianceScore: Number,
    assuranceScore: Number,
    risqueScore: Number,
    createdAt: Date
});

module.exports = mongoose.model('SessionCINE', SessionCINEModel)



