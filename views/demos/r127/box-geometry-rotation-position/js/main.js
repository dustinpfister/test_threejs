
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
var scene = new THREE.Scene();
scene.add(box);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
state = {
    r: new THREE.Euler(0, 0, 0),
    p: new THREE.Vector3(0, 0, 0)
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.r.x += 1 * secs;
    state.r.y += 2 * secs;
    state.r.z += 3 * secs;

    // copy the state of the THREE.Euler instance in the state object
    // as the new rotation value of the box
    box.rotation.copy(state.r);
    renderer.render(scene, camera);
    lt = now;
};
loop();
