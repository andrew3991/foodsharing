// https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977
// https://www.youtube.com/watch?v=HEzAmAmUM7k&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=2

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
