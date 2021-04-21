// create a cube
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};

var materials = {};
// Using the standard material
materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });

var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);

// scene
var scene = new THREE.Scene();

// adding a point light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, -5, 5);
scene.add(pointLight);

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
