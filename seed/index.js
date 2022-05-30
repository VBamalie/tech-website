const sequelize = require('../config/config');
const seedUser = require('./userData')
const seedPosts = require('./postsData');
const seedComments = require('./commentsData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
