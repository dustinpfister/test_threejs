// create and return a canvas texture
var createCanvasTexture = function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(2.5, 2.5, canvas.width - 4, canvas.height - 4);
    var texture = new THREE.CanvasTexture(canvas);
    return texture;
};

// create a cube the makes use of a canvas texture
var createCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            
            map: createCanvasTexture()
        }));
};

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);

// add cube to scene that makes use
// of the canvas texture
scene.add(createCube());

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
