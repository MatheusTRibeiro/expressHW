// require all dependencies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// allow PORT to be set by heroku

var PORT = process.env.PORT || 8080;

// initiliaze our app
var app = express();
// set the app to use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// set the app to have access to our static files within the public folder
app.use(express.static('app/public'));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function(){
	console.log("App is listening on PORT " + PORT);
})
