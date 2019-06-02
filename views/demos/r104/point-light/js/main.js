var scene = new THREE.Scene();

// create the point light and add it to the scene
var pointLight = new THREE.PointLight(0x00ff00);
pointLight.position.set(0, 0, 0);
pointLight.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        })));
scene.add(pointLight);

// create some cubs
var addCube = function (scene, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xffffff
        });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};
addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, 0, 15);
addCube(scene, 10, 0, 0, -15);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(40, 40, 40);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var frame = 0,
maxFrame = 50,
per,
bias,
y,
loop = function () {

    setTimeout(loop, 33);

    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5;

    pointLight.position.y = 20 * bias;

    renderer.render(scene, camera);

    frame += 1;
    frame %= maxFrame;

};
loop();
