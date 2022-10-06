//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set mesh posiiton if we have a hit
const setMeshIfHit = (raycaster, mesh, target, v_lookat) => {
    const result = raycaster.intersectObject(target, false);
    if(result.length > 0){
        const hit = result[0];
        mesh.position.copy( hit.point );
        mesh.lookAt(v_lookat);
   }
};
// get dir
const getDir = (v_origin, v_lookat) => {
    const obj = new THREE.Object3D();
    obj.position.copy(v_origin);
    obj.lookAt(v_lookat);
    const dir = new THREE.Vector3(0, 0, 1);
    dir.applyEuler(obj.rotation).normalize();
    return dir;
};
// get look at vector
const getLookAt = (deg, radius) => {
    let radian = Math.PI / 180 * deg;
    return new THREE.Vector3(1, 0, 0).applyEuler( new THREE.Euler(0, radian, 0) ).multiplyScalar(radius);
};
//-------- ----------
// MESH - SPHERE
//-------- ----------
const torus_radius = 4;
const torus = new THREE.Mesh(
        new THREE.TorusGeometry(torus_radius, 1.25, 20, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
torus.geometry.rotateX(Math.PI * 0.5)
scene.add(torus);
// create mesh at point
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// RAYCASTER
//-------- ----------
// create raycaster
const raycaster = new THREE.Raycaster();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a * 2 % 1 ) / 0.5;
    let v_lookat = getLookAt(360 * a, torus_radius);
    let v_ray_origin = new THREE.Vector3(0, -20 + 40 * b, 0)
    let v_ray_dir = getDir(v_ray_origin,  v_lookat);
    raycaster.set(v_ray_origin, v_ray_dir);
    setMeshIfHit(raycaster, box, torus, v_lookat);
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
