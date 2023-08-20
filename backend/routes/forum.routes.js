const express = require('express');
const router = express.Router();
const ForumController = require('../controllers/forum.controllers');

router.post('/ajouterFourum',ForumController.addForum)
router.get('/listeForums',ForumController.getAllforums)
router.put('/commentPost/:id',ForumController.commentPost)





module.exports = router;