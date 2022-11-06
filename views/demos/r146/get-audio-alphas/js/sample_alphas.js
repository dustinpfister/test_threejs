// sample_alphas.js - r0 - protoype 
(function(api){
    //-------- ----------
    // MANAGER
    //-------- ----------
    const createLoadingManager = (onDone, onError) => {
        const manager = new THREE.LoadingManager();
        // done
        manager.onLoad = function ( ) { onDone(); };
        // ERROR
        manager.onError = function ( url ) { onError(url); };
        return manager;
    };
    //-------- ----------
    // MAIN LOAD PUBLIC METHOD
    //-------- ----------
    api.load = function(opt){
        opt = opt || {};
        opt.URLS_BASE = opt.URLS_BASE || '';
        opt.URLS = opt.URLS || [];
        opt.keyer = opt.keyer || function(url, html, doc){
            const file_name = url.split('/').pop().split('.')[0];
            return file_name;
        };
        const files = {};
        // return a promise
        return new Promise(function(resolve, reject){
            const manager = createLoadingManager(
                () => {
                    resolve(files);
                },
                (url) => {
                    reject(url);
                }
            );
            const loader = new THREE.FileLoader(manager);
            opt.URLS.forEach((url) => {
                // set base url path
                loader.setPath(opt.URLS_BASE);
                // load files from base
                loader.load(url, (html) => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");
console.log(doc);


var nodes = doc.querySelectorAll('tr');
var len = nodes.length;

var alphas = [];
var i = 1;
while(i < len){
    var a1 = parseFloat(nodes[i].children[2].textContent);
    var a2 = (1 + a1) / 2
    alphas.push(a2);
    i += 1;
}
console.log(JSON.stringify(alphas));

                    const key = opt.keyer(url, html, doc);
                    files[key] = html;
                });
            });
        });
    };

}( this['sampleAlpha'] = {} ));