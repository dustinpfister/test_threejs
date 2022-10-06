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
// MESH - SPHERE
//-------- ----------
const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        new THREE.MeshNormalMaterial());
scene.add(sphere);
//-------- ----------
// RAYCASTER
//-------- ----------
const v_ray_origin = new THREE.Vector3(50, 50, 25); // where the ray comes from
const v_ray_dir = v_ray_origin.clone().negate().normalize(); // getting direction by inverting origin
const near = 0, far = 100;
const raycaster = new THREE.Raycaster(v_ray_origin, v_ray_dir, near, far);
// intersect
const result = raycaster.intersectObject(sphere, false)
if(result.length > 0){
    const hit = result[0];
    console.log(hit.point);
    // create mesh at point
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box.position.copy(hit.point.clone().normalize().multiplyScalar(3.5));
    box.lookAt(sphere.position);
    scene.add(box);
}
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
