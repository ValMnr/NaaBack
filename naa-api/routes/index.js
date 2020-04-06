var express = require('express');
const router = express.Router();

var UserController = require('../src/controller/User.controller');
var ProfileController = require('../src/controller/Profile.controller');
var CINEController = require('../src/controller/CINE.controller');
var HumorController = require('../src/controller/Humor.controller');


//User-Profile VAL
router.post('/api/user/signup',UserController.createUser);
router.post('/api/user/login',UserController.authUser);

//*
router.post('/api/createProfile',ProfileController.createProfile); //crée un profil



//Humor 

router.post('/api/humor/session',HumorController.createSessionHumor); //crée une session humor
router.get('/api/humor/sessionLatest', HumorController.getLatestSessionhumor); //récupère la dernière session humor
router.get('/api/humor/sessionWeek', HumorController.getWeekSessionHumor); //récupère les 7 dernières session humor
router.post('/api/humor/addAnswer', HumorController.addAnswer); //Ajouter une reponse   //OK ajouter training
router.post('/api/humor/advice', HumorController.getAdvice); //Recupere un conseil selon les réponses précédentes //OK, ajouter du training
router.get('/api/humor/getQuestions',HumorController.getQuestions) //Recuper 3 questions (une de chaque type) pour le questionnaire d'humor
router.post('/api/humor/addQuestion', HumorController.addQuestion); //Ajoute une question à la BDD, calcule son score et retourne l'objet crée


//CINE 
router.post('/api/CINE', CINEController.writeallparcours);
router.post('/api/CINE/questions', CINEController.writeallquestions);
router.get('/api/CINE', CINEController.getunparcours); //récupère les questions
router.post('/api/CINE/putsession', CINEController.parcoursdone); //post ou put le parcours terminé dans Session
router.post('/api/CINE/progressbars', CINEController.getprogressbars); //récupère les barres de progression C,I,N,E total en dur
router.post('/api/CINE/spider', CINEController.getspiderdiagram); //récupère les valeurs du diagramme arraignée




module.exports = router;


