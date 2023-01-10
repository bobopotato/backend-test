
const router = require('express').Router();
const CommentController = require('../controllers/CommentController')

router.get('/getFilteredComments', CommentController.getFilteredComments);

module.exports = router;
