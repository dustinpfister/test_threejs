var scene = new THREE.Scene();
// create some point lights and add it to the scene
var whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0),
redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0),
greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0),
bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);
// create some cubes
addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, 0, 15);
addCube(scene, 10, 0, 0, -15);
// need a camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(37, 37, 37);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
// loop
var frame = 0,
maxFrame = 180,
per,
bias,
loop = function () {
    setTimeout(loop, 33);
    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    r = Math.PI * 2 * per,
    sin = Math.sin(r) * 30,
    cos = Math.cos(r) * 30;
    // update point lights
    whitePointLight.position.y = 20 * bias;
    redPointLight.position.set(cos, sin, 0);
    greenPointLight.position.set(cos, 0, sin);
    bluePointLight.position.set(0, cos, sin);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= maxFrame;
};
loop();
