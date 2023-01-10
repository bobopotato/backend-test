
const PostService = require('../services/PostService')
const CommentService = require('../services/CommentService')

const getAllPosts = async (req, res) => {
    try {
        const postsData = await PostService.getAllPosts();
        return res.status(200).json({
            success: true,
            data: postsData,
        })
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            error: err,
        })
    }
}

const getTopPosts = async (req, res) => {
    try {
        let requests = [];

        const getPostsRequest = PostService.getAllPosts();
        const getCommentsRequest = CommentService.getAllComments();

        requests = [getPostsRequest, getCommentsRequest]

        const [postsData, commentsData] = await Promise.all(requests);

        let data = postsData.map((post) => {
            let commentCount = commentsData.filter((comment) => comment.postId === post.id).length;
            let newObj = {
                post_id: post.id,
                post_title: post.title,
                post_body: post.body,
                total_number_of_comments: commentCount,
            }
            return newObj;
        })

        data = data.sort((a, b) => {
            if (a.total_number_of_comments < b.total_number_of_comments) {
                return 1
            }
            else if (a.total_number_of_comments > b.total_number_of_comments) {
                return -1
            }
            else {
                return 0
            }
        })

        return res.status(200).json({
            success: true,
            data: data,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({
            success: false,
            error: err,
        })
    }
}

module.exports = {
    getAllPosts,
    getTopPosts,
}