// list-loader.js - r0 - from threejs-examples-uvmap-cube-canvas-update
(function (api) {
    //-------- ----------
    // MANAGER
    //-------- ----------
    const createLoadingManager = (onDone, onError) => {
        const manager = new THREE.LoadingManager();
        // done
        manager.onLoad = function ( ) {
            onDone();
        };
        // ERROR
        manager.onError = function ( url ) {
            onError(url);
        };
        return manager;
    };
    //-------- ----------
    // TEXTURE LOADER
    //-------- ----------
    api.load = (opt) => {
        opt = opt || {};
        opt.URLS_BASE = opt.URLS_BASE || '';
        opt.URLS = opt.URLS || [];
        opt.onDone = opt;
        const textureObj = {};
        return new Promise(function(resolve, reject){
            const manager = createLoadingManager(
                () => {
                    resolve(textureObj);
                },
                (url) => {
                    reject(url);
                }
            );
            const loader = new THREE.TextureLoader(manager);
            opt.URLS.forEach((url) => {
                // set base utl path
                loader.setPath(opt.URLS_BASE);
                // load files from base
                loader.load(url, (texture) => {
                    // get file name from url
                    const file_name = url.split('/').pop().split('.')[0];
                    // keying the textureObj by using file name as the key
                    textureObj[file_name] = texture;
                });
            });
        });
    };
}( this['listLoader'] = {} ));