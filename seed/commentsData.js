const { Comment } = require('../models');

const commentData = [
    {
        title: 'Blah',
        content: 'Blah blah blah',
        starting_date: 'March 30, 2018',
        post_id: 1,
        user_id: 1
    }
]
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
