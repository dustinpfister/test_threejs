//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create capsule group
const createCapsuleGroup = function(opt){
    opt = opt || {};
    opt.data = opt.data || [];
    const group = new THREE.Group();
    opt.data.forEach(function(opt, i, arr){
        // create a normalize vector based on the given options for x, y, and z
        // then apply the unit length option using multiplyScalar
        const v = new THREE.Vector3(opt.x, opt.y, opt.z).normalize().multiplyScalar(opt.ul);
        // UNIT LENGTH ( or distance to 0,0,0 ) can be used to 
        // set length attribute of capsule geometry based mesh object
        const geo = new THREE.CapsuleGeometry( 0.1, v.length(), 30, 30 );
        // translate geometry on y by half the vector length
        // also rotate on x by half of unit length
        geo.translate(0, v.length() / 2, 0);
        geo.rotateX(Math.PI * 0.5);
        // creating mesh object
        const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.6}));
        // copy vector to position of mesh object
        // and have the mesh look at the origin
        mesh.position.copy(v);
        mesh.lookAt(0, 0, 0);
        group.add(mesh);
    });
    return group;
};
// set to group helper
const setToGroup = function(groups, mesh, groupIndex, capsuleIndex, alpha){
    const v = new THREE.Vector3();
    const g = groups.children[groupIndex];
    g.children[capsuleIndex].getWorldPosition(v);
    const origin = g.position.clone();
    mesh.position.copy( origin.clone().lerp(v, alpha) );
    mesh.lookAt(g.position);
};
//-------- ----------
// ADD MESH OBJECTS
//-------- ----------
// create groups
const groups = new THREE.Group();
scene.add(groups);
// group index 0
const g1 = createCapsuleGroup({
    data: [
        {x: 0, y: 1, z: 0, ul: 3},
        {x: 1, y: 0, z: 0, ul: 5},
        {x: 0, y: 0, z: 1, ul: 5},
        {x: 1, y: 1, z: 1, ul: 2},
        {x: -1, y: 0, z: -1, ul: 5},
        {x: -1, y: -1, z: 1, ul: 4}
    ]
});
groups.add(g1);
// group index 1
const g2 = createCapsuleGroup({
    data: [
        {x: 0, y: 1, z: 0, ul: 4},
        {x: 1, y: 0, z: -1, ul: 3},
        {x: -5, y: 0, z: 0, ul: 3}
    ]
});
g2.position.set(-4, 0, -5);
groups.add(g2);
// MESH OBJECT
const s = 1.0;
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), new THREE.MeshNormalMaterial());
scene.add(mesh1);
const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(s, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh2);
const mesh3 = new THREE.Mesh(new THREE.ConeGeometry(s / 2, s * 2, 30, 30), new THREE.MeshNormalMaterial());
mesh3.geometry.rotateX(Math.PI * 1.5);
scene.add(mesh3);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(-2.5, 5, 10);
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
    const a2 = Math.abs(0.5 - a1) / 0.5;
    setToGroup(groups, mesh1, 0, 0, a2);
    setToGroup(groups, mesh2, 1, 1, 1 - 0.95 * a2);
    setToGroup(groups, mesh3, 0, 5, 0.5 + 0.5 * a2);
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