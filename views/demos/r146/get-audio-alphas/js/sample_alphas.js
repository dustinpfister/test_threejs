// sample_alphas.js - r0 - protoype 
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    const htmlStringToDOM = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };
    // create a sample object for the given html string
    const createSampleObj = (html) => {
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
            let a1 = parseFloat(nodes[i].children[2].textContent);
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
                    files[key] = createSampleObj(html);
                });
            });
        });
    };
    //-------- ----------
    // get method
    //-------- ----------
    // return a sample alpha value ( 0 - 1 ) for a given alpha value ( 0 - 1 )
    // for the given result object and sample key
    api.getByAlpha = (result, key, alpha) => {
        const sampleObj = result[key];
        const absNum = sampleObj.abs[ Math.round( ( sampleObj.abs.length - 1) * alpha) ];
        return absNum / sampleObj.maxABS;
    };
}( this['sampleAlpha'] = {} ));