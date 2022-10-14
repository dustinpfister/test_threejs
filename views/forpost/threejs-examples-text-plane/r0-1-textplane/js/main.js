//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.75, 0.75, 0.75);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS OBJECT
//-------- ----------
//let canObj2 = TextPlane.createCanObj({
//    update_mode: 'canvas',
//    rows: 5, size: 256, palette: ['rgba(0,255,255,0.25)', 'black', 'black']
//})
//-------- ----------
// MESH
//-------- ----------
//let plane = TextPlane.makePlane(canObj2.texture, 7, 5);
const plane = TextPlane.createPlane({
    w: 7, h: 5,
    //update_mode: 'dual', // Might not need data textures
    rows: 5, size: 256, palette: ['rgba(0,255,255,0.25)', 'black', 'black']
});
plane.position.set(0, 2.5, 0);
plane.material.transparent = true;
plane.material.opacity = 0.5;
scene.add(plane);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = 'This is just a little demo of my text plane module thus far. \n\nIt is all ready working okay, or at least it seems to be working well thus far. I am sure there may be at least one or two bugs still maybe,this is just r0 of the module after all. \n\nIf all goes well I am sure that I will start using this in a lof of my video projects as a way to add text content to an over all scene. \n\n'
const textLines = TextPlane.createTextLines(text2, 16);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 600;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // UPDATE
    TextPlane.moveTextLines(plane.userData.canObj.state.lines, textLines, b);
    // update canvas
    canvasMod.update(plane.userData.canObj);
    // update camera
    camera.position.set(-4 * b, 1, 5);
    camera.lookAt(0, 1.5, 0);
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
