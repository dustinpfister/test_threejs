// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
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
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v = new THREE.Vector3(0, 0, 0);
const update = function(frame, frameMax){
    // state of vector
    v.x = 2;
    v.y = 1.5 - 3 * getBias(frame, frameMax, 8);
    v.z = -5 + 10 * getBias(frame, frameMax, 1);
    // just set position of mesh1 to the vector
    mesh1.position.copy(v);
    // setting mesh2 rotation based on state of vector
    mesh2.rotation.setFromVector3(v.clone().normalize());
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
