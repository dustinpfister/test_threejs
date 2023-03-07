//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// VECTOR3
//-------- ----------
const v_dir = new THREE.Vector3(0, 0, 18).normalize();
console.log(v_dir.x, v_dir.y, v_dir.z); // 0, 0, 1
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
// using vector3 normalize with vector3 multiply scalar to create
// a buch of mesh objects with the direciton of v_dir, but with differing unit lengths
[0, 0.25, 0.5, 0.75, 1, 2, 3].forEach( (length) => {
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.075, 10, 10) );
    mesh.position.copy(v_dir).multiplyScalar(length);
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 4, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
