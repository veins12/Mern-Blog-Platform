// routes/comments.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Define routes using controller functions
router.post('/', commentController.addComment);
router.get('/', commentController.getAllComments);
router.delete('/:id', commentController.deleteComment);
router.put('/:id', commentController.updateComment);

module.exports = router;
