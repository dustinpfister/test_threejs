
// node.js modules
let path = require('path'),

// from npm
express = require('express'),

// heroku/local friendly port variable
port = process.env.PORT || process.argv[2] || 3000,

// patterns
pat_jsfile = /\/js\/[\s\S]+\.js/,

// create the express app instance
app = express();

// using ejs for a template engine
app.set('view engine', 'ejs');

// root path
app.get('/', function (req, res) {

    res.render('index', {
        port: port
    });

});

// javaScript file path
app.get(pat_jsfile, function (req, res) {

    let url = path.join(__dirname, 'views', req.url);

    res.sendFile(url);

});

app.listen(port, function () {

    console.log('test_threejs demo site is up at port : ' + port);

});
