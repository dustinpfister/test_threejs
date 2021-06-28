var canvasMod = {};

canvasMod.draw = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
}
 
// create and return a canvas texture
canvasMod.createCanvasTexture = function (state, drawFunc) {
    drawFunc = drawFunc || canvasMod.draw;
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var canvasObj = {
        texture: texture,
        canvas: canvas,
        ctx: ctx,
        state: state,
        draw: function(){
           drawFunc.call(state, ctx, canvas, state);
        }
    };

    canvasObj.draw();

    return canvasObj;
};
 
// create a cube the makes use of a canvas texture
canvasMod.createCube = function (texture) {
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
var canvasObj = canvasMod.createCanvasTexture();

var cube = canvasMod.createCube(canvasObj.texture);
scene.add(cube);


// create texture with custom draw method
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5, canvas.width / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
};
var canvasObj = canvasMod.createCanvasTexture({}, );
cube = canvasMod.createCube(canvasObj.texture);
cube.position.set(0, 0, 2)
scene.add(cube);

 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
