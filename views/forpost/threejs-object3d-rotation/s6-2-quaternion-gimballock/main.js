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
// get an alpha that is a part of an alpha
const getPartAlpha = (a1, a_start, a_length) => {
    return (a1 - a_start) / a_length;
};
// get pitch and yaw in deg values
const getPitchYaw = (a1) => {
    const result = { yaw:0, pitch:90 };
    if(a1 < 0.25){
        const a2 = getPartAlpha(a1, 0, 0.25);
        result.yaw = 45 * Math.sin( Math.PI * 4 * a2 );
    }
    if(a1 >= 0.25 && a1 < 0.5){
       let a2 = getPartAlpha(a1, 0.25, 0.25);
       result.pitch = 90 - 90 * a2;
       result.yaw = 22 * Math.sin( Math.PI * 8 * a2 );
    }
    if(a1 >= 0.5 && a1 < 0.75){
        const a2 = getPartAlpha(a1, 0.5, 0.25);
        result.pitch = 0;
        result.yaw = 45 * Math.sin( Math.PI * 4 * a2 );
    }
    if(a1 >= 0.75){
       let a2 = getPartAlpha(a1, 0.75, 0.25);
       result.pitch = 90 * a2;
       result.yaw = 22 * Math.sin( Math.PI * 8 * a2 );
    }
    return result;
};
// update By Euler ( object3d.rotation )
const updateByEuler = (obj, a1) => {
    const result = getPitchYaw(a1);
    obj.rotation.z = Math.PI / 180 * result.pitch;
    obj.rotation.y = Math.PI / 180 * (90 - result.yaw);
};
// update By Quaternion ( object3d.quaternion )
const updateByQuaternion = (obj, a1) => {
    const result = getPitchYaw(a1);
    const v_axis_pitch = new THREE.Vector3(1, 0, 0);
    const q_pitch = new THREE.Quaternion().setFromAxisAngle(v_axis_pitch, THREE.MathUtils.degToRad(result.pitch) );
    const v_axis_yaw = new THREE.Vector3(0, 0, 1);
    const q_yaw = new THREE.Quaternion().setFromAxisAngle(v_axis_yaw, THREE.MathUtils.degToRad(result.yaw) );
    obj.quaternion.setFromUnitVectors(v_axis_yaw, v_axis_pitch).premultiply(q_yaw).premultiply(q_pitch);
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const obj1 = mkObject();
obj1.position.set(0,0, 0);
scene.add(obj1);
const obj2 = mkObject();
obj1.position.set(0,0, -3);
scene.add(obj2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-4, 4, 4);
camera.lookAt(0,0,-1.5);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    updateByEuler(obj1, a1);
    updateByQuaternion(obj2, a1);
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

