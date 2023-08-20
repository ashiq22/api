const express = require('express');
const router = express.Router();
const StationController = require('../controllers/station.controllers');

//Routes station
router.post('/ajouterStation',StationController.registerStation)
router.get('/listestation',StationController.getAllstation)
router.get('/listeStationByGovernorat' , StationController.getArretByLigne)
router.put('/update/:id' , StationController.updateArret)

module.exports = router;