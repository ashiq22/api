const mongoose = require('mongoose')
const StationSchema = new mongoose.Schema({

    agence: {
        type: String,
    },
    ligne: {
        type: String,
    },
    arret: []
})

module.exports = mongoose.model('Station', StationSchema);