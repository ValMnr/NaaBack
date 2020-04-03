//Require Mongoose
var mongoose = require('mongoose');


var ProfileModel = new mongoose.Schema({
    userId: String,
    sexe: String,
    age: Number,
    socialSituation: String, //married, couple
    professionalSituation: String,
    children: Number,
    stressFactors: [String],
    stressEscape: [String],
    stressRelief: [String],
    emotionalConseq: [String],
    physicalConseq: [String],
    createdAt: Date
});

module.exports = mongoose.model('Profile',ProfileModel)
