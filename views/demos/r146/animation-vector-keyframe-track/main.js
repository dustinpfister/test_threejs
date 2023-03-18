// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// ANIMATION VECTOR KEYFRAME TRACK
// ---------- ----------
const times = [ 0, 10];
const values = [0, 0, -5, 0, 0, 5];
const kf_pos = new THREE.VectorKeyframeTrack('.position', times, values );
const kf_rot = new THREE.QuaternionKeyframeTrack('.quaternion', times, [ 0,0,0,0, 0,0,0,0 ] );
// ---------- ----------
// ANIMATION MIXER / CLIP / ACTION
// ---------- ----------
const mixer = new THREE.AnimationMixer(mesh1);
const length = -1;
const tracks = [ kf_pos, kf_rot];
const clip = new THREE.AnimationClip("slowmove", length, tracks);
const action = mixer.clipAction(clip);
action.play();
// ---------- ----------
// CONTROLS
// ---------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
     mixer.update(1 / FPS_UPDATE);
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
