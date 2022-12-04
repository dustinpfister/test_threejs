//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 100);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const groundBox = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshDepthMaterial());
groundBox.position.set(0, -1, 0);
scene.add(groundBox);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// FLY CONTROLS
//-------- ----------
// With FLY CONTROLS the camera is given as the first argument, and
// the DOM element must now be given as a second argument
var flyControls = new THREE.FlyControls(camera, renderer.domElement);
//flyControls.dragToLook = true;
//flyControls.movementSpeed = 3;
//flyControls.rollSpeed = 1;
//-------- ----------
// LOOP
//-------- ----------
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    requestAnimationFrame(loop);
    // UPDATE CONTROLS
    flyControls.update(1 * secs);
    renderer.render(scene, camera);
};

loop();

