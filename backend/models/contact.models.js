const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    nomUser: {
        type: String,
    },
    emailUser : {
        type: String,
    },
    texteRep : {
        type: String,
        default: ''
    },    
    texte : {
        type: String,
    },  

    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
})
module.exports = mongoose.model('Contact', contactSchema);