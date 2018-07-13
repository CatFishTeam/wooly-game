const dbConfig = require('./knexfile');
const knex = require('knex')(dbConfig);
const fs = require('fs');

knex.on( 'query', function( queryData ) {
  console.log( queryData );
});

module.exports = {
  createLevel ({ user_id, slug, name, data, best, played, won, created_at, updated_at, screenshot }) {
    console.log(`Add the level ${name}`);

    let base64Data = screenshot.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("src/assets/screenshots/" + slug + ".png", base64Data, 'base64', function(err) {
      console.log(err);
    });

    return knex('level').insert({
      user_id,
      slug,
      name,
      data,
      best,
      played,
      won,
      created_at,
      updated_at,
      screenshot
    })
  }
};
