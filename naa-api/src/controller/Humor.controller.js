var SessionHumor = require('../models/SessionHumor.model');
var QuestionsHumor = require('../models/QuestionsHumor.model');
var AnswersHumor = require('../models/AnswersHumor.model');





//Creer une session humor (obvious)
function createSessionHumor(req, res) {

    var crtSession = new SessionHumor({
        userID: req.body.userId,
        questionID: req.body.questions,
        answersId: req.body.answersId,
        createdAt: Date.now()

    })

    crtSession.save((err, session) => {
        if (err) {
            console.log(err);
            return res.json({ success: false });
        }
        else {
            return res.status(200).json(session);
        }
    })
}    

//Recupere la derniere session humor
async function getLatestSessionhumor(req, res) {
    if (!req.query.userId) {
        res.status(500).json({ success: false, msg: 'il faut l_id du user' });
    } else {
        try {
            var latestProfile = await ProfileHumorModel.find({ userId: req.query.userId }).sort({ createdAt: -1}).limit(-1).lean().exec();
            return res.status(200).json(latestProfile);
        }
        catch (err) {
            return res.json(err);
        }
    }
}

//donne les profils humor d'un userId de la dernière semaine 
async function getWeekSessionHumor(req, res) {
        if (!req.query.userId) {
        res.status(500).json({ success: false, msg: 'il faut l_id du user' });
    } else {
        try {
            var sessions = await SessionHumor.find({
                userId: req.query.userId, createdAt: {
                    $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
                }
            }).lean().exec();
            return res.status(200).json(sessions);
        }
        catch (err) {
            return res.json(err);
        }

    }
}


//Ajoute une reponse dans la BDD avec content, type, score -> Algo ML retourne score (0=bad /1=good) 
async function addAnswer(req, res) {

    if (!req.query.userId) {
        res.status(500).json("no userID");
    }
    else{
        var crtQuestion = req.body.questionType;
        var crtContent = req.body.content;
        var crtScore = await ML.getScoreAnswer(crtType,crtContent)

        //var crtScore = 0.5 ;

        var crtAnswer = new AnswersHumor({
            questionType: crtQuestion,
            content: crtContent,
            score: crtScore
        })
        crtAnswer.save((err,ans)=>{
            if (err){return res.status(500).send(err) }
            else{
                console.log(" answer id : " + ans._id)
                return res.status(200).json(ans._id);
            }
        })

    }
}
  

async function getAdvice(req,res){
    
}



module.exports = { addAnswer, getLatestSessionhumor,createSessionHumor,getWeekSessionHumor , getAdvice}; 