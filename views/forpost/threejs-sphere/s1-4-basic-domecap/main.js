// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// MATERIAL / HELPER FUNCTIONS
// ---------- ----------
const material = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
});
const createDomeAt = function (x, z, rPer, r, cap) {
    r = r === undefined ? 0.5 : r;
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
        material);
    if (cap) {
        const circle = new THREE.Mesh(
            new THREE.CircleGeometry(r, 30, 0, Math.PI * 2),
            material);
        circle.geometry.rotateX(Math.PI * 0.5);
        mesh.add(circle);
    }
    mesh.position.set(x, 0.5, z);
    mesh.geometry.rotateX(Math.PI * 2 * rPer);
    return mesh;
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(8, 8, 0xff0000));
scene.add(createDomeAt(0, 0, 0.0));
scene.add(createDomeAt(0, 1.5, 0.5, 0.75));
scene.add(createDomeAt(1.5, 0, 0.5, 0.75, true));
const pl = new THREE.PointLight(0xffffff);
pl.position.set(8, 0, 0)
camera.add(pl);
scene.add(camera);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
