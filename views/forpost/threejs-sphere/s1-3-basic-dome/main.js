// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// HELPER FUCTIONS
// ---------- ----------
const createDomeAt = function (x, z, rPer, r) {
    r = r === undefined ? 0.5 : r;
    const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040,
                side: THREE.DoubleSide
            }));
    mesh.position.set(x, 0, z);
    mesh.geometry.rotateX(Math.PI * 2 * rPer);
    return mesh;
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(8, 8, 0xff0000));
var pl = new THREE.PointLight(0xffffff);
pl.position.set(1, 1, 0);
camera.add(pl);
scene.add(camera);
scene.add(createDomeAt(0, 0, 0.0));
scene.add(createDomeAt(0, 1, 0.5));
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2, 1, 0);
camera.lookAt(0, 0, 0.4);
renderer.render(scene, camera);
