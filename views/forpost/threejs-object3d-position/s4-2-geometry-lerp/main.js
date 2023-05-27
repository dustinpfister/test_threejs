//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// get a geo position vector3 by a given alpha value
const getGeoPosByAlpha = (geo, alpha) => {
    const pos = geo.getAttribute('position');
    const count = pos.count;
    const index = Math.round( ( count - 1 ) * alpha );
    const v = new THREE.Vector3();
    v.x = pos.getX(index);
    v.y = pos.getY(index);
    v.z = pos.getZ(index);
    return v;
};
// create a 'pointer' mesh object
const createPointerMesh = () => {
    return new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 20, 20),
        new THREE.MeshNormalMaterial()
    );
};
// create a colleciton of pointer mesh objects
const createPointerCollection = (count = 100) => {
    const group = new THREE.Group();
    let i = 0;
    while(i < count){
        const mesh = createPointerMesh();
        group.add(mesh);
        i += 1;
    }
    return group;
};
// create a colleciton of pointer mesh objects
const updatePointerCollection = (group, geo1, geo2, alpha) => {
    let i = 0;
    const len = group.children.length;
    while(i < len){
        const a_child = i / len;
        const v1 = getGeoPosByAlpha(geo1, a_child);
        const v2 = getGeoPosByAlpha(geo2, a_child);
        const mesh = group.children[i];
        mesh.position.copy(v1).lerp(v2, alpha);
        i += 1;
    }
};
//-------- ----------
// GEOMERTY FOR POSITIONS
//-------- ----------
const GEO = [
    new THREE.BoxGeometry(4, 4, 4, 4, 3, 3),
    new THREE.SphereGeometry(2, 9, 9)
];
console.log(GEO.map( (geo) => { return geo.getAttribute('position').count; }) );
//-------- ----------
// POINTER MESH COLLECTION
//-------- ----------
const group1 = createPointerCollection(100);
scene.add(group1);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,    // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v_start = new THREE.Vector3(0, 0, 1);
const v_delta = new THREE.Vector3(0, 0, 3);
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updatePointerCollection(group1, GEO[0], GEO[1], a2);
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
