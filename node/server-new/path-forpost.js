const path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
access = promisify(fs.access),
readdir = promisify(fs.readdir),
readFile = promisify(fs.readFile),
express = require('express'),
build_index = require('./build-index.js'),
router = express.Router(),
DIR_ROOT = path.join(__dirname, '../..');

router.get('/forpost', function (req, res) {
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
router.get(/\/forpost\/([\s\S]*?)/, function (req, res) {
    let arr = req.url.replace(/\/forpost\/([\s\S]*?)/, '').split('/');
    arr = arr.reduce((acc, str)=>{
        if(str != ''){
           acc.push(str);
        }
        return acc;
    }, []);
    const DIR = path.join(DIR_ROOT, 'views', req.url);
    // do we need to build an index for a for post folder?
    if (arr.length === 1) {
        build_index({
            DIR_ROOT: DIR_ROOT,
            source: 'forpost/' + arr[0]
        })
        .then((links) => {
            let text = '';
            readFile( path.join(DIR, 'README.md') )
            .then((md)=>{
                text = md;
            })
            .catch(()=>{
                text = 'no read me file for this for post folder.'
            })
            .then(()=>{
                res.render('index', {
                    page: 'forpost_index',
                    links: links,
                    text: text
                });
            })
        })
        return;
    }
    // do we need to render a for post page for a given demo?
    if (arr.length === 2) {
        // check for an index file and render the for post page if there is one
        access( path.join(DIR, 'index.ejs') )
        .then(()=>{
            res.render('index', {
                page: 'forpost',
                arr: arr,
                DIR: DIR,
                folderName: arr[0]
            });
        })
        // catch happend when trying to get an index.ejs
        .catch(() => {
            return readdir(DIR)
           .then((items)=>{
                res.render('index', {
                    page: 'noindex',
                    arr: arr,
                    DIR: DIR,
                    URL: req.url,
                    items: items,
                    folderName: arr[0]
                });
            });
        })
        return;
    }
    // if we some how make it here, end the request
    res.end();
});


module.exports = router;