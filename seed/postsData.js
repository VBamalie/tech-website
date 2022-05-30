const { Post } = require('../models');

const postData = [
    {
        title: 'Something',
        content: 'insert content here',
        post_date: 'June 22, 2021 09:00:00',
        user_id: 1
    }
]
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;