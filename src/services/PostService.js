
const axios = require('axios')
const GET_ALL_POST = 'https://jsonplaceholder.typicode.com/posts'

const getAllPosts = async () => {
    try {
        return new Promise((resolve, reject) => {
            axios.get(GET_ALL_POST).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject (err);
            })
        })
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    getAllPosts
}