//Require Mongoose
var mongoose = require('mongoose');


var AnswersHumorModel = new mongoose.Schema({
    
    type_question: String,
    content:  String

});

module.exports = mongoose.model('AnswersHumor', AnswersHumorModel)



