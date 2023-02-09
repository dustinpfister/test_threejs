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
        // user data object
        const DIR = path.join(DIR_ROOT, 'views', req.url);
        const arr = req.url.split('/').filter( n => n );
        res.userData = {
            page: 'main',
            folderName: arr[1] || '',
            demoName: arr[2] || '',
            links: [],
            items: [],
            text: '',
            arr: arr,
            URL : req.url,
            DIR : DIR,
            uri_folder_index: path.join(DIR, 'index.ejs')
        };
        if(res.userData.arr.length === 1){
            build_index({
                DIR_ROOT: DIR_ROOT,
                source: 'forpost'
            })
            .then(function (links) {
                // make a new object with res.userData, and whatever needs to override what is in there
                const data = Object.assign({}, res.userData, { page:'forpost_index', links: links });
                res.render('index', data);
            })
            .catch(() => {
                next();
            })
        }else{
            next();
        }
    },
    // if we have ['forpost', 'threejs-alpha-map'] then render an index of all demos for that for post folder
    (req, res, next) => {
        if(res.userData.arr.length === 2){
            build_index({
                DIR_ROOT: DIR_ROOT,
                source: 'forpost/' + res.userData.arr[1]
            })
            .then((links) => {
                let text = '';
                readFile( path.join(res.userData.DIR, 'README.md') )
                .then((md)=>{
                    text = md;
                })
                .catch(()=>{
                    text = 'no read me file for this for post folder.'
                })
                .then(()=>{
                    const data = Object.assign({}, res.userData, { page:'forpost_index', links: links, text: text });
                    res.render('index', data);
                })
            })
            // catch happend when trying to render an index
            .catch((e) => {
                next();
            });
        }else{
            next();
        }
    },
    // if we have ['forpost', 'threejs-alpha-map', 's1-1-basic'] check if there is an index.ejs, if so render the demo
    (req, res, next) => {
        // do we need to render a for post page for a given demo?
        if (res.userData.arr.length === 3) {
            // check for an index file and render the for post page if there is one
            access( res.userData.uri_folder_index )
            .then(()=>{
                // redner the forpost page
                const data = Object.assign({}, res.userData, { page:'forpost' });
                res.render('index', data);
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
        return readdir(res.userData.DIR)
        .then((items)=>{
            const data = Object.assign({}, res.userData, { page:'noindex', items: items });
            res.render('index', data);
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