const { string } = require('joi');
const mongoose = require('mongoose')
const infoligneSchema = new mongoose.Schema({
    id_agence : {
        type : String
    },
    nom_ligne: {
        type: String,
    },
    arretligne: [
    ],
    prix : {
        type : String
    },
    unite_prix:{
        type : String
    },
    distance : {
        type : String
    },
    type_distance : {
        type : String
    },
    num_bus: {
        type : Number
    },
    duree : {
        type:String
    },
    nbr_place : {
        type : Number
    }
})

module.exports = mongoose.model('Info-ligne', infoligneSchema);