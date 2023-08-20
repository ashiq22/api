const ForumModel = require("../models/forum.models");


exports.addForum= async (req, res,next) => {
    const { textepost , comments } = req.body.data;

    const forumsAdd = await ForumModel.create({
        imagePath:req.body.imagePath,
        username:req.body.username,

        textepost  , comments
    })    
     res.status(200).json({
        success: true,
        message: `Forum ajouter`,
        return : forumsAdd
    }
    )
    }

    exports.getAllforums = async (req , res ) => {
        try {
            const listForums = await ForumModel.find({})
            res.status(200).json(listForums)
        }
        catch (err) {
            res.status(500).json(err)
          }
    }

    module.exports.commentPost = (req, res) => {
        try {
          return ForumModel.findByIdAndUpdate(
            req.params.id,
            {
              $push: { 
                comments: {
                  commenterId: req.body.commenterId,
                  commenterPseudo: req.body.commenterPseudo,
                  commentText: req.body.commentText,
                },
              },
            },
            { new: true },
            (err, docs) => {
              if (!err) return res.send(docs);
              else return res.status(400).send(err);
            }
          );
        } catch (err) {
          return res.status(400).send(err);
        }
      };

