//Require Mongoose
var mongoose = require('mongoose');


var questionModel = new mongoose.Schema({
    
    content:  String,
    answers: []  ///DECLARER SOUS ARRAY

});

module.exports = mongoose.model('Question', sessionCineModel)



