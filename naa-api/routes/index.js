var express = require('express');
const router = express.Router();

var ProfileController = require('../src/controller/Profile.controller');
var ProfilePsyController = require('../src/controller/ProfilePsy.controller');
var ProfileStressController = require('../src/controller/ProfileStress.controller');
var SessionHumorController = require('../src/controller/SessionHumor.controller');
var ProfileHumorController = require('../src/controller/ProfileHumor.controller');
var UserController = require('../src/controller/User.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//User VAL
router.post('/api/user/signup',UserController.createUser);
router.post('/api/user/login',UserController.authUser);

/*

//profile
router.post('/api/profile',ProfileController.createProfile); //crée un profil
router.update( '/api/profile/profilestress', ProfileController.addProfileStress); //ajoutera un Id dans l'ArrayList ProfilStress
router.update( '/api/profile/profilepsy', ProfileController.addProfilePsy); // ajoutera un ID dans l'Arraylist ProfilPsy 
router.update ('/api/profile/profilehumor',ProfileController.addProfileHumor); //ajoutera un ID dans l'Arraylist ProfilHumor
router.get('/api/profile', ProfileController.getProfile); //récupère le profil
*/
//profileHumor AL
router.post('/api/profilehumor',ProfileHumorController.createProfileHumor); //crée un profilhumor
router.get('/api/profilehumor', ProfileHumorController.getProfileHumor); //récupère les 7 derniers profils humor
/*
router.update ()//ajouter l'id de la session humeur dans le profil humeur


//profilePsy VAL
router.post('/api/profilepsy',ProfilePsyController.createProfilePsy); //crée un profil psy
router.update('/api/profilepsy',ProfilePsyController.updateScores); //met à jour les scores du profil psy
router.get('/api/profilepsy', ProfilePsyController.getProfilePsy); //récupère un profil psy

//ProfileStress
router.post('/api/profilestress',ProfileStressController.createProfileStress); //crée un profil stress du user
router.get('/api/profilestress', ProfileStressController.getProfileStress); //récupère le profil stress du user

//SessionHumor AL
router.get('/api/sessionhumor', SessionHumorController.getSessionHumor); //récupère une session humor

//SessionCine VAL
router.get('/api/profil', SessionCineCrontroller.getSessionCine); //récupère les sessions

//Question VAL
router.get('/api/question', ); //récupère les questions

*/

module.exports = router;