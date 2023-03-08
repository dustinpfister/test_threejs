//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 1, 2)
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
// mod method
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
// wrap and axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    const maxD = new THREE.Vector2(vecMin[axis], 0).distanceTo( new THREE.Vector2(vecMax[axis], 0) );
    const d = new THREE.Vector2(vec[axis], 0).distanceTo( new THREE.Vector2(vecMin[axis], 0) );
    if(maxD === 0){
       vec[axis] = 0;
    }else{
        if(vec[axis] >= vecMax[axis]){
            vec[axis] = vecMin[axis] + mod(d, maxD);
        }
        if(vec[axis] < vecMin[axis]){
            vec[axis] = vecMax[axis] - mod(d, maxD);
        }
    }
};
// wrap a vector
const wrapVector = function (vec, vecMin, vecMax) {
    vecMin = vecMin || new THREE.Vector3(0, 0, 0);
    vecMax = vecMax || new THREE.Vector3(1, 1, 1);
    wrapAxis(vec, vecMin, vecMax, 'x');
    wrapAxis(vec, vecMin, vecMax, 'y');
    wrapAxis(vec, vecMin, vecMax, 'z');
};
// get a random axis
const randAxis = function () {
    return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
};
// create group
const createGroup = function (clampType, color) {
    clampType = clampType || 'clamp';
    color = color || 0xffffff;
    const group = new THREE.Group();
    let i = 0,
    len = 10;
    while (i < len) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.0, 1.0, 1.0), 
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.60
            })
        );
        const ud = mesh.userData;
        const start_dir = ud.start_dir = new THREE.Vector3();
        ud.alpha = 0;
        ud.dr = 0.05 + 0.95 * Math.random();
        ud.clampType = clampType;
        start_dir.x = randAxis();
        start_dir.y = randAxis();
        start_dir.z = randAxis();
        mesh.position.copy(start_dir.normalize().multiplyScalar(2));
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update group
const updateGroup = function (group, delta) {
    group.children.forEach(function (mesh, i) {
        const ud = mesh.userData;
        const start_dir = ud.start_dir;
        const pos = mesh.position;
        ud.alpha += delta * ud.dr;
        pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
        // clamp type
        if(ud.clampType === 'clamp'){
            pos.clamp(
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                ud.alpha = 0;
            }
        }
        // if clamp type is length
        if(ud.clampType === 'length'){
            pos.clampLength(0.1, 2);
            mesh.lookAt(group.position);
            if(pos.length() === 2){
                ud.alpha = 0;
            }
        }
        // if clamp type is wrap
        if(ud.clampType === 'wrap'){
            wrapVector(
                pos,
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            //ud.alpha = ud.alpha % 2;
        }
    });
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(4, 4));
const group1 = createGroup('clamp', 0xff0000);
scene.add(group1);
const group2 = createGroup('length', 0x00ff00);
scene.add(group2);
const group3 = createGroup('wrap', 0x00ffff);
scene.add(group3);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 500;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    updateGroup(group1, 0.05);
    updateGroup(group2, 0.05);
    updateGroup(group3, 0.05);
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