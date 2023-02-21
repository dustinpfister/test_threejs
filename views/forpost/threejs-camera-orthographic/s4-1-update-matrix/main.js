//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.25, 0.25, 0.25);
scene.add(new THREE.GridHelper(10,10));
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight();
pl.position.set(0, 3, 6);
scene.add(pl);
//-------- ----------
// CAMERA
//-------- ----------
const width = 4.0,
height = 4.0;
const camera = new THREE.OrthographicCamera( -width, width, height, -height, 0.01, 100);
camera.position.set(5,2,5);
camera.lookAt(0, 0, 0);
//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial();
const m1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), material );
m1.position.set(0, 0.5, 0);
scene.add( m1 );
const m2 = new THREE.Mesh( new THREE.BoxGeometry(1,3,1), material );
m2.position.set(-3, 1.5, 1);
scene.add( m2 );
const m3 = new THREE.Mesh( new THREE.BoxGeometry(1,3,1), material );
m3.position.set(3, 1.5, -1);
scene.add( m3 );
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
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const width = 4 + 4 * a2;
    const height = 4 - 2 * a2;
    camera.left = width * -1;
    camera.right = width;
    camera.top = height;
    camera.bottom = height * -1;
    // CALLING UPDATE PROJECTION MATRIX METHOD
    camera.updateProjectionMatrix();
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