// https://www.youtube.com/watch?v=HEzAmAmUM7k&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=2
// https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977
// http://knexjs.org

const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/foodsharing_dev.sqlite3',
    },
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds'),
    },
    useNullAsDefault: true,
  },
};
