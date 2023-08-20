const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');
const { isAuthenticatedUser } = require('../middleware/auth');
const {isVerifiedEmail,isVerifiedEmailweb,isVerifiedPassword , VerfyAttributs} = require('../middleware/auth');
const {isVerifiedattribut} = require('../middleware/ValidAttributs')
const storage = require('../helpers/storage');

//Routes user
router.post('/register', isVerifiedEmailweb ,UserController.registerUser)
router.get("/confirm/:confirmationCode", UserController.verifyUser)
router.get('/findUserByEmail/:email', UserController.findUserByEmail)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logout)
router.post('/password/forgetpassword', UserController.forgotPassword)
router.put('/password/reset/:token' , UserController.resetPassword)
router.get('/getProfil/:id' , isAuthenticatedUser, UserController.getUserProfil)
router.put('/updateProfil/:id' ,storage ,isAuthenticatedUser, UserController.updateProfile)
router.post('/ajout_reservation' , UserController.ajoutreservation);
router.get('/liste_reservation_user' , UserController.listeReservationUser);
router.get('/detaillesTickets/:id' , UserController.getDetailleTicketByid);
router.post('/recherche_voyage' , UserController.rechercheVoyage);
router.post('/Contacter' , UserController.Contacter );
router.get('/listeContact' , UserController.listeContact);
router.put('/repondreContact/:id' , UserController.repondreContact);
router.post('/test' , UserController.Testnbticket);






module.exports = router;