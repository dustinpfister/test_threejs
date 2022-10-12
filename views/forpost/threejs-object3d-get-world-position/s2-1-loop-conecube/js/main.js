//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = function (color, x) {
    color = color || new THREE.Color(1, 1, 1);
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
    geo.rotateX(Math.PI * 0.5);
    const pointer = group.userData.pointer = new THREE.Mesh(
            geo,
            new THREE.MeshNormalMaterial());
    pointer.position.set(0, 0, 0);
    pointer.rotation.y = 1.57;
    group.add(pointer);
    const cube = group.userData.cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 }));
    cube.position.set(0, 0, 1);
    group.add(cube);
    group.position.set(x, 0, 0);
    return group;
};
// update
const updateGroup = (group, alpha) => {
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * alpha;
    group.userData.cube.position.copy( new THREE.Vector3(1,0,0) ).applyEuler(e).normalize().multiplyScalar(1.5);
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(5, 5));
// just set up group1 and group2
const group1 = createGroup(0xff0000, -2);
scene.add(group1);
const group2 = createGroup(0x00ff00, 2);
scene.add(group2);
const helper1 = new THREE.BoxHelper(group1);
scene.add(helper1);
const helper2 = new THREE.BoxHelper(group2);
scene.add(helper2);
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
    // animate groups the same way
    let a = frame / frameMax;
    updateGroup(group1, a);
    updateGroup(group2, a);
    helper1.update();
    helper2.update();
    // with group1 I am just passing lookAt the LOCAL position of the cube
    group1.userData.pointer.lookAt(group1.userData.cube.position);
    // with group to I am USING GETWORLDPOSITION to get a vector to pass to lookAt
    const v = new THREE.Vector3(0, 0, 0);
    group2.userData.cube.getWorldPosition(v);
    group2.userData.pointer.lookAt(v);
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
