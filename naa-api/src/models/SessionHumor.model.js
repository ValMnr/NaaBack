//Require Mongoose
var mongoose = require('mongoose');


var SessionHumorModel = new mongoose.Schema({
    userId: String,
    questionId: [String],
    answerId: [String],
    score: Number,
    createdAt: Date

    
});

module.exports = mongoose.model('SessionHumor',SessionHumorModel)
