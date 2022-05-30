const { User } = require('../models');

const userData = [
    {
        username: 'blah123',
        password: 'blah123'
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;