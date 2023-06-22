// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const createSphereAt = function (x, z, w, h, r) {
    w = w === undefined ? 30 : w;
    h = h === undefined ? 15 : h;
    r = r === undefined ? 0.5 : r;
    const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(r, w, h),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040
            }));
    mesh.position.set(x, 0, z);
    return mesh;
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add(createSphereAt(-1.25, 0, 20, 20));
scene.add(createSphereAt(0, 0, 10, 10));
scene.add(createSphereAt(1.25, 0, 5, 5));
scene.add(new THREE.GridHelper(8, 8, 0xff0000));
const pl = new THREE.PointLight(0xffffff); // point light
pl.position.x = 1;
pl.position.y = 1;
camera.add(pl);
scene.add(camera);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(0.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
