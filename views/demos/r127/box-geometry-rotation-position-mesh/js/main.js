
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0,
    radian: 0,
    r: new THREE.Euler(0, 0, 0),
    p: new THREE.Vector3(0, 0, 0)
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    state.radian = Math.PI * 2 * state.bias;
    state.p.z = -2 * Math.cos(Math.PI * 2 * state.bias);
    state.p.x = -2 * Math.sin(Math.PI * 8 * state.bias);
    // changing values
    state.r.x += 1 * secs;
    state.r.y += 2 * secs;
    state.r.z += 3 * secs;
    // copy the state of the THREE.Euler instance in the state object
    // as the new rotation value of the box
    box.rotation.copy(state.r);
    // using the copy method for Vector3 also
    box.position.copy(state.p);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
