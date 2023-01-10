
const CommentService = require('../services/CommentService')

const getFilteredComments = async (req, res) => {
    try {
        // searchType will be hardcode => name, email, body
        const { keyword, searchType } = req.query;

        const commentsData = await CommentService.getAllComments();

        let filteredData = commentsData

        if (keyword && keyword !== '') {
            filteredData = commentsData.filter((comment) => {
                if (searchType && searchType !== '') {
                    switch (searchType) {
                        case 'name':
                            if (comment.name.includes(keyword)) {
                                return comment;
                            }
                            break
                        case 'email':
                            if (comment.email.includes(keyword)) {
                                return comment;
                            }
                            break
                        case 'body':
                            if (comment.body.includes(keyword)) {
                                return comment;
                            }
                            break
                    }

                }
                else {
                    if (comment.name.includes(keyword) || comment.email.includes(keyword) || comment.body.includes(keyword)) {
                        return comment;
                    }
                }
            })
        }

        return res.status(200).json({
            success: true,
            resultCount: filteredData.length,
            data: filteredData,
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
    getFilteredComments,
}