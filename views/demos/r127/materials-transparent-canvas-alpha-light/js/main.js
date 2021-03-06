// create a cube
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};

var createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 64;
    canvas.height = size || 64;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};

var alphaMap = createCanvasTexture(function (ctx, canvas) {
        // drawing gray scale areas
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#000000';
        ctx.fillRect(32, 0, 32, 32);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 32, 32, 32);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(32, 32, 32, 32);
    });

var materials = {};
// Using the standard material
materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        alphaMap: alphaMap,     // using an alpha map
        side: THREE.DoubleSide,
        depthFunc: THREE.AlwaysDepth,
        transparent: true,
        opacity: 0.2
    });

var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);

// scene
var scene = new THREE.Scene();

// adding a point light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, -5, 5);
scene.add(pointLight);

// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);

// add cubes
scene.add(glassCube);
scene.add(cube);

// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
