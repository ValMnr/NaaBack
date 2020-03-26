//Require Mongoose
var mongoose = require('mongoose');


var profileModel = new mongoose.Schema({
    userId: String,
    sexe: String,
    age: Number,
    createdAt: Date,
    
    stressProfilesId: String[]
    psyProfilesId: String[],
    humorProfilesId: String[],
    
    humorSessionDoneId: String[];
    cineSessionDoneId: String[];
    
    
});

module.exports = mongoose.model('Profile',profileModel)
