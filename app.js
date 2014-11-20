var express  = require('express'),
	app 			 = express(),
	router 		 = express.Router(),
	bodyParser = require('body-parser'),
	mongoose 	 = require('mongoose'),
	path 		   = require('path'),
	fs 				 = require('fs');

app.config = {};

fs.readdirSync(path.join(__dirname, 'config')).forEach(function (file) {
	require('./config/' + file)(app);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./')));

mongoose.connect(app.config.db);

app.get('/', function (req, res) {
	res.send("node || express || mongo");
})

app.listen(app.get('port'));