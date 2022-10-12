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
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
