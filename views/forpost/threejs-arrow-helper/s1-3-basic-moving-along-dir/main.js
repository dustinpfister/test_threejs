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
arrow.children[0].material.linewidth = 3;
scene.add(arrow);
//-------- ----------
// MESH OBJECT OF CUBE
//-------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            wireframeLinewidth: 3,
            color: 'yellow'
        }));
scene.add(cube);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
// update
const update = function (secs) {
    const a1 = frame / maxFrame,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // updaing Vector
    V.z = -5 + 10 * a2;
    // UPDATING DIR Vector
    DIR = V.clone().normalize();
    // setting direction With DIR vector3 object
    arrow.setDirection(DIR);
    // setting position of the cube along the direction of the arrow
    // USING DIR Vector and LENGTH CONST with bias alpha
    const x = DIR.x * LENGTH * a2,
    y = DIR.y * LENGTH * a2,
    z = DIR.z * LENGTH * a2;
    cube.position.set(x, y, z);
    cube.lookAt(0, 0, 0);
    camera.position.z = z + 3;
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
// start loop
loop();