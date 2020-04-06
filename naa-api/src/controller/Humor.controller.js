var SessionHumor = require('../models/SessionHumor.model');
var QuestionsHumor = require('../models/QuestionsHumor.model');
var AnswersHumor = require('../models/AnswersHumor.model');
var ML = require('../ML.js')

//Recuper 3 questions (une de chaque type) pour le questionnaire d'humor
async function getQuestions(req, res) {
    var questionList = []

    QuestionsHumor.findOne({ type: "type1" }, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        else {
            console.log(result)
            questionList.push(result)
        }
    }).then(() => {
        QuestionsHumor.findOne({ type: "type2" }, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(err)
            }
            else {
                console.log(result)
                questionList.push(result)

            }
        })
    }).then(() => {
            QuestionsHumor.findOne({ type: "type3" }, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(err)
                }
                else {
                    console.log(result)
                    questionList.push(result)

                }
            }).then(() => {
                return res.status(200).json(questionList)
            }
            )
        })
}

function addQuestion(req, res) {
    var crtQuestion = new QuestionsHumor({
        type: req.body.type,
        content: req.body.content,
        createdAt: Date.now()
    })
    crtQuestion.save((err, question) => {
        if (err) { return res.status(500).send(err) }
        else {
            console.log("question saved : " + question)
            return res.status(200).json(question);
        }
    })
}



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
            var latestProfile = await ProfileHumorModel.find({ userId: req.query.userId }).sort({ createdAt: -1 }).limit(-1).lean().exec();
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

    if (!req.body.userId) {
        res.status(500).json("no userID");
    }
    else {
        var crtAnswer = new AnswersHumor({
            questionType: req.body.type,
            content: req.body.content,
            score: await ML.getScoreAnswer(req.body.type, req.body.content)
        })
        crtAnswer.save((err, ans) => {
            if (err) { return res.status(500).send(err) }
            else {
                console.log(" answer  : " + ans)
                return res.status(200).json(ans);
            }
        })

    }
}

//Recupere answersId , nlp sur les 3 réponses -> retourne un conseil
async function getAdvice(req, res) {
    var nlpReq = ""
    var ansDone = 0
    var crtAnswers = req.body.answers
    crtAnswers.forEach((element) => {
        nlpReq += element.content
        ansDone += 1
        if (ansDone === req.body.answers.length) {
            console.log(nlpReq)
        }
    })
    console.log("2" + nlpReq)
    var advice = await ML.getAdvice(nlpReq)
    console.log("advice ::  " + advice)
    return res.status(200).json(advice)
}



module.exports = { getQuestions, addQuestion, addAnswer, getLatestSessionhumor, createSessionHumor, getWeekSessionHumor, getAdvice }; 