//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 1);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const makeCube = (canObj) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: canObj.texture
    }));
};
//-------- ----------
// CANVAS
//-------- ----------
// create texture with default draw method, size settings and so forth
let canvasObj = canvasMod.create();
// create cube with the texture
let cube = makeCube(canvasObj);
scene.add(cube);


// create texture with custom draw method that makes use of a state object
const draw = function (canObj, ctx, canvas, state) {
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
canvasObj = canvasMod.create({ state: state, draw: draw });
cube = makeCube(canvasObj);
cube.position.set(0, 0, 2)
scene.add(cube);

//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
