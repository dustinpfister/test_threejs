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
    // ---------- ----------
    // SCENE CHILD OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh1 = makeMesh();
    scene.add(mesh1);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 4, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;    // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 600;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        console.log(frame + '/' + frameMax);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){

            update( Math.floor(frame), FRAME_MAX);

            renderer.render(scene, camera);
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
 
}
    ());