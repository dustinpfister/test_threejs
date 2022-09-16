// SVG LOAD demo using THREE.BufferGeometryUtils.mergeBufferGeometries
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(10, 10, 10);
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
                geoArray.push( new THREE.ShapeGeometry( shape, 16 ) );
            }
        }
        return geoArray;
    };
    // create a single mesh from SVG data
    const createGeoFromSVG = (data, si, ei) => {
        const geoArray = createShapeGeosFromSVG(data, si, ei)
        const geo = THREE.BufferGeometryUtils.mergeBufferGeometries(geoArray);
        return geo;
    };
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff2.svg',
        // called when the resource is loaded
        function ( data ) {
            // create a single geo
            const geo = createGeoFromSVG(data, 1);
            geo.center();
            geo.scale(0.1, 0.1, 0.1);
            // create a
            const mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
            scene.add(mesh);
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
