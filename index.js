
// node.js modules
let path = require('path'),
klaw = require('klaw'),
through2 = require('through2'),

// from npm
express = require('express'),

// heroku/local friendly port variable
port = process.env.PORT || process.argv[2] || 3000,

// patterns
//pat_jsfile = /\/js\/[\s\S]+\.js/,

// create the express app instance
app = express();

// using ejs for a template engine
app.set('view engine', 'ejs');

// root path
app.get('/', function (req, res) {

    res.render('index', {
        page: 'main'
    });

});

app.get(/\/css\/[\s\S]+\.css/, function (req, res) {

    res.sendFile(path.join(__dirname, 'views', req.url));

});

// javaScript file path
app.get(/\/js\/[\s\S]+\.js/, function (req, res) {

    res.sendFile(path.join(__dirname, 'views', req.url));

});

// demo index
app.get('/demos', function(req,res){

    res.render('index', {
        page: 'demo_index'
    });

});

// demos list for a given revision
// ( /demos/r[revisionNumber] )
app.get(/(\/demos\/r\d{1,3})$/, function (req, res) {


       res.render('index', {
        page: 'demo_index'
    });

});

// demos paths for a given demo
// ( /demos/r[revisionNumber]/[demoName] )
app.get(/\/demos\/r\d{1,3}/, function (req, res) {

    let r = 91,
    m = req.url.match(/r\d{1,3}/);

    if (m) {

        r = m[0].split('r')[1];

    }

    res.render('index', {
        page: 'demo',
        r: r
    });

});

app.listen(port, function () {

    console.log('test_threejs demo site is up at port : ' + port);

});
