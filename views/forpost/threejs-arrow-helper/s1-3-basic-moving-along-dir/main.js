//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// NORAMIZED DIRECTION AS UNIT VECTOR
//-------- ----------
var V = new THREE.Vector3(1, 1, 0),
DIR = V.normalize(),
LENGTH = 3;
//-------- ----------
// ARROW HELPER
//-------- ----------
const arrow = new THREE.ArrowHelper(
        // first argument is the direction
        DIR,
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        LENGTH,
        // color
        0x00ff00);
scene.add(arrow);
//-------- ----------
// MESH OBJECT OF CUBE
//-------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 'yellow'
        }));
scene.add(cube);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
// update
const update = function (secs, per, bias) {
    // updaing Vector
    V.z = -5 + 10 * bias;
    // UPDATING DIR Vector
    DIR = V.clone().normalize();
    // setting direction With DIR vector3 object
    arrow.setDirection(DIR);
    // setting position of the cube along the direction of the arrow
    // USING DIR Vector and LENGTH CONST with bias alpha
    const x = DIR.x * LENGTH * bias,
    y = DIR.y * LENGTH * bias,
    z = DIR.z * LENGTH * bias;
    cube.position.set(x, y, z);
    cube.lookAt(0, 0, 0);
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs, per, bias)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
// start loop
loop();