//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, BOX HELPER
//-------- ----------
// a mesh with a box helper as a child of the mesh
const mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
// helper that is not a child of the object that I
// create the box helper for
const helper = new THREE.BoxHelper(mesh1);
scene.add(helper); 
// changing position of mesh1
mesh1.position.set(-2, 0, 0);
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
        const v = new THREE.Vector3(0.5, 1, 0.5 + 2 * bias);
        mesh1.scale.copy(v);
        mesh1.rotation.y = Math.PI * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
