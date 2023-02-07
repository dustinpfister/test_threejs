#!/usr/bin/env node
//-------- ----------
// MODULES
//-------- ----------
const path = require('path'),
fs = require('fs'),
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
app.use('/', express.static( path.join(DIR_ROOT, 'views'), {index: false} ) );
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
// FORPOST PATH
//-------- ----------
// the main /videos index page
app.get('/forpost', function (req, res) {
    build_index({
        DIR_ROOT: DIR_ROOT,
        source: 'forpost'
    }).then(function (links) {
        res.render('index', {
            page: 'forpost_index',
            links: links
        });
    });
});

// render local index.ejs file, or send local resource
app.get(/\/forpost\/([\s\S]*?)/, function (req, res) {
    const arr = req.url.replace(/\/forpost\/([\s\S]*?)/, '').split('/');
    const DIR = path.join(DIR_ROOT, req.url);
    // do we need to build an index?
    if (arr.length === 1 || arr[1] === '') {
        build_index({
            DIR_ROOT: DIR_ROOT,
            source: 'forpost/' + arr[0]
        }).then(function (links) {
            res.render('index', {
                page: 'forpost_index',
                links: links
            });
        });
       return;
   }
   // do we need to render a for post page?
   if (arr.length === 2 || arr[2] === '') {
       // check for an index file and render the for post page if there is one
       fs.access(path.join(DIR, 'index.ejs'), (e) => {
           if(e){
               res.send('no index.ejs file for: ' + DIR)
           }else{
               res.render('index', {
                   page: 'forpost',
                   arr: arr,
                   folderName: arr[0]
               });
           }
      });
   }
   // if we some how make it here, end the request
   res.end();
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

