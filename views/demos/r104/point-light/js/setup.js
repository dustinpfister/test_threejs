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
