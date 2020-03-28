//Require Mongoose
var mongoose = require('mongoose');


var sessionCineModel = new mongoose.Schema({

    userId: String,
    questionsArray: [String],
    selfEsteemScore: Number,
    serenityScore: Number,
    confianceScore: Number,
    assuranceScore: Number,
    risqueScore: Number,
    createdAt: Date
});

module.exports = mongoose.model('SessionCine', sessionCineModel)



