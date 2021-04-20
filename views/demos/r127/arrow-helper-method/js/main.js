
// scene
var scene = new THREE.Scene();

// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);

// cube
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// ARROW HELPER
utils.addArrow(scene, 2, 0, 0, 3.2, 'lime');
utils.addArrow(scene, 0, 2, 0, 2.5, 'blue');
utils.addArrow(scene, 0, 0, 2, 2.7, 'cyan');
utils.addArrow(scene, -2, 2, 2, 2.7, 'white');


// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);


renderer.render(scene, camera);

