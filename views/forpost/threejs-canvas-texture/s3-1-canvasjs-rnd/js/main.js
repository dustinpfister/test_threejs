//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
camera.position.set(0, 1.5, 2.75);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make cube helper function
const makeCube = (texture, size) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            map: texture || null
    }));
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw:'rnd',
    size: 64,
    update_mode: 'dual',
    state: {
        gSize: 20
    },
    palette: ['black', 'white', 'cyan', 'lime', 'red', 'blue', 'yellow', 'orange', 'purple']
});
//-------- ----------
// MESH
//-------- ----------
let cube1 = makeCube(canObj2.texture_data, 2);
cube1.position.set(0, 0, 0);
scene.add(cube1);
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
    //if(Math.floor(frame) % 5 === 0){
        canObj2.state.gSize = 40 - Math.round(38 * b);
        canvasMod.update(canObj2);
    //}
    cube1.rotation.y = Math.PI * 2 * a;
    cube1.rotation.x = Math.PI / 180 * 45 * b;
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
