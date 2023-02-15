// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SOURCE OBJECTS - The source objects that I will be using to create a track
// ---------- ----------
const group_source = new THREE.Group();
group_source.add( trackMod.createSourceObject(1.0, 4.0,   0.0,-2.0,    0.0, 2.0,   0.0, 0.0,  0.0, 0.0) );
group_source.add( trackMod.createSourceObject(4.0, 4.0,   1.5,-2.0,   -2.0, 1.5,   0.8, 0.8,  1.8, 1.0) );
// ---------- ----------
// TRACK OBJECTS - creating the tracks objects from the source objects
// ---------- ----------
const curve = new THREE.CurvePath();
[
    [0,  4.5, -1.0,  0.0,  0],
    [1,  3.0,  3.0,  0.0,  0],
    [0, -1.0,  4.5,  0.0,  3],
    [1, -5.0,  3.0,  0.0,  3],

    [0, -6.5, -1.0,  0.0,  2],
    [1, -5.0, -5.0,  0.0,  2],

    [0, -1.0, -6.5,  0.0,  1],

    [1,  3.0, -5.0,  0.0,  1],
].forEach((data)=>{
    const track = trackMod.createTrackObject(group_source, data[0], data[1], data[2], data[3], data[4]);
    scene.add(track);
    curve.add( trackMod.createTrackCurvePart(track) );
});
// curve
//const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
//scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
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
camera.position.set(8,8,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    //const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
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

