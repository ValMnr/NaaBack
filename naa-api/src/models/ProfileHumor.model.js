//Require Mongoose
var mongoose = require('mongoose');


var profileHumorModel = new mongoose.Schema({
    userId: String,
    createdAt: Date,
    level: Number,
    causes: [String],
    sessionHumotDoneId: [String]

    
});

module.exports = mongoose.model('ProfileHumor',profileHumorModel)
