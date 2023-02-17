// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SOURCE OBJECTS - Just want one source object for this flip demo that is a single turn
// ---------- ----------
const group_source = new THREE.Group();
group_source.add( trackMod.createSourceObject(4.0, 4.0,   1.5,-2.0,   -2.0, 1.5,   0.8, 0.8,  1.8, 1.0) );
// ---------- ----------
// TRACK OBJECTS - creating the tracks objects from the source objects
// ---------- ----------
const n = 6;
const curve = new THREE.CurvePath();
[
    [0,   9.0,  2.0,  0.0,  0, false, false],
    [0,   5.0,  5.0,  0.0,  1, true, false],
    [0,   2.0,  9.0,  0.0,  0, false, false],
    [0,  -2.0,  9.0,  0.0,  3, false, false],
    [0,  -5.0,  5.0,  0.0,  2, true, false],
    [0,  -9.0,  2.0,  0.0,  3, false, false],
    [0,  -9.0, -2.0,  0.0,  0, true, true],
    [0,  -5.0, -5.0,  0.0,  1, false, true],
    [0,  -2.0, -9.0,  0.0,  0, true, true],
    [0,   2.0, -9.0,  0.0,  3, true, true],
    [0,   5.0, -5.0,  0.0,  2, false, true],
    [0,   9.0, -2.0,  0.0,  3, true, true]
].forEach((data)=>{
    const track = trackMod.createTrackObject(group_source, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    scene.add(track);
    curve.add( trackMod.createTrackCurvePart(track) );
});
// curve
const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(15, 15, 15);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 200;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a3 = ( a1 * 0.94 + 0.05 ) % 1;
    mesh.position.copy( curve.getPoint(a1) );
    mesh.lookAt( curve.getPoint( a3 ) );
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

