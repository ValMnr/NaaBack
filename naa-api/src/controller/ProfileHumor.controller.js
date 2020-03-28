var ProfileHumorModel = require('../models/ProfileHumor.model');


class ProfileHumor {
    createProfileHumor(req,res){
        if (!req.body.userId || !req.body.level || !req.body.causes || !req.body.sessionHumorDoneId) {
            res.json({success: false, msg: 'Informations manquantes pour enregistrer le profil'});

            
        }else {
            var newProfileHumor = new ProfileHumorModel({
                userId: req.body.userId,
                createdAt: Date.now(),
                level: req.body.level,
                causes: req.body.causes,
                sessionHumorDoneId : req.body.sessionHumorDoneId
            });
           
            newProfileHumor.save((err,newProfileHumor) => {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                }
                else {
                
                //res.json({success: true, msg: 'profil humeur créé avec succès'});
                return res.status(200).json(newProfileHumor);
            }
                
                
            });
        }
    }

    //donne tous les profils humor d'un userId
    async getProfileHumor(req, res) {
        if (!req.query.userId) {
            res.json({ success: false, msg: 'il faut l_id du user' });
        } else {
            try {
                var humors = await ProfileHumorModel.find( { userId: req.query.userId }).lean().exec();
                return res.status(200).json(humors);

            }
            catch (err) {
                return res.json(err);
            }

        }
    }


    
}

module.exports = new ProfileHumor; 