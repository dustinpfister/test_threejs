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
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    draw = draw || function (ctx, canvas) {
        //ctx.lineWidth = 1;
        //ctx.fillStyle = 'blue';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
    draw(ctx, canvas);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};

// create a cube with a canvas as a texture
// the material is transparent and rendering is done on
// both sides.
var createCanvasWireCube = function () {
    var texture = createCanvasTexture();
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.2,
            map: texture,
            side: THREE.DoubleSide
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
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
