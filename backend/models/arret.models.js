const mongoose = require('mongoose')
const ArretSchema = new mongoose.Schema({
    nom_arret: {
        type: String,
        
    },
    longitude : {
        type: Number,
    },
    latitude : {
        type: Number,
    },
    duree_arret : { 
        type : String,
        default : "5 minute"
    }
    
})
module.exports = mongoose.model('Arret', ArretSchema);