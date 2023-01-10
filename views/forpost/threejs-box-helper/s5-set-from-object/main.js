//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, BOX HELPER
//-------- ----------
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
const mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 3, 30, 30),
        new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ADDING A BOX HELPER TO THE SCENE OBJECT
const boxHelper = new THREE.BoxHelper(mesh1, 0xffff00);
scene.add(boxHelper);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 90, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        mesh1.position.z = 5 * bias;
        mesh1.rotation.x = Math.PI * 2 * per;
        // UPDAING BOX HELPER FOR THE OBJECT
        boxHelper.setFromObject(mesh1);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
