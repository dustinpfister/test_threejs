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
// for any get request to /forport path...
router.get(/\/forpost\/([\s\S]*?)/, [
    // if we have ['forpost'] then render a forpost_index page for all for post folders
    (req, res, next) => {
        const arr = req.url.split('/').filter( n => n );
        //console.log(req.url);
        //console.log(arr)
        if(arr.length === 1){
            build_index({
                DIR_ROOT: DIR_ROOT,
                source: 'forpost'
            })
            .then(function (links) {
                res.render('index', {
                    page: 'forpost_index',
                    links: links
                });
            });
        }else{
            next();
        }
    },
    // if we have ['forpost', 'threejs-alpha-map'] then render an index of all demos for that for post folder
    (req, res, next) => {
        const arr = req.url.split('/').filter( n => n );
        const DIR = path.join(DIR_ROOT, 'views', req.url);
        if(arr.length === 2){
            build_index({
                DIR_ROOT: DIR_ROOT,
                source: 'forpost/' + arr[1]
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
            });
        }else{
            next();
        }
    },
    // if we have ['forpost', 'threejs-alpha-map', 's1-1-basic'] check if there is an index.ejs, if so render the demo
    (req, res, next) => {
        const arr = req.url.split('/').filter( n => n );
        const DIR = path.join(DIR_ROOT, 'views', req.url);
        const folderName = arr[1];
        const demoName = arr[2];
        // do we need to render a for post page for a given demo?
        if (arr.length === 3) {
            // check for an index file and render the for post page if there is one
            access( path.join(DIR, 'index.ejs') )
            .then(()=>{
                res.render('index', {
                    page: 'forpost',
                    //arr: arr,
                    DIR: DIR,
                    folderName: folderName,
                    demoName: demoName
                });
            })
            // catch happend when trying to get an index.ejs
            .catch(() => {
                return readdir(DIR)
               .then((items)=>{
                    res.render('index', {
                        page: 'noindex',
                        //arr: arr,
                        DIR: DIR,
                        URL: req.url,
                        items: items,
                        folderName: folderName,
                        demoName: demoName
                    });
                });
            })
            return;
        }
        // if we some how make it here, end the request
        res.end();
}]);
// export
module.exports = router;