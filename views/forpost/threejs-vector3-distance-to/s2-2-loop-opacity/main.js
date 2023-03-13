//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// opaicty effect using length method which is distance to origin
const opacityEffect = (mesh) =>  {
    mesh.material.opacity = 1 - mesh.position.length() / 5;
};
// rotation effect using the distanceTo method
const rotationEffect = (group, mesh) =>  {
    const minDist = 5;
    group.children.forEach( (child) => {
        mesh.lookAt(0, 0, 0);
        if(child != mesh){
            const d = mesh.position.distanceTo(child.position);
            if(d < minDist){
                const p = d / minDist;
                const ud = mesh.userData;
                ud.rp += p;
                ud.rp %= 1;
                mesh.rotation.z += Math.PI / 180 * ud.maxDegPerChid * ud.rp;
            }
        }
    })
};
// get a start position by passing two values that are 0 - 1
const getStartPosition = (a, b) => {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    const pos = new THREE.Vector3( 5, 0, 0);
    const e = new THREE.Euler(0, a * Math.PI * 2, b * Math.PI * 2);
    return pos.applyEuler(e);
};
// get a seeded random start position
const getSeededRandomStartPosition = function(){
    return getStartPosition(
       THREE.MathUtils.seededRandom(), 
       THREE.MathUtils.seededRandom() );
};
// set new mesh user data
const newMeshUserData = (mesh) => {
    const ud = mesh.userData;
    ud.startPos = getSeededRandomStartPosition();
    ud.alphaDelta = 0.1 + 0.5 * THREE.MathUtils.seededRandom();
    ud.alpha = 0;
    ud.rp = 0;
    ud.maxDegPerChid = 5 + 355 * THREE.MathUtils.seededRandom();
};
// create group
const createGroup = (count) => {
    count = count === undefined ? 10 : count;
    const group = new THREE.Group();
    let i = 0;;
    while(i < count){
        // create mesh object
        const mesh = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshNormalMaterial({
                transparent: true
            }) );
        // user data
        const ud = mesh.userData;
        newMeshUserData(mesh);
        // start pos, lookAt, add to group
        mesh.position.copy( ud.startPos );
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update group
const updateGroup = function(group, secs){
    secs = secs === undefined ? 0 : secs;
    group.children.forEach( (mesh) => {
        const ud = mesh.userData;
        ud.alpha += ud.alphaDelta * secs;
        ud.alpha = ud.alpha > 1 ? 1 : ud.alpha;
        // new positon using start pos in userData and lerping from there
        mesh.position.copy(ud.startPos).lerp( new THREE.Vector3(), ud.alpha );
        // new data if alpha === 1
        if(ud.alpha === 1){
            newMeshUserData(mesh);
        }
        // opaicty effect
        opacityEffect(mesh);
        rotationEffect(group, mesh);
    });
};
//-------- ----------
// OBJECTS
//-------- ----------
const group1 = createGroup(80);
scene.add(group1);
const group2 = createGroup(20);
group2.position.set(-10, 0, 0);
scene.add(group2);
const group3 = createGroup(20);
group3.position.set(0, 0, -10);
scene.add(group3);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 10, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    updateGroup(group1, 1 / FPS_MOVEMENT);
    updateGroup(group2, 1 / FPS_MOVEMENT);
    updateGroup(group3, 1 / FPS_MOVEMENT);
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
