var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 20);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
fps = 2;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.position.x = -1;
        box.position.z = -1;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
