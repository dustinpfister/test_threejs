// sample_alphas.js - r0 - from threejs-examples-audio-sample-alphas
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    const htmlStringToDOM = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };
    // create a sample object for the given html string
    const createSampleObj = (html, colNum) => {
        colNum = colNum === undefined ? 2 : colNum;
        const sampleObj = {
            raw: [],
            abs: [],
            maxABS: 0, maxRaw: 0, minRaw: 0
        };
        const doc = htmlStringToDOM(html);
        const nodes = doc.querySelectorAll('tr');
        const len = nodes.length;
        let i = 1;
        while(i < len){
            let a1 = parseFloat(nodes[i].children[colNum].textContent);
            sampleObj.raw.push(a1);
            sampleObj.abs.push( Math.abs(a1) );
            i += 1;
        }
        sampleObj.maxRaw = Math.max.apply(null, sampleObj.raw);
        sampleObj.minRaw = Math.min.apply(null, sampleObj.raw);
        sampleObj.maxABS = Math.max.apply(null, sampleObj.abs);
        return sampleObj;
    };
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
        opt.colNum = opt.colNum === undefined ? 2 : opt.colNum;
        opt.keyer = opt.keyer || function(url, html){
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
                    // KEY IN THE SAMPLE OBJECT
                    const key = opt.keyer(url, html);
                    files[key] = createSampleObj(html, opt.colNum);
                });
            });
        });
    };
    //-------- ----------
    // Get method
    //-------- ----------
    // return a sample alpha value ( 0 - 1 ) for a given alpha value ( 0 - 1 )
    // for the given result object and sample key
    api.getByAlpha = (result, key, alpha) => {
        const sampleObj = result[key];
        const absNum = sampleObj.abs[ Math.round( ( sampleObj.abs.length - 1) * alpha) ];
        return absNum / sampleObj.maxABS;
    };
    // get an array of alpha values for the given result object and key. The count value
    // will then be the number of elements in the array
    api.getArray = (result, key, count) => {
        count = count === undefined ? 10 : count;
        let i = 0;
        const alphas = [];
        while(i < count){
           alphas.push( sampleAlpha.getByAlpha(result, key, i / ( count - 1) ) );
           i += 1;
        }
        return alphas
    };
}( this['sampleAlpha'] = {} ));