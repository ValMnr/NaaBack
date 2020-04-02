//Require Mongoose
var mongoose = require('mongoose');


var ParcoursCINEModel = new mongoose.Schema({
    type: String, //C, I, N ou E
    selfEsteem: Number, //le score max pour ce parcours
    serenity: Number,
    confiance: Number,
    assurance: Number,
    risque: Number,
    createdAt: Date

    
});

module.exports = mongoose.model('ParcoursCINE',ParcoursCINEModel)
