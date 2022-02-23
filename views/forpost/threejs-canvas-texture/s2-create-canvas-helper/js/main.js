// Scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
 
// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 1);
 
// create texture with default draw method
var canvasObj = canvasMod.createCanvasTexture();

var cube = canvasMod.createCube(canvasObj.texture);
scene.add(cube);


// create texture with custom draw method that makes use of a state object
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    var hw = canvas.width / 2,
    sx = hw,
    sy = canvas.height / 2,
    radius = hw - hw * state.rPer;
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();
};
var state = {
   rPer: 0.1
};
var canvasObj = canvasMod.createCanvasTexture(state, draw);
cube = canvasMod.createCube(canvasObj.texture);
cube.position.set(0, 0, 2)
scene.add(cube);

 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
