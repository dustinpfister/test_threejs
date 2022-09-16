// shape SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create an array of shape geometry from SVG data loaded with the SVGLoader
    const createShapeGeosFromSVG = (data, si, ei) => {
        si = si === undefined ? 0 : si;
        ei = ei === undefined ? data.paths.length: ei;
        const paths = data.paths.slice(si, data.paths.length);
        const geoArray = [];
        for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[ i ];
            // create a shape
            const shapes = THREE.SVGLoader.createShapes( path );
            // for each shape create a shape geometry and push it to the array
            for ( let j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                // when calling the THREE.ShapeGeometry constructor I pass the shape
                // and then if I want the curveSegments to be higher or lower than the
                // default ( 12 ) I can pass that as the second argument.
                geoArray.push( new THREE.ShapeGeometry( shape, 8 ) );
            }
        }
        return geoArray;
    };
    // create mesh group from SVG
    const createMeshGroupFromSVG = (data, si, ei) => {
        si = si === undefined ? 0 : si;
        ei = ei === undefined ? data.paths.length: ei;
        const geoArray = createShapeGeosFromSVG(data, si, ei);
        const group = new THREE.Group();
        geoArray.forEach( (geo, i) => {
            // each mesh gets its own material
            const material = new THREE.MeshBasicMaterial( {
                color: data.paths[si + i].color, // using paths data for color
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: false
            });
            const mesh = new THREE.Mesh( geo, material );
            group.add(mesh);
        });
        return group;
    };
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // starting a custom manager
    var manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log('manager start');
    };
    manager.onLoad = function ( ) {
        console.log('manager load');
        // render
        renderer.render(scene, camera);
    };
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log('manager progress: ' + itemsLoaded + '/' + itemsTotal);
    };
    manager.onError = function ( url ) {
        console.log('manager error');
    };
    // instance of a SVG loader
    const loader = new THREE.SVGLoader(manager);
    // load a SVG resource
    const loadSVG = (loader, url, name) => {
        loader.load(
            // resource URL
            url,
            // called when the resource is loaded
            ( data) => {
                const group = createMeshGroupFromSVG(data, 1);
                group.name = name;
                scene.add(group);
                console.log('svg loader: file ' + url + ' loaded ' );
            },
            // called when loading is in progresses
            ( xhr ) => {
                console.log( 'svg loader: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            ( error ) => {
                console.log( 'svg loader: an error happened' );
                console.log(error)
            }
        );
    };
    loadSVG(loader, '/forpost/threejs-svg-loader/svg/draft1.svg', 'draft1');
    loadSVG(loader, '/forpost/threejs-svg-loader/svg/fff2.svg', 'fff2');
}());
