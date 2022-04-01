var scene = new THREE.Scene();

// CREATING A CUBE TEXTURE WITH CANVAS
var texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 128, 6, 'black', 32, 64).image;
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;

// CAMERA
var camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);

// RENDERER
var renderer = new THREE.WebGLRenderer();
//renderer.width = 640;
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
var container = document.getElementById('demo');
container.appendChild(renderer.domElement);

// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
