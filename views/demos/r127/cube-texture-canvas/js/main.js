var scene = new THREE.Scene();

// sun
var sunTexture = canvasTextureMod.randomGrid(['r1', 'r1', '0']);
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: sunTexture
        }));
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(0, 8, 0);
scene.add(sun);

// add AmbientLight
var ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.3;
scene.add(ambientLight);

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

var texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 128, 6, 'black', 32, 64).image;
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;

loop();
