
var createCubeGroup = function () {
    var size = 1,
    scale = 1 / 2,
    halfScale = scale / 2;
    var group = new THREE.Group();
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    group.add(box);
    var i = 0,
    len = 4;
    while (i < len) {
        var copy1 = box.clone(),
        r = Math.PI * 2 / 4 * i,
        x = Math.cos(r) * 1,
        z = Math.sin(r) * 1;
        copy1.scale.set(scale, scale, scale);
        copy1.position.set(x, 0, z);
        group.add(copy1);
        i += 1;
    }
    return group;
};

// scene
var scene = new THREE.Scene();
var grid = new THREE.GridHelper(7, 7);
scene.add(grid);

// group1 with DEFAULT SCALE
var group1 = createCubeGroup();
group1.position.set(0, 0, 0);
scene.add(group1);

// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
frame = 0,
maxFrame = 90,
fps = 30;

var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    base = 4,
    biasLog = Math.log(1 + bias * (base - 1)) / Math.log(base),
    s;
    requestAnimationFrame(loop);

    if (secs > 1 / fps) {
        s = 0.25 + 1.75 * biasLog;
        group1.scale.set(s, s, s);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
