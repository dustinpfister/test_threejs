
// a Mesh
var meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// creating a scene
var scene = new THREE.Scene();
// add the box mesh to the scene
scene.add(meshA);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date();
var state = {
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        lt = now;
        state.x += 0.5 * secs;
        state.y += 1.0 * secs;
        state.z += 1.5 * secs;
        state.x %= Math.PI * 2;
        // USING EULER SET METHOD
        meshA.rotation.set(state.x, state.y, state.z);
        renderer.render(scene, camera);
    }

};

loop();
