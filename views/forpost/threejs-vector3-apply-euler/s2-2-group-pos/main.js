//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Vector from angles method
const vectorFromAngles = function (a, b, len) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    len = len === undefined ? 1 : len;
    const startVec = new THREE.Vector3(1, 0, 0);
    const e = new THREE.Euler(
        0,
        THREE.MathUtils.degToRad(a),
        THREE.MathUtils.degToRad(-90 + b));
    return startVec.applyEuler(e).normalize().multiplyScalar(len);
};
// create a cube
const createCube = function(pos, size){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshNormalMaterial());
    cube.position.copy( pos || new THREE.Vector3() );
    cube.lookAt(0, 0, 0);
    return cube;
};
// create a group
const createGroup = (len) => {
    const group = new THREE.Group();
    let i = 0;
    while(i < len){
        group.add( createCube(null, 1) );
        i += 1;
    }
    return group;
};
// set a group
const setGroup = (group, aCount, unitLength, vd, vlt, alpha) => {
    aCount = aCount === undefined ? 1 : aCount;
    unitLength = unitLength === undefined ? 1 : unitLength;
    vd = vd === undefined ? new THREE.Vector3() : vd;       // vector delta for each object effected by i / len
    vlt = vlt === undefined ? new THREE.Vector3() : vlt;    // vector to lerp to for each mesh positon
    alpha = alpha === undefined ? 0 : alpha;
    let len = group.children.length;
    let i = 0;
    while(i < len){
        const p = i / len;
        const a = 360 * aCount * p;
        // using my vector from angles method
        const v = vectorFromAngles(a, 180 * p, unitLength);
        // adding another Vector
        v.add( vd.clone().multiplyScalar(p) );
        const cube = group.children[i];
        cube.position.copy(v.lerp(vlt, alpha));
        cube.lookAt(0, 0, 0);
        const s = 1 - 0.75 * p;
        cube.scale.set(s, s, s);
        i += 1;
    }
};
//-------- ----------
// MESH
//-------- ----------
const group = createGroup(400);
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
let c = 0;
const CMAX = 200;
let acRange = [-5, 5];
const vd = new THREE.Vector3(0, 0, 0);
const vlt = new THREE.Vector3(0, 0, 0);
const update = function(frame, frameMax){
    // step count, figire p and b alpha values
    c += 1;
    c = c > CMAX ? CMAX : c;
    const p = c / CMAX;
    const b = THREE.MathUtils.pingpong(p - 0.5, 1) * 2;
    // get acount set group
    const aCount = acRange[0] + (acRange[1] - acRange[0]) * b;
    setGroup(group, aCount, 3, vd, vlt, b);
    // if c === CMAX new values
    if(c === CMAX){
        c = 0;
        acRange[0] = -20 + 20 * Math.random();
        acRange[1] = 20 * Math.random();
    }
    // ALSO MOVEING GROUP POSITION WITH APPLY EULER
    group.position.copy( vectorFromAngles(360 * p, 90, 2.5) );
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
