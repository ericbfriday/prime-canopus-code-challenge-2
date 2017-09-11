var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var catData = {
  cats: []
};

app.use(express.static('assignment/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @TODO: Write a route that responds to GET /cats by sending the catData object
 * (defined above)
 */

app.get('/cats', function(req, res) {
  console.log('Inside server.js - Getting cats');
  res.status(201).send(catData) //.sendStatus(201);
});

/**
 * @TODO: Write a route that responds to POST /cats by adding a new cat object
 * to the cats array in the catData object (defined above)
 */

 app.post('/cats', function( req, res  ) {
  console.log('inside server.js/cats - logging req.body.name/age');
  console.log(req.body.name);
  console.log(req.body.age);
  
  var cat = {
    name: req.body.name,
    age: req.body.age
  };
  console.log('logging var cat inside app.post /cats: ', cat);
  
  (catData.cats).push(cat);
  console.log('inside server.js - logging catData after push: ', catData);
 });

// *****************Don't touch below***************************
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function () {
  console.log('server listening for requests on port:', server.address().port);
  console.log('press control+c to quit');
});

module.exports = server;