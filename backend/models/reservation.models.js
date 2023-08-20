const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    email_User: {
        type: String
    },
    lname: {
        type: String
    },
    fname: {
        type: String
    },
    nbPlace: {
        type: Number
    },
    numTel:{
        type : Number
    },
    id_Voyage:{
        type: String
    },
    etatPayement : {
        type : Boolean
    },
    nomLigne: {
        type : String
    },
    dateVoyage : {
        type : String
    },

    prix : {
        type : Number
    },
  
    numBus : {
        type : Number
    },
    heurArrive : {
        type : String
    },
    heurDepart : {
        type : String
    },
  
    nameagency:{
        type : String
    },

    arretDepart : {
        type : String
    },
    arretArrive : {
        type : String
    },
    id_ticket : {
        type : String
    },
    emailTicket : {
        type : String
    },
    Num_ticket : {
        type : Number
    }	,
    nbticket : {
        type : Number,
    }

  

},


)
module.exports = mongoose.model('Reservation', ReservationSchema);