// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

// create texture with default draw method
var texture = can3.createCanvasTexture();
var cube = can3.createCube(texture);
scene.add(cube);

// create texture with custom draw method
texture = can3.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5, canvas.width / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
    });
cube = can3.createCube(texture);
cube.position.set(0, 0, 2)
scene.add(cube);

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
