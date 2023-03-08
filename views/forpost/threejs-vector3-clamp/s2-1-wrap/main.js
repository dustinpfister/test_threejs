//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
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
// create group
const createGroup = function () {
    const group = new THREE.Group();
    let i = 0,
    len = 50;
    while (i < len) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.0, 1.0, 1.0), 
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.60
            })
        );
        mesh.position.x = -2 + 4 * Math.random();
        mesh.position.y = -2 + 4 * Math.random();
        mesh.position.z = -2 + 4 * Math.random();
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update a group
const updateGroup = function (group, secs, bias) {
   group.children.forEach(function(mesh){
        mesh.position.x += (2 - 4 * bias) * secs;
        mesh.position.y += (-2 + 4 * bias ) * secs;
        mesh.position.z += 2 * secs;
        wrapVector(
            mesh.position,
            new THREE.Vector3(-2, -2, -2),
            new THREE.Vector3(2, 2, 2));
    });
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const group = createGroup();
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updateGroup(group, 0.025, a2);
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
