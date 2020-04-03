//Require Mongoose
var mongoose = require('mongoose');



var ParcoursCINEModel = new mongoose.Schema({
    type: String, //C, I, N ou E
    rang: Number, //numéro du parcours : 1, 2, 3, 4 //
    content: String, 
    selfEsteem: Number, //le score max pour ce parcours
    serenity: Number,
    confiance: Number,
    assurance: Number,
    risque: Number,
    createdAt: Date

    
});

module.exports = mongoose.model('ParcoursCINE',ParcoursCINEModel)
