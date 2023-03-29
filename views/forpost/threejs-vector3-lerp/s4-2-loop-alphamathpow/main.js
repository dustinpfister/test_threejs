//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
const light = new THREE.PointLight(0xffffff);
light.position.set(1, 2, 4);
scene.add(light);
//-------- ----------
// HELPERS
//-------- ----------
// MESH
const mkMesh = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }));
};
// HELPER METHOD USING LERP AND MATH POW
const lerpPow = function (a, b, n, alpha) {
    const alphaPow = Math.pow(n, 1 + ((n - 1) * alpha)) / Math.pow(n, n);
    return a.clone().lerp(b, alphaPow);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const mesh1 = mkMesh();
scene.add(mesh1);
const mesh2 = mkMesh();
scene.add(mesh2);
const mesh3 = mkMesh();
scene.add(mesh3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date(),
f = 0,
fm = 300;
const v1 = new THREE.Vector3(5, 0, 0);
const v2 = new THREE.Vector3(-5, 0, 0);
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000;
    const p = f / fm,
    b = 1 - Math.abs(0.5 - p) / 0.5;
    requestAnimationFrame(loop);
    mesh1.position.copy(lerpPow(v1, v2, 4, b));
    mesh2.position.copy(lerpPow(
            v1.clone().add(new THREE.Vector3(0, 0, 2)),
            v2.clone().add(new THREE.Vector3(0, 0, 2)),
            6, b));
    mesh3.position.copy(lerpPow(
            v1.clone().add(new THREE.Vector3(0, 0, 4)),
            v2.clone().add(new THREE.Vector3(0, 0, 4)),
            8, b));
    // render
    renderer.render(scene, camera);
    f += 30 * secs;
    f %= fm;
    lt = now;
};
loop();
