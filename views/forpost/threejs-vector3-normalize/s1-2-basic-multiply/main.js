//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(7, 7));
//-------- ----------
// VECTOR3
//-------- ----------
const dir = new THREE.Vector3(-20, 0, 0);
// NORMALIZING DIR FROM -20,0,0 to -1,0,0
dir.normalize();
console.log(Object.values(dir)); // [-1, 0, 0]
//-------- ----------
// MSH
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// MULTIPLYING DIR BY 2
mesh1.position.copy( dir.multiplyScalar(2) );
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 10, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
