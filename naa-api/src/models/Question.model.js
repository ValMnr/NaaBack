//Require Mongoose
var mongoose = require('mongoose');


var questionModel = new mongoose.Schema({
    
    text: 
    answers : []

});

module.exports = mongoose.model('SessionCine', sessionCineModel)



