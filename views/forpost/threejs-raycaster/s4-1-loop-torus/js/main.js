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
const setMeshIfHit = (raycaster, mesh, target, v_lookat) => {
    const result = raycaster.intersectObject(target, false);
    if(result.length > 0){
        const hit = result[0];
        mesh.position.copy( hit.point );
        mesh.lookAt(v_lookat);
   }
};

//-------- ----------
// MESH - SPHERE
//-------- ----------
const torus = new THREE.Mesh(
        new THREE.TorusGeometry(4, 0.75, 20, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
torus.geometry.rotateX(Math.PI * 0.5)
scene.add(torus);
// create mesh at point
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// RAYCASTER
//-------- ----------
const v_ray_origin = new THREE.Vector3(0, 3, 0); // where the ray comes from

let radian = Math.PI / 180 * 300;
let v_lookat = new THREE.Vector3(1, 0, 0).applyEuler( new THREE.Euler(0, radian, 0) ).multiplyScalar(4);

// object to helper set dir
const obj = new THREE.Object3D();
obj.position.copy(v_ray_origin);
obj.lookAt(v_lookat);
const v_ray_dir = new THREE.Vector3(0, 0, 1);
v_ray_dir.applyEuler(obj.rotation).normalize();
// create raycaster
const near = 0, far = 100;
const raycaster = new THREE.Raycaster(v_ray_origin, v_ray_dir, near, far);
// intersect
/*
const result = raycaster.intersectObject(torus, false)
if(result.length > 0){
    const hit = result[0];
    box.position.copy( hit.point );
    box.lookAt(v_lookat);
}
*/

setMeshIfHit(raycaster, box, torus, v_lookat);

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
