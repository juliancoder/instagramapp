// Creating a HTTP server through Express Framework --------------

// 1. Grabbing the modules we need ...
var express = require('express');                       // Express Framework
var app = express();                                    // Initiates the app through Express
var ig = require('instagram-node').instagram();        //  Instagram modules

var serverPortNumber = 8885;

// 2. Configuring the app ...
app.use(express.static(__dirname + '/public'));         // Tells NodeJS where to look for site resources (CSS, JS, images ...)
app.set('view engine', 'ejs');                          // Set the template engine for views to ejs

// 3. Configuring Instagram app with client_id and client_secret from our Instagram user account ...
ig.use({
  client_id: '6314f1d969c4405ab17c9f53d40894f4',
  client_secret: 'e7d0ec116db14b92bb583cf2a8ff6b18'
});


// 4. Set the application routes ...

// In Homepage route we'll show the popular images
app.get('/', function(req, res) {

  // Now we use the Instagram module to get popular media ...
  // The "medias" object contains (in JSON format) all the data we saw in the Instagram API Explorer (https://api.instagram.com/v1/media/popular?client_id=6314f1d969c4405ab17c9f53d40894f4 --> in apigee.com)
  ig.media_popular(function(err, medias, remaining, limit) {
    // Render the Homepage and pass in the popular images ("medias" parameter)
    res.render('pages/index', {grams: medias});               // By default, Express and EJS will look in the 'views' subfolder so we don't need to specify it in the route ...
  });
});

// 5. Start the HTTP server ...
app.listen(serverPortNumber);
console.log('Instragram APP started! Please go to http://localhost:' + serverPortNumber);
