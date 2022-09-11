// SVG LOAD demo using THREE.BufferGeometryUtils.mergeBufferGeometries
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create an array of shape geometry from SVG data loaded with the SVGLoader
    const createShapeGeosFromSVG = (data) => {
        const paths = data.paths;
        const geoArray = [];
        for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[ i ];
            // create a shape
            const shapes = THREE.SVGLoader.createShapes( path );
            // for each shape create a mesh and add it to the group
            for ( let j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                geoArray.push( new THREE.ShapeGeometry( shape ) );
            }
        }
        return geoArray;
    };
    // create mesh group from SVG
    const createMeshGroupFromSVG = (data) => {
        const geoArray = createShapeGeosFromSVG(data);
        const group = new THREE.Group();
        geoArray.forEach( (geo, i) => {
            // each mesh gets its own material
            const material = new THREE.MeshBasicMaterial( {
                color: data.paths[i].color, // using paths data for color
                side: THREE.DoubleSide,
                depthWrite: false
            });
            const mesh = new THREE.Mesh( geo, material );
            group.add(mesh);
        });
        return group;
    };
    // create a single mesh from SVG data
    const createGeoFromSVG = (data) => {
        const geoArray = createShapeGeosFromSVG(data)
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
    // CONTROL
    //-------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //-------- ----------
    // LOOP
    //-------- ----------
    let fps = 30,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/demos/r140/svg-loader-1/svg/fff.svg',
        // called when the resource is loaded
        function ( data ) {
            // create a single geo
            const geo = createGeoFromSVG(data);
            geo.center();
            geo.rotateX(Math.PI * 1);
            geo.scale(0.025, 0.025, 0.025);
            // create a
            const mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
            scene.add(mesh);
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
