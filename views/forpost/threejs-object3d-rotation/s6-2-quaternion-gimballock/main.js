// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const mkObject = function(){
    const material = new THREE.MeshNormalMaterial({});
    const mesh_body = new THREE.Mesh(
       new THREE.SphereGeometry(0.5, 20, 20),
       material);
    const mesh_nose = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.25, 1, 20, 20),
        material
    );
    mesh_nose.geometry.translate(0,1,0);
    mesh_body.add(mesh_nose);
    const mesh_wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.125,0.3,3),
        material
    );
    mesh_body.add(mesh_wing);
    const mesh_tail = new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.4,0.125),
        material
    );
    mesh_tail.geometry.translate(0.75,0,0);
    mesh_tail.geometry.rotateZ(Math.PI / 180 * -60);
    mesh_body.add(mesh_tail);
    return mesh_body;
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const obj1 = mkObject();
scene.add(obj1);
obj1.rotation.z = Math.PI * 0.5;
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-4, 4, 4);
camera.lookAt(0,0,0);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 200;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    obj1.rotation.y = 0;
    obj1.rotation.z = Math.PI / 180 * 90;
    if(a1 < 0.25){
        // yaw back and forth
        const a2 = Math.sin( Math.PI * 2 * (a1 * 4 % 1 ) );
        obj1.rotation.y = Math.PI / 180 * (45 * a2);
    }
    if(a1 > 0.25 && a1 < 0.75){
       obj1.rotation.y = 0;
       // pitch up 90
       let a3 = ( a1 - 0.25 ) / 0.5;
       a3 = a3 > 1 ? 1 : a3; 
       obj1.rotation.z = Math.PI / 180 * (90 - 90 * a3);
    }
    if(a1 >= 0.75){
        obj1.rotation.z = Math.PI / 180 * 0;
        const a4 = ( a1 - 0.75 ) / 0.25
        const a5 = Math.sin( Math.PI * 2 * a4 );
        obj1.rotation.y = Math.PI / 180 * (45 * a5);
    }
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

