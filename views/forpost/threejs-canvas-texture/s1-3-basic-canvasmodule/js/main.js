//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 1);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS
//-------- ----------
// create texture with default draw method
const canvasObj = canvasMod.createCanvasTexture();
// create cube with the texture
const cube = canvasMod.createCube(canvasObj.texture);
scene.add(cube);
// create texture with custom draw method that makes use of a state object
const draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    const hw = canvas.width / 2,
    sx = hw,
    sy = canvas.height / 2,
    radius = hw - hw * state.rPer;
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();
};
const state = {
   rPer: 0.1
};
const canvasObj = canvasMod.createCanvasTexture(state, draw);
cube = canvasMod.createCube(canvasObj.texture);
cube.position.set(0, 0, 2)
scene.add(cube);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
