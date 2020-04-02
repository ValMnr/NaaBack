var QuestionsCINE = require('../models/QuestionsCINE.model');
var ParcoursCINE = require('../models/ParcoursCINE.model');
var SessionCINE = require('../models/SessionCINE.model');


class CINEController {
    writeallparcours(req,res){

        var parcours = new ParcoursCINE({
            type: req.body.type, //C, I, N ou E
            rang: req.body.rang,
            selfEsteem: req.body.selfEsteem,  //le score max pour ce parcours
            serenity: req.body.serenity, 
            confiance: req.body.confiance, 
            assurance: req.body.assurance, 
            risque: req.body.risque, 
            createdAt: Date.now()

        });
        parcours.save( (err,parcours)=>{
            if(err){
                return res.status(500).send(err)
            }
            else{
                console.log("Parcours saved : "+parcours)
                return res.status(200).json(parcours);
            }
        } )
        
    }

    writeallquestions(req,res){

        ParcoursCINE.find({ type: req.body.type, rang: req.body.rang })
        .then(parcours => {              
          console.log(parcours[0]._id); 
          var question = new QuestionsCINE({
            parcoursId: parcours[0]._id,
            rang: req.body.rang2, //question n°1, 2, 3, 4, ou 5 du parcours
            content:  req.body.content,
            correct_answer: req.body.correct_answer,
            createdAt : Date.now()

        });
        question.save( (err,question)=>{
            if(err){
                return res.status(500).send(err)
            }
            else{
                console.log("Question saved : "+question)
                return res.status(200).json(question);
            }
        } )
        return res.status(200).json(questions);
        });


            
    
    
        

    

       
        
    }

}

module.exports = new CINEController; 