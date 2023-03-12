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
        opt_shape: { depth: 1 },
        material: new THREE.MeshNormalMaterial()
    };
    //-------- ----------
    // HELPERS - internal helper funcitons used by the public api, and other built in features
    //-------- ----------
    // what to do for each SVG file that loads
    const onFileLoaded = (url, i_url, loader, st, resolve, reject) => {
        const scene = st.scene;
        return (data) => {
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
    // ST OBJECT API - an api that is acessible by way of the st object ( used in processor functions )
    //-------- ----------
    const st_api = {};
    // data to shape funciton so that I can quickly just start working with shape objects
    // when writing a new processor
    st_api.dataToShape = (data, forShape) => {
        forShape = forShape || function(){};
        let pi = 0;
        while(pi < data.paths.length){
            const shapes = THREE.SVGLoader.createShapes( data.paths[pi] );
            let si = 0;
            while(si < shapes.length){
                forShape(shapes[si], si, pi);
                si += 1;
            }
            pi += 1;
        }
    };
    //-------- ----------
    // PROCESSORS - hard coded options for functions that are used to procress SVG data and add objects to a scene
    //-------- ----------
    const SVG_PROCESSOR = {};
    // extrude
    SVG_PROCESSOR.extrude = (st, data, i_url, url) => {
        const svg_width = data.xml.width.baseVal.value;
        const svg_height = data.xml.height.baseVal.value;
        const depth = st.opt_extrude.depth;
        const count = st.urls.length;
        const sz = count * depth / 2 * -1;
        const a_data = i_url / count;
        st.dataToShape(data, (shape, si, pi) => {
            const geo = new THREE.ExtrudeGeometry(shape, st.opt_extrude);
            geo.translate(svg_width / 2 * -1, svg_height / 2 * -1, 0);
            const mesh = new THREE.Mesh(geo, st.material);
            mesh.position.z = sz + (count * depth) * a_data;
            st.scene.add(mesh);
        });
    };
    // shape
    SVG_PROCESSOR.shape = (st, data, i_url, url) => {
        st.dataToShape(data, (shape, si, pi) => {
            const geo = new THREE.ShapeGeometry(shape, st.opt_shape);
            const mesh = new THREE.Mesh(geo, st.material);
            st.scene.add(mesh);
        });
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.load = (opt) => {
        const st = Object.assign({}, DEFAULT_LOAD_OPTIONS, opt, st_api);
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