// svg-tools.js - r0 - r146 prototype
(function(api){
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    const DEFAULT_LOAD_OPTIONS = {
        urls: [],
        processor: 'extrude',
        scene: new THREE.Scene(),
        opt_extrude: { depth: 1 },
        material: new THREE.MeshNormalMaterial()
    };
    //-------- ----------
    // HELPERS - internal helper funcitons used by the public api, and other built in features
    //-------- ----------
    // what to do for each SVG file that loads
    const onFileLoaded = (url, i_url, loader, st, resolve, reject) => {
        const scene = st.scene;
        return (data) => {
            console.log('file loaded **********');
            console.log(url);
            console.log('paths: ' + data.paths.length);
            console.log('**********************');
            st.processor(st, data, i_url, url);
        }
    };
    // on file progress and error methods
    const onFileProgress = (url, i_url, loader, st, resolve, reject) => {
        return (xhr) => {
        };
    };
    const onFileError = (url, i_url, loader, st, resolve, reject) => {
        return (error) => {
            reject(error);
        };
    };
    //-------- ----------
    // PROCESSORS - hard coded options for functions that are used to procress SVG data and add objects to a scene
    //-------- ----------
    const SVG_PROCESSOR = {};
    // extrude
    SVG_PROCESSOR.extrude = (st, data, i_url, url) => {
        let pi = 0;
        while(pi < data.paths.length){
            const shapes = THREE.SVGLoader.createShapes( data.paths[pi] );
            let si = 0;
            while(si < shapes.length){
                const geo = new THREE.ExtrudeGeometry(shapes[si], st.opt_extrude || { depth: 1 } );
                const mesh = new THREE.Mesh(geo, st.material || new THREE.MeshNormalMaterial());
                //mesh.position.z = 50 * i_url;
                st.scene.add(mesh);
                si += 1;
            }
            pi += 1;
        }
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.load = (st) => {

        st = st || {};
        st.urls = st.urls || [];
        st.scene = st.scene || new THREE.Scene();
        st.processor = st.processor || SVG_PROCESSOR.extrude;

        if(typeof st.processor === 'string'){
            st.processor = SVG_PROCESSOR[st.processor];
        }

        // return a promise
        return new Promise((resolve, reject)=>{
            // loading manager
            const loading_manager = new THREE.LoadingManager();
            loading_manager.onLoad = () => {
                console.log('All Files loaded.');
                resolve(st)
            };
            let i_url = 0;
            const len_url = st.urls.length;
            while(i_url < len_url){
                // svg loader instance a loader
                const loader = new THREE.SVGLoader(loading_manager);
                // load a SVG resource
                const url = st.urls[i_url];
                loader.load(
                    url,
                    onFileLoaded(url, i_url, loader, st, resolve, reject),
                    onFileProgress(url, i_url, loader, st, resolve, reject),
                    onFileError(url, i_url, loader, st, resolve, reject)
                );
                i_url += 1;
            }
        });
    }

}( this['SVGTools'] = {} ));