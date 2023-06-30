//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCube = function (rotationRates, position) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    const ud = cube.userData;
    ud.rotationRates = rotationRates || [0, 3.14, 0];
    cube.position.copy(position || new THREE.Vector3(0, 0, 0));
    return cube;
};
const clampRadian = function (radian) {
    return radian %= Math.PI * 2;
};
const updateCube = function (cube, secs) {
    const ud = cube.userData,
    rr = ud.rotationRates;
    cube.rotation.x += rr[0] * secs;
    cube.rotation.y += rr[1] * secs;
    cube.rotation.z += rr[2] * secs;
    cube.rotation.x = clampRadian(cube.rotation.x);
    cube.rotation.y = clampRadian(cube.rotation.y);
    cube.rotation.z = clampRadian(cube.rotation.z);
};
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const cubes = new THREE.Group();
cubes.add(createCube([1.57, 0.00, 0.00], new THREE.Vector3(3, 0, 0)));
cubes.add(createCube([3.14, 1.57, 0.25], new THREE.Vector3(0, 0, 0)));
cubes.add(createCube([0.00, 0.00, 6.28], new THREE.Vector3(-3, 0, 0)));
scene.add(cubes);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date();
const fps = 24;
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        cubes.children.forEach(function (cube) {
            updateCube(cube, secs);
        });
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
