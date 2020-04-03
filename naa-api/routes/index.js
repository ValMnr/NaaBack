var express = require('express');
const router = express.Router();

var UserController = require('../src/controller/User.controller');
var ProfileController = require('../src/controller/Profile.controller');
var CINEController = require('../src/controller/CINE.controller');
var HumorController = require('../src/controller/Humor.controller');



//User-Profile VAL
router.post('/api/user/signup',UserController.createUser);
router.get('/api/user', UserController.getUser );
/*
router.post('/api/profile',ProfileController.createProfile); //crée un profil


/*
//Humor 
router.get('/api/humor') // à voir à voir à voir
router.post('/api/humor',SessionHumorController.createProfileHumor); //crée une session humor
router.get('/api/humor', SessionHumorController.getProfileHumor); //récupère les 7 dernières session humor
*/

//CINE 
router.post('/api/CINE', CINEController.writeallparcours);
router.post('/api/CINE/questions', CINEController.writeallquestions);
router.get('/api/CINE', CINEController.getunparcours); //récupère les questions
router.post('/api/CINE/putsession', CINEController.parcoursdone); //post ou put le parcours terminé dans Session
router.get('/api/CINE/progressbars', CINEController.getprogressbars); //récupère les barres de progression C,I,N,E total en dur
router.get('/api/CINE/spider', CINEController.getspiderdiagram); //récupère les valeurs du diagramme arraignée




module.exports = router;