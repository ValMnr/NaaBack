var QuestionsCINE = require('../models/QuestionsCINE.model');
var ParcoursCINE = require('../models/ParcoursCINE.model');
var SessionCINE = require('../models/SessionCINE.model');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var TotalC = 15; //nombre de question
var TotalI = 15;
var TotalN = 10;
var TotalE = 11;


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

class CINEController {
    writeallparcours(req, res) {

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
        parcours.save((err, parcours) => {
            if (err) {
                return res.status(500).send(err)
            }
            else {
                console.log("Parcours saved : " + parcours)
                return res.status(200).json(parcours);
            }
        })

    }

    writeallquestions(req, res) {

        ParcoursCINE.find({ type: req.body.type, rang: req.body.rang })
            .then(parcours => {
                console.log(parcours[0]._id);
                var question = new QuestionsCINE({
                    parcoursId: parcours[0]._id,
                    rang: req.body.rang2, //question n°1, 2, 3, 4, ou 5 du parcours
                    content: req.body.content,
                    correct_answer: req.body.correct_answer,
                    createdAt: Date.now()

                });
                question.save((err, question) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    else {
                        console.log("Question saved : " + question)
                        return res.status(200).json(question);
                    }
                })
                return res.status(200).json(questions);
            });
    }

    getunparcours(req, res) {
        console.log("caca")
        console.log(req.body)
        ParcoursCINE.find({ type: req.body.type, rang: req.body.rang })
            .then(parcours => {
                
                console.log(parcours[0].content);
                QuestionsCINE.find({ parcoursId: parcours[0]._id })
                    .then(questions => {
                        return res.status(200).json({ content: parcours[0].content, questions: questions });
                    });
            });
    }

    async parcoursdone(req, res) {
        var cpt = "0"
        ParcoursCINE.find({ type: req.body.type, rang: req.body.rang })
            .then(parcours => {

                SessionCINE.count({ userId: req.body.userId, parcoursId: parcours[0]._id }, function (err, count) {

                    if (count > 0) {
                        console.log("existe déjà");

                        QuestionsCINE.find({ parcoursId: parcours[0]._id }, async (err, questions) => {
                            if (err) {
                                return res.json(err)
                            }
                            else {
                                var i = 0
                                await asyncForEach(questions, async (question) => {
                                    if (req.body.response[i] === question.correct_answer) { cpt++; }
                                    i++
                                });

                                let session = await SessionCINE.findOneAndUpdate({ userId: req.body.userId, parcoursId: parcours[0]._id }, { score: cpt });
                                if (err) {
                                    return res.json(err)
                                }
                                else {
                                    session.save();

                                    return res.status(200).json(session);
                                }




                            }
                        });
                    }
                    else {

                        console.log("n'existe pas");
                        QuestionsCINE.find({ parcoursId: parcours[0]._id }, async (err, questions) => {
                            if (err) {
                                return res.json(err)
                            }
                            else {
                                var i = 0
                                await asyncForEach(questions, async (question) => {
                                    if (req.body.response[i] === question.correct_answer) { cpt++; }
                                    i++
                                });



                                var session = new SessionCINE({
                                    parcoursId: parcours[0]._id,
                                    userId: req.body.userId,
                                    score: cpt,
                                    createdAt: Date.now()

                                });

                                session.save((err, session) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    }
                                    else {
                                        console.log("Session saved : " + session)
                                        return res.status(200).json(session);
                                    }


                                });

                            }
                        });

                    }
                });


            });



    }

    async getprogressbars(req, res) {
        var score = [];

        SessionCINE.find({ userId: req.body.userId }, async (err, sessions) => {
            if (err) {
                return res.json(err)
            }
            else {
                let ScoreC = 0;
                let ScoreI = 0;
                let ScoreN = 0;
                let ScoreE = 0;

                await asyncForEach(sessions, async (session) => {
                    // console.log(session)
                    let parcours = await ParcoursCINE.find({ _id: session.parcoursId }).exec();

                    //console.log(parcours)
                    if (err) {
                        return res.json(err)
                    }
                    else {
                        if (parcours[0].type === "C") { ScoreC += session.score; }
                        if (parcours[0].type === "I") { ScoreI += session.score; }
                        if (parcours[0].type === "N") { ScoreN += session.score; }
                        if (parcours[0].type === "E") { ScoreE += session.score; }
                    }
                });

                score.push(ScoreC);
                score.push(ScoreI);
                score.push(ScoreN);
                score.push(ScoreE);

                res.json(score);
            }
        });
    }

    async getspiderdiagram(req, res) {
        var score = [];
        await SessionCINE.find({ userId: req.body.userId }, async (err, sessions) => {
            if (err) {
                return res.json(err)
            }
            else {
                var selfEsteem = 0;
                var serenity = 0;
                var confiance = 0;
                var assurance = 0;
                var risk = 0;

                await asyncForEach(sessions, async (session) => {
                    let parcours = await ParcoursCINE.find({ _id: session.parcoursId }).exec();
                    if (parcours) {
                        await QuestionsCINE.count({ parcoursId: parcours[0]._id }, function (err, count) {

                            if (count > 0) {

                                selfEsteem += parcours[0].selfEsteem * session.score / count;
                                serenity += parcours[0].serenity * session.score / count;
                                confiance += parcours[0].confiance * session.score / count;
                                assurance += parcours[0].assurance * session.score / count;
                                risk += parcours[0].risque * session.score / count;
                            }
                        });
                    }else{
                        return res.json({err:"pas de parcours trouvé"});
                    }

                });

                score.push(selfEsteem);
                score.push(serenity);
                score.push(confiance);
                score.push(assurance);
                score.push(risk);
                
                res.json({score:score});
            }
        });

    }

}

module.exports = new CINEController; 