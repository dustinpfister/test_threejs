//-------- ----------
// CAMERA, SCENE, RENDERER
//-------- ----------
const width = 640,
height = 480,
fieldOfView = 40,
aspectRatio = width / height,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
renderer.setSize(width, height, false);
//-------- ----------
// HELPERS
//-------- ----------
const moveCamera = function (camera, per) {
    const rad = Math.PI * 2 * per,
    x = Math.cos(rad) * 3,
    y = -3 + 6 * (1 - Math.abs(per - 0.5) / 0.5),
    z = Math.sin(rad) * 3;
    // position property can be used to set
    // the position of a camera
    camera.position.set(x, y, z);
    // the rotation property or the lookAt method
    // can be used to set rotation
    camera.lookAt(0, 0, 0);
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));
//-------- ----------
// LOOP
//-------- ----------
let frame = 0,
frameMax = 100,
lt = new Date();
const fps = 12;
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        moveCamera(camera, frame / frameMax);
        renderer.render(scene, camera);
        frame += 1;
        frame %= frameMax;
        lt = now;
    }
};
loop();
