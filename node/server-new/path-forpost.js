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
                    links: links,
                    text: ''
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
            const uri_folder_index = path.join(DIR, 'index.ejs');
            // check for an index file and render the for post page if there is one
            access( uri_folder_index )
            .then(()=>{
                res.render('index', {
                    page: 'forpost',
                    uri_folder_index:  uri_folder_index,
                    DIR: DIR,
                    folderName: folderName,
                    demoName: demoName
                });
            })
            // catch happend when trying to get an index.ejs
            .catch(() => {
                next();
            })
        }else{
            // we have somehting like /forpost/threejs-alpha-map/js/modules/foo/r0
            next();
        }
    },
    // we may have a folder that contains static files or somehting like that
    (req, res, next) => {
        const arr = req.url.split('/').filter( n => n );
        const DIR = path.join(DIR_ROOT, 'views', req.url);
        const folderName = arr[1];
        const demoName = arr[2];
        return readdir(DIR)
        .then((items)=>{
            res.render('index', {
                page: 'noindex',
                DIR: DIR,
                URL: req.url,
                items: items,
                folderName: folderName,
                demoName: demoName
           });
        })
        // error reading dir
        .catch(()=>{
            next();
        })
    },
    // if we make it here for some reason end the request
    (req, res, next) => {
        res.end();
    }
]);
// export
module.exports = router;