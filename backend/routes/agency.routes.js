const express = require('express');
const router = express.Router();
const AgencyController = require('../controllers/agency.controllers');
const {isVerifiedEmail} = require('../middleware/auth')
const storage = require('../helpers/storage');
//Routes agency
router.post('/register',AgencyController.registerAgency)
router.post('/login', AgencyController.loginAgency)
router.get('/logout', AgencyController.logout)
router.post('/password/forgetpassword', AgencyController.forgotPassword)
router.put('/password/reset/:token' , AgencyController.resetPassword)
router.get('/getProfil/:id' , AgencyController.getAgencyProfil)
router.put('/updateProfil/:id' ,storage, AgencyController.updateProfile)
router.get('/listereservation', AgencyController.getReservation)
router.get('/listevoyage', AgencyController.getAllvoyage)
router.post('/ajout' ,storage,AgencyController.ajoutVoyage)
router.get('/liste_voyage' , AgencyController.listeVoyage)
router.put('/modifier_voyage/:id' , AgencyController.updateVoyage)
//router.delete('/annulerVoyage/:id',AgencyController.annulerVoyage)
router.put('/updateprofilImage/:id' , storage ,AgencyController.updateProfileImage)
/**Sprint ajouter ligne */
router.post('/ajoutLigne' , AgencyController.ajouterLigne)
router.post('/ajoutArret' , AgencyController.ajouterArret)
router.get('/listeAll-ligne' , AgencyController.getAllLigne)
router.get('/listeAll-arret' , AgencyController.getAllArret)
router.post('/ajoutInfoLigne/:id_agence' , AgencyController.ajouterInfoLigne)
router.get('/listAll-infoLigne' , AgencyController.getAllInfoLigne)
router.put('/updateInfoligne/:id' , AgencyController.updateInfoLigne)
router.delete('/deleteInfoligne/:id',AgencyController.deleteInfoligne)
router.get('/findarretByid/:id', AgencyController.findarretById)
router.get('/findallligneByid/:id_agence', AgencyController.findallligneById)
router.post('/AjouterDateNbticket', AgencyController.addDateNbrticketVoyage)
router.get('/infoVoyage/:id_agence', AgencyController.getAllDateTicket)
router.get('/historiqueTicket/:nameagency', AgencyController.getHistorique)
router.get('/nbticketVenduebyagence/:nameagency' , AgencyController.nbTicketvonduebyagence);

module.exports = router;