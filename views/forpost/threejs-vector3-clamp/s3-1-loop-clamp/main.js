//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// get a random axis
const randAxis = function () {
    return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
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
                opacity: 0.50
            })
        );
        const ud = mesh.userData;
        const start_dir = ud.start_dir = new THREE.Vector3();
        ud.alpha = 0;
        ud.dr = 0.05 + 0.95 * Math.random();
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
        pos.clamp(
            new THREE.Vector3(-2, -2, -2),
            new THREE.Vector3(2, 2, 2));
        if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
            ud.alpha = 0;
        }
    });
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const group = createGroup();
scene.add(group);
scene.add(new THREE.GridHelper(4, 4));
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
    updateGroup(group, 0.1);
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