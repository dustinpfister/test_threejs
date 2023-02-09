let path = require('path'),
klaw = require('klaw'),
through2 = require('through2');
// build an index of links to folders
const build_index = function (opt) {
    opt = opt || {};
    opt.source = opt.source || 'demos';
    opt.DIR_ROOT = opt.DIR_ROOT || __dirname;
    let uri = path.join(opt.DIR_ROOT, 'views/' + opt.source);
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
        .on('error', (e) => {
            reject(e)
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
module.exports = build_index;