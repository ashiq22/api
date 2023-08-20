const mongoose =  require('mongoose')
const voyageSchema = new mongoose.Schema({
  id_agence : {
    type : String
},
nameagency : {
  type : String
},
  
    idInfoligne:{
     type : String
    },
    arretligne : [
    ],
    nom_ligne : {
      type : String
    },
    dateVoyage:{
      type : String
    },
    Nbrtickets:{
      type : Number
    },  
    num_bus : {
      type : Number
    },
    imagePath: {
      type: String
  },
  Nbrticketstotale:{
    type : Number
  },
})
module.exports =  mongoose.model('Voyage', voyageSchema);

