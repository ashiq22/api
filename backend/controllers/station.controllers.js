const Station = require('../models/station.models')
exports.registerStation = async (req, res) => {
    const { agence, ligne, arret} = req.body;
    const stationM = await Station.create({
        agence,
        ligne,
        arret,    })
    res.status(200).json(stationM);
    console.log(stationM)
}

//get all ligne
exports.getAllstation= async(req,res)=>{
    try {
    const station = await Station.find()
    res.status(200).json(station)
} 
catch (err) {
    res.status(500).json(err)
  }
}

//get station by ligne
exports.getArretByLigne = async (req, res) => {
    const {agence , ligne} = req.body
    const station = await Station.find({agence , ligne}).select('agence').select('ligne').select('arret')
    res.status(200).json(station)
}


//update ligne 
exports.updateArret = async (req , res) => {
    const newstation = {
        agence: req.body.agence,
        ligne: req.body.ligne,
        arret: req.body.arret,
    }
    const arret = await Station.findByIdAndUpdate(req.params.id, newstation, {
        new: true,
    })

    return res.status(200).json(arret)     
}

