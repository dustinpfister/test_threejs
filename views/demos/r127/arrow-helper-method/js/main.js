
// scene
var scene = new THREE.Scene();

// arrows for scene
utils.addArrow(scene, 2, 0, 0, 3.2, 'lime');
utils.addArrow(scene, 0, 2, 0, 2.5, 'blue');
utils.addArrow(scene, 0, 0, 2, 2.7, 'cyan');

// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);

// cube
var cube = utils.addCube(scene, -2.5, 0, .5);
// arrow for cube
utils.addArrow(cube, 0, 2, 0, 2.5, 'blue');


// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);


renderer.render(scene, camera);

