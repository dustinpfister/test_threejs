var randomColor = function () {
    var r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
var randomPosition = function () {
    var x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};

// creating a scene
var scene = new THREE.Scene();

// creating a group of mesh object with random colors
var group = new THREE.Group();
var i = 0,
len = 15;
while (i < len) {
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor(),
                emissiveIntensity: 0.8,
                emissive: randomColor()
            }));
    box.position.copy(randomPosition());
    group.add(box);
    i += 1;
}
scene.add(group);

// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);

// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.children.forEach(function (box) {
            box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        });
        group.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }

};
loop();
