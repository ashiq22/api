const mongoose = require('mongoose')
const LigneSchema = new mongoose.Schema({
    nom_ligne: {
        type: String,
    },
})
module.exports = mongoose.model('Ligne', LigneSchema);