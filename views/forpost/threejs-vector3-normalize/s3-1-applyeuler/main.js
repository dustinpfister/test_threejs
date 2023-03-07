//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);

//-------- ----------
// HELPERS
//-------- ----------
// simple create cube helper
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
// vector from angles helper
const vectorFromAngles = function(a, b, c, len, start){
    len = len = undefined ? 1 : len;
    const e = new THREE.Euler(
        THREE.MathUtils.degToRad(a),
        THREE.MathUtils.degToRad(b), 
        THREE.MathUtils.degToRad(c));
    const v = start || new THREE.Vector3(0, 0, 1);
    v.applyEuler(e).normalize();
    return v.multiplyScalar(len);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10));
const cube = createCube();
scene.add(cube);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 0.1 + 0.8 * Math.sin( Math.PI * 1 * (a1 * 2 % 1) );
    const a = 45 - 90 * a2;
    const b = 360 * a1;
    const c = 0;
    const length = 5 - 4 * a2;
    // using vector from angles helper to copy new position
    // to the cube mesh object that uses apply Euler and normalize
    cube.position.copy( vectorFromAngles(a, b, c, length) );
    cube.lookAt(0, 0, 0);
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
