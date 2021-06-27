var can3 = {};

can3.draw = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
}
 
// create and return a canvas texture
can3.createCanvasTexture = function (draw) {
    draw = draw || can3.draw;
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    draw(ctx, canvas);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};
 
// create a cube the makes use of a canvas texture
can3.createCube = function (texture) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        }));
};

// Scene
var scene = new THREE.Scene();
 
// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 1);
 
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
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);