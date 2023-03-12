// svg-tools.js - r0 - r146 prototype
(function(api){


/*
const shapes = THREE.SVGLoader.createShapes( data.paths[0] );
const geo = new THREE.ShapeGeometry(shapes[0]);

geo.rotateZ(Math.PI * 1)
geo.rotateY(Math.PI * 0)
geo.scale(0.05, 0.05, 0.05);
geo.translate(1.5, 1.5, 0)

const mesh = new THREE.Mesh(geo);
scene.add(mesh);
*/

    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // what to do for each SVG file that loads
    const onFileLoaded = (opt_load, resolve, reject) => {
        const scene = opt_load.scene;
        return (data) => {
            console.log('SVG data loaded');
            console.log(data);
            const shapes = THREE.SVGLoader.createShapes( data.paths[0] );
            const geo = new THREE.ShapeGeometry(shapes[0]);
            geo.rotateZ(Math.PI * 1)
            geo.rotateY(Math.PI * 0)
            geo.scale(0.05, 0.05, 0.05);
            geo.translate(1.5, 1.5, 0)
            const mesh = new THREE.Mesh(geo);
            scene.add(mesh);
        }
    };
    // main public load method
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
            ( xhr ) => { // progress
            },
            ( error ) => { // error
                    reject(error);
                }
            );
        });
    }

}( this['SVGTools'] = {} ));