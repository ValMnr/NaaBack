//Require Mongoose
var mongoose = require('mongoose');


var QuestionsCINEModel = new mongoose.Schema({
    
    parcoursId: String,
    rang: Number, //question n°1, 2, 3, 4, ou 5 du parcours
    content:  String,
    correct_answer: Boolean,
    createdAt : Date

});

module.exports = mongoose.model('QuestionsCINE', QuestionsCINEModel)



