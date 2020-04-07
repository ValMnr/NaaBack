var ProfileModel = require('../models/Profile.model');
var User = require('../models/User.model')


createProfile = (req,res,next)=>{

    User.findOne({ email: req.body.email }, (err, result) => {
        if (result != null) {
            console.log(result);
            var profile = new ProfileModel ({
                userId: result._id,
                sexe: req.body.sexe,
                age: req.body.age,
                socialSituation: req.body.socialSituation,
                professionalSituation: req.body.professionalSituation,
                children: req.body.children,
                stressFactors: req.body.stressFactors,
                stressEscape: req.body.stressEscape,
                stressRelief: req.body.stressRelief,
                emotionalConseq: req.body.emotionalConseq,
                physicalConseq: req.body.physicalConseq,
                createdAt: Date.now()



            })
            console.log(profile)
            profile.save((err,profile)=>{
                if (err){
                    console.log(err) 
                      }
                else{
                    console.log("Profile saved : " + profile)
                    return res.status(200).json({profile: profile});
                }
            })  
          
        } else {
            console.log(err);
        }
    });  
}
module.exports = {createProfile};