//Require Mongoose
var mongoose = require('mongoose');


var profilePsyModel = new mongoose.Schema({
    userId: String[],
    selfEsteem: Number,
    serenity: Number,
    confiance: Number,
    assurance: Number,
    risque: Number

    createdAt: Date

    
});

module.exports = mongoose.model('ProfilePsy',profilePsyModel)
