// sample_alphas.js - r0 - protoype 
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    const htmlStringToDOM = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };
    // get the raw numbers from the html string
    const getRawNumbers = (html) => {
        const doc = htmlStringToDOM(html);
        const nodes = doc.querySelectorAll('tr');
        const len = nodes.length;
        const alphas = [];
        let i = 1;
        while(i < len){
            let a1 = parseFloat(nodes[i].children[2].textContent);
            alphas.push(a1);
            i += 1;
        }
        return alphas;
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
                    const raw = getRawNumbers(html);
                    const key = opt.keyer(url, html);
                    // create sample OBJ for the key
                    files[key] = {
                        maxN: Math.max.apply(null, raw),
                        raw: raw
                    }
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
        const rawNum = sampleObj.raw[ Math.round( ( sampleObj.raw.length - 1) * alpha) ];
        return ( rawNum + 1 ) / ( sampleObj.maxN + 1 );
    };
}( this['sampleAlpha'] = {} ));