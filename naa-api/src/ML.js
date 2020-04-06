const { NlpManager } = require('node-nlp');
 

const managerAdvice = new NlpManager({ languages: ['fr'] });

managerAdvice.addDocument('fr', 'Super', 'advice.OK');

managerAdvice.addAnswer('fr','advice.OK','Prends sur toi ça va passer')

const manager = new NlpManager({ languages: ['fr'] });
// Adds the utterances and intfrts for the NLP

manager.addDocument('fr', 'Super', 'type1.High');

manager.addDocument('fr', 'Très bien', 'type1.High');
manager.addDocument('fr', 'Bien', 'type1.Mid');
manager.addDocument('fr', 'Moyen', 'type1.Mid');
manager.addDocument('fr', 'Pas top', 'type1.Low');
manager.addDocument('fr', 'Au fond du trou', 'type1.Low');


// Train also the NLG
manager.addAnswer('fr', 'type1.High', '7');
manager.addAnswer('fr', 'type1.Mid', '5');
manager.addAnswer('fr', 'type1.Low', '3');

 
// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
    await managerAdvice.train();
    managerAdvice.save();
})();
/*
*/
function getIntent(response){
    var score = parseInt(response.intent.split('.')[1])/10
    console.log("score ! "+score)
    return score
}


async function getAdvice(data){
    console.log("trying")
    const response = await managerAdvice.process('fr', data);
    console.log(response)
    console.log(response.answer)
    return response.answer
}

async function getScoreAnswer (type,content){

    switch (type){
        case 'type1':
            const response = await manager.process('fr', content);
            //console.log(response)
            return getIntent(response)
    }
}


module.exports = {getScoreAnswer, getAdvice};