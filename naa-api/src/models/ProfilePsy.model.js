//Require Mongoose
var mongoose = require('mongoose');


var profileCineModel = new mongoose.Schema({
    userId: String[],
    selfEsteem: Number,
    serenity: Number,
    confiance: Number,
    assurance: Number,
    risque: Number,

    createdAt: Date
    sessionCineDoneId: String[]
    
});

module.exports = mongoose.model('ProfileCine',profileCineModel)
