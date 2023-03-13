//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function () {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
const moveObjByDiff = function (obj, pos, per) {
    per = per === undefined ? 1 : per;
    per = per > 1 ? per % 1 : per;
    const diff = obj.position.clone().sub(pos);
    obj.position.sub(diff.multiplyScalar(per));
};
const moveObjByDistDiff = function (obj, pos, maxDist, maxPer) {
    maxDist = maxDist === undefined ? 5 : maxDist;
    maxPer = maxPer === undefined ? 0.25 : maxPer;
    const d = obj.position.distanceTo(pos);
    let per = maxPer;
    if (d <= maxDist) {
        per = d / maxDist * maxPer;
    }
    moveObjByDiff(obj, pos, per);
};
const minDistCheck = function (obj, pos, minDist) {
    minDist = minDist === undefined ? 0.125 : minDist;
    const d = obj.position.distanceTo(pos);
    if (d < minDist) {
        return true;
    }
    return false;
};
const newRandomStartPos = function (maxLength) {
    maxLength = maxLength === undefined ? 10 : maxLength;
    return new THREE.Vector3().random().subScalar(0.5).normalize().multiplyScalar(maxLength);
};

// cubes
const cube1 = createCube();
cube1.position.set(0.001, 0, 0);
scene.add(cube1);
const cube2 = createCube();
cube2.position.copy(newRandomStartPos());
scene.add(cube2);

camera.position.set(8, 10, 8);
camera.lookAt(0, 0, 0);


const update = function () {
    moveObjByDistDiff(cube2, cube1.position, 2, 0.125);
    if (minDistCheck(cube2, cube1.position, 0.25)) {
        cube2.position.copy(newRandomStartPos());
    }
};

var lt = new Date(),
fps = 30;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update();
        lt = now;
        renderer.render(scene, camera);
    }
};
loop();
