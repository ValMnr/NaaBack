//Require Mongoose
var mongoose = require('mongoose');


var sessionCineModel = new mongoose.Schema({

    userId: String,
    questionsArray = String[],
    createdAt: Date

});

module.exports = mongoose.model('SessionCine', sessionCineModel)



