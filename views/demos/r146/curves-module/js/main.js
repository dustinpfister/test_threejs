//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
//-------- ----------
// CAMERA PATHS
//-------- ----------
const v3Array_campos = [ 
    curveMod.QBV3Array([
        [5, 0, 5, -5, 0, -5,    5,0,-5,      60]
    ]),
    curveMod.GlavinPoints2(
        500, // number of points
        new THREE.Vector3(-5, 0, -5), // origin
        new THREE.Vector2(0, 1),      // unit vector length range
        new THREE.Vector2(0, 360),    // a1
        new THREE.Vector2(-90, 90)    // a2
    ),
];
//-------- ----------
// LINES AND POINTS
//-------- ----------
scene.add(curveMod.debugLines(v3Array_campos) )
scene.add(curveMod.debugPoints(v3Array_campos) )
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){};
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