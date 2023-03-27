(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const makeMesh = () => {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial() );
    };
    const degToRad = (deg) => {
         return THREE.MathUtils.degToRad(deg);
    };
    const getBias = (a, b, count) => {
        count = count === undefined ? 1 : count;
        return THREE.MathUtils.pingpong(  a / b  * ( 2  * count ), 1);
    }; 
    // ---------- ----------
    // SCENE CHILD OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh1 = makeMesh();
    scene.add(mesh1);
    const mesh2 = makeMesh();
    scene.add(mesh2);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const vStart = new THREE.Vector3(0, 0, 1);
    const update = function(frame, frameMax){
        const per = frame / frameMax;
        // setting rotation of mesh1
        mesh1.rotation.x = degToRad(90 * getBias(frame, frameMax, 1));
        mesh1.rotation.y = degToRad(360) * per;
        mesh1.rotation.z = 0;
 
        // using the state of the rotation of mesh1 to effect the position of mesh2
        let radius = 5 - 4 * getBias(frame, frameMax, 4);
        mesh2.position.copy(vStart).applyEuler( mesh1.rotation ).normalize().multiplyScalar(radius);
        mesh2.lookAt(mesh1.position);
 
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
    loop();
 
}
    ());