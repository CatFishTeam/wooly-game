const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/level/:slug', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/getLevel/:slug', (req, res) => {
  store
    .getLevel({ slug: req.params.slug })
    .then((level) => {
      res.send(level)
    });
});
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
});
