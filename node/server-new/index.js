#!/usr/bin/env node
//-------- ----------
// MODULES
//-------- ----------
const path = require('path'),
//klaw = require('klaw'),
//through2 = require('through2'),
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
//-------- ----------
// STATIC FOLDERS
//-------- ----------
app.use('/', express.static( path.join(DIR_ROOT, 'views') ) );
//-------- ----------
// DEMOS PATH
//-------- ----------
app.get('/demos', function (req, res) {
    build_index({ source: 'demos', DIR_ROOT: DIR_ROOT})
    .then(function (links) {
        res.render('index', {
            page: 'demo_index',
            links: links
        });
    });
});
// demos paths for a given demo
// ( /demos/r[revisionNumber]/[demoName] )
app.get(/\/demos\/r\d{1,3}/, function (req, res) {
    let r = 146;
    let m = req.url.match(/r\d{1,3}/);
    if (m) {
        r = m[0].split('r')[1];
    }
    const demoName = req.url.replace(/\/demos\/r\d{1,3}/, '').replace(/\//, '').split('/')[0];
    // if we have a demo name render that page
    if(demoName){
        res.render('index', {
            page: 'demo',
            r: r,
            demoName: demoName
        });
        return;
    }
    // if we get this far built an index for the r number
    build_index({
        DIR_ROOT: DIR_ROOT,
        source: 'demos/r' + r
    }).then(function (links) {
        res.render('index', {
            page: 'demo_index',
            r: r,
            links: links
        });
    });
});
//-------- ----------
// ROOT PATH
//-------- ----------
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

