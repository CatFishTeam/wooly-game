const dbConfig = require('./knexfile');
const knex = require('knex')(dbConfig);

knex.on( 'query', function( queryData ) {
  console.log( queryData );
});

module.exports = {
  getLevel ({ slug }) {
    return knex('level').where({ slug: slug });
  }
};
