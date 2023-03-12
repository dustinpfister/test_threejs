// svg-tools.js - r0 - r146 prototype
(function(api){
    //-------- ----------
    // HELPERS - internal helper funcitons used by the public api, and other built in features
    //-------- ----------
    // what to do for each SVG file that loads
    const onFileLoaded = (url, i_url, loader, opt_load, resolve, reject) => {
        const scene = opt_load.scene;
        return (data) => {
            console.log('file loaded **********');
            console.log(url);
            console.log('paths: ' + data.paths.length);
            console.log('**********************');
            opt_load.processor(opt_load, data, i_url, url);
        }
    };
    // on file progress and error methods
    const onFileProgress = (url, i_url, loader, opt_load, resolve, reject) => {
        return (xhr) => {
        };
    };
    const onFileError = (url, i_url, loader, opt_load, resolve, reject) => {
        return (error) => {
            reject(error);
        };
    };
    //-------- ----------
    // PROCESSORS - hard coded options for functions that are used to procress SVG data and add objects to a scene
    //-------- ----------
    const SVG_PROCESSOR = {};
    // extrude
    SVG_PROCESSOR.extrude = (opt_load, data, i_url, url) => {
        let pi = 0;
        while(pi < data.paths.length){
            const shapes = THREE.SVGLoader.createShapes( data.paths[pi] );
            let si = 0;
            while(si < shapes.length){
                const geo = new THREE.ExtrudeGeometry(shapes[si], opt_load.opt_extrude || { depth: 1 } );
                const mesh = new THREE.Mesh(geo, opt_load.material || new THREE.MeshNormalMaterial());
                //mesh.position.z = 50 * i_url;
                opt_load.scene.add(mesh);
                si += 1;
            }
            pi += 1;
        }
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.load = (opt_load) => {
        opt_load = opt_load || {};
        opt_load.urls = opt_load.urls || [];
        opt_load.scene = opt_load.scene || new THREE.Scene();
        opt_load.processor = opt_load.processor || SVG_PROCESSOR.extrude;
        if(typeof opt_load.processor === 'string'){
            opt_load.processor = SVG_PROCESSOR[opt_load.processor];
        }

        // return a promise
        return new Promise((resolve, reject)=>{
            // loading manager
            const loading_manager = new THREE.LoadingManager();
            loading_manager.onLoad = () => {
                console.log('All Files loaded.');
                resolve(opt_load)
            };
            let i_url = 0;
            const len_url = opt_load.urls.length;
            while(i_url < len_url){
                // svg loader instance a loader
                const loader = new THREE.SVGLoader(loading_manager);
                // load a SVG resource
                const url = opt_load.urls[i_url];
                loader.load(
                    url,
                    onFileLoaded(url, i_url, loader, opt_load, resolve, reject),
                    onFileProgress(url, i_url, loader, opt_load, resolve, reject),
                    onFileError(url, i_url, loader, opt_load, resolve, reject)
                );
                i_url += 1;
            }
        });
    }

}( this['SVGTools'] = {} ));