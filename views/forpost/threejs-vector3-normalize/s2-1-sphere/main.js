//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// simple create cube helper
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
// set on sphere helper
const setOnSphereFromPos = function(mesh, x, y, z, alt){
     const dir = new THREE.Vector3(x, y, z).normalize();
     const pos = new THREE.Vector3();
     pos.x = dir.x * alt;
     pos.y = dir.y * alt;
     pos.z = dir.z * alt;
     mesh.position.copy(pos);
};
// set on sphere helper
const setOnSphere = function(mesh, lat, long, alt){
    const latBias = Math.abs(lat - 0.5) / 0.5;
    const radian = Math.PI * 2 * long,
    x = Math.cos(radian) * (alt - alt * latBias),
    z = Math.sin(radian) * (alt - alt * latBias),
    y = alt * latBias * (lat > 0.5 ? -1 : 1);
    setOnSphereFromPos(cube, x, y, z, alt);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(9, 9));
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 30, 30),
    new THREE.MeshNormalMaterial({wireframe:true}));
scene.add(sphere);
const cube = createCube();
scene.add(cube);
setOnSphere(cube, 0.1, 0.3, 2);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
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
    const a2 = 0.1 + 0.8 * Math.sin( Math.PI * 1 * (a1 * 2 % 1))
    setOnSphere(cube, a2, a1, 2);
    cube.lookAt(0, 0, 0);
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
