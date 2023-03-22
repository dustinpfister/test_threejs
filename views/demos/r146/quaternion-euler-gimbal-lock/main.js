// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPER
// ---------- ----------
const createMesh = () => {
    const geo = new THREE.CylinderGeometry(0, 0.25, 1);
    const material = new THREE.MeshNormalMaterial();
    geo.rotateX(Math.PI * 1.5);
    geo.rotateY(Math.PI * 1.5);
    const mesh = new THREE.Mesh( geo, material);
    return mesh;
};
// ---------- ----------
// OBJECTS
// ---------- ----------
// helpers
scene.add( new THREE.GridHelper( 10,10 ) );
const axesHelper = new THREE.AxesHelper( 1 );
scene.add( axesHelper );
// mesh
const mesh1 = createMesh();
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = a1 * 1.5 > 1 ? 1 : a1 * 1.5;
    const a3 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
    //mesh1.rotation.x = Math.PI * 2 * a1; // using x for roll
    //mesh1.rotation.y = Math.PI * 2 * a1; // using y for yaw
    //mesh1.rotation.z = Math.PI * 2 * a1; // using z for pitch
    // if I set pitch to 90 degrees, then yaw axis gimbal becomes parallel to the roll axis gimbal
    // and then yaw becuase a new kind of roll
    mesh1.rotation.x = Math.PI / 180 * 0;
    mesh1.rotation.y = Math.PI / 180 * (-45 + 90 * a3);
    mesh1.rotation.z = Math.PI / 180 * ( -45 + 135 * a2);
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

