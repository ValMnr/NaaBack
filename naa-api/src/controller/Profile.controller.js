var ProfileModel = require('../models/Profile.model');


createProfile = (req,res,next)=>{
    console.log(req.body)
    var profile = new ProfileModel ({
        userId: req.body.userId,
        sexe: req.body.sexe,
        age: req.body.age,
        socialSituation: req.body.socialCat,
        proffessionalSituation: req.body.proffesSituation,
        children: req.body.children,
        stressFactors: req.body.stressFactor,
        stressEscape: req.body.stressEscape,
        stressRelief: req.body.stressRelief,
        emotionalConseq: req.body.emotionConseq,
        physicalConseq: req.body.physicalConseq,
        createdAt: Date.now()
    })
    profile.save((err,profile)=>{
        if (err){return res.status(500).send(err) }
        else{
            console.log("User saved : " + profile)
            return res.status(200).json(profile);
        }
    })



}

module.exports = {createProfile};