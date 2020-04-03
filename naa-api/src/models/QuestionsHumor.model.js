//Require Mongoose
var mongoose = require('mongoose');


var QuestionsHumorModel = new mongoose.Schema({
    
    type: String, //ex type1: Hello, ex: type2: Comment ça va? ex2 type2: Ca va mieux? 
    content:  String,
    createdAt: Date


});

module.exports = mongoose.model('QuestionsHumor', QuestionsHumorModel)



