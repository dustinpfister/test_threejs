// svg-tools.js - r0 - r146 prototype
(function(api){
    //-------- ----------
    // PROCESSORS - hard coded options for functions that are used to procress SVG data and add objects to a scene
    //-------- ----------
    
    //-------- ----------
    // HELPERS - internal helper funcitons used by the public api
    //-------- ----------
    // what to do for each SVG file that loads
    const onFileLoaded = (opt_load, resolve, reject) => {
        const scene = opt_load.scene;
        return (data) => {
            console.log('SVG data loaded');
            console.log(data);
            const shapes = THREE.SVGLoader.createShapes( data.paths[0] );
            const geo = new THREE.ExtrudeGeometry(shapes[0], {depth: 10});
            //geo.rotateZ(Math.PI * 1);
            //geo.rotateY(Math.PI * 0);
            //geo.translate(32, 32, -5)
            //geo.scale(0.05, 0.05, 0.05);
            const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
            scene.add(mesh);
            resolve(opt_load)
        }
    };
    // on file progress and error methods
    const onFileProgress = (opt_load, resolve, reject) => {
        return (xhr) => {
        };
    };
    const onFileError = (opt_load, resolve, reject) => {
        return (error) => {
            reject(error);
        };
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.load = (opt_load) => {
        opt_load = opt_load || {};
        opt_load.urls = opt_load.urls || [];
        opt_load.scene = opt_load.scene || new THREE.Scene()
        // return a promise
        return new Promise((resolve, reject)=>{
            // svg loader instance a loader
            const loader = new THREE.SVGLoader();
            // load a SVG resource
            loader.load(
                opt_load.urls[0],
                onFileLoaded(opt_load, resolve, reject),
                onFileProgress(opt_load, resolve, reject),
                onFileError(opt_load, resolve, reject)
            );
        });
    }

}( this['SVGTools'] = {} ));