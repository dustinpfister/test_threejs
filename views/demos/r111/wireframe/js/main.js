// create a basic write frame cube
var createBasicWireCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        }));
};

// create a canvas texture
var createCanvasTexture = function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};

// create a cube with a canvas as a texture
var createCanvasWireCube = function () {
    var texture = createCanvasTexture()
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture
            }));
};

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(5, 5, 5);
camera.lookAt(1, 0, 0);

scene.add(createBasicWireCube());
var cube = createCanvasWireCube();
cube.position.set(3, 0, 0)
scene.add(cube);

// Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
