//-------- ----------
// CAMERA
//-------- ----------
const fieldOfView = 45,
aspectRatio = 16 / 9,
near = 1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// add plane to the scene
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 8, 8),
        new THREE.MeshBasicMaterial({
            color: 0x00afaf,
            side: THREE.DoubleSide
        }));
plane.rotation.x = Math.PI / 2;
scene.add(plane);
// add a cube to the scene
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshNormalMaterial({}));
cube.position.set(0, 100, 0);
scene.add(cube);
// setting position of the camera
// position is a property of Object3D
// and the value is an instance of Vector3
camera.position.set(400, 400, 400);
camera.lookAt(0, 0, 0);
// setting a background color
scene.background = new THREE.Color(.7, .7, .7);
// 16:9 aspect ratio canvas


// loop
let frame = 0,
frameMax = 30 * 10,
fps = 30,
lt = new Date();
const update = function (per) {
    const bias = 1 - Math.abs(.5 - per) / .5;
    // changing aspect, and field of view
    camera.aspect = .5 + 1.5 * bias;
    camera.fov = 50 + 25 * bias;
    // I must call this to get it to work
    camera.updateProjectionMatrix();
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame / frameMax);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
