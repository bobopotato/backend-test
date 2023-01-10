
const router = require('express').Router();
const PostController = require('../controllers/PostController')

router.get('/getAllPosts', PostController.getAllPosts);
router.get('/getTopPosts', PostController.getTopPosts);

module.exports = router;
