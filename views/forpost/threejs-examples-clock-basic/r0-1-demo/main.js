//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 1000);
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a THREE.Group of face marks for each hour
const createFaceCubes = function (material) {
    const group = new THREE.Group();
    clock.createFacePoints(0, 0, 0, 10).map(function (facePoints) {
        const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        cube.position.set(facePoints[0], facePoints[1], facePoints[2]);
        cube.lookAt(0, 0, 0);
        group.add(cube);
        return cube;
    });
    return group;
};
// create hand cubes
const createHandCubes = function (material) {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material))
    const update = function (clockObj) {
        clockObj = clockObj || clock.get();
        clock.createHandPoints(clockObj, 0, 0, 0, 10).forEach(function (point, i) {
            const cube = group.children[i];
            cube.position.set(point[0], point[1], point[2]);
        });
    };
    update();
    return {
        group: group,
        update: update
    };
};
//-------- ----------
// MATERIALS
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    }),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })];
//-------- ----------
// OBJECTS
//-------- ----------
// create and add face cubes
scene.add(createFaceCubes(materials[0]));
// create hands
const hands = createHandCubes(materials[1]);
scene.add(hands.group);
//-------- ----------
// LOOP
//-------- ----------
const loop = function () {
    hands.update(clock.get(new Date()));
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
