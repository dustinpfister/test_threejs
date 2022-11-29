//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make a single box
const makeBox = () => {
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return box;
};
// make a group
const makeGroup = (count) => {
    let i = 0;
    const group = new THREE.Group();
    while(i < count){
        group.add( makeBox() );
        i += 1;
    }
    return group;
};
const setGroupAsRing = (group, opt) => {
    opt = opt || {};
    opt.alpha = opt.alpha === undefined ? 0 : opt.alpha;
    opt.y = opt.y === undefined ? 0 : opt.y;
    opt.radius = opt.radius === undefined ? 5 : opt.radius;
    const len = group.children.length;
    group.children.forEach( (mesh, i) => {
        const alpha_mesh = i / len;
        const radian = Math.PI * 2 * alpha_mesh;
        mesh.position.x = Math.cos(radian) * opt.radius;
        mesh.position.z = Math.sin(radian) * opt.radius;
        mesh.position.y = opt.y;
        mesh.lookAt(group.position)
    });
}
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10));

const g1 = makeGroup(10);
scene.add(g1);
const g2 = makeGroup(10);
scene.add(g2);
const g3 = makeGroup(10);
scene.add(g3);


setGroupAsRing(g1, { radius: 4, y: -1 });
setGroupAsRing(g2, { radius: 5, y: 0 });
setGroupAsRing(g3, { radius: 4, y: 1 });

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
