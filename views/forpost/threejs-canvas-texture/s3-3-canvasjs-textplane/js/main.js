//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make plane helper function
const makePlane = (texture, size) => {
    return new THREE.Mesh(
        new THREE.PlaneGeometry(6, 4, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture || null,
            side: THREE.DoubleSide
        })
    );
};


const drawText = (canObj, ctx, canvas, state) => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);


    let text = 'Hello World!',
    x = 256, y = 256, 
    lw = 2, fc = 'red', sc = 'black', a = 'center', f = 'arial', fs = '75px';

    ctx.lineWidth = lw;
    ctx.textAlign = a;
    ctx.font = fs + ' ' + f;
    ctx.fillStyle = fc;
    ctx.strokeStyle = sc;
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);

};

//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw: drawText,
    size: 512,
    update_mode: 'dual',
    state: {},
    palette: ['black', 'white', 'cyan', 'lime', 'red', 'blue', 'yellow', 'orange', 'purple']
});
canObj2.texture_data.flipY = true;
//canObj2.texture_data.center = new THREE.Vector2(0.5, 0.5);
//canObj2.texture_data.rotation = Math.PI / 180 * 0;
//canObj2.texture_data.needsUpdate = true;
//-------- ----------
// MESH
//-------- ----------
let plane = makePlane(canObj2.texture_data, 2);
plane.position.set(0, 2, 0);
scene.add(plane);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // update canvas
    canvasMod.update(canObj2);
    // update camera
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 1, 0);
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
