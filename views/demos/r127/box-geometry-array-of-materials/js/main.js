
var materials = [
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),

    new THREE.MeshBasicMaterial({
        color: 'blue'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    })
];

var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materials);

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
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.x += 1 * secs;
    state.y += 2 * secs;
    state.z += 3 * secs;
    box.rotation.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    lt = now;
};
loop();
