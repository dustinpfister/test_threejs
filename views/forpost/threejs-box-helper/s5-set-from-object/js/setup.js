// scene, camera, grid helper
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(1, 0, 1);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
var mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 3, 30, 30),
        new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ADDING A BOX HELPER TO THE SCENE OBJECT
var boxHelper = new THREE.BoxHelper(mesh1, 0xffff00);
scene.add(boxHelper);
// LOOP
var frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
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
