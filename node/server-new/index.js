#!/usr/bin/env node
//-------- ----------
// MODULES
//-------- ----------
const path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
access = promisify(fs.access),
readdir = promisify(fs.readdir),
readFile = promisify(fs.readFile),
express = require('express'),
build_index = require('./build-index.js');
//-------- ----------
// CONST VALUES
//-------- ----------
const DIR_ROOT = path.join(__dirname, '../..');
const PORT = process.env.PORT || process.argv[2] || 8030;
//-------- ----------
// CREATE EXPRESS APP
//-------- ----------
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(DIR_ROOT, 'views') );
// paths
app.use('/', express.static( path.join(DIR_ROOT, 'views'), {index: false} ) );
app.use(require('./path-demo.js'));
app.use(require('./path-forpost.js'));
app.get('/', function (req, res) {
    res.render('index', {
        page: 'main'
    });
});
//-------- ----------
// LISTEN
//-------- ----------
app.listen(PORT, function () {
    console.log('server_new for test_threejs site is up at port : ' + PORT);
});

