//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH - SPHERE
//-------- ----------
const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 30, 30),
        new THREE.MeshNormalMaterial());
sphere.position.set(0.1, -2, 0.1)
scene.add(sphere);
//-------- ----------
// RAYCASTER
//-------- ----------
const v_ray_origin = new THREE.Vector3(0, 1, 0); // where the ray comes from
const v_ray_dir = new THREE.Vector3(0, -1, 0.05).normalize(); 
const near = 0, far = 100;
const raycaster = new THREE.Raycaster(v_ray_origin, v_ray_dir, 0, 100);


const arrowHelper = new THREE.ArrowHelper( v_ray_dir);
scene.add( arrowHelper );

// intersect
const result = raycaster.intersectObjects([ sphere ], false);

console.log(result);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
