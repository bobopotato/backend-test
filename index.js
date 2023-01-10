const express = require('express');
const PostRouter = require('./src/routes/Post')
const CommentRouter = require('./src/routes/Comment')

const app = express();
const PORT = 8080;

app.use('/post', PostRouter);
app.use('/comment', CommentRouter);

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})