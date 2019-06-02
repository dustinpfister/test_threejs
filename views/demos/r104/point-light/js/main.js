var scene = new THREE.Scene();

// create the point light and add it to the scene
var addPointLight = function (scene, color, x, y, z) {
    var pointLight = new THREE.PointLight(color);
    pointLight.position.set(x, y, z);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: color
            })));
    scene.add(pointLight);
    return pointLight;
};

var whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0);
var redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0);
var greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0);
var bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);

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
camera.position.set(37, 37, 37);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var frame = 0,
maxFrame = 180,
per,
bias,
y,
loop = function () {

    setTimeout(loop, 33);

    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    r = Math.PI * 2 * per,
    sin = Math.sin(r) * 30,
    cos = Math.cos(r) * 30;

    whitePointLight.position.y = 20 * bias;

    redPointLight.position.set(cos,sin,0);
    greenPointLight.position.set(cos,0,sin);
    bluePointLight.position.set(0,cos,sin);

    renderer.render(scene, camera);

    frame += 1;
    frame %= maxFrame;

};
loop();
