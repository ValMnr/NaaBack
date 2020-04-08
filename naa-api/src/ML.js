const { NlpManager } = require('node-nlp');


const managerAdvice = new NlpManager({ languages: ['fr'] });

managerAdvice.addDocument('fr', 'Super ,Très bien ,Pas de Travail', 'advice.OK');
managerAdvice.addDocument('fr', 'Nul, Pas top , Examens', 'advice.BAD');
managerAdvice.addDocument('fr', 'Bof, Pas top , Travail', 'advice.BAD');


managerAdvice.addAnswer('fr', 'advice.OK', 'Continue comme ça !')
managerAdvice.addAnswer('fr', 'advice.BAD', 'Tout va aller mieux bientot, on va travailler ensemble !')

const manager = new NlpManager({ languages: ['fr'] });
// Adds the utterances and intfrts for the NLP

manager.addDocument('fr', 'Super', 'type1.High');

manager.addDocument('fr', 'Très bien', 'type1.7');
manager.addDocument('fr', 'Bien', 'type1.5');
manager.addDocument('fr', 'Moyen', 'type1.5');
manager.addDocument('fr', 'Pas top', 'type1.3');
manager.addDocument('fr', 'Au fond du trou', 'type1.3');


// Train also the NLG
manager.addAnswer('fr', 'type1.7', '7');
manager.addAnswer('fr', 'type1.5', '5');
manager.addAnswer('fr', 'type1.3', '3');


// Train and save the model.
(async () => {
    await manager.train();
    manager.save();
    await managerAdvice.train();
    managerAdvice.save();
})();
/*
*/
function getIntent(response) {
    console.log(response)
    var score
    if (response.intent === undefined) {
        score = (Math.random() * (0.9 ) + 0.1).toFixed(2)

    } else {
        var score = parseFloat(response.intent.split('.')[1]) / 10
        console.log("score ! " + score)
    }
    return score

}


async function getAdvice(data) {
    const response = await managerAdvice.process('fr', data);
    console.log(response)
    console.log(response.answer)
    return response.answer
}

async function getScoreAnswer(type, content) {
    console.log("waiting for ml answer")

    return new Promise((resolve, reject) => {
        console.log("inside promise")
        const response = manager.process('fr', content);
        console.log(response)
        if (true === true) {
            resolve(getIntent(response));
        }
        else {
            reject("probleme")
        }

    })
    promise.reject(new Error('fail'))


}


module.exports = { getScoreAnswer, getAdvice };