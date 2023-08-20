const mongoose = require('mongoose')
const forumSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    textepost : {
        type: String,
    },   
    likes : {
        type: [String]
    },
    comments: [
        
          {
            commenterId:String,
            commenterPseudo: String,
            commentText: String          }
        
          ],
    imagePath: {
        type: String
    },
    posterId: {
      type: String,
    },
})
module.exports = mongoose.model('Forum', forumSchema);