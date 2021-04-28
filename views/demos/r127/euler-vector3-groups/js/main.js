

var setBoxRing = function (boxRing, cubeRotationPer, ringRotationPer) {
    var len = boxRing.children.length;
    cubeRotationPer = cubeRotationPer === undefined ? 0 : cubeRotationPer;
    ringRotationPer = ringRotationPer === undefined ? 0 : ringRotationPer;
    boxRing.children.forEach(function (box, i) {
        var radian = Math.PI * 2 / len * i;
        // SETTING POSITION WITH VECTOR3 SET METHOD
        box.position.set(Math.cos(radian) * 2, Math.sin(radian) * 2, 0);

        box.rotation.set(0, 0, 0);

        // USING THE Z PROP OF THE EULER CLASS
        //box.rotation.y = Math.PI * 2 * cubeRotationPer + Math.PI * 2 / len * i;
    });
};

var createBoxRing = function () {
    var meshA = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var group = new THREE.Group();
    var i = 0,
    len = 8;
    while (i < len) {
        var box = meshA.clone();
        group.add(box);
        i += 1;
    };
    setBoxRing(group);
    return group;
};

var br1 = createBoxRing();

// creating a scene
var scene = new THREE.Scene();

// add the box mesh to the scene
scene.add(br1);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var state = {
    lt: new Date(),
    cubePer: 0,
    ringPer: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        state.lt = now;
        setBoxRing(br1, state.cubePer, state.ringPer);
        br1.rotation.x = Math.PI * 2 * state.ringPer;
        state.cubePer += 0.25 * secs;
        //state.cubePer %= Math.PI * 2;
        state.ringPer += 0.05 * secs;
        renderer.render(scene, camera);
    }

};

loop();
