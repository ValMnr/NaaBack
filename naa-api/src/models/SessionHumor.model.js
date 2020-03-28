//Require Mongoose
var mongoose = require('mongoose');


var sessionHumorModel = new mongoose.Schema({

    userId: String,
    questionsArray : [String],
    createdAt: Date

});

module.exports = mongoose.model('SessionHumor', sessionHumorModel)



