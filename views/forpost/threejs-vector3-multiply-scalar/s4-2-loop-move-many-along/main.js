//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const updateGroup = (group, alpha) => {
    group.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            const mud = mesh.userData;
            const e = new THREE.Euler();
            e.y = THREE.MathUtils.degToRad( mud.degY === undefined ? 0 : mud.degY );
            e.z = THREE.MathUtils.degToRad( mud.degZ === undefined ? 0 : mud.degZ );
            const unit_length = mud.minLength + (mud.maxLength - mud.minLength) * alpha;
            mesh.position.set(1,0,0).applyEuler(e).multiplyScalar(unit_length);
            const s = 0.5 + 1.5 * alpha;
            mesh.scale.set(s,s,s);
        }
    });
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const group = new THREE.Group();
scene.add(group);
[
    { minLength: 1, maxLength: 4, degY: 0, degZ : 0 },
    { minLength: 2, maxLength: 5, degY: 90, degZ : 0 },
    { minLength: 2, maxLength: 3, degY: 180, degZ : 0 },
    { minLength: 3, maxLength: 5, degY: 270, degZ : 0 },
    { minLength: 2, maxLength: 5, degY: 270, degZ : -45 },
    { minLength: 1, maxLength: 3, degY: 0, degZ : 90 },
    { minLength: 1, maxLength: 3, degY: 0, degZ : 270 }
].forEach( (data) => {
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshNormalMaterial() );
    mesh.userData = Object.assign(mesh.userData, data);
    group.add(mesh);
});
updateGroup(group, 0);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = Math.sin( Math.PI * 1 * (a1 * 8 % 1));
    updateGroup(group, a2);
    camera.position.x = 10 - 20 * a1;
    camera.lookAt( 0, 0, 0 );
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

