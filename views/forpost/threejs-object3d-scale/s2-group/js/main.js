
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

// group2 with 0.5 SCALE
var group2 = createCubeGroup();
group2.scale.set(0.5, 0.5, 0.5);
group2.position.set(3, 0, 3);
scene.add(group2);

// group3 with 2 SCALE
var group3 = createCubeGroup();
group3.scale.set(2, 2, 2);
group3.position.set(-3, 0, -3);
scene.add(group3);

// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
