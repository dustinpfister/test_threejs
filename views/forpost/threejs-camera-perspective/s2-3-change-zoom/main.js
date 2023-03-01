
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    // SCENE, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 60;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.zoom = 0.05 + 20.95 * a2;
    camera.updateProjectionMatrix();
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