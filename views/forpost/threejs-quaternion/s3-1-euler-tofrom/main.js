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
const addMesh = (obj_parent, x, y, z) => {
    const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
    mesh.position.set(x, y, z);
    obj_parent.add(mesh);
    return mesh
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = addMesh(scene, -1,  0,  1);
const mesh2 = addMesh(scene,  1,  0,  1);
const mesh3 = addMesh(scene, -1,  0, -1);
const mesh4 = addMesh(scene,  1,  0, -1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( 3, 2, 3 );
camera.lookAt( 0,0,0 );
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    // A CHANGE to the Euler of mesh1.rotation will also update mesh1.quaternion
    // the same happens the other way around. So with an Object3d class based object
    // conversion to and from Euler and quaternion is done automatically
    mesh1.rotation.y = Math.PI * 2 * a1;
    mesh2.quaternion.copy(mesh1.quaternion);
    // when working with Objects by themselves there are methods like the setFromEuler method
    // of the quaternion class...
    const e1 = new THREE.Euler();
    e1.x = Math.PI * 2 * a1;
    const q1 = new THREE.Quaternion();
    q1.setFromEuler(e1);
    mesh3.quaternion.copy(q1);
    // ...and the setFromQuaternion method of the Euler class
    const q2 = new THREE.Quaternion();
    const v_axis = new THREE.Vector3(1 - 2 * a1,1,-1 + 2 * a1).normalize();
    q2.setFromAxisAngle( v_axis, Math.PI * 2 * a1 );
    const e2 = new THREE.Euler();
    e2.setFromQuaternion(q2)
    mesh4.rotation.copy(e2);
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

