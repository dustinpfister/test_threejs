//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getMeshGroundPosition = (mesh, x, z) => {
    const geo = mesh.geometry;
    // COMPUTE THE BOUNDING BOX AND GET bb REF TO IT
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    // GET SIZE, and return new Vector3
    const v_size = new THREE.Vector3();
    bb.getSize(v_size);
    return new THREE.Vector3(x, v_size.y / 2, z);
};
// get bias
/*
const getBias = (n, d, count) => {
    let a = n / d * count % 1;
    return 1 - Math.abs(0.5 - a) / 0.5;
};

console.log( getBias( 0.5, 1, 1) );
*/

const getAlpha = (n, d, p1, p2) => {
    let a = n / d;
    let b = 0;
    if(a < p1){ b = a * (1 / p1);}
    if(a >= p1 && a < p2){ b = 1;}
    if(a >= p2){
        b = (1 - a) / (1 - p2);
    }
    return b;
};

//-------- ----------
// MESH, MATERIAL
//-------- ----------
const m = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 3.25, 3), m);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = FPS_MOVEMENT * 5; // 5 sec animation
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let b = getAlpha(frame, frameMax, 0.75, 0.95)
    let v_start = new THREE.Vector3(0, 5, 0);
    let v_ground = getMeshGroundPosition(mesh, v_start.x, v_start.z);
    mesh.position.copy(v_start).lerp(v_ground, b);
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