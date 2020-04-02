var QuestionsCINE = require('../models/QuestionsCINE.model');
var ParcoursCINE = require('../models/ParcoursCINE.model');
var SessionCINE = require('../models/SessionCINE.model');

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
        ParcoursCINE.find({ type: req.body.type, rang: req.body.rang })
            .then(parcours => {
                console.log(parcours[0]._id);
                QuestionsCINE.find({ parcoursId: parcours[0]._id })
                    .then(questions => {
                        return res.status(200).json(questions);
                    });
            });

        return res.status(200);
    }

    async parcoursdone(req, res) {
        var cpt = "0"
        ParcoursCINE.find({ type: req.body.type, rang: req.body.rang })
            .then(parcours => {

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

                        console.log(cpt)

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
                                //console.log("Session saved : " + session)
                                return res.status(200).json(session);
                            }


                        });

                    }
                });
            });
    }

    getprogressbars(req,res) {
        var ScoreC = 0

        SessionCINE.find({ userId: req.body.userId, rang: req.body.rang })
        .then(sessions => {
            console.log(sessions[0].pacoursId);
            ParcoursCINE.find({ _id: sessions[0].parcoursId })
                .then(parcours => {
                    if (parcours.type === "C")
                    {
                        ScoreC += sessions[0].score;
                    }
                    return res.status(200).json(questions);
                });
        });

    return res.status(200);

    }





}

module.exports = new CINEController; 