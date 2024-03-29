//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const torus = new THREE.Mesh(
        new THREE.TorusGeometry(4, 0.75, 20, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
torus.geometry.rotateX(Math.PI * 0.5)
scene.add(torus);
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
const result = raycaster.intersectObject(torus, false)
if(result.length > 0){
    const hit = result[0];
    // create mesh at point
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box.position.copy( hit.point );
    box.lookAt(v_lookat);
    scene.add(box);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
