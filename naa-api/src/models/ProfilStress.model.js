//Require Mongoose
var mongoose = require('mongoose');


var profileStressModel = new mongoose.Schema({
    socialCategory: String,
    professionalSituation: String,
    children: Number,

    stressFactors: String[],
    stressEscape: String[],
    stressRelief: String[],

    emotionalConseq: String[],
    physicalConseq: String[],

    createdAt: Date

    
});

module.exports = mongoose.model('ProfileStress',profileStressModel)
