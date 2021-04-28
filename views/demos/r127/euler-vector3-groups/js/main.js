

var setBoxRing = function (boxRing, rPer) {
    var len = boxRing.children.length;
    rPer = rPer === undefined ? 0 : rPer;
    boxRing.children.forEach(function (box, i) {
        var radian = Math.PI * 2 / len * i;
        // SETTING POSITION WITH VECTOR3 SET METHOD
        box.position.set(Math.cos(radian) * 2, Math.sin(radian) * 2, 0);
        // SETTING EULER CLASS ROTATION WITH LOOKAT METHOD
        box.lookAt(Math.cos(radian + 0.125) * 2, Math.sin(radian + 0.125) * 2, 0);
        // USING THE X PROP OF THE EULER CLASS
        box.rotation.x = Math.PI * 2 * rPer + Math.PI * 2 / len * i;
    });
};

var createBoxRing = function () {
    var meshA = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var group = new THREE.Group();
    var i = 0,
    len = 5;
    while (i < len) {
        var box = meshA.clone();
        group.add(box);
        i += 1;
    };
    setBoxRing(group);
    return group;
};

var boxRing = createBoxRing();

// creating a scene
var scene = new THREE.Scene();

// add the box mesh to the scene
scene.add(boxRing);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        lt = now;
        renderer.render(scene, camera);
    }

};

loop();
