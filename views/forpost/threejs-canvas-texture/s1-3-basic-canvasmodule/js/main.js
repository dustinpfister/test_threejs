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
const makeCube = (canObj, size) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            map: canObj.texture
    }));
};
//-------- ----------
// CANVAS DEFAULT
//-------- ----------
// create texture with default draw method, size settings and so forth
let canObj1 = canvasMod.create();
// create cube with the texture
let cube1 = makeCube(canObj1, 1);
scene.add(cube1);
//-------- ----------
// CANVAS WITH RND BUILT IN DRAW METHOD
//-------- ----------
let canObj2 = canvasMod.create({
    draw:'rnd',
    state: { gSize: 12 },
    palette: ['red', 'lime', 'blue', 'cyan', 'purple', 'orange'] });
let cube2 = makeCube(canObj2, 2);
cube2.position.set(-3, 0, 0);
scene.add(cube2);
//-------- ----------
// CANVAS CUSTOM
//-------- ----------
const opt = {
    size: 64,
    state: {
        rPer: 0.2
    },
    draw: function (canObj, ctx, canvas, state) {
        ctx.fillStyle = canObj.palette[1];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canObj.palette[0];
        ctx.beginPath();
        const hw = canvas.width / 2, sx = hw, sy = canvas.height / 2,
        radius = hw - hw * state.rPer;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
    }
};
const canObj3 = canvasMod.create(opt);
const cube3 = makeCube(canObj3, 1);
cube3.position.set(0, 0, 2);
scene.add(cube3);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
