// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30), new THREE.MeshStandardMaterial());
scene.add(sphere);
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(sphere2);
const light = new THREE.PointLight(0xffffff, 1.5); // point light
light.position.set(1, 2, 3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xafafaf, 0.15));
// ---------- ----------
// Vector3
// ---------- ----------
// using apply Euler method to change direction and length
const setMeshPos = function (mesh, deg1, deg2, vecLength) {
    deg1 = deg1 === undefined ? 0 : deg1;
    deh2 = deg2 === undefined ? 0 : deg2;
    vecLength = vecLength === undefined ? 1.1 : vecLength;
    const homeVec = new THREE.Vector3(vecLength, 0, 0);
    const a = THREE.MathUtils.degToRad(deg1),
    b = THREE.MathUtils.degToRad(deg2);
    mesh.position.copy(homeVec).applyEuler(new THREE.Euler(0, a, b));
};
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
let deg1 = 0,
deg2 = 45,
degPerSec = 90,
a = 0,
aMax = 30,
lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    deg2 = Math.sin(Math.PI * 2 * (a / aMax)) / Math.PI * 90;
    setMeshPos(sphere2, deg1, deg2, 1.1);
    deg1 += degPerSec * secs;
    deg1 %= 360;
    a += 1;
    a %= aMax;
    renderer.render(scene, camera);
    lt = now;
};

loop();
