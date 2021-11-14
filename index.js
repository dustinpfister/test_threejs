
// node.js modules
let path = require('path'),
klaw = require('klaw'),
through2 = require('through2'),

// from npm
express = require('express'),

// heroku/local friendly port variable
port = process.env.PORT || process.argv[2] || 8030,

// patterns
//pat_jsfile = /\/js\/[\s\S]+\.js/,

// create the express app instance
app = express();

// build an index of links to folders
let buildIndex = function (opt) {
    opt = opt || {};
    opt.source = opt.source || 'demos';
    let uri = path.join(__dirname, 'views/' + opt.source);
    opt.through2 = opt.through2 || through2.obj(function (item, enc, next) {
            if (item.path != uri) {
                if (item.stats.isDirectory()) {
                    this.push(item);
                }
            }
            next()
        });
    // return a promise
    return new Promise(function (resolve, reject) {
        let links = [];
        klaw(uri, {
            depthLimit: 0
        })
        .pipe(opt.through2)
        .on('data', function (item) {
            let folderName = path.basename(item.path);
            // folder follows r\d+ pattern
            //if (folderName.match(/r\d+/)) {
            links.push({
                href: path.join('/', opt.source, folderName),
                name: folderName
            });
            //}
        })
        .on('end', function () {
            resolve(links);
        });
    });
};

let serveAllFiles = function(fileExt){
    let router = express.Router(),
    //patt = /[\s\S]+\.jpeg/;
    patt = new RegExp('[\\s\\S]+\\.' + fileExt);
    router.get(patt, function (req, res) {
        res.sendFile(path.join(__dirname, 'views', req.url));
    });
    return router;
};

// using ejs for a template engine
app.set('view engine', 'ejs');

// root path
app.get('/', function (req, res) {
    res.render('index', {
        page: 'main'
    });
});

// SERVE ALL FILES (this should serve any files in the views path with the set extentions)

// text
app.use(serveAllFiles('js'));
app.use(serveAllFiles('json'));
app.use(serveAllFiles('css'));
app.use(serveAllFiles('dae'));

// image files
app.use(serveAllFiles('jpg'));
app.use(serveAllFiles('jpeg'));
app.use(serveAllFiles('png'));

// DEMO PATH

// demo index
app.get('/demos', function (req, res) {
    buildIndex().then(function (links) {
        res.render('index', {
            page: 'demo_index',
            links: links
        });
    });
});

// demos list for a given revision
// ( /demos/r[revisionNumber] )
app.get(/(\/demos\/r\d{1,3})$/, function (req, res) {
    let r = 91,
    m = req.url.match(/r\d{1,3}/);
    if (m) {
        r = m[0].split('r')[1];
    }
    buildIndex({
        source: 'demos/r' + r
    }).then(function (links) {
        res.render('index', {
            page: 'demo_index',
            links: links
        });
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
        r: r,
        demoName: req.url.replace(/\/demos\/r\d{1,3}/, '').replace(/\//, '').split('/')[0]
    });
});


// SPRITE SHEETS PATH

// the main /videos index page
app.get('/sprite-sheets', function (req, res) {
    buildIndex({
        source: 'sprite-sheets'
    }).then(function (links) {
        res.render('index', {
            page: 'sprite_sheets_index',
            links: links
        });
    });
});

// if something like '/videos/the-hamster-wheel' or '/videos/the-hamster-wheel/'
// I will want to render an index of videos
app.get(/\/sprite-sheets\/([\s\S]*?)/, function (req, res) {
    let arr = req.url.replace(/\/sprite-sheets\/([\s\S]*?)/, '').split('/');

    if (arr.length === 1 || arr[1] === '') {
        res.render('index', {
            page: 'sprite_sheets',
            arr: arr,
            sheetName: arr[0]
        });
    } else {
        // the file is some other local resource such as a javaScript file
        let resource = path.join(__dirname, 'views', req.url);
        res.send(resource);
    }
});

// VIDEOS PATH

// the main /videos index page
app.get('/videos', function (req, res) {
    buildIndex({
        source: 'videos'
    }).then(function (links) {
        res.render('index', {
            page: 'videos_index',
            links: links
        });
    });
});

// if something like '/videos/the-hamster-wheel' or '/videos/the-hamster-wheel/'
// I will want to render an index of videos
app.get(/\/videos\/([\s\S]*?)/, function (req, res) {
    let arr = req.url.replace(/\/videos\/([\s\S]*?)/, '').split('/');

    if (arr.length === 1 || arr[1] === '') {
        res.render('index', {
            page: 'video',
            arr: arr,
            videoName: arr[0]
        });
    } else {
        // the file is some other local resource such as a javaScript file
        let resource = path.join(__dirname, 'views', req.url);
        res.send(resource);
    }
});

// FORPOST PATH

// the main /videos index page
app.get('/forpost', function (req, res) {
    buildIndex({
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
    let arr = req.url.replace(/\/forpost\/([\s\S]*?)/, '').split('/');
    // render an index.ejs for a given section folder
    // ( /views/forpost/threejs-examples-tree/basic/index.ejs )
    if (arr.length === 2 || arr[2] === '') {
        res.render('index', {
            page: 'forpost',
            arr: arr,
            folderName: arr[0]
        });
    } else {
        // build an index of section folders if we have something like
        // /views/forpost/threejs-examples-tree
        if (arr.length === 1 || arr[1] === '') {
            buildIndex({
                source: 'forpost/' + arr[0]
            }).then(function (links) {
                res.render('index', {
                    page: 'forpost_index',
                    links: links
                });
            });
        }else{
            // the url should then just be some other local resource 
            // assume that is the case and just send the file
            let resource = path.join(__dirname, 'views', req.url);
            res.send(resource);
        }
    }
});

app.listen(port, function () {
    console.log('test_threejs demo site is up at port : ' + port);
});
