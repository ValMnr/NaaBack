var ProfileHumorModel = require('../models/ProfileHumor.model');

class ProfileHumor {
    createProfileHumor(req,res){
        if (!req.body.userId || !req.body.level || !req.body.causes || !req.body.sessionHumorDoneId) {
            res.json({success: false, msg: 'Informations manquantes pour enregistrer le profil'});

            
        }else {
            var newProfileHumor = new ProfileHumor({
                usedId: req.body.userId,
                createdAt: Date.now(),
                level: req.body.level,
                causes: req.body.causes,
                sessionHumorDoned : req.body.sessionHumorDoneId
            });
           
            newProfileHumor.save((err) => {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                }
                
                res.json({success: true, msg: 'profile humeur créée avec succès'});
                
            });
        }
    }
    
}

module.exports = new ProfileHumor; 