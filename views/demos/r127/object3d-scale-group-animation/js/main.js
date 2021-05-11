// scene
var scene = new THREE.Scene();

var state = {
    lt: new Date,
    fps: 30,
    groups: new THREE.Group()
};
scene.add(state.groups);

// a group created with the cube group module
var i = 0,
len = 6,
radius = 3,
radian, x, z;
while (i < len) {
    radian = Math.PI * 2 / len * i;
    x = Math.cos(radian) * radius;
    z = Math.sin(radian) * radius;
    var group = CubeGroup.create({
            frame: Math.floor(120 * (i / len)),
            maxFrame: 120
        });
    state.groups.add(group);
    group.position.set(x, 0, z);
    i += 1;
}

var grid = new THREE.GridHelper(7, 7);
scene.add(grid);

// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        state.groups.children.forEach(function (group, i) {
            CubeGroup.update(group, secs);
        });
        state.groups.rotation.y += Math.PI / 180 * 10 * secs;
        state.groups.rotation.y %= Math.PI * 2;
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
