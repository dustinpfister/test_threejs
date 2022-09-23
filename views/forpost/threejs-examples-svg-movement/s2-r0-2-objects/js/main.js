// Basic load SVG DEMO
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
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // mesh object to move
    let mesh1;
    // update
    const update = function(frame, frameMax){
        // calling set to alpha here
        SVGMove.setToAlpha(mesh1, frame / frameMax);

        SVGMove.setToAlpha(camera, frame / frameMax);

    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-examples-svg-movement/svg/obj1.svg',
        // called when the resource is loaded
        function ( data ) {
            // USE OBJECT METHOD SHOULD WORK WITH ANY OBJECT3D BASED OBJECT
            // SUCH AS A CAMERA
            SVGMove.useObj(data, 'cam1', camera);
            // CREATING A MESH OBJECT WITH SVG DATA FOR 'cone1' THAT
            // HAS BOTH 'pos', AND 'lookat' paths
            mesh1 = SVGMove.createMesh(data, 'cone1', {
                con: 'Cone', argu: [0.5, 4, 10, 5],
                material: new THREE.MeshBasicMaterial({wireframe: true})
            });
            // rotation geo once here so that it is pointing the way I want it
            mesh1.geometry.rotateX(Math.PI * 0.5);
            scene.add(mesh1);
            loop();
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
