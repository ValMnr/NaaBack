//Require Mongoose
var mongoose = require('mongoose');


var AnswersHumorModel = new mongoose.Schema({
    userId: String,
    questionType: String,
    content:  String,
    score: Number

});

module.exports = mongoose.model('AnswersHumor', AnswersHumorModel)



