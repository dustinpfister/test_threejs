// Basic load SVG DEMO
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
 
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
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
        '/demos/r140/proto-svg-movement/svg/move1.svg',
        // called when the resource is loaded
        function ( data ) {
            data.paths.forEach((path)=>{
                const points = path.subPaths[0].getPoints();
                console.log(points);
            });
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
