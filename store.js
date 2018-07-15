const dbConfig = require('./knexfile');
const knex = require('knex')(dbConfig);

knex.on( 'query', function( queryData ) {
  console.log( queryData );
});

module.exports = {
  getLevel ({ slug }) {
    return knex('level').where({ slug: slug });
  },

  updatePlayed ({ id, played }) {
    return knex('level').where({ id: id }).update({ played: played });
  },

  updateWon ({ id, won }) {
    return knex('level').where({ id: id }).update({ won: won });
  }
};
