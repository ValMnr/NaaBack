var express = require('express');
var router = express.Router();

var ProfileController = require('../controllers/Profile.controller');
var ProfilePsyController = require('../controllers/ProfilePsy.controller');
var ProfileStressController = require('../controllers/ProfileStress.controller');
var SessionHumorController = require('../controllers/SessionHumor.controller');
var ProfileHumorController = require('../controllers/ProfileHumor.controller');
var UserController = require('../controllers/User.controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//User
router.post('/api/user',UserController.createUser);

//profile
router.post('/api/profile',ProfileController.createProfile); //crée un profil
router.update( '/api/profile/profilestress', ProfileController.addProfileStress); //ajoutera un Id dans l'ArrayList ProfilStress
router.update( '/api/profile/profilepsy', ProfileController.addProfilePsy); // ajoutera un ID dans l'Arraylist ProfilPsy 
router.update ('/api/profile/profilehumor',ProfileController.addProfileHumor); //ajoutera un ID dans l'Arraylist ProfilHumor
router.get('/api/profile', ProfileController.getProfile); //récupère le profil

//profileHumor
router.post('/api/profilehumor',ProfileHumorController.createProfileHumor); //crée un profilhumor
router.update ()//ajouter l'id de la session humeur dans le profil humeur
router.get('/api/profilehumor', ProfileHumorController.getProfileHumor); //récupère les 7 derniers profils humor

//profilePsy
router.post('/api/profilepsy',ProfilePsyController.createProfilePsy); //crée un profil psy
router.update('/api/profilepsy',ProfilePsyController.updateScores); //met à jour les scores du profil psy
router.get('/api/profilepsy', ProfilePsyController.getProfilePsy); //récupère un profil psy

//ProfileStress
router.post('/api/profilestress',ProfileStressController.createProfileStress); //crée un profil stress du user
router.get('/api/profilestress', ProfileStressController.getProfileStress); //récupère le profil stress du user

//SessionHumor
router.get('/api/sessionhumor', SessionHumorController.getSessionHumor); //récupère une session humor

//SessionCine
router.get('/api/profil', SessionCineCrontroller.getSessionCine); //récupère les sessions




module.exports = router;
